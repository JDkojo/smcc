import React, { useState } from 'react';
import { AppPlatform, PageId } from '../types.ts';
import { playCyberSound } from '../utils/audio.ts';

interface AppsMatrixViewProps {
  onNavigate: (page: PageId) => void;
  onOpenScanner: () => void;
}

const INITIAL_APPS: AppPlatform[] = [
  {
    id: 'tiktok',
    name: 'TikTok',
    category: 'short-form',
    company: 'ByteDance Ltd',
    activeUsers: '1.2B MAU',
    tagline: 'Algorithmic Behavioral Profiling & Keystroke Telemetry',
    score: 8.8,
    threatLevel: 'Critical Threat',
    threatClass: 'text-rose-400 border-rose-500/40 bg-rose-950/40',
    auditHash: 'SHA256:4d8a9e...c701',
    version: 'v34.8.2-Audit',
    threatVector: 'In-app browser keylogging & behavioral cadence tracking',
    threatDescription: 'Injects JavaScript hooks into external URLs opened via in-app browser to monitor tap dynamics and dwell time. Collects network telemetry and clipboard data on launch.',
    activeDefenseProtocol: 'Open external links in sandboxed browser only. Disable universal clipboard sharing and revoke background refresh.',
    defenseType: 'High Priority Sandbox',
    threatBadges: [
      { label: 'Keylogger In-App', icon: 'keyboard', color: 'text-rose-400 border-rose-500/30 bg-rose-950/30' },
      { label: 'Facial Biometrics', icon: 'face', color: 'text-amber-300 border-amber-500/30 bg-amber-950/30' },
      { label: 'Dwell Profiling', icon: 'timer', color: 'text-[#4cd7f6] border-[#4cd7f6]/30 bg-[#009eb9]/20' }
    ],
    permissions: [
      { id: 'cam', name: 'Camera & Depth Sensor', description: 'Real-time face mesh landmark tracking during filter application', locked: false },
      { id: 'mic', name: 'Microphone Always-Listen', description: 'Ambient acoustic matching for background music & audio context', locked: false },
      { id: 'clip', name: 'System Clipboard Read', description: 'Scrapes copied text upon foreground transition without prompt', locked: true },
      { id: 'loc', name: 'Precision GPS Tracking', description: 'Trilateration within 3 meters for localized trend recommendation', locked: true },
      { id: 'cross', name: 'Cross-App Ad ID (IDFA)', description: 'Tracks commercial intent across e-commerce and retail apps', locked: true },
    ],
    retentionNote: 'Indefinite behavioral graph stored across ByteDance server clusters.',
    auditSummary: 'TikTok scores in the top tier of passive behavioral instrumentation. The in-app webview should never be used for credential entry or financial transactions.'
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    category: 'ephemeral',
    company: 'Snap Inc.',
    activeUsers: '800M MAU',
    tagline: 'Hyper-Locational Social Mapping & Ghost Mode Bypass',
    score: 7.9,
    threatLevel: 'High Threat',
    threatClass: 'text-amber-400 border-amber-500/40 bg-amber-950/40',
    auditHash: 'SHA256:91b24f...88a3',
    version: 'v12.7.0-Audit',
    threatVector: 'Persistent Snap Map background triangulation & streak entrapment',
    threatDescription: 'Snap Map updates pinpoint coordinates in background even during brief launches. Gamified streaks trigger algorithmic FOMO and compulsive re-opening cycles.',
    activeDefenseProtocol: 'Enable system-level Ghost Mode. Restrict location to "While Using" only and randomize your Bitmoji outfit regularly to prevent automated profile recognition.',
    defenseType: 'Geospatial Isolation',
    threatBadges: [
      { label: 'Live Coordinates', icon: 'pin_drop', color: 'text-amber-400 border-amber-500/30 bg-amber-950/30' },
      { label: 'Dark Patterns', icon: 'psychology', color: 'text-[#d0bcff] border-[#d0bcff]/30 bg-[#a078ff]/20' },
      { label: 'Contact Scraping', icon: 'contacts', color: 'text-[#4cd7f6] border-[#4cd7f6]/30 bg-[#009eb9]/20' }
    ],
    permissions: [
      { id: 'loc', name: 'Precise Snap Map GPS', description: 'Broadcasts current block and venue to mutual contacts', locked: true },
      { id: 'cam', name: 'Camera Roll Metadata Scan', description: 'Reads EXIF data, timestamp, and geolocation on import', locked: false },
      { id: 'contacts', name: 'Address Book Auto-Sync', description: 'Maps your full social graph and shadow profiles non-users', locked: true },
      { id: 'notif', name: 'Dopamine Push Triggers', description: 'Calculates optimal sleep interruption time for notification bursts', locked: true },
    ],
    retentionNote: 'Snaps deleted after server receipt; metadata, spatial graph & chat logs retained indefinitely.',
    auditSummary: 'Snap Map remains the leading threat vector for real-world teen stalking and unauthorized physical location disclosure among peer groups.'
  },
  {
    id: 'instagram',
    name: 'Instagram / Threads',
    category: 'photo',
    company: 'Meta Platforms Inc.',
    activeUsers: '2.0B MAU',
    tagline: 'Cross-Site Shadow Profiling & Emotional Valence Optimization',
    score: 8.5,
    threatLevel: 'Critical Threat',
    threatClass: 'text-rose-400 border-rose-500/40 bg-rose-950/40',
    auditHash: 'SHA256:33a01d...f902',
    version: 'v319.0.0-Audit',
    threatVector: 'Meta Pixel correlation across 70% of top web properties',
    threatDescription: 'Correlates private message sentiment and post dwell time with off-platform shopping and browsing habits through Meta Pixel beacon network.',
    activeDefenseProtocol: 'Deactivate "Off-Meta Technologies" in Accounts Center. Disable suggested content algorithms in favor of Chronological Following tab.',
    defenseType: 'Meta Graph Severance',
    threatBadges: [
      { label: 'Meta Pixel Tracker', icon: 'hub', color: 'text-rose-400 border-rose-500/30 bg-rose-950/30' },
      { label: 'Affect Profiling', icon: 'mood_bad', color: 'text-amber-400 border-amber-500/30 bg-amber-950/30' },
      { label: 'DM OCR Scan', icon: 'document_scanner', color: 'text-[#d0bcff] border-[#d0bcff]/30 bg-[#a078ff]/20' }
    ],
    permissions: [
      { id: 'meta_link', name: 'Off-Meta Activity Link', description: 'Shares data with third-party stores you visit offline and online', locked: true },
      { id: 'read_receipts', name: 'DM Seen Receipts & Activity', description: 'Broadcasts exact minute of messaging availability to followers', locked: true },
      { id: 'photo_acc', name: 'Full Photo Library Grant', description: 'Analyzes background contents and pets in saved images', locked: false },
      { id: 'mic', name: 'Microphone for Reels', description: 'Used during voiceovers and acoustic ad synchronization', locked: false },
    ],
    retentionNote: 'Consolidated into global Meta advertising engine across WhatsApp, Facebook, and Threads.',
    auditSummary: 'Meta’s cross-app identification allows near-complete mapping of teenage psychological states, sleep schedules, and relational tension.'
  },
  {
    id: 'discord',
    name: 'Discord',
    category: 'messaging',
    company: 'Discord Inc.',
    activeUsers: '200M MAU',
    tagline: 'Unmoderated Gateway Infiltration & Phishing Hotspots',
    score: 6.8,
    threatLevel: 'Moderate Threat',
    threatClass: 'text-[#4cd7f6] border-[#4cd7f6]/40 bg-[#009eb9]/20',
    auditHash: 'SHA256:77bc88...12d4',
    version: 'v218.15-Audit',
    threatVector: 'Unsolicited Nitro phishing links, malicious bots, and unencrypted DM pools',
    threatDescription: 'DMs and voice channels are NOT end-to-end encrypted. Bot tokens can be weaponized to scrape channel history or deliver drive-by payload links.',
    activeDefenseProtocol: 'Set "Keep Me Safe" scanning to high. Disable direct messages from server members until mutually verified in voice or mutual trusted circle.',
    defenseType: 'DM Firewalling',
    threatBadges: [
      { label: 'No E2E Encryption', icon: 'lock_open', color: 'text-amber-400 border-amber-500/30 bg-amber-950/30' },
      { label: 'Token Stealers', icon: 'bug_report', color: 'text-rose-400 border-rose-500/30 bg-rose-950/30' },
      { label: 'Unsolicited DMs', icon: 'mail', color: 'text-[#d0bcff] border-[#d0bcff]/30 bg-[#a078ff]/20' }
    ],
    permissions: [
      { id: 'server_dm', name: 'Allow DMs from Server Members', description: 'Leaves your inbox open to any stranger joining mutual servers', locked: true },
      { id: 'friend_sync', name: 'Steam / PSN / Xbox Rich Presence', description: 'Publicly broadcasts what game or music track you are actively using', locked: false },
      { id: 'screen_share', name: 'Full Desktop Audio/Video Capture', description: 'Risk of inadvertent exposure of open homework tabs or private chats', locked: false },
    ],
    retentionNote: 'All chat messages, logs, and attachments stored permanently on Discord servers unless manually deleted.',
    auditSummary: 'High utility for gaming squads, but frequent vector for engineering scams, account token hijacking, and targeted harassment rings.'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    category: 'messaging',
    company: 'Telegram FZ-LLC',
    activeUsers: '900M MAU',
    tagline: 'Default Cloud Storage & Deceptive Privacy Claims',
    score: 7.2,
    threatLevel: 'Moderate Threat',
    threatClass: 'text-[#4cd7f6] border-[#4cd7f6]/40 bg-[#009eb9]/20',
    auditHash: 'SHA256:5e66b0...a499',
    version: 'v10.9-Audit',
    threatVector: 'Chats are NOT end-to-end encrypted by default; accessible via server subpoena',
    threatDescription: 'Only "Secret Chats" use client-to-client MTProto encryption. Standard group and 1-on-1 chats are decrypted and indexed on central cloud nodes.',
    activeDefenseProtocol: 'Mandate "Secret Chat" mode for sensitive discourse. Configure 2-Step Verification with a custom recovery email not linked to public usernames.',
    defenseType: 'MTProto Hardening',
    threatBadges: [
      { label: 'Cloud-Stored Chats', icon: 'cloud_sync', color: 'text-amber-400 border-amber-500/30 bg-amber-950/30' },
      { label: 'Phone Number Leak', icon: 'call', color: 'text-[#d0bcff] border-[#d0bcff]/30 bg-[#a078ff]/20' },
      { label: 'Doxxing Channels', icon: 'campaign', color: 'text-rose-400 border-rose-500/30 bg-rose-950/30' }
    ],
    permissions: [
      { id: 'phone_vis', name: 'Phone Number Visibility', description: 'Visible to contacts or everyone by default unless set to Nobody', locked: true },
      { id: 'nearby', name: 'Find People Nearby (Geohash)', description: 'Scans Bluetooth and GPS to reveal physical distance to other users', locked: true },
      { id: 'p2p_calls', name: 'Peer-to-Peer Voice Calls', description: 'Exposes your true IP address to the caller on unrouted calls', locked: true },
    ],
    retentionNote: 'Stored indefinitely on cloud infrastructure; secret chats retained only on device.',
    auditSummary: 'Often recommended as private, yet standard chats remain entirely readable by server infrastructure operators.'
  },
  {
    id: 'roblox',
    name: 'Roblox',
    category: 'short-form',
    company: 'Roblox Corporation',
    activeUsers: '77M DAU',
    tagline: 'Predatory Micro-Economy & Off-Platform Funneling',
    score: 8.1,
    threatLevel: 'High Threat',
    threatClass: 'text-amber-400 border-amber-500/40 bg-amber-950/40',
    auditHash: 'SHA256:1a82bb...fe41',
    version: 'v2.628-Audit',
    threatVector: 'In-game chat manipulation funneling minors to Discord / private servers',
    threatDescription: 'Exploits algorithmic peer pressure with Robux gambling dynamics and experiences designed to harvest personal information under the guise of free items.',
    activeDefenseProtocol: 'Lock chat to friends only or pin-protected parent controls. Never click external links promising Robux or account elevation.',
    defenseType: 'Economy & Chat Lockdown',
    threatBadges: [
      { label: 'Predatory Economy', icon: 'payments', color: 'text-amber-400 border-amber-500/30 bg-amber-950/30' },
      { label: 'Off-Platform Funnels', icon: 'exit_to_app', color: 'text-rose-400 border-rose-500/30 bg-rose-950/30' },
      { label: 'Unverified UGC', icon: 'inventory_2', color: 'text-[#d0bcff] border-[#d0bcff]/30 bg-[#a078ff]/20' }
    ],
    permissions: [
      { id: 'spatial_voice', name: 'Spatial Voice Chat', description: 'Real-time uncensored voice interaction with players in proximity', locked: true },
      { id: 'trading', name: 'In-Game Item Trading', description: 'Subject to trade scam scripts and automated session hijackers', locked: true },
      { id: 'experience_dms', name: 'Experience-Level Direct Messaging', description: 'Allows strangers in custom mini-games to send 1-on-1 texts', locked: true },
    ],
    retentionNote: 'Voice recordings sampled and stored for safety audits; user inventories tracked permanently.',
    auditSummary: 'Prime hunting ground for social engineering attacks targeting younger teens with promises of rare virtual goods.'
  }
];

export const AppsMatrixView: React.FC<AppsMatrixViewProps> = ({ onNavigate, onOpenScanner }) => {
  const [apps, setApps] = useState<AppPlatform[]>(INITIAL_APPS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<AppPlatform | null>(INITIAL_APPS[0]);
  const [mobileTab, setMobileTab] = useState<'list' | 'inspector'>('list');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleTogglePermission = (appId: string, permId: string) => {
    playCyberSound('toggle');
    setApps(prev => prev.map(app => {
      if (app.id !== appId) return app;
      const updatedPerms = app.permissions.map(p => {
        if (p.id !== permId) return p;
        return { ...p, locked: !p.locked };
      });
      const lockedCount = updatedPerms.filter(p => p.locked).length;
      const totalCount = updatedPerms.length;
      const reduction = (lockedCount / totalCount) * 2.8;
      const newScore = Math.max(1.2, +(app.score - reduction * 0.4).toFixed(1));
      
      const updated = {
        ...app,
        permissions: updatedPerms,
        score: newScore,
        auditHash: `SHA256:${Math.random().toString(36).substring(2, 8)}...${Math.random().toString(36).substring(2, 6)}`
      };

      if (selectedApp?.id === appId) {
        setSelectedApp(updated);
      }
      return updated;
    }));
    triggerToast('Permission shield toggled. Threat coefficient updated.');
  };

  const handleLockAll = (appId: string) => {
    playCyberSound('beep');
    setApps(prev => prev.map(app => {
      if (app.id !== appId) return app;
      const updatedPerms = app.permissions.map(p => ({ ...p, locked: true }));
      const updated = {
        ...app,
        permissions: updatedPerms,
        score: +(Math.max(1.5, app.score - 2.5)).toFixed(1),
        threatLevel: 'Controlled Risk' as const,
        threatClass: 'text-[#4cd7f6] border-[#4cd7f6]/40 bg-[#009eb9]/20',
        auditHash: `SHA256:${Math.random().toString(36).substring(2, 8)}...DEFENSE`
      };
      if (selectedApp?.id === appId) {
        setSelectedApp(updated);
      }
      return updated;
    }));
    triggerToast(`Maximum counter-measure deployed for ${appId.toUpperCase()}.`);
  };

  const handleExportAudit = () => {
    playCyberSound('glitch');
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(apps, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `SMC-App-Audit-Matrix-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerToast('Tactical audit report exported to local storage.');
  };

  const filteredApps = apps.filter(app => {
    const matchesCat = selectedCategory === 'all' || app.category === selectedCategory;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.threatVector.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-24 text-[#dfe2f1] bg-[#0f131d]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 sm:bottom-8 right-4 sm:right-8 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-[#1c1f2a] border border-[#4cd7f6]/50 text-[#4cd7f6] shadow-2xl backdrop-blur-md animate-bounce">
          <span className="material-symbols-outlined text-lg">verified_user</span>
          <span className="font-mono text-xs uppercase tracking-wider">{toastMessage}</span>
        </div>
      )}

      {/* Hero Banner Header */}
      <section className="relative overflow-hidden pt-10 pb-8 border-b border-[#313540] bg-[#0a0e18]/90">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium tracking-widest bg-[#4cd7f6]/10 border border-[#4cd7f6]/30 text-[#4cd7f6]">
                  <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse" />
                  DATABASE AUDIT PROTOCOL
                </span>
                <span className="text-[11px] font-mono text-[#958ea0]">CLASS: THREAT MATRIX</span>
              </div>
              <h1 className="font-display-hero text-headline-lg-mobile sm:text-headline-lg lg:text-display-hero font-bold tracking-tight text-[#dfe2f1] uppercase">
                Apps Database &amp; Permission Locker
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#cbc3d7] max-w-2xl leading-relaxed">
                Real-time teardown of telemetry, dark patterns, and background sensor access across major teen platforms. Toggle shields to simulate threat mitigation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={onOpenScanner}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-300 hover:bg-rose-500/25 transition-all text-xs font-mono font-bold tracking-wider active:scale-95"
              >
                <span className="material-symbols-outlined text-base">radar</span>
                SCAN SUSPICIOUS DM
              </button>
              <button
                onClick={handleExportAudit}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1c1f2a] border border-[#313540] text-white hover:border-[#4cd7f6] transition-all text-xs font-mono font-bold tracking-wider active:scale-95"
              >
                <span className="material-symbols-outlined text-base">download</span>
                EXPORT AUDIT JSON
              </button>
            </div>
          </div>

          {/* Filter Bar & Search Input */}
          <div className="mt-8 pt-6 border-t border-[#313540]/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'All Platforms', icon: 'grid_view' },
                { id: 'short-form', label: 'Short-Form Video', icon: 'videocam' },
                { id: 'messaging', label: 'Encrypted & DM', icon: 'chat' },
                { id: 'ephemeral', label: 'Ephemeral Sharing', icon: 'history_toggle_off' },
                { id: 'photo', label: 'Photo & Social Graph', icon: 'camera_alt' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    playCyberSound('click');
                    setSelectedCategory(cat.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-[#a078ff] text-[#340080] font-bold shadow-lg shadow-[#a078ff]/30'
                      : 'bg-[#171b26] text-[#cbc3d7] hover:text-white hover:bg-[#1c1f2a] border border-[#313540]/50'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative min-w-[280px]">
              <input
                type="text"
                placeholder="Filter by app name, sensor, or threat..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#171b26] border border-[#313540] rounded-full pl-9 pr-8 py-2 text-xs font-mono text-white placeholder-[#958ea0] focus:outline-none focus:border-[#4cd7f6] transition-all"
              />
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#958ea0] text-base">search</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-[#958ea0] hover:text-white"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid View */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-8">
        
        {/* Mobile View Switcher (Tabs between List and Inspector on mobile) */}
        <div className="lg:hidden flex items-center p-1.5 rounded-xl bg-[#171b26] border border-[#313540] mb-6 shadow-md">
          <button
            onClick={() => {
              playCyberSound('click');
              setMobileTab('list');
            }}
            className={`flex-1 py-2.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
              mobileTab === 'list'
                ? 'bg-[#a078ff] text-[#340080] shadow'
                : 'text-[#cbc3d7] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">view_list</span>
            <span>Platforms List ({filteredApps.length})</span>
          </button>

          <button
            onClick={() => {
              playCyberSound('click');
              setMobileTab('inspector');
            }}
            className={`flex-1 py-2.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
              mobileTab === 'inspector'
                ? 'bg-[#4cd7f6] text-[#003640] shadow'
                : 'text-[#cbc3d7] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">security</span>
            <span>Locker: {selectedApp?.name || 'Inspect'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Apps Grid */}
          <div className={`lg:col-span-7 space-y-4 ${mobileTab === 'inspector' ? 'hidden lg:block' : 'block'}`}>
            <div className="flex items-center justify-between text-xs font-mono text-[#958ea0] mb-2 px-1">
              <span>SHOWING {filteredApps.length} VULNERABILITY ARCHIVES</span>
              <span>INDEX: 2026.Q4-ACTIVE</span>
            </div>

            {filteredApps.length === 0 ? (
              <div className="p-12 text-center border border-dashed border-[#313540] rounded-2xl bg-[#1c1f2a]/60">
                <span className="material-symbols-outlined text-4xl text-[#958ea0] mb-2">search_off</span>
                <p className="text-sm font-mono text-white">No platform match found for query.</p>
                <p className="text-xs text-[#958ea0] mt-1">Try searching for TikTok, Discord, GPS, or Keylogger.</p>
              </div>
            ) : (
              filteredApps.map(app => {
                const isSelected = selectedApp?.id === app.id;
                const lockedCount = app.permissions.filter(p => p.locked).length;
                return (
                  <div
                    key={app.id}
                    onClick={() => {
                      playCyberSound('click');
                      setSelectedApp(app);
                      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                        setMobileTab('inspector');
                        window.scrollTo({ top: 200, behavior: 'smooth' });
                      }
                    }}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? 'bg-[#1c1f2a] border-[#4cd7f6] ring-1 ring-[#4cd7f6]/40 shadow-xl shadow-[#4cd7f6]/10'
                        : 'bg-[#171b26] border-[#313540] hover:border-[#958ea0] hover:bg-[#1c1f2a]'
                    }`}
                  >
                    {/* Top Row: App title, company, risk badge */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#0f131d] border border-[#313540] flex items-center justify-center font-display-hero font-bold text-xl text-[#d0bcff] shadow-inner shrink-0">
                          {app.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-bold text-white group-hover:text-[#4cd7f6] transition-colors">
                              {app.name}
                            </h3>
                            <span className="text-[10px] font-mono text-[#958ea0] uppercase">
                              {app.company}
                            </span>
                          </div>
                          <p className="text-xs text-[#cbc3d7] line-clamp-1 mt-0.5">{app.tagline}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end shrink-0">
                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border ${app.threatClass}`}>
                          {app.threatLevel}
                        </span>
                        <span className="text-[10px] font-mono text-[#958ea0] mt-1">
                          COEFF: {app.score} / 10
                        </span>
                      </div>
                    </div>

                    {/* Threat Vector Callout */}
                    <div className="mt-4 p-3 rounded-xl bg-[#0f131d] border border-[#313540]/60 flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-amber-400 text-base mt-0.5 shrink-0">warning</span>
                      <p className="text-xs text-[#cbc3d7] font-mono leading-relaxed">
                        <strong className="text-white font-semibold">Vector: </strong>
                        {app.threatVector}
                      </p>
                    </div>

                    {/* Threat Badges & Shield Status */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#313540]/60">
                      <div className="flex flex-wrap gap-1.5">
                        {app.threatBadges.map((badge, idx) => (
                          <span
                            key={idx}
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${badge.color}`}
                          >
                            <span className="material-symbols-outlined text-[13px]">{badge.icon}</span>
                            {badge.label}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono ml-auto">
                        <span className="text-[#958ea0]">
                          Shields: <strong className="text-[#4cd7f6]">{lockedCount}/{app.permissions.length} Locked</strong>
                        </span>
                        <span className="material-symbols-outlined text-sm text-[#4cd7f6] group-hover:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Deep-Dive Permission Locker Inspector */}
          <div className={`lg:col-span-5 scroll-mt-24 ${mobileTab === 'list' ? 'hidden lg:block' : 'block'}`} id="telemetry-inspector">
            {selectedApp ? (
              <div className="sticky top-24 rounded-2xl bg-[#171b26] border border-[#313540] p-6 shadow-2xl relative overflow-hidden">
                {/* Visual top border scanner indicator */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4cd7f6] via-[#d0bcff] to-[#a078ff]" />

                {/* Back to list button for mobile */}
                <div className="lg:hidden pb-3 mb-3 border-b border-[#313540]/60 flex items-center justify-between">
                  <button
                    onClick={() => {
                      playCyberSound('click');
                      setMobileTab('list');
                    }}
                    className="flex items-center gap-1.5 text-xs font-mono text-[#4cd7f6] hover:underline"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    <span>Back to Platforms List</span>
                  </button>
                  <span className="text-[10px] font-mono text-[#958ea0]">ACTIVE PLATFORM</span>
                </div>

                <div className="flex items-start justify-between pb-4 border-b border-[#313540]">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#4cd7f6] uppercase font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-ping" />
                      LIVE TELEMETRY INSPECTOR
                    </span>
                    <h2 className="text-2xl font-black text-white font-display-hero mt-1">{selectedApp.name}</h2>
                    <p className="text-xs font-mono text-[#958ea0]">{selectedApp.auditHash}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#4cd7f6] font-mono">{selectedApp.score}</span>
                    <span className="block text-[10px] font-mono text-[#958ea0]">RISK COEFFICIENT</span>
                  </div>
                </div>

                {/* Audit Teardown Description */}
                <div className="mt-4 space-y-3">
                  <div>
                    <h4 className="text-xs font-mono uppercase text-[#958ea0] font-semibold mb-1">Architecture Overview</h4>
                    <p className="text-xs text-[#cbc3d7] leading-relaxed">
                      {selectedApp.threatDescription}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0f131d] border border-[#313540]">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#d0bcff] font-bold mb-1">
                      <span className="material-symbols-outlined text-sm">shield</span>
                      ACTIVE DEFENSE PROTOCOL
                    </div>
                    <p className="text-xs text-[#cbc3d7] leading-relaxed">
                      {selectedApp.activeDefenseProtocol}
                    </p>
                  </div>
                </div>

                {/* Interactive Permission Locker Switches */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-[#4cd7f6]">lock</span>
                      HARDWARE SENSOR LOCKER
                    </h4>
                    <button
                      onClick={() => handleLockAll(selectedApp.id)}
                      className="text-[11px] font-mono text-[#4cd7f6] hover:underline hover:text-white"
                    >
                      MAXIMUM SHIELD (ALL)
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {selectedApp.permissions.map(perm => (
                      <div
                        key={perm.id}
                        className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                          perm.locked
                            ? 'bg-[#4cd7f6]/10 border-[#4cd7f6]/50 text-white'
                            : 'bg-[#1c1f2a]/60 border-[#313540] text-[#958ea0]'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-white truncate">
                              {perm.name}
                            </span>
                            {perm.locked && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#4cd7f6]/20 text-[#4cd7f6] border border-[#4cd7f6]/40">
                                SHIELDED
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#958ea0] mt-0.5 line-clamp-1">
                            {perm.description}
                          </p>
                        </div>

                        <button
                          onClick={() => handleTogglePermission(selectedApp.id, perm.id)}
                          className={`w-12 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                            perm.locked ? 'bg-[#4cd7f6]' : 'bg-[#0f131d] border border-[#313540]'
                          }`}
                          aria-label={`Toggle ${perm.name}`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full transition-transform shadow-md ${
                              perm.locked ? 'translate-x-6 bg-[#003640]' : 'translate-x-0 bg-[#958ea0]'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Retention & Navigation Actions */}
                <div className="mt-6 pt-4 border-t border-[#313540] flex flex-col gap-3">
                  <div className="text-[11px] font-mono text-[#958ea0]">
                    <strong className="text-white">Retention Policy: </strong>
                    {selectedApp.retentionNote}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onNavigate('livestreaming')}
                      className="flex-1 py-2 rounded-lg bg-[#262a35] hover:bg-[#353944] border border-[#313540] text-xs font-mono font-semibold text-white transition-all text-center active:scale-95"
                    >
                      BROADCAST DEFENSE
                    </button>
                    <button
                      onClick={() => onNavigate('parents-guide')}
                      className="flex-1 py-2 rounded-lg bg-[#a078ff]/20 hover:bg-[#a078ff]/30 border border-[#a078ff]/40 text-xs font-mono font-semibold text-[#d0bcff] transition-all text-center active:scale-95"
                    >
                      FAMILY GUIDE
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="p-12 text-center border border-[#313540] rounded-2xl bg-[#171b26]">
                <span className="material-symbols-outlined text-4xl text-[#958ea0] mb-2">touch_app</span>
                <p className="text-sm font-mono text-white">Select a platform to inspect hardware access</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
