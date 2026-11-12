import React from "react";
import { Navigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceLongform from "@/components/services/ServiceLongform";
import { services } from "@/data/servicesDetail";

/**
 * /services/:slug — the four long-form service pages brought over from
 * barsky.design. An unknown slug goes to the services index rather than
 * rendering an empty shell, so a stale link never becomes a soft 404.
 */
const ServiceLongformPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-grow pt-24">
        <ServiceLongform service={service} />
      </main>
      <Footer />
    </div>
  );
};

export default ServiceLongformPage;
