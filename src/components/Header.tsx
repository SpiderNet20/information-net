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
} from 'lucide-react';
import { PageType } from './PagesModal';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
  onOpenSpeedTest: () => void;
  onOpenRedirectTool: () => void;
  onOpenSeoViewer: () => void;
  onOpenSitemap?: () => void;
  onOpenPage: (page: PageType) => void;
  onOpenContact: () => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenMobileMenu,
  onOpenSearch,
  onOpenSpeedTest,
  onOpenRedirectTool,
  onOpenSeoViewer,
  onOpenSitemap,
  onOpenPage,
  onOpenContact,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* Top Ribbon (HeaderTOP in SeoPlus) */}
      <div className="bg-[#035dcd] text-white text-xs border-b border-blue-400/20">
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between">
          {/* Statutory and Tool Pages */}
          <nav className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onSelectCategory('all')}
              className="hover:text-blue-100 transition-colors"
            >
              الصفحة الرئيسية
            </button>
            <span className="opacity-40">•</span>
            <button
              onClick={onOpenContact}
              className="hover:text-blue-100 transition-colors"
            >
              اتصل بنا
            </button>
            <span className="opacity-40">•</span>
            <button
              onClick={() => onOpenPage('about')}
              className="hover:text-blue-100 transition-colors"
            >
              من نحن
            </button>
            <span className="opacity-40">•</span>
            <button
              onClick={() => onOpenPage('privacy')}
              className="hover:text-blue-100 transition-colors"
            >
              سياسة الخصوصية
            </button>
            <span className="opacity-40">•</span>
            <button
              onClick={() => onOpenPage('terms')}
              className="hover:text-blue-100 transition-colors"
            >
              اتفاقية المستخدم
            </button>
            <span className="opacity-40">•</span>
            <button
              onClick={onOpenSpeedTest}
              className="flex items-center gap-1 text-amber-200 hover:text-white font-medium transition-colors"
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>فحص السرعة</span>
            </button>
            <span className="opacity-40">•</span>
            {/* Sitemap XML */}
            {onOpenSitemap && (
              <button
                onClick={onOpenSitemap}
                className="flex items-center gap-1 text-blue-100 hover:text-white font-bold transition-colors"
                title="خريطة الموقع XML"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>خريطة الموقع (Sitemap)</span>
              </button>
            )}
          </nav>

          {/* Social Icons (HeaderTOP in SeoPlus) */}
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
      <div className="bg-white dark:bg-[#252a54] border-b border-gray-100 dark:border-[#2f366b] transition-colors">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Right Section: Mobile Menu + Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-[#1e2348] text-gray-700 dark:text-gray-200 hover:bg-gray-200 transition-colors"
              aria-label="القائمة الجانبية"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
              }}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-[#035dcd] to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                {/* Spider / Web Icon */}
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8zm-1-13h2v4h-2zm0 6h2v2h-2z" />
                  <path d="M7.05 6.05 5.636 4.636a9 9 0 0 1 12.728 0l-1.414 1.414a7 7 0 0 0-9.9 0zm9.9 11.9 1.414 1.414a9 9 0 0 1-12.728 0l1.414-1.414a7 7 0 0 0 9.9 0z" />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="font-black text-lg sm:text-xl text-gray-900 dark:text-white tracking-tight leading-none group-hover:text-[#035dcd] dark:group-hover:text-blue-400 transition-colors">
                  العنكبوت <span className="text-[#035dcd] dark:text-blue-400 font-extrabold">للمعلومات</span>
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-wider">
                  information-net.com
                </span>
              </div>
            </a>
          </div>

          {/* Center Section: Desktop Nav Links */}
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

            <a
              href="/AI/"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('AI');
              }}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'AI' || activeCategory === 'الذكاء الاصطناعي'
                  ? 'text-[#035dcd] dark:text-blue-400 bg-blue-50/70 dark:bg-blue-900/30'
                  : 'hover:text-[#035dcd] dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-[#1e2348]'
              }`}
              title="https://www.information-net.com/AI/"
            >
              الذكاء الاصطناعي
            </a>

            <a
              href="/Games/"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('Games');
              }}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'Games' || activeCategory === 'الألعاب'
                  ? 'text-[#035dcd] dark:text-blue-400 bg-blue-50/70 dark:bg-blue-900/30'
                  : 'hover:text-[#035dcd] dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-[#1e2348]'
              }`}
              title="https://www.information-net.com/Games/"
            >
              الألعاب
            </a>

            <a
              href="/Software/"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('Software');
              }}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'Software' || activeCategory === 'البرامج'
                  ? 'text-[#035dcd] dark:text-blue-400 bg-blue-50/70 dark:bg-blue-900/30'
                  : 'hover:text-[#035dcd] dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-[#1e2348]'
              }`}
              title="https://www.information-net.com/Software/"
            >
              البرامج
            </a>

            <a
              href="/Business/"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('Business');
              }}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'Business' || activeCategory === 'الربح من الإنترنت'
                  ? 'text-[#035dcd] dark:text-blue-400 bg-blue-50/70 dark:bg-blue-900/30'
                  : 'hover:text-[#035dcd] dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-[#1e2348]'
              }`}
              title="https://www.information-net.com/Business/"
            >
              الربح من الإنترنت
            </a>

            <a
              href="/Education/"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('Education');
              }}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'Education' || activeCategory === 'مقالات تعليمية'
                  ? 'text-[#035dcd] dark:text-blue-400 bg-blue-50/70 dark:bg-blue-900/30'
                  : 'hover:text-[#035dcd] dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-[#1e2348]'
              }`}
              title="https://www.information-net.com/Education/"
            >
              مقالات تعليمية
            </a>
          </nav>

          {/* Left Section: Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#1e2348] hover:bg-gray-200 dark:hover:bg-[#2d3363] text-gray-700 dark:text-gray-200 flex items-center justify-center transition-colors"
              title="البحث في الموقع"
              aria-label="بحث"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#1e2348] hover:bg-gray-200 dark:hover:bg-[#2d3363] text-gray-700 dark:text-gray-200 flex items-center justify-center transition-colors"
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
    </header>
  );
};
