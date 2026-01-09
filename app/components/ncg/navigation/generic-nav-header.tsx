import { Link } from "react-router";

import { GenericLogo } from "@/components/ncg/generic-logo";
import { ThemeToggle } from "@/components/ncg/theme/theme-toggle";

interface GenericNavHeaderProps {
  actionButton?: React.ReactNode;
}

export function GenericNavHeader({ actionButton }: GenericNavHeaderProps) {
  return (
    <header className="bg-background/95 flex w-full items-center justify-between border-b px-4 py-3">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center">
          <GenericLogo size="md" />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle variant="dropdown" size="icon" />
        {actionButton}
      </div>
    </header>
  );
}
