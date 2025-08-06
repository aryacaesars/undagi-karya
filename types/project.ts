export interface Project {
  id: string;
  name: string;
  client?: string | null;
  officer?: string | null;
  type?: string | null;
  location?: string | null;
  description?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  createdAt: string;
  updatedAt: string;
  forms?: any[]; // Akan ditambahkan interface Form yang lebih spesifik nanti
}
