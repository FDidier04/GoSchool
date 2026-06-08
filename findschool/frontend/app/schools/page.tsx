'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SchoolCard } from '../components/SchoolCard';
import { SchoolMap } from '../components/SchoolMap';
import { getUserLocation, calculateDistance } from '@/lib/geolocation';
import { apiClient } from '@/lib/api';
import { School, GeoLocation } from '@/types';

export default function SchoolsPage() {
  const searchParams = useSearchParams();
  const [schools, setSchools] = useState<School[]>([]);
  const [userLocation, setUserLocation] = useState<GeoLocation | null>(null);
  const [distance, setDistance] = useState<number>(5);
  const [loading, setLoading] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  useEffect(() => {
    const initPage = async () => {
      // Get user location
      const location = await getUserLocation();
      if (location) {
        setUserLocation(location);
      }
      setLoading(false);
    };

    initPage();
  }, []);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        if (userLocation) {
          // Fetch schools near user
          const response = await apiClient.getSchoolsByLocation(
            userLocation.latitude,
            userLocation.longitude,
            distance
          );
          if (response.success && response.data) {
            setSchools(response.data);
          }
        } else {
          // Fetch all schools
          const response = await apiClient.getSchools({}, 1, 50);
          if (response.success && response.data) {
            setSchools(response.data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    };

    fetchSchools();
  }, [userLocation, distance]);

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
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Find Schools</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <SchoolMap
              schools={schools}
              userLocation={userLocation || undefined}
              onSchoolSelect={setSelectedSchool}
              height="600px"
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4 text-gray-900">Filters</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance: {distance} km
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {/* School List */}
            <div className="space-y-4">
              {schools.map((school) => (
                <SchoolCard
                  key={school.id}
                  school={school}
                  distance={
                    userLocation
                      ? calculateDistance(
                          userLocation.latitude,
                          userLocation.longitude,
                          school.location.latitude,
                          school.location.longitude
                        )
                      : undefined
                  }
                  onSelect={setSelectedSchool}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Selected School Detail */}
        {selectedSchool && (
          <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  {selectedSchool.name}
                </h2>
                <p className="text-gray-600 mb-4">{selectedSchool.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Students</p>
                    <p className="text-2xl font-bold text-primary">
                      {selectedSchool.studentCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-primary">
                      {selectedSchool.successRate}%
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="mb-4">
                    <strong>Address:</strong> {selectedSchool.address}
                  </p>
                  <p className="mb-4">
                    <strong>Phone:</strong> {selectedSchool.phoneNumber}
                  </p>
                  <p className="mb-4">
                    <strong>Email:</strong> {selectedSchool.email}
                  </p>
                  <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
