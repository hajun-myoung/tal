import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  posters: string[];
};

export function FeaturedCampaign({
  title,
  subtitle,
  description,
  href,
  posters,
}: Props) {
  return (
    <section className="overflow-hidden rounded-3xl border bg-neutral-50 p-4 sm:p-5 md:p-6">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4 min-w-0">
          <div className="overflow-hidden rounded-2xl border bg-white">
            <div className="relative h-[360px] w-full sm:h-[480px] lg:h-[720px]">
              <Image
                src={posters[0]}
                alt={title}
                fill
                priority
                className="object-contain bg-white"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 50vw"
              />
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory">
            {posters.slice(1).map((src, index) => (
              <div
                key={src}
                className="relative h-[180px] w-[140px] shrink-0 snap-start overflow-hidden rounded-2xl border bg-white sm:h-[220px] sm:w-[170px]"
              >
                <Image
                  src={src}
                  alt={`${title} 포스터 ${index + 2}`}
                  fill
                  className="object-cover"
                  sizes="170px"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center">
          <p className="inline-flex w-fit rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-neutral-600">
            특별 기획전
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-base text-neutral-700 sm:text-lg">
            {subtitle}
          </p>
          <p className="mt-4 text-sm leading-6 text-neutral-600 sm:text-base">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={href}
              className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white"
            >
              기획전 보기
            </Link>
            {/* <Link
              href={`${href}#schedule`}
              className="rounded-xl border px-4 py-2 text-sm font-semibold"
            >
              일정 보기
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
}
