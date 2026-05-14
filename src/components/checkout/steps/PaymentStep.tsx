import React, { useState, useEffect, useMemo } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import { Loader2, ShieldCheck, CreditCard, Plus, ChevronDown, Receipt } from 'lucide-react';
import { sileo as toast } from 'sileo';
import ApiService from '../../../lib/apiClient';
import contractService from '../../../services/contractService';
import type { InvoiceData } from '../../../services/contractService';
import type { CheckoutPlan, CheckoutBillingCycle } from '../../../contexts/CheckoutContext';

interface SavedMethod {
  stripe_payment_method_id: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  is_default: boolean;
}

interface Props {
  plan: CheckoutPlan;
  billingCycle: CheckoutBillingCycle;
  serviceName: string;
  eggId?: number;
  onSuccess: (invoiceNumber: string, total: number) => void;
  onBack: () => void;
}

const REGIMENES = [
  { value: '601', label: '601 - General de Ley Personas Morales' },
  { value: '603', label: '603 - Personas Morales sin Fines de Lucro' },
  { value: '605', label: '605 - Sueldos y Salarios' },
  { value: '606', label: '606 - Arrendamiento' },
  { value: '612', label: '612 - Actividades Empresariales y Profesionales' },
  { value: '616', label: '616 - Sin Obligaciones Fiscales' },
  { value: '621', label: '621 - Incorporación Fiscal' },
  { value: '626', label: '626 - Régimen Simplificado de Confianza' },
];

const USOS_CFDI = [
  { value: 'G01', label: 'G01 - Adquisición de mercancias' },
  { value: 'G03', label: 'G03 - Gastos en general' },
  { value: 'I08', label: 'I08 - Otra maquinaria y equipo' },
  { value: 'S01', label: 'S01 - Sin efectos fiscales' },
  { value: 'CP01', label: 'CP01 - Pagos' },
];

function BrandBadge({ brand }: { brand: string }) {
  const b = brand.toLowerCase();
  if (b === 'visa') return <span className="text-[10px] font-bold tracking-wider text-blue-600 border border-blue-300 rounded px-1">VISA</span>;
  if (b === 'mastercard') return (
    <span className="flex items-center">
      <span className="w-3 h-3 rounded-full bg-red-500 -mr-1.5" />
      <span className="w-3 h-3 rounded-full bg-yellow-400" />
    </span>
  );
  if (b === 'amex') return <span className="text-[10px] font-bold tracking-wider text-blue-800 border border-blue-300 rounded px-1">AMEX</span>;
  return <CreditCard className="w-4 h-4 text-muted-foreground" />;
}

export const PaymentStep: React.FC<Props> = ({ plan, billingCycle, serviceName, eggId, onSuccess, onBack }) => {
  const stripe   = useStripe();
  const elements = useElements();
  const [loading, setLoading]       = useState(false);
  const [cardError, setCardError]   = useState<string | null>(null);
  const [useNewCard, setUseNewCard] = useState(false);
  const [selectedPmId, setSelectedPmId] = useState<string | null>(null);
  const [wantsInvoice, setWantsInvoice] = useState(false);
  const [invoice, setInvoice] = useState<InvoiceData>({
    rfc: '', name: '', zip: '', regimen: '', uso_cfdi: 'G03',
  });

  // Saved payment methods
  const { data: savedMethods = [], isLoading: loadingMethods } = useQuery<SavedMethod[]>({
    queryKey: ['paymentMethods'],
    queryFn: () => ApiService.get('/payments/methods').then((r: any) => r.data?.data || []),
    retry: false,
  });

  useEffect(() => {
    if (savedMethods.length > 0) {
      const def = savedMethods.find(m => m.is_default) ?? savedMethods[0];
      setSelectedPmId(def.stripe_payment_method_id);
      setUseNewCard(false);
    } else {
      setUseNewCard(true);
    }
  }, [savedMethods]);

  // Price
  const { subtotal, iva, total } = useMemo(() => {
    const disc = parseFloat(String(billingCycle.discount_percentage)) / 100;
    const sub  = parseFloat(String(plan.basePrice)) * (1 - disc);
    const tax  = sub * 0.16;
    return { subtotal: sub, iva: tax, total: sub + tax };
  }, [plan.basePrice, billingCycle.discount_percentage]);

  const invoiceValid = !wantsInvoice || (
    invoice.rfc.length >= 12 && invoice.name && invoice.zip.length === 5 && invoice.regimen && invoice.uso_cfdi
  );

  const handlePay = async () => {
    if (!invoiceValid) { toast.error('Completa todos los datos fiscales'); return; }
    setLoading(true);
    setCardError(null);

    const invoicePayload = wantsInvoice ? invoice : undefined;

    try {
      if (!useNewCard && selectedPmId) {
        // ── Saved card ─────────────────────────────────────────────
        const res  = await contractService.contract({
          plan_id: plan.slug, billing_cycle: billingCycle.slug,
          service_name: serviceName, payment_method_id: selectedPmId,
          create_subscription: true, invoice: invoicePayload, egg_id: eggId,
        });
        const body = (res.data as any);
        if (body?.data?.requires_action && body?.data?.client_secret) {
          const { error } = await stripe!.confirmCardPayment(body.data.client_secret);
          if (error) { setCardError(error.message ?? 'Error al confirmar'); setLoading(false); return; }
        }
        if (!body?.success) throw new Error(body?.message ?? 'Error al contratar');
        toast.success('¡Pago procesado!');
        onSuccess(body.invoice?.invoice_number ?? '—', total);

      } else {
        // ── New card ────────────────────────────────────────────────
        if (!stripe || !elements) return;
        const cardEl = elements.getElement(CardElement);
        if (!cardEl) return;

        const { paymentMethod, error: pmErr } = await stripe.createPaymentMethod({ type: 'card', card: cardEl });
        if (pmErr || !paymentMethod) { setCardError(pmErr?.message ?? 'Error con la tarjeta'); setLoading(false); return; }

        const res  = await contractService.contract({
          plan_id: plan.slug, billing_cycle: billingCycle.slug,
          service_name: serviceName, payment_method_id: paymentMethod.id,
          create_subscription: true, invoice: invoicePayload, egg_id: eggId,
        });
        const body = (res.data as any);
        if (body?.data?.requires_action && body?.data?.client_secret) {
          const { error } = await stripe.confirmCardPayment(body.data.client_secret);
          if (error) { setCardError(error.message ?? 'Error al confirmar'); setLoading(false); return; }
        }
        if (!body?.success) throw new Error(body?.message ?? 'Error al contratar');
        toast.success('¡Pago procesado!');
        onSuccess(body.invoice?.invoice_number ?? '—', total);
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? err?.message ?? 'Error al procesar el pago';
      setCardError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Order summary */}
      <div className="rounded-2xl border border-border bg-muted/30 p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3">Resumen del pedido</p>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-foreground">{plan.name} · {billingCycle.name}</span>
        </div>
        {parseFloat(String(billingCycle.discount_percentage)) > 0 && (
          <div className="flex justify-between text-xs text-green-600 dark:text-green-400 mb-1">
            <span>Descuento {billingCycle.discount_percentage}%</span>
            <span>aplicado</span>
          </div>
        )}
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>IVA 16%</span>
          <span>${iva.toFixed(2)}</span>
        </div>
        <div className="border-t border-border mt-2 pt-2 flex justify-between items-center">
          <span className="text-sm font-semibold text-foreground">Total hoy</span>
          <span className="text-lg font-bold text-primary">${total.toFixed(2)} MXN</span>
        </div>
      </div>

      {/* Payment method */}
      <div>
        <p className="text-sm font-medium text-foreground mb-2">Método de pago</p>

        {loadingMethods ? (
          <div className="flex items-center gap-2 py-3 text-muted-foreground text-sm">
            <Loader2 className="w-4 h-4 animate-spin" /> Cargando métodos guardados…
          </div>
        ) : (
          <>
            {/* Saved methods */}
            {savedMethods.length > 0 && (
              <div className="space-y-2 mb-3">
                {savedMethods.map((m) => (
                  <button
                    key={m.stripe_payment_method_id}
                    type="button"
                    onClick={() => { setSelectedPmId(m.stripe_payment_method_id); setUseNewCard(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-colors ${
                      !useNewCard && selectedPmId === m.stripe_payment_method_id
                        ? 'border-primary bg-primary/5 text-foreground'
                        : 'border-border text-muted-foreground hover:border-primary/40'
                    }`}
                  >
                    <BrandBadge brand={m.brand} />
                    <span className="flex-1 text-left">
                      •••• {m.last4}
                      <span className="ml-2 text-xs text-muted-foreground">
                        {m.exp_month.toString().padStart(2, '0')}/{m.exp_year.toString().slice(-2)}
                      </span>
                    </span>
                    {m.is_default && (
                      <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">Predeterminada</span>
                    )}
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      !useNewCard && selectedPmId === m.stripe_payment_method_id ? 'border-primary' : 'border-border'
                    }`}>
                      {!useNewCard && selectedPmId === m.stripe_payment_method_id && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                  </button>
                ))}

                {/* Add new card option */}
                <button
                  type="button"
                  onClick={() => { setUseNewCard(true); setSelectedPmId(null); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-colors ${
                    useNewCard
                      ? 'border-primary bg-primary/5 text-foreground'
                      : 'border-border text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span className="flex-1 text-left">Usar nueva tarjeta</span>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${useNewCard ? 'border-primary' : 'border-border'}`}>
                    {useNewCard && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                </button>
              </div>
            )}

            {/* CardElement */}
            {(useNewCard || savedMethods.length === 0) && (
              <div>
                <div className="p-4 rounded-xl border border-border bg-background focus-within:ring-2 focus-within:ring-primary/40 transition">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '14px',
                          color: 'var(--foreground, #1a1a1a)',
                          fontFamily: 'Inter, system-ui, sans-serif',
                          '::placeholder': { color: 'var(--muted-foreground, #888)' },
                        },
                        invalid: { color: '#ef4444' },
                      },
                      hidePostalCode: true,
                    }}
                    onChange={(e) => { if (e.error) setCardError(e.error.message); else setCardError(null); }}
                  />
                </div>
                {cardError && <p className="text-xs text-red-500 mt-1.5">{cardError}</p>}
              </div>
            )}
            {!useNewCard && cardError && <p className="text-xs text-red-500 mt-1.5">{cardError}</p>}
          </>
        )}
      </div>

      {/* Invoice toggle */}
      <div className="rounded-xl border border-border overflow-hidden">
        <button
          type="button"
          onClick={() => setWantsInvoice(v => !v)}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted/50 transition"
        >
          <Receipt className="w-4 h-4 text-muted-foreground" />
          <span className="flex-1 text-left font-medium text-foreground">Requiero factura (CFDI)</span>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${wantsInvoice ? 'rotate-180' : ''}`} />
        </button>

        {wantsInvoice && (
          <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">RFC</label>
                <input
                  value={invoice.rfc}
                  onChange={e => setInvoice(v => ({ ...v, rfc: e.target.value.toUpperCase() }))}
                  maxLength={13}
                  placeholder="XAXX010101000"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs outline-none focus:ring-2 focus:ring-primary/40 transition font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Código postal fiscal</label>
                <input
                  value={invoice.zip}
                  onChange={e => setInvoice(v => ({ ...v, zip: e.target.value.replace(/\D/g, '').slice(0, 5) }))}
                  maxLength={5}
                  placeholder="06600"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs outline-none focus:ring-2 focus:ring-primary/40 transition font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Razón social / Nombre completo</label>
              <input
                value={invoice.name}
                onChange={e => setInvoice(v => ({ ...v, name: e.target.value.toUpperCase() }))}
                placeholder="MI EMPRESA SA DE CV"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs outline-none focus:ring-2 focus:ring-primary/40 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Régimen fiscal</label>
              <select
                value={invoice.regimen}
                onChange={e => setInvoice(v => ({ ...v, regimen: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs outline-none focus:ring-2 focus:ring-primary/40 transition"
              >
                <option value="">Seleccionar…</option>
                {REGIMENES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Uso del CFDI</label>
              <select
                value={invoice.uso_cfdi}
                onChange={e => setInvoice(v => ({ ...v, uso_cfdi: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs outline-none focus:ring-2 focus:ring-primary/40 transition"
              >
                {USOS_CFDI.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Security badge */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
        Pago seguro con Stripe. Cifrado TLS extremo a extremo.
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition disabled:opacity-60"
        >
          Atrás
        </button>
        <button
          onClick={handlePay}
          disabled={loading || (!useNewCard && !selectedPmId) || !invoiceValid}
          className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? 'Procesando…' : `Pagar $${total.toFixed(2)} MXN`}
        </button>
      </div>
    </div>
  );
};
