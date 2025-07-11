
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
      <div className="flex gap-3 flex-wrap">
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            variant="outline"
            className="
              hover:bg-primary hover:text-primary-foreground hover:border-primary
              border-2 border-muted-foreground/20 
              text-muted-foreground bg-background
              transition-all duration-300 ease-in-out
              hover:shadow-lg hover:scale-105 hover:-translate-y-0.5
              focus:outline-none focus:ring-2 focus:ring-primary/20
              [&_svg]:transition-all [&_svg]:duration-300
              active:scale-95
              !w-[45px] !h-[45px] !min-w-[45px] !min-h-[45px] !max-w-[45px] !max-h-[45px]
              !p-0 !rounded-full !aspect-square
            "
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
          className="
            hover:bg-primary hover:text-primary-foreground hover:border-primary
            border-2 border-muted-foreground/20 
            text-muted-foreground bg-background
            transition-all duration-300 ease-in-out
            hover:shadow-lg hover:scale-105 hover:-translate-y-0.5
            focus:outline-none focus:ring-2 focus:ring-primary/20
            [&_svg]:transition-all [&_svg]:duration-300
            active:scale-95
            !w-[45px] !h-[45px] !min-w-[45px] !min-h-[45px] !max-w-[45px] !max-h-[45px]
            !p-0 !rounded-full !aspect-square
          "
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
