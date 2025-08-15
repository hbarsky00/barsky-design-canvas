
import React from 'react';
import { Badge } from '@/components/ui/badge';
import EditableVideo from './EditableVideo';

interface CaseStudyHeroProps {
  title: string;
  description: string;
  tags: string[];
  heroVideo?: {
    src: string;
    poster: string;
  };
  gradientClasses?: string;
}

const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({
  title,
  description,
  tags,
  heroVideo,
  gradientClasses = "from-primary/10 to-secondary/10"
}) => {
  return (
    <div className={`bg-gradient-to-br ${gradientClasses} py-20`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {heroVideo && (
            <div>
              <EditableVideo
                src={heroVideo.src}
                poster={heroVideo.poster}
                alt={title}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyHero;
