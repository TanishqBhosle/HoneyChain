export interface Alert {
  id: string;
  hiveId: string;
  alertType: 'HIGH_TEMPERATURE' | 'LOW_TEMPERATURE' | 'HIGH_HUMIDITY' | 'LOW_WEIGHT' | 'ABNORMAL_ACTIVITY' | 'DISEASE_DETECTED' | 'SENSOR_OFFLINE';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  isRead: boolean;
  createdAt: Date;
  resolvedAt?: Date;
}
