import { Suspense } from "react";
import Link from "next/link";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-2 font-bold">
          <span aria-hidden className="text-xl">
            🚚
          </span>
          <span className="truncate">
            Checklist<span className="hidden sm:inline"> Veicular</span>
          </span>
        </Link>
        {/* usePathname suspende em rotas dinâmicas durante o prerender */}
        <Suspense fallback={null}>
          <NavLinks />
        </Suspense>
      </div>
    </header>
  );
}
