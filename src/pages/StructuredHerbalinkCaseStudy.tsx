import React from 'react';
import StructuredCaseStudyLayout from '@/components/case-study/structured/StructuredCaseStudyLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { Link } from 'react-router-dom';

const StructuredHerbalinkCaseStudy: React.FC = () => {
  const seoProps = {
    title: 'Herbalink Mobile App - Herbal Medicine Platform Case Study',
    description: 'UX design case study for Herbalink, a mobile app connecting users with herbal medicine practitioners and wellness solutions.',
    image: '/lovable-uploads/d6b5fcfc-06c3-4743-b985-15897db8c19b.png',
    projectName: 'Herbalink Mobile App'
  };

  return (
    <StructuredCaseStudyLayout seo={seoProps}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Herbalink Mobile App: Connecting Users with Herbal Medicine Practitioners
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A UX design case study for Herbalink, a mobile app connecting users with herbal medicine practitioners and wellness solutions.
          </p>
          <Badge className="mt-4">UX Design</Badge>
          <Badge className="mt-4">Mobile App</Badge>
          <Badge className="mt-4">Healthcare</Badge>
        </div>

        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>
                Herbalink is a mobile app designed to connect users with qualified herbal medicine practitioners, providing access to natural health solutions and personalized wellness plans.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                <li><strong>Client:</strong> Herbalink</li>
                <li><strong>Industry:</strong> Healthcare, Wellness</li>
                <li><strong>Services:</strong> UX Design, Mobile App Design</li>
                <li><strong>Timeline:</strong> 6 months</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Challenge</CardTitle>
              <CardDescription>
                The challenge was to create a user-friendly mobile app that effectively connects users with herbal medicine practitioners, facilitates virtual consultations, and provides access to personalized wellness plans.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                <li>Designing an intuitive interface for users to find and connect with practitioners.</li>
                <li>Developing a secure platform for virtual consultations and personalized wellness plans.</li>
                <li>Ensuring compliance with healthcare regulations and data privacy standards.</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Solution</CardTitle>
              <CardDescription>
                We designed a mobile app with a clean and intuitive interface, allowing users to easily find and connect with herbal medicine practitioners, schedule virtual consultations, and access personalized wellness plans.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                <li>Intuitive search and filtering options for finding qualified practitioners.</li>
                <li>Secure virtual consultation platform with video conferencing and messaging features.</li>
                <li>Personalized wellness plans with herbal remedies, lifestyle recommendations, and progress tracking.</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>
                The Herbalink mobile app has successfully connected users with herbal medicine practitioners, providing access to natural health solutions and personalized wellness plans.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                <li>Increased access to herbal medicine practitioners and natural health solutions.</li>
                <li>Improved user engagement and satisfaction with personalized wellness plans.</li>
                <li>Positive feedback from users and practitioners on the app's usability and effectiveness.</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Technologies Used</CardTitle>
              <CardDescription>
                We used the following technologies to develop the Herbalink mobile app:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                <li>React Native</li>
                <li>Node.js</li>
                <li>MongoDB</li>
                <li>Firebase</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Conclusion</CardTitle>
              <CardDescription>
                The Herbalink mobile app is a successful example of how UX design can be used to connect users with natural health solutions and improve access to personalized wellness plans.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                By focusing on user needs and creating an intuitive interface, we were able to create a mobile app that effectively connects users with herbal medicine practitioners and provides access to personalized wellness plans.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mt-12 text-center">
          <Link to="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Contact Us <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </section>
      </div>
    </StructuredCaseStudyLayout>
  );
};

export default StructuredHerbalinkCaseStudy;
