"use client";

import { useEffect } from "react";

export default function InstagramFeed() {
  useEffect(() => {
    const scriptId = "elfsight-platform-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      script.id = scriptId;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="elfsight-app-97099353-5103-4533-ad20-244fcb927a37" data-elfsight-app-lazy></div>
  );
}
