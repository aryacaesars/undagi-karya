import { useState, useEffect, useCallback } from 'react';
import { Client, ClientApiResponse } from '../types/client';
import { ClientService } from '../lib/client-service';

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  // Fetch clients
  const fetchClients = useCallback(async (params?: {
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await ClientService.getClients(params);
      
      if (response.success && Array.isArray(response.data)) {
        setClients(response.data);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      } else {
        setError(response.error || 'Gagal mengambil data clients');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mengambil data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create client
  const createClient = useCallback(async (data: {
    name: string;
    phone?: string;
    address?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await ClientService.createClient(data);
      
      if (response.success) {
        // Refresh the list
        await fetchClients();
        return { success: true, data: response.data };
      } else {
        setError(response.error || 'Gagal membuat client');
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMsg = 'Terjadi kesalahan saat membuat client';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [fetchClients]);

  // Update client
  const updateClient = useCallback(async (id: string, data: {
    name: string;
    phone?: string;
    address?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await ClientService.updateClient(id, data);
      
      if (response.success) {
        // Update the local state
        setClients(prev => prev.map(client => 
          client.id === id ? { ...client, ...data } : client
        ));
        return { success: true, data: response.data };
      } else {
        setError(response.error || 'Gagal mengupdate client');
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMsg = 'Terjadi kesalahan saat mengupdate client';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete client
  const deleteClient = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await ClientService.deleteClient(id);
      
      if (response.success) {
        // Remove from local state
        setClients(prev => prev.filter(client => client.id !== id));
        return { success: true };
      } else {
        setError(response.error || 'Gagal menghapus client');
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMsg = 'Terjadi kesalahan saat menghapus client';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get client by ID
  const getClientById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await ClientService.getClientById(id);
      
      if (response.success && response.data) {
        return { success: true, data: response.data };
      } else {
        setError(response.error || 'Client tidak ditemukan');
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMsg = 'Terjadi kesalahan saat mengambil data client';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    clients,
    loading,
    error,
    pagination,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
    getClientById,
    clearError: () => setError(null)
  };
}
