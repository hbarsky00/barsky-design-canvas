
import React from 'react';

const AboutCallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="section-container text-center">
        <h2 className="text-3xl font-bold mb-6 text-barsky-dark">Let's Work Together</h2>
        <p className="text-xl text-barsky-text mb-8 max-w-2xl mx-auto">
          Ready to bring your digital vision to life? I'm here to help you create 
          exceptional user experiences that drive results.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" className="btn-primary">
            Get In Touch
          </a>
          <a href="/projects" className="btn-outline">
            View My Work
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutCallToAction;
