/**
 * Navbar Component - Mystic Minimalism Design
 * Translucent backdrop navigation with Lucide icons
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles, User, LogOut, Crown, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

interface NavbarProps {
  user?: {
    name?: string;
    email: string;
    isPremium: boolean;
  };
}

export default function Navbar({ user }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Check if user is admin
  const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || 'admin@example.com').split(',');
  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email);

  // Các link điều hướng
  const navLinks = [
    { href: '/', label: 'Trang chủ' },
    { href: '/calculator', label: 'Thần số học' },
    { href: '/tu-vi', label: 'Tử vi' },
    { href: '/blog', label: 'Blog' },
    ...(user ? [{ href: '/reports', label: 'Báo cáo' }] : []),
    ...(!user?.isPremium ? [{ href: '/premium', label: 'Premium' }] : []),
    ...(isAdmin ? [{ href: '/admin/premium', label: 'Admin' }] : []),
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <Image src="/logo.png" alt="Thần Số Học" width={80} height={80} className="w-32 h-32 object-contain shrink-0" />
            </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link: { href: string; label: string }) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                  isActive(link.href)
                    ? 'bg-[#6B4BFF]/20 text-[#6B4BFF]'
                    : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#8B5CF6]/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                {user.isPremium && (
                  <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-linear-to-r from-[#FFAC33]/20 to-amber-500/20 border border-[#FFAC33]/30">
                    <Crown className="w-3 h-3 text-[#FFAC33]" />
                    <span className="text-xs font-medium text-[#FFAC33]">Premium</span>
                  </div>
                )}
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">
                    <User className="w-4 h-4" />
                    <span className="hidden lg:inline">{user.name || 'User'}</span>
                  </Link>
                </Button>
                {isAdmin && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/admin/premium">
                      <Settings className="w-4 h-4" />
                    </Link>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      import('next-auth/react').then(({ signOut }) => {
                        signOut({ callbackUrl: '/' });
                      });
                    }
                  }}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/login">Đăng nhập</Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link href="/auth/register">Đăng ký</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {navLinks.map((link: { href: string; label: string }) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                  isActive(link.href)
                    ? 'bg-[#6B4BFF]/20 text-[#6B4BFF]'
                    : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#8B5CF6]/10'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Separator className="my-2" />

            {/* Mobile User Menu */}
            {user ? (
              <div className="px-4 space-y-2">
                {user.isPremium && (
                  <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-linear-to-r from-[#FFAC33]/20 to-amber-500/20 border border-[#FFAC33]/30 w-fit">
                    <Crown className="w-3 h-3 text-[#FFAC33]" />
                    <span className="text-xs font-medium text-[#FFAC33]">Premium</span>
                  </div>
                )}
                <p className="text-sm font-medium text-[#fafafa] pt-2">{user.name || user.email}</p>
                <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                  <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <User className="w-4 h-4" />
                    Bảng điều khiển
                  </Link>
                </Button>
                {isAdmin && (
                  <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                    <Link href="/admin/premium" onClick={() => setIsMenuOpen(false)}>
                      <Settings className="w-4 h-4" />
                      Admin
                    </Link>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (typeof window !== 'undefined') {
                      import('next-auth/react').then(({ signOut }) => {
                        signOut({ callbackUrl: '/' });
                      });
                    }
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <div className="px-4 space-y-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    Đăng nhập
                  </Link>
                </Button>
                <Button variant="default" size="sm" className="w-full" asChild>
                  <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                    Đăng ký
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
