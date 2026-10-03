import React from 'react';
import { PageId } from '../types.ts';
import { playCyberSound } from '../utils/audio.ts';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const alerts = [
    {
      id: '1',
      title: 'Viral AI Face-Swap Trend "FaceCloneX"',
      badge: 'CRITICAL EXPOSURE',
      badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/40',
      time: '4m ago',
      desc: 'Arbitrary cloud storage clause secretly harvesting biometric facial maps without deletion expiry.',
      target: 'apps-matrix' as PageId,
    },
    {
      id: '2',
      title: 'Discord "Free Nitro" QR Code Hijack',
      badge: 'SESSION STEALER',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40',
      time: '19m ago',
      desc: 'Targeting gaming school communities; bypasses 2FA tokens using quick-scan token capture.',
      target: 'livestreaming' as PageId,
    },
    {
      id: '3',
      title: 'TikTok Algorithmic Loop Alert',
      badge: 'PSYCH AUDIT',
      badgeColor: 'bg-purple-500/20 text-purple-300 border border-purple-500/40',
      time: '38m ago',
      desc: 'Sudden spike in hyper-restrictive diet hashtags triggering aggressive dopamine cycle cascades.',
      target: 'apps-matrix' as PageId,
    },
    {
      id: '4',
      title: 'KOSA Legislative Markup Update',
      badge: 'STATUTE ALERT',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40',
      time: '2h ago',
      desc: 'Senate Commerce Committee incorporates strict duty-of-care provisions for youth feeds.',
      target: 'legislation' as PageId,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:justify-end pt-16 sm:pt-20 p-3 sm:pr-8 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md max-h-[85vh] bg-[#1c1f2a] border border-[#313540] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 bg-[#171b26] border-b border-[#313540]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">notifications_active</span>
            <span className="font-headline-sm text-headline-sm text-white font-bold text-sm">
              Live Telemetry Feeds
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-[#958ea0] hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="p-3 flex flex-col gap-2 max-h-[420px] overflow-y-auto">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => {
                playCyberSound('click');
                onNavigate(alert.target);
                onClose();
              }}
              className="p-3.5 rounded-xl bg-[#262a35] hover:bg-[#313540] transition-colors cursor-pointer flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`px-2 py-0.5 rounded-full font-label-tag text-label-tag text-[9px] font-bold ${alert.badgeColor}`}>
                  {alert.badge}
                </span>
                <span className="text-[11px] text-[#958ea0]">{alert.time}</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-sm text-[#dfe2f1] font-semibold">
                {alert.title}
              </h4>
              <p className="font-body-sm text-body-sm text-[#cbc3d7] text-xs leading-relaxed">
                {alert.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="p-3 bg-[#171b26] border-t border-[#313540] flex justify-between items-center text-xs">
          <span className="text-[#4cd7f6] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-ping"></span>
            Socket Live: 24ms
          </span>
          <button 
            onClick={() => {
              playCyberSound('click');
              onNavigate('apps-matrix');
              onClose();
            }}
            className="text-[#d0bcff] hover:underline font-semibold"
          >
            View All in Matrix →
          </button>
        </div>
      </div>
    </div>
  );
};
