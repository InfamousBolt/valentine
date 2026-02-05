import PolaroidFrame from '../../ui/PolaroidFrame';

interface PhotoPageProps {
  photoBase64: string;
  caption?: string;
}

export default function PhotoPage({ photoBase64, caption }: PhotoPageProps) {
  const rotation = -3 + Math.random() * 6; // Random -3 to 3 degrees

  return (
    <div className="w-full max-w-lg mx-auto px-6 py-12 flex flex-col items-center">
      <div className="animate-drop-in">
        <PolaroidFrame rotation={rotation} caption={caption}>
          <img
            src={photoBase64}
            alt="Our photo"
            className="w-full h-full object-cover"
          />
        </PolaroidFrame>
      </div>
    </div>
  );
}
