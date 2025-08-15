import React from 'react';
import StructuredCaseStudyLayout from '@/components/case-study/structured/StructuredCaseStudyLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { LinkButton } from "@/components/ui/link-button";
import ProjectImage from '@/components/project/ProjectImage';
import ServicesCallToAction from "@/components/services/ServicesCallToAction";

const StructuredSplittimeCaseStudy: React.FC = () => {
  const seoProps = {
    title: 'Splittime - Enterprise Software Case Study',
    description: 'UX design case study for Splittime, a comprehensive time management platform featuring advanced analytics and workflow automation.',
    image: '/lovable-uploads/a4f7c8e1-2d9b-4c3f-8a7e-9d1c2b3a4f5e.png',
    projectName: 'Splittime'
  };

  return (
    <StructuredCaseStudyLayout seo={seoProps}>
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Splittime
            </CardTitle>
            <CardDescription>
              Streamlining operations with advanced analytics and workflow automation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectImage
              src="/lovable-uploads/a4f7c8e1-2d9b-4c3f-8a7e-9d1c2b3a4f5e.png"
              alt="Splittime Interface"
              className="rounded-md"
            />
            <p className="text-gray-600 mt-4">
              A comprehensive platform designed to optimize business processes,
              enhance decision-making, and improve overall efficiency.
            </p>
          </CardContent>
        </Card>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Real-time insights into business performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Interactive dashboards provide a clear overview of key metrics,
                  enabling data-driven decisions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workflow Automation</CardTitle>
                <CardDescription>
                  Automated tasks to reduce manual effort.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Customizable workflows automate routine tasks, freeing up resources
                  for strategic initiatives.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            <Badge>React</Badge>
            <Badge>Node.js</Badge>
            <Badge>PostgreSQL</Badge>
            <Badge>GraphQL</Badge>
            <Badge>Material UI</Badge>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="challenge">
              <AccordionTrigger>Challenge</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  The challenge was to create a unified platform that integrates
                  various business functions into a single, easy-to-use interface.
                  This required a deep understanding of business processes and the
                  ability to translate complex requirements into intuitive design.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="solution">
              <AccordionTrigger>Solution</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-600">
                  We developed a modular platform with customizable dashboards,
                  automated workflows, and real-time analytics. The platform was
                  designed to be scalable and adaptable to the changing needs of the
                  business.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="results">
              <AccordionTrigger>Results</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Improved operational efficiency by 30%</li>
                  <li>Reduced manual effort by 40%</li>
                  <li>Enhanced decision-making with real-time analytics</li>
                  <li>Increased overall business performance</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Team</h2>
          <ScrollArea className="h-40 rounded-md border p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="font-semibold">Hiram Barsky</p>
                <p className="text-gray-600">Lead Designer</p>
              </div>
              <div>
                <p className="font-semibold">Jane Smith</p>
                <p className="text-gray-600">Project Manager</p>
              </div>
              <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-gray-600">Lead Developer</p>
              </div>
            </div>
          </ScrollArea>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
          <Separator className="mb-4" />
          <div className="flex flex-col gap-4">
            <LinkButton href="#" variant="secondary">
              Download Case Study PDF
            </LinkButton>
            <LinkButton href="#" variant="secondary">
              View Project on GitHub
            </LinkButton>
            <LinkButton href="#" variant="secondary">
              Read Client Testimonials
            </LinkButton>
          </div>
        </section>
      </div>
      <ServicesCallToAction />
    </StructuredCaseStudyLayout>
  );
};

export default StructuredSplittimeCaseStudy;
