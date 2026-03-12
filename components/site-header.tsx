import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold flex">
          <Image src="/icon.png" alt="logo" width={28} height={28} />
          탈:TAL
        </Link>

        <nav className="flex gap-4 text-sm">
          <Link href="/performances">공연</Link>
          <Link href="/artists">예술가</Link>
          <Link href="/venues">공연장</Link>
        </nav>
      </div>
    </header>
  );
}
