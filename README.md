## 🖐️ Air-Typing System
A modern, web-based application that allows users to type in mid-air using hand gestures. By leveraging computer vision and real-time hand tracking, this system eliminates the need for a physical keyboard, providing an accessible and futuristic typing experience.

## ✨ Features
Real-time Gesture Recognition: Uses high-fidelity hand tracking to detect finger positions and movements.

## Intuitive Controls:

Point: Move your index finger to navigate the virtual keyboard.

Pinch: Touch your thumb and index finger together to "click" or type a key.

Hover: Trigger special keys like SPACE, BACKSPACE, and CLEAR by hovering over them.

Customizable Settings: Adjust Gesture Sensitivity and Hover Delay to match your typing speed.

Smart Typing: Includes built-in Autocorrect and Autocomplete features for increased accuracy.

Session Management: Save your progress, export your typed text as a .txt file, or clear the workspace with a single click.

## 🛠️ Tech Stack
Frontend: React.js, TypeScript, Vite

Styling: Tailwind CSS (for a sleek, responsive UI)

Hand Tracking: MediaPipe / TensorFlow.js (Webcam gesture detection)

## Backend/Database: Supabase (for session storage and migrations)

🚀 Getting Started
Prerequisites
Node.js (v18 or higher)

## A working webcam

Installation
Clone the repository:

Bash
git clone https://github.com/your-username/air-typing-system.git
cd air-typing-system
Install dependencies:

Bash
npm install
Environment Setup:
Create a .env file in the root directory and add your Supabase credentials:

## Code snippet
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
Run the application:

Bash
npm run dev
The app will be available at http://localhost:5173 (or the port shown in your terminal).

## 📖 How to Use
Activate Camera: Ensure your webcam is on and the "Hand Detected" status is green.

Select Keys: Point your index finger at the desired character on the on-screen keyboard.

Type: Perform a pinch gesture (thumb + index finger) to input the character.

Special Keys: Simply hover your finger over the SPACE or BACKSPACE buttons for the duration of the set "Hover Delay" to trigger them.

Export: Once finished, click Export Text to download your session as a text file.

## 📂 Project Structure
Plaintext
TYPING-WITHOUT-KEYBOARD
└── project/
    ├── .bolt/                  # Configuration for the Bolt development environment
    ├── node_modules/           # Project dependencies
    ├── src/                    # Main source code
    │   ├── components/         # Modular UI Components
    │   │   ├── SessionControls.tsx # Logic for Save, Export, and Clear buttons
    │   │   ├── SettingsPanel.tsx   # Sliders for sensitivity and hover delay
    │   │   ├── TextDisplay.tsx     # Area showing typed text, word, and character counts
    │   │   ├── VirtualKeyboard.tsx # The visual QWERTY layout and key interaction
    │   │   └── WebcamFeed.tsx      # Video canvas with real-time hand landmark overlays
    │   ├── hooks/              # Custom React hooks (e.g., useGestures, useSupabase)
    │   ├── utils/              # Calculation logic (pinch detection, coordinate mapping)
    │   ├── App.tsx             # Main layout and state coordination
    │   ├── index.css           # Global styles and Tailwind CSS imports
    │   ├── main.tsx            # Application entry point
    │   └── vite-env.d.ts       # TypeScript definitions for Vite
    ├── supabase/               # Backend configuration
    │   └── migrations/         # SQL scripts for database schema (e.g., sessions table)
    ├── .env                    # Environment variables (Supabase URL/Keys)
    ├── .gitignore              # Files to ignore in Git
    ├── eslint.config.js        # Linting configuration
    ├── index.html              # Main HTML template
    ├── package-lock.json       # Version lock for dependencies
    ├── package.json            # Scripts and dependency list
    ├── postcss.config.js       # PostCSS configuration
    ├── tailwind.config.js      # Tailwind CSS theme settings
    ├── tsconfig.app.json       # TS config for the frontend app
    ├── tsconfig.json           # Root TypeScript configuration
    ├── tsconfig.node.json      # TS config for Node-based tools
    └── vite.config.ts          # Vite build and server configuration

## 📖 How to Use
Grant Camera Access: Allow the browser to use your webcam.

Hand Detection: Wait for the "Hand Detected" indicator to turn green.

Typing: 
Move your index finger over a key.

Pinch your thumb and index finger together to type.

For SPACE or BACKSPACE, simply hover over the button until the delay timer completes.

Export: Click the green Export Text button to download your work.

## 📜 License

This project is open-source and available under the MIT License.

---

## 👩‍💻 Author

**Midhuna Varshini S P**

---

✨ *Control your system with just a wave of your hand!* ✨
