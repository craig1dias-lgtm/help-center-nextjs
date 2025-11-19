# MatchMint Help Center Shopify App

This Shopify app embeds the Next.js help center directly into your Shopify store as a native app.

## Features

- Seamless integration with your Shopify store
- Maintains consistent branding and navigation
- Keeps users on your domain
- Improves SEO by hosting content on your domain
- Provides a better user experience than iframes or external links

## Setup Instructions

### Prerequisites

- Node.js 16+
- npm or yarn
- A Shopify Partner account
- A Shopify development store

### Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your environment variables:
   ```
   cp .env.example .env
   ```
4. Fill in your Shopify API credentials in the .env file
5. Start the development server:
   ```
   npm run dev
   ```

## Deployment

1. Deploy the app to a hosting service (Heroku, Vercel, etc.)
2. Set up the production environment variables
3. Submit the app to the Shopify App Store or use it as a custom app

## Architecture

This app uses:
- Shopify App Bridge for seamless integration
- React for the frontend
- Node.js for the backend
- Your existing Next.js help center content
