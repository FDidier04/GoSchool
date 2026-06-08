// User types
export type UserRole = 'student' | 'teacher' | 'professional' | 'school_admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

// School types
export type SchoolSeries = 'A' | 'D' | 'C' | 'G2' | 'G3' | 'BG' | 'E' | 'F1' | 'F2' | 'F3' | 'F4';
export type SchoolType = 'primary' | 'secondary' | 'university' | 'training_center';

export interface School {
  id: string;
  name: string;
  description: string;
  type: SchoolType;
  series: SchoolSeries[];
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  phoneNumber: string;
  email: string;
  website?: string;
  principalName: string;
  foundedYear: number;
  studentCount: number;
  teacherCount: number;
  facilities: string[];
  averageRating: number;
  totalReviews: number;
  successRate: number; // In percentage
  admissionFee?: number;
  monthlyFee?: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Course types
export interface Course {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  series: SchoolSeries;
  level: string;
  duration: number; // In months
  price: number;
  startDate: Date;
  maxStudents: number;
  enrolledStudents: number;
  instructor: string;
  status: 'active' | 'inactive';
}

// Booking types
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  studentId: string;
  courseId: string;
  status: BookingStatus;
  paymentStatus: 'pending' | 'completed' | 'failed';
  amount: number;
  bookingDate: Date;
  startDate: Date;
  endDate: Date;
}

// Review types
export interface Review {
  id: string;
  userId: string;
  schoolId?: string;
  courseId?: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

// Geolocation types
export interface GeoLocation {
  latitude: number;
  longitude: number;
  address?: string;
  accuracy?: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Filter types
export interface SchoolFilters {
  distance?: number; // in km
  minRating?: number;
  maxPrice?: number;
  minPrice?: number;
  series?: SchoolSeries[];
  type?: SchoolType;
  location?: GeoLocation;
  searchTerm?: string;
}
