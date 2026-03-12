import Link from "next/link";
import type { Artist } from "@/lib/types";

export function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link
      href={`/artists/${artist.id}`}
      className="block rounded-2xl border p-4 transition hover:shadow-sm"
    >
      <p className="text-xs text-neutral-500">{artist.city}</p>
      <h3 className="mt-1 text-lg font-semibold">{artist.name}</h3>
      <p className="mt-2 text-sm text-neutral-700">{artist.genre}</p>
      {artist.note && (
        <p className="mt-2 line-clamp-2 text-sm text-neutral-500">
          {artist.note}
        </p>
      )}
    </Link>
  );
}
