import { supabase } from "../supabase/client";
import type { Language, User } from "../types";

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  language: Language;
}

function createAppUser(
  authUser: {
    id: string;
    email?: string;
    user_metadata?: {
      name?: string;
      language?: Language;
    };
  },
  fallbackName = "User",
  fallbackLanguage: Language = "en",
): User {
  const name =
    authUser.user_metadata?.name?.trim() || fallbackName;

  const email = authUser.email || "";

  const language =
    authUser.user_metadata?.language || fallbackLanguage;

  return {
    id: authUser.id,
    name,
    email,
    language,
    avatarInitials: (name[0] || "U").toUpperCase(),
    monthlyIncomeEstimate: 0,
  };
}

export async function signUp(input: SignUpInput): Promise<User> {
  const { data, error } = await supabase.auth.signUp({
    email: input.email.trim(),
    password: input.password,
    options: {
      data: {
        name: input.name.trim(),
        language: input.language,
      },
    },
  });

  if (error) {
    throw error;
  }

  if (!data.user) {
    throw new Error("Account could not be created.");
  }

  // Create the user's profile in our public profiles table.
  const { error: profileError } = await supabase
    .from("profiles")
    .upsert({
      id: data.user.id,
      full_name: input.name.trim(),
    });

  if (profileError) {
    throw profileError;
  }

  return createAppUser(
    data.user,
    input.name.trim() || "User",
    input.language,
  );
}

export async function login(
  email: string,
  password: string,
): Promise<User> {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

  if (error) {
    throw error;
  }

  if (!data.user) {
    throw new Error("Login failed.");
  }

  return createAppUser(data.user);
}

export async function loginWithGoogle(): Promise<User> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });

  if (error) {
    throw error;
  }

  // OAuth redirects the browser, so this normally won't be reached.
  throw new Error("Redirecting to Google...");
}

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return createAppUser(user);
}