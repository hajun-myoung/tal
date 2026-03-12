import type { Performance, Artist, Venue } from "@/lib/types";

type FilterArgs = {
  performances: Performance[];
  artists: Artist[];
  venues: Venue[];
  query?: string;
  city?: string;
  genre?: string;
};

export function filterPerformances({
  performances,
  artists,
  venues,
  query = "",
  city = "",
  genre = "",
}: FilterArgs) {
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
