"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

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

  const createQueryString = useMemo(() => {
    return (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      return params.toString();
    };
  }, [searchParams]);

  const updateParam = (key: string, value: string) => {
    const next = createQueryString(key, value);
    router.replace(`${pathname}?${next}`);
  };

  const resetFilters = () => {
    router.replace(pathname);
  };

  return (
    <div className="rounded-2xl border p-4 space-y-4">
      <div>
        <label htmlFor="query" className="mb-1 block text-sm font-medium">
          검색
        </label>
        <input
          id="query"
          type="text"
          value={query}
          onChange={(e) => updateParam("query", e.target.value)}
          placeholder="공연명, 예술가, 공연장 검색"
          className="w-full rounded-xl border px-3 py-2"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className="mb-1 block text-sm font-medium">
            지역
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => updateParam("city", e.target.value)}
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
            onChange={(e) => updateParam("genre", e.target.value)}
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
