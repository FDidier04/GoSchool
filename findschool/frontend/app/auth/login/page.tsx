'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, X } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useAppStore } from '@/lib/store';

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiClient.login(formData.phone, formData.password);

      if (response.success) {
        localStorage.setItem('auth_token', response.data!.token);

        setUser({
          id: '1',
          email: formData.phone,
          fullName: 'Utilisateur GoSchool',
          role: 'student',
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        router.push('/onboarding');
      } else {
        setError(response.error || 'Connexion impossible');
      }
    } catch (requestError: any) {
      setError(requestError.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-200/70 px-4 py-6">
      <section className="relative mx-auto min-h-[calc(100vh-3rem)] max-w-3xl overflow-y-auto rounded-b-2xl bg-white px-6 py-12 shadow-2xl sm:px-12 lg:px-14">
        <Link
          href="/"
          className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
          aria-label="Fermer"
        >
          <X className="h-6 w-6" />
        </Link>

        <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-normal text-black sm:text-5xl">
          Connecte-toi et retrouve ta recherche !
        </h1>
        <p className="mt-10 text-right text-lg text-slate-500">
          Les champs marques d&apos;un <span className="text-red-500">*</span> sont obligatoires
        </p>

        {error && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="mb-3 block text-xl font-black text-black">
              Numero de telephone <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-[86px_1fr]">
              <div className="flex min-h-16 items-center justify-center rounded-l-3xl border border-r-0 border-violet-200 bg-violet-50 font-black text-slate-700">
                CG
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="min-h-16 min-w-0 rounded-r-3xl border border-violet-200 px-6 text-xl outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                placeholder="06..."
              />
            </div>
          </div>

          <div>
            <label className="mb-3 block text-xl font-black text-black">
              Mot de passe <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="min-h-16 w-full rounded-3xl border border-violet-200 px-6 text-xl outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              placeholder="Ton mot de passe"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-[72px] w-full items-center justify-center gap-3 rounded-full bg-violet-700 px-6 text-2xl font-black text-white transition hover:bg-violet-800 disabled:opacity-60"
          >
            {loading ? 'Connexion...' : 'Confirmer'}
            <ArrowRight className="h-7 w-7" />
          </button>
        </form>

        <p className="mt-7 text-center text-xl font-bold text-slate-500">
          Pas encore de compte ?{' '}
          <Link href="/auth/signup" className="border-b-2 border-violet-700 text-violet-700">
            Creer un compte
          </Link>
        </p>
      </section>
    </main>
  );
}
