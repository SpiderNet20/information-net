import React from 'react';
import {
  Clock,
  ChevronLeft,
  Cpu,
  Gamepad2,
  Code2,
  TrendingUp,
  BookOpen,
  Maximize2,
  ExternalLink,
} from 'lucide-react';
import { Post, CategoryInfo } from '../types';

interface HomeCategorySectionProps {
  category: CategoryInfo;
  posts: Post[];
  onSelectCategory: (categorySlug: string) => void;
  onSelectPost: (post: Post) => void;
  onOpenImage?: (url: string, title?: string) => void;
}

export const HomeCategorySection: React.FC<HomeCategorySectionProps> = ({
  category,
  posts,
  onSelectCategory,
  onSelectPost,
  onOpenImage,
}) => {
  // Select up to 4 latest posts for this category
  const categoryPosts = posts.slice(0, 4);
  const featuredPost = categoryPosts[0];
  const sidePosts = categoryPosts.slice(1, 4);

  // Category Icon & Color Helper
  const getCategoryTheme = (slug: string) => {
    switch (slug) {
      case 'AI':
        return {
          icon: Cpu,
          badgeColor: 'bg-indigo-600',
          borderColor: 'border-indigo-500',
          lightBg: 'bg-indigo-50/50 dark:bg-indigo-950/20',
          accentText: 'text-indigo-600 dark:text-indigo-400',
        };
      case 'Games':
        return {
          icon: Gamepad2,
          badgeColor: 'bg-emerald-600',
          borderColor: 'border-emerald-500',
          lightBg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
          accentText: 'text-emerald-600 dark:text-emerald-400',
        };
      case 'Software':
        return {
          icon: Code2,
          badgeColor: 'bg-cyan-600',
          borderColor: 'border-cyan-500',
          lightBg: 'bg-cyan-50/50 dark:bg-cyan-950/20',
          accentText: 'text-cyan-600 dark:text-cyan-400',
        };
      case 'Business':
        return {
          icon: TrendingUp,
          badgeColor: 'bg-amber-600',
          borderColor: 'border-amber-500',
          lightBg: 'bg-amber-50/50 dark:bg-amber-950/20',
          accentText: 'text-amber-600 dark:text-amber-400',
        };
      case 'Education':
      default:
        return {
          icon: BookOpen,
          badgeColor: 'bg-purple-600',
          borderColor: 'border-purple-500',
          lightBg: 'bg-purple-50/50 dark:bg-purple-950/20',
          accentText: 'text-purple-600 dark:text-purple-400',
        };
    }
  };

  const theme = getCategoryTheme(category.slug);
  const IconComponent = theme.icon;
  const canonicalUrl = `https://www.information-net.com/${category.slug}/`;

  if (categoryPosts.length === 0) return null;

  return (
    <section className="bg-white dark:bg-[#252a54] rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 dark:border-[#2f366b] transition-all">
      {/* 1. Distinct Section Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b-2 border-gray-100 dark:border-[#2f366b]">
        {/* Category Identity */}
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl ${theme.badgeColor} flex items-center justify-center text-white shadow-sm`}>
            <IconComponent className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <a
                href={`/${category.slug}/`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategory(category.slug);
                }}
                className="text-lg sm:text-xl font-black text-gray-900 dark:text-white hover:text-[#035dcd] dark:hover:text-blue-400 cursor-pointer transition-colors"
              >
                قسم {category.name}
              </a>
              <span className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-[#1e2348] px-2 py-0.5 rounded-full">
                {posts.length} مقال
              </span>
            </div>
          </div>
        </div>

        {/* The Mandatory (عرض المزيد) Button */}
        <a
          href={`/${category.slug}/`}
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory(category.slug);
          }}
          className="group/btn flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 hover:bg-[#035dcd] text-[#035dcd] dark:text-blue-300 hover:text-white dark:hover:text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          title={`الانتقال إلى رابط قسم ${category.name} مباشرة`}
        >
          <span>عرض المزيد</span>
          <ChevronLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
        </a>
      </div>

      {/* 2. Structured Content: Featured Lead Article + Companion Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* Main Lead Card (7 cols on desktop) */}
        {featuredPost && (
          <article className="md:col-span-7 group bg-gray-50/80 dark:bg-[#1f244a] rounded-xl overflow-hidden border border-gray-100 dark:border-[#2e3569] flex flex-col justify-between hover:shadow-md transition-all">
            <div
              onClick={() => onSelectPost(featuredPost)}
              className="relative h-52 sm:h-56 overflow-hidden bg-gray-200 cursor-pointer"
            >
              <img
                src={featuredPost.thumbnail}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className={`absolute top-3 right-3 text-[11px] font-bold text-white px-2.5 py-1 rounded shadow-md ${theme.badgeColor}`}>
                {featuredPost.category}
              </span>

              {onOpenImage && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenImage(featuredPost.thumbnail, featuredPost.title);
                  }}
                  className="absolute bottom-2 left-2 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#035dcd]"
                  title="تكبير الصورة"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-right">
              <div>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#035dcd]" />
                    <span>{featuredPost.date}</span>
                  </span>
                  <span>• {featuredPost.readTime}</span>
                </div>

                <h4
                  onClick={() => onSelectPost(featuredPost)}
                  className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#035dcd] dark:group-hover:text-blue-400 transition-colors leading-snug cursor-pointer line-clamp-2"
                >
                  {featuredPost.title}
                </h4>

                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mt-2 leading-relaxed">
                  {featuredPost.snippet}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200/60 dark:border-[#2e3569] flex items-center justify-between">
                <span className="text-[11px] text-gray-400 font-medium">
                  بواسطة: {featuredPost.author.name}
                </span>

                <button
                  onClick={() => onSelectPost(featuredPost)}
                  className="text-xs font-bold text-[#035dcd] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>اقرأ المقال</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </article>
        )}

        {/* Side Stack of 2-3 Compact Cards (5 cols on desktop) */}
        <div className="md:col-span-5 flex flex-col justify-between gap-3">
          {sidePosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="group/card bg-gray-50/80 dark:bg-[#1f244a] p-3 rounded-xl border border-gray-100 dark:border-[#2e3569] hover:border-[#035dcd]/40 dark:hover:border-blue-500/40 hover:shadow-sm transition-all flex items-center gap-3 cursor-pointer text-right flex-1"
            >
              <div className="relative w-24 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-200">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-1">
                  <Clock className="w-3 h-3 text-[#035dcd]" />
                  <span>{post.date}</span>
                </div>

                <h5 className="text-xs font-bold text-gray-800 dark:text-gray-100 group-hover/card:text-[#035dcd] dark:group-hover/card:text-blue-400 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h5>

                <span className="text-[10px] text-gray-400 mt-1 block">
                  {post.readTime}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* 3. Section Footer - Direct link to category */}
      <div className="mt-5 pt-3 border-t border-gray-100 dark:border-[#2f366b] flex items-center justify-between text-xs">
        <span className="text-gray-400 text-[11px]">
          يعرض أحدث مقالات {category.name} مع روابطها البرمجية المعتمدة
        </span>

        <button
          onClick={() => onSelectCategory(category.slug)}
          className="font-bold text-[#035dcd] dark:text-blue-400 hover:underline flex items-center gap-1 group/link cursor-pointer"
        >
          <span>عرض كافة مقالات قسم {category.name} ({posts.length} مقال)</span>
          <ChevronLeft className="w-3.5 h-3.5 group-hover/link:-translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
