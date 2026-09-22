
import React from "react";
import { Calendar, UserCircle, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProjectSidebarProps {
  duration: string;
  client: string;
  role: string;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ duration, client, role }) => {
  return (
    <Card className="bg-gray-50 border-none w-full">
      <CardContent className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-barsky-dark mb-4">Project Details</h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-barsky-blue mr-3 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-barsky-text text-sm sm:text-base">Duration</p>
              <p className="text-barsky-text/80 text-sm sm:text-base break-words">{duration}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <UserCircle className="h-5 w-5 text-barsky-blue mr-3 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-barsky-text text-sm sm:text-base">Client</p>
              <p className="text-barsky-text/80 text-sm sm:text-base break-words">{client}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Code className="h-5 w-5 text-barsky-blue mr-3 mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-barsky-text text-sm sm:text-base">Role</p>
              <p className="text-barsky-text/80 text-sm sm:text-base break-words">{role}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectSidebar;
