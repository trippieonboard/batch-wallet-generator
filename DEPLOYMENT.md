# Batch EVM Wallet Generator - Deployment Guide

## 1 GitHub Repository Setup

\\\ash
cd C:\Users\klekl\batch-wallet-generator

# Initialize Git (if not already done)
git init
git add .
git commit -m "Initial commit: Batch EVM Wallet Generator for Farcaster"
git branch -M main

# Add remote repository (replace USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/batch-wallet-generator.git
git push -u origin main
\\\

## 2 Deployment on Vercel

### Option A: Web Interface (Recommended)

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Paste your GitHub repository URL
4. Vercel will automatically detect the Next.js project
5. Click "Deploy"
6. Wait for completion (usually 2-3 minutes)

### Option B: Vercel CLI

\\\ash
# Install Vercel CLI (if needed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy project
vercel

# For production deployment
vercel --prod
\\\

## 3 After Deployment

After successful deployment you'll get a URL like:
\\\
https://batch-wallet-generator-xxxxx.vercel.app
\\\

## 4 Deployment on Railway.app

1. Go to https://railway.app/new
2. Click "Deploy from GitHub"
3. Select your repository
4. Railway will auto-detect Next.js
5. Wait for build and deployment (5-10 minutes)
6. Your app URL will be displayed in the Railway dashboard

## 5 Deployment on Render.com

1. Go to https://render.com/new
2. Connect your GitHub account
3. Select "Web Service"
4. Choose your repository
5. Set build command: \
pm run build\
6. Set start command: \
pm start\
7. Deploy and wait for completion

## 6 Docker Deployment

\\\ash
# Build Docker image
docker build -t batch-wallet-generator .

# Run container locally
docker run -p 3000:3000 batch-wallet-generator

# Deploy to cloud (AWS, Google Cloud, etc.)
docker push your-registry/batch-wallet-generator
\\\

## 7 Environment Variables

For Farcaster Frame integration, set these in your deployment platform:

\\\env
NEXT_PUBLIC_FARCASTER_FID=your_fid_here
NEXT_PUBLIC_APP_URL=https://your-deployed-domain.com
\\\

##  Security Notes

- Private keys are generated **only on the client-side**
- No sensitive data is transmitted to the server
- All environment variables starting with \NEXT_PUBLIC_\ are safe (public)
- Never commit \.env.local\ with sensitive keys
