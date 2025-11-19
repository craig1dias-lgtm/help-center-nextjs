import React from 'react';
import Link from 'next/link';
import { CategoryData } from '@/lib/articles';

interface CategoryCardProps {
  category: CategoryData;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="card hover:translate-y-[-4px] transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl" aria-hidden="true">
          {category.icon}
        </span>
        <h2 className="text-xl font-semibold text-gray-800 m-0">{category.title}</h2>
      </div>
      
      <p className="text-gray-600 mb-4">{category.description}</p>
      
      <div className="space-y-2">
        {category.articles.slice(0, 3).map((article) => (
          <Link
            href={`/articles/${article.id}`}
            key={article.id}
            className="block p-3 border border-gray-200 rounded-md hover:border-primary-300 hover:bg-blue-50 hover:translate-x-1 transition-all no-underline"
          >
            <h3 className="text-base font-medium text-gray-800 m-0">{article.title}</h3>
            {article.excerpt && (
              <p className="text-sm text-gray-500 mt-1 mb-0 line-clamp-2">{article.excerpt}</p>
            )}
          </Link>
        ))}
      </div>
      
      {category.articles.length > 3 && (
        <div className="mt-4">
          <Link href={`/categories/${category.id}`} className="text-sm font-medium text-primary-600 hover:text-primary-800">
            See all {category.articles.length} articles →
          </Link>
        </div>
      )}
    </div>
  );
}
