import artistsData from "@/data/artists.json";
import performancesData from "@/data/performances.json";
import venuesData from "@/data/venues.json";
import type { Artist, Performance, Venue } from "./types";

export const artists = artistsData as Artist[];
export const performances = performancesData as Performance[];
export const venues = venuesData as Venue[];

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
