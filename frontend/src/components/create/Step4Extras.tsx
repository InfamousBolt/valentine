import { useState } from 'react';
import type { CreateSitePayload } from '../../types/valentine';

interface Step4Props {
  data: CreateSitePayload;
  onChange: (updates: Partial<CreateSitePayload>) => void;
}

export default function Step4Extras({ data, onChange }: Step4Props) {
  const [newReason, setNewReason] = useState('');
  const reasons = data.reasons || [];

  const addReason = () => {
    const trimmed = newReason.trim();
    if (!trimmed || reasons.length >= 6) return;
    onChange({ reasons: [...reasons, trimmed] });
    setNewReason('');
  };

  const removeReason = (index: number) => {
    onChange({ reasons: reasons.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="font-pixel text-[11px] text-neon-magenta mb-1">Extra Touches</p>
        <p className="text-sm text-gray-500">Optional — make it extra special</p>
      </div>

      {/* Reasons I Love You */}
      <div>
        <label className="block font-pixel text-[10px] text-neon-magenta mb-2">
          Reasons I Love You ({reasons.length}/6)
        </label>
        <div className="space-y-2 mb-2">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-neon-magenta/5 border border-neon-magenta/20 px-3 py-2"
            >
              <span className="font-pixel text-[8px] text-pixel-red">{i + 1}.</span>
              <span className="flex-1 font-handwritten text-lg text-white">{reason}</span>
              <button
                onClick={() => removeReason(i)}
                className="text-pixel-red hover:text-red-400 font-pixel text-[8px]"
              >
                X
              </button>
            </div>
          ))}
        </div>
        {reasons.length < 6 && (
          <div className="flex gap-2">
            <input
              type="text"
              value={newReason}
              onChange={(e) => setNewReason(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addReason()}
              placeholder="Add a reason..."
              className="retro-input flex-1 font-handwritten text-lg"
            />
            <button
              onClick={addReason}
              disabled={!newReason.trim()}
              className="xp-btn-primary disabled:opacity-40"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* Song URL */}
      <div>
        <label className="block font-pixel text-[10px] text-neon-magenta mb-2">Our Song</label>
        <input
          type="url"
          value={data.songUrl || ''}
          onChange={(e) => onChange({ songUrl: e.target.value })}
          placeholder="Spotify or YouTube link"
          className="retro-input"
        />
        <p className="font-pixel text-[7px] text-gray-500 mt-1">Paste a Spotify or YouTube link</p>
      </div>

      {/* Pet Name */}
      <div>
        <label className="block font-pixel text-[10px] text-neon-magenta mb-2">Pet Name</label>
        <input
          type="text"
          value={data.petName || ''}
          onChange={(e) => onChange({ petName: e.target.value })}
          placeholder="What do you call them?"
          maxLength={30}
          className="retro-input"
        />
      </div>

      {/* Secret Message */}
      <div>
        <label className="block font-pixel text-[10px] text-neon-magenta mb-2">Secret Message</label>
        <textarea
          value={data.secretMessage || ''}
          onChange={(e) => onChange({ secretMessage: e.target.value })}
          placeholder="A hidden message they'll have to scratch to reveal..."
          maxLength={500}
          rows={3}
          className="retro-textarea"
        />
        <p className="text-right font-pixel text-[8px] text-gray-500 mt-1">
          {(data.secretMessage || '').length}/500
        </p>
      </div>
    </div>
  );
}
