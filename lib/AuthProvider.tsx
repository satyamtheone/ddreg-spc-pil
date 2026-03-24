"use client";

import React, { createContext, useContext, useMemo, useCallback } from "react";
import { useGetMeQuery } from "./redux/slices/userApi";

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
  /* 🔥 RTK Query handles everything */
  const accessToken = getCookie("accessToken");
  const { data, isLoading, refetch } = useGetMeQuery(undefined, {
    skip: !accessToken,
  });

  const user: User | null = data?.data ?? null;

  /* ================= LOGOUT ================= */

  const logout = useCallback(async () => {
    try {
      const refreshToken = getCookie("refreshToken");

      if (refreshToken) {
        await fetch("http://192.168.2.159:5000/api/auth/logout", {
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

  const amazonBucketname = "https://devtest-ddreg.s3.ap-south-1.amazonaws.com";
  const imageUrl = `${amazonBucketname}/${user?.userProfilePic}`;
  /* ================= VALUE ================= */

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isUserLoading: isLoading,
      isAuthenticated: !!user,

      isSuperAdmin: !!isSuperAdmin,
      isAdmin: !!isAdmin,
      isUser: !!isUser,

      hasPermission,
      canDoAction,
      imageUrl,
      refreshUser: refetch,
      logout,
    }),
    [user, isLoading, refetch, logout],
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
