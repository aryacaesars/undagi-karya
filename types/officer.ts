export interface Officer {
  id: string;
  name: string;
  role: string;
  email?: string | null;
  phone?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOfficerRequest {
  name: string;
  role?: string;
  email?: string;
  phone?: string;
}

export interface UpdateOfficerRequest {
  id: string;
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
}

export interface OfficerApiResponse {
  success: boolean;
  message?: string;
  data?: Officer | Officer[];
  error?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
