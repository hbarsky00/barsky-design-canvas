
import React from "react";
import { Helmet } from "react-helmet-async";
import { Download, Briefcase, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trackPageView } from "@/lib/analytics";

const Resume = () => {
  React.useEffect(() => {
    trackPageView('/resume', 'Resume - Hiram Barsky');
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Resume | Hiram Barsky | Product Designer & Developer</title>
        <meta name="description" content="Professional resume of Hiram Barsky, including experience, skills, education, and achievements in product design and development." />
        <link rel="canonical" href="https://hirambarsky.com/resume" />
      </Helmet>
      
      <Header />
      <main className="flex-grow pt-24">
        <section className="py-12 bg-slate-50">
          <div className="section-container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Hiram Barsky</h1>
                <p className="text-xl text-slate-600">Product Designer & Developer</p>
              </div>
              <Button className="mt-4 md:mt-0">
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </Button>
            </div>
            
            {/* Summary */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
                <p className="text-slate-600">
                  Product designer and developer with a passion for creating intuitive, engaging digital experiences. 
                  Specializing in UX/UI design, user research, and front-end development, I combine technical skills 
                  with design thinking to build products that delight users and drive business goals.
                </p>
              </CardContent>
            </Card>
            
            {/* Experience */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <Briefcase className="mr-2 text-barsky-blue" />
                <h2 className="text-2xl font-bold">Experience</h2>
              </div>
              
              <div className="space-y-8">
                <div className="border-l-2 border-barsky-blue pl-5 relative">
                  <div className="absolute w-3 h-3 bg-barsky-blue rounded-full -left-[6.5px] top-1"></div>
                  <div className="mb-2">
                    <div className="flex justify-between flex-wrap">
                      <h3 className="text-xl font-semibold">Senior Product Designer</h3>
                      <Badge className="bg-barsky-blue/10 text-barsky-blue hover:bg-barsky-blue/20">2021 - Present</Badge>
                    </div>
                    <p className="text-barsky-blue">Design Agency Inc.</p>
                  </div>
                  <ul className="list-disc list-outside ml-5 text-slate-600 space-y-2">
                    <li>Led UX/UI design for web and mobile applications, increasing user engagement by 40%</li>
                    <li>Collaborated with development teams to ensure design implementation accuracy</li>
                    <li>Conducted user research and usability testing to validate design decisions</li>
                  </ul>
                </div>
                
                <div className="border-l-2 border-barsky-blue pl-5 relative">
                  <div className="absolute w-3 h-3 bg-barsky-blue rounded-full -left-[6.5px] top-1"></div>
                  <div className="mb-2">
                    <div className="flex justify-between flex-wrap">
                      <h3 className="text-xl font-semibold">UX Designer</h3>
                      <Badge className="bg-barsky-blue/10 text-barsky-blue hover:bg-barsky-blue/20">2018 - 2021</Badge>
                    </div>
                    <p className="text-barsky-blue">Tech Innovations Corp</p>
                  </div>
                  <ul className="list-disc list-outside ml-5 text-slate-600 space-y-2">
                    <li>Created wireframes, prototypes, and high-fidelity designs for digital products</li>
                    <li>Implemented design systems to ensure consistency across platforms</li>
                    <li>Facilitated design thinking workshops to solve complex product challenges</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Skills */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Skills</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">Design</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge>UI Design</Badge>
                      <Badge>UX Design</Badge>
                      <Badge>Wireframing</Badge>
                      <Badge>Prototyping</Badge>
                      <Badge>User Research</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">Development</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge>React</Badge>
                      <Badge>TypeScript</Badge>
                      <Badge>HTML/CSS</Badge>
                      <Badge>Tailwind CSS</Badge>
                      <Badge>JavaScript</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Figma</Badge>
                      <Badge>Adobe XD</Badge>
                      <Badge>Sketch</Badge>
                      <Badge>InVision</Badge>
                      <Badge>Zeplin</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">Other</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Agile</Badge>
                      <Badge>Design Systems</Badge>
                      <Badge>Design Thinking</Badge>
                      <Badge>User Testing</Badge>
                      <Badge>Project Management</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Education */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <GraduationCap className="mr-2 text-barsky-blue" />
                <h2 className="text-2xl font-bold">Education</h2>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-2 border-barsky-blue pl-5 relative">
                  <div className="absolute w-3 h-3 bg-barsky-blue rounded-full -left-[6.5px] top-1"></div>
                  <div className="mb-2">
                    <div className="flex justify-between flex-wrap">
                      <h3 className="text-xl font-semibold">Master of Fine Arts in Design</h3>
                      <Badge className="bg-barsky-blue/10 text-barsky-blue hover:bg-barsky-blue/20">2016 - 2018</Badge>
                    </div>
                    <p className="text-barsky-blue">Design University</p>
                  </div>
                </div>
                
                <div className="border-l-2 border-barsky-blue pl-5 relative">
                  <div className="absolute w-3 h-3 bg-barsky-blue rounded-full -left-[6.5px] top-1"></div>
                  <div>
                    <div className="flex justify-between flex-wrap">
                      <h3 className="text-xl font-semibold">Bachelor of Arts in Digital Media</h3>
                      <Badge className="bg-barsky-blue/10 text-barsky-blue hover:bg-barsky-blue/20">2012 - 2016</Badge>
                    </div>
                    <p className="text-barsky-blue">Creative Arts College</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Certifications */}
            <div>
              <div className="flex items-center mb-6">
                <Award className="mr-2 text-barsky-blue" />
                <h2 className="text-2xl font-bold">Certifications</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold">Google UX Design Professional Certificate</h3>
                    <p className="text-slate-600 text-sm mt-1">2022</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold">Certified Scrum Product Owner</h3>
                    <p className="text-slate-600 text-sm mt-1">2021</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Resume;
