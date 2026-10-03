import React, { useState } from 'react';
import { PageId } from '../types.ts';
import { playCyberSound } from '../utils/audio.ts';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenCadet: () => void;
  onOpenDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  onOpenNotifications,
  onOpenCadet,
  onOpenDrawer,
}) => {
  const [quickMatrixOpen, setQuickMatrixOpen] = useState(false);

  const navItems: Array<{ id: PageId; label: string }> = [
    { id: 'home', label: 'Home' },
    { id: 'information', label: 'Information' },
    { id: 'apps-matrix', label: 'Apps Database' },
    { id: 'parents-guide', label: 'Parents Guide' },
    { id: 'livestreaming', label: 'Livestreaming' },
    { id: 'legislation', label: 'Legislation' },
    { id: 'contact-us', label: 'Contact Us' },
  ];

  const handleNav = (id: PageId) => {
    playCyberSound('click');
    onNavigate(id);
    setQuickMatrixOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f131d]/85 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.36)] border-b border-[#313540]/40">
      <div className="h-20 max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand Emblem & Name */}
        <div 
          className="flex items-center gap-3 shrink-0 cursor-pointer select-none group"
          onClick={() => handleNav('home')}
        >
          <img 
            alt="SMC Shield Emblem" 
            className="h-8 w-auto object-contain group-hover:scale-105 transition-transform" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJrXbVhWC3PrQyoiGvdunoEKWYhj0VA7JDrl1SqR3sqVlgY07SwJNrlyho25aHGrKL59eAgmoQmDJiNhJ_BlwIzbXF-HoXVNqxSN11IYJg2KGLnbyk5mgLLHdZ-LpxMno2ztAWDNS1srI4ycdPCw6cd_9JeE4YShwaF1OsxyNigssAUG23ppjKy5vJnsO1gEJrXCPkj7BFNEWkSj4-arjJdqrz4X2XzVq0LkL2bKTKAdmvv45UGMdT"
          />
          <div className="flex flex-col">
            <span className="font-headline-md text-headline-md text-[#d0bcff] tracking-wider font-bold leading-none group-hover:text-white transition-colors">
              SMC
            </span>
            <span className="font-label-tag text-label-tag text-[#cbc3d7] uppercase tracking-widest text-[9px] sm:text-[10px] hidden xs:block truncate max-w-[130px] sm:max-w-none">
              Social Media Campaigns
            </span>
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#171b26] px-2 py-1.5 rounded-full border border-[#313540]/50 shadow-inner">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-3.5 py-1.5 rounded-full font-label-lg text-label-lg transition-all flex items-center ${
                  isActive
                    ? 'bg-[#a078ff] text-[#340080] font-semibold shadow-[0_0_20px_rgba(160,120,255,0.4)]'
                    : 'text-[#cbc3d7] hover:text-[#dfe2f1] hover:bg-[#1c1f2a]'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* Quick Matrix Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                playCyberSound('click');
                setQuickMatrixOpen(!quickMatrixOpen);
              }}
              onMouseEnter={() => setQuickMatrixOpen(true)}
              className="px-3.5 py-1.5 rounded-full font-label-lg text-label-lg text-[#cbc3d7] hover:text-[#dfe2f1] hover:bg-[#1c1f2a] transition-all flex items-center gap-1"
            >
              <span>Quick Matrix</span>
              <span className={`material-symbols-outlined text-sm transition-transform ${quickMatrixOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {quickMatrixOpen && (
              <div 
                onMouseLeave={() => setQuickMatrixOpen(false)}
                className="absolute top-full right-0 mt-2 w-64 p-2 bg-[#262a35]/95 backdrop-blur-xl rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] border border-[#313540] flex flex-col gap-1 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <button 
                  onClick={() => handleNav('home')} 
                  className={`px-3 py-2 rounded-lg text-left font-body-sm text-body-sm transition-colors ${
                    currentPage === 'home' ? 'bg-[#a078ff] text-[#340080] font-semibold' : 'text-[#cbc3d7] hover:bg-[#313540] hover:text-white'
                  }`}
                >
                  1. Home Command
                </button>
                <button 
                  onClick={() => handleNav('information')} 
                  className={`px-3 py-2 rounded-lg text-left font-body-sm text-body-sm transition-colors ${
                    currentPage === 'information' ? 'bg-[#a078ff] text-[#340080] font-semibold' : 'text-[#cbc3d7] hover:bg-[#313540] hover:text-white'
                  }`}
                >
                  2. Information &amp; Aims
                </button>
                <button 
                  onClick={() => handleNav('apps-matrix')} 
                  className={`px-3 py-2 rounded-lg text-left font-body-sm text-body-sm transition-colors ${
                    currentPage === 'apps-matrix' ? 'bg-[#a078ff] text-[#340080] font-semibold' : 'text-[#cbc3d7] hover:bg-[#313540] hover:text-white'
                  }`}
                >
                  3. Apps Database &amp; Safety
                </button>
                <button 
                  onClick={() => handleNav('parents-guide')} 
                  className={`px-3 py-2 rounded-lg text-left font-body-sm text-body-sm transition-colors ${
                    currentPage === 'parents-guide' ? 'bg-[#a078ff] text-[#340080] font-semibold' : 'text-[#cbc3d7] hover:bg-[#313540] hover:text-white'
                  }`}
                >
                  4. Parents Guidance
                </button>
                <button 
                  onClick={() => handleNav('livestreaming')} 
                  className={`px-3 py-2 rounded-lg text-left font-body-sm text-body-sm transition-colors ${
                    currentPage === 'livestreaming' ? 'bg-[#a078ff] text-[#340080] font-semibold' : 'text-[#cbc3d7] hover:bg-[#313540] hover:text-white'
                  }`}
                >
                  5. Livestreaming Security
                </button>
                <button 
                  onClick={() => handleNav('legislation')} 
                  className={`px-3 py-2 rounded-lg text-left font-body-sm text-body-sm transition-colors ${
                    currentPage === 'legislation' ? 'bg-[#a078ff] text-[#340080] font-semibold' : 'text-[#cbc3d7] hover:bg-[#313540] hover:text-white'
                  }`}
                >
                  6. Legislation &amp; Guidance
                </button>
                <button 
                  onClick={() => handleNav('contact-us')} 
                  className={`px-3 py-2 rounded-lg text-left font-body-sm text-body-sm transition-colors ${
                    currentPage === 'contact-us' ? 'bg-[#a078ff] text-[#340080] font-semibold' : 'text-[#cbc3d7] hover:bg-[#313540] hover:text-white'
                  }`}
                >
                  7. Contact &amp; Reports
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Action Controls & Cadet Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Quick Threat Search */}
          <button 
            aria-label="Quick Threat Search" 
            onClick={() => {
              playCyberSound('click');
              onOpenSearch();
            }}
            className="p-2.5 rounded-full bg-[#171b26] text-[#cbc3d7] hover:text-[#d0bcff] hover:bg-[#1c1f2a] transition-all border border-[#313540]/40 shadow-sm"
            title="Scan & Search (⌘K)"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Telemetry Notifications */}
          <button 
            aria-label="Telemetry Notifications" 
            onClick={() => {
              playCyberSound('click');
              onOpenNotifications();
            }}
            className="relative p-2.5 rounded-full bg-[#171b26] text-[#cbc3d7] hover:text-[#d0bcff] hover:bg-[#1c1f2a] transition-all border border-[#313540]/40 shadow-sm"
            title="Live Telemetry Feeds"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#4cd7f6] shadow-[0_0_8px_#4cd7f6] animate-pulse"></span>
          </button>

          {/* Cadet Profile Pill */}
          <button 
            onClick={() => {
              playCyberSound('click');
              onOpenCadet();
            }}
            className="flex items-center gap-2.5 pl-1.5 py-1 pr-3 bg-[#171b26] hover:bg-[#1c1f2a] rounded-full border border-[#313540]/60 transition-all text-left shadow-sm active:scale-95"
            title="Cadet Profile & Badges"
          >
            <img 
              alt="Cadet Avatar" 
              className="w-8 h-8 rounded-full object-cover border border-[#4cd7f6]/40" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt78nyO77qjDsSo-1exwo1lRONipderNVg3KKsF5IDb-zTk7uHJvzuVlKFy01j-kAUQ-32C2Vb3mQyi0ouNrJIHoOQPpcIqMMypP0Jd5oIzSuW5DLMvm5Q7otMTgc7wTsTHTqWDxbx2fxXEO5-gcc0kE1Pa0Ix4VeGpP0ASy1tEPVbo9SBIKXmz95kXy04WGkm4KrsElCmDP_qu9HVcdXByym8NgbJEWjczmIMCXQauS3kTFQR5uFp"
            />
            <div className="hidden sm:flex flex-col">
              <span className="font-label-md text-label-md text-[#dfe2f1] leading-tight font-semibold">
                Alex K.
              </span>
              <span className="font-label-tag text-label-tag text-[#4cd7f6] text-[10px]">
                Lvl 4 Cyber Cadet
              </span>
            </div>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              playCyberSound('click');
              onOpenDrawer();
            }}
            className="xl:hidden p-2 rounded-full bg-[#171b26] text-[#cbc3d7] hover:text-[#dfe2f1] border border-[#313540]/60 active:scale-95"
            aria-label="Toggle Mobile Matrix Navigation"
          >
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};
