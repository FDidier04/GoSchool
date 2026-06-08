'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiClient } from '@/lib/api';
import { Course } from '@/types';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    series: '',
    level: '',
    sortBy: 'price',
  });

  useEffect(() => {
    const loadCourses = async () => {
      try {
        // Mock loading courses (will integrate with API)
        await new Promise((resolve) => setTimeout(resolve, 500));
        setCourses([
          {
            id: '1',
            schoolId: '1',
            title: 'Mathématiques Avancées',
            description: 'Cours complet de mathématiques pour les classes supérieures',
            series: 'A' as any,
            level: 'Advanced',
            duration: 3,
            price: 50000,
            startDate: new Date('2026-07-01'),
            maxStudents: 30,
            enrolledStudents: 18,
            instructor: 'Prof. Kamayani',
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" text="Loading courses..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Available Courses</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Series
                  </label>
                  <select
                    value={filters.series}
                    onChange={(e) => setFilters({ ...filters, series: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">All Series</option>
                    <option value="A">Serie A</option>
                    <option value="D">Serie D</option>
                    <option value="C">Serie C</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level
                  </label>
                  <select
                    value={filters.level}
                    onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="price">Price</option>
                    <option value="date">Start Date</option>
                    <option value="popularity">Popularity</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Courses List */}
          <div className="lg:col-span-3">
            {courses.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-600">No courses found matching your filters.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {/* Course Info */}
                      <div className="md:col-span-2">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                        <p className="text-gray-600 mb-4">{course.description}</p>

                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>📚 {course.series}</span>
                          <span>👨‍🏫 {course.instructor}</span>
                          <span>⏱️ {course.duration} months</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="md:col-span-1">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600">Price</p>
                            <p className="text-2xl font-bold text-primary">{course.price.toLocaleString()} FC</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Students</p>
                            <p className="text-lg font-semibold">
                              {course.enrolledStudents}/{course.maxStudents}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="md:col-span-1 flex items-end">
                        <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition font-semibold">
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
