import React, { useState, useEffect } from 'react';
import { PageId } from '../types.ts';
import { playCyberSound } from '../utils/audio.ts';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}

interface SearchItem {
  id: string;
  title: string;
  category: string;
  description: string;
  page: PageId;
  icon: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  const items: SearchItem[] = [
    {
      id: 'tiktok-privacy',
      title: 'TikTok Privacy & Algorithm Loop Breaker',
      category: 'Apps Database',
      description: 'Audit report and recommended privacy settings for ByteDance telemetry.',
      page: 'apps-matrix',
      icon: 'music_video',
    },
    {
      id: 'snap-map',
      title: 'Snapchat Snap Map & Ghost Mode Lock',
      category: 'Apps Database',
      description: 'Permanent location stealth protocols to prevent real-time geostalking.',
      page: 'apps-matrix',
      icon: 'pin_drop',
    },
    {
      id: 'discord-scams',
      title: 'Discord Free Nitro QR Phishing Exploit',
      category: 'Live Threat Feed',
      description: 'Token grabber malware disguised as tournament invites.',
      page: 'livestreaming',
      icon: 'forum',
    },
    {
      id: 'family-compact',
      title: 'Teen-Parent Family Tech Compact (2025)',
      category: 'Parents Guidance',
      description: 'Mutual non-punitive device agreement with privacy guarantees.',
      page: 'parents-guide',
      icon: 'description',
    },
    {
      id: 'livestream-killswitch',
      title: 'Panic Killswitch & Visual Leakage Audit',
      category: 'Livestreaming Lab',
      description: 'Instant broadcast blackout overlay and room background OSINT filters.',
      page: 'livestreaming',
      icon: 'videocam_off',
    },
    {
      id: 'kosa-coppa',
      title: 'COPPA 2.0 & KOSA Statutory Rights',
      category: 'Legislation',
      description: 'Federal algorithmic opt-out and mandatory duty-of-care protections.',
      page: 'legislation',
      icon: 'gavel',
    },
    {
      id: 'dm-harassment',
      title: 'How to React to Inappropriate Direct Messages',
      category: 'Parents Guidance',
      description: 'Step-by-step calibrated response protocols for online bullying and extortion.',
      page: 'parents-guide',
      icon: 'visibility_off',
    },
    {
      id: 'crisis-dispatch',
      title: '24/7 SMC Crisis Dispatch & Hotline',
      category: 'Support',
      description: 'Emergency teen hotline: 1-855-SMC-SAFE or SMS DEFENSE.',
      page: 'contact-us',
      icon: 'emergency_home',
    },
  ];

  const filtered = query.trim()
    ? items.filter(
        (it) =>
          it.title.toLowerCase().includes(query.toLowerCase()) ||
          it.description.toLowerCase().includes(query.toLowerCase()) ||
          it.category.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-6 sm:pt-20 px-3 sm:px-4 bg-[#0a0e18]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl max-h-[85vh] bg-[#1c1f2a] border border-[#313540] rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#313540] bg-[#171b26]">
          <span className="material-symbols-outlined text-[#d0bcff] text-[24px]">search</span>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search telemetry, exploit types, guides, or laws..."
            className="w-full bg-transparent text-[#dfe2f1] font-body-md text-body-md placeholder-[#958ea0] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#958ea0] hover:text-white"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <span className="px-2 py-0.5 rounded bg-[#313540] text-[11px] font-mono text-[#cbc3d7]">
            ESC
          </span>
        </div>

        {/* Quick Suggestions & Results */}
        <div className="max-h-[380px] overflow-y-auto p-3 flex flex-col gap-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-[#958ea0] flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-4xl text-[#958ea0]/40">search_off</span>
              <p className="font-body-md text-body-md">No telemetry records matching "{query}"</p>
              <span className="font-body-sm text-body-sm text-[#4cd7f6]">Try searching "TikTok", "Snapchat", "DM", or "KOSA"</span>
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  playCyberSound('click');
                  onNavigate(item.page);
                  onClose();
                }}
                className="w-full p-3 rounded-xl flex items-start gap-3.5 hover:bg-[#262a35] transition-colors text-left group"
              >
                <div className="p-2 rounded-lg bg-[#313540] text-[#d0bcff] group-hover:bg-[#a078ff] group-hover:text-[#340080] transition-colors shrink-0">
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-headline-sm text-headline-sm text-[#dfe2f1] font-semibold text-sm group-hover:text-[#d0bcff] transition-colors truncate">
                      {item.title}
                    </span>
                    <span className="font-label-tag text-label-tag text-[10px] text-[#4cd7f6] bg-[#009eb9]/20 px-2 py-0.5 rounded-full shrink-0">
                      {item.category}
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-[#cbc3d7] mt-0.5 line-clamp-1">
                    {item.description}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-[#313540] bg-[#171b26] flex items-center justify-between text-xs text-[#958ea0]">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <span className="px-1.5 py-0.5 rounded bg-[#313540] text-white font-mono text-[10px]">↵ Select</span>
            <span className="px-1.5 py-0.5 rounded bg-[#313540] text-white font-mono text-[10px]">ESC Dismiss</span>
          </div>
          <span className="text-[#4cd7f6] font-semibold">SMC Zero-Day Scanner Ready</span>
        </div>
      </div>
    </div>
  );
};
