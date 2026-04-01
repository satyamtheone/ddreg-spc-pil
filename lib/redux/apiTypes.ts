// ================================================================================== User Types
export type User = {
  id: string;
  fName: string;
  lName: string;
  userProfilePic?: string | null;
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
  businessRole: BusinessRole;
};

export type BusinessRole = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  permissions: RolePermission[];
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
      createdById?: string;
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

export type CreateUserRequest = {
  fName: string;
  lName: string;
  email: string;
  password: string;
  role: string;
  businessRoleId: string;
  userProfilePic?: string;
};

export type CreateUserResponse = {
  success?: boolean;
  data: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
  };
  message: string;
};

export type UpdateUserRequest = {
  id: string;
  body: FormData;
};

export type GetUserResponse = {
  success: boolean;
  message: string;
  data: User[];
};

export type Document = {
  id: string;
  name: string;
  countryId: string;
};
export type Country = {
  id: string;
  name: string;
  code: string;
  regulatoryBody: string;
  createdAt: string;
  documents: Document[];
};

// ================================================================================== Template Types

export type GetCountriesResponse = {
  success: boolean;
  message: string;
  data: Country[];
};

export type TemplateFile = {
  size: number;
  fileName: string;
  mimeType: string;
};

export type SchemaMeta = {
  type: string;
  version: string | null;
};

export type CountryTemplate = {
  name: string;
  code: string;
  regulatoryBody: string;
};

export type TypeInfo = {
  name: string;
  country: CountryTemplate;
};

export type Template = {
  id: string;
  name: string;
  version: string;
  title: string;
  typeId: string;
  sourceType: "UPLOAD" | string;
  sourceUrl: string | null;
  templateFile: TemplateFile;
  schemaMeta: SchemaMeta;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  type: TypeInfo;
  sectionsCount: number;
  usageCount: number;
};
export type GetTemplatesResponse = {
  success: boolean;
  message: string;
  data: Template[];
};

export type CreateTemplateResponse = {
  success: boolean;
  message: string;
  data: [];
};

export type CreateTemplateRequest = {
  title: string;
  country: string;
  type: string;
  description?: string;
  templateFile: File;
};

export type DocumentType = {
  id: string;
  name: string;
  countryId: string;
};

export type CountryType = {
  id: string;
  name: string;
  code: string;
  regulatoryBody: string;
  createdAt: string;
  documents: DocumentType[];
};

export type Option = {
  option: string;
  value: string;
};

export type Section = {
  id: string;
  title: string;
  content: string;
  type: string;
  required: boolean;
  children?: Section[];
};

export type TemplateById = {
  id: string;
  name: string;
  version: string;
  title: string;
  typeId: string;
  sourceType: string;
  sourceUrl: string | null;
  templateFile: {
    size: number;
    fileName: string;
    mimeType: string;
  };
  schemaMeta: {
    type: string;
    version: null;
  };
  createdById: string;
  createdAt: string;
  updatedAt: string;
  type: {
    name: string;
    country: {
      name: string;
      code: string;
      regulatoryBody: string;
    };
  };
  section: Section[];
};

export type GetTemplateByIdResponse = {
  success: boolean;
  message: string;
  data: TemplateById;
};

export type Reference = {
  id: string;
  name: string;
  version: string;
  title: string;
  typeId: string;
  sourceType: string;
  sourceUrl: null;
  referenceFile: {
    size: number;
    fileName: string;
    mimeType: string;
  };
  schemaMeta: null;
  createdById: string;
  createdAt: string;
  updatedAt: string;
};

export type GetReferencesResponse = {
  success: boolean;
  message: string;
  data: Reference[];
};

export type ReferenceById = Reference & {
  sections: Section[];
};
export type GetReferenceByIdResponse = {
  success: boolean;
  message: string;
  data: ReferenceById;
};


