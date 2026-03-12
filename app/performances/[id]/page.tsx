import { notFound } from "next/navigation";
import { getPerformanceById } from "@/lib/data";

export default async function PerformanceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const performance = getPerformanceById(id);

  if (!performance) return notFound();

  return (
    <article className="mx-auto max-w-3xl space-y-4">
      <p className="text-sm text-neutral-500">공연 상세</p>
      <h1 className="text-3xl font-bold">{performance.title}</h1>

      <div className="rounded-2xl border p-5">
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="font-semibold">아티스트</dt>
            <dd>{performance.artist}</dd>
          </div>
          <div>
            <dt className="font-semibold">공연장</dt>
            <dd>{performance.venue}</dd>
          </div>
          <div>
            <dt className="font-semibold">출처</dt>
            <dd>
              <a
                href={performance.source}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                원문 보기
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
