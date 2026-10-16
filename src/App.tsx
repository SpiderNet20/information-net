/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  ArrowRight,
  Sparkles,
  Flame,
  Gamepad2,
  Cpu,
  HelpCircle,
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  LayoutGrid,
  List,
  Columns,
  FileCode,
  Maximize2,
  ExternalLink,
  Layers,
  ArrowUp,
} from 'lucide-react';

import { Post, CategoryInfo } from './types';
import { INITIAL_POSTS, INITIAL_CATEGORIES } from './data/posts';
import { Header } from './components/Header';
import { NewsTicker } from './components/NewsTicker';
import { FeaturedSlider } from './components/FeaturedSlider';
import { Sidebar } from './components/Sidebar';
import { PostPageView } from './components/PostPageView';
import { ImageLightbox } from './components/ImageLightbox';
import { SearchModal } from './components/SearchModal';
import { SpeedTestModal } from './components/SpeedTestModal';
import { RedirectToolModal } from './components/RedirectToolModal';
import { ContactModal } from './components/ContactModal';
import { PagesModal, PageType } from './components/PagesModal';
import { MobileDrawer } from './components/MobileDrawer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { SeoSchemaViewerModal } from './components/SeoSchemaViewerModal';
import { SitemapModal } from './components/SitemapModal';
import { HomeCategorySection } from './components/HomeCategorySection';
import { StandalonePageView } from './components/StandalonePageView';

import { AdSenseUnit } from './components/AdSenseUnit';
import { StandalonePageType } from './types';
import { applySeoMetadata } from './utils/seo';

export default function App() {
  // Theme state with localStorage sync
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('mode') === 'dark';
  });

  // Navigation & Category state ('all' or 'AI' | 'Games' | 'Software' | 'Business' | 'Education')
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Article Feed View Style (matching SeoPlus BlogStylePosts: 1=wide classic, 2=grid, 3=compact)
  const [feedLayout, setFeedLayout] = useState<'classic' | 'grid' | 'compact'>('classic');

  // Modals & Tools state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSpeedTestOpen, setIsSpeedTestOpen] = useState(false);
  const [isRedirectToolOpen, setIsRedirectToolOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSeoViewerOpen, setIsSeoViewerOpen] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title?: string } | null>(null);
  const [activePage, setActivePage] = useState<PageType | null>(null);
  const [standalonePage, setStandalonePage] = useState<StandalonePageType | null>(null);


  // Pagination / Load More
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Helper to normalize category slugs
  const normalizeCategorySlug = (cat: string) => {
    if (!cat || cat === 'all' || cat === 'الكل') return 'all';
    if (cat === 'AI' || cat === 'الذكاء الاصطناعي') return 'AI';
    if (cat === 'Games' || cat === 'الألعاب' || cat === 'ببجي موبايل') return 'Games';
    if (cat === 'Software' || cat === 'البرامج' || cat === 'شروحات وحلول') return 'Software';
    if (cat === 'Business' || cat === 'الربح من الإنترنت') return 'Business';
    if (cat === 'Education' || cat === 'مقالات تعليمية' || cat === 'الأسرة') return 'Education';
    return cat;
  };

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('mode', 'dark');
      document.body.classList.add('dark');
      localStorage.setItem('mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('mode', 'light');
      document.body.classList.remove('dark');
      localStorage.setItem('mode', 'light');
    }
  }, [darkMode]);

  // Dynamic SEO & Schema.org JSON-LD Injection
  useEffect(() => {
    applySeoMetadata(selectedPost, activeCategory, standalonePage);
  }, [selectedPost, activeCategory, standalonePage]);

  // Parse current URL (supports clean /Games/ or /AI/slug paths, plus backward-compatible hashes)
  const parseUrlToState = () => {
    let rawPath = window.location.pathname || '/';
    const rawHash = window.location.hash.replace(/^#\/?/, '').trim();

    // If pathname is root '/' but there is an old hash (e.g. #Games/ or #AI/slug), prefer the hash
    let target = rawPath;
    if ((rawPath === '/' || !rawPath) && rawHash) {
      target = '/' + rawHash;
    }

    const clean = target.replace(/^\/+|\/+$/g, '').trim();

    if (!clean) {
      return { post: null, category: 'all', standalone: null, cleanPath: '/' };
    }

    const standalonePages: StandalonePageType[] = ['about', 'contact', 'privacy', 'terms', 'sitemap'];
    const matchedStandalone = standalonePages.find(
      (p) => p.toLowerCase() === clean.toLowerCase()
    );
    if (matchedStandalone) {
      return { post: null, category: 'all', standalone: matchedStandalone, cleanPath: `/${matchedStandalone}` };
    }

    const officialCategories = ['AI', 'Games', 'Software', 'Business', 'Education'];

    // 1. Direct official category match (e.g. /Games/ or /AI/)
    const matchedCat = officialCategories.find(
      (c) => c.toLowerCase() === clean.toLowerCase()
    );
    if (matchedCat) {
      return { post: null, category: matchedCat, standalone: null, cleanPath: `/${matchedCat}/` };
    }

    // 2. Check if path is {category}/{slug} or just {slug}
    const parts = clean.split('/');
    const postSlug = parts.length > 1 ? parts[1] : parts[0];
    const categoryPart = parts.length > 1 ? parts[0] : null;

    // Search by exact slug or full clean match
    const foundPost = INITIAL_POSTS.find(
      (p) => p.slug === postSlug || p.slug === clean
    );
    if (foundPost) {
      return {
        post: foundPost,
        category: foundPost.categorySlug,
        standalone: null,
        cleanPath: `/${foundPost.categorySlug}/${foundPost.slug}`,
      };
    }

    // If first segment was an official category but post slug was not found, fallback to category
    if (categoryPart) {
      const catCheck = officialCategories.find(
        (c) => c.toLowerCase() === categoryPart.toLowerCase()
      );
      if (catCheck) {
        return { post: null, category: catCheck, standalone: null, cleanPath: `/${catCheck}/` };
      }
    }

    return { post: null, category: 'all', standalone: null, cleanPath: '/' };
  };

  // Initial Deep-Link URL listener & Back/Forward button popstate support
  useEffect(() => {
    const handlePopState = () => {
      const { post, category, standalone, cleanPath } = parseUrlToState();
      setSelectedPost(post);
      setActiveCategory(category);
      setStandalonePage(standalone);

      // Clean legacy hash or non-standard slashes
      if (window.location.hash || window.location.pathname !== cleanPath) {
        window.history.replaceState(null, '', cleanPath);
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Currently active Category object
  const currentCategoryInfo = useMemo(() => {
    return INITIAL_CATEGORIES.find(
      (c) => c.slug === activeCategory || c.name === activeCategory
    );
  }, [activeCategory]);

  // Filtered posts based on active category
  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return INITIAL_POSTS;
    return INITIAL_POSTS.filter(
      (p) => p.categorySlug === activeCategory || p.category === activeCategory
    );
  }, [activeCategory]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setIsLoadingMore(false);
    }, 600);
  };

  // Category change handler with clean path URL (/Games/, /AI/, etc.)
  const handleSelectCategory = (cat: string) => {
    const norm = normalizeCategorySlug(cat);
    setActiveCategory(norm);
    setSelectedPost(null);
    setStandalonePage(null);
    setVisibleCount(6);

    const targetPath = norm === 'all' ? '/' : `/${norm}/`;
    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState(null, '', targetPath);
    }

    if (norm === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Post selection handler with clean path URL (/{categorySlug}/{slug})
  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    setStandalonePage(null);
    setActiveCategory(post.categorySlug);

    const targetPath = `/${post.categorySlug}/${post.slug}`;
    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState(null, '', targetPath);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to home / category handler
  const handleBackToHome = () => {
    setSelectedPost(null);
    setStandalonePage(null);
    const targetPath = activeCategory !== 'all' ? `/${activeCategory}/` : '/';
    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Standalone Page handler
  const handleOpenStandalonePage = (pageType: StandalonePageType) => {
    setStandalonePage(pageType);
    setSelectedPost(null);
    const targetPath = `/${pageType}`;
    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f7] dark:bg-[#1b1e38] text-[#34495e] dark:text-gray-100 transition-colors duration-300 pb-16 lg:pb-0">
      
      {/* 1. Main Header */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSpeedTest={() => setIsSpeedTestOpen(true)}
        onOpenRedirectTool={() => setIsRedirectToolOpen(true)}
        onOpenStandalonePage={handleOpenStandalonePage}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}

      />

      {/* 2. Container Site Wrapper */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 pb-20 lg:pb-4">
        
        {/* Standalone Full Page View (About, Contact, Privacy, Terms, Sitemap) */}
        {standalonePage ? (
          <StandalonePageView
            pageType={standalonePage}
            posts={INITIAL_POSTS}
            categories={INITIAL_CATEGORIES}
            onSelectPost={handleSelectPost}
            onSelectCategory={handleSelectCategory}
            onGoHome={handleBackToHome}
            onNavigatePage={handleOpenStandalonePage}
          />
        ) : selectedPost ? (
          <PostPageView
            post={selectedPost}
            allPosts={INITIAL_POSTS}
            categories={INITIAL_CATEGORIES}
            activeCategory={activeCategory}
            onSelectCategory={(cat) => handleSelectCategory(cat)}
            onSelectPost={handleSelectPost}
            onBackToHome={handleBackToHome}
            onOpenSeoViewer={() => setIsSeoViewerOpen(true)}
            onOpenImage={(url, title) => setLightboxImage({ url, title })}
            onOpenSpeedTest={() => setIsSpeedTestOpen(true)}
            onOpenRedirectTool={() => setIsRedirectToolOpen(true)}
            onSearchQuery={() => setIsSearchOpen(true)}
          />
        ) : (
          /* Homepage View / Category Feeds */
          <>
            {/* News Ticker Bar (Sp-shreet) */}
            <NewsTicker
              posts={INITIAL_POSTS}
              onSelectPost={handleSelectPost}
            />

            {/* Featured Slider / Hero Grid (shown when on homepage) */}
            {activeCategory === 'all' && (
              <FeaturedSlider
                posts={INITIAL_POSTS}
                onSelectPost={handleSelectPost}
              />
            )}

            {/* Interactive Category Banner - Visible only on Category Pages */}
            {activeCategory !== 'all' && (
              <div className="mb-8">
                <div className="bg-gradient-to-l from-[#035dcd] to-blue-700 rounded-[2rem] overflow-hidden shadow-xl border border-blue-400/20">
                  <div className="flex flex-col md:flex-row items-center gap-8 p-6 sm:p-10">
                    {/* Text Content */}
                    <div className="flex-1 text-right order-2 md:order-1">
                      <div className="flex items-center gap-2 text-xs text-blue-100/80 mb-4 font-bold">
                        <button onClick={() => handleSelectCategory('all')} className="hover:text-white transition-colors cursor-pointer">الرئيسية</button>
                        <span>/</span>
                        <span className="text-white">قسم {currentCategoryInfo?.name}</span>
                      </div>
                      
                      <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                        استكشف عالم {currentCategoryInfo?.name}
                      </h1>
                      
                      <p className="text-blue-50 text-sm sm:text-base leading-relaxed mb-8 opacity-90 max-w-xl">
                        {currentCategoryInfo?.description || 'اكتشف أحدث المقالات والشروحات الحصرية في هذا القسم المتميز.'}
                      </p>

                      <div className="flex flex-wrap gap-4">
                        <button className="bg-white text-[#035dcd] px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center gap-2 group cursor-pointer shadow-lg">
                          <span>استكشف الآن</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
                        </button>
                        <div className="px-4 py-3 rounded-xl bg-blue-600/50 backdrop-blur-sm border border-blue-400/30 text-white text-xs font-bold flex items-center gap-2">
                          <Flame className="w-4 h-4 text-amber-400" />
                          <span>{filteredPosts.length} موضوع متوفر</span>
                        </div>
                      </div>
                    </div>

                    {/* Image Column */}
                    <div className="w-full md:w-2/5 order-1 md:order-2">
                      <div className="relative h-48 sm:h-64 overflow-hidden rounded-3xl border-4 border-white/10 shadow-lg group">
                        <img 
                          src={currentCategoryInfo?.image} 
                          alt={currentCategoryInfo?.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AdSense Unit immediately after banner */}
                <div className="mt-8">
                  <AdSenseUnit key={`ad-cat-${activeCategory}`} slotType="top" />
                </div>
              </div>
            )}

            {/* Main Content Layout: Two Columns (Main Content + Sidebar) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start mt-6 w-full max-w-full">
              
              {/* Main Content Column (Spans 2 columns on desktop) */}
              <div className="lg:col-span-2 w-full space-y-8 overflow-visible">
                
                {/* CASE A: HOMEPAGE (activeCategory === 'all')
                    Strict adherence to Requirement #3:
                    "تعرض الصفحة الرئيسية مقالات من كافة الأقسام الـ 5 بشكل منظم، 
                    بحيث يتم تخصيص جزء لكل قسم يعرض أحدث مقالاته بشكل مستقل مع زر (عرض المزيد) للانتقال لرابط القسم مباشرة."
                */}
                {activeCategory === 'all' ? (
                  <div className="space-y-8">
                    {/* Category Overview Grid (Requirement #8 & #9) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {INITIAL_CATEGORIES.map((cat) => (
                        <div
                          key={cat.slug}
                          onClick={() => handleSelectCategory(cat.slug)}
                          className="group relative h-32 rounded-2xl overflow-hidden cursor-pointer border border-gray-100 dark:border-[#2f366b] shadow-sm hover:shadow-md transition-all"
                        >
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-4 text-right">
                            <h3 className="text-white font-black text-sm mb-1 group-hover:text-blue-400 transition-colors">
                              قسم {cat.name}
                            </h3>
                            <p className="text-gray-300 text-[10px] leading-tight line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity">
                              {cat.description}
                            </p>
                          </div>
                          <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-blue-600/80 backdrop-blur-sm text-white text-[9px] font-bold">
                            {INITIAL_POSTS.filter(p => p.categorySlug === cat.slug).length} مقال
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* The 5 Dedicated Sections in order */}
                    {INITIAL_CATEGORIES.map((cat) => {
                      const catPosts = INITIAL_POSTS.filter(
                        (p) => p.categorySlug === cat.slug || p.category === cat.name
                      );
                      return (
                        <HomeCategorySection
                          key={cat.slug}
                          category={cat}
                          posts={catPosts}
                          onSelectCategory={handleSelectCategory}
                          onSelectPost={handleSelectPost}
                          onOpenImage={(url, title) => setLightboxImage({ url, title })}
                        />
                      );
                    })}
                  </div>
                ) : (
                  /* CASE B: DEDICATED SECTION VIEW (When a category like AI, Games, Software, Business, Education is selected) */
                    <div className="space-y-6">
                      {/* View Layout Switcher (SeoPlus BlogStylePosts) - Hidden on mobile as requested */}
                      <div className="hidden sm:flex p-5 rounded-2xl bg-white dark:bg-[#252a54] border border-gray-100 dark:border-[#2f366b] shadow-sm flex-wrap items-center justify-between gap-3">
                        <span className="text-xs text-gray-400 font-medium">
                          عرض مقالات القسم حسب التنسيق المفضل لديك:
                        </span>

                        <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100 dark:bg-[#1e2348] border border-gray-200 dark:border-[#384180] text-xs">
                          <button
                            onClick={() => setFeedLayout('classic')}
                            className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                              feedLayout === 'classic'
                                ? 'bg-[#035dcd] text-white shadow-sm'
                                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                            }`}
                            title="عرض كلاسيكي عريض (سيو بلس)"
                          >
                            <Columns className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline font-bold">عريض</span>
                          </button>

                          <button
                            onClick={() => setFeedLayout('grid')}
                            className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                              feedLayout === 'grid'
                                ? 'bg-[#035dcd] text-white shadow-sm'
                                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                            }`}
                            title="عرض شبكي (Grid)"
                          >
                            <LayoutGrid className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline font-bold">شبكة</span>
                          </button>

                          <button
                            onClick={() => setFeedLayout('compact')}
                            className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                              feedLayout === 'compact'
                                ? 'bg-[#035dcd] text-white shadow-sm'
                                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                            }`}
                            title="عرض مضغوط وموجز"
                          >
                            <List className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline font-bold">موجز</span>
                          </button>
                        </div>
                      </div>


                    {/* Section Articles Feed */}
                    {displayedPosts.length === 0 ? (
                      <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#252a54] border border-gray-100 dark:border-[#2f366b]">
                        <p className="text-gray-500 font-bold">لا توجد مقالات حالياً في هذا القسم</p>
                        <button
                          onClick={() => handleSelectCategory('all')}
                          className="mt-3 px-4 py-2 rounded-xl bg-[#035dcd] text-white text-xs font-bold"
                        >
                          العودة للرئيسية
                        </button>
                      </div>
                    ) : feedLayout === 'classic' ? (
                      /* Style 1: Wide Classic Cards */
                      <div className="space-y-4">
                        {displayedPosts.map((post) => (
                          <article
                            key={post.id}
                            className="group bg-white dark:bg-[#252a54] rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 dark:border-[#2f366b] transition-all flex flex-col sm:flex-row items-stretch"
                          >
                            <div
                              onClick={() => handleSelectPost(post)}
                              className="relative sm:w-72 sm:min-w-[280px] h-48 sm:h-auto overflow-hidden shrink-0 bg-gray-200 cursor-pointer"
                            >
                              <img
                                src={post.thumbnail}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <span className={`absolute top-3 right-3 text-xs font-bold text-white px-2.5 py-1 rounded shadow-md cat-badge-${post.categoryIndex}`}>
                                {post.category}
                              </span>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLightboxImage({ url: post.thumbnail, title: post.title });
                                }}
                                className="absolute bottom-2 left-2 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#035dcd]"
                                title="تكبير الصورة"
                              >
                                <Maximize2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="p-5 flex-1 flex flex-col justify-between text-right">
                              <div
                                onClick={() => handleSelectPost(post)}
                                className="cursor-pointer"
                              >
                                <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5 text-[#035dcd]" /> {post.date}
                                  </span>
                                  <span>• {post.readTime}</span>
                                </div>

                                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-snug group-hover:text-[#035dcd] dark:group-hover:text-blue-400 transition-colors">
                                  {post.title}
                                </h3>

                                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mt-2 leading-relaxed">
                                  {post.snippet}
                                </p>
                              </div>

                              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-[#2f366b] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <img
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    className="w-6 h-6 rounded-full object-cover"
                                  />
                                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                    {post.author.name}
                                  </span>
                                </div>

                                <button
                                  onClick={() => handleSelectPost(post)}
                                  className="px-3.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-[#035dcd] dark:text-blue-300 text-xs font-bold group-hover:bg-[#035dcd] group-hover:text-white transition-colors cursor-pointer"
                                >
                                  اقرأ المقال بالكامل ←
                                </button>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    ) : feedLayout === 'grid' ? (
                      /* Style 2: Grid Layout */
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {displayedPosts.map((post) => (
                          <article
                            key={post.id}
                            className="group bg-white dark:bg-[#252a54] rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 dark:border-[#2f366b] transition-all flex flex-col"
                          >
                            <div
                              onClick={() => handleSelectPost(post)}
                              className="relative h-48 overflow-hidden bg-gray-200 cursor-pointer"
                            >
                              <img
                                src={post.thumbnail}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <span className={`absolute top-3 right-3 text-xs font-bold text-white px-2.5 py-1 rounded shadow-md cat-badge-${post.categoryIndex}`}>
                                {post.category}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLightboxImage({ url: post.thumbnail, title: post.title });
                                }}
                                className="absolute bottom-2 left-2 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#035dcd]"
                                title="تكبير الصورة"
                              >
                                <Maximize2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="p-4 flex-1 flex flex-col justify-between text-right">
                              <div
                                onClick={() => handleSelectPost(post)}
                                className="cursor-pointer"
                              >
                                <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-1.5">
                                  <Clock className="w-3 h-3 text-[#035dcd]" />
                                  <span>{post.date}</span>
                                </div>

                                <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-[#035dcd] dark:group-hover:text-blue-400 transition-colors">
                                  {post.title}
                                </h3>

                                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mt-2 leading-relaxed">
                                  {post.snippet}
                                </p>
                              </div>

                              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-[#2f366b] flex items-center justify-between text-xs">
                                <span className="text-gray-400">{post.readTime}</span>
                                <button
                                  onClick={() => handleSelectPost(post)}
                                  className="font-bold text-[#035dcd] dark:text-blue-400 hover:underline cursor-pointer"
                                >
                                  عرض بالكامل ←
                                </button>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    ) : (
                      /* Style 3: Compact List Layout */
                      <div className="space-y-3">
                        {displayedPosts.map((post) => (
                          <article
                            key={post.id}
                            className="group bg-white dark:bg-[#252a54] rounded-xl p-3 shadow-sm hover:shadow-md border border-gray-100 dark:border-[#2f366b] transition-all flex items-center gap-3.5 text-right"
                          >
                            <div
                              onClick={() => handleSelectPost(post)}
                              className="relative w-28 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-200 cursor-pointer"
                            >
                              <img
                                src={post.thumbnail}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-1">
                                <Clock className="w-3 h-3 text-[#035dcd]" />
                                <span>{post.date}</span>
                              </div>

                              <h3
                                onClick={() => handleSelectPost(post)}
                                className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#035dcd] dark:group-hover:text-blue-400 transition-colors leading-snug cursor-pointer"
                              >
                                {post.title}
                              </h3>

                              <div className="mt-1 flex items-center justify-between text-[11px] text-gray-400">
                                <span>{post.readTime}</span>
                                <button
                                  onClick={() => handleSelectPost(post)}
                                  className="text-[#035dcd] dark:text-blue-400 font-bold hover:underline cursor-pointer"
                                >
                                  قراءة ←
                                </button>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}

                    {/* Load More Button */}
                    {visibleCount < filteredPosts.length && (
                      <div className="pt-6 text-center">
                        <button
                          onClick={handleLoadMore}
                          disabled={isLoadingMore}
                          className="px-8 py-3 rounded-xl bg-[#035dcd] hover:bg-[#02479e] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                        >
                          {isLoadingMore ? 'جاري تحميل المزيد من المقالات...' : 'تحميل المزيد من المشاركات'}
                        </button>
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Sidebar Column */}
              <div className="lg:col-span-1">
                <Sidebar
                  categories={INITIAL_CATEGORIES}
                  posts={INITIAL_POSTS}
                  activeCategory={activeCategory}
                  onSelectCategory={handleSelectCategory}
                  onSelectPost={handleSelectPost}
                  onOpenSpeedTest={() => setIsSpeedTestOpen(true)}
                  onOpenRedirectTool={() => setIsRedirectToolOpen(true)}
                  onOpenSeoViewer={() => setIsSeoViewerOpen(true)}
                  onSearchQuery={() => setIsSearchOpen(true)}
                />
              </div>

            </div>
          </>
        )}

      </main>

      {/* 3. Footer */}
      <Footer
        onOpenStandalonePage={handleOpenStandalonePage}
        onOpenSpeedTest={() => setIsSpeedTestOpen(true)}
        onSelectCategory={handleSelectCategory}
      />

      {/* 4. Mobile Quick Bottom Navigation */}
      <MobileBottomNav
        onGoHome={() => handleSelectCategory('all')}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenMenu={() => setIsMobileMenuOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* 5. Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onOpenStandalonePage={handleOpenStandalonePage}
        onOpenSpeedTest={() => setIsSpeedTestOpen(true)}
        onOpenRedirectTool={() => setIsRedirectToolOpen(true)}

      />

      {/* 6. Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        posts={INITIAL_POSTS}
        onSelectPost={handleSelectPost}
      />

      <SpeedTestModal
        isOpen={isSpeedTestOpen}
        onClose={() => setIsSpeedTestOpen(false)}
      />

      <RedirectToolModal
        isOpen={isRedirectToolOpen}
        onClose={() => setIsRedirectToolOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <PagesModal
        pageType={activePage}
        onClose={() => setActivePage(null)}
      />

      {/* SEO & Schema.org JSON-LD Inspector Modal */}
      <SeoSchemaViewerModal
        isOpen={isSeoViewerOpen}
        onClose={() => setIsSeoViewerOpen(false)}
        post={selectedPost}
      />

      {/* Sitemap.xml Modal Explorer */}
      <SitemapModal
        isOpen={isSitemapOpen}
        onClose={() => setIsSitemapOpen(false)}
        posts={INITIAL_POSTS}
        onSelectPost={handleSelectPost}
      />



      {/* Fullscreen High-Resolution Image Lightbox */}
      <ImageLightbox
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        imageUrl={lightboxImage?.url || ''}
        imageTitle={lightboxImage?.title}
      />

    </div>
  );
}
