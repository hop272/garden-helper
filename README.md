# garden-helper

Garden Helper is a multi-platform project to help gardeners manage plants, view them on a map, and create care plans. It contains a React web app (`growsmart`) and an Expo-based mobile prototype (`android-app`).

Quick start

Web (growsmart)

Prerequisites: Node.js and npm installed.

Run locally:

```bash
cd growsmart
npm install
npm start
```

This starts the React development server and opens the web app at http://localhost:3000 by default.

Android (Expo prototype)

Prerequisites: Node.js, npm, and Expo CLI (or use `npx expo`). To run on Android you need Android SDK / emulator or a physical device.

Run locally:

```bash
cd android-app
npm install
npm run start   # starts Expo
# then in another terminal either:
npm run android # build and run on connected Android device/emulator
```

Notes
- The root folder mainly contains workspace config; each app has its own `package.json` and dependencies.
- If you prefer yarn, replace `npm install` with `yarn` and `npm start` with `yarn start`.
