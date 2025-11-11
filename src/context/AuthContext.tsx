import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MOCK_USERS } from "../data/users";
import {
  AUTH_STORAGE_KEY,
  AuthContext,
  type AuthCredentials,
  type AuthUser,
} from "./authState";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }
    const savedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!savedUser) {
      return null;
    }
    try {
      const parsed = JSON.parse(savedUser) as Partial<AuthUser>;
      if (typeof parsed?.username !== "string") {
        return null;
      }
      return {
        username: parsed.username,
        fullName:
          typeof parsed.fullName === "string"
            ? parsed.fullName
            : parsed.username,
      };
    } catch (error) {
      console.warn("Failed to parse saved auth user", error);
      return null;
    }
  });

  const login = useCallback(
    ({ username, password }: AuthCredentials) => {
      const normalizedUsername = username.trim().toLowerCase();
      const normalizedPassword = password.trim();

      if (!normalizedUsername || !normalizedPassword) {
        return false;
      }

      const matchedUser = MOCK_USERS.find(
        (candidate) =>
          candidate.username.trim().toLowerCase() === normalizedUsername
      );

      if (!matchedUser || matchedUser.password !== normalizedPassword) {
        return false;
      }

      const profile = {
        username: matchedUser.username,
        fullName: matchedUser.fullName,
      };
      setUser(profile);
      return true;
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (user) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
