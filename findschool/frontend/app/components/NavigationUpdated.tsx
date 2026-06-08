'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';

export function NavigationUpdated() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const user = useAppStore((state) => state.user);
  
  const isActive = (href: string) => pathname.includes(href);
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    useAppStore.setState({ user: null });
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="font-bold text-2xl text-primary">
              GoSchool
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/schools"
              className={`${
                isActive('/schools') ? 'text-primary font-semibold' : 'text-gray-600'
              } hover:text-primary transition`}
            >
              {t('schools')}
            </Link>
            <Link
              href="/teachers"
              className={`${
                isActive('/teachers') ? 'text-primary font-semibold' : 'text-gray-600'
              } hover:text-primary transition`}
            >
              {t('teachers')}
            </Link>
          </div>

          {/* Auth/User Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-primary transition"
                >
                  {user.fullName}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-danger text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  {t('logout') || 'Logout'}
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-gray-600 hover:text-primary">
                  {t('login')}
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
                >
                  {t('signup')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
