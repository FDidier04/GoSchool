'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';

export default function DashboardPage() {
  const router = useRouter();
  const user = useAppStore((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    useAppStore.setState({ user: null });
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Welcome, {user?.fullName || 'User'}!</h1>
              <p className="text-gray-600 mt-2">Role: {user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-danger text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Card 1: My Bookings */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">My Bookings</h3>
            <p className="text-3xl font-bold text-primary">0</p>
            <Link href="/dashboard/bookings" className="text-primary text-sm hover:underline mt-4 inline-block">
              View all →
            </Link>
          </div>

          {/* Card 2: Saved Schools */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Saved Schools</h3>
            <p className="text-3xl font-bold text-primary">0</p>
            <Link href="/dashboard/favorites" className="text-primary text-sm hover:underline mt-4 inline-block">
              View all →
            </Link>
          </div>

          {/* Card 3: Reviews */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">My Reviews</h3>
            <p className="text-3xl font-bold text-primary">0</p>
            <Link href="/dashboard/reviews" className="text-primary text-sm hover:underline mt-4 inline-block">
              View all →
            </Link>
          </div>

          {/* Card 4: Messages */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Messages</h3>
            <p className="text-3xl font-bold text-primary">0</p>
            <Link href="/dashboard/messages" className="text-primary text-sm hover:underline mt-4 inline-block">
              View all →
            </Link>
          </div>
        </div>

        {/* Recommended Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Schools</h2>
          <p className="text-gray-600">
            Schools will appear here based on your preferences and location.
          </p>
          <Link
            href="/schools"
            className="inline-block mt-6 bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition font-semibold"
          >
            Explore Schools
          </Link>
        </div>
      </div>
    </div>
  );
}
