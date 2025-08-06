export interface Vendor {
  id: string;
  name: string;
  phone: string | null;
  address: string | null;
  contactPerson: string | null;
  paymentTerms: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVendorData {
  name: string;
  phone?: string;
  address?: string;
  contactPerson?: string;
  paymentTerms?: string;
  description?: string;
}

export interface UpdateVendorData extends CreateVendorData {
  id: string;
}
