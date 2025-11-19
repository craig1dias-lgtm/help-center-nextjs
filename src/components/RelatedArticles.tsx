import React from 'react';
import Link from 'next/link';
import { ArticleData } from '@/lib/articles';

interface RelatedArticlesProps {
  articles: ArticleData[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
      <div className="space-y-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.id}`}
            className="flex justify-between items-center p-3 border border-gray-200 rounded-md hover:border-primary-300 hover:bg-blue-50 hover:translate-x-1 transition-all no-underline"
          >
            <span className="text-gray-800 font-medium">{article.title}</span>
            <span className="text-primary-600 text-xl">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
