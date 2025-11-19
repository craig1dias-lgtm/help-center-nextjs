import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

export interface ArticleData {
  id: string;
  title: string;
  category: string;
  excerpt?: string;
  date?: string;
  content: string;
  contentHtml?: string;
  relatedArticles?: string[];
}

export interface CategoryData {
  id: string;
  title: string;
  description: string;
  icon: string;
  articles: ArticleData[];
}

export function getSortedArticlesData(): ArticleData[] {
  // Get file names under /articles
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { 
        title: string; 
        category: string; 
        excerpt?: string;
        date?: string;
        relatedArticles?: string[];
      }),
      content: matterResult.content,
    };
  });

  // Sort articles by date
  return allArticlesData.sort((a, b) => {
    if (a.date && b.date) {
      return a.date < b.date ? 1 : -1;
    }
    return a.title > b.title ? 1 : -1;
  });
}

export function getAllArticleIds() {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getArticleData(id: string): Promise<ArticleData> {
  const fullPath = path.join(articlesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the article metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    content: matterResult.content,
    ...(matterResult.data as { 
      title: string; 
      category: string; 
      excerpt?: string;
      date?: string;
      relatedArticles?: string[];
    }),
  };
}

export function getArticlesByCategory(): Record<string, CategoryData> {
  const allArticles = getSortedArticlesData();
  const categories: Record<string, CategoryData> = {
    'general-information': {
      id: 'general-information',
      title: 'General Information',
      description: 'Find answers to general questions about our products, services, and policies.',
      icon: 'ℹ️',
      articles: []
    },
    'delivery': {
      id: 'delivery',
      title: 'Delivery',
      description: 'Information about shipping, tracking, and delivery of your orders.',
      icon: '🚚',
      articles: []
    },
    'order-processing': {
      id: 'order-processing',
      title: 'Order Processing',
      description: 'Learn about our order processing times and requirements.',
      icon: '⏱️',
      articles: []
    },
    'orders': {
      id: 'orders',
      title: 'Orders',
      description: 'Information about managing your orders, changes, and issues.',
      icon: '📋',
      articles: []
    }
  };

  // Group articles by category
  allArticles.forEach(article => {
    const categoryId = article.category.toLowerCase().replace(/\s+/g, '-');
    if (categories[categoryId]) {
      categories[categoryId].articles.push(article);
    } else {
      categories[categoryId] = {
        id: categoryId,
        title: article.category,
        description: `Articles related to ${article.category}`,
        icon: '📄',
        articles: [article]
      };
    }
  });

  return categories;
}

export function getAllCategories(): CategoryData[] {
  const categoriesMap = getArticlesByCategory();
  return Object.values(categoriesMap);
}

export function getCategoryData(categoryId: string): CategoryData | null {
  const categories = getArticlesByCategory();
  return categories[categoryId] || null;
}

export function getRelatedArticles(articleId: string, relatedIds: string[]): ArticleData[] {
  const allArticles = getSortedArticlesData();
  return allArticles.filter(article => relatedIds.includes(article.id) && article.id !== articleId);
}
