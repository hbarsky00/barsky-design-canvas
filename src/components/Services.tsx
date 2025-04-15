
import React from "react";
import { Smartphone, Globe, Sparkles } from "lucide-react";

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="section-container">
        <h2 className="text-3xl font-bold text-center mb-12">App Design Services</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center p-6">
            <Globe className="w-12 h-12 mx-auto mb-4 text-barsky-blue" />
            <h3 className="text-xl font-bold mb-3">Web Applications</h3>
            <p className="text-slate-600">
              Custom web applications designed with modern UI/UX principles, ensuring exceptional user experiences across all devices.
            </p>
          </div>
          
          <div className="text-center p-6">
            <Smartphone className="w-12 h-12 mx-auto mb-4 text-barsky-blue" />
            <h3 className="text-xl font-bold mb-3">Mobile Apps</h3>
            <p className="text-slate-600">
              Native and cross-platform mobile applications that deliver seamless experiences on iOS and Android devices.
            </p>
          </div>
          
          <div className="text-center p-6">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-barsky-blue" />
            <h3 className="text-xl font-bold mb-3">Design Systems</h3>
            <p className="text-slate-600">
              Comprehensive design systems that ensure consistency and scalability across your digital products.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
