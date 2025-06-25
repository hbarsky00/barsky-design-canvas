
import React from 'react';

const AboutServices: React.FC = () => {
  return (
    <section className="py-20 bg-barsky-bg-light">
      <div className="section-container">
        <h2 className="text-3xl font-bold text-center mb-12 text-barsky-dark">What I Do</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-4 text-barsky-dark">UX/UI Design</h3>
              <p className="text-barsky-text">
                Creating intuitive and engaging user interfaces that prioritize user experience 
                and drive business results.
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-4 text-barsky-dark">Mobile App Design</h3>
              <p className="text-barsky-text">
                Designing mobile applications that provide seamless experiences across 
                iOS and Android platforms.
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold mb-4 text-barsky-dark">Web Development</h3>
              <p className="text-barsky-text">
                Building responsive websites and web applications using modern technologies 
                like React and TypeScript.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutServices;
