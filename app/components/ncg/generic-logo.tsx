import { useTheme } from "@/hooks/use-theme";

interface GenericLogoProps {
  /** Size of the logo */
  size?: "sm" | "md" | "lg" | "xl";
  /** Whether to show the text alongside the logo */
  showText?: boolean;
  /** Custom className for the container */
  className?: string;
  /** Custom className for the logo image */
  logoClassName?: string;
  /** Custom className for the text */
  textClassName?: string;
}

const sizeMap = {
  sm: { logo: "h-6 w-6", text: "text-sm" },
  md: { logo: "h-8 w-8", text: "text-base" },
  lg: { logo: "h-10 w-10", text: "text-xl" },
  xl: { logo: "h-12 w-12", text: "text-2xl" },
};

/**
 * Theme-aware Generic logo component
 * Automatically switches between light and dark logos based on the current theme
 * Supports light, dark, and system themes with proper hydration handling
 */
export function GenericLogo({
  size = "md",
  showText = false,
  className = "",
  logoClassName = "",
  textClassName = "",
}: GenericLogoProps) {
  const { resolvedTheme } = useTheme();

  // Determine which logo to use based on resolved theme
  // resolvedTheme handles system theme detection automatically
  // For dark theme/background, use light (white) logo for contrast
  // For light theme/background, use dark (black) logo for contrast
  const isDark = resolvedTheme === "dark";
  const logoSrc = isDark
    ? "/logos/pomogo-white-logo.svg"
    : "/logos/pomogo-black-logo.svg";

  const logoAlt = `NotCoderGuy ${isDark ? "white" : "black"} logo`;

  const sizes = sizeMap[size];

  // During hydration, resolvedTheme might be undefined, so provide fallback
  if (!resolvedTheme) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div
          className={`${sizes.logo} bg-muted animate-pulse rounded-lg ${logoClassName}`}
        />
        {showText && (
          <span
            className={`text-foreground font-bold ${sizes.text} ${textClassName}`}
          >
            pomogo
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <img
        src={logoSrc}
        alt={logoAlt}
        className={`${sizes.logo} object-contain ${logoClassName}`}
        loading="lazy"
      />
      {showText && (
        <span
          className={`text-foreground font-bold ${sizes.text} ${textClassName}`}
        >
          pomogo
        </span>
      )}
    </div>
  );
}

/**
 * Simple logo icon without text - useful for smaller spaces
 */
export function GenericIcon({
  size = "md",
  className = "",
}: Pick<GenericLogoProps, "size" | "className">) {
  return <GenericLogo size={size} showText={false} className={className} />;
}

/**
 * Logo with fallback to the colored background version if images fail to load
 * Handles system theme changes and hydration gracefully
 */
export function GenericLogoWithFallback({
  size = "md",
  showText = true,
  className = "",
  logoClassName = "",
  textClassName = "",
}: GenericLogoProps) {
  const { resolvedTheme } = useTheme();

  // resolvedTheme handles system theme detection automatically
  const isDark = resolvedTheme === "dark";
  const logoSrc = isDark
    ? "/logos/pomogo-white-logo.svg"
    : "/logos/pomogo-black-logo.svg";

  const sizes = sizeMap[size];

  // During hydration, show loading state
  if (!resolvedTheme) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div
          className={`${sizes.logo} bg-primary/20 animate-pulse rounded-lg ${logoClassName}`}
        />
        {showText && (
          <span
            className={`text-foreground font-bold ${sizes.text} ${textClassName}`}
          >
            pomogo
          </span>
        )}
      </div>
    );
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Fallback to the colored background version
    const target = e.currentTarget;
    target.classList.add("hidden");

    // Show fallback div
    const fallback = target.nextElementSibling as HTMLElement;
    if (fallback) {
      fallback.classList.remove("hidden");
      fallback.classList.add("flex");
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Logo image */}
      <img
        src={logoSrc}
        alt="NotCoderGuy logo"
        className={`${sizes.logo} object-contain ${logoClassName}`}
        onError={handleImageError}
        loading="lazy"
      />

      {/* Fallback colored background logo */}
      <div
        className={`${sizes.logo} bg-primary text-primary-foreground hidden items-center justify-center rounded-lg font-bold ${logoClassName}`}
      >
        <span className="text-sm">pomogo</span>
      </div>

      {showText && (
        <span
          className={`text-foreground font-bold ${sizes.text} ${textClassName}`}
        >
          pomogo
        </span>
      )}
    </div>
  );
}
