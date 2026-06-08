'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { School } from '@/types';
import { formatDistance } from '@/lib/geolocation';

interface SchoolCardProps {
  school: School;
  distance?: number;
  onSelect?: (school: School) => void;
}

export function SchoolCard({ school, distance, onSelect }: SchoolCardProps) {
  return (
    <div
      onClick={() => onSelect?.(school)}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden"
    >
      {/* Image */}
      {school.image && (
        <div className="relative w-full h-48 bg-gray-200">
          <Image
            src={school.image}
            alt={school.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900">{school.name}</h3>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="font-semibold">{school.averageRating.toFixed(1)}</span>
          </div>
        </div>

        {/* Meta */}
        <p className="text-sm text-gray-600 mb-3">{school.address}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3 text-center text-sm">
          <div>
            <p className="font-semibold text-primary">{school.studentCount}</p>
            <p className="text-gray-600 text-xs">Students</p>
          </div>
          <div>
            <p className="font-semibold text-primary">{school.successRate}%</p>
            <p className="text-gray-600 text-xs">Success Rate</p>
          </div>
          <div>
            <p className="font-semibold text-primary">{school.totalReviews}</p>
            <p className="text-gray-600 text-xs">Reviews</p>
          </div>
        </div>

        {/* Distance */}
        {distance !== undefined && (
          <p className="text-sm text-primary font-semibold mb-3">
            {formatDistance(distance)}
          </p>
        )}

        {/* CTA */}
        <Link
          href={`/schools/${school.id}`}
          className="block w-full bg-primary text-white text-center py-2 rounded-lg hover:bg-secondary transition font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
