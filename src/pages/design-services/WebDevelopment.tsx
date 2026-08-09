import React from "react";
import DesignServicePage from "@/components/services/DesignServicePage";
import { DESIGN_SERVICES } from "@/data/designServices";

const WebDevelopment = () => <DesignServicePage content={DESIGN_SERVICES["web-development"]} />;

export default WebDevelopment;
