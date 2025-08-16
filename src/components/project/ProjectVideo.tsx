
import React from "react";
import EditableCaption from "../caption/EditableCaption";

interface ProjectVideoProps {
  src: string;
  title: string;
  caption?: string;
  className?: string;
  projectId?: string;
}

const ProjectVideo: React.FC<ProjectVideoProps> = ({
  src,
  title,
  caption,
  className = "",
  projectId
}) => {
  const isLoomVideo = src.includes('loom.com/share/');
  
  const getEmbedUrl = (url: string) => {
    if (isLoomVideo) {
      const videoId = url.split('loom.com/share/')[1]?.split('?')[0];
      return `https://www.loom.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <figure className={`relative overflow-hidden ${className}`}>
      {isLoomVideo ? (
        <iframe
          src={getEmbedUrl(src)}
          title={title}
          className="w-full h-80 md:h-96 lg:h-[32rem]"
          frameBorder="0"
          allowFullScreen
          style={{ 
            display: 'block',
            maxWidth: '100%'
          }}
        />
      ) : (
        <video
          src={src}
          title={title}
          className="w-full h-auto"
          controls
          style={{ 
            display: 'block',
            maxWidth: '100%'
          }}
        >
          Your browser does not support the video tag.
        </video>
      )}
      
      <EditableCaption
        imageSrc={src}
        initialCaption={caption || ''}
        projectId={projectId}
        variant="subtle"
        size="xs"
        alignment="center"
      />
    </figure>
  );
};

export default ProjectVideo;
