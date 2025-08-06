import { useState, useEffect, useCallback } from 'react';
import { Client, ClientApiResponse } from '../types/client';
import { ClientService } from '../lib/client-service';

export function useClientDetail(id: string) {
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch client detail
  const fetchClient = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await ClientService.getClientById(id);
      
      if (response.success && response.data) {
        setClient(response.data as Client);
      } else {
        setError(response.error || 'Client tidak ditemukan');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mengambil data client');
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Update client
  const updateClient = useCallback(async (data: {
    name: string;
    phone?: string;
    address?: string;
  }) => {
    if (!id) return { success: false, error: 'ID client tidak valid' };
    
    setLoading(true);
    setError(null);

    try {
      const response = await ClientService.updateClient(id, data);
      
      if (response.success && response.data) {
        setClient(response.data as Client);
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
  }, [id]);

  // Delete client
  const deleteClient = useCallback(async () => {
    if (!id) return { success: false, error: 'ID client tidak valid' };
    
    setLoading(true);
    setError(null);

    try {
      const response = await ClientService.deleteClient(id);
      
      if (response.success) {
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
  }, [id]);

  // Fetch client when id changes
  useEffect(() => {
    fetchClient();
  }, [fetchClient]);

  return {
    client,
    loading,
    error,
    fetchClient,
    updateClient,
    deleteClient,
    clearError: () => setError(null)
  };
}
