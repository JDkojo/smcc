import React from 'react';
import { PageId } from '../types.ts';
import { playCyberSound } from '../utils/audio.ts';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenScanner: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  onOpenScanner,
}) => {
  if (!isOpen) return null;

  const navItems: Array<{ id: PageId; label: string; icon: string; badge?: string; desc: string }> = [
    { id: 'home', label: '1. Home Command', icon: 'grid_view', desc: 'Central defense matrix dashboard' },
    { id: 'information', label: '2. Information & Aims', icon: 'info', badge: 'DIRECTIVES', desc: 'Youth Autonomy & Seattle Cyber Cohort' },
    { id: 'apps-matrix', label: '3. Apps Database & Matrix', icon: 'security', badge: 'ACTIVE AUDIT', desc: 'Hardware sensor locks & telemetry teardown' },
    { id: 'parents-guide', label: '4. Parents Guidance Hub', icon: 'family_restroom', desc: 'Tactical de-escalation scripts & family compact' },
    { id: 'livestreaming', label: '5. Livestreaming Defense Lab', icon: 'live_tv', badge: 'KILLSWITCH', desc: 'Ambient leak radar & OBS pre-flight' },
    { id: 'legislation', label: '6. Legislation & Legal Shields', icon: 'policy', desc: 'KOSA, COPPA 2.0, WA health act tracking' },
    { id: 'contact-us', label: '7. Encrypted Comms & Reports', icon: 'emergency', badge: 'HOTLINE', desc: 'Incident dispatch & crisis intervention' },
  ];

  const handleItemClick = (id: PageId) => {
    playCyberSound('click');
    onNavigate(id);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Full Viewport Dark Blurred Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={() => {
          playCyberSound('click');
          onClose();
        }}
      />

      {/* Slideout Panel */}
      <div 
        className="relative z-10 w-[88%] max-w-sm h-full bg-[#171b26] border-l border-[#313540] shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 flex flex-col gap-4">
          
          {/* Drawer Top Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#313540]/60">
            <div className="flex items-center gap-3">
              <img 
                alt="SMC Shield" 
                className="h-8 w-auto object-contain" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJrXbVhWC3PrQyoiGvdunoEKWYhj0VA7JDrl1SqR3sqVlgY07SwJNrlyho25aHGrKL59eAgmoQmDJiNhJ_BlwIzbXF-HoXVNqxSN11IYJg2KGLnbyk5mgLLHdZ-LpxMno2ztAWDNS1srI4ycdPCw6cd_9JeE4YShwaF1OsxyNigssAUG23ppjKy5vJnsO1gEJrXCPkj7BFNEWkSj4-arjJdqrz4X2XzVq0LkL2bKTKAdmvv45UGMdT"
              />
              <div className="flex flex-col">
                <span className="text-white font-bold text-base font-display-hero tracking-wider">
                  SMC MATRIX
                </span>
                <span className="text-[10px] font-mono text-[#4cd7f6] uppercase tracking-widest">
                  Zero-Lecture Lab v3.4
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                playCyberSound('click');
                onClose();
              }}
              className="p-2 rounded-full bg-[#262a35] text-[#cbc3d7] hover:text-white border border-[#313540]"
              aria-label="Close Matrix Drawer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Quick Cadet Status */}
          <div className="p-3 rounded-xl bg-[#0f131d] border border-[#313540]/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img 
                alt="Cadet Avatar" 
                className="w-8 h-8 rounded-full object-cover border border-[#4cd7f6]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt78nyO77qjDsSo-1exwo1lRONipderNVg3KKsF5IDb-zTk7uHJvzuVlKFy01j-kAUQ-32C2Vb3mQyi0ouNrJIHoOQPpcIqMMypP0Jd5oIzSuW5DLMvm5Q7otMTgc7wTsTHTqWDxbx2fxXEO5-gcc0kE1Pa0Ix4VeGpP0ASy1tEPVbo9SBIKXmz95kXy04WGkm4KrsElCmDP_qu9HVcdXByym8NgbJEWjczmIMCXQauS3kTFQR5uFp"
              />
              <div>
                <div className="text-xs font-bold text-white leading-tight">Alex K.</div>
                <div className="text-[9px] font-mono text-[#4cd7f6]">Level 4 Cyber Cadet</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              SHIELDS UP
            </span>
          </div>

          {/* All 7 Navigation Items */}
          <div className="flex flex-col gap-1.5 mt-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#958ea0] px-2 mb-1">
              Select Defense Module:
            </span>
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full p-3 rounded-xl text-left transition-all flex items-start justify-between gap-3 border ${
                    isActive
                      ? 'bg-[#a078ff] text-[#340080] border-[#a078ff] shadow-lg shadow-[#a078ff]/30 font-bold'
                      : 'bg-[#1c1f2a]/70 hover:bg-[#262a35] text-[#dfe2f1] border-[#313540]/40'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`material-symbols-outlined text-[20px] mt-0.5 ${isActive ? 'text-[#340080]' : 'text-[#4cd7f6]'}`}>
                      {item.icon}
                    </span>
                    <div>
                      <div className="text-xs font-semibold leading-snug">
                        {item.label}
                      </div>
                      <div className={`text-[10px] mt-0.5 ${isActive ? 'text-[#340080]/80' : 'text-[#cbc3d7]/70'}`}>
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold shrink-0 ${
                      isActive ? 'bg-[#340080]/30 text-white' : 'bg-[#0f131d] text-[#4cd7f6] border border-[#313540]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

        </div>

        {/* Bottom Fast Action Tools */}
        <div className="p-5 border-t border-[#313540]/60 bg-[#0f131d]/60 flex flex-col gap-2.5">
          <button
            onClick={() => {
              onClose();
              onOpenScanner();
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#009eb9] to-[#4cd7f6] text-[#002f37] font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#4cd7f6]/20 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">radar</span>
            LAUNCH DM SCANNER
          </button>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1c1f2a] border border-[#313540]">
            <div>
              <div className="text-[9px] font-mono text-[#958ea0] uppercase">24/7 Crisis Hotline</div>
              <div className="text-xs font-mono text-white font-bold">Call 988 // Text 741741</div>
            </div>
            <a
              href="tel:988"
              className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono font-bold hover:bg-rose-500/30"
            >
              CALL
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
