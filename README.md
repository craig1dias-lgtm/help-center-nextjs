# Next.js Help Center

A modern, responsive help center built with Next.js, TypeScript, and Tailwind CSS. This project provides a complete solution for creating a knowledge base or support center for your Shopify store, similar to CardsPlug's help center.

## Features

- 📱 Fully responsive design
- 🔍 Search functionality
- 📂 Category-based organization
- 📄 Markdown content for easy editing
- 🔗 Related articles
- 👍 Article feedback system
- 🚀 Fast performance with Next.js
- 🎨 Beautiful UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 14.6.0 or newer
- npm or yarn

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd help-center-nextjs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
help-center-nextjs/
├── src/
│   ├── components/      # React components
│   ├── content/
│   │   └── articles/    # Markdown files for articles
│   ├── lib/             # Utility functions
│   ├── pages/           # Next.js pages
│   └── styles/          # CSS styles
├── public/              # Static assets
├── next.config.js       # Next.js configuration
└── tailwind.config.js   # Tailwind CSS configuration
```

## Adding Content

### Creating a New Article

1. Create a new Markdown file in `src/content/articles/` with a unique filename (e.g., `new-article.md`).
2. Add frontmatter at the top of the file:

```markdown
---
title: "Article Title"
category: "Category Name"
excerpt: "A brief description of the article"
relatedArticles: ["article-id-1", "article-id-2"]
---

## Main Heading

Your article content goes here...
```

3. Write your article content using Markdown syntax.

### Adding a New Category

To add a new category, update the `getArticlesByCategory` function in `src/lib/articles.ts` to include your new category:

```typescript
export function getArticlesByCategory(): Record<string, CategoryData> {
  // ...existing categories
  'new-category': {
    id: 'new-category',
    title: 'New Category',
    description: 'Description for the new category',
    icon: '🆕',
    articles: []
  },
  // ...
}
```

## Deployment Options

### Option 1: Vercel (Recommended)

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

1. Create an account on Vercel
2. Install the Vercel CLI: `npm i -g vercel`
3. Run `vercel` in the project directory
4. Follow the prompts to deploy

### Option 2: Shopify Integration

To integrate with your Shopify store:

1. Deploy the Next.js app using Vercel or another hosting provider
2. Create a new page in your Shopify admin
3. Add an iframe to your deployed help center:

```html
<iframe 
  src="https://your-deployed-help-center.com" 
  style="width: 100%; height: 100vh; border: none;"
  title="Help Center"
></iframe>
```

### Option 3: Custom Server

You can also deploy to your own server:

1. Build the project: `npm run build`
2. Start the production server: `npm start`
3. Configure your web server (Nginx, Apache, etc.) to serve the app

## Customization

### Styling

This project uses Tailwind CSS for styling. You can customize the design by:

1. Modifying `tailwind.config.js` to change colors, fonts, etc.
2. Editing global styles in `src/styles/globals.css`
3. Updating component-specific styles in their respective files

### Layout

To modify the layout:

1. Edit `src/components/Layout.tsx` for global layout changes
2. Update individual page components in `src/pages/`

### Content Structure

If you need to change how content is organized:

1. Modify the article data structure in `src/lib/articles.ts`
2. Update the components that display articles and categories

## SEO Optimization

This help center is built with SEO in mind:

- Each page has customizable meta titles and descriptions
- The content structure follows best practices for search engines
- The site is fast and mobile-friendly, which improves search rankings

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you need help with this project, please [open an issue](https://github.com/yourusername/help-center-nextjs/issues) on GitHub.
