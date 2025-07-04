// Project-specific styling configuration for case studies

export interface ProjectStyling {
  gradient: string;
  heroText: string;
  role: string;
  duration: string;
  platform: string;
  tagline: string;
}

export interface ProjectGradients {
  hero: string;
  light: string;
  medium: string;
  textColor: string;
}

export interface ProjectImages {
  hero: string;
  challenge: string;
  process: string;
  result: string;
}

export const getProjectStyling = (projectId: string): ProjectStyling => {
  switch (projectId) {
    case 'barskyjoint':
      return {
        gradient: 'linear-gradient(135deg, #d73502, #ff6b35)',
        heroText: '🍔 Barsky Joint Mobile App / Food Truck Ordering Platform',
        role: 'UX Designer & Developer',
        duration: '4 Weeks',
        platform: 'Mobile App',
        tagline: 'Designing the Future of Street Food Ordering'
      };
    case 'herbalink':
      return {
        gradient: 'linear-gradient(135deg, #2d5016, #4a7c59, #6b8e23)',
        heroText: '🌿 Herbalink App Interface / Herbal Wellness Platform',
        role: 'UX/UI Designer',
        duration: '4 Weeks',
        platform: 'Solo Project',
        tagline: 'Connecting People with Certified Herbalists'
      };
    case 'splittime':
      return {
        gradient: 'linear-gradient(135deg, #7c3aed, #a855f7, #c084fc)',
        heroText: '📱 SplitTime App Interface / Co-Parenting Management Platform',
        role: 'Lead UX Designer',
        duration: '3 Weeks',
        platform: 'Mobile App',
        tagline: 'Simplifying Co-Parenting Through Thoughtful Design'
      };
    case 'investor-loan-app':
      return {
        gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6, #60a5fa)',
        heroText: '📊 Banking Platform Interface / Loan Management System',
        role: 'Lead UX Designer',
        duration: '1.5 Years',
        platform: 'Web Application',
        tagline: 'Modernizing Excel-based Banking Workflows'
      };
    default:
      return {
        gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
        heroText: '📱 Project Interface',
        role: 'Designer',
        duration: 'Variable',
        platform: 'Digital',
        tagline: 'Digital Experience Design'
      };
  }
};

export const getImageGradients = (projectId: string): ProjectGradients => {
  switch (projectId) {
    case 'barskyjoint':
      return {
        hero: 'linear-gradient(135deg, #fff5f2, #ffebe6)',
        light: 'linear-gradient(135deg, #fef7f0, #fdf2f8)',
        medium: 'linear-gradient(135deg, #fed7aa, #fdba74)',
        textColor: '#dc2626'
      };
    case 'herbalink':
      return {
        hero: 'linear-gradient(135deg, #e8f5e8, #f0f8f0)',
        light: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
        medium: 'linear-gradient(135deg, #bbf7d0, #86efac)',
        textColor: '#15803d'
      };
    case 'splittime':
      return {
        hero: 'linear-gradient(135deg, #f3e8ff, #e9d5ff)',
        light: 'linear-gradient(135deg, #faf5ff, #f3e8ff)',
        medium: 'linear-gradient(135deg, #d8b4fe, #c084fc)',
        textColor: '#7c3aed'
      };
    case 'investor-loan-app':
      return {
        hero: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
        light: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
        medium: 'linear-gradient(135deg, #93c5fd, #60a5fa)',
        textColor: '#2563eb'
      };
    default:
      return {
        hero: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
        light: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
        medium: 'linear-gradient(135deg, #cbd5e1, #94a3b8)',
        textColor: '#475569'
      };
  }
};

export const getProjectImages = (projectId: string, details: any): ProjectImages => {
  switch (projectId) {
    case 'barskyjoint':
      return {
        hero: "/lovable-uploads/c38018a8-f2a2-49ee-ac88-837de2d1e82d.png",
        challenge: details.challengeGalleryImages?.[0] || "/lovable-uploads/734cc9eb-7dd3-44be-9815-8f2c35f8a785.png",
        process: details.processImage || "/lovable-uploads/c8476a9d-176d-4cbb-812a-9312642c6d5f.png",
        result: details.resultGalleryImages?.[0] || "/lovable-uploads/a566ef85-3556-47c1-9175-16aaa0ec4e44.png"
      };
    case 'herbalink':
      return {
        hero: "/lovable-uploads/6c4ed77d-1ea7-4da1-8c3e-ad25cd792518.png",
        challenge: "/lovable-uploads/fc11dcb5-634f-4317-9585-d8661064189b.png",
        process: "/lovable-uploads/4c84b548-940e-4558-b931-f1e4d509d852.png",
        result: "/lovable-uploads/20f98d85-8b95-4a08-ab8e-7396a8cb7138.png"
      };
    case 'splittime':
      return {
        hero: details.availableImages?.[0] || "/lovable-uploads/647c00bd-470d-4fc5-8c5e-34c8d1c42676.png",
        challenge: details.challengeGalleryImages?.[0] || "/lovable-uploads/647c00bd-470d-4fc5-8c5e-34c8d1c42676.png",
        process: details.processImage || "/lovable-uploads/647c00bd-470d-4fc5-8c5e-34c8d1c42676.png",
        result: details.resultGalleryImages?.[0] || "/lovable-uploads/647c00bd-470d-4fc5-8c5e-34c8d1c42676.png"
      };
    case 'investor-loan-app':
      return {
        hero: "/lovable-uploads/e1d0b229-0ec0-4f02-a551-437bd38393e5.png",
        challenge: "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png",
        process: "/lovable-uploads/ec1458b5-d364-498e-a5ec-4122b62195d3.png",
        result: "/lovable-uploads/7a8b4364-8a51-4c15-9e30-ab0352103ba1.png"
      };
    default:
      return {
        hero: details.availableImages?.[0] || "/placeholder-image.png",
        challenge: details.challengeGalleryImages?.[0] || "/placeholder-image.png",
        process: details.processImage || "/placeholder-image.png",
        result: details.resultGalleryImages?.[0] || "/placeholder-image.png"
      };
  }
};