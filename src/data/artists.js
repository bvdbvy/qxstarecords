import { supabase } from "../supabase";

export async function addArtist(data) {
  const { error } = await supabase.from("artists").insert([data]);
  if (error) throw error;
}

export async function getArtists() {
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getArtistById(id) {
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function updateArtist(id, updates) {
  const { error } = await supabase
    .from("artists")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteArtist(id) {
  const { error } = await supabase
    .from("artists")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
