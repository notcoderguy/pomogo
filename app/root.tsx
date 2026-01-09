import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { ThemeProvider } from "@/components/ncg/theme/theme-provider";
import { useTheme } from "@/hooks/use-theme";

import "./app.css";

import GenericLayout from "@/layout/generic";

import type { Route } from "./+types/root";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="title" content="Maintenance - NotCoderGuy" />
        <meta name="description" content="Welcome to NotCoderGuy's Maintenance Page!" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Maintenance - NotCoderGuy" />
        <meta property="og:description" content="Welcome to NotCoderGuy's Maintenance Page!" />
        <meta property="og:image" content="banner.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Maintenance - NotCoderGuy" />
        <meta property="twitter:description" content="Welcome to NotCoderGuy's Maintenance Page!" />
        <meta property="twitter:image" content="banner.png" />

        <link rel="apple-touch-icon" sizes="57x57" href="apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
        <link rel="manifest" href="manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <Meta />
        <Links />
      </head>
      <body className="bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { resolvedTheme } = useTheme();
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details
      = error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  }
  else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  const illustrationSrc
    = resolvedTheme === "dark"
      ? "/images/generic-error-dark.svg"
      : "/images/generic-error-light.svg";

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
      actions={(
        <a
          href="/"
          className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-base font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          Go Home
        </a>
      )}
    >
      <h1 className="text-foreground mb-2 text-6xl font-bold">{message}</h1>
      <p className="text-muted-foreground mb-6 text-xl">{details}</p>
      {stack && (
        <div className="mt-8 w-full">
          <details className="bg-muted rounded-lg border p-4">
            <summary className="text-muted-foreground mb-2 cursor-pointer text-sm font-medium">
              Show Error Details
            </summary>
            <pre className="text-muted-foreground overflow-x-auto text-xs whitespace-pre-wrap">
              <code>{stack}</code>
            </pre>
          </details>
        </div>
      )}
    </GenericLayout>
  );
}
