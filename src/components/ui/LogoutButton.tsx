/**
 * Logout Button Component
 * Nút đăng xuất với client-side logic
 */

'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="text-sm text-gray-600 hover:text-gray-900"
    >
      Đăng xuất
    </button>
  );
}
