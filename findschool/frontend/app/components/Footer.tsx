import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

const columns = [
  {
    title: 'Pages',
    links: [
      ['Accueil', '/'],
      ['Ecoles', '/ecoles'],
      ['Formations', '/formations'],
      ['Orientation', '/orientation'],
      ['Contact', '/contact'],
    ],
  },
  {
    title: 'Compte',
    links: [
      ['Connexion', '/auth/login'],
      ['Inscription', '/auth/signup'],
      ['Tableau de bord', '/dashboard'],
    ],
  },
  {
    title: 'GoSchool',
    links: [
      ['A propos', '/about'],
      ['Referencer une ecole', '/contact'],
      ['Demander des infos', '/ecoles'],
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_2fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 font-black">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-600">
              <GraduationCap className="h-6 w-6" />
            </span>
            <span className="text-2xl">GoSchool</span>
          </Link>
          <p className="mt-4 max-w-sm leading-7 text-slate-300">
            Plateforme dynamique d orientation pour comparer les ecoles, formations et parcours.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="font-black">{column.title}</h2>
              <div className="mt-3 grid gap-2">
                {column.links.map(([label, href]) => (
                  <Link key={href} href={href} className="text-slate-300 hover:text-white">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
