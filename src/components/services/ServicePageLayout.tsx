import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles, Cpu, Palette, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICES_DATA, SERVICES_CTA, SERVICES_HERO } from "@/data/services";
import { SERVICES_OVERVIEW } from "@/data/serviceContent";
import { Link } from "react-router-dom";
import SectionTransition from "@/components/transitions/SectionTransition";
const serviceIcons = [<Palette className="h-8 w-8" />, <Cpu className="h-8 w-8" />];
const ServicePageLayout: React.FC = () => {
  return <div className="min-h-screen">
      {/* Hero Section */}
      <SectionTransition variant="fade" className="py-20 md:py-28 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="space-y-6">
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.5,
            delay: 0.1
          }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-md-sys-primary-container/50 text-md-sys-on-primary-container text-label-medium font-medium backdrop-blur-sm border border-md-sys-outline-variant/30">
              <Sparkles className="h-4 w-4" />
              Gen-AI First Approach
            </motion.div>
            
            <h1 className="text-display-small md:text-display-medium lg:text-display-large font-bold text-foreground tracking-tight">
              {SERVICES_HERO.title}
            </h1>
            
            <p className="text-body-large md:text-title-large text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {SERVICES_HERO.description}
            </p>
            
            <motion.div initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.3
          }} className="pt-4">
              <Button asChild variant="brand" size="lg">
                <Link to="/contact">
                  {SERVICES_HERO.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </SectionTransition>

      {/* The citable answer passage. /services had none — nothing on the page was a
          self-contained block an answer engine could quote. */}
      <SectionTransition variant="fade" delay={0.05} className="px-4 pb-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-body-large md:text-title-medium leading-relaxed text-foreground border-l-4 border-md-sys-primary pl-6 py-2">
            {SERVICES_OVERVIEW.answer}
          </p>
        </div>
      </SectionTransition>

      {/* Services Grid */}
      <SectionTransition variant="fade" delay={0.1} className="py-16 md:py-20 px-4 bg-md-sys-surface-container-low/40">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 10
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }} className="text-center mb-12">
            <h2 className="text-headline-medium md:text-headline-large font-bold text-foreground mb-4">
              What I Offer
            </h2>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Comprehensive design and development services powered by AI-enhanced workflows
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {SERVICES_DATA.map((service, index) => <motion.div key={service.title} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: index * 0.15
          }}>
                <Card className="h-full bg-background/60 backdrop-blur-sm border-md-sys-outline-variant/30 shadow-elevation-2 hover:shadow-elevation-4 transition-all duration-300 hover:scale-[1.02] group">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-md-sys-primary/10 to-md-sys-tertiary/10 text-md-sys-primary group-hover:from-md-sys-primary/20 group-hover:to-md-sys-tertiary/20 transition-colors duration-300">
                        {serviceIcons[index]}
                      </div>
                      <div>
                        <h3 className="text-title-large font-bold text-foreground mb-1">
                          {service.title}
                        </h3>
                        <p className="text-body-medium text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mt-6">
                      {service.features.map(feature => <li key={feature} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-md-sys-primary flex-shrink-0" />
                          <span className="text-body-medium text-foreground">{feature}</span>
                        </li>)}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </SectionTransition>

      {/* Long-form sections. This page was 195 words with "design" at 10.31%
          density — the thinnest commercial page on the site. */}
      <SectionTransition variant="fade" delay={0.15} className="py-16 md:py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-14">
          {SERVICES_OVERVIEW.sections.map(section => <section key={section.id} id={section.id}>
              <h2 className="text-headline-small md:text-headline-medium font-bold text-foreground mb-5">
                {section.heading}
              </h2>
              <div className="space-y-4">
                {section.body.map((para, i) => <p key={i} className="text-body-large text-muted-foreground leading-relaxed">
                    {para}
                  </p>)}
              </div>
            </section>)}

          <section id="service-detail-pages">
            <h2 className="text-headline-small md:text-headline-medium font-bold text-foreground mb-5">
              The detail
            </h2>
            <ul className="space-y-3">
              <li className="leading-relaxed">
                <Link to="/design-services/ux-ui-design" className="text-md-sys-primary font-semibold underline underline-offset-2">Product design</Link>
                <span className="text-muted-foreground"> — research, interface design, design systems, and the front end that ships them.</span>
              </li>
              <li className="leading-relaxed">
                <Link to="/design-services/mobile-app-design" className="text-md-sys-primary font-semibold underline underline-offset-2">Mobile app design</Link>
                <span className="text-muted-foreground"> — phone-first products, and the states that make one feel finished.</span>
              </li>
              <li className="leading-relaxed">
                <Link to="/design-services/web-development" className="text-md-sys-primary font-semibold underline underline-offset-2">Web development</Link>
                <span className="text-muted-foreground"> — React front ends, the database behind them, and the deploy.</span>
              </li>
            </ul>
          </section>

          <section id="selected-work">
            <h2 className="text-headline-small md:text-headline-medium font-bold text-foreground mb-5">
              Selected work
            </h2>
            <ul className="space-y-3">
              <li className="leading-relaxed">
                <Link to="/project/herbalink" className="text-md-sys-primary font-semibold underline underline-offset-2">HerbaLink</Link>
                <span className="text-muted-foreground"> — designing credential trust into a practitioner marketplace.</span>
              </li>
              <li className="leading-relaxed">
                <Link to="/project/dae-search" className="text-md-sys-primary font-semibold underline underline-offset-2">DAE Search</Link>
                <span className="text-muted-foreground"> — enterprise data discovery, where research reframed the problem.</span>
              </li>
              <li className="leading-relaxed">
                <Link to="/project/business-management" className="text-md-sys-primary font-semibold underline underline-offset-2">Blue Sky</Link>
                <span className="text-muted-foreground"> — one system replacing a stack of disconnected tools.</span>
              </li>
            </ul>
          </section>
        </div>
      </SectionTransition>

      {/* Process Section */}
      <SectionTransition variant="fade" delay={0.2} className="py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 10
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
            <h2 className="text-headline-medium md:text-headline-large font-bold text-foreground mb-4">
              My Process
            </h2>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Four phases, each ending in something you can open
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{
            step: "01",
            title: "Discovery",
            desc: "Understanding your goals and users"
          }, {
            step: "02",
            title: "Strategy",
            desc: "Defining the roadmap and approach"
          }, {
            step: "03",
            title: "Design",
            desc: "Creating intuitive experiences"
          }, {
            step: "04",
            title: "Deliver",
            desc: "Launching and iterating together"
          }].map((item, index) => <motion.div key={item.step} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} className="text-center p-6 rounded-2xl bg-md-sys-surface-container/50 border border-md-sys-outline-variant/20 hover:border-md-sys-primary/30 transition-colors duration-300">
                <div className="text-display-small font-bold bg-gradient-to-r from-md-sys-primary to-md-sys-tertiary bg-clip-text text-transparent mb-3">
                  {item.step}
                </div>
                <h3 className="text-title-medium font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-body-small text-muted-foreground">{item.desc}</p>
              </motion.div>)}
          </div>
          
          {/* Design Services Sub-pages Links for SEO */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-body-medium text-muted-foreground mb-4">
              Explore specialized services:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link 
                to="/design-services/ux-ui-design" 
                className="px-4 py-2 rounded-full bg-md-sys-surface-container border border-md-sys-outline-variant/30 text-body-medium text-foreground hover:bg-md-sys-primary/10 hover:border-md-sys-primary/40 transition-colors duration-300"
              >
                UX/UI Design
              </Link>
              <Link 
                to="/design-services/mobile-app-design" 
                className="px-4 py-2 rounded-full bg-md-sys-surface-container border border-md-sys-outline-variant/30 text-body-medium text-foreground hover:bg-md-sys-primary/10 hover:border-md-sys-primary/40 transition-colors duration-300"
              >
                Mobile App Design
              </Link>
              <Link 
                to="/design-services/web-development" 
                className="px-4 py-2 rounded-full bg-md-sys-surface-container border border-md-sys-outline-variant/30 text-body-medium text-foreground hover:bg-md-sys-primary/10 hover:border-md-sys-primary/40 transition-colors duration-300"
              >
                Web Development
              </Link>
            </div>
          </motion.div>
        </div>
      </SectionTransition>

      {/* CTA Section */}
      <SectionTransition variant="fade" delay={0.3} className="py-20 md:py-28 px-4 bg-gradient-to-br from-md-sys-primary-container/30 via-background to-md-sys-tertiary-container/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-md-sys-tertiary-container/50 text-md-sys-on-tertiary-container text-label-medium font-medium">
              <Users className="h-4 w-4" />
              Let's Collaborate
            </div>
            
            <h2 className="text-headline-large md:text-display-small font-bold text-foreground">
              {SERVICES_CTA.title}
            </h2>
            
            <p className="text-body-large md:text-title-large text-muted-foreground max-w-2xl mx-auto">
              {SERVICES_CTA.description}
            </p>
            
            <motion.div initial={{
            opacity: 0,
            y: 10
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild variant="brand" size="lg">
                <Link to="/contact">
                  {SERVICES_CTA.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/#case-studies">
                  View My Work
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </SectionTransition>
    </div>;
};
export default ServicePageLayout;