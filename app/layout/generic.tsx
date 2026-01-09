import type { ReactNode } from "react";

import { GenericNavFooter } from "@/components/ncg/navigation/generic-nav-footer";
import { GenericNavHeader } from "@/components/ncg/navigation/generic-nav-header";

interface GenericLayoutProps {
  children: ReactNode;
  illustration?: ReactNode;
  actions?: ReactNode;
  headerActionButton?: ReactNode;
}

export default function GenericLayout({
  children,
  illustration,
  actions,
  headerActionButton,
}: GenericLayoutProps) {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <GenericNavHeader actionButton={headerActionButton} />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <div className="flex min-h-[400px] w-full max-w-2xl flex-col items-center p-8 md:p-12">
          {illustration && <div className="mb-8">{illustration}</div>}
          <div className="w-full text-center">{children}</div>
          {actions && <div className="mt-8">{actions}</div>}
        </div>
      </main>
      <GenericNavFooter />
    </div>
  );
}
