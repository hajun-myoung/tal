"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  query?: string;
  city?: string;
  genre?: string;
  sort?: string;
};

export function ActiveFilterBadges({
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
      sort !== "title-asc" && {
        key: "sort",
        label:
          sort === "title-desc"
            ? "정렬: 제목 내림차순"
            : sort === "artist-asc"
              ? "정렬: 예술가 오름차순"
              : sort === "artist-desc"
                ? "정렬: 예술가 내림차순"
                : sort === "venue-asc"
                  ? "정렬: 공연장 오름차순"
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
