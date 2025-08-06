import { useEffect, useState } from 'react';
import { Project } from '../types/project';

interface UseProjectDetailResult {
  project: Project | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProjectDetail(id: string): UseProjectDetailResult {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/projects?id=${id}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch project');
      }
      
      if (data.success) {
        setProject(data.data);
      } else {
        throw new Error('Failed to fetch project data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  return {
    project,
    loading,
    error,
    refetch: fetchProject,
  };
}
