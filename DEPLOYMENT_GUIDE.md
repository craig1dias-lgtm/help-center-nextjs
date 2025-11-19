# Deployment Guide for Help Center

This guide provides step-by-step instructions to deploy your Next.js Help Center to Vercel and integrate it with your Shopify store.

## Prerequisites

- Node.js 14.6.0 or newer
- npm or yarn
- A Vercel account (sign up at [vercel.com](https://vercel.com) if you don't have one)
- Access to your Shopify admin

## Step 1: Prepare Your Project

First, make sure all dependencies are installed:

```bash
# Navigate to your project directory
cd help-center-nextjs

# Install dependencies
npm install
```

## Step 2: Install Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel
```

## Step 3: Deploy to Vercel

```bash
# In your project directory
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Link to existing project? No
# - What's your project name? help-center-yourstore
# - In which directory is your code located? ./
# - Want to override settings? No
```

After deployment completes, you'll receive a URL like:
```
https://help-center-yourstore.vercel.app
```

## Step 4: Verify Your Deployment

1. Visit your Vercel deployment URL
2. Test the following functionality:
   - Home page loads with all categories
   - Search functionality works
   - Article pages display correctly
   - Navigation between pages works
   - Mobile responsiveness

## Step 5: Integrate with Shopify

### Option 1: Create a Shopify Page with Embedded iframe

1. Log in to your Shopify admin
2. Go to **Online Store** → **Pages**
3. Click **Add page**
4. Enter details:
   - Title: "Help Center" or "Support"
   - For the content, click the `</>` HTML editor button and paste:

```html
<div style="width: 100%; height: 100vh; overflow: hidden;">
  <iframe 
    src="YOUR_VERCEL_URL_HERE" 
    style="width: 100%; height: 100vh; border: none; overflow: hidden;"
    title="Help Center"
    id="help-center-iframe"
    allowfullscreen
  ></iframe>
</div>
```

5. Replace `YOUR_VERCEL_URL_HERE` with your actual Vercel deployment URL
6. Click **Save**

### Option 2: Use a Custom Domain

For a more professional setup:

1. In your Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `help.yourstore.com`)
4. Follow Vercel's instructions to configure DNS settings
5. Link to this custom domain from your Shopify navigation

## Step 6: Add to Shopify Navigation

1. Go to **Online Store** → **Navigation**
2. Edit your main menu or footer menu
3. Click **Add menu item**
4. Enter:
   - Name: "Help Center" or "Support"
   - Link: Select your newly created page or enter your custom domain URL
5. Click **Add**
6. Save the menu

## Step 7: Update Content (When Needed)

To add or edit articles:

1. Edit the Markdown files in `src/content/articles/`
2. Redeploy using the Vercel CLI:
   ```bash
   vercel --prod
   ```

## Troubleshooting

### If the iframe doesn't display correctly:

1. Check your browser console for errors
2. Ensure there are no Content Security Policy (CSP) issues
3. Try adding the following script to handle iframe resizing:

```html
<script>
  // Adjust iframe height based on content
  window.addEventListener('message', function(event) {
    if (event.origin === 'YOUR_VERCEL_URL_HERE') {
      if (event.data.type === 'frameHeight') {
        document.getElementById('help-center-iframe').style.height = event.data.height + 'px';
      }
    }
  }, false);
</script>
```

### If the help center is slow to load:

1. Check your Vercel analytics for performance issues
2. Consider optimizing images and reducing bundle size
3. Enable Vercel's Edge Network for faster global delivery

## Continuous Deployment (Optional)

For easier updates:

1. Create a GitHub repository for your help center
2. Push your code to the repository
3. Connect your Vercel project to the GitHub repository
4. Enable automatic deployments

Now, whenever you update content or code in the repository, Vercel will automatically deploy the changes.

## Need More Help?

Refer to the following resources:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Shopify Theme Development](https://shopify.dev/themes)
