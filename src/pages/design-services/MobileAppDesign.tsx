import React from "react";
import DesignServicePage from "@/components/services/DesignServicePage";
import { DESIGN_SERVICES } from "@/data/designServices";

const MobileAppDesign = () => <DesignServicePage content={DESIGN_SERVICES["mobile-app-design"]} />;

export default MobileAppDesign;
