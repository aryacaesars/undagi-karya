import { useEffect, useState } from 'react';
import { Project } from '../types/project';

interface UseProjectsResult {
  projects: Project[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  } | null;
  refetch: () => void;
  fetchProjects: (search?: string, page?: number, limit?: number) => void;
}

export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  } | null>(null);

  const fetchProjects = async (search?: string, page = 1, limit = 50) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search && search.trim()) {
        params.append('search', search.trim());
      }

      const response = await fetch(`/api/projects?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch projects');
      }

      if (data.success) {
        setProjects(data.data);
        setPagination(data.pagination);
      } else {
        throw new Error('Failed to fetch projects data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setProjects([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    pagination,
    refetch,
    fetchProjects,
  };
}
