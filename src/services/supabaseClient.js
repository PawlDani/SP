// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sasfamsisqjoiphtnbxj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhc2ZhbXNpc3Fqb2lwaHRuYnhqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwOTMzNTMwMCwiZXhwIjoyMDI0OTExMzAwfQ.g29EwsIUCXQr0GPLfzU4nhFTZvF_-UjXdfPocNAsFf8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
