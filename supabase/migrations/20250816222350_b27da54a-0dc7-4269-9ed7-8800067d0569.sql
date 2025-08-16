-- Insert SEO metadata for all project pages
INSERT INTO page_metadata (path, seo_title, seo_description, featured_image) VALUES
('/project/investment-app', '23% More Engagement: Making Investing Accessible to Beginners', 'Built beginner-friendly investing tools with guided onboarding, goal tracking, and real-time performance insights. The design demystifies complex financial concepts and keeps users motivated to grow their portfolios.', 'https://barskydesign.pro/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png'),
('/project/herbalink', '3x More Bookings: How I Connected Users to Certified Herbalists', 'Connected users to certified herbalists across the country and increased booking rates by 3x through AI-powered matching and streamlined UX.', 'https://barskyux.com/wp-content/uploads/2025/08/herbalinkpromonew.png'),
('/project/splittime', '40% Less Conflict: Designing Neutral Co-Parenting Tools', 'Reduced co-parenting conflict by 40% through clear scheduling and neutral communication tools designed for high-stress family situations.', 'https://i0.wp.com/barskyux.com/wp-content/uploads/2024/01/Frame-4.jpg?fit=1920%2C1080&ssl=1'),
('/project/eventhub', 'EventHub: Streamlining Event Management', 'Comprehensive event management platform that simplifies planning, coordination, and execution of professional events.', 'https://barskydesign.pro/lovable-uploads/default-project-image.png'),
('/project/finvest', 'FinVest: Investment Portfolio Management', 'Advanced portfolio management tools for professional investors with real-time analytics and risk assessment.', 'https://barskydesign.pro/lovable-uploads/default-project-image.png'),
('/project/careconnect', 'CareConnect: Healthcare Communication Platform', 'Streamlined communication platform connecting patients, healthcare providers, and family members.', 'https://barskydesign.pro/lovable-uploads/default-project-image.png'),
('/project/taskflow', 'TaskFlow: Team Productivity Suite', 'Collaborative task management platform designed to enhance team productivity and project coordination.', 'https://barskydesign.pro/lovable-uploads/default-project-image.png'),
('/project/smartlearn', 'SmartLearn: Adaptive Learning Platform', 'AI-powered educational platform that adapts to individual learning styles and pace.', 'https://barskydesign.pro/lovable-uploads/default-project-image.png')
ON CONFLICT (path) DO UPDATE SET
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  featured_image = EXCLUDED.featured_image,
  updated_at = now();