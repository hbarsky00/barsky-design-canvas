
import React from "react";
import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Linkedin, AtSign, Link, Share2, MessageCircle, Edit3 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ShareButtonsProps {
  title: string;
  summary: string;
  url: string;
  hashtags?: string[];
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, summary, url, hashtags = [] }) => {
  const { toast } = useToast();
  const hashtagString = hashtags.join(",");
  
  const shareLinks = [
    {
      name: "Twitter",
      icon: <Twitter className="h-4 w-4" />,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&hashtags=${hashtagString}`,
    },
    {
      name: "Facebook", 
      icon: <Facebook className="h-4 w-4" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-4 w-4" />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}`,
    },
    {
      name: "Threads",
      icon: <MessageCircle className="h-4 w-4" />,
      href: `https://threads.net/intent/post?text=${encodeURIComponent(`${title}\n\n${summary}\n\n${url}`)}`,
    },
    {
      name: "Medium",
      icon: <Edit3 className="h-4 w-4" />,
      href: `https://medium.com/new-story?title=${encodeURIComponent(title)}&tags=${encodeURIComponent(hashtags.slice(0, 5).join(','))}&canonicalUrl=${encodeURIComponent(url)}`,
    },
    {
      name: "Email",
      icon: <AtSign className="h-4 w-4" />,
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${summary}\n\nRead more: ${url}`)}`,
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied",
      description: "The blog post URL has been copied to your clipboard.",
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <span className="text-barsky-text-light text-sm flex items-center [&_svg]:stroke-2 [&_svg]:stroke-current [&_svg]:fill-none">
        <Share2 className="h-4 w-4 mr-2" /> Share:
      </span>
      <div className="flex gap-2 flex-wrap">
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            variant="outline"
            className="share-button"
            onClick={() => window.open(link.href, "_blank", "noreferrer,noopener,width=600,height=400")}
            aria-label={`Share on ${link.name}`}
            title={`Share on ${link.name}`}
          >
            {link.icon}
            <span className="sr-only">{link.name}</span>
          </Button>
        ))}
        <Button
          variant="outline"
          className="share-button"
          onClick={copyToClipboard}
          aria-label="Copy link"
          title="Copy link"
        >
          <Link className="h-4 w-4" />
          <span className="sr-only">Copy link</span>
        </Button>
      </div>
    </div>
  );
};

export default ShareButtons;
