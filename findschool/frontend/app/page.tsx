'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  Search,
  Star,
  Users,
} from 'lucide-react';
import { goschoolListings } from '@/lib/goschool-data';

const categories = [
  'Bac general',
  'Bac technique',
  'BTS',
  'Licence',
  'Informatique',
  'Commerce',
  'Comptabilite',
  'Sante',
  'Langues',
  'Formation pro',
];

const steps = [
  ['Definis ton projet', 'Niveau, ville, domaine, budget et objectif professionnel.'],
  ['Compare les options', 'Ecoles, formations, avis, frais et conditions d admission.'],
  ['Demande des infos', 'Contacte les etablissements qui correspondent a ton profil.'],
  ['Decide sereinement', 'Avance avec une shortlist claire et des criteres visibles.'],
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [city, setCity] = useState('');

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative isolate overflow-hidden bg-blue-50">
        <Image
          src="/goschool-hero.png"
          alt="Etudiants dans un environnement d'apprentissage moderne"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(239,246,255,0.98),rgba(239,246,255,0.9),rgba(239,246,255,0.35))]" />

        <div className="mx-auto grid min-h-[560px] max-w-7xl content-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="font-bold text-blue-700">Orientation scolaire et professionnelle</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Toutes les ecoles pour trouver la bonne.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
              GoSchool compare les ecoles, formations et debouches pour aider chaque eleve a
              choisir un parcours clair, utile et adapte a son projet.
            </p>

            <form className="mt-8 max-w-4xl rounded-lg border border-blue-100 bg-white p-2 shadow-2xl" action="/schools">
              <div className="grid gap-2 lg:grid-cols-[1fr_0.8fr_auto]">
                <label className="grid gap-1 rounded-md border border-slate-200 px-3 py-2">
                  <span className="text-xs font-bold uppercase text-slate-500">Je cherche</span>
                  <input
                    name="formation"
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="BTS, licence, informatique, sante..."
                    className="min-w-0 font-semibold outline-none"
                  />
                </label>
                <label className="grid gap-1 rounded-md border border-slate-200 px-3 py-2">
                  <span className="text-xs font-bold uppercase text-slate-500">Ou ?</span>
                  <select
                    name="ville"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    className="min-w-0 bg-white font-semibold outline-none"
                  >
                    <option value="">Toutes les villes</option>
                    <option>Brazzaville</option>
                    <option>Pointe-Noire</option>
                    <option>Douala</option>
                    <option>Yaounde</option>
                    <option>Dakar</option>
                  </select>
                </label>
                <button
                  type="submit"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 font-bold text-white hover:bg-emerald-700"
                >
                  Trouver ma future ecole
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>

            <div className="mt-6 flex flex-wrap gap-5 font-semibold text-slate-700">
              <span><strong className="text-slate-950">120+</strong> ecoles referencees</span>
              <span><strong className="text-slate-950">4.8/5</strong> satisfaction eleves</span>
              <span><strong className="text-slate-950">Gratuit</strong> pour les familles</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 rounded-lg border border-blue-200 bg-white p-5 shadow-sm">
            <p className="font-bold text-blue-700">Acces rapide</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['Ecoles', '/schools'],
                ['Formations', '/courses'],
                ['Orientation', '/onboarding'],
                ['Mon compte', '/auth/login'],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex min-h-12 items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-4 font-black text-slate-800 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                >
                  {label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-bold text-blue-700">Explorer par categorie</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">Formations les plus recherchees</h2>
            </div>
            <Link href="/schools" className="inline-flex items-center gap-2 font-bold text-blue-700">
              Voir les resultats
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category}
                href="/schools"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-700"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-bold text-blue-700">Decouvre les campus</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">Etablissements recommandes</h2>
            </div>
            <Link href="/auth/signup" className="inline-flex items-center gap-2 font-bold text-blue-700">
              Referencer son etablissement
              <Building2 className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {goschoolListings.map((school) => (
              <article key={school.id} className="rounded-lg border border-slate-200 bg-white p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      {school.city} · {school.type}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-slate-950">{school.name}</h3>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 font-bold text-amber-700">
                    <Star className="h-4 w-4 fill-current" />
                    {school.rating}
                  </span>
                </div>
                <p className="mt-4 leading-7 text-slate-600">
                  {school.programs.slice(0, 4).join(', ')}.
                </p>
                <Link href="/schools" className="mt-5 inline-flex items-center gap-2 font-bold text-blue-700">
                  Voir l etablissement
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-bold text-blue-700">Choisir avec methode</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">Comment GoSchool t oriente</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {steps.map(([title, text], index) => (
              <article key={title} className="border-l-4 border-blue-700 bg-white p-5">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="font-bold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
            <p className="leading-7 text-blue-950">
              <strong>Transparence.</strong> GoSchool classe les resultats selon la pertinence du projet,
              la localisation, les informations disponibles, les avis et la qualite du profil
              etablissement. Le service reste gratuit pour les eleves et familles.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-bold text-blue-700">Conseils orientation</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">Guides utiles pour avancer</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              'Comment choisir une ecole apres le bac ?',
              'Quels debouches apres une formation en informatique ?',
              'Preparer son dossier d inscription sans stress',
            ].map((title) => (
              <article key={title} className="rounded-lg border border-slate-200 bg-white p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-slate-950">{title}</h3>
                <Link href="/about" className="mt-5 inline-flex items-center gap-2 font-bold text-blue-700">
                  Lire le guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 font-bold text-emerald-300">
              <Users className="h-5 w-5" />
              GoSchool
            </p>
            <h2 className="mt-2 text-3xl font-bold">Pret a trouver ta future ecole ?</h2>
          </div>
          <Link
            href="/schools"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 font-bold text-white hover:bg-emerald-700"
          >
            Commencer la recherche
            <CheckCircle2 className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
