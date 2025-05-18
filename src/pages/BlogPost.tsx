
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts, type BlogPost } from "@/data/blogData";
import { trackPageView, trackContentEngagement } from "@/lib/analytics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const BlogPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Find the post based on slug
    const foundPost = blogPosts.find(p => p.slug === postId);
    
    if (foundPost) {
      setPost(foundPost);
      // Track page view and content engagement
      trackPageView(`/blog/${postId}`, `${foundPost.title} | Hiram Barsky Blog`);
      trackContentEngagement('blog', foundPost.id, foundPost.title);
      
      // Find related posts by matching tags
      const related = blogPosts
        .filter(p => p.id !== foundPost.id && p.tags.some(tag => foundPost.tags.includes(tag)))
        .slice(0, 3);
      
      setRelatedPosts(related);
    } else {
      // If post not found, redirect to blog list
      navigate("/blog");
    }
    
    setIsLoading(false);
  }, [postId, navigate]);
  
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title || "",
        text: post?.excerpt || "",
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback to copying the URL
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "The blog post URL has been copied to your clipboard.",
        duration: 3000,
      });
    }
  };
  
  if (isLoading || !post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">
            <p className="text-barsky-text">Loading blog post...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{post.title} | Hiram Barsky Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ') + ", product design, UX design, UI design"} />
        <meta property="og:title" content={`${post.title} | Hiram Barsky Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage ? `https://hirambarsky.com${post.coverImage}` : "https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9"} />
        <meta property="og:url" content={`https://hirambarsky.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <link rel="canonical" href={`https://hirambarsky.com/blog/${post.slug}`} />
        
        {/* Structured data for blog post */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": "${post.title}",
              "description": "${post.excerpt}",
              "image": "${post.coverImage ? `https://hirambarsky.com${post.coverImage}` : "https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9"}",
              "author": {
                "@type": "Person",
                "name": "${post.author}"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Hiram Barsky Product Design",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9"
                }
              },
              "datePublished": "${post.date}",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://hirambarsky.com/blog/${post.slug}"
              },
              "keywords": "${post.tags.join(', ')}",
              "articleBody": "${post.content.replace(/<[^>]*>/g, ' ').substring(0, 500)}..."
            }
          `}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="flex-grow">
        <article className="py-20">
          <div className="section-container max-w-3xl mx-auto px-4 sm:px-6">
            {/* Back button */}
            <Link 
              to="/blog" 
              className="inline-flex items-center text-barsky-blue hover:underline mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all posts
            </Link>
            
            {/* Post header */}
            <header className="mb-12">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="bg-slate-100 dark:bg-slate-800 text-barsky-text dark:text-slate-300">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-barsky-dark dark:text-white">
                {post.title}
              </h1>
              
              {/* Cover Image */}
              {post.coverImage && (
                <div className="mb-6 rounded-lg overflow-hidden">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              
              <div className="flex flex-wrap items-center justify-between gap-y-4">
                <div className="flex items-center text-barsky-text-light">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-4">{post.date}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center" 
                  onClick={handleShareClick}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </header>
            
            {/* Post content */}
            <div 
              className="prose dark:prose-invert prose-headings:text-barsky-dark dark:prose-headings:text-white prose-p:text-barsky-text dark:prose-p:text-slate-300 prose-a:text-barsky-blue max-w-none mb-16"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Author bio */}
            <div className="bg-slate-50 dark:bg-gray-800 rounded-lg p-8 mb-16">
              <h2 className="text-xl font-semibold mb-4 text-barsky-dark dark:text-white">About the Author</h2>
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-16 h-16 rounded-full bg-barsky-blue flex items-center justify-center text-white text-xl font-bold">
                    HB
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-barsky-dark dark:text-white">{post.author}</h3>
                  <p className="text-barsky-text dark:text-slate-300 mt-1">
                    Product Designer and Developer with over a decade of experience creating digital products that solve real problems.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="mb-16">
                <Separator className="mb-8" />
                <h2 className="text-2xl font-bold mb-6 text-barsky-dark dark:text-white">Related Posts</h2>
                <div className="grid grid-cols-1 gap-8">
                  {relatedPosts.map(relatedPost => (
                    <Link to={`/blog/${relatedPost.slug}`} key={relatedPost.id} className="group">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-barsky-blue transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-barsky-text dark:text-slate-300">{relatedPost.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
