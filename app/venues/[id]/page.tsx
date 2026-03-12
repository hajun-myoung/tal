import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getVenueById,
  getPerformancesByVenueName,
  getArtistsByVenueName,
  venues,
} from "@/lib/data";

export function generateStaticParams() {
  return venues.map((venue) => ({
    id: venue.id,
  }));
}

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const venue = getVenueById(id);

  if (!venue) return notFound();

  const relatedPerformances = getPerformancesByVenueName(venue.name);
  const relatedArtists = getArtistsByVenueName(venue.name);

  return (
    <article className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-sm text-neutral-500">공연장 상세</p>
        <h1 className="text-3xl font-bold">{venue.name}</h1>
        <p className="mt-2 text-neutral-600">{venue.city}</p>
      </div>

      <div className="rounded-2xl border p-5">
        <a
          href={venue.source}
          target="_blank"
          rel="noreferrer"
          className="text-sm underline"
        >
          공식 출처 방문
        </a>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">이 공연장에서 열리는 공연</h2>
        {relatedPerformances.length === 0 ? (
          <p className="text-sm text-neutral-500">
            연결된 공연이 아직 없습니다.
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
                <div className="text-sm text-neutral-500">{item.artist}</div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">관련 예술가</h2>
        {relatedArtists.length === 0 ? (
          <p className="text-sm text-neutral-500">
            연결된 예술가가 아직 없습니다.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedArtists.map((artist) => (
              <Link
                key={artist.id}
                href={`/artists/${artist.id}`}
                className="block rounded-xl border p-4"
              >
                <div className="font-medium">{artist.name}</div>
                <div className="text-sm text-neutral-500">
                  {artist.genre} · {artist.city}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </article>
  );
}
