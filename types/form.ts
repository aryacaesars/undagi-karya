import { Project } from './project';
import { Officer } from './officer';
import { SupplyItem } from './supply-item';

export interface FormItem {
  id: string;
  quantity: number;
  unit: string;
  specifications?: string | null;
  notes?: string | null;
  supplyItem: SupplyItem;
  supplyItemId: string;
  formId: string;
}

export interface Form {
  id: string;
  formNumber: string;
  title?: string | null;
  type: string;
  submissionDate: string;
  description?: string | null;
  notes?: string | null;
  projectId: string;
  officerId: string;
  project: Project;
  officer: Officer;
  items: FormItem[];
  createdAt: string;
  updatedAt: string;
}
