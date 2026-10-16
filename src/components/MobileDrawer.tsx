import React from 'react';
import {
  X,
  Home,
  Gamepad2,
  Cpu,
  HelpCircle,
  Users,
  Gauge,
  Shield,
  FileText,
  Mail,
  Send,
  Facebook,
  Youtube,
  Twitter,
  Flame,
  Globe,
} from 'lucide-react';
import { StandalonePageType } from '../types';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenStandalonePage: (page: StandalonePageType) => void;
  onOpenSpeedTest: () => void;
  onOpenRedirectTool: () => void;

}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  activeCategory,
  onSelectCategory,
  onOpenStandalonePage,
  onOpenSpeedTest,
  onOpenRedirectTool,

}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white dark:bg-[#252a54] shadow-2xl flex flex-col z-50 text-right animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-gray-100 dark:border-[#2f366b] flex items-center justify-between bg-gradient-to-l from-blue-50 to-white dark:from-[#1e2348] dark:to-[#252a54]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#035dcd] flex items-center justify-center text-white font-bold text-sm">
              ع
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                العنكبوت للمعلومات
              </h3>
              <span className="text-[10px] text-gray-400">القائمة الرئيسية</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-[#1e2348] text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Navigation Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="text-[11px] font-bold text-gray-400 px-3 py-1 uppercase tracking-wider">
            أقسام المدونة
          </div>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('all');
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#035dcd] text-white shadow-sm'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1e2348]'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>الصفحة الرئيسية</span>
          </a>

          <a
            href="/AI/"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('AI');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
              activeCategory === 'AI' || activeCategory === 'الذكاء الاصطناعي'
                ? 'bg-[#035dcd] text-white shadow-sm'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1e2348]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Cpu className="w-4 h-4 text-indigo-500" />
              <span>الذكاء الاصطناعي</span>
            </div>
          </a>

          <a
            href="/Games/"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('Games');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
              activeCategory === 'Games' || activeCategory === 'الألعاب'
                ? 'bg-[#035dcd] text-white shadow-sm'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1e2348]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Gamepad2 className="w-4 h-4 text-emerald-500" />
              <span>الألعاب</span>
            </div>
          </a>

          <a
            href="/Software/"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('Software');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
              activeCategory === 'Software' || activeCategory === 'البرامج'
                ? 'bg-[#035dcd] text-white shadow-sm'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1e2348]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Flame className="w-4 h-4 text-cyan-500" />
              <span>البرامج</span>
            </div>
          </a>

          <a
            href="/Business/"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('Business');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
              activeCategory === 'Business' || activeCategory === 'الربح من الإنترنت'
                ? 'bg-[#035dcd] text-white shadow-sm'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1e2348]'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-amber-500" />
              <span>الربح من الإنترنت</span>
            </div>
          </a>

          <a
            href="/Education/"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('Education');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
              activeCategory === 'Education' || activeCategory === 'مقالات تعليمية'
                ? 'bg-[#035dcd] text-white shadow-sm'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1e2348]'
            }`}
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-blue-500" />
              <span>مقالات تعليمية</span>
            </div>
          </a>

          <div className="pt-4 pb-1 text-[11px] font-bold text-gray-400 px-3 uppercase tracking-wider">
            أدوات وإضافات
          </div>

          <button
            onClick={() => {
              onOpenSpeedTest();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1e2348]"
          >
            <Gauge className="w-4 h-4 text-amber-500" />
            <span>أداة قياس سرعة الإنترنت</span>
          </button>

          <button
            onClick={() => {
              onOpenRedirectTool();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1e2348]"
          >
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>فاحص وحامي الروابط</span>
          </button>



          <div className="pt-4 pb-1 text-[11px] font-bold text-gray-400 px-3 uppercase tracking-wider">
            معلومات الموقع
          </div>

          <button
            onClick={() => {
              onOpenStandalonePage('contact');
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1e2348]"
          >
            <Mail className="w-4 h-4 text-gray-400" />
            <span>اتصل بنا</span>
          </button>

          <button
            onClick={() => {
              onOpenStandalonePage('about');
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1e2348]"
          >
            <FileText className="w-4 h-4 text-gray-400" />
            <span>من نحن</span>
          </button>

          <button
            onClick={() => {
              onOpenStandalonePage('privacy');
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1e2348]"
          >
            <Shield className="w-4 h-4 text-gray-400" />
            <span>سياسة الخصوصية</span>
          </button>

          <button
            onClick={() => {
              onOpenStandalonePage('terms');
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1e2348]"
          >
            <FileText className="w-4 h-4 text-gray-400" />
            <span>اتفاقية المستخدم</span>
          </button>

          <button
            onClick={() => {
              onOpenStandalonePage('sitemap');
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1e2348]"
          >
            <Globe className="w-4 h-4 text-gray-400" />
            <span>خريطة الموقع</span>
          </button>
        </div>

        {/* Footer Socials */}
        <div className="p-4 border-t border-gray-100 dark:border-[#2f366b] bg-gray-50 dark:bg-[#1f244a] flex items-center justify-around">
          <a
            href="https://t.me/arb_1xbet"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#0088cc] text-white"
            title="تيليجرام"
          >
            <Send className="w-4 h-4 -rotate-90" />
          </a>
          <a
            href="https://www.facebook.com/informationspider/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#1877F2] text-white"
            title="فيسبوك"
          >
            <Facebook className="w-4 h-4" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCMNj0yd5HpbesN8wWh8167Q"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#FF0000] text-white"
            title="يوتيوب"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#1DA1F2] text-white"
            title="تويتر"
          >
            <Twitter className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
};
