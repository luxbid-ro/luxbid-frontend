#!/bin/bash

echo "🚀 Deploying LuxBid Frontend to Render.com..."

# Build the application
echo "📦 Building application..."
npm ci
npm run build

# Create environment file for production
echo "🔧 Setting up environment..."
cat > .env.production << EOF
NEXT_PUBLIC_API_BASE_URL=https://luxbid-backend.onrender.com
NODE_ENV=production
EOF

echo "✅ Deployment preparation complete!"
echo "Upload this project to Render.com and configure the web service with:"
echo "Build Command: npm ci && npm run build"
echo "Start Command: npm start"
echo "Environment Variables:"
echo "  NEXT_PUBLIC_API_BASE_URL=https://luxbid-backend.onrender.com"
echo "  NODE_ENV=production"
