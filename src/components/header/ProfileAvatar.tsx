
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { getOptimizedImageSrc, isMobileDevice } from "@/utils/imageOptimization";

const ProfileAvatar: React.FC = () => {
  return (
    <Link to="/" aria-label="Go to homepage">
      <Avatar className="h-12 w-12 border-2 border-barsky-blue">
        <AvatarImage 
          src="/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png"
          alt="Barsky Design professional profile photo" 
          loading="eager"
          fetchPriority="high"
          width="48"
          height="48"
        />
        <AvatarFallback>BD</AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default ProfileAvatar;
