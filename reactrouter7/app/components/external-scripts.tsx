import { useEffect, useRef } from 'react';

interface ExternalScript {
  src: string,
  onlyProd?: boolean
  callback?: () => void,
  options: {
    id?: string,
    async?: boolean,
    crossOrigin?: string
  }
}
export function ExternalScript(props: ExternalScript) {
  const { src, onlyProd, callback, options = {} } = props
  const didRun = useRef(false)

  useEffect(() => {
    if (onlyProd && !import.meta.env.PROD) { return; }
    if (typeof document === "undefined") { return; }
    if (didRun.current) { return; }
    didRun.current = true;

    // Optionally allow the caller to pass a custom id; otherwise, generate one from the src
    const scriptId = options.id || `script-${btoa(src)}`;
    let script = document.getElementById(scriptId);
    if (script) { return; }

    // Create and configure the script element
    script = document.createElement('script');
    script.id = scriptId;
    script.src = src;
    script.async = options.async !== undefined ? options.async : true;
    if (options.crossOrigin) {
      script.crossOrigin = options.crossOrigin;
    }
    document.head.appendChild(script);
    if (callback) { callback(); }

  }, [props]);
  return null;
}
