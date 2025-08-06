import { useState } from 'react';
import { Project } from '../types/project';

interface CreateProjectData {
  name: string;
  client?: string;
  officer?: string;
  type?: string;
  location?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
}

interface UseCreateProjectResult {
  createProject: (data: CreateProjectData) => Promise<Project>;
  loading: boolean;
  error: string | null;
}

export function useCreateProject(): UseCreateProjectResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProject = async (data: CreateProjectData): Promise<Project> => {
    try {
      setLoading(true);
      setError(null);

      const payload = {
        name: data.name,
        client: data.client || null,
        officer: data.officer || null,
        type: data.type || null,
        location: data.location || null,
        description: data.description || null,
        startDate: data.startDate ? data.startDate.toISOString() : null,
        endDate: data.endDate ? data.endDate.toISOString() : null,
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create project');
      }

      if (!result.success) {
        throw new Error('Failed to create project');
      }

      return result.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    createProject,
    loading,
    error,
  };
}
