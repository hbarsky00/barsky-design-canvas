
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import EnhancedLogo from "../logo/EnhancedLogo";

const ProfileAvatar: React.FC = () => {
  return (
    <EnhancedLogo variant="header" size="md" showText={false} />
  );
};

export default ProfileAvatar;
