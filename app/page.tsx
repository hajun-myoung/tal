import Link from "next/link";
import { artists, performances, venues } from "@/lib/data";
import { groupVenuesByCity } from "@/lib/home";
import { PerformanceCard } from "@/components/performance-card";
import { ArtistCard } from "@/components/artist-card";
import { HomeSectionHeader } from "@/components/home-section-header";
import { VenueCityGroup } from "@/components/venue-city-group";

export default function HomePage() {
  const featuredPerformances = performances.slice(0, 3);
  const featuredArtists = artists.slice(0, 6);
  const groupedVenues = groupVenuesByCity(venues).slice(0, 3);

  return (
    <div className="space-y-12 pb-12">
      <section className="overflow-hidden rounded-3xl border bg-gradient-to-br from-neutral-950 to-neutral-800 px-6 py-8 text-white sm:px-8 sm:py-10">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-neutral-300">
            전통연희 공연 발견 플랫폼
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
            전통연희 공연과 예술가를
            <br />
            한곳에서 발견하세요
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-300 sm:text-base">
            공연을 찾고, 예술가를 탐색하고, 공연장을 중심으로
            <br />
            전통연희 생태계를 연결하는 MVP 웹앱입니다.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-300 sm:text-base">
            현재 개발중인 앱으로, 부족한 부분이 많습니다.
            <br />
            버그 제보, 데이터 추가 요청 또는
            <br />
            아이디어 제보 및 이 프로젝트에 합류하고 싶으신 분은
            <br />
            fe.dev.denver@gmail.com 으로 부탁드립니다.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/performances"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200"
            >
              공연 둘러보기
            </Link>
            <Link
              href="/artists"
              className="rounded-xl border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              예술가
            </Link>
            <Link
              href="/venues"
              className="rounded-xl border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              공연장
            </Link>
          </div>
        </div>
      </section>

      <section>
        <HomeSectionHeader
          title="추천 공연"
          description="지금 바로 둘러보기 좋은 공연들"
          href="/performances"
        />

        {featuredPerformances.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center text-neutral-500">
            아직 등록된 공연이 없습니다.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredPerformances.map((item) => (
              <PerformanceCard key={item.id} performance={item} />
            ))}
          </div>
        )}
      </section>

      <section>
        <HomeSectionHeader
          title="인기 예술가"
          description="전통연희 예술가와 단체를 탐색해보세요"
          href="/artists"
        />

        {featuredArtists.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center text-neutral-500">
            아직 등록된 예술가가 없습니다.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {featuredArtists.map((item) => (
              <ArtistCard key={item.id} artist={item} />
            ))}
          </div>
        )}
      </section>

      <section>
        <HomeSectionHeader
          title="지역별 공연장"
          description="도시 기준으로 공연장을 빠르게 탐색하세요"
          href="/venues"
        />

        {groupedVenues.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center text-neutral-500">
            아직 등록된 공연장이 없습니다.
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-3">
            {groupedVenues.map((group) => (
              <VenueCityGroup
                key={group.city}
                city={group.city}
                venues={group.venues}
              />
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-4 rounded-3xl border bg-neutral-50 p-5 sm:grid-cols-3">
        <Link
          href="/performances"
          className="rounded-2xl border bg-white p-4 transition hover:shadow-sm"
        >
          <p className="text-sm text-neutral-500">빠른 탐색</p>
          <h3 className="mt-1 text-lg font-semibold">공연 찾기</h3>
          <p className="mt-2 text-sm text-neutral-600">
            공연명, 예술가, 지역으로 검색
          </p>
        </Link>

        <Link
          href="/artists"
          className="rounded-2xl border bg-white p-4 transition hover:shadow-sm"
        >
          <p className="text-sm text-neutral-500">아카이브</p>
          <h3 className="mt-1 text-lg font-semibold">예술가 탐색</h3>
          <p className="mt-2 text-sm text-neutral-600">
            장르와 지역 기준으로 예술가 둘러보기
          </p>
        </Link>

        <Link
          href="/venues"
          className="rounded-2xl border bg-white p-4 transition hover:shadow-sm"
        >
          <p className="text-sm text-neutral-500">장소 중심 탐색</p>
          <h3 className="mt-1 text-lg font-semibold">공연장 보기</h3>
          <p className="mt-2 text-sm text-neutral-600">
            공연장별 공연과 관련 예술가 확인
          </p>
        </Link>
      </section>
    </div>
  );
}
