
interface SectionImage {
  src: string;
  alt: string;
}

// Generate contextually appropriate challenge images for each project
export const generateChallengeImages = (projectId: string): SectionImage[] => {
  const challengeImageMap: Record<string, SectionImage[]> = {
    "investor-loan-app": [
      {
        src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=entropy&auto=format",
        alt: "Excel spreadsheet showing manual loan tracking issues"
      },
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=entropy&auto=format",
        alt: "User research session with banking professionals"
      }
    ],
    "dae-search": [
      {
        src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&crop=entropy&auto=format",
        alt: "Medical professionals struggling with data search interface"
      },
      {
        src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=entropy&auto=format",
        alt: "Complex medical data filtering system showing usability issues"
      }
    ],
    "splittime": [
      {
        src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop&crop=entropy&auto=format",
        alt: "Frustrated parents coordinating childcare schedules"
      },
      {
        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=entropy&auto=format",
        alt: "User interviews with separated parents showing communication pain points"
      }
    ],
    "herbalink": [
      {
        src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop&crop=entropy&auto=format",
        alt: "Traditional herbal medicine consultation challenges"
      },
      {
        src: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop&crop=entropy&auto=format",
        alt: "Herbalist-patient communication barriers research"
      }
    ],
    "gold2crypto": [
      {
        src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&crop=entropy&auto=format",
        alt: "Traditional investors confused by cryptocurrency platforms"
      },
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=entropy&auto=format",
        alt: "Complex trading interface analysis showing user friction"
      }
    ],
    "barskyjoint": [
      {
        src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&crop=entropy&auto=format",
        alt: "Food truck ordering process challenges"
      },
      {
        src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop&crop=entropy&auto=format",
        alt: "Customer journey mapping for restaurant service"
      }
    ],
    "spectrum": [
      {
        src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=entropy&auto=format",
        alt: "E-commerce accessibility testing challenges"
      },
      {
        src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=entropy&auto=format",
        alt: "Apparel customization interface usability issues"
      }
    ]
  };

  return challengeImageMap[projectId] || [];
};

// Generate contextually appropriate solution images for each project
export const generateSolutionImages = (projectId: string): SectionImage[] => {
  const solutionImageMap: Record<string, SectionImage[]> = {
    "investor-loan-app": [
      {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=350&h=263&fit=crop&crop=entropy&auto=format",
        alt: "Design wireframes and process documentation"
      },
      {
        src: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=350&h=263&fit=crop&crop=entropy&auto=format",
        alt: "Modern loan management dashboard prototype"
      }
    ],
    "dae-search": [
      {
        src: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=350&h=263&fit=crop&crop=entropy&auto=format",
        alt: "User flow diagrams for medical data search"
      },
      {
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=350&h=263&fit=crop&crop=entropy&auto=format",
        alt: "Advanced search interface design system components"
      }
    ],
    "splittime": [
      {
        src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=350&h=263&fit=crop&crop=entropy&auto=format",
        alt: "Co-parenting app wireframe sketches"
      },
      {
        src: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=350&h=263&fit=crop&crop=entropy&auto=format",
        alt: "Before/after communication interface comparison"
      }
    ],
    "herbalink": [
      {
        src: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=350&h=263&fit=crop&crop=entropy&auto=format",
        alt: "Telemedicine platform design process"
      },
      {
        src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=350&h=263&fit=crop&crop=entropy&auto=format",
        alt: "Herbalist-patient connection interface improvements"
      }
    ],
    "gold2crypto": [
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=350&h=263&fit=crop&crop=entropy&auto=format",
        alt: "Cryptocurrency trading platform design iteration"
      },
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=350&h=263&fit=crop&crop=entropy&auto=format",
        alt: "User-friendly trading interface prototype"
      }
    ],
    "barskyjoint": [
      {
        src: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=350&h=263&fit=crop&crop=entropy&auto=format",
        alt: "Food ordering app design system documentation"
      },
      {
        src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=350&h=263&fit=crop&crop=entropy&auto=format",
        alt: "Restaurant service workflow improvements"
      }
    ],
    "spectrum": [
      {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=350&h=263&fit=crop&crop=entropy&auto=format",
        alt: "Accessible e-commerce design wireframes"
      },
      {
        src: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=350&h=263&fit=crop&crop=entropy&auto=format",
        alt: "Custom apparel designer interface improvements"
      }
    ]
  };

  return solutionImageMap[projectId] || [];
};
