# Integrating the Help Center with Shopify

This guide provides detailed instructions for integrating your Next.js Help Center with your Shopify store. There are several methods to choose from depending on your specific needs and technical capabilities.

## Option 1: Embedded App (Recommended)

This method embeds your help center within your Shopify store using an iframe, maintaining your store's navigation and branding.

### Step 1: Deploy Your Help Center

1. Deploy the Next.js Help Center to Vercel:
   ```bash
   npm install -g vercel
   cd help-center-nextjs
   vercel
   ```

2. After deployment, you'll receive a URL like `https://help-center-yourstore.vercel.app`

### Step 2: Create a New Page in Shopify

1. Log in to your Shopify admin
2. Go to **Online Store** > **Pages**
3. Click **Add page**
4. Set the title to "Help Center" or "Support"
5. In the content editor, click the `</>` button to access the HTML editor
6. Add the following code:

```html
<div style="width: 100%; height: 100vh; overflow: hidden;">
  <iframe 
    src="https://help-center-yourstore.vercel.app" 
    style="width: 100%; height: 100vh; border: none; overflow: hidden;"
    title="Help Center"
    id="help-center-iframe"
  ></iframe>
</div>

<script>
  // Adjust iframe height based on content
  window.addEventListener('message', function(event) {
    if (event.origin === 'https://help-center-yourstore.vercel.app') {
      if (event.data.type === 'frameHeight') {
        document.getElementById('help-center-iframe').style.height = event.data.height + 'px';
      }
    }
  }, false);
</script>
```

7. Click **Save**

### Step 3: Add to Navigation

1. Go to **Online Store** > **Navigation**
2. Edit your main menu or footer menu
3. Add a link to your new Help Center page
4. Save the changes

## Option 2: Theme App Extension (Advanced)

For a more integrated experience, you can create a Shopify Theme App Extension. This requires more technical setup but provides a seamless integration.

### Step 1: Set Up a Shopify App

1. Create a Shopify Partner account if you don't have one
2. Create a new app in the Partner Dashboard
3. Set up App Bridge and authentication

### Step 2: Create a Theme App Extension

1. Initialize a Theme App Extension:
   ```bash
   npm init @shopify/app@latest
   cd your-app
   npm run generate extension
   ```

2. Select "Theme App Extension" when prompted

3. Configure your extension to load your help center content

### Step 3: Deploy Your App

1. Deploy your app to a hosting provider
2. Install the app on your Shopify store
3. Publish your Theme App Extension

## Option 3: Custom Domain Integration

This method allows you to host your help center on a subdomain of your main store.

### Step 1: Set Up DNS

1. In your domain provider's dashboard, create a CNAME record:
   - Name: `help` or `support`
   - Value: Point to your Vercel deployment URL

2. Wait for DNS propagation (can take up to 48 hours)

### Step 2: Configure Custom Domain in Vercel

1. In your Vercel project dashboard, go to "Settings" > "Domains"
2. Add your custom domain (e.g., `help.yourstore.com`)
3. Verify the domain

### Step 3: Link from Your Shopify Store

1. Go to **Online Store** > **Navigation**
2. Edit your main menu or footer menu
3. Add a link to your custom domain (e.g., `https://help.yourstore.com`)
4. Save the changes

## Option 4: Shopify Proxy Page (Shopify Plus Only)

If you have Shopify Plus, you can use the App Proxy feature to serve your help center under your store's domain.

### Step 1: Set Up App Proxy

1. In your Shopify Partner dashboard, go to your app settings
2. Under "App setup", find "App proxy"
3. Configure:
   - Subpath prefix: `help` or `support`
   - Proxy URL: Your Vercel deployment URL
   - Subpath: Leave empty or specify a path

### Step 2: Deploy with Proxy Awareness

Update your Next.js app to be aware of the proxy path by modifying `next.config.js`:

```javascript
module.exports = {
  basePath: '/apps/help',
  async rewrites() {
    return [
      {
        source: '/apps/help/:path*',
        destination: '/:path*',
      },
    ];
  },
};
```

## Customizing the Integration

### Matching Your Store's Theme

To make your help center match your Shopify store's design:

1. Update the colors in `tailwind.config.js` to match your brand colors
2. Modify the layout in `src/components/Layout.tsx` to match your store's header and footer
3. Add your logo to the help center header

### Adding Analytics

To track help center usage:

1. Add Google Analytics or another analytics provider to your Next.js app
2. Track page views, search queries, and article feedback
3. Use this data to improve your help content

### Connecting to Shopify Customer Data

For a personalized experience (advanced):

1. Implement Shopify authentication in your Next.js app
2. Use the Shopify API to fetch customer-specific data
3. Show relevant articles based on the customer's order history

## Troubleshooting

### CORS Issues

If you encounter CORS (Cross-Origin Resource Sharing) issues:

1. Add your Shopify store domain to the allowed origins in your Next.js app:

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://your-store.myshopify.com',
          },
        ],
      },
    ];
  },
};
```

### iFrame Height Issues

If the iframe doesn't resize properly:

1. Add this code to your Next.js app:

```javascript
// src/pages/_app.tsx
useEffect(() => {
  const sendHeight = () => {
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'frameHeight',
        height: document.documentElement.scrollHeight
      }, '*');
    }
  };
  
  window.addEventListener('load', sendHeight);
  window.addEventListener('resize', sendHeight);
  
  return () => {
    window.removeEventListener('load', sendHeight);
    window.removeEventListener('resize', sendHeight);
  };
}, []);
```

### Mobile Responsiveness

If there are issues on mobile:

1. Ensure your viewport meta tag is properly set:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
```

2. Test thoroughly on various mobile devices and adjust your CSS accordingly

## Need More Help?

If you need assistance with your Shopify integration, please contact our support team or refer to the following resources:

- [Shopify App Development Documentation](https://shopify.dev/apps)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Guide](https://vercel.com/docs/deployments/overview)
