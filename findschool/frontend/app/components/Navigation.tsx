'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, GraduationCap, LogIn, Menu, Search, UserPlus, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '/schools', label: 'Ecoles' },
  { href: '/courses', label: 'Cours' },
  { href: '/about', label: 'A propos' },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-950">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-700 text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-xl">GoSchool</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                isActive(link.href)
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/auth/login"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            title="Connexion"
          >
            <LogIn className="h-4 w-4" />
            Connexion
          </Link>
          <Link
            href="/auth/signup"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 text-sm font-semibold text-white hover:bg-blue-800"
            title="Creer un compte"
          >
            <UserPlus className="h-4 w-4" />
            Inscription
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <div className="grid gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-md px-3 py-3 font-semibold ${
                  isActive(link.href) ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/schools"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-3 font-semibold text-slate-800"
            >
              <Search className="h-4 w-4" />
              Rechercher
            </Link>
            <Link
              href="/courses"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-3 font-semibold text-slate-800"
            >
              <BookOpen className="h-4 w-4" />
              Voir les cours
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
