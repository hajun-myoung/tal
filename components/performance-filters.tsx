"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  cities: string[];
  genres: string[];
};

export function PerformanceFilters({ cities, genres }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const query = searchParams.get("query") ?? "";
  const city = searchParams.get("city") ?? "";
  const genre = searchParams.get("genre") ?? "";
  const sort = searchParams.get("sort") ?? "title-asc";

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
        <label htmlFor="query" className="mb-1 block text-sm font-medium">
          검색
        </label>
        <input
          id="query"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="공연명, 예술가, 공연장 검색"
          className="w-full rounded-xl border px-3 py-2"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label htmlFor="city" className="mb-1 block text-sm font-medium">
            지역
          </label>
          <select
            id="city"
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
          <label htmlFor="genre" className="mb-1 block text-sm font-medium">
            장르
          </label>
          <select
            id="genre"
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
          <label htmlFor="sort" className="mb-1 block text-sm font-medium">
            정렬
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => updateParams({ sort: e.target.value })}
            className="w-full rounded-xl border px-3 py-2"
          >
            <option value="title-asc">제목 오름차순</option>
            <option value="title-desc">제목 내림차순</option>
            <option value="artist-asc">예술가 오름차순</option>
            <option value="artist-desc">예술가 내림차순</option>
            <option value="venue-asc">공연장 오름차순</option>
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
