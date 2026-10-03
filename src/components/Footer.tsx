import React, { useState } from 'react';
import { PageId } from '../types.ts';
import { playCyberSound, isAudioActive, toggleAudioActive } from '../utils/audio.ts';

interface FooterProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentPage, onNavigate }) => {
  const [audioEnabled, setAudioEnabled] = useState(isAudioActive());

  const getPageTitle = (page: PageId): string => {
    switch (page) {
      case 'home': return 'Home Command';
      case 'information': return 'Information & Aims';
      case 'apps-matrix': return 'Apps Database & Audit';
      case 'parents-guide': return 'Parents Guidance Hub';
      case 'livestreaming': return 'Livestreaming Defense Lab';
      case 'legislation': return 'Legislation & Legal Shields';
      case 'contact-us': return 'Encrypted Dispatch';
      default: return 'Home Command';
    }
  };

  const handleNav = (id: PageId) => {
    playCyberSound('click');
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0a0e18] text-[#dfe2f1] pt-12 pb-10 border-t border-[#1c1f2a]">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col gap-10">
        
        {/* Dynamic "You Are Here" Interactive Beacon */}
        <div className="w-full flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#3131c0]/20 border border-[#4cd7f6]/30 shadow-[0_0_24px_rgba(76,215,246,0.25)]">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[20px] animate-pulse">radar</span>
            <span className="font-headline-sm text-headline-sm text-[#acedff] tracking-wide text-sm sm:text-base font-semibold">
              You Are Here: {getPageTitle(currentPage)}
            </span>
          </div>
        </div>

        {/* 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-8">
          {/* Col 1: Initiative info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-headline-md text-headline-md text-[#d0bcff] font-bold leading-none">
                SMC INITIATIVE
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#a078ff]/20 text-[#d0bcff] font-label-tag text-label-tag">
                GEN-Z DEFENSE
              </span>
            </div>
            <p className="font-body-md text-body-md text-[#cbc3d7] leading-relaxed">
              Tactical digital street-smarts for the algorithmic age. Empowering teenagers and parents with live threat mitigation, zero-condescension education, and tactical privacy sovereignty.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button 
                aria-label="Discord Community" 
                onClick={() => handleNav('contact-us')}
                className="p-2.5 rounded-full bg-[#1c1f2a] hover:bg-[#d0bcff] hover:text-[#3c0091] shadow-[0_0_12px_rgba(208,188,255,0.2)] transition-all"
                title="Discord Community"
              >
                <span className="material-symbols-outlined text-[20px]">forum</span>
              </button>
              <button 
                aria-label="TikTok Feed" 
                onClick={() => handleNav('apps-matrix')}
                className="p-2.5 rounded-full bg-[#1c1f2a] hover:bg-[#4cd7f6] hover:text-[#003640] shadow-[0_0_12px_rgba(76,215,246,0.3)] transition-all"
                title="TikTok Telemetry"
              >
                <span className="material-symbols-outlined text-[20px]">smart_display</span>
              </button>
              <button 
                aria-label="Instagram Channel" 
                onClick={() => handleNav('apps-matrix')}
                className="p-2.5 rounded-full bg-[#1c1f2a] hover:bg-[#a078ff] hover:text-[#340080] transition-all"
                title="Instagram Telemetry"
              >
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
              </button>
              <button 
                aria-label="YouTube Channel" 
                onClick={() => handleNav('livestreaming')}
                className="p-2.5 rounded-full bg-[#1c1f2a] hover:bg-[#3131c0] hover:text-[#dfe2f1] transition-all"
                title="Broadcast Lab"
              >
                <span className="material-symbols-outlined text-[20px]">play_circle</span>
              </button>
              <button 
                aria-label="Live Stream Defense" 
                onClick={() => handleNav('livestreaming')}
                className="p-2.5 rounded-full bg-[#1c1f2a] hover:bg-[#d0bcff] hover:text-[#3c0091] transition-all"
                title="Twitch & Live Defense"
              >
                <span className="material-symbols-outlined text-[20px]">live_tv</span>
              </button>
            </div>
          </div>

          {/* Col 2: Core Matrix Modules */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="font-label-lg text-label-lg uppercase tracking-wider text-[#d0bcff]">
              Core Matrix Modules
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button 
                onClick={() => handleNav('home')} 
                className="text-left font-body-sm text-body-sm text-[#cbc3d7] hover:text-[#4cd7f6] transition-colors"
              >
                Home Command
              </button>
              <button 
                onClick={() => handleNav('information')} 
                className="text-left font-body-sm text-body-sm text-[#cbc3d7] hover:text-[#4cd7f6] transition-colors"
              >
                Campaign Information
              </button>
              <button 
                onClick={() => handleNav('apps-matrix')} 
                className="text-left font-body-sm text-body-sm text-[#cbc3d7] hover:text-[#4cd7f6] transition-colors"
              >
                Popular Apps Matrix
              </button>
              <button 
                onClick={() => handleNav('parents-guide')} 
                className="text-left font-body-sm text-body-sm text-[#cbc3d7] hover:text-[#4cd7f6] transition-colors"
              >
                Parents Guidance Hub
              </button>
              <button 
                onClick={() => handleNav('livestreaming')} 
                className="text-left font-body-sm text-body-sm text-[#cbc3d7] hover:text-[#4cd7f6] transition-colors"
              >
                Livestreaming Defense
              </button>
              <button 
                onClick={() => handleNav('legislation')} 
                className="text-left font-body-sm text-body-sm text-[#cbc3d7] hover:text-[#4cd7f6] transition-colors"
              >
                Legislation &amp; Guidance
              </button>
              <button 
                onClick={() => handleNav('contact-us')} 
                className="text-left font-body-sm text-body-sm text-[#cbc3d7] hover:text-[#4cd7f6] transition-colors"
              >
                Contact &amp; Reporting
              </button>
            </div>
          </div>

          {/* Col 3: Educational Trust */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-label-lg text-label-lg uppercase tracking-wider text-[#d0bcff]">
              Educational Trust
            </span>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-full bg-[#1c1f2a] text-[#cbc3d7] font-label-tag text-label-tag flex items-center gap-1.5 border border-[#313540]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]"></span>
                CyberEd Alliance
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#1c1f2a] text-[#cbc3d7] font-label-tag text-label-tag flex items-center gap-1.5 border border-[#313540]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c0c1ff]"></span>
                Digital Safety Lab
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#1c1f2a] text-[#cbc3d7] font-label-tag text-label-tag flex items-center gap-1.5 border border-[#313540]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d0bcff]"></span>
                K-12 Secure Net
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Policy Links */}
        <div className="pt-8 border-t border-[#1c1f2a] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body-sm text-body-sm text-[#cbc3d7] text-center md:text-left">
            © 2025 Social Media Campaigns (SMC) Project. Educational Open License for Schools &amp; Teens.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6">
            <button
              onClick={() => {
                const active = toggleAudioActive();
                setAudioEnabled(active);
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1f2a] border border-[#313540] text-xs font-mono text-[#cbc3d7] hover:text-white transition-colors"
              title={audioEnabled ? "Mute Cybernetic Audio" : "Unmute Cybernetic Audio"}
            >
              <span className="material-symbols-outlined text-[16px] text-[#4cd7f6]">
                {audioEnabled ? 'volume_up' : 'volume_off'}
              </span>
              <span>{audioEnabled ? 'Sound ON' : 'Muted'}</span>
            </button>
            <button 
              onClick={() => handleNav('contact-us')} 
              className="font-body-sm text-body-sm text-[#cbc3d7] hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => handleNav('legislation')} 
              className="font-body-sm text-body-sm text-[#cbc3d7] hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => handleNav('information')} 
              className="font-body-sm text-body-sm text-[#cbc3d7] hover:text-white transition-colors"
            >
              Ethics Charter
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
