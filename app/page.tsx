import Link from "next/link";
import { artists, performances, venues } from "@/lib/data";
import { PerformanceCard } from "@/components/performance-card";
import { ArtistCard } from "@/components/artist-card";
import { VenueCard } from "@/components/venue-card";

export default function HomePage() {
  const featuredPerformances = performances.slice(0, 3);
  const featuredArtists = artists.slice(0, 6);
  const featuredVenues = venues.slice(0, 4);

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-neutral-100 p-6">
        <p className="mb-2 text-sm text-neutral-500">
          전통연희 공연 발견 플랫폼
        </p>
        <h1 className="text-3xl font-bold">전통연희 공연을 한곳에서</h1>
        <p className="mt-3 text-neutral-700">
          공연, 예술가, 공연장을 탐색할 수 있는 MVP 웹앱
        </p>
        <p className="mt-2 text-neutral-700">버그 제보, 데이터 추가 요청은</p>
        <p className="mt-0 text-neutral-700">
          fe.dev.denver@gmail.com 로 부탁드립니다
        </p>

        <div className="mt-5 flex gap-3">
          <Link
            href="/performances"
            className="rounded-xl bg-black px-4 py-2 text-white"
          >
            공연 보러가기
          </Link>
          <Link href="/artists" className="rounded-xl border px-4 py-2">
            예술가 보기
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">추천 공연</h2>
          <Link href="/performances" className="text-sm underline">
            전체보기
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featuredPerformances.map((item) => (
            <PerformanceCard key={item.id} performance={item} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">예술가</h2>
          <Link href="/artists" className="text-sm underline">
            전체보기
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredArtists.map((item) => (
            <ArtistCard key={item.id} artist={item} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">공연장</h2>
          <Link href="/venues" className="text-sm underline">
            전체보기
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredVenues.map((item) => (
            <VenueCard key={item.id} venue={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
