'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { School, GeoLocation } from '@/types';

interface MapProps {
  schools: School[];
  userLocation?: GeoLocation;
  onSchoolSelect?: (school: School) => void;
  height?: string;
}

export function SchoolMap({
  schools,
  userLocation,
  onSchoolSelect,
  height = '500px',
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: userLocation ? [userLocation.longitude, userLocation.latitude] : [21.758, -4.038], // Congo center
      zoom: 11,
    });

    // Add user location marker
    if (userLocation) {
      new mapboxgl.Marker({ color: '#2563eb' })
        .setLngLat([userLocation.longitude, userLocation.latitude])
        .setPopup(new mapboxgl.Popup().setHTML('<div>Your Location</div>'))
        .addTo(map.current);
    }

    // Add school markers
    schools.forEach((school) => {
      const marker = new mapboxgl.Marker({ color: '#f59e0b' })
        .setLngLat([school.location.longitude, school.location.latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <div class="p-3">
              <h3 class="font-bold">${school.name}</h3>
              <p class="text-sm text-gray-600">${school.address}</p>
              <p class="text-sm">Rating: ${school.averageRating}/5</p>
            </div>
          `)
        )
        .addTo(map.current!);

      marker.getElement().addEventListener('click', () => {
        onSchoolSelect?.(school);
      });

      markersRef.current.push(marker);
    });

    // Cleanup
    return () => {
      markersRef.current.forEach((marker) => marker.remove());
    };
  }, [schools, userLocation, onSchoolSelect]);

  return (
    <div
      ref={mapContainer}
      className="rounded-lg overflow-hidden"
      style={{ height }}
    />
  );
}
