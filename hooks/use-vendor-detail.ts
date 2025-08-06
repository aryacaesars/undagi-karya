import { useState, useEffect } from 'react';
import { Vendor } from '@/types/vendor';

export function useVendorDetail(id: string) {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchVendor = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/vendors?id=${id}`);
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch vendor');
        }
        
        if (result.success) {
          setVendor(result.data);
        } else {
          throw new Error(result.error || 'Failed to fetch vendor');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [id]);

  return { vendor, loading, error, refetch: () => {
    if (id) {
      const fetchVendor = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const response = await fetch(`/api/vendors?id=${id}`);
          const result = await response.json();
          
          if (!response.ok) {
            throw new Error(result.error || 'Failed to fetch vendor');
          }
          
          if (result.success) {
            setVendor(result.data);
          } else {
            throw new Error(result.error || 'Failed to fetch vendor');
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      };
      fetchVendor();
    }
  }};
}
