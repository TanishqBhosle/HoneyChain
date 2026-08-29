export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: 'ADMIN' | 'BEEKEEPER' | 'COLLECTION_CENTER' | 'PROCESSOR' | 'QUALITY_INSPECTOR' | 'DISTRIBUTOR' | 'RETAILER' | 'CONSUMER';
  isActive: boolean;
  createdAt: Date;
}

export interface Beekeeper {
  id: string;
  userId: string;
  region: string;
  kvicEnrollmentId?: string;
}
