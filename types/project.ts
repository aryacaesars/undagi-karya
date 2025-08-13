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
  milestone: Milestone; // current milestone
  progress: number; // 0-100
  contractValue?: string | null; // using string because Prisma Decimal serializes to string in JSON
  paymentTerms?: string | null;
  totalPaid?: string | null;
  status: ProjectStatus;
  milestoneHistories?: ProjectMilestoneHistory[];
}

export type Milestone = 'PERENCANAAN' | 'PERSIAPAN' | 'PELAKSANAAN' | 'FINISHING' | 'SELESAI';
export type ProjectStatus = 'ACTIVE' | 'STALL' | 'TERMINATED' | 'FINISH';

export interface ProjectMilestoneHistory {
  id: string;
  projectId: string;
  previousMilestone?: Milestone | null;
  newMilestone: Milestone;
  progress: number;
  changedAt: string;
  note?: string | null;
}
