
interface PreRenderMetaConfig {
  title: string;
  description: string;
  image: string;
  url: string;
  type: 'website' | 'article';
  author?: string;
  publishedDate?: string;
  tags?: string[];
}

const BASE_URL = 'https://barskydesign.pro';
const DEFAULT_IMAGE = `${BASE_URL}/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png`;

export const getMetaConfigForRoute = (pathname: string): PreRenderMetaConfig => {
  // Default meta config
  let config: PreRenderMetaConfig = {
    title: 'Hiram Barsky - Product Designer & Gen AI Developer',
    description: '15+ years creating AI-enhanced digital experiences. Specializing in UX research, design systems, and Gen AI integration for startups and enterprises.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}${pathname}`,
    type: 'website'
  };

  // Route-specific configurations
  if (pathname === '/') {
    config = {
      ...config,
      title: 'Hiram Barsky - Product Designer & Gen AI Developer',
      description: '15+ years creating AI-enhanced digital experiences. Specializing in UX research, design systems, and Gen AI integration.',
    };
  } else if (pathname === '/projects') {
    config = {
      ...config,
      title: 'Product Design & Gen AI Portfolio | AI-Powered Web Applications',
      description: 'Explore Product Design portfolio featuring Gen AI integration, intelligent web applications, and AI-powered user interfaces. Real case studies demonstrating AI-enhanced design solutions.',
      image: `${BASE_URL}/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png`,
    };
  } else if (pathname === '/contact') {
    config = {
      ...config,
      title: 'Contact Hiram Barsky - AI Design Consultation',
      description: 'Get in touch for AI-enhanced product design services. Specializing in intelligent web applications and AI-powered user interfaces.',
    };
  } else if (pathname === '/about') {
    config = {
      ...config,
      title: 'About Hiram Barsky - AI-Fluent Product Designer',
      description: 'Meet Hiram Barsky, a product designer with 15+ years of experience in AI-enhanced user experiences, accessibility, and conversion optimization.',
    };
  } else if (pathname === '/services') {
    config = {
      ...config,
      title: 'AI-Enhanced Design Services | Product Design & Gen AI Development',
      description: 'Professional product design and Gen AI development services for startups and enterprises. Specializing in AI-powered user interfaces and intelligent web applications.',
    };
  } else if (pathname === '/blog') {
    config = {
      ...config,
      title: 'Design & AI Blog | Hiram Barsky Design',
      description: 'Insights on product design, UX research, and AI integration in digital product development. Latest trends in AI-enhanced user experiences.',
    };
  } else if (pathname.startsWith('/project/')) {
    // Project-specific meta
    const projectId = pathname.split('/')[2];
    config = getProjectMeta(projectId);
  } else if (pathname.startsWith('/blog/')) {
    // Blog post-specific meta
    const slug = pathname.split('/')[2];
    config = getBlogPostMeta(slug);
    config.type = 'article';
  }

  return config;
};

const getProjectMeta = (projectId: string): PreRenderMetaConfig => {
  const projectConfigs: Record<string, PreRenderMetaConfig> = {
    'herbalink': {
      title: 'HerbaLink Mobile Herbalist UX Design Case Study',
      description: 'Comprehensive UX design case study for HerbaLink mobile herbalist platform. Features AI-powered plant identification, user research insights, and accessibility-focused design solutions.',
      image: `${BASE_URL}/lovable-uploads/f1b8a724-78fc-4f61-9a10-4bc1ad2d4634.png`,
      url: `${BASE_URL}/project/herbalink`,
      type: 'article',
      author: 'Hiram Barsky',
      tags: ['UX Design', 'Mobile App', 'Healthcare', 'AI Integration']
    },
    'splittime': {
      title: 'SplitTime Co-parenting App Design Case Study',
      description: 'Product design case study for SplitTime co-parenting application. Featuring user-centered design approach, accessibility compliance, and family communication solutions.',
      image: `${BASE_URL}/lovable-uploads/9f405471-a5a1-41b8-97a7-a521dc7c374c.png`,
      url: `${BASE_URL}/project/splittime`,
      type: 'article',
      author: 'Hiram Barsky',
      tags: ['Product Design', 'Mobile App', 'Family Tech', 'UX Research']
    },
    'business-management': {
      title: 'Business Management Platform Case Study',
      description: 'Enterprise business management platform design featuring AI-enhanced workflows, data visualization, and complex system integration.',
      image: `${BASE_URL}/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png`,
      url: `${BASE_URL}/project/business-management`,
      type: 'article',
      author: 'Hiram Barsky',
      tags: ['Enterprise Design', 'AI Integration', 'Business Intelligence']
    }
  };

  return projectConfigs[projectId] || {
    title: `${projectId} Case Study | Hiram Barsky Design`,
    description: 'Product design case study showcasing UX research, design process, and AI-enhanced solutions by Hiram Barsky.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/project/${projectId}`,
    type: 'article',
    author: 'Hiram Barsky'
  };
};

const getBlogPostMeta = (slug: string): PreRenderMetaConfig => {
  // This would typically come from your CMS or database
  // For now, return a default blog post structure
  return {
    title: `${slug.replace(/-/g, ' ')} | Hiram Barsky Design Blog`,
    description: 'Insights on product design, UX research, and AI integration in digital product development.',
    image: DEFAULT_IMAGE,
    url: `${BASE_URL}/blog/${slug}`,
    type: 'article',
    author: 'Hiram Barsky'
  };
};

export const generateMetaTags = (config: PreRenderMetaConfig): string => {
  return `
    <title>${config.title}</title>
    <meta name="description" content="${config.description}" />
    <link rel="canonical" href="${config.url}" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${config.type}" />
    <meta property="og:url" content="${config.url}" />
    <meta property="og:title" content="${config.title}" />
    <meta property="og:description" content="${config.description}" />
    <meta property="og:image" content="${config.image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${config.title}" />
    <meta property="og:site_name" content="Hiram Barsky Design" />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${config.url}" />
    <meta name="twitter:title" content="${config.title}" />
    <meta name="twitter:description" content="${config.description}" />
    <meta name="twitter:image" content="${config.image}" />
    <meta name="twitter:image:alt" content="${config.title}" />
    <meta name="twitter:site" content="@hirambarsky" />
    <meta name="twitter:creator" content="@hirambarsky" />
    
    <!-- Additional SEO -->
    <meta name="author" content="${config.author || 'Hiram Barsky'}" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
    ${config.type === 'article' ? `
    <meta property="article:author" content="${config.author || 'Hiram Barsky'}" />
    <meta property="article:publisher" content="https://barskydesign.pro" />
    ${config.publishedDate ? `<meta property="article:published_time" content="${config.publishedDate}" />` : ''}
    ${config.tags ? config.tags.map(tag => `<meta property="article:tag" content="${tag}" />`).join('\n    ') : ''}
    ` : ''}
  `.trim();
};
