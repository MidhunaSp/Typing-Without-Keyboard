import { useEffect, useRef, useState } from 'react';
import { Hands, Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

export interface HandLandmark {
  x: number;
  y: number;
  z: number;
}

export interface HandTrackingResult {
  landmarks: HandLandmark[][];
  indexFingerTip: HandLandmark | null;
  thumbTip: HandLandmark | null;
  isPinching: boolean;
}

export const useHandTracking = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const [handData, setHandData] = useState<HandTrackingResult>({
    landmarks: [],
    indexFingerTip: null,
    thumbTip: null,
    isPinching: false,
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const handsRef = useRef<Hands | null>(null);
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.5,
    });

    hands.onResults((results: Results) => {
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];

        const indexFingerTip = landmarks[8];
        const thumbTip = landmarks[4];

        const distance = Math.sqrt(
          Math.pow(indexFingerTip.x - thumbTip.x, 2) +
          Math.pow(indexFingerTip.y - thumbTip.y, 2) +
          Math.pow(indexFingerTip.z - thumbTip.z, 2)
        );

        const isPinching = distance < 0.05;

        setHandData({
          landmarks: results.multiHandLandmarks,
          indexFingerTip,
          thumbTip,
          isPinching,
        });
      } else {
        setHandData({
          landmarks: [],
          indexFingerTip: null,
          thumbTip: null,
          isPinching: false,
        });
      }
    });

    handsRef.current = hands;

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current && handsRef.current) {
          await handsRef.current.send({ image: videoRef.current });
        }
      },
      width: 640,
      height: 480,
    });

    camera.start().then(() => {
      setIsInitialized(true);
    });

    cameraRef.current = camera;

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
      if (handsRef.current) {
        handsRef.current.close();
      }
    };
  }, [videoRef]);

  return { handData, isInitialized };
};
