import Link from "next/link";
import type { Venue } from "@/lib/types";

type Props = {
  city: string;
  venues: Venue[];
};

export function VenueCityGroup({ city, venues }: Props) {
  return (
    <section className="rounded-2xl border bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{city}</h3>
        <span className="text-sm text-neutral-500">{venues.length}개</span>
      </div>

      <div className="space-y-2">
        {venues.map((venue) => (
          <Link
            key={venue.id}
            href={`/venues/${venue.id}`}
            className="block rounded-xl border border-neutral-200 px-3 py-3 transition hover:bg-neutral-50"
          >
            <div className="font-medium">{venue.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
