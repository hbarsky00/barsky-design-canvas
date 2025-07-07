
import React from "react";
import { CheckCircle, Target, Users, Lightbulb, Search, TrendingUp, Zap, Award, ArrowRight } from "lucide-react";

const achievements = [
  "40%+ conversion rate improvements (verified across 47 client projects)",
  "60% faster design-to-development cycles using AI automation", 
  "Accessibility-first designs that expand your market reach",
  "24-hour response times with personalized project plans"
];

const credentials = [
  "15+ years UX/UI design experience",
  "Google UX Design Certificate", 
  "WCAG 2.1 Accessibility Certification",
  "Based in NYC, serving clients globally",
  "5.0 rating with 47 verified reviews"
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-12 bg-barsky-bg-light">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="section-title">Why Clients Choose Barsky Design</h2>
            <p className="text-barsky-text mb-6 leading-relaxed">
              After 15+ years designing digital products, I discovered that combining traditional UX research with AI creates breakthrough results. While other designers guess, I use AI-powered user insights to deliver:
            </p>
            
            <div className="space-y-4 mb-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-barsky-text">{achievement}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8">
              <h3 className="font-bold text-barsky-dark mb-3">My Unique Advantage:</h3>
              <p className="text-barsky-text italic">
                "I don't just design interfaces—I build AI-enhanced systems that learn and adapt to user behavior, creating experiences that get better over time."
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-bold text-barsky-dark">Credentials & Experience:</h3>
              {credentials.map((credential, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-barsky-blue flex-shrink-0" />
                  <span className="text-barsky-text text-sm">{credential}</span>
                </div>
              ))}
            </div>
            
            {/* Strategic CTA */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
              <h3 className="font-bold mb-3">Ready to Transform Your Business?</h3>
              <p className="mb-4 text-white">
                Join 47+ successful projects that achieved 40%+ conversion improvements through AI-enhanced UX design.
              </p>
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2"
              >
                Get Free Strategy Session
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="mt-6 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-barsky-dark mb-2">Contact Information:</h3>
              <p className="text-barsky-text">
                <span className="font-medium">Email:</span> hello@barskydesign.pro<br/>
                <span className="font-medium">Phone:</span> (201) 668-4754<br/>
                <span className="font-medium">Response Time:</span> 24 hours guaranteed
              </p>
            </div>
          </div>
          
          <div className="space-y-8">
            {/* AI-Enhanced Process */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-barsky-dark">AI-Enhanced UX Process</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-barsky-text text-sm">ChatGPT & Claude AI for user research synthesis</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-barsky-text text-sm">AI-powered competitive analysis and insights</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-barsky-text text-sm">Automated usability testing and optimization</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-barsky-text text-sm">Real-time design iteration with AI feedback</span>
                </div>
              </div>
            </div>

            {/* Conversion Optimization */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-barsky-dark">Conversion-Focused Design</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-barsky-text text-sm">Data-driven design decisions</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-barsky-text text-sm">A/B testing and optimization strategies</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-barsky-text text-sm">Accessibility-first approach (WCAG 2.1)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-barsky-text text-sm">Mobile-responsive design systems</span>
                </div>
              </div>
            </div>

            {/* Business Impact */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-barsky-dark">Measurable Business Results</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">40%+</div>
                  <div className="text-xs text-gray-600">Conversion Increase</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">60%</div>
                  <div className="text-xs text-gray-600">Faster Delivery</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">47</div>
                  <div className="text-xs text-gray-600">Successful Projects</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">5.0</div>
                  <div className="text-xs text-gray-600">Client Rating</div>
                </div>
              </div>
            </div>
            
            {/* Tools & Technologies */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-barsky-dark">AI-Enhanced Toolkit</h3>
              <div className="flex flex-wrap gap-2">
                {["ChatGPT API", "Claude AI", "Figma AI", "React", "Gen AI Integration", "Supabase", "Accessibility Tools", "Analytics"].map((tool, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
