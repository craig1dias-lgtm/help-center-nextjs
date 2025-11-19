import { GetServerSideProps } from 'next';
import React from 'react';
import Link from 'next/link';
import { getSortedArticlesData, ArticleData } from '@/lib/articles';
import SearchBar from '@/components/SearchBar';

interface SearchPageProps {
  searchResults: ArticleData[];
  searchQuery: string;
}

export default function Search({ searchResults, searchQuery }: SearchPageProps) {
  return (
    <div className="container-custom py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>
        
        <div className="mb-8">
          <SearchBar />
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600">
            {searchResults.length === 0
              ? `No results found for "${searchQuery}"`
              : `Found ${searchResults.length} result${searchResults.length === 1 ? '' : 's'} for "${searchQuery}"`}
          </p>
        </div>
        
        {searchResults.length > 0 ? (
          <div className="space-y-6">
            {searchResults.map((article) => (
              <div key={article.id} className="bg-white p-6 rounded-lg shadow-md">
                <Link href={`/articles/${article.id}`} className="text-xl font-semibold text-gray-900 hover:text-primary-600 no-underline">
                  {article.title}
                </Link>
                
                <p className="text-gray-600 mt-2">
                  {article.excerpt || article.content.substring(0, 150)}...
                </p>
                
                <div className="flex items-center mt-3 text-sm">
                  <span className="text-gray-500">Category:</span>
                  <Link 
                    href={`/categories/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    {article.category}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 mb-6">
              We couldn't find any articles matching your search. Please try different keywords or browse our categories.
            </p>
            
            <Link href="/" className="btn">
              Browse All Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const searchQuery = (query.q as string) || '';
  
  if (!searchQuery.trim()) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  
  const allArticles = getSortedArticlesData();
  
  // Simple search implementation - in a real app, you might want to use a more sophisticated search
  const searchResults = allArticles.filter((article) => {
    const searchableText = `${article.title} ${article.content} ${article.category} ${article.excerpt || ''}`.toLowerCase();
    return searchableText.includes(searchQuery.toLowerCase());
  });
  
  return {
    props: {
      title: `Search results for "${searchQuery}"`,
      description: `Search results for "${searchQuery}" in our help center.`,
      searchResults,
      searchQuery,
    },
  };
};
