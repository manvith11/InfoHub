# Deployment Guide for InfoHub

## Pre-Deployment Checklist

- [ ] OpenWeatherMap API key obtained
- [ ] Code pushed to GitHub
- [ ] All environment variables documented

## Deploying to Vercel

### Method 1: Deploy Frontend and Backend Separately (Recommended)

#### Step 1: Deploy Backend

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `server`
   - **Build Command**: Leave empty (or `npm install`)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. Add Environment Variables:
   - `OPENWEATHER_API_KEY`: Your OpenWeatherMap API key
   - `PORT`: 3001 (optional, Vercel assigns automatically)
   - `NODE_ENV`: production

6. Deploy!

7. Copy the deployment URL (e.g., `https://your-backend.vercel.app`)

#### Step 2: Deploy Frontend

1. Create a new Vercel project
2. Import the same GitHub repository
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `server/client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add Environment Variables:
   - `VITE_API_URL`: Your backend URL from Step 1 (e.g., `https://your-backend.vercel.app`)

5. Deploy!

### Method 2: Deploy as Monorepo (Advanced)

1. Create a `vercel.json` in the root (already created)
2. Deploy the entire project
3. Configure build settings for both frontend and backend
4. Add all environment variables

## Testing the Deployment

1. Visit your frontend URL
2. Test all three modules:
   - Weather: Search for a city
   - Currency: Convert INR amounts
   - Quotes: Generate new quotes
3. Check browser console for any errors

## Troubleshooting

### API Calls Failing
- Check that `VITE_API_URL` is set correctly in frontend
- Verify backend is deployed and accessible
- Check CORS settings in backend

### Weather Not Working
- Verify `OPENWEATHER_API_KEY` is set in backend environment variables
- Check OpenWeatherMap API quota/limits

### Build Failures
- Ensure all dependencies are in `package.json`
- Check Node.js version compatibility
- Review build logs in Vercel dashboard

## Environment Variables Summary

### Backend (.env)
```
OPENWEATHER_API_KEY=your_key_here
PORT=3001
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.vercel.app
```

## Demo Video Checklist

When creating your demo video (2-3 minutes), make sure to show:

1. ✅ Landing page with all three tabs
2. ✅ Weather module - search for different cities
3. ✅ Currency converter - convert different amounts
4. ✅ Quote generator - generate multiple quotes
5. ✅ Loading states
6. ✅ Error handling (if possible, show what happens with invalid input)
7. ✅ Responsive design (show on mobile if possible)

## Submission

1. ✅ Code pushed to GitHub (public repository)
2. ✅ Application deployed and accessible via public URL
3. ✅ Demo video uploaded to Google Drive
4. ✅ Google Drive folder shared with "Anyone with link" access
5. ✅ Share Google Drive folder link before 7 PM on 6th November 2025

