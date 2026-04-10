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
  key?: string;
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
  description?: string;
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
  description?: string;
  typeId: string;
  sourceType: string;
  sourceUrl?: string;
  referenceFile: TemplateFile;
  schemaMeta: {
    type: string;
    version: string;
    productName: string;
  };

  type: TypeInfo;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  sectionsCount?: number;
  usageCount: number;
};

export type GetReferencesResponse = {
  success: boolean;
  message: string;
  data: Reference[];
};

export type ReferencesFromWeb = {
  name: string;
  region: string;
  lastUpdated: string;
  status: string;
  activeSubstance: string;
  documents: [
    {
      type: string;
      url: string;
    },
  ];
};
export type GetReferencesFromWebResponse = {
  success: boolean;
  message: string;
  data: ReferencesFromWeb[];
};

export type ReferenceById = Reference & {
  sections: Section[];
};
export type GetReferenceByIdResponse = {
  success: boolean;
  message: string;
  data: ReferenceById;
};

// ========================================================================== document types

export type PreviewDocumentRequest = {
  templateId?: string;
  referenceId?: string;
  productName?: string;
  findReplace?: [
    {
      find: string;
      replace: string;
      caseSensitive: boolean;
    },
  ];
};

export type PreviewDocumentResponse = {
  success: boolean;
  message: string;
  data: {
    templateId: string;
    referenceId: string;
    matchingStrategy: string;
    sections: PreviewDocumentSectionType[];
  };
};

export type PreviewDocumentSectionType = {
  id: string;
  title: string;
  content?: string;
  type: "text" | "group";
  required?: boolean;
  children: PreviewDocumentSectionType[];
  matched?: boolean;
};

export type DocumentFormValues = {
  sections: PreviewDocumentSectionType[];
};

export type CreateDocumentRequest = {
  title: string;
  templateId: string;
  referenceId: string;
  description: string;
  strength: string;
  dosageForm: string;
  manufacturer: string;
  shelfLife: string;
  storagePrecautions: string;
  mahAddress: string;
  packagingDetails: string;
  country: string;
  regulatoryBody: string;
  sections: PreviewDocumentSectionType[];
};

export type CreateDocumentResponse = {
  success: boolean;
  message: string;
  data: {
    document: {
      id: string;
      title: string;
      strength: string;
      dosageForm: string;
      manufacturer: string;
      shelfLife: string;
      storagePrecautions: string;
      mahAddress: string;
      packagingDetails: string;
      country: string;
      regulatoryBody: string;
      createdAt: string;
      createdById: string;
      currentVersionId: string;
    };
    version: {
      id: string;
      documentId: string;
      templateId: string;
      referenceId: string;
      versionNumber: string;
      changeType: string;
      description: string;
      createdById: string;
      createdAt: string;
      approvedAt: string | null;
      isLocked: boolean;
      parentVersionId: string | null;
      status: string;
      updatedAt: string;
      sections: PreviewDocumentSectionType[];
    };
  };
};

export type RepoDocument = {
  id: string;
  title: string;
  strength: string;
  dosageForm: string;
  manufacturer: string;
  shelfLife: string;
  storagePrecautions: string;
  mahAddress: string;
  packagingDetails: string;
  country: string;
  regulatoryBody: string;
  createdAt: string;
  createdById: string;
  currentVersionId: string;
  currentVersion: {
    id: string;
    documentId: string;
    templateId: string;
    referenceId: string;
    versionNumber: string;
    changeType: string;
    description: string;
    createdById: string;
    createdAt: string;
    approvedAt: string | null;
    isLocked: boolean;
    parentVersionId: string | null;
    status: string;
    updatedAt: string;
    contributors: [];
  };
};
export type GetDocumentResponse = {
  success: boolean;
  message: string;
  data: {
    data: RepoDocument[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  };
};