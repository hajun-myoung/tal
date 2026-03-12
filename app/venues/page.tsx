import { venues } from "@/lib/data";
import { VenueCard } from "@/components/venue-card";
import { VenueFilters } from "@/components/venue-filters";
import { ActiveVenueFilterBadges } from "@/components/active-venue-filter-badges";
import { filterVenues, sortVenues, getVenueFilterOptions } from "@/lib/filters";

type SearchParams = Promise<{
  query?: string;
  city?: string;
  sort?: string;
}>;

export default async function VenuesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { query = "", city = "", sort = "name-asc" } = await searchParams;

  const filtered = filterVenues({
    venues,
    query,
    city,
  });

  const sorted = sortVenues(filtered, sort);
  const { cities } = getVenueFilterOptions(venues);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">공연장</h1>
        <p className="mt-2 text-sm text-neutral-500">
          공연장을 검색하고 필터링해보세요.
        </p>
      </div>

      <VenueFilters cities={cities} />

      <ActiveVenueFilterBadges query={query} city={city} sort={sort} />

      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-600">
          검색 결과 <span className="font-semibold">{sorted.length}</span>개
        </p>
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-2xl border p-8 text-center text-neutral-500">
          조건에 맞는 공연장이 없습니다.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((item) => (
            <VenueCard key={item.id} venue={item} />
          ))}
        </div>
      )}
    </div>
  );
}
