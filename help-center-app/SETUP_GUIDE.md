# Setting Up Your MatchMint Help Center Shopify App

This guide will walk you through the process of setting up and deploying your Help Center Shopify app.

## Step 1: Create a Shopify Partner Account

If you don't already have one:
1. Go to [partners.shopify.com](https://partners.shopify.com)
2. Sign up for a free Partner account
3. Verify your email address

## Step 2: Create a Development Store

1. Log in to your Partner account
2. Go to "Stores" > "Add store"
3. Select "Development store"
4. Fill in the required information
5. Click "Create development store"

## Step 3: Create a Custom App

1. In your Partner dashboard, go to "Apps" > "Create app"
2. Select "Custom app"
3. Name your app "MatchMint Help Center"
4. Set the app URL to your deployment URL (e.g., https://your-app.herokuapp.com)
5. Set the allowed redirection URL(s) to:
   - https://your-app.herokuapp.com/auth/callback

## Step 4: Configure App Settings

1. Go to "App setup"
2. Under "App settings", note your API key and API secret key
3. Go to "Access scopes" and select:
   - `read_products`
   - `read_customers` (optional)
   - `read_orders` (optional)

## Step 5: Set Up Environment Variables

1. Copy `.env.example` to `.env`
2. Fill in your Shopify API credentials:
   ```
   SHOPIFY_API_KEY=your_api_key_from_partner_dashboard
   SHOPIFY_API_SECRET=your_api_secret_from_partner_dashboard
   SCOPES=read_products,read_customers,read_orders
   HOST=https://your-app-url.com
   API_VERSION=2023-10
   NEXT_PUBLIC_HELP_CENTER_URL=https://help-center-nextjs.vercel.app
   ```

## Step 6: Deploy the App

### Option 1: Deploy to Heroku

1. Create a Heroku account if you don't have one
2. Install the Heroku CLI
3. Log in to Heroku:
   ```
   heroku login
   ```
4. Create a new Heroku app:
   ```
   heroku create matchmint-help-center
   ```
5. Set environment variables:
   ```
   heroku config:set SHOPIFY_API_KEY=your_api_key
   heroku config:set SHOPIFY_API_SECRET=your_api_secret
   heroku config:set SCOPES=read_products,read_customers,read_orders
   heroku config:set HOST=https://your-heroku-app.herokuapp.com
   heroku config:set API_VERSION=2023-10
   heroku config:set NEXT_PUBLIC_HELP_CENTER_URL=https://help-center-nextjs.vercel.app
   ```
6. Deploy the app:
   ```
   git push heroku main
   ```

### Option 2: Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add the environment variables in the Vercel dashboard
4. Deploy the app

## Step 7: Install the App in Your Store

1. Go to your development store admin
2. Go to "Apps" > "Develop apps"
3. Click on "MatchMint Help Center"
4. Click "Install app"
5. Go through the authorization process

## Step 8: Add to Your Store Navigation

1. In your Shopify admin, go to "Online Store" > "Navigation"
2. Edit your main menu
3. Add a new menu item:
   - Name: "Help Center"
   - Link: "Apps" > "MatchMint Help Center"
4. Save the changes

## Step 9: Customize and Test

1. Open your store and navigate to the Help Center
2. Test all functionality
3. Make any necessary customizations to the design

## Troubleshooting

- If you encounter CORS issues, make sure your help center allows embedding from your Shopify domain
- If authentication fails, double-check your API credentials and redirect URLs
- If the iframe doesn't load, verify that your help center URL is accessible and allows embedding
