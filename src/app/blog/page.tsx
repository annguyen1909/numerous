/**
 * Blog Page
 * Danh sách bài viết về Thần số học và Tử vi
 */

import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { Sparkles, Hash, Star, BookMarked, Mail } from 'lucide-react';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export default async function BlogPage() {
  // Fetch featured and all posts from database
  const allPostsData = await prisma.blogPost.findMany({
    where: { published: true },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      category: true,
      views: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  // Convert dates to serializable format
  type BlogPostRaw = {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    category: string | null;
    views: number;
    createdAt: Date;
    updatedAt: Date;
  };

  const allPosts = allPostsData.map((post: BlogPostRaw) => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }));

  const featuredPost = allPosts[0];
  const remainingPosts = allPosts.slice(1);

  type BlogPost = {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    category: string | null;
    views: number;
    createdAt: string;
    updatedAt: string;
  };

  // Category display names
  const categoryNames: Record<string, string> = {
    numerology: 'Thần Số Học',
    horoscope: 'Tử Vi',
    tips: 'Mẹo & Tips',
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-linear-to-r from-[#6B4BFF] to-[#8B5CF6] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog Thần Số Học & Tử Vi
          </h1>
          <p className="text-xl text-white/80">
            Kiến thức, bí quyết và hướng dẫn về Thần số học, Tử vi và Phong thủy
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            <button className="px-6 py-2 bg-[#6B4BFF] text-white rounded-full font-medium hover:bg-[#8B5CF6] transition-colors">
              Tất cả
            </button>
            <button className="px-6 py-2 bg-[#1a1a1f]/50 border border-[#3f3f46]/40 text-[#fafafa] rounded-full font-medium hover:bg-[#6B4BFF]/20 transition-colors">
              Thần Số Học
            </button>
            <button className="px-6 py-2 bg-[#1a1a1f]/50 border border-[#3f3f46]/40 text-[#fafafa] rounded-full font-medium hover:bg-[#6B4BFF]/20 transition-colors">
              Tử Vi
            </button>
            <button className="px-6 py-2 bg-[#1a1a1f]/50 border border-[#3f3f46]/40 text-[#fafafa] rounded-full font-medium hover:bg-[#6B4BFF]/20 transition-colors">
              Hướng Dẫn
            </button>
            <button className="px-6 py-2 bg-[#1a1a1f]/50 border border-[#3f3f46]/40 text-[#fafafa] rounded-full font-medium hover:bg-[#6B4BFF]/20 transition-colors">
              Mẹo & Tips
            </button>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-[#fafafa] mb-6">Bài Viết Nổi Bật</h2>
              <div className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="grid md:grid-cols-2">
                  <div className="h-64 md:h-auto bg-linear-to-br from-[#6B4BFF]/30 to-[#8B5CF6]/30 flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-[#6B4BFF]" />
                  </div>
                  <div className="p-8">
                    <span className="inline-block px-3 py-1 bg-[#6B4BFF]/20 text-[#6B4BFF] rounded-full text-sm font-medium mb-3">
                      {categoryNames[featuredPost.category || 'tips']}
                    </span>
                    <h3 className="text-3xl font-bold text-[#fafafa] mb-4">
                      {featuredPost.title}
                    </h3>
                    <p className="text-[#a1a1aa] mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#a1a1aa]">
                        {new Date(featuredPost.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="px-6 py-3 bg-[#6B4BFF] text-white rounded-lg font-semibold hover:bg-[#8B5CF6] transition-colors"
                      >
                        Đọc tiếp →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Posts Grid */}
          <h2 className="text-2xl font-bold text-[#fafafa] mb-6">Tất Cả Bài Viết</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post: BlogPost) => (
              <article
                key={post.id}
                className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-linear-to-br from-[#8B5CF6]/30 to-[#6B4BFF]/30 flex items-center justify-center">
                  <span className="text-5xl">
                    {post.category === 'numerology' ? <Hash className="w-6 h-6" /> : post.category === 'horoscope' ? <Star className="w-6 h-6" fill="currentColor" /> : <BookMarked className="w-6 h-6" />}
                  </span>
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-[#6B4BFF]/20 text-[#6B4BFF] rounded-full text-xs font-medium mb-3">
                    {categoryNames[post.category || 'tips']}
                  </span>
                  <h3 className="text-xl font-bold text-[#fafafa] mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[#a1a1aa] text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#a1a1aa] flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {post.views} lượt xem
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[#6B4BFF] hover:text-[#8B5CF6] font-semibold text-sm"
                    >
                      Đọc thêm →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-[#1a1a1f]/50 border border-[#3f3f46]/40 text-[#fafafa] rounded-lg font-semibold hover:bg-[#6B4BFF]/20 transition-colors">
              Xem thêm bài viết
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-[#6B4BFF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            <Mail className="w-5 h-5 inline-block mr-2" />
            Đăng Ký Nhận Tin
          </h2>
          <p className="text-purple-100 mb-8">
            Nhận thông báo về bài viết mới, tips và ưu đãi đặc biệt
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email của bạn"
              className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-yellow-400 text-purple-900 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
            >
              Đăng ký
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
