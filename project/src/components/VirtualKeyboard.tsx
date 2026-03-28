import { useEffect, useState } from 'react';

interface Key {
  char: string;
  x: number;
  y: number;
  width: number;
  height: number;
  special?: boolean;
}

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  hoveredKey: string | null;
  fingerPosition: { x: number; y: number } | null;
}

const KEYBOARD_LAYOUT = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ['SPACE', 'BACKSPACE', 'CLEAR'],
];

export const VirtualKeyboard = ({ onKeyPress, hoveredKey, fingerPosition }: VirtualKeyboardProps) => {
  const [keys, setKeys] = useState<Key[]>([]);

  useEffect(() => {
    const keyList: Key[] = [];
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
          special: char === 'SPACE' || char === 'BACKSPACE' || char === 'CLEAR',
        });

        startX += width + spacing;
      });
    });

    setKeys(keyList);
  }, []);

  const handleKeyClick = (key: string) => {
    onKeyPress(key);
  };

  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl p-6">
      <svg width="800" height="400" className="mx-auto">
        {keys.map((key, index) => {
          const isHovered = hoveredKey === key.char;

          return (
            <g key={index}>
              <rect
                x={key.x}
                y={key.y}
                width={key.width}
                height={key.height}
                rx={8}
                fill={isHovered ? '#3b82f6' : key.special ? '#1e293b' : '#334155'}
                stroke={isHovered ? '#60a5fa' : '#475569'}
                strokeWidth={2}
                className="transition-all duration-150 cursor-pointer"
                onClick={() => handleKeyClick(key.char)}
              />
              <text
                x={key.x + key.width / 2}
                y={key.y + key.height / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isHovered ? '#ffffff' : '#e2e8f0'}
                fontSize={key.special ? '12' : '16'}
                fontWeight="600"
                className="pointer-events-none select-none"
              >
                {key.char}
              </text>
            </g>
          );
        })}

        {fingerPosition && (
          <circle
            cx={fingerPosition.x}
            cy={fingerPosition.y}
            r={8}
            fill="#ef4444"
            stroke="#ffffff"
            strokeWidth={2}
            className="pointer-events-none"
          />
        )}
      </svg>
    </div>
  );
};
