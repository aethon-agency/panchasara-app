import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "⚠️ WARNING: SUPABASE_URL or SUPABASE_KEY is missing in environment variables!",
  );
}

export const supabase = createClient(supabaseUrl || "", supabaseKey || "");

export const checkDBConnected = async () => {
  try {
    const { error } = await supabase.auth.getSession();
    if (error) {
      console.error("❌ Supabase connection test failed:", error.message);
      return false;
    }
    console.log("✅ Supabase client initialized and connected!");
    return true;
  } catch (err: any) {
    console.error("❌ Supabase connection test failed:", err.message);
    return false;
  }
};

export default supabase;
