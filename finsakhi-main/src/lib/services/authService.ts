import { DEMO_USER } from "../mock-data";
import { isSupabaseConfigured } from "../supabase/client";
import type { Language, User } from "../types";

/**
 * No fake security here. Until Supabase Auth is wired up these functions simply
 * return the demo profile so the flow is walkable. They do not validate
 * passwords and must not be treated as authentication.
 */

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  language: Language;
}

export async function signUp(input: SignUpInput): Promise<User> {
  if (isSupabaseConfigured) {
    // const { data, error } = await supabase.auth.signUp({ email, password });
    // await supabase.from("profiles").insert({ id: data.user.id, name, language });
    throw new Error("Supabase auth not yet connected.");
  }
  return {
    ...DEMO_USER,
    name: input.name.trim() || DEMO_USER.name,
    email: input.email.trim() || DEMO_USER.email,
    language: input.language,
    avatarInitials: (input.name.trim()[0] ?? "L").toUpperCase(),
  };
}

export async function login(email: string, _password: string): Promise<User> {
  if (isSupabaseConfigured) {
    // return supabase.auth.signInWithPassword({ email, password })
    throw new Error("Supabase auth not yet connected.");
  }
  return { ...DEMO_USER, email: email.trim() || DEMO_USER.email };
}

export async function loginWithGoogle(): Promise<User> {
  if (isSupabaseConfigured) {
    // return supabase.auth.signInWithOAuth({ provider: "google" })
    throw new Error("Google sign-in not yet connected.");
  }
  return DEMO_USER;
}

export async function logout(): Promise<void> {
  // await supabase?.auth.signOut();
}
