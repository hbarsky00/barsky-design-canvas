
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import SectionHeader from "@/components/shared/SectionHeader";
const BioSection: React.FC = () => {

  return (
    <section 
      id="bio-section"
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 relative
                 pt-safe-top pb-safe-bottom"
      tabIndex={-1}
    >
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Card className="p-8 lg:p-12 bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <div className="space-y-8">
              {/* Header with badge */}
              <SectionHeader
                eyebrow="About Me"
                title="Product Designer & AI Developer"
                className="text-center"
              />

              {/* Bio content.
                  Rewritten 2026-11-12. The previous version opened with "I help
                  early-stage startups transform complex problems into intuitive
                  user experiences that drive real business results" and closed
                  "What I Bring" with "build prototypes that validate concepts" —
                  which told a founder, directly underneath five products they can
                  open and use, that the work stops at a prototype. It also carried
                  an undated "Currently specializing in…", the same kind of
                  time-stamped claim that left the section above this one fourteen
                  months stale. Every sentence here is checkable against the rest
                  of the page. */}
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p className="text-xl text-center font-medium text-gray-800">
                  One person does all of it. The research, the interface, the React
                  front end, the database and the launch — so there is no handoff
                  for the idea to get lost in.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div className="text-center">
                    <h3 className="font-semibold text-lg text-gray-900 mb-3">How a project starts</h3>
                    <p className="text-center">
                      With the thing that is actually costing you something — a
                      flow people abandon, a feature nobody found, an internal tool
                      your team works around. Not a redesign looking for a reason.
                    </p>
                  </div>

                  <div className="text-center">
                    <h3 className="font-semibold text-lg text-gray-900 mb-3">How it ends</h3>
                    <p className="text-center">
                      With software your users can open. 15+ years across fintech,
                      healthcare and pharma, and the production React and database
                      work to get it live — not a file for someone else to build.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50/50 rounded-lg p-6 mt-8 text-center">
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">Where AI fits</h3>
                  <p className="text-center">
                    It is how I build fast enough for one person to ship a whole
                    product. When the AI <em>is</em> the product, how it behaves
                    when it is guessing — and when it is confidently wrong — is a
                    design decision, and I own it rather than leaving it to the
                    model.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

    </section>
  );
};

export default BioSection;
