import { Save, Download, Trash2 } from 'lucide-react';

interface SessionControlsProps {
  onSave: () => void;
  onClear: () => void;
  onExport: () => void;
  isSaving: boolean;
}

export const SessionControls = ({ onSave, onClear, onExport, isSaving }: SessionControlsProps) => {
  return (
    <div className="flex gap-3 justify-center">
      <button
        onClick={onSave}
        disabled={isSaving}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Save size={20} />
        {isSaving ? 'Saving...' : 'Save Session'}
      </button>
      <button
        onClick={onExport}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all"
      >
        <Download size={20} />
        Export Text
      </button>
      <button
        onClick={onClear}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all"
      >
        <Trash2 size={20} />
        Clear All
      </button>
    </div>
  );
};
