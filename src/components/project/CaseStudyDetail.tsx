import React, { useState } from "react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CaseStudyDetailProps {
  project: ProjectProps;
  details: ProjectDetails;
  projectId: string;
}

const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({
  project,
  details,
  projectId,
}) => {
  const [activeTab, setActiveTab] = useState("what-i-did");

  // Get project-specific styling and content
  const getProjectStyling = () => {
    switch (projectId) {
      case 'barsky-joint':
        return {
          gradient: 'linear-gradient(135deg, #d73502, #ff6b35)',
          heroText: '🍔 Barsky Joint Mobile App / Food Truck Ordering Platform',
          accent: 'from-orange-500 to-red-500',
          role: 'UX Designer & Developer',
          duration: '4 Weeks',
          platform: 'Mobile App',
          tagline: 'Designing the Future of Street Food Ordering'
        };
      case 'herbalink':
        return {
          gradient: 'linear-gradient(135deg, #2d5016, #4a7c59, #6b8e23)',
          heroText: '🌿 Herbalink App Interface / Herbal Wellness Platform',
          accent: 'from-green-600 to-green-800',
          role: 'UX/UI Designer',
          duration: '4 Weeks',
          platform: 'Solo Project',
          tagline: 'Connecting People with Certified Herbalists'
        };
      case 'splittime':
        return {
          gradient: 'linear-gradient(135deg, #7c3aed, #a855f7, #c084fc)',
          heroText: '📱 SplitTime App Interface / Co-Parenting Management Platform',
          accent: 'from-purple-600 to-purple-800',
          role: 'Lead UX Designer',
          duration: '3 Weeks',
          platform: 'Mobile App',
          tagline: 'Simplifying Co-Parenting Through Thoughtful Design'
        };
      case 'investor-loan-app':
        return {
          gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6, #60a5fa)',
          heroText: '📊 Banking Platform Interface / Loan Management System',
          accent: 'from-blue-700 to-blue-900',
          role: 'Lead UX Designer',
          duration: '1.5 Years',
          platform: 'Web Application',
          tagline: 'Modernizing Excel-based Banking Workflows'
        };
      default:
        return {
          gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
          heroText: '📱 Project Interface',
          accent: 'from-blue-600 to-purple-600',
          role: 'Designer',
          duration: 'Variable',
          platform: 'Digital',
          tagline: 'Digital Experience Design'
        };
    }
  };

  const styling = getProjectStyling();

  const renderWhatIDidContent = () => {
    switch (projectId) {
      case 'barsky-joint':
        return (
          <div className="space-y-8">
            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">🔍 User Research & Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">User interviews, competitor analysis, and market research to understand food truck customer behavior</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">🎨 Figma Design & Prototyping</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Created design system, wireframes, and high-fidelity prototypes with user testing</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">🤖 AI Development with Lovable</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Built the app using Lovable's AI-powered development platform</p>
                </CardContent>
              </Card>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  👥 User Research Methodology
                </div>
                <CardHeader>
                  <CardTitle>User Research & Discovery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>I conducted comprehensive research to understand the food truck ecosystem and customer pain points. Through interviews with 15 potential customers and observations at local food trucks, I identified key user needs: quick ordering during lunch breaks, real-time location tracking, and menu transparency.</p>
                </CardContent>
              </Card>

              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-green-500 to-green-700 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  📐 User Journey Mapping
                </div>
                <CardHeader>
                  <CardTitle>Information Architecture & User Flows</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>I mapped out the core user journey from app discovery to order completion, focusing on a streamlined 3-tap ordering process. The information architecture prioritized the menu as the primary entry point.</p>
                </CardContent>
              </Card>

              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  🎨 Design System & Prototypes
                </div>
                <CardHeader>
                  <CardTitle>Design System & Prototyping in Figma</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Using Figma, I developed a comprehensive design system featuring warm, appetite-inducing colors that reflected the gourmet burger brand. I created high-fidelity prototypes for core user flows.</p>
                </CardContent>
              </Card>

              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-orange-500 to-red-600 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  🤖 AI Development with Lovable
                </div>
                <CardHeader>
                  <CardTitle>Development with Lovable</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>I leveraged Lovable's AI-powered development platform to rapidly prototype and build the React Native application, translating my Figma designs into functional components.</p>
                </CardContent>
              </Card>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 pt-4">
              {['Lovable', 'React Native', 'Figma', 'Stripe', 'WebSocket', 'GPS Tracking'].map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </div>
        );

      case 'herbalink':
        return (
          <div className="space-y-8">
            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">🔍 User Research & Interviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Conducted interviews with 12 participants to understand pain points in herbal wellness access</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">🎨 Design System & Prototypes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Created design system, wireframes, and high-fidelity prototypes in Figma</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">🧪 User Testing & Validation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Conducted usability testing and refined the experience based on user feedback</p>
                </CardContent>
              </Card>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-green-600 to-emerald-700 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  👥 User Interview Sessions
                </div>
                <CardHeader>
                  <CardTitle>User Research & Discovery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>I conducted interviews with 12 participants (6 potential users, 6 practicing herbalists) to understand pain points and opportunities in the herbal wellness space.</p>
                </CardContent>
              </Card>

              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-teal-500 to-green-600 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  📊 Herbalist Discovery User Flows
                </div>
                <CardHeader>
                  <CardTitle>Information Architecture</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>I mapped out core user journeys focusing on trust-building and education. The architecture prioritized herbalist discovery as the primary entry point.</p>
                </CardContent>
              </Card>

              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  🎨 Design System & Components
                </div>
                <CardHeader>
                  <CardTitle>Design System & Prototyping</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Using Figma, I developed a comprehensive design system featuring earthy colors that conveyed natural trustworthiness.</p>
                </CardContent>
              </Card>

              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-green-700 to-emerald-800 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  🛡️ Trust-Building Features
                </div>
                <CardHeader>
                  <CardTitle>Trust-Building Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>I designed comprehensive herbalist profiles featuring detailed certification displays, educational backgrounds, and verified testimonials.</p>
                </CardContent>
              </Card>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 pt-4">
              {['Figma', 'Miro', 'Maze', 'Notion'].map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </div>
        );

      case 'splittime':
        return (
          <div className="space-y-8">
            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">🔍 User Research & Discovery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Conducted interviews with 7 co-parents to understand pain points and existing tool limitations</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">🎨 UX Design & Testing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Created wireframes, tested with 5 participants, and refined key flows based on feedback</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">📱 Visual Design & Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Developed calming visual design and guided development to fully functional MVP</p>
                </CardContent>
              </Card>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  👥 Co-Parent Interview Research
                </div>
                <CardHeader>
                  <CardTitle>Discovery & Research</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>I conducted interviews with seven parents managing joint or split custody arrangements. Their pain points were consistent: stress from communication breakdowns and difficulties tracking expenses.</p>
                </CardContent>
              </Card>

              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  🏗️ Family Coordination Feature Design
                </div>
                <CardHeader>
                  <CardTitle>Features & Information Architecture</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>SplitTime centers around five core tools: shared calendar, expense tracker, secure messaging, document vault, and private parenting journal.</p>
                </CardContent>
              </Card>

              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-violet-500 to-purple-700 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  📐 Wireframes & User Testing
                </div>
                <CardHeader>
                  <CardTitle>UX Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>I created wireframes for each flow and tested them with five early participants. Feedback led to key improvements in custody schedule visualization.</p>
                </CardContent>
              </Card>

              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-purple-700 to-indigo-800 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  🎨 Visual Design & Accessibility
                </div>
                <CardHeader>
                  <CardTitle>Visual Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>The app uses soft, calming colors—blues and greens—with rounded sans-serif typeface to reinforce neutrality and trust.</p>
                </CardContent>
              </Card>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 pt-4">
              {['Figma', 'Sketch', 'InVision', 'Principle'].map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </div>
        );

      case 'investor-loan-app':
        return (
          <div className="space-y-8">
            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">🔍 Banking Workflow Research</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Conducted extensive research with banking teams to understand Excel-based pain points and compliance requirements</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">📐 Financial System Architecture</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Mapped complex financial workflows and created prototypes for loan management and deal processing</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">💼 Banking Platform Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Guided development of AI-powered search, dynamic order books, and compliance-ready features</p>
                </CardContent>
              </Card>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-blue-700 to-indigo-800 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  👥 Banking Team Interviews
                </div>
                <CardHeader>
                  <CardTitle>Research & Discovery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>I conducted extensive research with the banking team to understand critical pain points: manual data entry errors, time-consuming Excel processes, and limited search capabilities.</p>
                </CardContent>
              </Card>

              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  📊 Loan Management User Flows
                </div>
                <CardHeader>
                  <CardTitle>Information Architecture</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>I mapped the complete user journey from initial loan inquiry to final processing, identifying key decision points and data requirements.</p>
                </CardContent>
              </Card>

              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  🎨 Banking Design System
                </div>
                <CardHeader>
                  <CardTitle>Design System</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Developed a professional color palette specifically for banking UI applications with WCAG 2.1 AA compliance throughout the platform.</p>
                </CardContent>
              </Card>

              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  🔍 AI-Powered Search Interface
                </div>
                <CardHeader>
                  <CardTitle>Key Features & Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>The platform's AI-powered search functionality addressed the critical problem of users being unable to efficiently find specific loans or borrower information.</p>
                </CardContent>
              </Card>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 pt-4">
              {['Figma', 'Sketch', 'Principle', 'InVision'].map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Content not available for this project.</div>;
    }
  };

  const renderChallengeContent = () => {
    switch (projectId) {
      case 'barsky-joint':
        return (
          <div className="space-y-8">
            <Card className="glass-card-elevated">
              <CardHeader>
                <CardTitle className="text-xl">Primary Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-6">
                  <strong>Balancing Speed with Customization</strong> - The biggest challenge was creating an ordering experience that was both lightning-fast for rushed lunch customers while still allowing for meaningful burger customization. Food truck customers have notoriously short attention spans and often make decisions while walking, yet our gourmet burger concept required showcasing customization options that differentiated us from fast-food competitors.
                </p>
              </CardContent>
            </Card>

            {/* Challenge Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card">
                <div className="h-40 bg-gradient-to-br from-red-500 to-orange-600 rounded-t-lg flex items-center justify-center text-white font-semibold text-center p-4">
                  ⏰ Long Wait Times at Food Trucks
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm">Customers frequently abandoned food truck lines during busy lunch hours, creating lost revenue opportunities</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <div className="h-40 bg-gradient-to-br from-orange-500 to-red-600 rounded-t-lg flex items-center justify-center text-white font-semibold text-center p-4">
                  🍔 Burger Customization Complexity
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm">Gourmet customization options needed to be presented clearly without overwhelming rushed customers</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <div className="h-40 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-t-lg flex items-center justify-center text-white font-semibold text-center p-4">
                  💳 Mobile Payment Integration
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm">Contactless payment processing was essential for food truck's mobile business model</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'herbalink':
        return (
          <div className="space-y-8">
            <Card className="glass-card-elevated">
              <CardHeader>
                <CardTitle className="text-xl">Primary Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-6">
                  <strong>Building Trust in a Skeptical Market</strong> - The biggest challenge was creating a platform that would instill confidence in users who are often skeptical about online health services, especially in the alternative medicine space. Users needed assurance about herbalist qualifications while herbalists needed tools to establish credibility and manage their practice effectively.
                </p>
              </CardContent>
            </Card>

            {/* Challenge Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card">
                <div className="h-40 bg-gradient-to-br from-green-600 to-emerald-700 rounded-t-lg flex items-center justify-center text-white font-semibold text-center p-4">
                  🛡️ Trust & Verification System
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm">Digital certification system needed to clearly display herbalist credentials and build user confidence</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <div className="h-40 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-t-lg flex items-center justify-center text-white font-semibold text-center p-4">
                  🌿 Herbal Education Interface
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm">Complex botanical information required intuitive presentation with safety warnings and usage guidance</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <div className="h-40 bg-gradient-to-br from-teal-600 to-green-700 rounded-t-lg flex items-center justify-center text-white font-semibold text-center p-4">
                  💻 Video Consultation Platform
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm">Remote wellness consultations needed to feel personal and trustworthy despite virtual format</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'splittime':
        return (
          <div className="space-y-8">
            <Card className="glass-card-elevated">
              <CardHeader>
                <CardTitle className="text-xl">Primary Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-6">
                  <strong>Emotional Design at the Intersection of Logistics and Relationships</strong> - Co-parenting can be one of the most emotionally and logistically challenging experiences in modern family life. Many parents rely on disconnected tools that increase stress and conflict. Every design detail—from message templates to color choices—affects trust and usability in this sensitive context.
                </p>
              </CardContent>
            </Card>

            {/* Challenge Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card">
                <div className="h-40 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-t-lg flex items-center justify-center text-white font-semibold text-center p-4">
                  💬 Communication Breakdown
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm">Heated text exchanges and email chains often escalated minor scheduling conflicts into major disputes</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <div className="h-40 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-t-lg flex items-center justify-center text-white font-semibold text-center p-4">
                  📊 Scattered Tools & Data
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm">Parents juggled multiple apps, spreadsheets, and calendars leading to missed pickups and duplicate expenses</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <div className="h-40 bg-gradient-to-br from-violet-600 to-purple-700 rounded-t-lg flex items-center justify-center text-white font-semibold text-center p-4">
                  😰 Emotional Stress & Tension
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm">Simple logistics became emotionally charged when filtered through relationship tension and custody concerns</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'investor-loan-app':
        return (
          <div className="space-y-8">
            <Card className="glass-card-elevated">
              <CardHeader>
                <CardTitle className="text-xl">Primary Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-6">
                  <strong>Transforming Legacy Excel-Based Banking Operations</strong> - The bank's outdated Excel-based approach created significant inefficiencies, increased error rates, and severely limited scalability potential. The institution urgently needed to automate workflows, reduce human error, support rapid business growth, handle complex financial data with strict accuracy, and maintain regulatory compliance standards.
                </p>
              </CardContent>
            </Card>

            {/* Challenge Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-card">
                <div className="h-40 bg-gradient-to-br from-blue-700 to-indigo-800 rounded-t-lg flex items-center justify-center text-white font-semibold text-center p-4">
                  📊 Excel Spreadsheet Limitations
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm">Manual Excel tracking created data silos, version control issues, and made collaboration nearly impossible</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <div className="h-40 bg-gradient-to-br from-indigo-700 to-blue-800 rounded-t-lg flex items-center justify-center text-white font-semibold text-center p-4">
                  ⚠️ Compliance Risks & Errors
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm">Manual data entry led to frequent errors that created serious compliance and regulatory reporting issues</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <div className="h-40 bg-gradient-to-br from-cyan-700 to-blue-800 rounded-t-lg flex items-center justify-center text-white font-semibold text-center p-4">
                  📧 Email Communication Chaos
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm">Email-based deal communication created information silos and made deal tracking extremely difficult</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return <div>Challenge content not available for this project.</div>;
    }
  };

  const renderResultsContent = () => {
    switch (projectId) {
      case 'barsky-joint':
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-orange-600 mb-2">40%</div>
                  <div className="text-sm text-gray-600">Reduction in Order Time</div>
                </CardContent>
              </Card>
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                  <div className="text-sm text-gray-600">Order Completion Rate</div>
                </CardContent>
              </Card>
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">60%</div>
                  <div className="text-sm text-gray-600">Pre-Orders Before Arrival</div>
                </CardContent>
              </Card>
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">4.7/5</div>
                  <div className="text-sm text-gray-600">App Store Rating</div>
                </CardContent>
              </Card>
            </div>

            {/* Results Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-green-500 to-emerald-600 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  😊 User Testing Success Metrics
                </div>
                <CardHeader>
                  <CardTitle>User Experience Improvements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>The streamlined interface resulted in measurably better user satisfaction. Post-launch surveys showed that 92% of users found the ordering process 'intuitive' and 87% appreciated the real-time truck location feature.</p>
                </CardContent>
              </Card>

              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  📈 Revenue Growth Analytics Dashboard
                </div>
                <CardHeader>
                  <CardTitle>Business Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>The app directly contributed to a 35% increase in daily orders and enabled the food truck to serve 25% more customers during peak lunch hours.</p>
                </CardContent>
              </Card>
            </div>

            {/* Impact Summary */}
            <Card className="glass-card-elevated bg-orange-50 border-orange-200">
              <CardContent className="pt-6">
                <p className="text-lg text-gray-700">
                  <strong>Impact Summary:</strong> Successfully launching a production-ready mobile app using AI-assisted development demonstrated the viability of rapid prototyping tools for small business applications.
                </p>
              </CardContent>
            </Card>
          </div>
        );

      case 'herbalink':
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
                  <div className="text-sm text-gray-600">User Trust Rating</div>
                </CardContent>
              </Card>
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">85%</div>
                  <div className="text-sm text-gray-600">Task Completion Rate</div>
                </CardContent>
              </Card>
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-teal-600 mb-2">75%</div>
                  <div className="text-sm text-gray-600">Booking Flow Success</div>
                </CardContent>
              </Card>
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
                  <div className="text-sm text-gray-600">User Testing Sessions</div>
                </CardContent>
              </Card>
            </div>

            {/* Results Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-green-500 to-emerald-600 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  ✅ Prototype Testing Results
                </div>
                <CardHeader>
                  <CardTitle>User Experience Validation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Through prototype testing with potential users, I validated core design assumptions and identified key areas for improvement. Users appreciated the trust-building features and found the herbalist matching process intuitive.</p>
                </CardContent>
              </Card>

              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-teal-500 to-green-600 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  🚀 Market Launch Ready
                </div>
                <CardHeader>
                  <CardTitle>Market Readiness & Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>The app has been developed and is ready for market launch, with the design foundation in place to support both users seeking herbal guidance and practitioners looking to grow their practice digitally.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'splittime':
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-purple-600 mb-2">7</div>
                  <div className="text-sm text-gray-600">User Interviews</div>
                </CardContent>
              </Card>
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">5</div>
                  <div className="text-sm text-gray-600">Features Designed</div>
                </CardContent>
              </Card>
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-violet-600 mb-2">3</div>
                  <div className="text-sm text-gray-600">Weeks to MVP</div>
                </CardContent>
              </Card>
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                  <div className="text-sm text-gray-600">Functionally Complete</div>
                </CardContent>
              </Card>
            </div>

            {/* Results Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  ✅ MVP Development Completion
                </div>
                <CardHeader>
                  <CardTitle>Current Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>SplitTime is now fully designed and developed, ready for user testing. While not yet publicly marketed, the product is stable and functional with all core features implemented.</p>
                </CardContent>
              </Card>

              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  💡 Key Learnings & Insights
                </div>
                <CardHeader>
                  <CardTitle>Reflections & Learnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Designing SplitTime emphasized how crucial emotional design is when products live at the intersection of logistics and personal relationships. Every detail affects trust and usability.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'investor-loan-app':
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
                  <div className="text-sm text-gray-600">Error Reduction</div>
                </CardContent>
              </Card>
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">40%</div>
                  <div className="text-sm text-gray-600">Faster Processing</div>
                </CardContent>
              </Card>
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-cyan-600 mb-2">80%</div>
                  <div className="text-sm text-gray-600">User Satisfaction</div>
                </CardContent>
              </Card>
              <Card className="glass-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">200+</div>
                  <div className="text-sm text-gray-600">Orders Processed</div>
                </CardContent>
              </Card>
            </div>

            {/* Results Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  📈 Performance Analytics Dashboard
                </div>
                <CardHeader>
                  <CardTitle>Measurable Business Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>The platform delivered exceptional results: 85% reduction in manual errors, 40% acceleration in deal processing time, and successful processing of over 200 orders within the first 60 days of launch.</p>
                </CardContent>
              </Card>

              <Card className="glass-card-elevated">
                <div className="h-48 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-t-lg flex items-center justify-center text-white font-semibold">
                  💡 User Experience Transformation
                </div>
                <CardHeader>
                  <CardTitle>Qualitative Improvements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Beyond quantitative metrics, the qualitative improvements were equally significant. The bank gained increased agility to move faster in competitive markets while maintaining better compliance.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return <div>Results content not available for this project.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div 
        className="relative h-96 flex items-center justify-center text-white text-center"
        style={{ background: styling.gradient }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90">{styling.tagline}</p>
          <div className="text-lg font-medium">{styling.heroText}</div>
          
          {/* Project Meta */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
            <div><strong>Role:</strong> {styling.role}</div>
            <div><strong>Duration:</strong> {styling.duration}</div>
            <div><strong>Platform:</strong> {styling.platform}</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start h-14 bg-transparent border-0 p-0">
              <TabsTrigger 
                value="what-i-did" 
                className="h-14 px-6 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none"
              >
                What I Did
              </TabsTrigger>
              <TabsTrigger 
                value="challenge" 
                className="h-14 px-6 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none"
              >
                Challenge
              </TabsTrigger>
              <TabsTrigger 
                value="results" 
                className="h-14 px-6 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none"
              >
                Results
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="what-i-did" className="mt-0">
            {renderWhatIDidContent()}
          </TabsContent>

          <TabsContent value="challenge" className="mt-0">
            {renderChallengeContent()}
          </TabsContent>

          <TabsContent value="results" className="mt-0">
            {renderResultsContent()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CaseStudyDetail;