/**
 * Session Provider Component
 * Wraps children with NextAuth SessionProvider for client components
 */

'use client';

import { SessionProvider } from 'next-auth/react';

export default function AuthProvider({ 
  children,
  session,
}: { 
  children: React.ReactNode;
  session: any;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
