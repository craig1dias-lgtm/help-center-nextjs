import { GetStaticProps } from 'next';
import React from 'react';
import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import { getAllCategories, CategoryData } from '@/lib/articles';

interface HomeProps {
  categories: CategoryData[];
}

export default function Home({ categories }: HomeProps) {
  return (
    <>
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-6">How can we help?</h1>
          <SearchBar />
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">Still need help?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you with any questions or concerns.
          </p>
          <a href="/articles/contact-us" className="btn">
            Contact Support
          </a>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const categories = getAllCategories();
  
  return {
    props: {
      title: 'Help Center',
      description: 'Find answers to your questions about our products and services in our help center.',
      categories,
    },
  };
};
