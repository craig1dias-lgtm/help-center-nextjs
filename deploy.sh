#!/bin/bash

# Help Center Deployment Script
# This script helps deploy your Next.js help center to Vercel

echo "========================================"
echo "  Help Center Deployment Script"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "⚙️ Vercel CLI is not installed. Installing now..."
    npm install -g vercel
else
    echo "✅ Vercel CLI is already installed."
fi

# Install dependencies
echo "⚙️ Installing project dependencies..."
npm install

# Check if installation was successful
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies. Please check the error messages above."
    exit 1
fi

echo "✅ Dependencies installed successfully."

# Deploy to Vercel
echo "⚙️ Deploying to Vercel..."
echo "You'll be prompted to log in if you haven't already."
echo ""

vercel

# Check if deployment was successful
if [ $? -ne 0 ]; then
    echo "❌ Deployment failed. Please check the error messages above."
    exit 1
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "========================================"
echo "  Next Steps:"
echo "========================================"
echo "1. Copy your Vercel deployment URL"
echo "2. Create a new page in your Shopify admin"
echo "3. Embed your help center using an iframe"
echo "4. Add the page to your navigation"
echo ""
echo "For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo "========================================"
