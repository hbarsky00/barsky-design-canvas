import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import SpotlightCard from '@/components/effects/SpotlightCard';

interface LabCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'experiment' | 'in-progress' | 'complete';
  link?: string;
  size?: 'small' | 'medium' | 'large';
}

const LabCard: React.FC<LabCardProps> = ({
  title,
  description,
  icon,
  status,
  link,
  size = 'small',
}) => {
  const statusColors = {
    'experiment': 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30',
    'in-progress': 'bg-neon-purple/10 text-neon-purple border-neon-purple/30',
    'complete': 'bg-neon-green/10 text-neon-green border-neon-green/30',
  };
  
  const sizeClasses = {
    small: 'col-span-1',
    medium: 'col-span-1 md:col-span-2',
    large: 'col-span-1 md:col-span-2 lg:col-span-3',
  };
  
  const CardContent = (
    <SpotlightCard
      className={`${sizeClasses[size]} h-full`}
      radius={120}
      color="hsl(180 100% 50%)"
      intensity={0.1}
    >
      <motion.div
        className="h-full p-5 sm:p-6 rounded-2xl bg-terminal-surface/80 border border-terminal-border-dim/30 
                   hover:border-neon-cyan/40 transition-all duration-300 backdrop-blur-sm
                   flex flex-col"
        whileHover={{ y: -4 }}
      >
        {/* Icon */}
        <div className="mb-4 text-neon-cyan/80">
          {icon}
        </div>
        
        {/* Status badge */}
        <Badge 
          variant="outline" 
          className={`w-fit mb-3 text-xs font-mono uppercase tracking-wider ${statusColors[status]}`}
        >
          {status.replace('-', ' ')}
        </Badge>
        
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-display font-semibold text-foreground mb-2">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground flex-grow">
          {description}
        </p>
        
        {/* Link indicator */}
        {link && (
          <div className="mt-4 flex items-center gap-2 text-neon-cyan/60 text-sm">
            <span className="font-mono">View</span>
            <ExternalLink className="h-3 w-3" />
          </div>
        )}
      </motion.div>
    </SpotlightCard>
  );
  
  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        {CardContent}
      </a>
    );
  }
  
  return CardContent;
};

export default LabCard;
