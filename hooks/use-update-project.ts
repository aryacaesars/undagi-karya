import { useState } from 'react';
import { Project, Milestone, ProjectStatus } from '../types/project';

interface UpdateProjectData {
  id: string;
  name?: string;
  client?: string | null;
  officer?: string | null;
  type?: string | null;
  location?: string | null;
  description?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  milestone?: Milestone;
  contractValue?: number | string | null;
  paymentTerms?: string | null;
  totalPaid?: number | string | null;
  status?: ProjectStatus;
}

interface UseUpdateProjectResult {
  updateProject: (data: UpdateProjectData) => Promise<Project>;
  loading: boolean;
  error: string | null;
}

export function useUpdateProject(): UseUpdateProjectResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProject = async (data: UpdateProjectData): Promise<Project> => {
    try {
      setLoading(true);
      setError(null);

      const payload: any = { id: data.id };
      if (data.name !== undefined) payload.name = data.name;
      if (data.client !== undefined) payload.client = data.client;
      if (data.officer !== undefined) payload.officer = data.officer;
      if (data.type !== undefined) payload.type = data.type;
      if (data.location !== undefined) payload.location = data.location;
      if (data.description !== undefined) payload.description = data.description;
      if (data.startDate !== undefined) payload.startDate = data.startDate ? data.startDate.toISOString() : null;
      if (data.endDate !== undefined) payload.endDate = data.endDate ? data.endDate.toISOString() : null;
      if (data.milestone !== undefined) payload.milestone = data.milestone;
      if (data.contractValue !== undefined) payload.contractValue = data.contractValue;
      if (data.paymentTerms !== undefined) payload.paymentTerms = data.paymentTerms;
      if (data.totalPaid !== undefined) payload.totalPaid = data.totalPaid;
      if (data.status !== undefined) payload.status = data.status;

      const res = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Gagal update project');
      return json.data;
    } catch (e:any) {
      const m = e.message || 'Terjadi kesalahan';
      setError(m);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { updateProject, loading, error };
}
