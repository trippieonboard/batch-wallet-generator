#!/bin/bash
# Script for deploying to Vercel

echo "🚀 Preparing for Vercel deployment..."

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Batch EVM Wallet Generator"
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm i -g vercel
fi

# Deploy to Vercel
echo "☁️  Deploying to Vercel..."
vercel

echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Visit your Vercel dashboard to get your deployment URL"
echo "2. Update the 'homeUrl' in public/farcaster.json with your domain"
echo "3. Use Warpcast Developer Tools to verify your domain and get signing credentials"
echo "4. Update the 'accountAssociation' fields in public/farcaster.json"
