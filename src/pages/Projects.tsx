
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AllProjects from "./AllProjects";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Projects = () => {
  usePageIndexing();
  
  return (
    <AllProjects />
  );
};

export default Projects;
