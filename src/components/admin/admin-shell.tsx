'use client';

import React, { useState } from 'react';
import { AdminSidebar } from './admin-sidebar';
import { AdminTopbar } from './admin-topbar';

interface AdminShellProps {
  locale: string;
  children: React.ReactNode;
  adminName?: string;
  adminRole?: string;
  pendingReviewsCount?: number;
}

export const AdminShell: React.FC<AdminShellProps> = ({
  locale,
  children,
  adminName,
  adminRole,
  pendingReviewsCount = 2,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/20 text-foreground flex">
      {/* 10-Item Sidebar */}
      <AdminSidebar
        locale={locale}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        pendingReviewsCount={pendingReviewsCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72 transition-all duration-300">
        <AdminTopbar
          locale={locale}
          onMenuClick={() => setSidebarOpen(true)}
          adminName={adminName}
          adminRole={adminRole}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
