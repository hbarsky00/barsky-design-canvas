
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileIcon, Figma, Layout } from "lucide-react";

interface DesignFileProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  downloadUrl: string;
  fileType: string;
  fileSize: string;
}

const DesignFile: React.FC<DesignFileProps> = ({
  title,
  description,
  icon,
  downloadUrl,
  fileType,
  fileSize,
}) => {
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader>
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-barsky-blue/10 mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground">
          <FileIcon className="mr-2 h-4 w-4" />
          <span>{fileType}</span>
          <span className="ml-auto">{fileSize}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => window.open(downloadUrl, "_blank")}>
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
      </CardFooter>
    </Card>
  );
};

const DesignFileDownload: React.FC = () => {
  const designFiles = [
    {
      title: "UI Kit",
      description: "Complete UI component library with all design elements",
      icon: <Layout className="h-6 w-6 text-barsky-blue" />,
      downloadUrl: "#",
      fileType: "Figma File",
      fileSize: "24 MB",
    },
    {
      title: "Design System",
      description: "Comprehensive design system with color palette and typography",
      icon: <Figma className="h-6 w-6 text-barsky-blue" />,
      downloadUrl: "#",
      fileType: "Figma File",
      fileSize: "18 MB",
    },
    {
      title: "Wireframe Kit",
      description: "Low-fidelity wireframe components for quick prototyping",
      icon: <Layout className="h-6 w-6 text-barsky-blue" />,
      downloadUrl: "#",
      fileType: "Figma File",
      fileSize: "12 MB",
    },
  ];

  return (
    <section className="py-12 bg-barsky-bg-white dark:bg-gray-900">
      <div className="section-container">
        <h2 className="text-2xl font-bold mb-8 dark:text-white">Design Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {designFiles.map((file, index) => (
            <DesignFile key={index} {...file} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignFileDownload;
