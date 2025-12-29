const DEFAULT_ARTISTS = [];

export function getArtists() {
  const stored = localStorage.getItem("artists");
  return stored ? JSON.parse(stored) : DEFAULT_ARTISTS;
}

export function saveArtists(artists) {
  localStorage.setItem("artists", JSON.stringify(artists));
}
