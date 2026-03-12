import Link from "next/link";

type Props = {
  title: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
};

export function HomeSectionHeader({
  title,
  description,
  href,
  hrefLabel = "전체보기",
}: Props) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-neutral-500">{description}</p>
        )}
      </div>

      {href && (
        <Link
          href={href}
          className="shrink-0 text-sm font-medium text-neutral-700 underline-offset-4 hover:underline"
        >
          {hrefLabel}
        </Link>
      )}
    </div>
  );
}
