"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  cities: string[];
  genres: string[];
};

export function ArtistFilters({ cities, genres }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const query = searchParams.get("query") ?? "";
  const city = searchParams.get("city") ?? "";
  const genre = searchParams.get("genre") ?? "";
  const sort = searchParams.get("sort") ?? "name-asc";

  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== query) {
        updateParams({ query: searchInput });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, query, pathname, router, searchParams]);

  const resetFilters = () => {
    router.replace(pathname);
  };

  return (
    <div className="space-y-4 rounded-2xl border p-4">
      <div>
        <label
          htmlFor="artist-query"
          className="mb-1 block text-sm font-medium"
        >
          검색
        </label>
        <input
          id="artist-query"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="예술가명, 장르, 지역 검색"
          className="w-full rounded-xl border px-3 py-2"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label
            htmlFor="artist-city"
            className="mb-1 block text-sm font-medium"
          >
            지역
          </label>
          <select
            id="artist-city"
            value={city}
            onChange={(e) => updateParams({ city: e.target.value })}
            className="w-full rounded-xl border px-3 py-2"
          >
            <option value="">전체</option>
            {cities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="artist-genre"
            className="mb-1 block text-sm font-medium"
          >
            장르
          </label>
          <select
            id="artist-genre"
            value={genre}
            onChange={(e) => updateParams({ genre: e.target.value })}
            className="w-full rounded-xl border px-3 py-2"
          >
            <option value="">전체</option>
            {genres.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="artist-sort"
            className="mb-1 block text-sm font-medium"
          >
            정렬
          </label>
          <select
            id="artist-sort"
            value={sort}
            onChange={(e) => updateParams({ sort: e.target.value })}
            className="w-full rounded-xl border px-3 py-2"
          >
            <option value="name-asc">이름 오름차순</option>
            <option value="name-desc">이름 내림차순</option>
            <option value="city-asc">지역 오름차순</option>
            <option value="genre-asc">장르 오름차순</option>
          </select>
        </div>
      </div>

      <button
        type="button"
        onClick={resetFilters}
        className="rounded-xl border px-4 py-2 text-sm"
      >
        필터 초기화
      </button>
    </div>
  );
}
