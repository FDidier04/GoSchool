import Link from 'next/link';
import { ArrowRight, Building2, Mail, MapPin, Phone, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="font-bold text-emerald-300">Contact GoSchool</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
            Une question, une ecole a referencer ou un partenariat ?
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Contacte l equipe GoSchool pour rejoindre la plateforme, demander une information ou
            proposer un etablissement.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="space-y-4">
          {[
            ['Email', 'contact@goschool.com', Mail],
            ['Telephone', '+242 06 000 00 00', Phone],
            ['Zone', 'Congo, Cameroun, Senegal', MapPin],
            ['Partenaires', 'Ecoles, centres, professeurs', Building2],
          ].map(([title, value, Icon]) => (
            <div key={title as string} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-black text-slate-950">{title as string}</p>
                  <p className="text-slate-600">{value as string}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5">
            <label className="grid gap-2 font-bold text-slate-800">
              Nom complet
              <input className="min-h-12 rounded-md border border-slate-300 px-4 outline-none focus:border-blue-500" />
            </label>
            <label className="grid gap-2 font-bold text-slate-800">
              Telephone ou email
              <input className="min-h-12 rounded-md border border-slate-300 px-4 outline-none focus:border-blue-500" />
            </label>
            <label className="grid gap-2 font-bold text-slate-800">
              Sujet
              <select className="min-h-12 rounded-md border border-slate-300 bg-white px-4 outline-none focus:border-blue-500">
                <option>Je cherche une ecole</option>
                <option>Je veux referencer un etablissement</option>
                <option>Partenariat</option>
                <option>Support compte</option>
              </select>
            </label>
            <label className="grid gap-2 font-bold text-slate-800">
              Message
              <textarea
                rows={5}
                className="rounded-md border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </label>
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-blue-700 px-5 font-black text-white hover:bg-blue-800"
            >
              Envoyer
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </section>

      <section className="bg-blue-50">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <p className="font-bold text-blue-700">Besoin d aller vite ?</p>
            <h2 className="text-2xl font-black">Lance directement ton parcours d orientation.</h2>
          </div>
          <Link href="/orientation" className="inline-flex items-center gap-2 font-black text-blue-700">
            Commencer
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
