import { useState } from 'react';
import { createSite } from '../../api/client';
import type { CreateSitePayload, SiteCreatedResponse } from '../../types/valentine';
import StepIndicator from './StepIndicator';
import Step1Required from './Step1Required';
import Step2Photo from './Step2Photo';
import Step3Story from './Step3Story';
import Step4Extras from './Step4Extras';
import SuccessScreen from './SuccessScreen';

const TOTAL_STEPS = 4;

export default function CreateWizard() {
  const [step, setStep] = useState(1);
  const [slideDir, setSlideDir] = useState<'right' | 'left'>('right');
  const [animKey, setAnimKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<SiteCreatedResponse | null>(null);
  const [formData, setFormData] = useState<CreateSitePayload>({
    creatorName: '',
    partnerName: '',
    loveMessage: '',
  });

  const updateForm = (updates: Partial<CreateSitePayload>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const next = () => {
    setSlideDir('right');
    setAnimKey((k) => k + 1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const prev = () => {
    setSlideDir('left');
    setAnimKey((k) => k + 1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const submit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const res = await createSite(formData);
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return <SuccessScreen url={result.url} id={result.id} partnerName={formData.partnerName} />;
  }

  const stepContent = (
    <>
      {step === 1 && <Step1Required data={formData} onChange={updateForm} />}
      {step === 2 && <Step2Photo data={formData} onChange={updateForm} />}
      {step === 3 && <Step3Story data={formData} onChange={updateForm} />}
      {step === 4 && <Step4Extras data={formData} onChange={updateForm} />}
    </>
  );

  return (
    <div>
      <StepIndicator current={step} total={TOTAL_STEPS} />

      {error && (
        <div
          className="bg-red-900/30 border-2 border-pixel-red/50 p-3 mb-4 text-center font-pixel text-[10px] text-pixel-red"
          style={{ borderStyle: 'inset' }}
        >
          {error}
        </div>
      )}

      <div className="bg-black/20 border border-gray-700/50 rounded p-4 md:p-6">
        <div
          key={animKey}
          className={slideDir === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'}
        >
          {stepContent}
        </div>

        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button onClick={prev} className="xp-btn">
              &lt; Back
            </button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS ? (
            <button
              onClick={next}
              disabled={step === 1 && (!formData.creatorName || !formData.partnerName || !formData.loveMessage)}
              className="xp-btn-primary"
            >
              Next &gt;
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={submitting}
              className="xp-btn-primary"
            >
              {submitting ? 'Creating...' : 'Create Valentine!'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
