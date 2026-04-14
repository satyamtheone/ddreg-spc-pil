"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from "react";

/* ================= TYPES ================= */

export type Role = "USER" | "ADMIN" | "SUPERADMIN";

export interface RolePermission {
  id: string;
  name?: string;
}

export type BusinessRole = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  permissions: RolePermission[] | null;
};

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
  role: Role;
  createdById: string;
  businessRoleId: string | null;
  businessRole: BusinessRole | null;
};

interface AuthContextType {
  user: User | null;
  isUserLoading: boolean;
  isAuthenticated: boolean;

  isSuperAdmin: boolean;
  isAdmin: boolean;
  isUser: boolean;

  imageUrl: string;

  hasPermission: (perm: string) => boolean;
  canDoAction: (id: string) => boolean;

  refreshUser: () => void;
  logout: () => Promise<void>;
}

/* ================= CONTEXT ================= */

const AuthContext = createContext<AuthContextType | null>(null);

/* ================= COOKIE HELPERS ================= */

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  return parts.length === 2 ? parts.pop()!.split(";").shift()! : null;
};

const deleteCookie = (name: string) => {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=; Max-Age=0; path=/`;
};

/* ================= PROVIDER ================= */

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  /* ================= FETCH USER ================= */

  const fetchUser = useCallback(async () => {
    const token = getCookie("accessToken");

    if (!token) {
      setUser(null);
      setIsUserLoading(false);
      return;
    }

    try {
      setIsUserLoading(true);

      const res = await fetch("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setUser(data?.data ?? null);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    } finally {
      setIsUserLoading(false);
    }
  }, []);

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  /* ================= LOGOUT ================= */

  const logout = useCallback(async () => {
    try {
      const refreshToken = getCookie("refreshToken");

      if (refreshToken) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");

      setUser(null);

      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
  }, []);

  /* ================= ROLE LOGIC ================= */

  const isSuperAdmin = user?.role === "SUPERADMIN";
  const isAdmin = user?.role === "ADMIN";
  const isUser = user?.role === "USER";

  /* ================= PERMISSION ================= */

  const hasPermission = (perm: string): boolean => {
    if (!user) return false;

    if (isSuperAdmin) return true;

    const permissions =
      user.businessRole?.permissions?.map((p) => p.name) || [];

    return permissions.includes(perm);
  };

  /* ================= CUSTOM CHECK ================= */

  const canDoAction = (id: string): boolean => {
    if (!user) return false;
    return user.id === id;
  };

  /* ================= IMAGE ================= */

  const amazonBucketname = process.env.NEXT_PUBLIC_AWS_URL;

  const imageUrl = user?.userProfilePic
    ? `${amazonBucketname}/${user.userProfilePic}`
    : "";

  /* ================= CONTEXT VALUE ================= */

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isUserLoading,
      isAuthenticated: !!user,
      isSuperAdmin: !!isSuperAdmin,
      isAdmin: !!isAdmin,
      isUser: !!isUser,
      hasPermission,
      canDoAction,
      imageUrl,
      refreshUser: fetchUser,
      logout,
    }),
    [user, isUserLoading, logout, fetchUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/* ================= HOOK ================= */

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
