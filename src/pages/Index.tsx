
import React from "react";
import HomepageLayout from "@/components/homepage/HomepageLayout";
import FeaturedProjects from "@/components/home/FeaturedProjects";

const Index: React.FC = () => {
  return (
    <HomepageLayout>
      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Product Designer & Developer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Creating exceptional digital experiences through thoughtful design and innovative solutions.
          </p>
        </div>
        <FeaturedProjects />
      </main>
    </HomepageLayout>
  );
};

export default Index;
