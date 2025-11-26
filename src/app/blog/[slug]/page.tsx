/**
 * Blog Detail Page
 * Hiển thị nội dung chi tiết của một bài blog
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { Metadata } from 'next';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

// Generate static params for all published blog posts
export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return posts.map((post: { slug: any; }) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const postData = await prisma.blogPost.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      coverImage: true,
      category: true,
      published: true,
      views: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!postData) {
    return {
      title: 'Bài viết không tồn tại',
    };
  }

  return {
    title: `${postData.title} | Thần Số Học Việt Nam`,
    description: postData.excerpt || postData.title,
    openGraph: {
      title: postData.title,
      description: postData.excerpt || '',
      type: 'article',
      publishedTime: postData.createdAt.toISOString(),
      modifiedTime: postData.updatedAt.toISOString(),
      images: postData.coverImage ? [postData.coverImage] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  // Fetch the blog post
  const postData = await prisma.blogPost.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      coverImage: true,
      category: true,
      published: true,
      views: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!postData || !postData.published) {
    notFound();
  }

  // Convert dates to serializable format
  const post = {
    ...postData,
    createdAt: postData.createdAt.toISOString(),
    updatedAt: postData.updatedAt.toISOString(),
  };

  // Increment view count
  await prisma.blogPost.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  });

  // Fetch related posts (same category)
  const relatedPostsData = await prisma.blogPost.findMany({
    where: {
      category: post.category,
      published: true,
      NOT: { id: post.id },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      category: true,
      views: true,
      createdAt: true,
    },
    take: 3,
    orderBy: { views: 'desc' },
  });

  // Convert dates to serializable format
  type RelatedPost = {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    category: string | null;
    views: number;
    createdAt: string;
  };

  const relatedPosts: RelatedPost[] = relatedPostsData.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
  }));

  // Category display names
  const categoryNames: Record<string, string> = {
    numerology: 'Thần Số Học',
    horoscope: 'Tử Vi',
    tips: 'Mẹo & Lời Khuyên',
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center text-[#6B4BFF] hover:text-[#8B5CF6] mb-8 group"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Quay lại danh sách blog
        </Link>

        {/* Article Header */}
        <article className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-2xl shadow-xl overflow-hidden">
          {/* Cover Image */}
          {post.coverImage && (
            <div className="aspect-video bg-linear-to-br from-[#6B4BFF]/20 to-[#8B5CF6]/20 flex items-center justify-center border-b border-[#3f3f46]/40">
              <svg
                className="w-24 h-24 text-[#6B4BFF]/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          <div className="p-8 md:p-12">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block px-4 py-1 bg-[#6B4BFF]/20 text-[#8B5CF6] rounded-full text-sm font-medium backdrop-blur-sm">
                {categoryNames[post.category || 'tips'] || post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#fafafa] mb-4 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#a1a1aa] mb-8 pb-8 border-b border-[#3f3f46]/40">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {new Date(post.createdAt).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                {post.views.toLocaleString('vi-VN')} lượt xem
              </div>
            </div>

            {/* Excerpt */}
            {post.excerpt && (
              <div className="bg-[#6B4BFF]/10 border-l-4 border-[#6B4BFF] p-6 mb-8 rounded-r-lg backdrop-blur-sm">
                <p className="text-lg text-[#fafafa] italic leading-relaxed">{post.excerpt}</p>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-[#fafafa] prose-p:text-[#a1a1aa] prose-a:text-[#6B4BFF] prose-strong:text-[#fafafa] prose-code:text-[#8B5CF6]">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#fafafa] mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>Bài Viết Liên Quan</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost: { id: Key | null | undefined; slug: any; category: any; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; excerpt: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; views: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="bg-[#1a1a1f]/50 backdrop-blur-sm border border-[#3f3f46]/40 rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:border-[#6B4BFF]/40 transition-all group"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-linear-to-br from-[#6B4BFF]/20 to-[#8B5CF6]/20 flex items-center justify-center border-b border-[#3f3f46]/40">
                    <svg
                      className="w-16 h-16 text-[#6B4BFF]/60 group-hover:scale-110 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>

                  <div className="p-4">
                    <div className="mb-2">
                      <span className="text-xs px-3 py-1 bg-[#6B4BFF]/20 text-[#8B5CF6] rounded-full font-medium">
                        {categoryNames[relatedPost.category || 'tips']}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#fafafa] mb-2 group-hover:text-[#6B4BFF] transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-[#a1a1aa] line-clamp-2">{relatedPost.excerpt}</p>
                    <div className="mt-3 text-sm text-[#a1a1aa] flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {relatedPost.views} lượt xem
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-linear-to-r from-[#6B4BFF] to-[#8B5CF6] rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Khám Phá Thần Số Học Của Bạn</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Bạn đã sẵn sàng khám phá con số vận mệnh và tìm hiểu bản thân sâu sắc hơn chưa?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculator"
              className="px-8 py-4 bg-white text-[#6B4BFF] rounded-lg font-bold hover:bg-white/90 transition-colors shadow-lg"
            >
              Tính Thần Số Học
            </Link>
            <Link
              href="/tu-vi"
              className="px-8 py-4 bg-[#8B5CF6] text-white rounded-lg font-bold hover:bg-[#8B5CF6]/90 transition-colors shadow-lg"
            >
              Xem Tử Vi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
