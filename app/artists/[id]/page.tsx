import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getArtistById,
  getPerformancesByArtistName,
  getVenuesByArtistName,
  artists,
} from "@/lib/data";

export function generateStaticParams() {
  return artists.map((artist) => ({
    id: artist.id,
  }));
}

export default async function ArtistDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artist = getArtistById(id);

  if (!artist) return notFound();

  const relatedPerformances = getPerformancesByArtistName(artist.name);
  const relatedVenues = getVenuesByArtistName(artist.name);

  return (
    <article className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-sm text-neutral-500">{artist.city}</p>
        <h1 className="text-3xl font-bold">{artist.name}</h1>
        <p className="mt-2 text-neutral-700">{artist.genre}</p>
        {artist.note && <p className="mt-3 text-neutral-600">{artist.note}</p>}
      </div>

      <div className="rounded-2xl border p-5">
        <a
          href={artist.source}
          target="_blank"
          rel="noreferrer"
          className="text-sm underline"
        >
          공식 출처 방문
        </a>
      </div>

      <section>
        <h2 className="mb-3 text-xl font-semibold">관련 공연</h2>
        {relatedPerformances.length === 0 ? (
          <p className="text-sm text-neutral-500">
            연결된 공연 데이터가 아직 없습니다.
          </p>
        ) : (
          <div className="space-y-3">
            {relatedPerformances.map((item) => (
              <Link
                key={item.id}
                href={`/performances/${item.id}`}
                className="block rounded-xl border p-4"
              >
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-neutral-500">{item.venue}</div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">주요 공연장</h2>
        {relatedVenues.length === 0 ? (
          <p className="text-sm text-neutral-500">
            연결된 공연장이 아직 없습니다.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedVenues.map((venue) => (
              <Link
                key={venue.id}
                href={`/venues/${venue.id}`}
                className="block rounded-xl border p-4"
              >
                <div className="font-medium">{venue.name}</div>
                <div className="text-sm text-neutral-500">{venue.city}</div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </article>
  );
}
