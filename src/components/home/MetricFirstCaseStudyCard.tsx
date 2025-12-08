import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import MetricDisplay from '@/components/metrics/MetricDisplay';
import SpotlightCard from '@/components/effects/SpotlightCard';
import { useRoomTransition } from '@/hooks/useRoomTransition';

interface MetricFirstCaseStudyCardProps {
  id: string;
  tags: string[];
  title: string;
  description: string;
  metricValue: string;
  metricLabel: string;
  url: string;
  liveUrl?: string;
  image: string;
  imageAlt: string;
  index: number;
  metricColor?: 'cyan' | 'purple' | 'green';
}

const MetricFirstCaseStudyCard: React.FC<MetricFirstCaseStudyCardProps> = ({
  id,
  tags,
  title,
  description,
  metricValue,
  metricLabel,
  url,
  liveUrl,
  image,
  imageAlt,
  index,
  metricColor = 'cyan',
}) => {
  const { triggerRoomTransition } = useRoomTransition();
  
  // Alternate colors for visual interest
  const colors: ('cyan' | 'purple' | 'green')[] = ['cyan', 'purple', 'green'];
  const color = metricColor || colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <SpotlightCard
        className="rounded-2xl"
        radius={200}
        color={color === 'cyan' ? 'hsl(180 100% 50%)' : color === 'purple' ? 'hsl(270 100% 65%)' : 'hsl(142 76% 45%)'}
        intensity={0.08}
      >
        <div 
          className="p-6 sm:p-8 rounded-2xl bg-terminal-surface/60 border border-terminal-border-dim/30 
                     backdrop-blur-sm transition-all duration-300"
          style={{
            background: `
              linear-gradient(135deg, hsl(var(--terminal-surface) / 0.8) 0%, hsl(var(--terminal-bg) / 0.6) 100%)
            `,
          }}
        >
          {/* Desktop: Side by side layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            {/* Content side - Metric First */}
            <div className="order-2 lg:order-1 space-y-5">
              {/* Big Neon Metric */}
              <MetricDisplay
                value={metricValue}
                label={metricLabel}
                size="lg"
                color={color}
              />
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="text-xs font-mono bg-terminal-surface/50 border-terminal-border-dim/50 
                               text-muted-foreground hover:border-neon-cyan/30"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
              
              {/* Title */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground leading-tight">
                {title}
              </h3>
              
              {/* Description */}
              <p className="text-muted-foreground text-base leading-relaxed">
                {description}
              </p>
              
              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  onClick={() => triggerRoomTransition(url, title)}
                  className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:from-neon-cyan-glow hover:to-neon-purple-glow 
                             text-terminal-bg font-semibold px-6"
                >
                  View Case Study
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                {liveUrl && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-terminal-border-dim/50 hover:border-neon-cyan/50 hover:bg-terminal-surface/50"
                  >
                    <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                      View Live
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
            
            {/* Image side */}
            <div 
              className="order-1 lg:order-2 cursor-pointer group"
              onClick={() => triggerRoomTransition(url, title)}
            >
              <div className="relative rounded-xl overflow-hidden border border-terminal-border-dim/20">
                <img
                  src={image}
                  alt={imageAlt}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-terminal-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default MetricFirstCaseStudyCard;
