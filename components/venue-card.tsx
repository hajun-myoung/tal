import Link from "next/link";
import type { Venue } from "@/lib/types";

export function VenueCard({ venue }: { venue: Venue }) {
  return (
    <Link
      href={`/venues/${venue.id}`}
      className="block rounded-2xl border p-4 transition hover:shadow-sm"
    >
      <p className="text-xs text-neutral-500">{venue.city}</p>
      <h3 className="mt-1 text-lg font-semibold">{venue.name}</h3>
      <p className="mt-3 text-sm underline">상세 보기</p>
    </Link>
  );
}
