"use client"

import { useState, useEffect } from 'react';
import { Form } from '@/types/form'; // Assuming you have a Form type defined

export function useFormDetail(id: string) {
  const [form, setForm] = useState<Form | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchFormDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/forms/${id}`);
        if (!response.ok) {
          throw new Error('Gagal mengambil data form');
        }
        const result = await response.json();
        if (result.success) {
          setForm(result.data);
        } else {
          throw new Error(result.error || 'Gagal mengambil data form');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormDetail();
  }, [id]);

  return { form, isLoading, error };
}
