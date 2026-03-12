import type { Performance, Artist, Venue } from "@/lib/types";

type PerformanceFilterArgs = {
  performances: Performance[];
  artists: Artist[];
  venues: Venue[];
  query?: string;
  city?: string;
  genre?: string;
};

type ArtistFilterArgs = {
  artists: Artist[];
  query?: string;
  city?: string;
  genre?: string;
};

type PerformanceSortKey =
  | "title-asc"
  | "title-desc"
  | "artist-asc"
  | "artist-desc"
  | "venue-asc";

type ArtistSortKey = "name-asc" | "name-desc" | "city-asc" | "genre-asc";

type VenueFilterArgs = {
  venues: Venue[];
  query?: string;
  city?: string;
};

type VenueSortKey = "name-asc" | "name-desc" | "city-asc" | "city-desc";

export function filterPerformances({
  performances,
  artists,
  venues,
  query = "",
  city = "",
  genre = "",
}: PerformanceFilterArgs) {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedCity = city.trim().toLowerCase();
  const normalizedGenre = genre.trim().toLowerCase();

  return performances.filter((performance) => {
    const artist = artists.find((a) => a.name === performance.artist);
    const venue = venues.find((v) => v.name === performance.venue);

    const matchesQuery =
      normalizedQuery === "" ||
      performance.title.toLowerCase().includes(normalizedQuery) ||
      performance.artist.toLowerCase().includes(normalizedQuery) ||
      performance.venue.toLowerCase().includes(normalizedQuery);

    const matchesCity =
      normalizedCity === "" ||
      artist?.city.toLowerCase() === normalizedCity ||
      venue?.city.toLowerCase() === normalizedCity;

    const matchesGenre =
      normalizedGenre === "" ||
      artist?.genre.toLowerCase().includes(normalizedGenre);

    return matchesQuery && matchesCity && matchesGenre;
  });
}

export function sortPerformances(
  performances: Performance[],
  sort: string = "title-asc",
) {
  const copied = [...performances];
  const sortKey = (sort || "title-asc") as PerformanceSortKey;

  switch (sortKey) {
    case "title-desc":
      return copied.sort((a, b) => b.title.localeCompare(a.title, "ko"));
    case "artist-asc":
      return copied.sort((a, b) => a.artist.localeCompare(b.artist, "ko"));
    case "artist-desc":
      return copied.sort((a, b) => b.artist.localeCompare(a.artist, "ko"));
    case "venue-asc":
      return copied.sort((a, b) => a.venue.localeCompare(b.venue, "ko"));
    case "title-asc":
    default:
      return copied.sort((a, b) => a.title.localeCompare(b.title, "ko"));
  }
}

export function getPerformanceFilterOptions(
  artists: Artist[],
  venues: Venue[],
) {
  const cities = Array.from(
    new Set([...artists.map((a) => a.city), ...venues.map((v) => v.city)]),
  )
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "ko"));

  const genres = Array.from(new Set(artists.map((a) => a.genre)))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "ko"));

  return { cities, genres };
}

export function filterArtists({
  artists,
  query = "",
  city = "",
  genre = "",
}: ArtistFilterArgs) {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedCity = city.trim().toLowerCase();
  const normalizedGenre = genre.trim().toLowerCase();

  return artists.filter((artist) => {
    const matchesQuery =
      normalizedQuery === "" ||
      artist.name.toLowerCase().includes(normalizedQuery) ||
      artist.genre.toLowerCase().includes(normalizedQuery) ||
      artist.city.toLowerCase().includes(normalizedQuery) ||
      artist.note?.toLowerCase().includes(normalizedQuery);

    const matchesCity =
      normalizedCity === "" || artist.city.toLowerCase() === normalizedCity;

    const matchesGenre =
      normalizedGenre === "" ||
      artist.genre.toLowerCase().includes(normalizedGenre);

    return matchesQuery && matchesCity && matchesGenre;
  });
}

export function sortArtists(artists: Artist[], sort: string = "name-asc") {
  const copied = [...artists];
  const sortKey = (sort || "name-asc") as ArtistSortKey;

  switch (sortKey) {
    case "name-desc":
      return copied.sort((a, b) => b.name.localeCompare(a.name, "ko"));
    case "city-asc":
      return copied.sort((a, b) => a.city.localeCompare(b.city, "ko"));
    case "genre-asc":
      return copied.sort((a, b) => a.genre.localeCompare(b.genre, "ko"));
    case "name-asc":
    default:
      return copied.sort((a, b) => a.name.localeCompare(b.name, "ko"));
  }
}

export function getArtistFilterOptions(artists: Artist[]) {
  const cities = Array.from(new Set(artists.map((artist) => artist.city)))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "ko"));

  const genres = Array.from(new Set(artists.map((artist) => artist.genre)))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "ko"));

  return { cities, genres };
}

export function filterVenues({
  venues,
  query = "",
  city = "",
}: VenueFilterArgs) {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedCity = city.trim().toLowerCase();

  return venues.filter((venue) => {
    const matchesQuery =
      normalizedQuery === "" ||
      venue.name.toLowerCase().includes(normalizedQuery) ||
      venue.city.toLowerCase().includes(normalizedQuery);

    const matchesCity =
      normalizedCity === "" || venue.city.toLowerCase() === normalizedCity;

    return matchesQuery && matchesCity;
  });
}

export function sortVenues(venues: Venue[], sort: string = "name-asc") {
  const copied = [...venues];
  const sortKey = (sort || "name-asc") as VenueSortKey;

  switch (sortKey) {
    case "name-desc":
      return copied.sort((a, b) => b.name.localeCompare(a.name, "ko"));
    case "city-asc":
      return copied.sort((a, b) => a.city.localeCompare(b.city, "ko"));
    case "city-desc":
      return copied.sort((a, b) => b.city.localeCompare(a.city, "ko"));
    case "name-asc":
    default:
      return copied.sort((a, b) => a.name.localeCompare(b.name, "ko"));
  }
}

export function getVenueFilterOptions(venues: Venue[]) {
  const cities = Array.from(new Set(venues.map((venue) => venue.city)))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "ko"));

  return { cities };
}
