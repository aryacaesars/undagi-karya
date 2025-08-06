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
  form: {
    id: string;
    formNumber: string;
    project: {
      id: string;
      name: string;
    };
    officer: {
      id: string;
      name: string;
    };
  };
}

export function useSupplyItemDetail(id: string) {
  const [supplyItem, setSupplyItem] = useState<SupplyItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSupplyItem = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/supply-items?id=${id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch supply item');
        }
        
        if (data.success) {
          setSupplyItem(data.data);
        } else {
          throw new Error(data.error || 'Failed to fetch supply item');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSupplyItem();
  }, [id]);

  return { supplyItem, loading, error };
}
