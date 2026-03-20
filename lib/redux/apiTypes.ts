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
  role: "USER" | "ADMIN" | "SUPERADMIN";
  createdById: string;
  businessRoleId: string | null;
  businessRole: {};
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

export type RolePermission = {
  id: string;
  type: string;
  createdAt: string;
};

export type GetPermissionsResponse = {
  success: boolean;
  message: string;
  data: RolePermission[];
};
export type GetRolesResponse = {
  success: boolean;
  message: string;
  data: [
    {
      id: string;
      name: string;
      description: string;
      permissions: RolePermission[];
    },
  ];
};

export type CreateROleRequest = {
  name: string;
  description: string;
  permissionIds: string[];
};

export type CreateRoleResponse = {
  success?: boolean;
  data: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
  };
  message: string;
};

export type UpdateRoleRequest = {
  id: string;
  body: CreateROleRequest;
};