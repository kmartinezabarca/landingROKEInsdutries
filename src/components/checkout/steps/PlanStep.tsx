import React, { useState, useMemo, useEffect } from 'react';
import { Check, Sparkles, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useBillingCycles } from '../../../hooks/useBillingCycles';
import ApiService from '../../../lib/apiClient';
import type { CheckoutPlan, CheckoutBillingCycle } from '../../../contexts/CheckoutContext';

interface Egg { id: number; name: string; description: string; }
interface GameNest { id: number; name: string; eggs: Egg[]; }

interface Props {
  plan: CheckoutPlan;
  initialBillingCycle: CheckoutBillingCycle | null;
  onNext: (billingCycle: CheckoutBillingCycle, serviceName: string, eggId?: number) => void;
}

const NEST_COLORS: Record<string, string> = {
  minecraft: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
  steam:     'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
  source:    'bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20',
  rust:      'bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20',
  voice:     'bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/20',
  gta:       'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20',
  grand:     'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20',
};

function getNestColor(name: string) {
  const key = Object.keys(NEST_COLORS).find(k => name.toLowerCase().includes(k));
  return key ? NEST_COLORS[key] : 'bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 border-zinc-500/20';
}

function getShortDesc(name: string) {
  const l = name.toLowerCase();
  if (l.includes('paper'))    return 'Máximo rendimiento vanilla';
  if (l.includes('purpur'))   return 'Más personalización y features';
  if (l.includes('forge'))    return 'Ideal para mods pesados';
  if (l.includes('fabric'))   return 'Ligero y moderno';
  if (l.includes('neoforge')) return 'Nueva generación de Forge';
  if (l.includes('spigot'))   return 'Compatible con plugins';
  return 'Configuración optimizada';
}

function isRecommended(name: string) {
  const l = name.toLowerCase();
  return l.includes('paper') || l.includes('purpur') || l.includes('fabric');
}

export const PlanStep: React.FC<Props> = ({ plan, initialBillingCycle, onNext }) => {
  const { data: cycles = [] } = useBillingCycles();
  const [selectedSlug, setSelectedSlug] = useState<string>(
    initialBillingCycle?.slug ?? (cycles[0]?.slug ?? 'monthly')
  );
  const [serviceName, setServiceName] = useState(`${plan.name} — Mi servicio`);
  const [activeNestId, setActiveNestId] = useState<number | null>(null);
  const [selectedEggId, setSelectedEggId] = useState<number | null>(null);

  const isGameServer = plan.category?.slug === 'gameserver';

  // Fetch eggs only for game server plans
  const planId = (plan as any).uuid ?? plan.id;
  const { data: gameNests = [], isLoading: loadingEggs } = useQuery<GameNest[]>({
    queryKey: ['gameEggs', planId],
    queryFn: () =>
      ApiService.get(`/game-eggs?id=${planId}`).then((r: any) => {
        const raw = r.data?.data ?? r.data ?? [];
        return Array.isArray(raw)
          ? raw.map((n: any) => ({
              id: n.nest_id ?? n.id,
              name: n.nest ?? n.name,
              eggs: n.games ?? n.eggs ?? [],
            }))
          : [];
      }),
    enabled: isGameServer,
    retry: false,
  });

  useEffect(() => {
    if (gameNests.length > 0 && activeNestId === null) {
      setActiveNestId(gameNests[0].id);
    }
  }, [gameNests, activeNestId]);

  const selectedCycle = useMemo(
    () => (cycles as CheckoutBillingCycle[]).find(c => c.slug === selectedSlug),
    [cycles, selectedSlug]
  );

  const finalPrice = useMemo(() => {
    if (!selectedCycle) return parseFloat(String(plan.basePrice)).toFixed(2);
    const discount = parseFloat(String(selectedCycle.discount_percentage)) / 100;
    return (parseFloat(String(plan.basePrice)) * (1 - discount)).toFixed(2);
  }, [plan.basePrice, selectedCycle]);

  const activeNest = gameNests.find(n => n.id === activeNestId);
  const validNests = gameNests.filter(n => n.eggs?.length > 0);

  const canContinue =
    !!selectedCycle &&
    !!serviceName.trim() &&
    (!isGameServer || !!selectedEggId);

  const handleContinue = () => {
    if (!selectedCycle) return;
    onNext(selectedCycle, serviceName.trim(), selectedEggId ?? undefined);
  };

  return (
    <div className="space-y-6">
      {/* Plan summary */}
      <div className="rounded-2xl border border-border bg-muted/30 p-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">
              {plan.category?.name ?? 'Plan'}
            </p>
            <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{plan.description}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-2xl font-bold text-primary">${finalPrice}</p>
            <p className="text-xs text-muted-foreground">/{selectedCycle?.name.toLowerCase() ?? 'mes'}</p>
          </div>
        </div>
        {plan.features && plan.features.length > 0 && (
          <ul className="space-y-1.5">
            {plan.features.slice(0, 5).map((f: any, i: number) => (
              <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 text-green-500 shrink-0" />
                {typeof f === 'string' ? f : f.feature}
              </li>
            ))}
            {plan.features.length > 5 && (
              <li className="text-xs text-muted-foreground pl-6">+{plan.features.length - 5} características más</li>
            )}
          </ul>
        )}
      </div>

      {/* Billing cycle */}
      {cycles.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Ciclo de facturación</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(cycles as CheckoutBillingCycle[]).map((cycle) => {
              const disc = parseFloat(String(cycle.discount_percentage));
              return (
                <button
                  key={cycle.slug}
                  onClick={() => setSelectedSlug(cycle.slug)}
                  className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-colors text-center ${
                    selectedSlug === cycle.slug
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  }`}
                >
                  <span className="block">{cycle.name}</span>
                  {disc > 0 && (
                    <span className="block text-[10px] font-semibold text-green-600 dark:text-green-400 mt-0.5">
                      -{disc}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Game / Egg selector — only for gameserver plans */}
      {isGameServer && (
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Elige tu juego
            {!selectedEggId && <span className="ml-1 text-xs text-red-500">*requerido</span>}
          </label>

          {loadingEggs ? (
            <div className="flex items-center gap-2 py-4 text-muted-foreground text-sm">
              <Loader2 className="w-4 h-4 animate-spin" /> Cargando juegos disponibles…
            </div>
          ) : validNests.length === 0 ? (
            <p className="text-sm text-muted-foreground py-2">No hay juegos disponibles para este plan.</p>
          ) : (
            <div className="space-y-3">
              {/* Platform tabs */}
              <div className="flex flex-wrap gap-2">
                {validNests.map(nest => (
                  <button
                    key={nest.id}
                    type="button"
                    onClick={() => { setActiveNestId(nest.id); setSelectedEggId(null); }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                      activeNestId === nest.id
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/40'
                    }`}
                  >
                    <span className={`inline-flex items-center justify-center w-5 h-5 rounded text-[9px] font-bold border ${getNestColor(nest.name)}`}>
                      {nest.name.slice(0, 2).toUpperCase()}
                    </span>
                    {nest.name}
                  </button>
                ))}
              </div>

              {/* Eggs grid */}
              {activeNest && (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {activeNest.eggs.map(egg => {
                    const selected   = selectedEggId === egg.id;
                    const recommended = isRecommended(egg.name);
                    return (
                      <button
                        key={egg.id}
                        type="button"
                        onClick={() => setSelectedEggId(egg.id)}
                        className={`relative text-left px-4 py-3 rounded-xl border transition-colors ${
                          selected
                            ? 'border-primary bg-primary/5 text-foreground'
                            : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                              {egg.name}
                              {recommended && (
                                <span className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                                  <Sparkles className="w-2.5 h-2.5" /> Rec.
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">{getShortDesc(egg.name)}</p>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center ${selected ? 'border-primary' : 'border-border'}`}>
                            {selected && <div className="w-2 h-2 rounded-full bg-primary" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Service name */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Nombre del servicio
          <span className="ml-1 text-xs font-normal text-muted-foreground">(puedes cambiarlo después)</span>
        </label>
        <input
          value={serviceName}
          onChange={e => setServiceName(e.target.value)}
          placeholder="Mi servidor"
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/40 transition"
        />
      </div>

      <button
        onClick={handleContinue}
        disabled={!canContinue}
        className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition disabled:opacity-60"
      >
        {isGameServer && !selectedEggId ? 'Selecciona un juego para continuar' : 'Continuar al pago'}
      </button>
    </div>
  );
};
