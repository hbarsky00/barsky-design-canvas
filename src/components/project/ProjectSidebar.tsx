
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
    <Card className="bg-gray-50 border-none">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-barsky-dark mb-4">Project Details</h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-barsky-blue mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-barsky-text">Duration</p>
              <p className="text-barsky-text/80">{duration}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <UserCircle className="h-5 w-5 text-barsky-blue mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-barsky-text">Client</p>
              <p className="text-barsky-text/80">{client}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Code className="h-5 w-5 text-barsky-blue mr-3 mt-0.5" />
            <div>
              <p className="font-medium text-barsky-text">Role</p>
              <p className="text-barsky-text/80">{role}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectSidebar;
