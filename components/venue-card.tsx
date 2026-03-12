import type { Venue } from "@/lib/types";

export function VenueCard({ venue }: { venue: Venue }) {
  return (
    <div className="rounded-2xl border p-4">
      <p className="text-xs text-neutral-500">{venue.city}</p>
      <h3 className="mt-1 text-lg font-semibold">{venue.name}</h3>
      <a
        href={venue.source}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-block text-sm underline"
      >
        공식 출처
      </a>
    </div>
  );
}
