import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ViewerPage from './ViewerPage';

export default function PreviewPage() {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    const url = `${window.location.origin}/v/${id}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 right-0 z-50 bg-pixel-pink/90 backdrop-blur-sm text-white text-center py-2 px-4 font-pixel text-[10px] flex items-center justify-center gap-3 shadow-md">
        <span>Preview Mode — This is how your valentine will see it</span>
        <button
          onClick={copyLink}
          className={`px-3 py-1 rounded transition-all duration-200 ${
            copied
              ? 'bg-button-yes text-white'
              : 'bg-white text-pixel-pink hover:bg-paper-cream'
          }`}
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
      <div className="pt-8">
        <ViewerPage isPreview />
      </div>
    </div>
  );
}
