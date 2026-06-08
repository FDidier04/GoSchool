'use client';

import React, { useState } from 'react';
import { StatCard } from '../../components/StatCard';

export default function ReviewsDashboard() {
  const [reviews] = useState([
    {
      id: '1',
      school: 'École Excellencia',
      rating: 5,
      title: 'Excellent institution',
      comment: 'Très bon établissement avec des professeurs compétents et des installations modernes.',
      date: '2026-06-01',
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Reviews</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Reviews" value={reviews.length} icon="⭐" color="primary" />
          <StatCard title="Average Rating" value="4.5" icon="✨" color="success" trend={5} />
          <StatCard title="Schools Reviewed" value="1" icon="🏫" color="info" />
          <StatCard title="Helpful Votes" value="12" icon="👍" color="warning" />
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{review.school}</h3>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
              <p className="text-gray-700 mb-4">{review.comment}</p>

              <div className="flex gap-3">
                <button className="text-sm text-primary hover:underline">Edit</button>
                <button className="text-sm text-danger hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {reviews.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600">No reviews yet. Share your experience!</p>
          </div>
        )}
      </div>
    </div>
  );
}
