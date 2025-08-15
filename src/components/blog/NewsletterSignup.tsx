
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSignup: React.FC = () => {
  return (
    <div className="bg-blue-50 rounded-lg p-6 my-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay Updated</h3>
      <p className="text-gray-600 mb-4">Get the latest insights on design, AI, and product development.</p>
      <div className="flex gap-2">
        <Input placeholder="Enter your email" className="flex-1" />
        <Button>Subscribe</Button>
      </div>
    </div>
  );
};

export default NewsletterSignup;
