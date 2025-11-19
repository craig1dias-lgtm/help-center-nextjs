import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title, description }: LayoutProps) {
  const siteTitle = title ? `${title} | Help Center` : 'Help Center';
  
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={description || 'Find answers to your questions in our help center'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-800 no-underline">
              <span>Help Center</span>
            </Link>
            
            <nav>
              <ul className="flex gap-6">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-primary-600 no-underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-gray-600 hover:text-primary-600 no-underline">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-primary-600 no-underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-gray-100 py-8 mt-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Help Center</h3>
              <p className="text-gray-600">Find answers to your questions about our products and services.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-primary-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/categories/general-information" className="text-gray-600 hover:text-primary-600">
                    General Information
                  </Link>
                </li>
                <li>
                  <Link href="/categories/delivery" className="text-gray-600 hover:text-primary-600">
                    Delivery
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-primary-600">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-600 mb-2">Need more help?</p>
              <Link href="/articles/contact-us" className="btn">
                Contact Support
              </Link>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Your Store Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
