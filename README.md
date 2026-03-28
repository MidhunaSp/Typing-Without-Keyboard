# ⌨️ Typing Without Keyboard

A gesture-based virtual typing system that allows users to type using hand gestures via webcam — eliminating the need for a physical keyboard.

---

## 🚀 Features

* ✋ Real-time hand tracking using webcam
* ⌨️ Virtual QWERTY keyboard interface
* 🤏 Pinch gesture detection for key selection
* 📊 Live text display with word & character count
* ⚙️ Adjustable sensitivity and hover delay
* 💾 Save, export, and clear typed sessions
* ☁️ Supabase integration for session storage

---

## 🛠️ Tech Stack

* **Frontend:** React + TypeScript + Vite
* **Styling:** Tailwind CSS
* **Computer Vision:** MediaPipe / Hand Tracking
* **Backend/DB:** Supabase

---

## 📂 Project Structure

```
TYPING-WITHOUT-KEYBOARD
└── project/
    ├── .bolt/                  # Bolt development config
    ├── node_modules/           # Dependencies
    ├── src/                    # Source code
    │   ├── components/
    │   │   ├── SessionControls.tsx
    │   │   ├── SettingsPanel.tsx
    │   │   ├── TextDisplay.tsx
    │   │   ├── VirtualKeyboard.tsx
    │   │   └── WebcamFeed.tsx
    │   ├── hooks/              # Custom hooks
    │   ├── utils/              # Gesture logic & helpers
    │   ├── App.tsx
    │   ├── index.css
    │   ├── main.tsx
    │   └── vite-env.d.ts
    ├── supabase/
    │   └── migrations/         # Database schema
    ├── .env                    # Supabase keys
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── tsconfig.json
    └── vite.config.ts
```

---

## ⚙️ Setup & Run

```bash
npm install
npm run dev
```

Open: `http://localhost:5173`

---

## 🎮 How It Works

1. Webcam captures hand movements
2. Hand landmarks are detected
3. Pinch gesture is used to select keys
4. Coordinates map to virtual keyboard
5. Selected keys appear in text display

---

## 💡 Tips

* Ensure good lighting
* Keep hand within camera frame
* Use steady pinch gestures for accuracy

---

## 🔮 Future Enhancements

* Multi-language keyboard support
* Voice + gesture hybrid input
* Mobile support
* AI-based gesture prediction

---

## 👩‍💻 Author

**Midhuna Varshini S P**

---

✨ *Type without touching a keyboard!* ✨
