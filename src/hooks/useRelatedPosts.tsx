
import { useState, useEffect } from "react";
import { blogPosts, BlogPost } from "@/data/blogData";

/**
 * A custom hook that retrieves related blog posts based on matching tags
 * @param currentPostId - The ID of the current post to exclude from related posts
 * @param currentPostTags - The tags of the current post to match against
 * @param limit - Maximum number of related posts to return (default: 3)
 * @returns An array of related blog posts
 */
export function useRelatedPosts(
  currentPostId: string,
  currentPostTags: string[],
  limit: number = 3
): BlogPost[] {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Find related posts by matching tags
    const related = blogPosts
      .filter(
        post =>
          post.id !== currentPostId &&
          post.tags.some(tag => currentPostTags.includes(tag))
      )
      .slice(0, limit);

    setRelatedPosts(related);
  }, [currentPostId, currentPostTags, limit]);

  return relatedPosts;
}
