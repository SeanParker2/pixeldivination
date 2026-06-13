import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<{ message?: string; retryAfter?: number; limit?: number; remaining?: number }>) => {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Enhance error with user-friendly message
    const enhancedError = error as AxiosError & { userMessage?: string; isRateLimit?: boolean };

    if (status === 429) {
      enhancedError.userMessage = data?.message || '今日免费次数已用完，请升级 Pro 会员';
      enhancedError.isRateLimit = true;
    } else if (status === 500) {
      enhancedError.userMessage = '服务器繁忙，请稍后再试';
    } else if (status === 503) {
      enhancedError.userMessage = 'AI 服务暂时不可用，请稍后再试';
    } else if (!status) {
      enhancedError.userMessage = '网络连接失败，请检查网络';
    } else {
      enhancedError.userMessage = data?.message || '请求失败，请重试';
    }

    return Promise.reject(enhancedError);
  },
);

export default api;
