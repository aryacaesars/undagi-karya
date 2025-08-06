import { useState, useEffect } from 'react';

export interface SupplyItem {
  id: string;
  name: string;
  specifications: string | null;
  createdAt: string;
  updatedAt: string;
  formItems?: FormItem[];
}

export interface FormItem {
  id: string;
  quantity: number;
}

export interface SupplyItemsResponse {
  success: boolean;
  data: SupplyItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  error?: string;
}

export function useSupplyItems(searchParams?: {
  search?: string;
  page?: number;
  limit?: number;
}) {
  const [supplyItems, setSupplyItems] = useState<SupplyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  const fetchSupplyItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      
      if (searchParams?.search) {
        params.append('search', searchParams.search);
      }
      if (searchParams?.page) {
        params.append('page', searchParams.page.toString());
      }
      if (searchParams?.limit) {
        params.append('limit', searchParams.limit.toString());
      }
      
      const response = await fetch(`/api/supply-items?${params.toString()}`);
      const data: SupplyItemsResponse = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch supply items');
      }
      
      if (data.success) {
        setSupplyItems(data.data);
        setPagination(data.pagination);
      } else {
        throw new Error(data.error || 'Failed to fetch supply items');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplyItems();
  }, [searchParams?.search, searchParams?.page, searchParams?.limit]);

  return { 
    supplyItems, 
    loading, 
    error, 
    pagination, 
    refetch: fetchSupplyItems 
  };
}
