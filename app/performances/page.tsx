import { performances, artists, venues } from "@/lib/data";
import { PerformanceCard } from "@/components/performance-card";
import { PerformanceFilters } from "@/components/performance-filters";
import { filterPerformances, getPerformanceFilterOptions } from "@/lib/filters";

type SearchParams = Promise<{
  query?: string;
  city?: string;
  genre?: string;
}>;

export default async function PerformancesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { query = "", city = "", genre = "" } = await searchParams;

  const filtered = filterPerformances({
    performances,
    artists,
    venues,
    query,
    city,
    genre,
  });

  const { cities, genres } = getPerformanceFilterOptions(artists, venues);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">공연</h1>
        <p className="mt-2 text-sm text-neutral-500">
          전통연희 공연을 검색하고 필터링해보세요.
        </p>
      </div>

      <PerformanceFilters cities={cities} genres={genres} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-600">
          검색 결과 <span className="font-semibold">{filtered.length}</span>개
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border p-8 text-center text-neutral-500">
          조건에 맞는 공연이 없습니다.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <PerformanceCard key={item.id} performance={item} />
          ))}
        </div>
      )}
    </div>
  );
}
