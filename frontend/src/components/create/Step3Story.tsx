import type { CreateSitePayload } from '../../types/valentine';

interface Step3Props {
  data: CreateSitePayload;
  onChange: (updates: Partial<CreateSitePayload>) => void;
}

export default function Step3Story({ data, onChange }: Step3Props) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="font-pixel text-[11px] text-neon-magenta mb-1">Your Story</p>
        <p className="text-sm text-gray-500">Optional — tell your love story</p>
      </div>

      <div>
        <label className="block font-pixel text-[10px] text-neon-magenta mb-2">
          How We Met
        </label>
        <textarea
          value={data.howWeMet || ''}
          onChange={(e) => onChange({ howWeMet: e.target.value })}
          placeholder="It all started when..."
          maxLength={1000}
          rows={4}
          className="retro-textarea"
        />
        <p className="text-right font-pixel text-[8px] text-gray-500 mt-1">
          {(data.howWeMet || '').length}/1000
        </p>
      </div>

      <div>
        <label className="block font-pixel text-[10px] text-neon-magenta mb-2">
          Favorite Memory
        </label>
        <textarea
          value={data.favoriteMemory || ''}
          onChange={(e) => onChange({ favoriteMemory: e.target.value })}
          placeholder="My favorite memory with you is..."
          maxLength={1000}
          rows={4}
          className="retro-textarea"
        />
        <p className="text-right font-pixel text-[8px] text-gray-500 mt-1">
          {(data.favoriteMemory || '').length}/1000
        </p>
      </div>
    </div>
  );
}
