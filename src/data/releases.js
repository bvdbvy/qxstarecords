import { supabase } from "../supabase";

export async function addRelease(data) {
  const { error } = await supabase.from("releases").insert([data]);
  if (error) throw error;
}

export async function getReleases() {
  const { data, error } = await supabase
    .from("releases")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getReleaseById(id) {
  const { data, error } = await supabase
    .from("releases")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function updateRelease(id, updates) {
  const { error } = await supabase
    .from("releases")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteRelease(id) {
  const { error } = await supabase
    .from("releases")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
