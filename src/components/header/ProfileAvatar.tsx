
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";


const ProfileAvatar: React.FC = () => {
  return (
    <Link to="/" aria-label="Go to homepage" className="flex items-center gap-3 group">
      <Avatar className="h-10 w-10 border-2 border-[hsl(var(--blue-vibrant))] transition-transform duration-300 group-hover:scale-105">
        <AvatarImage 
          src="/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png"
          alt="Hiram Barsky professional profile photo" 
          loading="eager"
          fetchPriority="high"
          width="40"
          height="40"
        />
        <AvatarFallback>HB</AvatarFallback>
      </Avatar>
      <ul className="hidden md:flex flex-col font-sans list-none">
        <li className="text-sm font-bold text-[hsl(var(--navy-primary))]">Hiram Barsky</li>
        <li className="text-xs text-[hsl(var(--blue-accent))]">Product Design + AI</li>
      </ul>
    </Link>
  );
};

export default ProfileAvatar;
