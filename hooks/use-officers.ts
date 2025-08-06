import { useState, useEffect, useCallback } from 'react';
import { Officer, OfficerApiResponse } from '../types/officer';

export function useOfficers() {
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  // Fetch officers
  const fetchOfficers = useCallback(async (params?: {
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams();
      if (params?.search) searchParams.append('search', params.search);
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());

      const response = await fetch(`/api/officers?${searchParams}`);
      const result: OfficerApiResponse = await response.json();
      
      if (result.success && Array.isArray(result.data)) {
        setOfficers(result.data);
        if (result.pagination) {
          setPagination(result.pagination);
        }
      } else {
        setError(result.error || 'Gagal mengambil data officers');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mengambil data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create officer
  const createOfficer = useCallback(async (data: {
    name: string;
    role?: string;
    email?: string;
    phone?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/officers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: OfficerApiResponse = await response.json();

      if (result.success && result.data && !Array.isArray(result.data)) {
        setOfficers(prev => [result.data as Officer, ...prev]);
        return result.data as Officer;
      } else {
        throw new Error(result.error || 'Gagal membuat officer');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update officer
  const updateOfficer = useCallback(async (id: string, data: {
    name?: string;
    role?: string;
    email?: string;
    phone?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/officers', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...data }),
      });

      const result: OfficerApiResponse = await response.json();

      if (result.success && result.data && !Array.isArray(result.data)) {
        setOfficers(prev => 
          prev.map(officer => 
            officer.id === id ? result.data as Officer : officer
          )
        );
        return result.data as Officer;
      } else {
        throw new Error(result.error || 'Gagal mengupdate officer');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete officer
  const deleteOfficer = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/officers', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const result: OfficerApiResponse = await response.json();

      if (result.success) {
        setOfficers(prev => prev.filter(officer => officer.id !== id));
        return true;
      } else {
        throw new Error(result.error || 'Gagal menghapus officer');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh data
  const refresh = useCallback(() => {
    fetchOfficers();
  }, [fetchOfficers]);

  return {
    officers,
    loading,
    error,
    pagination,
    fetchOfficers,
    createOfficer,
    updateOfficer,
    deleteOfficer,
    refresh
  };
}
