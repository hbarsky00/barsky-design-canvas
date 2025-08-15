import React from 'react';
import StructuredCaseStudyLayout from '@/components/case-study/structured/StructuredCaseStudyLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CallToAction } from "@/components/CallToAction";

const StructuredSplittimeCaseStudy: React.FC = () => {
  const seoProps = {
    title: 'Splittime Co-Parenting App - Family Coordination Case Study',
    description: 'UX design case study for Splittime, a co-parenting app that helps separated families coordinate child care and activities.',
    image: '/lovable-uploads/f47ac10b-58cc-4372-a567-0e02b2c3d479.png',
    projectName: 'Splittime Co-Parenting App'
  };

  return (
    <StructuredCaseStudyLayout seo={seoProps}>
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        {/* Hero Section */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Splittime: Simplifying Co-Parenting</CardTitle>
              <CardDescription>A UX case study on designing a co-parenting app to streamline communication and coordination for separated families.</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src="/lovable-uploads/f47ac10b-58cc-4372-a567-0e02b2c3d479.png"
                alt="Splittime App Interface"
                className="rounded-md shadow-md mb-4"
              />
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge>UX Design</Badge>
                <Badge>Mobile App</Badge>
                <Badge>Co-Parenting</Badge>
                <Badge>Family Tech</Badge>
              </div>
              <p>
                Splittime is a mobile app designed to alleviate the challenges faced by co-parents in managing their children's schedules, activities, and communication. This case study explores the UX design process behind creating an intuitive and efficient tool for modern families.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Problem Statement */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">The Challenge</CardTitle>
              <CardDescription>Addressing the pain points of co-parenting through thoughtful design.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Co-parenting can be complex, involving constant communication, shared calendars, and the need to coordinate various aspects of a child's life. Existing solutions often fall short in providing a seamless and user-friendly experience.
              </p>
              <ul className="list-disc list-inside">
                <li>Inconsistent communication channels</li>
                <li>Difficulty in managing shared calendars</li>
                <li>Lack of a centralized platform for important information</li>
                <li>Challenges in tracking expenses and reimbursements</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Solution */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Our Solution</CardTitle>
              <CardDescription>Creating a unified platform for co-parenting success.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Splittime offers a comprehensive suite of features designed to simplify co-parenting:
              </p>
              <ul className="list-disc list-inside">
                <li>Shared calendar for scheduling and events</li>
                <li>Secure messaging for streamlined communication</li>
                <li>Expense tracking and reimbursement tools</li>
                <li>Information sharing for important documents and details</li>
              </ul>
              <img
                src="/lovable-uploads/49f1995a-9c1f-4971-b93a-9ca9896c540b.png"
                alt="Splittime App Calendar"
                className="rounded-md shadow-md mt-4"
              />
            </CardContent>
          </Card>
        </section>

        {/* UX Design Process */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">UX Design Process</CardTitle>
              <CardDescription>A user-centered approach to design.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Our UX design process focused on understanding the needs and pain points of co-parents through research and user testing.
              </p>
              <ol className="list-decimal list-inside">
                <li><strong>User Research:</strong> Conducting interviews and surveys to gather insights.</li>
                <li><strong>Wireframing:</strong> Creating low-fidelity wireframes to outline the app's structure.</li>
                <li><strong>Prototyping:</strong> Developing interactive prototypes for user testing.</li>
                <li><strong>User Testing:</strong> Gathering feedback and iterating on the design.</li>
                <li><strong>Visual Design:</strong> Crafting a clean and intuitive visual interface.</li>
              </ol>
              <img
                src="/lovable-uploads/a9a66997-489a-496c-9a9f-9c5e8a9a9a9a.png"
                alt="Splittime App Wireframes"
                className="rounded-md shadow-md mt-4"
              />
            </CardContent>
          </Card>
        </section>

        {/* Key Features */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Key Features</CardTitle>
              <CardDescription>Highlighting the core functionalities of Splittime.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Shared Calendar</h3>
                  <p>
                    A centralized calendar for scheduling events, appointments, and activities, ensuring both parents are always on the same page.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Secure Messaging</h3>
                  <p>
                    A private and secure messaging platform for co-parents to communicate about important matters related to their children.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Expense Tracking</h3>
                  <p>
                    Tools for tracking and managing shared expenses, making it easy to calculate and request reimbursements.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Information Sharing</h3>
                  <p>
                    A secure repository for storing and sharing important documents, medical records, and other essential information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Results */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Results</CardTitle>
              <CardDescription>Quantifiable improvements in co-parenting efficiency.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Splittime has helped numerous families streamline their co-parenting efforts, resulting in:
              </p>
              <ul className="list-disc list-inside">
                <li>Increased communication efficiency</li>
                <li>Reduced scheduling conflicts</li>
                <li>Improved expense management</li>
                <li>Enhanced overall co-parenting experience</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Conclusion</CardTitle>
              <CardDescription>Empowering families through innovative design.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Splittime demonstrates the power of user-centered design in addressing real-world challenges. By focusing on the needs of co-parents, we've created a tool that simplifies their lives and promotes a more harmonious family dynamic.
              </p>
              <Link to="/contact" className="inline-flex items-center text-blue-500 hover:underline">
                Learn more about our UX design services <ArrowRight className="ml-2" size={16} />
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <CallToAction
          title="Transform Your Ideas into Reality"
          description="Ready to create a product that makes a difference? Let's work together to bring your vision to life."
          buttonText="Get Started"
          link="/contact"
        />
      </div>
    </StructuredCaseStudyLayout>
  );
};

export default StructuredSplittimeCaseStudy;
