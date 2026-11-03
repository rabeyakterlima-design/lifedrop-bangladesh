import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== "https://your-project.supabase.co" &&
  !supabaseUrl.includes("placeholder")
);

export function createClient() {
  if (!isSupabaseConfigured) {
    // Return dummy or warning client in SSR / preview mode
    return createBrowserClient(
      supabaseUrl || "https://placeholder-lifedrop.supabase.co",
      supabaseAnonKey || "placeholder-anon-key"
    );
  }
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
