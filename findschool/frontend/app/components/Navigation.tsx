'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, Search, UserCircle } from 'lucide-react';

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/ecoles', label: 'Ecoles' },
  { href: '/formations', label: 'Formations' },
  { href: '/about', label: 'A propos' },
  { href: '/orientation', label: 'Orientation' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="bg-slate-950 px-4 py-2 text-center text-sm font-bold text-white">
        GoSchool est un site dynamique React: explore les pages Ecoles, Formations, Orientation, Contact.
      </div>
      <nav className="mx-auto grid max-w-7xl gap-3 px-4 py-3 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-950">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-700 text-white">
              <GraduationCap className="h-6 w-6" />
            </span>
            <span className="text-2xl">GoSchool</span>
          </Link>
          <Link
            href="/auth/login"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-300 px-3 text-sm font-bold text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 lg:hidden"
            title="Mon compte"
          >
            <UserCircle className="h-4 w-4" />
            Mon compte
          </Link>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 lg:justify-center lg:pb-0">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-bold transition ${
                isActive(link.href)
                  ? 'bg-blue-700 text-white'
                  : 'bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center justify-end gap-2 lg:flex">
          <Link
            href="/ecoles"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 text-sm font-bold text-white hover:bg-emerald-700"
          >
            <Search className="h-4 w-4" />
            Rechercher
          </Link>
          <Link
            href="/auth/login"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 text-sm font-bold text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            title="Mon compte"
          >
            <UserCircle className="h-4 w-4" />
            Mon compte
          </Link>
        </div>
      </nav>
    </header>
  );
}
