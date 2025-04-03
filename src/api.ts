import axios, { AxiosResponse } from 'axios';

interface AuthResponse {
  success: boolean;
  message?: string;
}

interface Comment {
  user: string;
  text: string;
}

interface Cafe {
  id: number;
  name: string;
  address: string;
  description: string;
  facilities: Record<string, boolean | string>;
  summaries: Record<string, boolean | string>;
  comments: Comment[];
  photos: string[];
  likes: number;
}

type AddCafeData = FormData;
interface UpdateCafeData {
  name?: string;
  address?: string;
  description?: string;
  facilities?: Record<string, boolean | string>;
  summaries?: Record<string, boolean | string>;
  photos?: string[];
}

// Admin and API clients
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const adminClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const getCafes = async (filters?: Record<string, string>) => {
  const params = filters ? { params: filters } : {};
  return apiClient.get('/api/cafes', params);
};

export const getCafeById = (
  id: number
): Promise<AxiosResponse<{ success: boolean; data: Cafe }>> => {
  return apiClient.get(`/api/cafes/${id}`);
};

export const addCafe = (
  cafe: AddCafeData
): Promise<AxiosResponse<{ success: boolean; data: Cafe }>> => {
  return adminClient.post('/api/cafes', cafe, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateCafe = (
  id: number,
  updates: UpdateCafeData
): Promise<AxiosResponse<{ success: boolean; data: Cafe }>> => {
  return adminClient.put(`/api/cafes/${id}`, updates);
};

export const deleteCafe = (
  id: number
): Promise<AxiosResponse<{ success: boolean }>> => {
  return adminClient.delete(`/api/cafes/${id}`);
};

export const addComment = (
  cafeId: number,
  userId: string,
  password: string,
  commentText: string
): Promise<AxiosResponse<{ success: boolean; comment: Comment }>> => {
  return apiClient.post(`/api/cafes/${cafeId}/comments`, {
    userId,
    password,
    commentText,
  });
};

// Admin authentication APIs
export const adminLogin = (credentials: {
  username: string;
  password: string;
}): Promise<AxiosResponse<AuthResponse>> => {
  return adminClient.post('/api/admin/login', credentials);
};

export const checkAuth = (): Promise<AxiosResponse<AuthResponse>> => {
  return adminClient.get('/api/admin/check-auth');
};
