# Firebase Setup Instructions

## Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Enter project name and follow the steps
4. Click "Create project"

## Step 2: Register Web App
1. In Firebase console, click the web icon (</>)
2. Register your app with a nickname
3. Copy the Firebase configuration object

## Step 3: Update Configuration
1. Open `src/environments/environment.ts`
2. Replace the placeholder values with your Firebase config:
   ```typescript
   export const environment = {
     production: false,
     firebase: {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT_ID.appspot.com",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     }
   };
   ```

## Step 4: Enable Firestore Database
1. In Firebase console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location
5. Click "Enable"

## Step 5: Install Dependencies
```bash
npm install
```

## Step 6: Test
1. Run `npm start`
2. Go to http://localhost:4200/admin
3. Make changes and click "Save Changes"
4. Check Firebase console to see your data

## Security Rules (Production)
Update Firestore rules in Firebase console:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolio/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Notes
- Data is saved to Firebase AND localStorage (as backup)
- Firebase loads first, falls back to localStorage if offline
- Free tier: 50K reads/day, 20K writes/day
