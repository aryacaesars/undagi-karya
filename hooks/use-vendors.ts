import { useState, useEffect } from 'react';
import { Vendor } from '@/types/vendor';

export interface VendorsResponse {
  success: boolean;
  data: Vendor[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  error?: string;
}

export function useVendors(search?: string, page = 1, limit = 10) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString()
        });
        
        if (search) {
          params.append('search', search);
        }
        
        const response = await fetch(`/api/vendors?${params}`);
        const result: VendorsResponse = await response.json();
        
        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch vendors');
        }
        
        if (result.success) {
          setVendors(result.data);
          setPagination(result.pagination);
        } else {
          throw new Error(result.error || 'Failed to fetch vendors');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [search, page, limit]);

  return { vendors, pagination, loading, error };
}
