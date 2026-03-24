export interface Appointment {
  id?: string;
  clientName: string;
  clientWhatsApp: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  role: 'admin' | 'client';
}

export const SERVICES = [
  "Alongamento",
  "Cutícula Russa",
  "Manutenção",
  "Banho de Gel",
  "Esmaltação em Gel"
];

export const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];
