import React from 'react';
import { playCyberSound } from '../utils/audio.ts';

interface CadetProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CadetProfileModal: React.FC<CadetProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg max-h-[85vh] bg-[#1c1f2a] border border-[#313540] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with Cyber Cadet Details */}
        <div className="relative p-5 sm:p-6 bg-gradient-to-r from-[#340080]/60 via-[#1c1f2a] to-[#002f38]/60 border-b border-[#313540] shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-[#313540] text-[#cbc3d7] hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="relative shrink-0">
              <img 
                alt="Alex K. Cadet Avatar" 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#4cd7f6] shadow-[0_0_20px_rgba(76,215,246,0.4)]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAt78nyO77qjDsSo-1exwo1lRONipderNVg3KKsF5IDb-zTk7uHJvzuVlKFy01j-kAUQ-32C2Vb3mQyi0ouNrJIHoOQPpcIqMMypP0Jd5oIzSuW5DLMvm5Q7otMTgc7wTsTHTqWDxbx2fxXEO5-gcc0kE1Pa0Ix4VeGpP0ASy1tEPVbo9SBIKXmz95kXy04WGkm4KrsElCmDP_qu9HVcdXByym8NgbJEWjczmIMCXQauS3kTFQR5uFp"
              />
              <span className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-[#4cd7f6] text-[#001f26] font-bold text-[10px] uppercase font-mono shadow">
                Lvl 4
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-headline-md text-headline-md text-white font-bold text-base sm:text-lg">
                  Alex K.
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#d0bcff]/20 text-[#d0bcff] font-label-tag text-label-tag text-[10px]">
                  ACTIVE DEFENDER
                </span>
              </div>
              <span className="font-label-tag text-label-tag text-[#4cd7f6] uppercase tracking-wider mt-0.5 text-[10px]">
                Cyber Cadet // Chapter #SEA-09
              </span>
              <span className="font-body-sm text-body-sm text-[#cbc3d7] text-[11px] sm:text-xs mt-1">
                Field Clearance: Level 4 • Protocol Verified
              </span>
            </div>
          </div>
        </div>

        {/* Cadet Stats Matrix */}
        <div className="p-4 sm:p-6 flex flex-col gap-5 overflow-y-auto">
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-[#262a35] flex flex-col items-center text-center">
              <span className="font-display-hero text-2xl font-bold text-[#d0bcff]">42</span>
              <span className="font-label-tag text-label-tag text-[#cbc3d7] text-[10px] uppercase mt-1">
                Vectors Audited
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#262a35] flex flex-col items-center text-center">
              <span className="font-display-hero text-2xl font-bold text-[#4cd7f6]">18</span>
              <span className="font-label-tag text-label-tag text-[#cbc3d7] text-[10px] uppercase mt-1">
                Phish Traps Neutralized
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#262a35] flex flex-col items-center text-center">
              <span className="font-display-hero text-2xl font-bold text-[#c0c1ff]">96%</span>
              <span className="font-label-tag text-label-tag text-[#cbc3d7] text-[10px] uppercase mt-1">
                Privacy Posture
              </span>
            </div>
          </div>

          {/* Badges Earned */}
          <div className="flex flex-col gap-2">
            <span className="font-label-tag text-label-tag uppercase text-[#d0bcff] tracking-wider">
              Earned Field Badges
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-[#262a35] flex items-center gap-3 border border-[#313540]">
                <span className="material-symbols-outlined text-[#4cd7f6] text-[24px]">verified_user</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-white font-semibold text-xs">Zero Location Leak</span>
                  <span className="text-[10px] text-[#958ea0]">Ghost Mode Master</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#262a35] flex items-center gap-3 border border-[#313540]">
                <span className="material-symbols-outlined text-[#d0bcff] text-[24px]">psychology</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-white font-semibold text-xs">Algorithm Decoder</span>
                  <span className="text-[10px] text-[#958ea0]">Dopamine Loop Breaker</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#262a35] flex items-center gap-3 border border-[#313540]">
                <span className="material-symbols-outlined text-[#c0c1ff] text-[24px]">broadcast_on_home</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-white font-semibold text-xs">OSINT Shield</span>
                  <span className="text-[10px] text-[#958ea0]">Studio Leak Proof</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#262a35] flex items-center gap-3 border border-[#313540]">
                <span className="material-symbols-outlined text-rose-400 text-[24px]">security</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-white font-semibold text-xs">Peer Defender</span>
                  <span className="text-[10px] text-[#958ea0]">Anti-Harassment First-Aid</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#171b26] border-t border-[#313540] flex items-center justify-between">
          <span className="text-xs text-[#958ea0]">Verified Cadet ID: #SMC-CADET-88219</span>
          <button
            onClick={() => {
              playCyberSound('click');
              onClose();
            }}
            className="px-5 py-2 rounded-full bg-[#a078ff] text-[#340080] font-headline-sm text-xs font-bold hover:brightness-110"
          >
            Close Identity Card
          </button>
        </div>
      </div>
    </div>
  );
};
