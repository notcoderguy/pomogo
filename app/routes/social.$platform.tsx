import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

// Social media URLs mapping
const SOCIAL_URLS = {
  x: "https://x.com/notcoderguy",
  github: "https://github.com/notcoderguy",
  discord: "http://discordapp.com/users/501102080870580224",
  threads: "https://threads.net/@notcoderguy",
  email: "mailto:me@notcoderguy.com",
  // Add more platforms as needed
} as const;

export default function SocialRedirect() {
  const { platform } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const normalizedPlatform = platform?.toLowerCase();

    if (!normalizedPlatform || !(normalizedPlatform in SOCIAL_URLS)) {
      // If platform is not found, redirect to home page
      navigate("/", { replace: true });
      return;
    }

    const socialUrl
      = SOCIAL_URLS[normalizedPlatform as keyof typeof SOCIAL_URLS];

    // Log the redirect for analytics (client-side)
    // console.log(`Social redirect: ${normalizedPlatform} -> ${socialUrl}`, {
    //   timestamp: new Date().toISOString(),
    //   userAgent: navigator.userAgent,
    //   referrer: document.referrer,
    // });

    // Redirect to the actual social media profile
    window.location.replace(socialUrl);
  }, [platform, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">Redirecting...</h1>
        <p className="text-muted-foreground">
          You should be redirected automatically. If not, please check the URL.
        </p>
      </div>
    </div>
  );
}
