import React from 'react';
import { cookies } from 'next/headers';
import { AdminLoginForm } from '@/components/admin/admin-login-form';

export default function AdminLoginPage({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams?: { logout?: string; error?: string };
}) {
  const locale = params.lang || 'bn';

  if (searchParams?.logout) {
    try {
      cookies().set({
        name: 'ps_admin_session',
        value: '',
        path: '/',
        maxAge: 0,
      });
    } catch {
      // Ignored in server render
    }
  }

  const errorMessage =
    searchParams?.error === 'unauthorized'
      ? 'আপনার এই অংশে প্রবেশের অনুমতি নেই। অনুগ্রহ করে অ্যাডমিন একাউন্টে লগইন করুন।'
      : undefined;

  return <AdminLoginForm locale={locale} errorMessage={errorMessage} />;
}
