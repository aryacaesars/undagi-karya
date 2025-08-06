export interface Client {
  id: string;
  name: string;
  phone?: string | null;
  address?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateClientRequest {
  name: string;
  phone?: string;
  address?: string;
}

export interface UpdateClientRequest {
  id: string;
  name: string;
  phone?: string;
  address?: string;
}

export interface ClientApiResponse {
  success: boolean;
  message?: string;
  data?: Client | Client[];
  error?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface ClientSearchParams {
  id?: string;
  search?: string;
  page?: number;
  limit?: number;
}
