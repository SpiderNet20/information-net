import React from 'react';
import {
  Menu,
  Search,
  Moon,
  Sun,
  Send,
  Facebook,
  Youtube,
  Twitter,
  FileCode,
  Globe,
  Gauge,
  Sparkles,
  FileText,
} from 'lucide-react';
import { StandalonePageType } from '../types';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
  onOpenSpeedTest: () => void;
  onOpenRedirectTool: () => void;

  onOpenStandalonePage: (page: StandalonePageType) => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenGoogleDocs: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenMobileMenu,
  onOpenSearch,
  onOpenSpeedTest,
  onOpenRedirectTool,

  onOpenStandalonePage,
  activeCategory,
  onSelectCategory,
  onOpenGoogleDocs,
}) => {
  const categories = [
    { slug: 'all', name: 'الرئيسية' },
    { slug: 'AI', name: 'الذكاء الاصطناعي' },
    { slug: 'Games', name: 'الألعاب' },
    { slug: 'Software', name: 'البرامج' },
    { slug: 'Business', name: 'الربح من الإنترنت' },
    { slug: 'Education', name: 'مقالات تعليمية' },
  ];

  return (
    <header className="lg:sticky top-0 z-40 w-full shadow-sm bg-white dark:bg-[#252a54]">
      {/* Top Ribbon (HeaderTOP in SeoPlus) - Hidden on Mobile */}
      <div className="hidden md:block bg-[#035dcd] text-white text-xs border-b border-blue-400/20">
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between">
          {/* Statutory and Tool Pages */}
          <nav className="flex items-center gap-4">
            <button
              onClick={() => onSelectCategory('all')}
              className="hover:text-blue-100 transition-colors cursor-pointer"
            >
              الصفحة الرئيسية
            </button>
            <span className="opacity-40">•</span>
            <button
              onClick={() => onOpenStandalonePage('contact')}
              className="hover:text-blue-100 transition-colors cursor-pointer"
            >
              اتصل بنا
            </button>
            <span className="opacity-40">•</span>
            <button
              onClick={() => onOpenStandalonePage('about')}
              className="hover:text-blue-100 transition-colors cursor-pointer"
            >
              من نحن
            </button>
            <span className="opacity-40">•</span>
            <button
              onClick={() => onOpenStandalonePage('privacy')}
              className="hover:text-blue-100 transition-colors cursor-pointer"
            >
              سياسة الخصوصية
            </button>
            <span className="opacity-40">•</span>
            <button
              onClick={() => onOpenStandalonePage('terms')}
              className="hover:text-blue-100 transition-colors cursor-pointer"
            >
              اتفاقية المستخدم
            </button>
            <span className="opacity-40">•</span>
            <button
              onClick={onOpenSpeedTest}
              className="flex items-center gap-1 text-amber-200 hover:text-white font-medium transition-colors cursor-pointer"
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>فحص السرعة</span>
            </button>
            <span className="opacity-40">•</span>
            <button
              onClick={() => onOpenStandalonePage('sitemap')}
              className="flex items-center gap-1 text-blue-100 hover:text-white font-bold transition-colors cursor-pointer"
              title="خريطة الموقع XML"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>خريطة الموقع (Sitemap)</span>
            </button>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-3 mr-auto md:mr-0">
            <a
              href="https://t.me/arb_1xbet"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-white/20 rounded transition-colors"
              title="تيليجرام"
            >
              <Send className="w-3.5 h-3.5 -rotate-90" />
            </a>
            <a
              href="https://www.facebook.com/informationspider/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-white/20 rounded transition-colors"
              title="فيسبوك"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCMNj0yd5HpbesN8wWh8167Q"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-white/20 rounded transition-colors"
              title="يوتيوب"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-white/20 rounded transition-colors"
              title="تويتر"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (HeaderBOT in SeoPlus) */}
      <div className="border-b border-gray-100 dark:border-[#2f366b] transition-colors">
        <div className="max-w-7xl mx-auto px-4 h-14 lg:h-20 flex items-center justify-between gap-4">
          
          {/* Right Section: Brand Logo */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
              }}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-9 h-9 lg:w-11 lg:h-11 rounded-xl bg-gradient-to-tr from-[#035dcd] to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>

              <div className="flex flex-col">
                <span className="font-black text-base lg:text-xl text-gray-900 dark:text-white tracking-tight leading-none group-hover:text-[#035dcd] dark:group-hover:text-blue-400 transition-colors">
                  العنكبوت <span className="text-[#035dcd] dark:text-blue-400 font-extrabold">للمعلومات</span>
                </span>
                <span className="text-[9px] lg:text-[10px] text-gray-400 font-medium tracking-wider">
                  information-net.com
                </span>
              </div>
            </a>
          </div>

          {/* Center Section: Desktop Nav Links - Hidden on Mobile */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-bold text-gray-700 dark:text-gray-200">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
              }}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'all'
                  ? 'text-[#035dcd] dark:text-blue-400 bg-blue-50/70 dark:bg-blue-900/30'
                  : 'hover:text-[#035dcd] dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-[#1e2348]'
              }`}
            >
              الرئيسية
            </a>

            {categories.filter(c => c.slug !== 'all').map((cat) => (
              <a
                key={cat.slug}
                href={`/${cat.slug}/`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategory(cat.slug);
                }}
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  activeCategory === cat.slug || (activeCategory === 'all' && false)
                    ? 'text-[#035dcd] dark:text-blue-400 bg-blue-50/70 dark:bg-blue-900/30'
                    : 'hover:text-[#035dcd] dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-[#1e2348]'
                }`}
              >
                {cat.name}
              </a>
            ))}
          </nav>

          {/* Left Section: Action Buttons - Some hidden on mobile */}
          <div className="flex items-center gap-2">
            {/* Search Trigger - Hidden on mobile header */}
            <button
              onClick={onOpenSearch}
              className="hidden lg:flex w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#1e2348] hover:bg-gray-200 dark:hover:bg-[#2d3363] text-gray-700 dark:text-gray-200 items-center justify-center transition-colors cursor-pointer"
              title="البحث في الموقع"
              aria-label="بحث"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Google Docs Integration */}
            <button
              onClick={onOpenGoogleDocs}
              className="hidden lg:flex w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-[#035dcd] dark:text-blue-400 hover:bg-[#035dcd] hover:text-white transition-all items-center justify-center cursor-pointer shadow-sm"
              title="مستندات جوجل"
            >
              <FileText className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle - Hidden on mobile header */}
            <button
              onClick={onToggleDarkMode}
              className="hidden lg:flex w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#1e2348] hover:bg-gray-200 dark:hover:bg-[#2d3363] text-gray-700 dark:text-gray-200 items-center justify-center transition-colors cursor-pointer"
              title={darkMode ? 'الوضع النهاري' : 'الوضع الليلي'}
              aria-label="تبديل الوضع"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-blue-600" />
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Promotional Download Banner - Only visible on Homepage */}
      {activeCategory === 'all' && (
        <div className="bg-gradient-to-r from-[#035dcd] to-blue-600 text-white border-b border-blue-400/20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1 text-right order-2 md:order-1">
              <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                العنكبوت <span className="text-blue-200 font-extrabold">للمعلومات</span>
              </h2>
              <p className="text-blue-50 text-sm md:text-lg mb-8 leading-relaxed opacity-90 max-w-xl font-medium">
                مدونة تعليمية تقنية شاملة تغطي الألعاب، البرامج، ببجي موبايل، الذكاء الاصطناعي، والشروحات والحلول التقنية الحصرية. عالمك التقني في مكان واحد.
              </p>
              <div className="flex flex-wrap gap-4 justify-end md:justify-start">
                <button className="bg-white text-[#035dcd] px-8 py-3.5 rounded-2xl font-bold hover:bg-blue-50 transition-all shadow-xl hover:shadow-blue-500/20 flex items-center gap-2 group cursor-pointer">
                  <span>حمل الآن</span>
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            </div>
            <div className="flex-1 relative order-1 md:order-2 flex justify-center">
              <div className="relative w-full max-w-[320px] h-[200px] md:h-[280px] overflow-hidden rounded-[2.5rem] shadow-xl border-8 border-white/10 group">
                <img 
                  src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800&auto=format&fit=crop" 
                  alt="تطبيق العنكبوت للمعلومات" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Categories Scroll Bar - ONLY visible on LG and below */}
      <div className="lg:hidden border-b border-gray-100 dark:border-[#2f366b] bg-gray-50/50 dark:bg-[#1f244a]/50 overflow-hidden">
        <div className="flex items-center gap-2 overflow-x-auto px-4 py-2.5 no-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-[11px] font-bold transition-all border cursor-pointer ${
                activeCategory === cat.slug
                  ? 'bg-[#035dcd] text-white border-[#035dcd] shadow-sm'
                  : 'bg-white dark:bg-[#252a54] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-[#2f366b] hover:border-[#035dcd]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
