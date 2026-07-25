import type { Admin } from "@/types";

export interface AdminCredentials {
  email: string;
  password: string;
  admin: Admin;
}

const adminAccounts: AdminCredentials[] = [
  {
    email: "admin@chowdeck.com",
    password: "admin123",
    admin: {
      id: "admin-001",
      firstName: "Chinedu",
      lastName: "Okeke",
      email: "admin@chowdeck.com",
      avatar: "/api/placeholder/100/100",
      role: "super_admin",
      lastLogin: "2025-07-25T08:00:00Z",
    },
  },
  {
    email: "manager@chowdeck.com",
    password: "manager123",
    admin: {
      id: "admin-002",
      firstName: "Amina",
      lastName: "Bello",
      email: "manager@chowdeck.com",
      avatar: "/api/placeholder/100/100",
      role: "admin",
      lastLogin: "2025-07-24T14:30:00Z",
    },
  },
  {
    email: "support@chowdeck.com",
    password: "support123",
    admin: {
      id: "admin-003",
      firstName: "Tunde",
      lastName: "Williams",
      email: "support@chowdeck.com",
      avatar: "/api/placeholder/100/100",
      role: "moderator",
      lastLogin: "2025-07-25T06:15:00Z",
    },
  },
];

export default adminAccounts;
