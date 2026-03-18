export type User = {
  id: string;
  fName: string;
  lName: string;
  userProfilePic: string | null;
  email: string;
  country: string | null;
  language: string | null;
  timeZone: string | null;
  twoFAEnabled: boolean;
  autoLogOut: boolean;
  isActive: boolean;
  createdAt: string;
  role: "USER" | string;
  createdById: string;
  businessRoleId: string | null;
  businessRole: unknown | null;
};

export interface MeResponse {
  success: boolean;
  data: User;
  message: string;
}

export interface UsersResponse {
  code: string;
  users: User[];
}

export type UpdatePreferencesPayload = {
  country?: string;
  language?: string;
  timeZone?: string;
};

export type UpdatePreferencesResponse = {
  success: boolean;
  data: {
    country?: string;
    language?: string;
    timeZone?: string;
  };
  message: string;
};
