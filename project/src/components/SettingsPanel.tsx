import { Settings, Sliders } from 'lucide-react';
import { UserPreferences } from '../lib/supabase';

interface SettingsPanelProps {
  preferences: UserPreferences;
  onPreferencesChange: (preferences: UserPreferences) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const SettingsPanel = ({ preferences, onPreferencesChange, isOpen, onToggle }: SettingsPanelProps) => {
  const handleSensitivityChange = (value: number) => {
    onPreferencesChange({ ...preferences, sensitivity: value });
  };

  const handleHoverDelayChange = (value: number) => {
    onPreferencesChange({ ...preferences, hover_delay: value });
  };

  const handleAutocorrectToggle = () => {
    onPreferencesChange({ ...preferences, autocorrect_enabled: !preferences.autocorrect_enabled });
  };

  const handleAutocompleteToggle = () => {
    onPreferencesChange({ ...preferences, autocomplete_enabled: !preferences.autocomplete_enabled });
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={onToggle}
        className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-full shadow-lg transition-all"
      >
        {isOpen ? <Sliders size={24} /> : <Settings size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-16 right-0 bg-white rounded-xl shadow-2xl p-6 w-80 border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Sliders size={20} />
            Settings
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Gesture Sensitivity
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={preferences.sensitivity}
                onChange={(e) => handleSensitivityChange(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Low</span>
                <span className="font-semibold text-blue-600">{preferences.sensitivity.toFixed(1)}</span>
                <span>High</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Hover Delay (ms)
              </label>
              <input
                type="range"
                min="200"
                max="2000"
                step="100"
                value={preferences.hover_delay}
                onChange={(e) => handleHoverDelayChange(parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Fast</span>
                <span className="font-semibold text-blue-600">{preferences.hover_delay}ms</span>
                <span>Slow</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">Autocorrect</span>
              <button
                onClick={handleAutocorrectToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.autocorrect_enabled ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.autocorrect_enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">Autocomplete</span>
              <button
                onClick={handleAutocompleteToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.autocomplete_enabled ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.autocomplete_enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
