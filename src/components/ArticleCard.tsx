import React from 'react';
import Link from 'next/link';
import { ArticleData } from '@/lib/articles';

interface ArticleCardProps {
  article: ArticleData;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link 
      href={`/articles/${article.id}`}
      className="card hover:border-primary-300 border border-transparent hover:translate-x-1 transition-all no-underline block"
    >
      <h3 className="text-lg font-medium text-gray-800 mb-2">{article.title}</h3>
      {article.excerpt && (
        <p className="text-gray-600 mb-0">{article.excerpt}</p>
      )}
      <div className="mt-2 text-primary-600 font-medium">Read more →</div>
    </Link>
  );
}
