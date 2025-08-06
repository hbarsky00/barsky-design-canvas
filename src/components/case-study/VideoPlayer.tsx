import React, { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  videoSrc: string;
  thumbnailSrc: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, thumbnailSrc, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // For now, we'll show a placeholder since we don't have actual video files
  // In production, this would handle actual video embedding (Loom, YouTube, etc.)
  
  return (
    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden shadow-2xl">
      {!isPlaying ? (
        <div className="relative w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20" />
          <Button
            onClick={() => setIsPlaying(true)}
            size="lg"
            className="relative z-10 bg-white/90 text-primary hover:bg-white hover:scale-105 transition-all duration-300"
          >
            <Play className="w-6 h-6 mr-2" />
            Play Demo
          </Button>
          <div className="absolute bottom-4 left-4 text-white font-medium">
            {title} Demo
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Video would play here</p>
            <p className="text-sm text-muted-foreground">
              In production: {videoSrc}
            </p>
            <Button 
              variant="outline" 
              onClick={() => setIsPlaying(false)}
              className="mt-4"
            >
              Back to Thumbnail
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;