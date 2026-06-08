'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, GraduationCap, X } from 'lucide-react';

const profiles = ['Collegien', 'Lyceen', 'Etudiant', 'Salarie en poste', "En recherche d'emploi"];
const classes = ['Terminale', 'Premiere', 'Seconde'];

export default function OnboardingPage() {
  const [step, setStep] = useState<'profile' | 'class'>('profile');
  const [profile, setProfile] = useState('');
  const [schoolClass, setSchoolClass] = useState('');

  const canContinue = step === 'profile' ? Boolean(profile) : Boolean(schoolClass);

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-[#0b003d]">
      <section className="relative mx-auto min-h-[760px] max-w-5xl px-2 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="absolute right-2 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
          aria-label="Fermer"
        >
          <X className="h-6 w-6" />
        </Link>

        <GraduationCap className="absolute right-14 top-4 hidden h-16 w-16 text-violet-700 sm:block" />

        {step === 'profile' ? (
          <>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-normal sm:text-5xl">
              Hello, quel est ton profil ?
            </h1>
            <p className="mt-8 text-2xl text-slate-500">
              C&apos;est pour te proposer les ecoles adaptees a ton niveau.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {profiles.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setProfile(item)}
                  className={`grid min-h-40 place-items-center rounded-3xl border px-5 text-center text-2xl font-black transition ${
                    profile === item
                      ? 'border-violet-700 bg-violet-50 text-violet-800 shadow-[0_0_0_4px_rgba(109,24,255,0.12)]'
                      : 'border-violet-100 bg-[#fbfaff] hover:border-violet-400'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-28 flex justify-end">
              <button
                type="button"
                disabled={!canContinue}
                onClick={() => setStep('class')}
                className="inline-flex min-h-[76px] items-center justify-center gap-3 rounded-full bg-[#f0edf6] px-10 text-2xl font-black text-[#9690ad] disabled:opacity-60 enabled:bg-violet-700 enabled:text-white"
              >
                Suivant
                <ArrowRight className="h-7 w-7" />
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-normal sm:text-5xl">
              En quelle classe es-tu ?
            </h1>
            <p className="mt-8 text-2xl text-slate-500">
              C&apos;est pour te proposer les ecoles adaptees a ton niveau.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {classes.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSchoolClass(item)}
                  className={`grid min-h-40 place-items-center rounded-3xl border px-5 text-center text-2xl font-black transition ${
                    schoolClass === item
                      ? 'border-violet-700 bg-violet-50 text-violet-800 shadow-[0_0_0_4px_rgba(109,24,255,0.12)]'
                      : 'border-violet-100 bg-[#fbfaff] hover:border-violet-400'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-28 flex flex-col justify-between gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => setStep('profile')}
                className="inline-flex min-h-[76px] items-center justify-center gap-3 rounded-full bg-[#c9c2df] px-10 text-2xl font-black"
              >
                <ArrowLeft className="h-7 w-7" />
                Precedent
              </button>
              <Link
                href={`/schools?profile=${encodeURIComponent(profile)}&class=${encodeURIComponent(schoolClass)}`}
                className={`inline-flex min-h-[76px] items-center justify-center gap-3 rounded-full px-10 text-2xl font-black ${
                  canContinue ? 'bg-violet-700 text-white' : 'pointer-events-none bg-[#f0edf6] text-[#9690ad]'
                }`}
              >
                Suivant
                <ArrowRight className="h-7 w-7" />
              </Link>
            </div>
          </>
        )}

        <p className="mt-20 text-base text-[#0b003d]">
          <strong>GoSchool a une politique stricte d&apos;utilisation des donnees personnelles.</strong>{' '}
          Elles ne seront utilisees que dans le cadre de ton orientation. Lis notre{' '}
          <Link href="/about" className="underline">
            politique de protection des donnees
          </Link>
        </p>
      </section>
    </main>
  );
}
