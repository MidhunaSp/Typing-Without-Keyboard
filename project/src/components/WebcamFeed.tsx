import { useRef, useEffect } from 'react';
import { HandLandmark } from '../hooks/useHandTracking';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { HAND_CONNECTIONS } from '@mediapipe/hands';

interface WebcamFeedProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  landmarks: HandLandmark[][];
  isInitialized: boolean;
}

export const WebcamFeed = ({ videoRef, landmarks, isInitialized }: WebcamFeedProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawFrame = () => {
      if (!videoRef.current || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      if (landmarks.length > 0) {
        landmarks.forEach((handLandmarks) => {
          drawConnectors(ctx, handLandmarks, HAND_CONNECTIONS, {
            color: '#00FF00',
            lineWidth: 2,
          });
          drawLandmarks(ctx, handLandmarks, {
            color: '#FF0000',
            lineWidth: 1,
            radius: 3,
          });
        });
      }

      requestAnimationFrame(drawFrame);
    };

    drawFrame();
  }, [landmarks, videoRef]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <video
        ref={videoRef}
        className="hidden"
        playsInline
      />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="w-full rounded-xl shadow-2xl border-4 border-slate-700"
      />
      {!isInitialized && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 bg-opacity-75 rounded-xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white text-lg">Initializing camera...</p>
          </div>
        </div>
      )}
    </div>
  );
};
