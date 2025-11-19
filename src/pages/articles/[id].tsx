import { GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';
import { getAllArticleIds, getArticleData, getRelatedArticles, ArticleData } from '@/lib/articles';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleFeedback from '@/components/ArticleFeedback';
import RelatedArticles from '@/components/RelatedArticles';

interface ArticlePageProps {
  articleData: ArticleData;
  relatedArticles: ArticleData[];
}

export default function Article({ articleData, relatedArticles }: ArticlePageProps) {
  return (
    <div className="container-custom py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: articleData.category, href: `/categories/${articleData.category.toLowerCase().replace(/\s+/g, '-')}` },
              { label: articleData.title, href: `/articles/${articleData.id}`, isCurrent: true },
            ]}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">{articleData.title}</h1>
          
          <div 
            className="article-content prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: articleData.contentHtml || '' }} 
          />
          
          <ArticleFeedback articleId={articleData.id} />
          
          {relatedArticles.length > 0 && (
            <RelatedArticles articles={relatedArticles} />
          )}
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">Still need help? <a href="/articles/contact-us" className="text-primary-600 font-medium">Contact our support team</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllArticleIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const articleData = await getArticleData(params?.id as string);
  
  // Get related articles if specified in frontmatter
  let relatedArticles: ArticleData[] = [];
  if (articleData.relatedArticles && articleData.relatedArticles.length > 0) {
    relatedArticles = getRelatedArticles(articleData.id, articleData.relatedArticles);
  }
  
  return {
    props: {
      title: articleData.title,
      description: articleData.excerpt || `${articleData.title} - Help Center article`,
      articleData,
      relatedArticles,
    },
  };
};
