import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bot, Wand2, Database, Palette, Zap } from 'lucide-react';
import LabCard from './LabCard';
import SectionHeader from '@/components/shared/SectionHeader';

const experiments = [
  {
    id: 'midjourney-icons',
    title: 'Midjourney Icon Sets',
    description: 'AI-generated icon systems exploring new visual languages for fintech and healthcare apps.',
    icon: <Palette className="h-8 w-8" />,
    status: 'experiment' as const,
    size: 'small' as const,
  },
  {
    id: 'custom-gpts',
    title: 'Custom GPTs I Built',
    description: 'Specialized AI assistants for UX research synthesis, design system documentation, and user interview analysis.',
    icon: <Bot className="h-8 w-8" />,
    status: 'complete' as const,
    size: 'medium' as const,
    link: 'https://chatgpt.com',
  },
  {
    id: 'framer-ai',
    title: 'Framer Motion + AI Tests',
    description: 'Experimenting with AI-driven micro-interactions and adaptive animations.',
    icon: <Wand2 className="h-8 w-8" />,
    status: 'in-progress' as const,
    size: 'small' as const,
  },
  {
    id: 'synthetic-data',
    title: 'Synthetic Data Experiments',
    description: 'Using LLMs to generate realistic test data for prototyping complex enterprise dashboards and user flows without real PII.',
    icon: <Database className="h-8 w-8" />,
    status: 'experiment' as const,
    size: 'large' as const,
  },
  {
    id: 'design-tokens',
    title: 'AI Design Token Generation',
    description: 'Automated design system tokens from brand guidelines using vision models.',
    icon: <Sparkles className="h-8 w-8" />,
    status: 'in-progress' as const,
    size: 'small' as const,
  },
  {
    id: 'rapid-prototyping',
    title: 'Rapid AI Prototyping',
    description: 'Building functional prototypes in hours, not weeks, using AI-augmented development.',
    icon: <Zap className="h-8 w-8" />,
    status: 'complete' as const,
    size: 'small' as const,
  },
];

const LabSection: React.FC = () => {
  return (
    <section 
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 10% 20%, hsl(var(--neon-cyan) / 0.03) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, hsl(var(--neon-purple) / 0.03) 0%, transparent 40%),
          linear-gradient(180deg, hsl(var(--terminal-bg)) 0%, hsl(220 25% 8%) 100%)
        `
      }}
    >
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--neon-cyan) / 0.5) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--neon-cyan) / 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full 
                          bg-terminal-surface/50 border border-neon-cyan/20">
            <Sparkles className="h-4 w-4 text-neon-cyan" />
            <span className="text-sm font-mono text-neon-cyan uppercase tracking-wider">The Lab</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Synthetic Experiments
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Exploring the bleeding edge of AI-augmented design. These are my experiments, tests, and works-in-progress.
          </p>
        </motion.div>
        
        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {experiments.map((experiment, index) => (
            <motion.div
              key={experiment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={experiment.size === 'large' ? 'md:col-span-2 lg:col-span-3' : 
                        experiment.size === 'medium' ? 'md:col-span-2 lg:col-span-2' : ''}
            >
              <LabCard {...experiment} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LabSection;
