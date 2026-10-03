import React from 'react';
import { PageId } from '../types.ts';
import { playCyberSound } from '../utils/audio.ts';

interface MobileBottomNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenScanner: () => void;
  onOpenDrawer: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
  onOpenScanner,
  onOpenDrawer,
}) => {
  return (
    <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0f131d]/95 backdrop-blur-xl border-t border-[#313540]/70 shadow-[0_-8px_30px_rgba(0,0,0,0.6)] px-3 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        
        {/* Item 1: Home Command */}
        <button
          onClick={() => {
            playCyberSound('click');
            onNavigate('home');
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
            currentPage === 'home'
              ? 'text-[#d0bcff]'
              : 'text-[#958ea0] hover:text-[#dfe2f1]'
          }`}
          aria-label="Home Command"
        >
          <span className={`material-symbols-outlined text-[22px] ${currentPage === 'home' ? 'font-bold scale-110' : ''}`}>
            grid_view
          </span>
          <span className={`text-[10px] font-mono tracking-tight ${currentPage === 'home' ? 'font-bold text-white' : ''}`}>
            Home
          </span>
        </button>

        {/* Item 2: Apps Matrix */}
        <button
          onClick={() => {
            playCyberSound('click');
            onNavigate('apps-matrix');
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
            currentPage === 'apps-matrix'
              ? 'text-[#4cd7f6]'
              : 'text-[#958ea0] hover:text-[#dfe2f1]'
          }`}
          aria-label="Apps Matrix"
        >
          <span className={`material-symbols-outlined text-[22px] ${currentPage === 'apps-matrix' ? 'font-bold scale-110' : ''}`}>
            security
          </span>
          <span className={`text-[10px] font-mono tracking-tight ${currentPage === 'apps-matrix' ? 'font-bold text-white' : ''}`}>
            Matrix
          </span>
        </button>

        {/* Item 3: Center Emergency Scan (Hero Button) */}
        <div className="relative -top-5 flex flex-col items-center">
          <button
            onClick={() => {
              playCyberSound('scanner');
              onOpenScanner();
            }}
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#009eb9] to-[#4cd7f6] text-[#002f37] flex items-center justify-center shadow-[0_0_24px_rgba(76,215,246,0.6)] active:scale-90 transition-transform border-2 border-[#dfe2f1]/30 group"
            aria-label="Scan Suspicious DM or Link"
            title="Scan Suspicious DM or Link"
          >
            <span className="material-symbols-outlined text-[26px] font-bold group-hover:rotate-12 transition-transform">
              radar
            </span>
          </button>
          <span className="text-[9px] font-mono font-bold tracking-widest text-[#4cd7f6] mt-1 uppercase">
            SCAN DM
          </span>
        </div>

        {/* Item 4: Parents Guide */}
        <button
          onClick={() => {
            playCyberSound('click');
            onNavigate('parents-guide');
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
            currentPage === 'parents-guide'
              ? 'text-[#a078ff]'
              : 'text-[#958ea0] hover:text-[#dfe2f1]'
          }`}
          aria-label="Parents Guidance"
        >
          <span className={`material-symbols-outlined text-[22px] ${currentPage === 'parents-guide' ? 'font-bold scale-110' : ''}`}>
            family_restroom
          </span>
          <span className={`text-[10px] font-mono tracking-tight ${currentPage === 'parents-guide' ? 'font-bold text-white' : ''}`}>
            Parents
          </span>
        </button>

        {/* Item 5: Full Menu Drawer */}
        <button
          onClick={() => {
            playCyberSound('click');
            onOpenDrawer();
          }}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[#958ea0] hover:text-[#dfe2f1] transition-all"
          aria-label="All Defense Modules"
        >
          <span className="material-symbols-outlined text-[22px]">
            widgets
          </span>
          <span className="text-[10px] font-mono tracking-tight">
            Modules
          </span>
        </button>

      </div>
    </div>
  );
};
