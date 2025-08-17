"use client"; 

import { useEffect } from "react";

export default function GoogleReviews() {
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
    <div
      className="elfsight-app-246be2b0-ccd2-4726-a4a5-f7528d9290ec"
      data-elfsight-app-lazy
    ></div>
  );
}
