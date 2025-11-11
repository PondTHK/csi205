import { createContext } from "react";

export type AuthUser = {
  username: string;
  fullName: string;
};

export type AuthCredentials = {
  username: string;
  password: string;
};

export type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (credentials: AuthCredentials) => boolean;
  logout: () => void;
};

export const AUTH_STORAGE_KEY = "w09-auth-user";

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);
