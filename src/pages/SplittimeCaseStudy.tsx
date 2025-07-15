import { Helmet } from "react-helmet-async";
import splittimeOgImage from "@/assets/social/splittime-og.jpg";

// Add this right after your imports, before the component
<Helmet>
  <title>Splittime Co-Parenting App UX Design Case Study | Barsky Design</title>
  <meta name="description" content="Co-parenting coordination app UX design. Simplified scheduling, communication, and expense tracking for divorced parents. Reduced conflict through intuitive design and AI-powered scheduling." />
  <meta property="og:title" content="Splittime Co-Parenting App UX Design Case Study" />
  <meta property="og:description" content="Co-parenting coordination app UX design. Simplified scheduling, communication, and expense tracking for divorced parents. Reduced conflict through intuitive design and AI-powered scheduling." />
  <meta property="og:image" content={`https://barskydesign.pro${splittimeOgImage}`} />
  <meta property="og:url" content="https://barskydesign.pro/case-studies/splittime-coparenting-app-design" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Splittime Co-Parenting App UX Design Case Study" />
  <meta name="twitter:description" content="Co-parenting coordination app UX design. Simplified scheduling, communication, and expense tracking for divorced parents. Reduced conflict through intuitive design and AI-powered scheduling." />
  <meta name="twitter:image" content={`https://barskydesign.pro${splittimeOgImage}`} />
</Helmet>

<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Splittime Co-Parenting App UX Design Case Study",
  "description": "Co-parenting coordination app UX design. Simplified scheduling, communication, and expense tracking for divorced parents.",
  "author": {
    "@type": "Person",
    "name": "Hiram Barsky"
  },
  "datePublished": "2024",
  "url": "https://barskydesign.pro/case-studies/splittime-coparenting-app-design"
})}
</script>


const SplittimeCaseStudy: React.FC = () => {
  const {
    viewerOpen,
    currentImage,
    currentZoom,
    openImageViewer,
    closeImageViewer,
    zoomIn,
    zoomOut,
    resetZoom,
    handleImageKeypress
  } = useSplittimeImageViewer();
  return <>
        <DynamicSeo 
          type="project"
          title="Splittime: Co-Parenting App Case Study | Hiram Barsky"
          description="Transforming co-parenting from conflict to collaboration. AI-powered features that reduce communication stress and improve family coordination."
          image={`https://barskydesign.pro${splittimeOgImage}`}
          projectName="Splittime"
          results={["50% reduction in onboarding time", "40% fewer support tickets", "Conflict-reduction through design"]}
          technologies={["React Native", "Family Tech", "Communication Platform", "Scheduling AI"]}
          path="/project/splittime"
        />
      
      <div className="coparenting-platform-showcase min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50">
        <Header />
        
        {/* Back Navigation */}
        <div className="pt-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link to="/projects" className="inline-flex items-center text-blue-700 hover:text-blue-900 transition-colors font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </motion.div>
        </div>
        
        <main className="flex-grow">
          <SplittimeHero 
            onImageClick={openImageViewer}
            onImageKeypress={handleImageKeypress}
          />

          <SplittimeConflictAnalysis 
            onImageClick={openImageViewer}
            onImageKeypress={handleImageKeypress}
          />

          <SplittimeCoordinationSolution 
            onImageClick={openImageViewer}
            onImageKeypress={handleImageKeypress}
          />

          <SplittimeFamilyInterface 
            onImageClick={openImageViewer}
            onImageKeypress={handleImageKeypress}
          />

          <SplittimeImpactMetrics 
            onImageClick={openImageViewer}
            onImageKeypress={handleImageKeypress}
          />

          <RelatedProjects currentProjectId="splittime" />

          <SplittimeCallToAction />
        </main>
        
        <SplittimeImageViewer
          viewerOpen={viewerOpen}
          currentImage={currentImage}
          currentZoom={currentZoom}
          onClose={closeImageViewer}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onResetZoom={resetZoom}
        />
        
        <Footer />
      </div>
    </>;
};
export default SplittimeCaseStudy;