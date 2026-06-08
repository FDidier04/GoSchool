'use client';

import React, { useState } from 'react';
import { SchoolFilters } from '@/types';

interface SearchFiltersProps {
  onFilterChange?: (filters: SchoolFilters) => void;
}

export function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SchoolFilters>({
    distance: 5,
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0,
  });

  const handleChange = (name: string, value: any) => {
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Filters</h3>

      {/* Distance */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Distance: <span className="text-primary font-bold">{filters.distance} km</span>
        </label>
        <input
          type="range"
          min="1"
          max="50"
          value={filters.distance}
          onChange={(e) => handleChange('distance', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', Number(e.target.value))}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Minimum Rating: <span className="text-primary">{filters.minRating}+</span>
        </label>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => handleChange('minRating', rating)}
              className={`px-3 py-2 rounded-lg font-semibold transition ${
                filters.minRating === rating
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {rating === 0 ? 'All' : `${rating}+`}
            </button>
          ))}
        </div>
      </div>

      {/* School Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">School Type</label>
        <div className="space-y-2">
          {['primary', 'secondary', 'university', 'training_center'].map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-700 capitalize">{type.replace('_', ' ')}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          setFilters({ distance: 5, minPrice: 0, maxPrice: 1000, minRating: 0 });
          onFilterChange?.({ distance: 5, minPrice: 0, maxPrice: 1000, minRating: 0 });
        }}
        className="w-full bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 transition font-semibold"
      >
        Reset Filters
      </button>
    </div>
  );
}
