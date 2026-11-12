import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/bn/admin';

  if (code) {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(new URL(next, request.url));
      }
      console.error('Supabase Auth code exchange error:', error.message);
    } catch (err) {
      console.error('Unexpected auth callback error:', err);
    }
  }

  // Return to admin login with error message if verification fails
  return NextResponse.redirect(new URL('/bn/admin/login?error=unauthorized', request.url));
}
