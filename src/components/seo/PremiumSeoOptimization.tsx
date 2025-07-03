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
      "jobTitle": "Senior UX/UI Designer & Gen AI Integration Specialist",
      "description": "Top 1% UX/UI Designer specializing in AI-powered user experiences, accessibility, and conversion optimization",
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
        "UX/UI Design",
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
        "name": "UX/UI Designer & Gen AI Developer",
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
        "description": "Independent UX/UI design consultancy specializing in AI integration"
      }
    };

    const professionalServiceSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Hiram Barsky UX Design Services",
      "description": "Premium UX/UI design services with AI integration expertise",
      "url": "https://barskydesign.pro",
      "telephone": "+1-201-668-4754",
      "email": "hbarsky01@gmail.com",
      "priceRange": "$150-$250/hour",
      "areaServed": ["United States", "Canada", "United Kingdom", "Europe"],
      "serviceType": [
        "UX/UI Design",
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
      "description": "Leading UX/UI design consultancy specializing in AI-enhanced user experiences",
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

  const generateFAQSchema = () => {
    const faqData = [
      {
        question: "What makes Hiram Barsky different from other UX designers?",
        answer: "I specialize in Gen AI integration and accessibility-first design, combining traditional UX principles with cutting-edge AI capabilities to create user experiences that are both innovative and inclusive."
      },
      {
        question: "How do you integrate AI into UX design?",
        answer: "I implement AI through personalized user journeys, intelligent content recommendations, automated accessibility features, and conversational interfaces using ChatGPT and Claude AI APIs."
      },
      {
        question: "What is your design process for AI-enhanced experiences?",
        answer: "My process includes AI opportunity mapping, ethical AI considerations, accessibility validation, and iterative testing to ensure AI enhances rather than complicates the user experience."
      },
      {
        question: "Do you work with startups or enterprises?",
        answer: "I work with both startups and enterprises, adapting my approach to match the scale and complexity of each project while maintaining focus on user-centered design principles."
      }
    ];

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  };

  return (
    <Helmet>
      {/* Advanced Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify(generateAdvancedSchema())}
      </script>
      
      {/* FAQ Schema for Homepage */}
      {pageType === 'homepage' && (
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema())}
        </script>
      )}

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