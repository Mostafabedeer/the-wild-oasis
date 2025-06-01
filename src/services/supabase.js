import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ggvrqkucptjbyvnyemtc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdndnJxa3VjcHRqYnl2bnllbXRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MzAwODcsImV4cCI6MjA2MTUwNjA4N30.PRiPHeQIGGR74RIl177VxO4V_4jE1eQpkA7PGmMG3Vc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
