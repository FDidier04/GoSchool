'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { StatCard } from '../../components/StatCard';

export default function BookingsDashboard() {
  const [bookings] = useState([
    {
      id: '1',
      course: 'Mathématiques Avancées',
      school: 'École Excellencia',
      status: 'confirmed',
      date: '2026-07-15',
      amount: 50000,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Bookings</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Bookings" value="1" icon="📅" color="primary" />
          <StatCard title="Confirmed" value="1" icon="✓" color="success" />
          <StatCard title="Pending" value="0" icon="⏳" color="warning" />
          <StatCard title="Total Spent" value="50K FC" icon="💰" color="info" />
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Course</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">School</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{booking.course}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.school}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.date}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{booking.amount.toLocaleString()} FC</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/bookings/${booking.id}`} className="text-primary hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {bookings.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 mb-4">No bookings yet</p>
            <Link href="/schools" className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition">
              Explore Schools
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
