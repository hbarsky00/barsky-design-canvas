import React from 'react';
import { Helmet } from 'react-helmet-async';

interface PremiumSeoOptimizationProps {
  pageType: 'homepage' | 'projects' | 'contact' | 'project-detail';
  projectTitle?: string;
}

const PremiumSeoOptimization: React.FC<PremiumSeoOptimizationProps> = ({
  pageType,
  projectTitle
}) => {
  const generateAdvancedSchema = () => {
    const basePersonSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Hiram Barsky",
      "jobTitle": "Senior Product Designer & Gen AI Integration Specialist",
      "description": "Top 1% Product Designer specializing in AI-powered user experiences, accessibility, and conversion optimization",
      "url": "https://barskydesign.pro",
      "email": "hbarsky01@gmail.com",
      "telephone": "+1-201-668-4754",
      "image": "https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png",
      "sameAs": [
        "https://www.linkedin.com/in/hirambarsky",
        "https://twitter.com/barskydesign",
        "https://github.com/hirambarsky"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "New York",
        "addressRegion": "NY",
        "addressCountry": "US"
      },
      "knowsAbout": [
        "Product Design",
        "Gen AI Integration",
        "ChatGPT API Integration", 
        "Claude AI Implementation",
        "Accessibility Design (WCAG 2.1)",
        "Conversion Rate Optimization",
        "React Development",
        "Figma Advanced Features",
        "Design Systems",
        "User Research",
        "A/B Testing",
        "Behavioral Analytics"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Product Designer & Gen AI Developer",
        "description": "Specialized in creating AI-enhanced user experiences that improve conversion rates and accessibility",
        "skills": [
          "AI-Powered UX Design",
          "Generative AI Integration",
          "Accessibility-First Design",
          "Conversion Optimization",
          "Cross-Platform Design"
        ]
      },
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance UX Consultant",
        "description": "Independent Product Design consultancy specializing in AI integration"
      }
    };

    const professionalServiceSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Hiram Barsky UX Design Services",
      "description": "Premium Product Design services with AI integration expertise",
      "url": "https://barskydesign.pro",
      "telephone": "+1-201-668-4754",
      "email": "hbarsky01@gmail.com",
      "priceRange": "$150-$250/hour",
      "areaServed": ["United States", "Canada", "United Kingdom", "Europe"],
      "serviceType": [
        "Product Design",
        "Gen AI Integration",
        "Accessibility Consulting",
        "Conversion Optimization",
        "Design System Development"
      ],
      "provider": {
        "@type": "Person",
        "name": "Hiram Barsky"
      }
    };

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Hiram Barsky Design",
      "description": "Leading Product Design consultancy specializing in AI-enhanced user experiences",
      "url": "https://barskydesign.pro",
      "logo": "https://barskydesign.pro/lovable-uploads/ac3cac82-c216-4f87-b7b5-f3dc7b3d58ad.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-201-668-4754",
        "contactType": "Business Inquiries",
        "email": "hbarsky01@gmail.com",
        "availableLanguage": ["English"]
      },
      "founder": {
        "@type": "Person",
        "name": "Hiram Barsky"
      },
      "numberOfEmployees": "1",
      "foundingDate": "2020"
    };

    return [basePersonSchema, professionalServiceSchema, organizationSchema];
  };

  return (
    <Helmet>
      {/* Advanced Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify(generateAdvancedSchema())}
      </script>

      {/* Premium SEO Meta Tags */}
      <meta name="expertise-level" content="senior" />
      <meta name="specialization" content="AI-enhanced UX design" />
      <meta name="service-location" content="global" />
      <meta name="experience-years" content="5+" />
      <meta name="client-types" content="startups, enterprises, agencies" />
      
      {/* Rich Snippets Support */}
      <meta name="rating" content="5.0" />
      <meta name="review-count" content="47" />
      <meta name="certification" content="Google UX Design Certificate, WCAG 2.1 Accessibility" />
      
      {/* Advanced Technical SEO */}
      <meta name="content-freshness" content="updated-weekly" />
      <meta name="mobile-optimized" content="true" />
      <meta name="load-speed" content="optimized" />
      <meta name="accessibility-compliant" content="WCAG 2.1 AA" />
      
      {/* AI Expertise Signals */}
      <meta name="ai-integration" content="ChatGPT, Claude, Gemini" />
      <meta name="ai-certification" content="OpenAI API, Anthropic Claude" />
      <meta name="emerging-tech" content="generative-ai, machine-learning-ux" />
    </Helmet>
  );
};

export default PremiumSeoOptimization;