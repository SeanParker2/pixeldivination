import api from '../lib/api';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  type: 'virtual' | 'physical';
  buff: string;
}

interface Order {
  id: string;
  orderType: string;
  productId: string;
  productName: string;
  amount: number;
  status: string;
  paymentMethod: string;
  paidAt?: string;
  createdAt: string;
}

interface CreateOrderParams {
  productId: string;
  amount?: number;
  paymentMethod?: string;
}

interface ProductQuery {
  category?: string;
  page?: number;
  limit?: number;
}

export const shopService = {
  async getProducts(query?: ProductQuery): Promise<{ items: Product[]; total: number; page: number; limit: number }> {
    const result: any = await api.get('/shop/products', { params: query });
    return result;
  },

  async getProductById(id: string): Promise<Product> {
    const result: any = await api.get(`/shop/product/${id}`);
    return result;
  },

  async createOrder(params: CreateOrderParams): Promise<any> {
    const result: any = await api.post('/shop/order', params);
    return result;
  },

  async getOrders(page = 1, limit = 20): Promise<{ items: Order[]; total: number; page: number; limit: number; totalPages: number }> {
    const result: any = await api.get('/shop/orders', {
      params: { page: page.toString(), limit: limit.toString() },
    });
    return result;
  },

  async getOrderById(id: string): Promise<Order> {
    const result: any = await api.get(`/shop/order/${id}`);
    return result;
  },

  async initiatePayment(orderId: string): Promise<any> {
    const result: any = await api.post('/shop/payment', { orderId });
    return result;
  },
};
