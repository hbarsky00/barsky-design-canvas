
import React from "react";
import { CheckCircle, Target, Users, Lightbulb, Search, TrendingUp, Zap, Award, ArrowRight } from "lucide-react";

const achievements = ["40%+ conversion rate improvements (verified across 47 client projects)", "60% faster design-to-development cycles using AI automation", "Accessibility-first designs that expand your market reach", "24-hour response times with personalized project plans"];

const credentials = ["15+ years Product Design experience", "Google UX Design Certificate", "WCAG 2.1 Accessibility Certification", "Based in NYC, serving clients globally", "5.0 rating with 47 verified reviews"];

const About: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-barsky-dark">About Barsky Design</h2>
          <p className="text-xl text-barsky-text mb-8">
            Transforming ideas into exceptional digital experiences through AI-enhanced design and strategic thinking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-barsky-dark flex items-center gap-3">
              <Target className="w-8 h-8 text-barsky-blue" />
              Proven Results
            </h3>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-barsky-text">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-barsky-dark flex items-center gap-3">
              <Award className="w-8 h-8 text-barsky-blue" />
              Credentials & Experience
            </h3>
            <div className="space-y-4">
              {credentials.map((credential, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-barsky-blue mt-1 flex-shrink-0" />
                  <span className="text-barsky-text">{credential}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a href="/contact" className="btn-primary inline-flex items-center gap-2">
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
