
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogData";
import { trackPageView } from "@/lib/analytics";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, ChevronRight } from "lucide-react";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import { homepageFaqs } from "@/data/seoFaqs";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";

const Blog: React.FC = () => {
  useEffect(() => {
    trackPageView('/blog', 'AI-Enhanced Design Insights - Hiram Barsky');
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <EnhancedGlobalSeo 
        title="AI-Enhanced Design Insights | Hiram Barsky | Accessibility & Business-Focused UX"
        description="Expert insights on AI-enhanced design processes, accessibility compliance, conversion optimization, and cross-functional UX collaboration. Learn about Claude AI integration, WCAG implementation, and business-focused design strategies from an AI-fluent UX designer."
        canonicalUrl="https://barskydesign.pro/blog"
        pageType="blog"
        keywords={[
          "AI-enhanced design blog", "accessibility compliance insights", "conversion optimization UX",
          "Claude AI design process", "WCAG implementation guide", "cross-functional design collaboration",
          "business-focused UX strategy", "AI-augmented design workflow", "T-shaped designer insights"
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Hiram Barsky AI-Enhanced Design Insights",
          "description": "Expert insights on AI-enhanced design processes, accessibility compliance, and business-focused UX strategies",
          "url": "https://barskydesign.pro/blog",
          "author": {
            "@type": "Person",
            "name": "Hiram Barsky",
            "jobTitle": "AI-Fluent UX Designer & Accessibility Specialist"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Hiram Barsky AI-Enhanced Design Services",
            "logo": {
              "@type": "ImageObject",
              "url": "https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png"
            }
          }
        }}
      />
      
      <Header />
      
      <main className="flex-grow">
        <section className="py-20">
          <div className="section-container max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-barsky-dark dark:text-white">AI-Enhanced Design Insights</h1>
              <p className="text-xl text-barsky-text max-w-2xl mx-auto">Expert thoughts on AI-augmented design processes, accessibility compliance, conversion optimization, and cross-functional collaboration strategies.</p>
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
        
        <SeoFaqSection 
          title="AI-Enhanced Design Process & Strategy Questions"
          faqs={homepageFaqs}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
