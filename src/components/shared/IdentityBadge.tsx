
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface IdentityBadgeProps {
  imageSrc: string;
  name: string;
  subtitle?: string;
  to?: string;
  size?: "sm" | "md" | "lg";
  subtitleStyle?: "text" | "pill";
  className?: string;
  ariaLabel?: string;
}

const sizeMap = {
  sm: {
    avatar: "h-9 w-9",
    gap: "gap-3",
    name: "text-[15px]",
    subtitle: "text-xs",
    imgWH: 36,
  },
  md: {
    avatar: "h-12 w-12",
    gap: "gap-3.5",
    name: "text-xl",
    subtitle: "text-sm",
    imgWH: 48,
  },
  lg: {
    avatar: "h-16 w-16 md:h-20 md:w-20",
    gap: "gap-4",
    name: "text-2xl md:text-3xl",
    subtitle: "text-base md:text-lg",
    imgWH: 80,
  },
} as const;

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() || "").join("");
  return initials || "";
}

const IdentityBadge: React.FC<IdentityBadgeProps> = ({
  imageSrc,
  name,
  subtitle,
  to,
  size = "md",
  subtitleStyle = "text",
  className,
  ariaLabel,
}) => {
  const s = sizeMap[size];
  const Wrapper: any = to ? Link : "div";

  console.log('🔍 IdentityBadge: Image URL being used:', imageSrc);
  console.log('🔍 IdentityBadge: Component size:', size);

  return (
    <Wrapper
      {...(to ? { to } : {})}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center",
        s.gap,
        "group select-none",
        className
      )}
    >
      <div
        className={cn(
          "relative rounded-full p-[2px] bg-gradient-to-tr",
          "from-blue-600 via-blue-500 to-slate-800",
          "dark:from-blue-400 dark:via-blue-300 dark:to-slate-600",
          "transition-transform duration-300 motion-safe:group-hover:scale-[1.03]"
        )}
      >
        <Avatar className={cn("rounded-full bg-background", s.avatar)}>
          <AvatarImage
            src={imageSrc}
            alt={`${name} profile photo`}
            loading="eager"
            width={s.imgWH}
            height={s.imgWH}
            onLoad={() => {
              console.log('✅ IdentityBadge: Image loaded successfully!', imageSrc);
            }}
            onError={(e) => {
              console.error('❌ IdentityBadge: Image failed to load!', imageSrc);
              console.error('❌ Error details:', e);
              // Test if the URL is accessible
              fetch(imageSrc, { method: 'HEAD', mode: 'no-cors' })
                .then(() => console.log('🌐 URL is accessible via fetch'))
                .catch(err => console.error('🌐 URL fetch failed:', err));
            }}
          />
          <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col font-sans whitespace-nowrap">
        <span
          className={cn(
            s.name,
            "font-semibold tracking-tight leading-none",
            "text-slate-800 dark:text-slate-100"
          )}
        >
          {name}
        </span>

        {subtitle && (
          subtitleStyle === "pill" ? (
            <span
              className={cn(
                s.subtitle,
                "inline-flex items-center rounded-full mt-1 px-2.5 py-0.5",
                "border border-blue-500/25",
                "bg-blue-500/10 text-blue-600 dark:text-blue-400"
              )}
            >
              {subtitle}
            </span>
          ) : (
            <span
              className={cn(
                s.subtitle,
                "mt-0.5 text-blue-600 dark:text-blue-400 opacity-90"
              )}
            >
              {subtitle}
            </span>
          )
        )}
      </div>
    </Wrapper>
  );
};

export default IdentityBadge;
