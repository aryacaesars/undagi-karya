"use client"

import { useState, useEffect } from 'react';
import { Form } from '@/types/form';

export function useFormPDF(formId: string) {
  const [form, setForm] = useState<Form | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!formId) {
      setIsLoading(false);
      return;
    }

    const fetchFormData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/forms/${formId}`);
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

    fetchFormData();
  }, [formId]);

  return { form, isLoading, error };
}
