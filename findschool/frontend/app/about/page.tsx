import Link from 'next/link';
import { ArrowRight, CheckCircle2, Compass, ShieldCheck, Users } from 'lucide-react';

const values = [
  {
    title: 'Orientation utile',
    text: 'Nous partons du profil de chaque eleve pour proposer des pistes adaptees.',
    icon: Compass,
  },
  {
    title: 'Informations comparables',
    text: 'Ville, niveau, programmes, avis et contacts sont presentes simplement.',
    icon: CheckCircle2,
  },
  {
    title: 'Confiance et transparence',
    text: 'Les donnees personnelles servent uniquement a ameliorer l orientation.',
    icon: ShieldCheck,
  },
];

export default function About() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="border-b border-slate-200 bg-blue-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="font-bold text-blue-700">A propos de GoSchool</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            Rendre l orientation scolaire plus simple, plus lisible et plus accessible.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
            GoSchool aide les eleves, parents et professionnels a comparer les ecoles,
            formations et parcours en Afrique francophone, avec une experience inspiree des
            meilleures plateformes d orientation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <article key={value.title} className="rounded-lg border border-slate-200 p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-black">{value.title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{value.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 font-bold text-emerald-300">
              <Users className="h-5 w-5" />
              Pour les familles et les etablissements
            </p>
            <h2 className="mt-2 text-3xl font-black">GoSchool construit le pont entre les projets et les ecoles.</h2>
          </div>
          <Link
            href="/onboarding"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 font-black text-white hover:bg-emerald-700"
          >
            Commencer
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
