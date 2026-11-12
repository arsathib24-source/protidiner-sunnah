import React from 'react';
import type { Metadata } from 'next';
import { getAdminSession } from '@/lib/auth/admin-auth';
import { AdminShell } from '@/components/admin/admin-shell';
import { AdminLoginForm } from '@/components/admin/admin-login-form';
import { getDashboardMetrics } from '@/lib/admin/admin-store';

export const metadata: Metadata = {
  title: 'অ্যাডমিন ড্যাশবোর্ড | প্রতিদিনের সুন্নাহ',
  description: 'Protidiner Sunnah Admin Console & Editorial CMS',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const locale = params.lang || 'bn';

  // Strict Server-Side Role Verification
  const session = await getAdminSession();

  // If unauthenticated or unauthorized role, render secure gatekeeper login
  if (!session.isAuthenticated || !session.isAdmin) {
    return <AdminLoginForm locale={locale} errorMessage={session.error} />;
  }

  // Fetch pending review counts for badge
  const metrics = await getDashboardMetrics();

  return (
    <AdminShell
      locale={locale}
      adminName={session.user?.name}
      adminRole={session.user?.role === 'admin' ? 'সুপার অ্যাডমিন' : 'তাহকিক গবেষক'}
      pendingReviewsCount={metrics.pendingReviews}
    >
      {children}
    </AdminShell>
  );
}
