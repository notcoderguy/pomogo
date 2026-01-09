import type { MetaArgs } from "react-router";

import { useTheme } from "@/hooks/use-theme";
import GenericLayout from "@/layout/generic";

export function meta(_args: MetaArgs) {
  return [
    { title: "Maintenance - NotCoderGuy" },
    { name: "description", content: "Welcome to NotCoderGuy's Maintenance Page!" },
  ];
}

export default function Home() {
  const { resolvedTheme } = useTheme();

  const illustrationSrc
    = resolvedTheme === "dark"
      ? "/images/generic-maintenance-dark.svg"
      : "/images/generic-maintenance-light.svg";

  return (
    <GenericLayout
      illustration={(
        <div className="mb-8 flex flex-col items-center">
          <img
            src={illustrationSrc}
            alt="Error Illustration"
            className="mx-auto h-64 w-auto"
          />
        </div>
      )}
    >

      <h1 className="mb-4 text-3xl font-bold">Website will be back soon!</h1>
      <p className="text-center text-lg text-foreground/70">
        Sorry for the inconvenience but I'm performing some maintenance at
        the moment. It'll be back online dunno when!
      </p>
    </GenericLayout>
  );
}
