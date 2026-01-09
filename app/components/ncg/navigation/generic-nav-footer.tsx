import { SocialIcon } from "@/components/ncg/social-icons";
import { ThemeToggle } from "@/components/ncg/theme/theme-toggle";
import { Button } from "@/components/ui/button";

export function GenericNavFooter() {
  const currentYear = new Date().getFullYear();
  const socials = [
    { href: "/social/x", label: "X", platform: "x" },
    { href: "/social/github", label: "GitHub", platform: "github" },
    { href: "/social/discord", label: "Discord", platform: "discord" },
    { href: "/social/threads", label: "Threads", platform: "threads" },
    { href: "/social/email", label: "Email", platform: "email" },
  ];

  return (
    <footer className="bg-background/95 flex w-full flex-col items-center justify-between gap-4 border-t px-4 py-3 md:flex-row">
      <div className="flex items-center gap-4">
        <span className="text-muted-foreground text-sm">
          ©
          {" "}
          {currentYear}
          {" "}
          NotCoderGuy. All rights reserved.
        </span>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle variant="dropdown" size="icon" />
        {socials.map(({ href, label, platform }) => (
          <Button
            key={platform}
            asChild
            variant="outline"
            size="icon"
            className="h-9 w-9"
          >
            <a
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon platform={platform as any} size={16} />
            </a>
          </Button>
        ))}
      </div>
    </footer>
  );
}
