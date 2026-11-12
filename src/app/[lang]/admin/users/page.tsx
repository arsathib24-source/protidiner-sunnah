import React from 'react';
import { Users, Shield, BookMarked, UserCheck } from 'lucide-react';
import { getAllUsers } from '@/lib/admin/admin-store';
import { UserRoleSwitcher } from '@/components/admin/user-role-switcher';

export default async function AdminUsersPage({
  params,
}: {
  params: { lang: string };
}) {
  const locale = params.lang || 'bn';
  const users = await getAllUsers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold font-bengali-heading text-foreground flex items-center gap-2.5">
            <Users className="w-6 h-6 text-primary" />
            <span>ব্যবহারকারী ও রোল ব্যবস্থাপনা (User Management)</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            অ্যাডমিন, তাহকিক গবেষক, অনুবাদক ও সাধারণ পাঠকদের একাউন্ট ও অনুমতি নিয়ন্ত্রণ করুন
          </p>
        </div>
      </div>

      <div className="bg-surface rounded-3xl border border-border shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-muted-foreground text-xs uppercase font-semibold border-b border-border">
            <tr>
              <th className="px-6 py-4">নাম ও ইমেইল</th>
              <th className="px-4 py-4">বর্তমান ভূমিকা (Role)</th>
              <th className="px-4 py-4">ভাষা পছন্দ</th>
              <th className="px-4 py-4">সংরক্ষিত বুকমার্ক</th>
              <th className="px-4 py-4">যোগদানের তারিখ</th>
              <th className="px-6 py-4 text-right">রোল পরিবর্তন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-muted/15 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-foreground font-bengali-heading text-sm">
                    {u.name}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {u.email}
                  </div>
                </td>

                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      u.role === 'admin'
                        ? 'bg-primary text-accent border border-accent/40'
                        : u.role === 'reviewer'
                        ? 'bg-amber-500/10 text-amber-800 border border-amber-500/30'
                        : u.role === 'editor'
                        ? 'bg-blue-500/10 text-blue-800 border border-blue-500/30'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Shield className="w-3 h-3 text-accent" />
                    <span>
                      {u.role === 'admin'
                        ? 'অ্যাডমিন'
                        : u.role === 'reviewer'
                        ? 'তাহকিক গবেষক'
                        : u.role === 'editor'
                        ? 'অনুবাদক'
                        : 'সাধারণ পাঠক'}
                    </span>
                  </span>
                </td>

                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-xs uppercase font-mono font-bold bg-muted px-2 py-0.5 rounded">
                    {u.preferredLang}
                  </span>
                </td>

                <td className="px-4 py-4 whitespace-nowrap text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookMarked className="w-3.5 h-3.5 text-accent" />
                    <span>{u.bookmarkCount} টি</span>
                  </span>
                </td>

                <td className="px-4 py-4 whitespace-nowrap text-xs text-muted-foreground font-mono">
                  {u.joinedAt}
                </td>

                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <UserRoleSwitcher userId={u.id} currentRole={u.role} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
