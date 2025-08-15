
import React from "react";

interface AuthorBioProps {
  author?: string;
  bio?: string;
  image?: string;
}

const AuthorBio: React.FC<AuthorBioProps> = ({ 
  author = "Hiram Barsky",
  bio = "Product Designer & Gen AI Developer with 15+ years of experience creating AI-enhanced digital experiences.",
  image = "/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png"
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 my-8">
      <div className="flex items-start gap-4">
        <img 
          src={image} 
          alt={author}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">About {author}</h3>
          <p className="text-gray-700">{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthorBio;
