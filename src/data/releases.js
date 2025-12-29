const DEFAULT_RELEASES = [
  {
    id: 1,
    title: "Release Title",
    artist: "Artist Name",
    cover: "/covers/sample.jpg",
    link: "#",
  },
];

export function getReleases() {
  const stored = localStorage.getItem("releases");
  return stored ? JSON.parse(stored) : DEFAULT_RELEASES;
}

export function saveReleases(releases) {
  localStorage.setItem("releases", JSON.stringify(releases));
}
