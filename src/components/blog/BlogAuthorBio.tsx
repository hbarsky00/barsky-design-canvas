
import React from "react";

interface BlogAuthorBioProps {
  author: string;
}

const BlogAuthorBio: React.FC<BlogAuthorBioProps> = ({ author }) => {
  return (
    <div className="bg-slate-50 dark:bg-gray-800 rounded-lg p-8 mb-16">
      <h2 className="text-xl font-semibold mb-4 text-barsky-dark dark:text-white">About the Author</h2>
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-4">
          <div className="w-16 h-16 rounded-full bg-barsky-blue flex items-center justify-center text-white text-xl font-bold">
            BD
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-barsky-dark dark:text-white">{author}</h3>
          <p className="text-barsky-text dark:text-slate-300 mt-1">
            Product Designer and Developer with over a decade of experience creating digital products that solve real problems.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogAuthorBio;
