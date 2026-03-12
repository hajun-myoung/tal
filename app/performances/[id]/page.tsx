import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  getPerformanceById,
  getArtistByName,
  getVenueByName,
  performances,
} from "@/lib/data";

export function generateStaticParams() {
  return performances.map((performance) => ({
    id: performance.id,
  }));
}

export default async function PerformanceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const performance = getPerformanceById(id);

  if (!performance) return notFound();

  const artist = getArtistByName(performance.artist);
  const venue = getVenueByName(performance.venue);

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <Breadcrumbs
        items={[
          { label: "홈", href: "/" },
          { label: "공연", href: "/performances" },
          { label: performance.title },
        ]}
      />

      <div>
        <p className="text-sm text-neutral-500">공연 상세</p>
        <h1 className="text-3xl font-bold">{performance.title}</h1>
      </div>

      <div className="rounded-2xl border p-5">
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="font-semibold">아티스트</dt>
            <dd>
              {artist ? (
                <Link href={`/artists/${artist.id}`} className="underline">
                  {performance.artist}
                </Link>
              ) : (
                performance.artist
              )}
            </dd>
          </div>

          <div>
            <dt className="font-semibold">공연장</dt>
            <dd>
              {venue ? (
                <Link href={`/venues/${venue.id}`} className="underline">
                  {performance.venue}
                </Link>
              ) : (
                performance.venue
              )}
            </dd>
          </div>

          <div>
            <dt className="font-semibold">출처</dt>
            <dd>
              <a
                href={performance.source}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                원문 보기
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        {artist && (
          <Link
            href={`/artists/${artist.id}`}
            className="rounded-2xl border p-4 transition hover:shadow-sm"
          >
            <p className="text-sm text-neutral-500">예술가 상세로 이동</p>
            <div className="mt-1 font-semibold">{artist.name}</div>
            <div className="text-sm text-neutral-500">
              {artist.genre} · {artist.city}
            </div>
          </Link>
        )}

        {venue && (
          <Link
            href={`/venues/${venue.id}`}
            className="rounded-2xl border p-4 transition hover:shadow-sm"
          >
            <p className="text-sm text-neutral-500">공연장 상세로 이동</p>
            <div className="mt-1 font-semibold">{venue.name}</div>
            <div className="text-sm text-neutral-500">{venue.city}</div>
          </Link>
        )}
      </section>
    </article>
  );
}
