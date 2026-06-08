'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import { School } from '@/types';

export default function SchoolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const loadSchool = async () => {
      try {
        const resolvedParams = await params;
        const response = await apiClient.getSchoolById(resolvedParams.id);
        if (response.success && response.data) {
          setSchool(response.data);
        }
      } catch (error) {
        console.error('Error loading school:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSchool();
  }, [params]);

  const handleBooking = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    // TODO: Implement booking API call
    alert('Booking feature coming soon!');
  };

  const handleSubmitReview = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    // TODO: Implement review API call
    alert('Review feature coming soon!');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner" />
      </div>
    );
  }

  if (!school) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">School not found</h1>
        <Link href="/schools" className="text-primary hover:underline mt-4 inline-block">
          Back to schools
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/schools" className="text-primary hover:underline mb-6 inline-block">
          ← Back to Schools
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Info */}
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{school.name}</h1>
              <p className="text-gray-600 text-lg mb-6">{school.description}</p>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <span className="text-3xl text-yellow-500">★</span>
                  <span className="text-2xl font-bold ml-2">{school.averageRating}/5</span>
                </div>
                <p className="text-gray-600">Based on {school.totalReviews} reviews</p>
              </div>

              {/* Contact */}
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Address:</strong> {school.address}
                </p>
                <p>
                  <strong>Phone:</strong>{' '}
                  <a href={`tel:${school.phoneNumber}`} className="text-primary hover:underline">
                    {school.phoneNumber}
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${school.email}`} className="text-primary hover:underline">
                    {school.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Booking Card */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-fit">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Info</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-primary">{school.successRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Students</p>
                  <p className="text-2xl font-bold text-primary">{school.studentCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Founded</p>
                  <p className="text-2xl font-bold text-primary">{school.foundedYear}</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowBookingForm(!showBookingForm)}
                  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition font-semibold"
                >
                  Book Now
                </button>
                <button className="w-full bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 transition font-semibold">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        {showBookingForm && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book a Course</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Course
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>General Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                </select>
              </div>
              <button
                onClick={handleBooking}
                className="w-full bg-success text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        )}

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Series & Facilities */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Series Offered</h2>
            <div className="flex flex-wrap gap-3">
              {school.series.map((s, i) => (
                <span
                  key={i}
                  className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold"
                >
                  Series {s}
                </span>
              ))}
            </div>
          </div>

          {/* Fees */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fees</h2>
            <div className="space-y-4">
              {school.admissionFee && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Admission:</span>
                  <span className="font-bold text-gray-900">${school.admissionFee}</span>
                </div>
              )}
              {school.monthlyFee && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly:</span>
                  <span className="font-bold text-gray-900">${school.monthlyFee}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Reviews</h2>

          {/* Add Review Form */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Leave a Review</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value={5}>★★★★★ Excellent</option>
                  <option value={4}>★★★★☆ Good</option>
                  <option value={3}>★★★☆☆ Average</option>
                  <option value={2}>★★☆☆☆ Poor</option>
                  <option value={1}>★☆☆☆☆ Very Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  placeholder="Share your experience..."
                />
              </div>
              <button
                onClick={handleSubmitReview}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition font-semibold"
              >
                Submit Review
              </button>
            </div>
          </div>

          {/* Sample Reviews */}
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900">John Doe</h4>
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <p className="text-gray-600">Excellent school with qualified teachers and great facilities!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
