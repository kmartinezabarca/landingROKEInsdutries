import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Elements } from '@stripe/react-stripe-js';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { stripePromise } from '@/lib/stripe';
import { useCheckout } from '@/contexts/CheckoutContext';
import { useAuthContext } from '@/contexts/AuthContext';
import { AuthStep } from './steps/AuthStep';
import { PlanStep } from './steps/PlanStep';
import { PaymentStep } from './steps/PaymentStep';
import { SuccessStep } from './steps/SuccessStep';
import type { CheckoutBillingCycle } from '@/contexts/CheckoutContext';

type Step = 'auth' | 'plan' | 'payment' | 'success';

const STEP_LABELS: Record<Step, string> = {
  auth:    'Cuenta',
  plan:    'Plan',
  payment: 'Pago',
  success: '¡Listo!',
};
const STEP_ORDER: Step[] = ['auth', 'plan', 'payment', 'success'];

export const CheckoutModal: React.FC = () => {
  const { isOpen, plan, billingCycle, closeCheckout } = useCheckout();
  const { isAuthenticated } = useAuthContext();

  const getInitialStep = (): Step => isAuthenticated ? 'plan' : 'auth';

  const [step, setStep]             = useState<Step>(getInitialStep);
  const [chosenCycle, setChosenCycle] = useState<CheckoutBillingCycle | null>(billingCycle);
  const [serviceName, setServiceName] = useState('');
  const [chosenEggId, setChosenEggId] = useState<number | undefined>(undefined);
  const [invoiceNum, setInvoiceNum]  = useState('');
  const [total, setTotal]           = useState(0);

  // Reset state each time the modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(getInitialStep());
      setChosenCycle(billingCycle);
      setServiceName('');
      setChosenEggId(undefined);
      setInvoiceNum('');
      setTotal(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const currentIndex = STEP_ORDER.indexOf(step);
  const visibleSteps = isAuthenticated
    ? STEP_ORDER.filter(s => s !== 'auth')
    : STEP_ORDER;

  const stepTitle: Record<Step, string> = {
    auth:    'Identifícate para continuar',
    plan:    'Confirma tu plan',
    payment: 'Datos de pago',
    success: '¡Compra completada!',
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) closeCheckout(); }}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Content */}
        <Dialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl bg-background border border-border shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border shrink-0">
            <div>
              <Dialog.Title className="text-base font-semibold text-foreground">
                {stepTitle[step]}
              </Dialog.Title>
              {plan && step !== 'success' && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {plan.name} · ROKE Industries
                </p>
              )}
            </div>
            <Dialog.Close className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition">
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>

          {/* Step indicator */}
          {step !== 'success' && (
            <div className="px-6 pt-4 pb-2 shrink-0">
              <div className="flex items-center gap-0">
                {visibleSteps.filter(s => s !== 'success').map((s, i) => {
                  const idx = visibleSteps.indexOf(s);
                  const cur = visibleSteps.indexOf(step);
                  const done = idx < cur;
                  const active = idx === cur;
                  return (
                    <React.Fragment key={s}>
                      <div className="flex flex-col items-center">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                          done   ? 'bg-primary text-primary-foreground' :
                          active ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' :
                                   'bg-muted text-muted-foreground'
                        }`}>
                          {done ? '✓' : i + 1}
                        </div>
                        <span className={`text-[10px] mt-1 font-medium ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                          {STEP_LABELS[s]}
                        </span>
                      </div>
                      {i < visibleSteps.filter(s => s !== 'success').length - 1 && (
                        <div className={`flex-1 h-px mx-1 mb-3 transition-colors ${done ? 'bg-primary' : 'bg-border'}`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step content */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
              >
                {step === 'auth' && (
                  <AuthStep onSuccess={() => setStep('plan')} />
                )}

                {step === 'plan' && plan && (
                  <PlanStep
                    plan={plan}
                    initialBillingCycle={chosenCycle}
                    onNext={(cycle, name, eggId) => {
                      setChosenCycle(cycle);
                      setServiceName(name);
                      setChosenEggId(eggId);
                      setStep('payment');
                    }}
                  />
                )}

                {step === 'payment' && plan && chosenCycle && (
                  <Elements stripe={stripePromise}>
                    <PaymentStep
                      plan={plan}
                      billingCycle={chosenCycle}
                      serviceName={serviceName}
                      eggId={chosenEggId}
                      onSuccess={(inv, t) => {
                        setInvoiceNum(inv);
                        setTotal(t);
                        setStep('success');
                      }}
                      onBack={() => setStep('plan')}
                    />
                  </Elements>
                )}

                {step === 'success' && (
                  <SuccessStep
                    invoiceNumber={invoiceNum}
                    total={total}
                    onClose={closeCheckout}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
