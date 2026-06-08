'use client';

import React from 'react';
import { Review } from '@/types';

interface ReviewsListProps {
  reviews?: Review[];
  loading?: boolean;
  onLoadMore?: () => void;
}

export function ReviewsList({ reviews = [], loading = false }: ReviewsListProps) {
  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  if (reviews.length === 0 && !loading) {
    return (
      <div className="text-center py-8 text-gray-600">
        <p>No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-semibold text-gray-900">{review.title}</p>
              <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-1">{getRatingStars(review.rating)}</div>
          </div>
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}
      {loading && (
        <div className="flex justify-center py-4">
          <div className="spinner" />
        </div>
      )}
    </div>
  );
}
