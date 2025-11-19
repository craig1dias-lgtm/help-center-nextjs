import fetch from 'isomorphic-fetch';

// This API route proxies requests to your help center
// This helps avoid CORS issues when embedding your help center
export default async function handler(req, res) {
  const { path = '' } = req.query;
  
  // Get the help center URL from environment variables
  const helpCenterUrl = process.env.NEXT_PUBLIC_HELP_CENTER_URL || 'https://help-center-nextjs.vercel.app';
  
  try {
    // Forward the request to your help center
    const response = await fetch(`${helpCenterUrl}/${path}`, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        // Forward any necessary headers
        ...req.headers,
        // Remove headers that might cause issues
        host: undefined,
        'x-forwarded-host': undefined,
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    // Get the response data
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Set the appropriate status code
    res.status(response.status);

    // Forward the response headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Send the response
    if (contentType && contentType.includes('application/json')) {
      res.json(data);
    } else {
      res.send(data);
    }
  } catch (error) {
    console.error('Error proxying request to help center:', error);
    res.status(500).json({ error: 'Failed to proxy request to help center' });
  }
}
