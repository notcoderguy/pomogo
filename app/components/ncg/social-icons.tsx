import type { ComponentProps } from "react";

import {
  FaDiscord,
  FaGithub,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiThreads, SiX } from "react-icons/si";

// Social media platform type
export type SocialPlatform
  = | "x"
    | "github"
    | "discord"
    | "threads"
    | "email";

// Icon mapping
const iconMap = {
  x: SiX,
  github: FaGithub,
  discord: FaDiscord,
  threads: SiThreads,
  email: MdEmail,
} as const;

// Brand colors for social platforms
export const socialColors = {
  x: "#000000",
  github: "#333333",
  discord: "#5865F2",
  threads: "#000000",
  email: "#EA4335",
} as const;

interface SocialIconProps extends ComponentProps<"svg"> {
  platform: SocialPlatform;
  size?: number | string;
  colored?: boolean;
}

/**
 * Social media icon component with support for many platforms
 *
 * @param platform - The social media platform
 * @param size - Icon size (default: 16)
 * @param colored - Whether to use brand colors (default: false)
 * @param className - Additional CSS classes
 */
export function SocialIcon({
  platform,
  size = 16,
  colored = false,
  className,
  style,
  ...props
}: SocialIconProps) {
  const IconComponent = iconMap[platform];

  if (!IconComponent) {
    console.warn(`Social icon for platform "${platform}" not found`);
    return null;
  }

  const iconStyle = {
    ...style,
    ...(colored && { color: socialColors[platform] }),
  };

  return (
    <IconComponent
      size={size}
      className={className}
      style={iconStyle}
      {...props}
    />
  );
}

// Pre-built social link component
interface SocialLinkProps {
  platform: SocialPlatform;
  href: string;
  size?: number | string;
  colored?: boolean;
  className?: string;
  iconClassName?: string;
  children?: React.ReactNode;
}

/**
 * Complete social media link component with icon
 */
export function SocialLink({
  platform,
  href,
  size = 16,
  colored = false,
  className = "",
  iconClassName = "",
  children,
}: SocialLinkProps) {
  const platformLabels = {
    x: "X",
    github: "GitHub",
    discord: "Discord",
    threads: "Threads",
    email: "Email",
  };

  return (
    <a
      href={href}
      target={platform === "email" ? "_self" : "_blank"}
      rel={platform === "email" ? undefined : "noopener noreferrer"}
      aria-label={platformLabels[platform]}
      className={className}
    >
      <SocialIcon
        platform={platform}
        size={size}
        colored={colored}
        className={iconClassName}
      />
      {children}
    </a>
  );
}

// Utility function to get all available platforms
export function getAvailablePlatforms(): SocialPlatform[] {
  return Object.keys(iconMap) as SocialPlatform[];
}

// Utility function to validate platform
export function isValidPlatform(platform: string): platform is SocialPlatform {
  return platform in iconMap;
}
