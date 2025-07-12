// Meta tag injection utility for server-side/build-time optimization
// This helps ensure crawlers see the correct meta tags immediately

interface MetaTagConfig {
  path: string;
  canonical: string;
  title: string;
  description: string;
  ogImage: string;
  ogType: string;
  keywords?: string;
}

export const staticMetaConfigs: MetaTagConfig[] = [
  {
    path: '/project/wholesale-distribution',
    canonical: 'https://barskydesign.pro/project/wholesale-distribution',
    title: 'From Restaurant Chat to Business Solution - Product Design Case Study | Barsky Design',
    description: 'Real conversation led to custom AI-powered development. How a casual dinner revealed business pain points and sparked my evolution from designer to full-stack developer.',
    ogImage: 'https://barskydesign.pro/lovable-uploads/wholesale-hero.png',
    ogType: 'article',
    keywords: 'Business Automation, AI Development, Custom Software, Workflow Optimization, Case Study, UX Design'
  },
  {
    path: '/project/herbalink',
    canonical: 'https://barskydesign.pro/project/herbalink',
    title: 'Herbalink: Bridging Ancient Wisdom with Modern Accessibility - Product Design Case Study | Barsky Design',
    description: 'Wellness-focused platform connecting people with certified herbalists through intelligent AI matching and mobile-first design. Achieved 78% user satisfaction with personalized herbal care.',
    ogImage: 'https://barskydesign.pro/lovable-uploads/54ddb7c1-ce60-4077-b56c-ae4640252d52.png',
    ogType: 'article',
    keywords: 'Healthcare UX, AI Matching, Mobile-First, Wellness Platform, Accessibility Design'
  },
  {
    path: '/project/splittime',
    canonical: 'https://barskydesign.pro/project/splittime',
    title: 'Splittime: From Conflict to Collaboration - Product Design Case Study | Barsky Design',
    description: 'Family-centered co-parenting platform that transforms communication between separated parents. Reduced scheduling conflicts by 73% through thoughtful, child-focused design.',
    ogImage: 'https://barskydesign.pro/lovable-uploads/8fb40d7a-8ac6-404e-a3ce-43746775a75c.png',
    ogType: 'article',
    keywords: 'Family Tech, Co-Parenting, Communication Design, Conflict Reduction, Child-Centered UX'
  },
  {
    path: '/project/investor-loan-app',
    canonical: 'https://barskydesign.pro/project/investor-loan-app',
    title: 'Investor Loan App: Smart Portfolio Management - Product Design Case Study | Barsky Design',
    description: 'FinTech platform transforming real estate investment management from spreadsheet chaos to intelligent portfolio tracking with automated reporting and performance analytics.',
    ogImage: 'https://barskydesign.pro/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png',
    ogType: 'article',
    keywords: 'FinTech, Portfolio Management, Investment Analytics, Automated Reporting, Real Estate Tech'
  }
];

// Function to get meta config for a specific path
export const getMetaConfigForPath = (path: string): MetaTagConfig | null => {
  return staticMetaConfigs.find(config => config.path === path) || null;
};

// Function to inject meta tags into document head (for immediate crawler access)
export const injectMetaTagsForCrawlers = (path: string): void => {
  const config = getMetaConfigForPath(path);
  if (!config) return;

  // Remove existing meta tags that might conflict
  const existingTags = [
    'meta[property="og:url"]',
    'meta[property="og:title"]', 
    'meta[property="og:description"]',
    'meta[property="og:image"]',
    'meta[property="og:type"]',
    'link[rel="canonical"]'
  ];

  existingTags.forEach(selector => {
    const existing = document.head.querySelector(selector);
    if (existing) existing.remove();
  });

  // Inject new meta tags
  const metaTags = [
    { tag: 'link', attrs: { rel: 'canonical', href: config.canonical } },
    { tag: 'meta', attrs: { property: 'og:url', content: config.canonical } },
    { tag: 'meta', attrs: { property: 'og:title', content: config.title } },
    { tag: 'meta', attrs: { property: 'og:description', content: config.description } },
    { tag: 'meta', attrs: { property: 'og:image', content: config.ogImage } },
    { tag: 'meta', attrs: { property: 'og:type', content: config.ogType } },
    { tag: 'meta', attrs: { name: 'description', content: config.description } },
    { tag: 'meta', attrs: { name: 'keywords', content: config.keywords || '' } }
  ];

  metaTags.forEach(({ tag, attrs }) => {
    const element = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    document.head.appendChild(element);
  });

  console.log(`Meta tags injected for path: ${path}`);
};

// Function to generate static HTML files with pre-rendered meta tags
export const generateStaticMetaHTML = (config: MetaTagConfig): string => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png" type="image/png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Pre-rendered meta tags for crawlers -->
    <title>${config.title}</title>
    <meta name="description" content="${config.description}" />
    <link rel="canonical" href="${config.canonical}" />
    
    <!-- Open Graph Tags -->
    <meta property="og:type" content="${config.ogType}" />
    <meta property="og:title" content="${config.title}" />
    <meta property="og:description" content="${config.description}" />
    <meta property="og:url" content="${config.canonical}" />
    <meta property="og:image" content="${config.ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Barsky Design" />
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@hirambarsky" />
    <meta name="twitter:title" content="${config.title}" />
    <meta name="twitter:description" content="${config.description}" />
    <meta name="twitter:image" content="${config.ogImage}" />
    
    <!-- Keywords -->
    ${config.keywords ? `<meta name="keywords" content="${config.keywords}" />` : ''}
    
    <!-- Font loading optimization -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Redirect to main app with preserved meta tags -->
    <script>
      // Preserve meta tags and redirect to the React app
      window.location.replace('${config.canonical}#crawler-optimized');
    </script>
  </head>
  <body>
    <!-- Fallback content for crawlers that don't execute JavaScript -->
    <div style="text-align: center; padding: 50px; font-family: Inter, sans-serif;">
      <h1>${config.title.split(' - ')[0]}</h1>
      <p>${config.description}</p>
      <p><a href="${config.canonical}">View Project</a></p>
    </div>
    
    <!-- Load React app -->
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
};