# 📱 How to Convert Kavya-Kanaja to an Android APK

Follow these steps to turn your web app into a mobile app using Android Studio.

## 1. Prerequisites (On your Computer)
- **Node.js** installed.
- **Android Studio** installed.
- **Project Folder**: Download your project from AI Studio (use the "Export" or "Download ZIP" option).

## 2. Prepare the Project
Open your terminal in the project folder and run:
```bash
# 1. Install dependencies
npm install

# 2. Build the web application
npm run build

# 3. Add the Android platform (run this first time only)
npx cap add android
```

## 3. Sync & Build
Every time you make changes to the code, run:
```bash
# 1. Rebuild web assets
npm run build

# 2. Copy assets to Android folder
npx cap sync
```

## 4. In Android Studio
Run this command to open the project in Android Studio:
```bash
npx cap open android
```

**Inside Android Studio:**
1. Wait for "Gradle Sync" to finish.
2. Go to **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
3. Once finished, a popup will appear. Click **locate** to find your `app-debug.apk`.
4. Copy this file to your phone and install it!

---

## 💡 Prompt for Android Studio Gemini
Copy and paste this into the Gemini chat inside Android Studio if you get stuck:

> "I have a React + Vite + Firebase project that I am converting to Android using Capacitor. The `capacitor.config.ts` is already set up to use the `dist` folder. 
> 
> My goal is to generate a debug APK to test on my phone. Please help me ensure all Gradle dependencies are correct and guide me through the steps to build the APK."
