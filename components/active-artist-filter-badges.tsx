"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  query?: string;
  city?: string;
  genre?: string;
  sort?: string;
};

export function ActiveArtistFilterBadges({
  query = "",
  city = "",
  genre = "",
  sort = "",
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const removeParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname);
  };

  const badges = [
    query && { key: "query", label: `검색: ${query}` },
    city && { key: "city", label: `지역: ${city}` },
    genre && { key: "genre", label: `장르: ${genre}` },
    sort &&
      sort !== "name-asc" && {
        key: "sort",
        label:
          sort === "name-desc"
            ? "정렬: 이름 내림차순"
            : sort === "city-asc"
              ? "정렬: 지역 오름차순"
              : sort === "genre-asc"
                ? "정렬: 장르 오름차순"
                : "",
      },
  ].filter(Boolean) as { key: string; label: string }[];

  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <button
          key={badge.key}
          type="button"
          onClick={() => removeParam(badge.key)}
          className="rounded-full border px-3 py-1 text-sm"
        >
          {badge.label} ✕
        </button>
      ))}
    </div>
  );
}
