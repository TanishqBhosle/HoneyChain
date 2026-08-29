export interface Apiary {
  id: string;
  beekeeperId: string;
  name: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
}

export interface Hive {
  id: string;
  apiaryId: string;
  hiveType: string;
  species: string;
  installDate: Date;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'DECOMMISSIONED';
}

export interface Sensor {
  id: string;
  hiveId: string;
  sensorType: string;
  deviceId: string;
  isActive: boolean;
}
