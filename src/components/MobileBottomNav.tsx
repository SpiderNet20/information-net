import React from 'react';
import { Home, Search, Menu, Moon, Sun, ArrowUp } from 'lucide-react';

interface MobileBottomNavProps {
  onGoHome: () => void;
  onOpenSearch: () => void;
  onOpenMenu: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onGoHome,
  onOpenSearch,
  onOpenMenu,
  darkMode,
  onToggleDarkMode,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 dark:bg-[#1b1e38]/95 backdrop-blur-md border-t border-gray-200 dark:border-[#2f366b] shadow-2xl py-2 px-3">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {/* Home */}
        <button
          onClick={onGoHome}
          className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-[#035dcd] dark:hover:text-blue-400 text-[10px] font-semibold"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#252a54]">
            <Home className="w-4 h-4 text-[#035dcd] dark:text-blue-400" />
          </div>
          <span>الرئيسية</span>
        </button>

        {/* Search */}
        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-[#035dcd] dark:hover:text-blue-400 text-[10px] font-semibold"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#252a54]">
            <Search className="w-4 h-4 text-purple-600" />
          </div>
          <span>بحث</span>
        </button>

        {/* Drawer Menu */}
        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-[#035dcd] dark:hover:text-blue-400 text-[10px] font-semibold"
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#035dcd] text-white shadow-md shadow-blue-500/30 -translate-y-2">
            <Menu className="w-5 h-5" />
          </div>
          <span className="-translate-y-1">القائمة</span>
        </button>

        {/* Dark Mode */}
        <button
          onClick={onToggleDarkMode}
          className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-[#035dcd] dark:hover:text-blue-400 text-[10px] font-semibold"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#252a54]">
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-blue-600" />
            )}
          </div>
          <span>{darkMode ? 'نهاري' : 'ليلي'}</span>
        </button>

        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-[#035dcd] dark:hover:text-blue-400 text-[10px] font-semibold"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#252a54]">
            <ArrowUp className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </div>
          <span>للأعلى</span>
        </button>
      </div>
    </nav>
  );
};
