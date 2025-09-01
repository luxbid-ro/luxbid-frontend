#!/bin/bash

# 🚀 LuxBid Frontend Auto-Deploy Script
# This script handles the deployment process for Render.com

set -e  # Exit on any error

echo "🎨 Starting LuxBid Frontend Deployment..."
echo "========================================"

# Environment setup
export NODE_ENV=production
export NEXT_PUBLIC_API_BASE_URL="https://luxbid-backend.onrender.com"
export NEXT_PUBLIC_GA_MEASUREMENT_ID="G-PXGXDYQDY3"

echo "📦 Installing dependencies..."
npm ci --production=false

echo "🔍 Running pre-deployment checks..."
# Check if build dependencies are available
if ! command -v npx &> /dev/null; then
    echo "❌ npx not found"
    exit 1
fi

echo "🔨 Building production frontend..."
npm run build

echo "🧪 Running post-build validation..."
# Check if build was successful
if [ ! -d ".next" ]; then
    echo "❌ Build failed - .next directory not found"
    exit 1
fi

echo "📊 Build statistics:"
du -sh .next
echo "Total files: $(find .next -type f | wc -l)"

echo "✅ Frontend deployment ready!"
echo "🔗 Will be available at: https://luxbid.ro"
echo "🔐 Access with: luxbid / luxbid2024"

# The start command will be handled by Render
echo "🚀 Starting production server..."