import { useRef } from 'react';
import type { CreateSitePayload } from '../../types/valentine';
import { compressImage } from '../../utils/imageCompression';

interface Step2Props {
  data: CreateSitePayload;
  onChange: (updates: Partial<CreateSitePayload>) => void;
}

export default function Step2Photo({ data, onChange }: Step2Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    try {
      const base64 = await compressImage(file, 1200, 0.8);
      onChange({ photoBase64: base64 });
    } catch {
      alert('Failed to process image');
    }
  };

  const removePhoto = () => {
    onChange({ photoBase64: undefined, photoCaption: undefined });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="font-pixel text-[11px] text-neon-magenta mb-1">Add a Photo</p>
        <p className="text-sm text-gray-500">Optional — add a photo of you two together</p>
      </div>

      {data.photoBase64 ? (
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={data.photoBase64}
              alt="Preview"
              className="max-w-[280px] max-h-[280px] object-cover border-2 border-gray-600"
              style={{ borderStyle: 'inset' }}
            />
            <button
              onClick={removePhoto}
              className="absolute -top-2 -right-2 bg-pixel-red text-white w-6 h-6 rounded-full text-xs flex items-center justify-center hover:bg-red-700 shadow-md"
            >
              X
            </button>
          </div>

          <div className="w-full max-w-sm">
            <label className="block font-pixel text-[10px] text-neon-magenta mb-2">
              Photo Caption
            </label>
            <input
              type="text"
              value={data.photoCaption || ''}
              onChange={(e) => onChange({ photoCaption: e.target.value })}
              placeholder="Add a caption..."
              maxLength={200}
              className="retro-input font-handwritten text-lg"
            />
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-neon-magenta/30 p-12 text-center cursor-pointer hover:border-neon-magenta/60 hover:bg-neon-magenta/5 transition-all"
        >
          <div className="font-pixel text-[10px] text-neon-magenta mb-2">Click to upload</div>
          <p className="text-sm text-gray-500">JPG, PNG — max 2MB</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
