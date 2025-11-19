import { GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';
import Link from 'next/link';
import { getAllCategories, getCategoryData, CategoryData } from '@/lib/articles';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';

interface CategoryPageProps {
  categoryData: CategoryData;
}

export default function Category({ categoryData }: CategoryPageProps) {
  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: categoryData.title, href: `/categories/${categoryData.id}`, isCurrent: true },
          ]}
        />
      </div>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl" aria-hidden="true">
          {categoryData.icon}
        </span>
        <h1 className="text-3xl font-bold m-0">{categoryData.title}</h1>
      </div>

      <p className="text-gray-600 text-lg mb-8 max-w-3xl">
        {categoryData.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryData.articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {categoryData.articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No articles found in this category.</p>
          <Link href="/" className="btn">
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = getAllCategories();
  const paths = categories.map((category) => ({
    params: { id: category.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryData = getCategoryData(params?.id as string);

  if (!categoryData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      title: categoryData.title,
      description: categoryData.description,
      categoryData,
    },
  };
};
