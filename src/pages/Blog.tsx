import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogLanding from '@/components/blog/BlogLanding';

const Blog: React.FC = () => {
  return (
    <>
      <Header />
      <BlogLanding />
      <Footer />
    </>
  );
};

export default Blog;
