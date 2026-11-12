'use client';

import React, { useState, useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import { updateUserRoleAction } from '@/lib/admin/actions';

interface UserRoleSwitcherProps {
  userId: string;
  currentRole: 'admin' | 'reviewer' | 'editor' | 'reader';
}

export const UserRoleSwitcher: React.FC<UserRoleSwitcherProps> = ({
  userId,
  currentRole,
}) => {
  const [isPending, startTransition] = useTransition();
  const [role, setRole] = useState(currentRole);

  const handleChange = (newRole: any) => {
    setRole(newRole);
    startTransition(async () => {
      await updateUserRoleAction(userId, newRole);
    });
  };

  return (
    <div className="inline-flex items-center gap-2">
      {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin text-accent" />}
      <select
        value={role}
        disabled={isPending}
        onChange={(e) => handleChange(e.target.value)}
        className="text-xs p-1.5 rounded-lg bg-muted/60 border border-border font-medium focus:outline-none focus:ring-1 focus:ring-accent"
      >
        <option value="reader">পাঠক (Reader)</option>
        <option value="editor">অনুবাদক (Editor)</option>
        <option value="reviewer">তাহকিক গবেষক (Reviewer)</option>
        <option value="admin">সুপার অ্যাডমিন (Admin)</option>
      </select>
    </div>
  );
};
