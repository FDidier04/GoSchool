import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, GraduationCap, Layers3, School } from 'lucide-react';

const programs = [
  {
    title: 'Secondaire general',
    level: 'College - Lycee',
    text: 'Series A, C, D et accompagnement vers le bac.',
    icon: School,
  },
  {
    title: 'Secondaire technique',
    level: 'Lycee technique',
    text: 'G2, G3, F1, F2, informatique, gestion et industrie.',
    icon: Layers3,
  },
  {
    title: 'BTS et formations pro',
    level: 'Post-bac',
    text: 'Comptabilite, commerce, digital, secretariat et entrepreneuriat.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Cours de soutien',
    level: 'Tous niveaux',
    text: 'Preparation examens, langues, methodologie et remise a niveau.',
    icon: GraduationCap,
  },
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="font-bold text-emerald-300">Formations GoSchool</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
            Explore les parcours qui correspondent a ton niveau.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            GoSchool t'aide a comprendre les options disponibles, comparer les etablissements
            et avancer vers une decision claire.
          </p>
          <Link
            href="/onboarding"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-md bg-emerald-600 px-5 font-black text-white hover:bg-emerald-700"
          >
            Demarrer mon orientation
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <article key={program.title} className="rounded-lg border border-slate-200 p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="font-bold text-emerald-700">{program.level}</p>
                <h2 className="mt-2 text-2xl font-black">{program.title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{program.text}</p>
                <Link href="/schools" className="mt-5 inline-flex items-center gap-2 font-black text-blue-700">
                  Voir les ecoles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
