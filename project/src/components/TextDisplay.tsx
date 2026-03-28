interface TextDisplayProps {
  text: string;
  wordCount: number;
  charCount: number;
}

export const TextDisplay = ({ text, wordCount, charCount }: TextDisplayProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-800">Typed Text</h2>
        <div className="flex gap-6 text-sm text-slate-600">
          <span className="flex items-center gap-2">
            <span className="font-semibold">Words:</span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{wordCount}</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="font-semibold">Characters:</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">{charCount}</span>
          </span>
        </div>
      </div>
      <div className="bg-slate-50 rounded-lg p-4 min-h-[120px] border-2 border-slate-200">
        <p className="text-lg text-slate-800 leading-relaxed whitespace-pre-wrap">
          {text || <span className="text-slate-400 italic">Start typing with your hands...</span>}
        </p>
      </div>
    </div>
  );
};
