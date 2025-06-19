
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogData";
import { trackPageView } from "@/lib/analytics";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, ChevronRight } from "lucide-react";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import { homepageFaqs } from "@/data/seoFaqs";

const Blog: React.FC = () => {
  useEffect(() => {
    trackPageView('/blog', 'Blog - Hiram Barsky');
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Blog | Hiram Barsky | Professional Design Services</title>
        <meta name="description" content="Insights, case studies, and thoughts on Website Design Services, App Design Services, AI Driven Design, and Product Design from Hiram Barsky." />
        <meta name="keywords" content="Website Design Services Blog, App Design Services Blog, AI Driven Design Blog, Product Design Blog, UX/UI Design Blog, Design Case Studies, Design Process, Professional Designer Blog" />
        <meta property="og:title" content="Blog | Hiram Barsky | Professional Design Services" />
        <meta property="og:description" content="Insights, case studies, and thoughts on Website Design Services, App Design Services, AI Driven Design, and Product Design from Hiram Barsky." />
        <meta property="og:image" content="https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png" />
        <meta property="og:url" content="https://barskydesign.pro/blog" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://barskydesign.pro/blog" />
        
        {/* Structured data for blog */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Hiram Barsky Design Services Blog",
              "description": "Insights, case studies, and thoughts on Website Design Services, App Design Services, AI Driven Design, and Product Design",
              "url": "https://barskydesign.pro/blog",
              "author": {
                "@type": "Person",
                "name": "Hiram Barsky"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Hiram Barsky Design Services",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png"
                }
              },
              "blogPost": [
                ${blogPosts.map(post => `{
                  "@type": "BlogPosting",
                  "headline": "${post.title}",
                  "description": "${post.excerpt}",
                  "author": {
                    "@type": "Person",
                    "name": "${post.author}"
                  },
                  "datePublished": "${post.date}",
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "https://barskydesign.pro/blog/${post.slug}"
                  },
                  "keywords": "${post.tags.join(', ')}, Website Design Services, App Design Services, AI Driven Design Services"
                }`).join(',')}
              ]
            }
          `}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <section className="py-20">
          <div className="section-container max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-barsky-dark dark:text-white">Design Insights & Reflections</h1>
              <p className="text-xl text-barsky-text max-w-2xl mx-auto">Expert thoughts, processes, and lessons learned on Website Design Services, App Design Services, AI Driven Design, and Product Design.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:gap-10">
              {blogPosts.map(post => (
                <Link to={`/blog/${post.slug}`} key={post.id} className="group">
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                    {post.coverImage && (
                      <div className="w-full h-64 overflow-hidden">
                        <img 
                          src={post.coverImage} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="bg-slate-100 dark:bg-slate-800 text-barsky-text dark:text-slate-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className="text-2xl md:text-3xl group-hover:text-barsky-blue transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-barsky-text dark:text-slate-300 mb-4">
                        {post.excerpt}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between pt-0">
                      <div className="flex items-center text-sm text-barsky-text-light">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="mr-4">{post.date}</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                      <span className="text-barsky-blue flex items-center transition-transform group-hover:translate-x-1">
                        Read more <ChevronRight className="ml-1 h-4 w-4" />
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <SeoFaqSection 
          title="Design Blog & Insights Questions"
          faqs={homepageFaqs}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
