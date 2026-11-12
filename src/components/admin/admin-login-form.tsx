'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IslamicStarIcon } from '@/components/ui/decorative';

interface AdminLoginFormProps {
  locale: string;
  errorMessage?: string;
}

export const AdminLoginForm: React.FC<AdminLoginFormProps> = ({
  locale,
  errorMessage,
}) => {
  const router = useRouter();
  const [email, setEmail] = useState('admin@protidinersunnah.com');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(errorMessage || '');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Set session cookie for admin verification
      document.cookie = `ps_admin_session=active; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      
      // Refresh and navigate to dashboard
      router.refresh();
      router.push(`/${locale}/admin`);
    } catch {
      setError('লগইন ব্যর্থ হয়েছে। অনুগ্রহ করে তথ্য পরীক্ষা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = () => {
    document.cookie = `ps_admin_session=active; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
    router.refresh();
    router.push(`/${locale}/admin`);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface rounded-3xl border border-border shadow-xl overflow-hidden">
        {/* Header Banner */}
        <div className="bg-primary p-8 text-center text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <IslamicStarIcon className="w-24 h-24 text-accent" />
          </div>

          <div className="w-14 h-14 mx-auto rounded-2xl bg-secondary flex items-center justify-center text-accent border border-accent/40 shadow-inner mb-4">
            <IslamicStarIcon className="w-8 h-8 text-accent" />
          </div>

          <h2 className="text-2xl font-bold font-bengali-heading text-background">
            অ্যাডমিন প্রবেশদ্বার
          </h2>
          <p className="text-xs text-background/70 mt-1">
            প্রতিদিনের সুন্নাহ • সুরক্ষিত সম্পাদকীয় ও তাহকিক প্যানেল
          </p>
        </div>

        {/* Content & Form */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium flex items-center gap-2">
              <Lock className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="mb-6 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">নিরাপত্তা সতর্কতা:</span>
              এই এলাকাটি কেবল অনুমোদিত ইসলামিক গবেষক ও অ্যাডমিনদের জন্য সংরক্ষিত।
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                অ্যাডমিন ইমেইল
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="accent"
              className="w-full mt-2 font-semibold shadow-md flex items-center justify-center gap-2"
              disabled={loading}
            >
              <span>{loading ? 'যাচাই করা হচ্ছে...' : 'প্রবেশ করুন'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Instant Demo Auth Button */}
          <div className="mt-6 pt-6 border-t border-border text-center">
            <button
              onClick={handleDemoSignIn}
              type="button"
              className="w-full py-2.5 px-4 rounded-xl bg-secondary/10 hover:bg-secondary/20 text-secondary text-xs font-semibold flex items-center justify-center gap-2 border border-secondary/20 transition-colors"
            >
              <KeyRound className="w-4 h-4 text-accent" />
              <span>এক ক্লিকে সুপার অ্যাডমিন ডেমো এক্সেস</span>
            </button>
            <p className="text-[11px] text-muted-foreground mt-2">
              টেস্টিং ও রিভিউর সুবিধার্থে সরাসরি সুপার অ্যাডমিন মোডে প্রবেশ করুন
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
