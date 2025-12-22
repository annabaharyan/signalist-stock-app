'use client';

import { useEffect, useRef } from 'react';

const UseTradingViewWidget = (scriptUrl: string, config: Record<string, unknown>, height = 600) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.dataset.loaded) return;

    containerRef.current.innerHTML =
      containerRef.current.innerHTML = `<div class="tradingview-widget-container__widget" style="width:100% height:${height}px"/>`;
    containerRef.current.insertAdjacentHTML(
      'beforeend',
      `<div class="tradingview-widget-container" style="height: ${height}px; width: 100%"><div class="tradingview-widget-container__widget" style="height: 100%; width: 100%"></div>`,
    );

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    script.innerHTML = JSON.stringify(config);
    containerRef.current.appendChild(script);
    containerRef.current.dataset.loaded = 'true';

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        delete containerRef.current.dataset.loaded;
      }
    };
  }, [scriptUrl, config, height]);

  return containerRef;
};

export default UseTradingViewWidget;
