import { supabase } from "../supabase";

export async function getSubmissions() {
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addSubmission(submission) {
  const { error } = await supabase
    .from("submissions")
    .insert([submission]);

  if (error) throw error;
}

export async function deleteSubmission(id) {
  const { error } = await supabase
    .from("submissions")
    .delete()
    .eq("id", id);

  if (error) throw error;
}