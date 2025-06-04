
interface ProjectImageContext {
  challengeImage: string;
  solutionImage: string;
}

export const generateProjectImages = (projectId: string): ProjectImageContext => {
  const imageMap: Record<string, ProjectImageContext> = {
    "investor-loan-app": {
      challengeImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80", // Spreadsheet/Excel interface
      solutionImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80" // Modern dashboard interface
    },
    "dae-search": {
      challengeImage: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80", // Complex data interface
      solutionImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80" // Clean search interface
    },
    "splittime": {
      challengeImage: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&q=80", // Stressed family/communication
      solutionImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80" // Mobile app interface
    },
    "herbalink": {
      challengeImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&q=80", // Healthcare confusion
      solutionImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80" // Telemedicine interface
    },
    "gold2crypto": {
      challengeImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80", // Complex trading charts
      solutionImage: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&q=80" // Clean crypto interface
    },
    "barskyjoint": {
      challengeImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80", // Food truck location confusion
      solutionImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80" // Mobile food app
    },
    "spectrum": {
      challengeImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80", // Inaccessible interface
      solutionImage: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80" // Accessible e-commerce
    }
  };

  return imageMap[projectId] || {
    challengeImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&q=80",
    solutionImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80"
  };
};
