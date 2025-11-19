require('dotenv').config();
const express = require('express');
const next = require('next');
const { Shopify } = require('@shopify/shopify-api');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Initialize Shopify API
Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https:\/\//, ""),
  API_VERSION: process.env.API_VERSION,
  IS_EMBEDDED_APP: true,
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

app.prepare().then(() => {
  const server = express();

  // Set up Shopify authentication and webhook handling
  server.get("/auth", async (req, res) => {
    const shop = req.query.shop;
    
    if (!shop) {
      return res.status(400).send("Missing shop parameter");
    }

    const authRoute = await Shopify.Auth.beginAuth(
      req,
      res,
      shop,
      '/auth/callback',
      false,
    );

    res.redirect(authRoute);
  });

  server.get('/auth/callback', async (req, res) => {
    try {
      const session = await Shopify.Auth.validateAuthCallback(
        req,
        res,
        req.query
      );
      
      // Redirect to app with shop parameter
      res.redirect(`/?shop=${session.shop}`);
    } catch (e) {
      console.error("Error during auth callback:", e);
      res.status(500).send("Error during auth callback");
    }
  });

  // All other routes go to Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
