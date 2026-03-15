import { useEffect } from "react";

/**
 * Prosty hook do wstrzykiwania JSON-LD (Schema.org) do <head>.
 * Zapobiega duplikatom dzięki stałemu id per typ strony.
 */
export function useStructuredData(id, data) {
  useEffect(() => {
    if (!data || !id) return;

    const scriptId = `ld-json-${id}`;
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = scriptId;
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);

    return () => {
      // Pozostawiamy schema w head (przy SPA to ok), więc bez cleanupu.
    };
  }, [id, data]);
}

