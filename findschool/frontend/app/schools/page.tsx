'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, MapPin, Search, SlidersHorizontal, Star } from 'lucide-react';
import type { GoSchoolListing } from '@/lib/goschool-data';

const cities = ['', 'Brazzaville', 'Pointe-Noire', 'Douala', 'Yaounde', 'Dakar'];

export default function SchoolsPage() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [schools, setSchools] = useState<GoSchoolListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadSchools() {
      setLoading(true);
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (city) params.set('city', city);

      const response = await fetch(`/api/schools?${params.toString()}`, {
        signal: controller.signal,
      });
      const payload = await response.json();
      setSchools(payload.data ?? []);
      setLoading(false);
    }

    loadSchools().catch((error) => {
      if (error.name !== 'AbortError') {
        setSchools([]);
        setLoading(false);
      }
    });

    return () => controller.abort();
  }, [query, city]);

  const resultLabel = useMemo(() => {
    if (loading) return 'Recherche en cours...';
    if (schools.length === 0) return 'Aucun etablissement trouve';
    return `${schools.length} etablissement${schools.length > 1 ? 's' : ''} trouve${schools.length > 1 ? 's' : ''}`;
  }, [loading, schools.length]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="font-bold text-blue-700">Comparer les etablissements</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-black leading-tight tracking-normal sm:text-5xl">
            Trouve une ecole adaptee a ton projet.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Recherche par formation, ville ou niveau, puis compare les programmes, les avis et les
            informations essentielles.
          </p>

          <div className="mt-8 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 lg:grid-cols-[1fr_280px_auto]">
            <label className="flex min-h-14 items-center gap-3 rounded-md border border-slate-200 bg-white px-4">
              <Search className="h-5 w-5 text-slate-500" />
              <span className="sr-only">Rechercher</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Informatique, BTS, Terminale, commerce..."
                className="min-w-0 flex-1 bg-transparent font-semibold outline-none"
              />
            </label>
            <label className="flex min-h-14 items-center gap-3 rounded-md border border-slate-200 bg-white px-4">
              <MapPin className="h-5 w-5 text-slate-500" />
              <span className="sr-only">Ville</span>
              <select
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="min-w-0 flex-1 bg-white font-semibold outline-none"
              >
                {cities.map((item) => (
                  <option key={item || 'all'} value={item}>
                    {item || 'Toutes les villes'}
                  </option>
                ))}
              </select>
            </label>
            <div className="inline-flex min-h-14 items-center justify-center gap-2 rounded-md bg-blue-700 px-5 font-bold text-white">
              <SlidersHorizontal className="h-5 w-5" />
              {resultLabel}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {schools.map((school) => (
            <article key={school.id} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="inline-flex items-center gap-2 text-sm font-bold text-slate-500">
                    <Building2 className="h-4 w-4 text-blue-700" />
                    {school.type}
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-slate-950">{school.name}</h2>
                  <p className="mt-1 flex items-center gap-2 font-semibold text-slate-600">
                    <MapPin className="h-4 w-4 text-emerald-700" />
                    {school.city}, {school.country}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 font-black text-amber-700">
                  <Star className="h-4 w-4 fill-current" />
                  {school.rating}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {school.programs.map((program) => (
                  <span key={program} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
                    {program}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
                <p className="text-sm font-semibold text-slate-500">{school.reviews} avis verifies</p>
                <Link href="/auth/login" className="inline-flex items-center gap-2 font-black text-blue-700">
                  Demander des infos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
