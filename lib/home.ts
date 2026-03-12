import type { Venue } from "@/lib/types";

export function groupVenuesByCity(venues: Venue[]) {
  const grouped = new Map<string, Venue[]>();

  for (const venue of venues) {
    const city = venue.city || "기타";

    if (!grouped.has(city)) {
      grouped.set(city, []);
    }

    grouped.get(city)!.push(venue);
  }

  return Array.from(grouped.entries())
    .sort((a, b) => a[0].localeCompare(b[0], "ko"))
    .map(([city, items]) => ({
      city,
      venues: items.sort((a, b) => a.name.localeCompare(b.name, "ko")),
    }));
}
