import { useRef, useState, useEffect } from 'react';
import { Hand, Camera } from 'lucide-react';
import { WebcamFeed } from './components/WebcamFeed';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { TextDisplay } from './components/TextDisplay';
import { SessionControls } from './components/SessionControls';
import { SettingsPanel } from './components/SettingsPanel';
import { useHandTracking } from './hooks/useHandTracking';
import { useGestureDetection } from './hooks/useGestureDetection';
import { supabase, UserPreferences, TypingSession } from './lib/supabase';
import { countWords, countCharacters, applyAutocorrect } from './utils/textUtils';

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [typedText, setTypedText] = useState('');
  const [preferences, setPreferences] = useState<UserPreferences>({
    sensitivity: 0.7,
    hover_delay: 800,
    autocorrect_enabled: true,
    autocomplete_enabled: true,
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [sessionStartTime] = useState(Date.now());
  const [lastPinchState, setLastPinchState] = useState(false);

  const { handData, isInitialized } = useHandTracking(videoRef);
  const { hoveredKey, mappedPosition } = useGestureDetection(
    handData.indexFingerTip,
    handData.isPinching,
    preferences.hover_delay,
    preferences.sensitivity
  );

  useEffect(() => {
    if (handData.isPinching && !lastPinchState && hoveredKey) {
      handleKeyPress(hoveredKey);
    }
    setLastPinchState(handData.isPinching);
  }, [handData.isPinching, hoveredKey]);

  const handleKeyPress = (key: string) => {
    if (key === 'SPACE') {
      let newText = typedText + ' ';
      if (preferences.autocorrect_enabled) {
        newText = applyAutocorrect(newText);
      }
      setTypedText(newText);
    } else if (key === 'BACKSPACE') {
      setTypedText(typedText.slice(0, -1));
    } else if (key === 'CLEAR') {
      setTypedText('');
    } else {
      setTypedText(typedText + key);
    }
  };

  const handleSaveSession = async () => {
    setIsSaving(true);
    try {
      const duration = Math.floor((Date.now() - sessionStartTime) / 1000);
      const session: TypingSession = {
        session_name: `Session ${new Date().toLocaleString()}`,
        typed_text: typedText,
        word_count: countWords(typedText),
        character_count: countCharacters(typedText),
        duration_seconds: duration,
      };

      const { error } = await supabase
        .from('typing_sessions')
        .insert([session]);

      if (error) throw error;

      alert('Session saved successfully!');
    } catch (error) {
      console.error('Error saving session:', error);
      alert('Failed to save session');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all text?')) {
      setTypedText('');
    }
  };

  const handleExportText = () => {
    const blob = new Blob([typedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `air-typing-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      <SettingsPanel
        preferences={preferences}
        onPreferencesChange={setPreferences}
        isOpen={isSettingsOpen}
        onToggle={() => setIsSettingsOpen(!isSettingsOpen)}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-3 flex items-center justify-center gap-3">
            <Hand className="text-blue-400" size={48} />
            Air-Typing System
          </h1>
          <p className="text-blue-200 text-lg">Type in mid-air using hand gestures</p>
          <div className="mt-4 flex items-center justify-center gap-3 text-sm">
            <div className="bg-blue-500 bg-opacity-20 px-4 py-2 rounded-full border border-blue-400">
              <Camera size={16} className="inline mr-2" />
              <span className="text-blue-200">
                {isInitialized ? 'Camera Active' : 'Initializing...'}
              </span>
            </div>
            <div className="bg-green-500 bg-opacity-20 px-4 py-2 rounded-full border border-green-400">
              <span className="text-green-200">
                {handData.indexFingerTip ? 'Hand Detected' : 'No Hand'}
              </span>
            </div>
            <div className="bg-purple-500 bg-opacity-20 px-4 py-2 rounded-full border border-purple-400">
              <span className="text-purple-200">
                {handData.isPinching ? 'Pinching' : 'Open Hand'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <WebcamFeed
              videoRef={videoRef}
              landmarks={handData.landmarks}
              isInitialized={isInitialized}
            />

            <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="text-white font-semibold mb-3 text-lg">How to Use:</h3>
              <ul className="text-blue-200 space-y-2 text-sm">
                <li>• Show your hand to the camera</li>
                <li>• Point your index finger at a key</li>
                <li>• Pinch (touch thumb and index finger) to type</li>
                <li>• Hover over SPACE, BACKSPACE, or CLEAR to use them</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <TextDisplay
              text={typedText}
              wordCount={countWords(typedText)}
              charCount={countCharacters(typedText)}
            />

            <SessionControls
              onSave={handleSaveSession}
              onClear={handleClearAll}
              onExport={handleExportText}
              isSaving={isSaving}
            />
          </div>
        </div>

        <VirtualKeyboard
          onKeyPress={handleKeyPress}
          hoveredKey={hoveredKey}
          fingerPosition={mappedPosition}
        />
      </div>
    </div>
  );
}

export default App;
