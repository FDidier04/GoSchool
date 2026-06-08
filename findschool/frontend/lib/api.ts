import axios, { AxiosInstance } from 'axios';
import { ApiResponse, School, PaginatedResponse, SchoolFilters } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests if available
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Schools
  async getSchools(
    filters?: SchoolFilters,
    page = 1,
    pageSize = 20
  ): Promise<ApiResponse<PaginatedResponse<School>>> {
    try {
      const response = await this.client.get<ApiResponse<PaginatedResponse<School>>>('/schools', {
        params: {
          ...filters,
          page,
          pageSize,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching schools:', error);
      throw error;
    }
  }

  async getSchoolById(id: string): Promise<ApiResponse<School>> {
    try {
      const response = await this.client.get<ApiResponse<School>>(`/schools/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching school:', error);
      throw error;
    }
  }

  async getSchoolsByLocation(
    latitude: number,
    longitude: number,
    radiusKm: number = 5
  ): Promise<ApiResponse<School[]>> {
    try {
      const response = await this.client.get<ApiResponse<School[]>>('/schools/nearby', {
        params: {
          latitude,
          longitude,
          radius: radiusKm,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching nearby schools:', error);
      throw error;
    }
  }

  // Authentication
  async login(email: string, password: string): Promise<ApiResponse<{ token: string }>> {
    try {
      const response = await this.client.post<ApiResponse<{ token: string }>>('/auth/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  async signup(data: {
    email: string;
    password: string;
    fullName: string;
    role: string;
  }): Promise<ApiResponse<{ token: string }>> {
    try {
      const response = await this.client.post<ApiResponse<{ token: string }>>('/auth/signup', data);
      return response.data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  // Generic request method
  async get<T>(endpoint: string): Promise<T> {
    return this.client.get<T>(endpoint).then((res) => res.data);
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.client.post<T>(endpoint, data).then((res) => res.data);
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.client.put<T>(endpoint, data).then((res) => res.data);
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.client.delete<T>(endpoint).then((res) => res.data);
  }
}

export const apiClient = new ApiClient();
