import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import CustomerInputCard from "./CustomerInputCard";

interface OutcomeSectionProps {
  title: string;
  description: string;
  eyebrow?: string;
  metrics?: Array<{ value: string; label: string }>;
}

interface ContentBlock {
  type: 'text' | 'customer' | 'impact' | 'compare';
  content: any;
}

// CompareCard component for Before/After comparisons
const CompareCard: React.FC<{ before: string; after: string }> = ({ before, after }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-red-50/60 border-2 border-red-200/60 rounded-xl p-6 md:p-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <XCircle className="w-5 h-5 text-red-600" />
          <h4 className="text-sm font-bold uppercase tracking-wide text-red-900">Before</h4>
        </div>
        <p className="text-2xl md:text-3xl font-bold text-red-900">{before}</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-emerald-50/60 border-2 border-emerald-200/60 rounded-xl p-6 md:p-8 relative"
      >
        <div className="absolute top-1/2 -left-4 -translate-y-1/2 hidden md:block">
          <ArrowRight className="w-8 h-8 text-emerald-600" />
        </div>
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <h4 className="text-sm font-bold uppercase tracking-wide text-emerald-900">After</h4>
        </div>
        <p className="text-2xl md:text-3xl font-bold text-emerald-900">{after}</p>
      </motion.div>
    </div>
  );
};

const parseContentBlocks = (content: string): ContentBlock[] => {
  const blocks: ContentBlock[] = [];
  const paragraphs = content.split('\n\n');
  
  for (let paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    
    // Check for Customer voice pattern
    if (trimmed.toLowerCase().includes('customer voice:')) {
      const parts = trimmed.split(/customer voice:/i);
      const quoteText = parts[1]?.trim() || '';
      
      // Extract quote and author if present
      const quoteMatch = quoteText.match(/^['"](.+?)['"](?:\s*[–—-]\s*(.+))?$/s);
      if (quoteMatch) {
        blocks.push({
          type: 'customer',
          content: {
            quote: quoteMatch[1].trim(),
            author: quoteMatch[2]?.trim(),
            context: "Customer feedback"
          }
        });
        continue;
      }
    }
    
    // Check for quoted text
    if (trimmed.match(/^["'].*["']$/s)) {
      const quote = trimmed.replace(/^["']|["']$/g, '');
      blocks.push({
        type: 'customer',
        content: { quote, context: "Feedback" }
      });
      continue;
    }
    
    // Check for Before/After pattern
    const beforeMatch = trimmed.match(/Before:\s*(.+?)(?=\s*(?:After:|$))/is);
    const afterMatch = trimmed.match(/After:\s*(.+?)$/is);
    if (beforeMatch && afterMatch) {
      blocks.push({
        type: 'compare',
        content: {
          before: beforeMatch[1].trim(),
          after: afterMatch[1].trim()
        }
      });
      continue;
    }
    
    // Check for Impact bullet list
    if (trimmed.match(/^Impact:\s*[•●-]/im)) {
      blocks.push({ type: 'impact', content: trimmed });
      continue;
    }
    
    // Regular text
    blocks.push({ type: 'text', content: trimmed });
  }
  
  return blocks;
};

const OutcomeSection: React.FC<OutcomeSectionProps> = ({
  title,
  description,
  eyebrow = "IMPACT",
  metrics = []
}) => {
  const contentBlocks = parseContentBlocks(description);
  
  return (
    <section 
      id="outcome-results" 
      data-section="outcome-results" 
      aria-labelledby="outcome-heading" 
      className="section-snap mb-12 py-16 md:py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 scroll-mt-[calc(var(--header-height,64px)+1rem)]"
    >
      <div className="max-w-4xl mx-auto px-6">
        <h2 id="outcome-heading" className="sr-only">{title} Section</h2>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-eyebrow text-emerald-700 mb-4">
            {eyebrow}
          </div>
          <h2 className="text-section-title text-foreground font-display">
            {title}
          </h2>
        </motion.div>

        {/* Content Blocks */}
        <div className="space-y-8">
          {contentBlocks.map((block, idx) => {
            if (block.type === 'customer') {
              return (
                <CustomerInputCard
                  key={idx}
                  quote={block.content.quote}
                  author={block.content.author}
                  context={block.content.context}
                />
              );
            }
            
            if (block.type === 'compare') {
              return (
                <CompareCard
                  key={idx}
                  before={block.content.before}
                  after={block.content.after}
                />
              );
            }
            
            if (block.type === 'impact') {
              // Parse impact bullets
              const impactText = block.content.replace(/^Impact:\s*/i, '');
              const bullets = impactText.split(/\n/).filter((line: string) => line.trim());
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-emerald-100/60 via-green-100/60 to-teal-100/60 border-2 border-emerald-300/40 rounded-xl p-8 md:p-10 shadow-md"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-8 h-8 text-emerald-600" />
                    <h3 className="text-xl md:text-2xl font-bold text-emerald-900">Impact</h3>
                  </div>
                  <div className="text-base md:text-lg text-emerald-900 space-y-2">
                    {bullets.map((bullet: string, i: number) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                        <span>{bullet.replace(/^[•●-]\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            }
            
            // Regular text
            return (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto"
              >
                {block.content}
              </motion.p>
            );
          })}
        </div>

        {/* Metrics */}
        {metrics && metrics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white via-white to-emerald-50/30 rounded-xl p-8 md:p-10 shadow-md hover:shadow-xl border-2 border-border/20 hover:border-emerald-300/30 transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">
                  {metric.value}
                </div>
                <div className="text-xs uppercase tracking-wide font-semibold text-muted-foreground">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default OutcomeSection;
