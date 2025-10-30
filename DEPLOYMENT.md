# Firebase Hosting Deployment Setup

## Prerequisites
- Firebase project created
- GitHub repository
- Firebase CLI installed: `npm install -g firebase-tools`

## Step 1: Initialize Firebase Hosting
```bash
firebase login
firebase init hosting
```
Select:
- Use existing project
- Public directory: `dist/portfolio`
- Single-page app: Yes
- Automatic builds with GitHub: No (we'll use GitHub Actions)

## Step 2: Update Configuration Files
1. Open `.firebaserc` and replace `YOUR_PROJECT_ID` with your Firebase project ID
2. Open `.github/workflows/firebase-deploy.yml` and replace `YOUR_PROJECT_ID`

## Step 3: Get Firebase Service Account Key
1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Download the JSON file

## Step 4: Add GitHub Secret
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `FIREBASE_SERVICE_ACCOUNT`
5. Value: Paste the entire JSON content from the downloaded file
6. Click "Add secret"

## Step 5: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Step 6: Verify Deployment
1. Go to GitHub → Actions tab
2. Watch the deployment workflow run
3. Once complete, visit your Firebase hosting URL
4. URL format: `https://YOUR_PROJECT_ID.web.app`

## Manual Deployment (Optional)
If you want to deploy manually:
```bash
npm run build
firebase deploy --only hosting
```

## Automatic Deployment
Every push to the `main` branch will:
1. Trigger GitHub Actions workflow
2. Install dependencies
3. Build the Angular app
4. Deploy to Firebase Hosting
5. Your site is live!

## Custom Domain (Optional)
1. Firebase Console → Hosting → Add custom domain
2. Follow the DNS configuration steps
3. Wait for SSL certificate provisioning (24-48 hours)

## Notes
- Free tier: 10GB storage, 360MB/day bandwidth
- Automatic SSL certificates
- Global CDN
- Rollback support in Firebase Console
