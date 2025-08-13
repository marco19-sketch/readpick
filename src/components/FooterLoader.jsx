// FooterLoader.jsx
import { useState, useEffect } from "react";

export default function FooterLoader() {
  const [FooterComponent, setFooterComponent] = useState(null);

  useEffect(() => {
    // Load footer after the browser is idle
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        import("./Footer").then(mod => {
          setFooterComponent(() => mod.default);
        });
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        import("./Footer").then(mod => {
          setFooterComponent(() => mod.default);
        });
      }, 1000);
    }
  }, []);

  return FooterComponent ? <FooterComponent /> : null;
}
