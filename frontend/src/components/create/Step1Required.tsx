import type { CreateSitePayload } from '../../types/valentine';

interface Step1Props {
  data: CreateSitePayload;
  onChange: (updates: Partial<CreateSitePayload>) => void;
}

export default function Step1Required({ data, onChange }: Step1Props) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block font-pixel text-[10px] text-neon-magenta mb-2">
          Your Name <span className="text-pixel-red">*</span>
        </label>
        <input
          type="text"
          value={data.creatorName}
          onChange={(e) => onChange({ creatorName: e.target.value })}
          placeholder="Enter your name"
          maxLength={50}
          className="retro-input"
        />
      </div>

      <div>
        <label className="block font-pixel text-[10px] text-neon-magenta mb-2">
          Their Name <span className="text-pixel-red">*</span>
        </label>
        <input
          type="text"
          value={data.partnerName}
          onChange={(e) => onChange({ partnerName: e.target.value })}
          placeholder="Enter your valentine's name"
          maxLength={50}
          className="retro-input"
        />
      </div>

      <div>
        <label className="block font-pixel text-[10px] text-neon-magenta mb-2">
          Your Love Message <span className="text-pixel-red">*</span>
        </label>
        <textarea
          value={data.loveMessage}
          onChange={(e) => onChange({ loveMessage: e.target.value })}
          placeholder="Write your heart out..."
          maxLength={2000}
          rows={6}
          className="retro-textarea"
        />
        <p className="text-right font-pixel text-[8px] text-gray-500 mt-1">
          {data.loveMessage.length}/2000
        </p>
      </div>
    </div>
  );
}
