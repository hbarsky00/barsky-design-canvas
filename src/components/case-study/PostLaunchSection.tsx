import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, BarChart, DollarSign } from "lucide-react";
import { PostLaunchMetrics } from "@/data/structuredCaseStudies";
import MaximizableImage from "@/components/project/MaximizableImage";

interface PostLaunchSectionProps {
  title: string;
  description: string;
  eyebrow?: string;
  metrics: PostLaunchMetrics;
  images?: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
}

const PostLaunchSection: React.FC<PostLaunchSectionProps> = ({
  title,
  description,
  eyebrow = "POST-LAUNCH IMPACT",
  metrics,
  images
}) => {
  const metricsItems = [
    { icon: TrendingUp, label: "Timeframe", value: metrics.timeframe },
    { icon: Users, label: "Usage", value: metrics.usage },
    { icon: BarChart, label: "Retention", value: metrics.retention },
    { icon: DollarSign, label: "Business Impact", value: metrics.businessImpact },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 mb-4">
            {eyebrow}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metricsItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-border/20"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                <item.icon className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-sm font-medium text-muted-foreground mb-2">
                {item.label}
              </div>
              <div className="text-sm font-semibold text-foreground leading-tight">
                {item.value}
              </div>
            </motion.div>
          ))}
        </div>

        {images && images.length > 0 && (
          <div className="grid gap-6 md:gap-8">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-border/20"
              >
                <MaximizableImage
                  src={image.src}
                  alt={image.alt}
                  caption={image.caption}
                  className="w-full h-auto object-contain"
                  imageList={images.map(img => img.src)}
                  currentIndex={index}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PostLaunchSection;