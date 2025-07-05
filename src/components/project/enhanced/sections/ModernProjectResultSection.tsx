
import React from "react";
import { motion } from "framer-motion";
import { ProjectDetails } from "@/data/types/project";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";

interface ModernProjectResultSectionProps {
  details: ProjectDetails;
  projectId: string;
  componentKey: string;
  imageCaptions: Record<string, string>;
}

const ModernProjectResultSection: React.FC<ModernProjectResultSectionProps> = ({
  details,
  projectId,
  componentKey,
  imageCaptions
}) => {
  const { handleSectionContentSave, handleSectionImageUpdate } = useSimplifiedContentEditor({ projectId });

  // Get theme class based on project
  const getThemeClass = () => {
    switch (projectId) {
      case 'barsky-joint': return 'barsky-theme';
      case 'herbalink': return 'herbalink-theme';
      case 'splittime': return 'splittime-theme';
      case 'investor-loan-app': return 'investment-theme';
      default: return 'herbalink-theme';
    }
  };

  const themeClass = getThemeClass();

  // Get subtitle and stats based on project
  const getSubtitle = () => {
    switch (projectId) {
      case 'barsky-joint':
        return "The measurable impact and user satisfaction results from the mobile ordering platform.";
      case 'herbalink':
        return "Validation results and market readiness outcomes from user testing and development.";
      case 'splittime':
        return "Current development status and key learnings from the co-parenting platform design process.";
      case 'investor-loan-app':
        return "Quantifiable improvements in efficiency, accuracy, and user satisfaction from the banking platform transformation.";
      default:
        return "The outcomes and impact of the project.";
    }
  };

  const getStats = () => {
    switch (projectId) {
      case 'barsky-joint':
        return [
          { number: "40%", label: "Increase in Daily Orders" },
          { number: "85%", label: "Reduction in Cart Abandonment" },
          { number: "60%", label: "Faster Order Processing" },
          { number: "4.7/5", label: "User Satisfaction Rating" }
        ];
      case 'herbalink':
        return [
          { number: "92%", label: "User Trust Rating" },
          { number: "85%", label: "Herbalist Matching Success" },
          { number: "75%", label: "Consultation Completion Rate" },
          { number: "12", label: "Participating Herbalists" }
        ];
      case 'splittime':
        return [
          { number: "7", label: "Co-Parents Interviewed" },
          { number: "5", label: "User Testing Sessions" },
          { number: "3", label: "Competitor Apps Analyzed" },
          { number: "100%", label: "Feature Implementation" }
        ];
      case 'investor-loan-app':
        return [
          { number: "85%", label: "Error Reduction" },
          { number: "40%", label: "Processing Speed Increase" },
          { number: "80%", label: "User Satisfaction" },
          { number: "200+", label: "Orders Processed" }
        ];
      default:
        return [];
    }
  };

  const stats = getStats();

  return (
    <motion.section
      key={`result-${componentKey}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="glass-card-elevated p-4 sm:p-8 layered-depth"
    >
      <EnhancedContentEditor
        content="The Result"
        contentType="header"
        onSave={(content) => handleSectionContentSave('result', 'title', content)}
        className="mb-4"
        projectId={projectId}
      />
      
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        {getSubtitle()}  
      </p>

      {/* Stats Cards */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`${themeClass} p-4 rounded-xl text-center border-2`}>
              <div className="text-2xl lg:text-3xl font-bold mb-2">{stat.number}</div>
              <div className="text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Results Content Grid */}
      <div className="results-grid">
        <div>
          <div className={`content-image ${themeClass} mb-4`}>
            Results Card 1
          </div>
          <EnhancedContentEditor
            content={details.result.split('\n\n')[0] || details.result.substring(0, 400)}
            contentType="section"
            onSave={(content) => handleSectionContentSave('result', 'content', content)}
            projectId={projectId}
          />
        </div>
        
        <div>
          <div className={`content-image ${themeClass} mb-4`}>
            Results Card 2
          </div>
          <EnhancedContentEditor
            content={details.result.split('\n\n')[1] || details.result.substring(400)}
            contentType="section"
            onSave={(content) => handleSectionContentSave('result', 'content', content)}
            projectId={projectId}
          />
        </div>
      </div>

      {/* Final Highlight Box */}
      <div className={`${themeClass} p-6 rounded-xl mt-8 border-2`}>
        <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
        <EnhancedContentEditor
          content={details.result.split('\n\n')[2] || "This project demonstrates the importance of user-centered design and thorough research in creating successful digital solutions."}
          contentType="section"
          onSave={(content) => handleSectionContentSave('result', 'content', content)}
          projectId={projectId}
        />
      </div>
    </motion.section>
  );
};

export default ModernProjectResultSection;
