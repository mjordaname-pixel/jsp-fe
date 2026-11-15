"use client";

import { create } from "zustand";

import {
  createAccount,
  createSession,
  destroySession,
  restoreSession,
} from "@/lib/api-client";
import type { ExperienceLevel, User, UserRole } from "@/lib/types";


type SignupPayload = {
  email: string;
  password: string;
  full_name: string;
  role: UserRole;
  company_name?: string;
  location?: string;
  skills?: string[];
  experience_level?: ExperienceLevel;
  preferences?: Record<string, unknown>;
};

type AuthState = {
  user: User | null;
  initializing: boolean;
  bootstrap: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<{ verificationEmail: string | null }>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  initializing: true,
  bootstrap: async () => {
    if (!get().initializing) return;
    try {
      const session = await restoreSession();
      set({ user: session?.user ?? null, initializing: false });
    } catch {
      set({ user: null, initializing: false });
    }
  },
  login: async (email, password) => {
    const session = await createSession("login", { email, password });
    set({ user: session.user, initializing: false });
  },
  signup: async (payload) => {
    const result = await createAccount(payload);
    if ("requires_email_verification" in result) {
      set({ user: null, initializing: false });
      return { verificationEmail: result.email };
    }
    set({ user: result.user, initializing: false });
    return { verificationEmail: null };
  },
  logout: async () => {
    await destroySession();
    set({ user: null, initializing: false });
  },
}));
