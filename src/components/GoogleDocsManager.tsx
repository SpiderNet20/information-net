import React, { useState, useEffect } from 'react';
import { FileText, LogIn, LogOut, Loader2, X, FileSearch, ExternalLink, FileEdit, Copy, Check } from 'lucide-react';
import { googleSignIn, logout, initAuth, getAccessToken } from '../utils/googleAuth';
import { User } from 'firebase/auth';

interface GoogleDocsManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GoogleDoc {
  id: string;
  name: string;
  mimeType: string;
}

export const GoogleDocsManager: React.FC<GoogleDocsManagerProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [docs, setDocs] = useState<GoogleDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [selectedDocContent, setSelectedDocContent] = useState<string | null>(null);
  const [viewingDocId, setViewingDocId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (u, t) => {
        setUser(u);
        setToken(t);
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (token && isOpen) {
      fetchDocs();
    }
  }, [token, isOpen]);

  const fetchDocs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.document'&fields=files(id, name, mimeType)",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error('فشل جلب المستندات');
      const data = await res.json();
      setDocs(data.files || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDocContent = async (docId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`https://docs.googleapis.com/v1/documents/${docId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('فشل جلب محتوى المستند');
      const data = await res.json();
      
      // Basic text extraction from Google Docs JSON structure
      let text = "";
      if (data.body && data.body.content) {
        data.body.content.forEach((item: any) => {
          if (item.paragraph && item.paragraph.elements) {
            item.paragraph.elements.forEach((el: any) => {
              if (el.textRun && el.textRun.content) {
                text += el.textRun.content;
              }
            });
          }
        });
      }
      setSelectedDocContent(text);
      setViewingDocId(docId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
      }
    } catch (err: any) {
      setError('فشل تسجيل الدخول: ' + err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setDocs([]);
    setSelectedDocContent(null);
    setViewingDocId(null);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (selectedDocContent) {
      await navigator.clipboard.writeText(selectedDocContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#1b1e38] w-full max-w-4xl max-h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 dark:border-[#2f366b]">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-[#2f366b] flex items-center justify-between bg-gray-50 dark:bg-[#1b1e38]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-[#035dcd] dark:text-blue-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white">إدارة مستندات جوجل</h2>
              <p className="text-xs text-gray-400">استيراد المقالات من Google Docs</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#252a54] text-gray-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!user ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
              <div className="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#035dcd]">
                <FileSearch className="w-10 h-10" />
              </div>
              <div className="max-w-md">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">اربط حسابك للبدء</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  يسمح لك هذا الدمج بالوصول إلى مستندات جوجل الخاصة بك لتحويلها إلى مقالات في مدونة العنكبوت للمعلومات.
                </p>
              </div>
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-white dark:bg-white text-gray-700 font-bold border border-gray-200 dark:border-transparent shadow-sm hover:shadow-md transition-all disabled:opacity-50"
              >
                {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5 text-blue-600" />}
                <span>تسجيل الدخول باستخدام جوجل</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Docs List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span>مستنداتك</span>
                    <span className="text-[10px] bg-blue-100 dark:bg-blue-900/40 text-blue-600 px-2 py-0.5 rounded-full">{docs.length}</span>
                  </h3>
                  <button onClick={fetchDocs} className="text-xs text-[#035dcd] hover:underline">تحديث</button>
                </div>
                
                {loading && !viewingDocId && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-[#035dcd]" />
                  </div>
                )}

                {!loading && docs.length === 0 && (
                  <div className="p-8 text-center border-2 border-dashed border-gray-100 dark:border-[#2f366b] rounded-2xl">
                    <p className="text-gray-400 text-sm">لم يتم العثور على مستندات جوجل</p>
                  </div>
                )}

                <div className="space-y-2">
                  {docs.map(doc => (
                    <button
                      key={doc.id}
                      onClick={() => fetchDocContent(doc.id)}
                      className={`w-full p-4 rounded-2xl flex items-center gap-4 text-right transition-all border ${
                        viewingDocId === doc.id 
                        ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700/50' 
                        : 'bg-gray-50 dark:bg-[#1e2348] border-gray-100 dark:border-[#2f366b] hover:border-blue-300'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-blue-500 text-white shadow-sm">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="flex-1 font-bold text-gray-800 dark:text-gray-100 text-sm truncate">{doc.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview / Import */}
              <div className="bg-gray-50 dark:bg-[#1e2348] rounded-2xl p-5 border border-gray-100 dark:border-[#2f366b] flex flex-col min-h-[400px]">
                {loading && viewingDocId ? (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-3">
                    <Loader2 className="w-10 h-10 animate-spin text-[#035dcd]" />
                    <span className="text-xs text-gray-400">جاري تحميل المحتوى...</span>
                  </div>
                ) : selectedDocContent ? (
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-black text-gray-900 dark:text-white">معاينة المستند</h4>
                      <div className="flex gap-2">
                        <button 
                          onClick={handleCopy}
                          className={`p-2 rounded-lg transition-all ${copied ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300'}`}
                          title={copied ? 'تم النسخ!' : 'نسخ النص'}
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button className="p-2 rounded-lg bg-[#035dcd] text-white hover:bg-blue-700 shadow-sm" title="استيراد كمقال">
                          <FileEdit className="w-4 h-4" />
                        </button>
                        <a 
                          href={`https://docs.google.com/document/d/${viewingDocId}/edit`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300"
                          title="فتح في Google Docs"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                    <div className="flex-1 bg-white dark:bg-[#1b1e38] p-4 rounded-xl border border-gray-100 dark:border-[#2f366b] overflow-y-auto text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed max-h-[350px]">
                      {selectedDocContent}
                    </div>
                    <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-900/30">
                      <p className="text-[10px] text-amber-700 dark:text-amber-400 leading-tight">
                        ملاحظة: هذا استيراد نصي أولي. قد تحتاج لتعديل التنسيق والصور يدوياً بعد الاستيراد.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-6">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-300 dark:text-gray-600 mb-4">
                      <FileText className="w-8 h-8" />
                    </div>
                    <p className="text-gray-400 text-sm">اختر مستنداً من القائمة الجانبية لمعاينته أو استيراده</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {error && (
            <div className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs text-right">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        {user && (
          <div className="p-4 border-t border-gray-100 dark:border-[#2f366b] flex items-center justify-between bg-gray-50 dark:bg-[#1b1e38]">
            <div className="flex items-center gap-3">
              <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#2f366b]" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-900 dark:text-white leading-none">{user.displayName}</span>
                <span className="text-[10px] text-gray-400">{user.email}</span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs font-bold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
