import { useEffect, useState, useRef } from 'react';
import { HandLandmark } from './useHandTracking';

interface KeyboardKey {
  char: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const KEYBOARD_LAYOUT = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ['SPACE', 'BACKSPACE', 'CLEAR'],
];

const generateKeys = (): KeyboardKey[] => {
  const keyList: KeyboardKey[] = [];
  const keyWidth = 60;
  const keyHeight = 60;
  const spacing = 8;
  const startY = 20;

  KEYBOARD_LAYOUT.forEach((row, rowIndex) => {
    const rowWidth = row.reduce((acc, key) => {
      if (key === 'SPACE') return acc + keyWidth * 3;
      if (key === 'BACKSPACE' || key === 'CLEAR') return acc + keyWidth * 1.5;
      return acc + keyWidth;
    }, 0) + (row.length - 1) * spacing;

    let startX = (800 - rowWidth) / 2;

    row.forEach((char) => {
      let width = keyWidth;
      if (char === 'SPACE') width = keyWidth * 3;
      if (char === 'BACKSPACE' || char === 'CLEAR') width = keyWidth * 1.5;

      keyList.push({
        char,
        x: startX,
        y: startY + rowIndex * (keyHeight + spacing),
        width,
        height: keyHeight,
      });

      startX += width + spacing;
    });
  });

  return keyList;
};

export const useGestureDetection = (
  indexFingerTip: HandLandmark | null,
  isPinching: boolean,
  hoverDelay: number,
  sensitivity: number
) => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [mappedPosition, setMappedPosition] = useState<{ x: number; y: number } | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastKeyRef = useRef<string | null>(null);
  const keysRef = useRef<KeyboardKey[]>(generateKeys());

  useEffect(() => {
    if (!indexFingerTip) {
      setHoveredKey(null);
      setMappedPosition(null);
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
      return;
    }

    const mappedX = indexFingerTip.x * 800;
    const mappedY = indexFingerTip.y * 400;

    setMappedPosition({ x: mappedX, y: mappedY });

    const hoveredKeyObj = keysRef.current.find(
      (key) =>
        mappedX >= key.x &&
        mappedX <= key.x + key.width &&
        mappedY >= key.y &&
        mappedY <= key.y + key.height
    );

    if (hoveredKeyObj) {
      setHoveredKey(hoveredKeyObj.char);
      lastKeyRef.current = hoveredKeyObj.char;
    } else {
      setHoveredKey(null);
      lastKeyRef.current = null;
    }
  }, [indexFingerTip]);

  useEffect(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, [hoveredKey]);

  return {
    hoveredKey,
    mappedPosition,
    lastKey: lastKeyRef.current,
  };
};
