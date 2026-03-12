import { artists } from "@/lib/data";
import { ArtistCard } from "@/components/artist-card";
import { ArtistFilters } from "@/components/artist-filters";
import { ActiveArtistFilterBadges } from "@/components/active-artist-filter-badges";
import {
  filterArtists,
  sortArtists,
  getArtistFilterOptions,
} from "@/lib/filters";

type SearchParams = Promise<{
  query?: string;
  city?: string;
  genre?: string;
  sort?: string;
}>;

export default async function ArtistsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const {
    query = "",
    city = "",
    genre = "",
    sort = "name-asc",
  } = await searchParams;

  const filtered = filterArtists({
    artists,
    query,
    city,
    genre,
  });

  const sorted = sortArtists(filtered, sort);
  const { cities, genres } = getArtistFilterOptions(artists);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">예술가</h1>
        <p className="mt-2 text-sm text-neutral-500">
          전통연희 예술가를 검색하고 필터링해보세요.
        </p>
      </div>

      <ArtistFilters cities={cities} genres={genres} />

      <ActiveArtistFilterBadges
        query={query}
        city={city}
        genre={genre}
        sort={sort}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-600">
          검색 결과 <span className="font-semibold">{sorted.length}</span>명
        </p>
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-2xl border p-8 text-center text-neutral-500">
          조건에 맞는 예술가가 없습니다.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((item) => (
            <ArtistCard key={item.id} artist={item} />
          ))}
        </div>
      )}
    </div>
  );
}
