import Link from "next/link";
import type { Performance } from "@/lib/types";

export function PerformanceCard({ performance }: { performance: Performance }) {
  return (
    <Link
      href={`/performances/${performance.id}`}
      className="block rounded-2xl border p-4 transition hover:shadow-sm"
    >
      <p className="text-xs text-neutral-500">공연</p>
      <h3 className="mt-1 text-lg font-semibold">{performance.title}</h3>
      <p className="mt-2 text-sm text-neutral-700">{performance.artist}</p>
      <p className="text-sm text-neutral-500">{performance.venue}</p>
      <p className="mt-3 text-sm underline">상세 보기</p>
    </Link>
  );
}
