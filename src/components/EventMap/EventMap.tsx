'use client';

import { useEffect, useRef } from 'react';
import type { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Button from '@/components/Button';
import { getLocationCoords } from '@/data/events';
import styles from './EventMap.module.scss';

interface EventMapProps {
  location: string;
}

// Purple teardrop pin (matches the Figma marker), rendered as a div icon so
// there are no external image assets and the colour is fully controllable.
const PIN_HTML = `
<svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 47C20 47 36 30.5 36 18C36 9.16 28.84 2 20 2C11.16 2 4 9.16 4 18C4 30.5 20 47 20 47Z"
        fill="#8355F8" stroke="#fff" stroke-width="2"/>
  <circle cx="20" cy="18" r="6.5" fill="#fff"/>
</svg>`;

export default function EventMap({ location }: EventMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const query = encodeURIComponent(location);
  // The button always opens the real Google Maps for this place.
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${query}`;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let map: LeafletMap | null = null;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    // Leaflet touches `window` at import time, so load it on the client only.
    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !containerRef.current) return;

      const coords = getLocationCoords(location);

      map = L.map(el, {
        center: coords,
        zoom: 12,
        scrollWheelZoom: false, // avoid hijacking page scroll
        attributionControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const icon = L.divIcon({
        html: PIN_HTML,
        className: styles.pinIcon,
        iconSize: [40, 48],
        iconAnchor: [20, 47], // tip of the pin sits on the location
        popupAnchor: [0, -44],
      });

      L.marker(coords, { icon, title: location }).addTo(map).bindPopup(location);

      // Re-measure once mounted (containers sized via CSS can start at 0px).
      timer = setTimeout(() => map?.invalidateSize(), 0);
    })();

    return () => {
      cancelled = true;
      clearTimeout(timer);
      map?.remove();
    };
  }, [location]);

  return (
    <section id="location" className={styles.section} aria-label="Event location">
      <div className={styles.map}>
        <div
          ref={containerRef}
          className={styles.canvas}
          role="img"
          aria-label={`Map showing ${location}`}
        />

        <div className={styles.card}>
          <span className={styles.cardLabel}>Location</span>
          <span className={styles.cardValue}>{location}</span>
          <Button variant="primary" href={mapsHref} className={styles.cardBtn}>
            Open in Maps
          </Button>
        </div>
      </div>
    </section>
  );
}
