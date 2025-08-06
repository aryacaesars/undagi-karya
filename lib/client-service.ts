import { Client, CreateClientRequest, UpdateClientRequest, ClientApiResponse } from '../types/client';

const API_BASE_URL = '/api/clients';

export class ClientService {
  // Mengambil semua clients dengan pagination dan search
  static async getClients(params?: {
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ClientApiResponse> {
    try {
      const searchParams = new URLSearchParams();
      
      if (params?.search) searchParams.append('search', params.search);
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());

      const url = `${API_BASE_URL}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return await response.json();
    } catch (error) {
      console.error('Error fetching clients:', error);
      return {
        success: false,
        error: 'Gagal mengambil data clients'
      };
    }
  }

  // Mengambil client berdasarkan ID
  static async getClientById(id: string): Promise<ClientApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return await response.json();
    } catch (error) {
      console.error('Error fetching client:', error);
      return {
        success: false,
        error: 'Gagal mengambil data client'
      };
    }
  }

  // Membuat client baru
  static async createClient(data: CreateClientRequest): Promise<ClientApiResponse> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      console.error('Error creating client:', error);
      return {
        success: false,
        error: 'Gagal membuat client baru'
      };
    }
  }

  // Mengupdate client
  static async updateClient(id: string, data: Omit<UpdateClientRequest, 'id'>): Promise<ClientApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      console.error('Error updating client:', error);
      return {
        success: false,
        error: 'Gagal mengupdate client'
      };
    }
  }

  // Menghapus client
  static async deleteClient(id: string): Promise<ClientApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return await response.json();
    } catch (error) {
      console.error('Error deleting client:', error);
      return {
        success: false,
        error: 'Gagal menghapus client'
      };
    }
  }
}
