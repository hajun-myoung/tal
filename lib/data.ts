import artistsData from "@/data/artists.json";
import performancesData from "@/data/performances.json";
import venuesData from "@/data/venues.json";
import campaignsData from "@/data/campaigns.json";
import type { Artist, Performance, Venue, Campaign } from "./types";

export const artists = artistsData as Artist[];
export const performances = performancesData as Performance[];
export const venues = venuesData as Venue[];
export const campaigns = campaignsData as Campaign[];

export function getArtistById(id: string) {
  return artists.find((artist) => artist.id === id);
}

export function getPerformanceById(id: string) {
  return performances.find((performance) => performance.id === id);
}

export function getVenueById(id: string) {
  return venues.find((venue) => venue.id === id);
}

export function getArtistByName(name: string) {
  return artists.find((artist) => artist.name === name);
}

export function getVenueByName(name: string) {
  return venues.find((venue) => venue.name === name);
}

export function getPerformancesByArtistName(name: string) {
  return performances.filter((performance) => performance.artist === name);
}

export function getPerformancesByVenueName(name: string) {
  return performances.filter((performance) => performance.venue === name);
}

export function getArtistsByVenueName(name: string) {
  const names = new Set(
    performances
      .filter((performance) => performance.venue === name)
      .map((performance) => performance.artist),
  );

  return artists.filter((artist) => names.has(artist.name));
}

export function getVenuesByArtistName(name: string) {
  const names = new Set(
    performances
      .filter((performance) => performance.artist === name)
      .map((performance) => performance.venue),
  );

  return venues.filter((venue) => names.has(venue.name));
}
