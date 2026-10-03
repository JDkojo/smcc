import React, { useState } from 'react';
import { PageId } from '../types.ts';
import { playCyberSound } from '../utils/audio.ts';

interface HomeViewProps {
  onNavigate: (page: PageId) => void;
  onOpenScanner: () => void;
  onOpenSearch: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenScanner, onOpenSearch }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [validatorRunning, setValidatorRunning] = useState<boolean>(false);
  const [validatorScore, setValidatorScore] = useState<number>(88);
  const [webhookConfigured, setWebhookConfigured] = useState<boolean>(false);

  const handleRunValidator = () => {
    playCyberSound('scanner');
    setValidatorRunning(true);
    setTimeout(() => {
      setValidatorRunning(false);
      setValidatorScore(94);
      playCyberSound('lock');
    }, 1200);
  };

  const handleConfigureWebhook = () => {
    playCyberSound('click');
    setWebhookConfigured(true);
    setTimeout(() => setWebhookConfigured(false), 3000);
  };

  const handleDownloadCheatSheet = () => {
    playCyberSound('batch');
    const cheatSheet = `=====================================================
SMC TEEN DIGITAL DEFENSE ROADMAP (2026 EDITION)
Seattle Matrix Collective • Zero-Lecture Cybersecurity
=====================================================

STEP 01: AUDIT IN-APP BROWSER KEYLOGGERS
- Never enter credentials into in-app web views (TikTok/Instagram).
- Always tap 'Open in Safari/Chrome'.

STEP 02: HARDEN SENSOR PERMISSIONS
- Set GPS to 'While Using' or 'Never'.
- Enable Ghost Mode on Snapchat permanently.
- Revoke background microphone access for social video apps.

STEP 03: VERIFY ANONYMOUS DMS & LINKS
- Never click short links (bit.ly / tinyurl) in Discord or gaming chats.
- Never scan QR codes promising free Nitro, Robux, or skins.
- Run suspicious links through the SMC DM Verification Sandbox.

STEP 04: EVIDENCE PRESERVATION OVER SHAME
- If targeted for extortion, do NOT pay. Extortionists never delete photos.
- Take timestamped screenshots of attacker handles & user IDs.
- Report immediately to TakeItDown.ncmec.org and dial 988 or 1-800-843-5678.

=====================================================
Emergency Hotlines:
• 988 Suicide & Crisis Lifeline: Call/Text 988 (24/7)
• Crisis Text Line: Text HOME to 741741
• NCMEC Take It Down: takeitdown.ncmec.org
=====================================================`;

    const blob = new Blob([cheatSheet], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SMC-Teen-Digital-Defense-Roadmap.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const apps = [
    {
      id: 'tiktok',
      name: 'TikTok',
      company: 'ByteDance • 1.2B Active',
      score: '64/100',
      badge: 'MODERATE RISK',
      badgeColor: 'text-[#c0c1ff] bg-[#3131c0]/30',
      icon: 'music_video',
      category: 'short-video',
      stats: [
        { label: 'Algorithm Dopamine Bias', val: 'High (78%)', pct: 78, color: 'bg-rose-500', textCol: 'text-rose-400' },
        { label: 'Location Tracking Vector', val: 'Guarded (IP Only)', pct: 45, color: 'bg-[#c0c1ff]', textCol: 'text-[#c0c1ff]' },
        { label: 'Private Account Defaults (<16)', val: 'Enforced', pct: 90, color: 'bg-[#4cd7f6]', textCol: 'text-[#4cd7f6]' },
      ],
      pros: 'Keyword filtering available in FYP Settings',
      cons: 'In-app browser keylogger concerns',
      rev: 'Audit Rev: 2025.2'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      company: 'Meta • 1.4B Active',
      score: '71/100',
      badge: 'CONTROLLED',
      badgeColor: 'text-[#d0bcff] bg-[#a078ff]/20',
      icon: 'photo_camera',
      category: 'photo',
      stats: [
        { label: 'DM Phishing Vulnerability', val: 'Medium (48%)', pct: 48, color: 'bg-[#c0c1ff]', textCol: 'text-[#c0c1ff]' },
        { label: 'Photo EXIF Metadata Stripping', val: 'Protected (100%)', pct: 100, color: 'bg-[#4cd7f6]', textCol: 'text-[#4cd7f6]' },
        { label: 'Teen Accounts Auto-Supervision', val: 'Active', pct: 82, color: 'bg-[#4cd7f6]', textCol: 'text-[#4cd7f6]' },
      ],
      pros: "'Hidden Words' tool auto-blocks toxic hate text",
      cons: 'Sponsored impersonation brand traps in DMs',
      rev: 'Audit Rev: 2025.1'
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      company: 'Snap Inc. • 800M Active',
      score: '58/100',
      badge: 'HIGH CAUTION',
      badgeColor: 'text-rose-400 bg-rose-950/40 border border-rose-500/30',
      icon: 'chat_bubble',
      category: 'ephemeral',
      stats: [
        { label: 'Snap Map Stalking Risk', val: 'Critical Threat', pct: 88, color: 'bg-rose-500', textCol: 'text-rose-400' },
        { label: 'Disappearing Snaps Vulnerability', val: 'False Security', pct: 62, color: 'bg-[#c0c1ff]', textCol: 'text-[#c0c1ff]' },
        { label: 'Ghost Mode Adoption', val: '41% Users Default', pct: 41, color: 'bg-[#4cd7f6]', textCol: 'text-[#4cd7f6]' },
      ],
      pros: 'Enable Ghost Mode immediately in settings',
      cons: "'Quick Add' exposes personal handles to strangers",
      rev: 'Audit Rev: 2025.2'
    },
    {
      id: 'discord',
      name: 'Discord',
      company: 'Discord Inc. • 200M Active',
      score: '75/100',
      badge: 'GUARDED',
      badgeColor: 'text-[#4cd7f6] bg-[#009eb9]/20',
      icon: 'forum',
      category: 'messaging',
      stats: [
        { label: 'Phishing Links via Direct Message', val: 'Moderate (42%)', pct: 42, color: 'bg-[#c0c1ff]', textCol: 'text-[#c0c1ff]' },
        { label: 'Hardware 2FA / WebAuthn Support', val: 'Excellent (95%)', pct: 95, color: 'bg-[#4cd7f6]', textCol: 'text-[#4cd7f6]' },
        { label: 'Safe Direct Messaging Filter', val: 'Active', pct: 80, color: 'bg-[#4cd7f6]', textCol: 'text-[#4cd7f6]' },
      ],
      pros: 'Configurable DM permissions per individual server',
      cons: 'Malicious bot invites require careful oversight',
      rev: 'Audit Rev: 2025.1'
    },
    {
      id: 'bereal',
      name: 'BeReal',
      company: 'BeReal SAS • 40M Active',
      score: '86/100',
      badge: 'LOW RISK',
      badgeColor: 'text-[#4cd7f6] bg-[#009eb9]/20',
      icon: 'camera_roll',
      category: 'ephemeral',
      stats: [
        { label: 'Algorithm Addiction Mechanics', val: 'Minimal (15%)', pct: 15, color: 'bg-[#4cd7f6]', textCol: 'text-[#4cd7f6]' },
        { label: 'Strict Friends-Only Isolation', val: 'Default (94%)', pct: 94, color: 'bg-[#4cd7f6]', textCol: 'text-[#4cd7f6]' },
        { label: 'Dual Camera Background Leakage', val: 'Watch Context', pct: 40, color: 'bg-[#c0c1ff]', textCol: 'text-[#c0c1ff]' },
      ],
      pros: 'Zero infinite vertical dopamine feed',
      cons: 'Disable location tagging on spontaneous snaps',
      rev: 'Audit Rev: 2025.1'
    },
    {
      id: 'youtube-shorts',
      name: 'Shorts & Twitch',
      company: 'Stream & Video • 2B+ Active',
      score: '79/100',
      badge: 'MONITORED',
      badgeColor: 'text-[#d0bcff] bg-[#a078ff]/20',
      icon: 'smart_display',
      category: 'short-video',
      stats: [
        { label: 'Live Chat Harassment Shield', val: 'High (84%)', pct: 84, color: 'bg-[#4cd7f6]', textCol: 'text-[#4cd7f6]' },
        { label: 'Monetization & Gift Trap Risk', val: 'Moderate (54%)', pct: 54, color: 'bg-[#c0c1ff]', textCol: 'text-[#c0c1ff]' },
        { label: 'Watch Time Nudges & Bedtime Prompts', val: 'Supported', pct: 75, color: 'bg-[#4cd7f6]', textCol: 'text-[#4cd7f6]' },
      ],
      pros: 'Bedtime reminder tool easily scheduled',
      cons: 'Turn off autoplay to reduce frictionless bingeing',
      rev: 'Audit Rev: 2025.2'
    },
  ];

  const filteredApps = activeCategory === 'all'
    ? apps
    : apps.filter(a => {
        if (activeCategory === 'short-video') return a.category === 'short-video';
        if (activeCategory === 'photo') return a.category === 'photo' || a.category === 'ephemeral';
        if (activeCategory === 'messaging') return a.category === 'messaging';
        if (activeCategory === 'gaming') return a.id === 'discord' || a.id === 'youtube-shorts';
        return true;
      });

  return (
    <div className="w-full bg-[#0f131d] text-[#dfe2f1]">
      {/* Background Ambient Glow Accents */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-[#a078ff]/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
        <div className="absolute top-[600px] -right-20 w-[500px] h-[500px] bg-[#4cd7f6]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="absolute top-[1800px] left-10 w-[550px] h-[550px] bg-[#3131c0]/15 rounded-full blur-[130px] pointer-events-none -z-10"></div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 flex flex-col gap-20 sm:gap-24 relative z-10">

          {/* ========================================== */}
          {/* 1. HERO & CENTRAL VISUAL SEARCH CONSOLE    */}
          {/* ========================================== */}
          <section className="relative flex flex-col items-center text-center pt-6 pb-4">
            {/* Crosshair Cursor Decor Mockup Floating Top Right */}
            <div className="hidden lg:flex items-center gap-2 absolute top-4 right-12 bg-[#262a35]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-[0_0_20px_rgba(208,188,255,0.2)] border border-[#313540] pointer-events-none select-none">
              <span className="material-symbols-outlined text-[#d0bcff] text-[18px]">control_camera</span>
              <span className="font-label-tag text-label-tag text-[#d0bcff] uppercase tracking-wider text-[10px]">
                Vector [x:240, y:118]
              </span>
            </div>

            {/* Version Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#171b26] border border-[#313540] shadow-[0_0_24px_rgba(76,215,246,0.15)] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#4cd7f6] shadow-[0_0_8px_#4cd7f6] animate-ping"></span>
              <span className="font-label-tag text-label-tag text-[#4cd7f6] uppercase tracking-widest text-[11px]">
                V3.4 Cyber Defense Matrix For Teens
              </span>
              <span className="text-[#494454] font-label-tag text-label-tag">|</span>
              <span className="font-label-tag text-label-tag text-[#cbc3d7] uppercase text-[11px]">
                SMC Zero-Lecture Lab
              </span>
            </div>

            {/* Hero Headline */}
            <h1 className="font-display-hero text-headline-lg-mobile md:text-display-hero max-w-4xl tracking-tight text-[#dfe2f1] uppercase font-bold leading-tight">
              Navigate The Feed{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d0bcff] via-[#c0c1ff] to-[#4cd7f6]">
                Safely
              </span>
            </h1>

            {/* Subtext */}
            <p className="font-body-lg text-body-md md:text-body-lg text-[#cbc3d7] max-w-2xl mt-5 mb-10 leading-relaxed">
              Tactical digital street-smarts for the algorithmic age. Decode behavioral traps, protect sensitive biometric metadata, and deploy peer-tested defense protocols before you tap post.
            </p>

            {/* Visual Search Console */}
            <div className="w-full max-w-3xl relative">
              <div 
                onClick={onOpenSearch}
                className="bg-[#262a35]/85 backdrop-blur-xl rounded-full p-2.5 shadow-[0_16px_48px_rgba(0,0,0,0.5)] border border-[#313540] flex items-center justify-between gap-3 group transition-all duration-300 hover:border-[#a078ff]/60 cursor-pointer"
              >
                <div className="flex items-center gap-3.5 pl-4 flex-1">
                  <span className="material-symbols-outlined text-[#d0bcff] text-2xl">search</span>
                  <span className="font-body-md text-body-md text-[#958ea0] select-none text-left truncate">
                    Search app telemetry, exploit types, or privacy setup guides...
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 pr-1">
                  <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md bg-[#313540] font-label-tag text-label-tag text-[#cbc3d7]">
                    ⌘ + K
                  </span>
                  <button 
                    aria-label="Execute search" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenSearch();
                    }}
                    className="bg-[#d0bcff] text-[#3c0091] font-headline-sm text-sm font-bold px-6 py-2.5 rounded-full hover:shadow-[0_0_24px_rgba(208,188,255,0.45)] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span>Scan</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Target Pointer Overlay Visual */}
              <div className="hidden md:flex items-center gap-2 absolute -bottom-8 -right-6 pointer-events-none select-none">
                <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">near_me</span>
                <span className="font-label-tag text-label-tag bg-[#0a0e18] text-[#4cd7f6] px-2.5 py-0.5 rounded-full shadow-md border border-[#009eb9]/30 text-[10px]">
                  Active Threat Radar Hook
                </span>
              </div>

              {/* Recommended Search Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                <span className="font-label-tag text-label-tag text-[#958ea0] uppercase tracking-wider mr-1 text-[10px]">
                  Trending Vectors:
                </span>
                <button 
                  onClick={() => { playCyberSound('click'); onNavigate('apps-matrix'); }}
                  className="px-3.5 py-1.5 rounded-full bg-[#171b26] hover:bg-[#1c1f2a] text-[#cbc3d7] hover:text-[#d0bcff] font-label-tag text-label-tag text-[10px] transition-all border border-[#313540]/40"
                >
                  TikTok Privacy
                </button>
                <button 
                  onClick={() => { playCyberSound('click'); onNavigate('apps-matrix'); }}
                  className="px-3.5 py-1.5 rounded-full bg-[#171b26] hover:bg-[#1c1f2a] text-[#cbc3d7] hover:text-[#4cd7f6] font-label-tag text-label-tag text-[10px] transition-all border border-[#313540]/40"
                >
                  Snapchat Snap Map Risks
                </button>
                <button 
                  onClick={() => { playCyberSound('click'); onNavigate('apps-matrix'); }}
                  className="px-3.5 py-1.5 rounded-full bg-[#171b26] hover:bg-[#1c1f2a] text-[#cbc3d7] hover:text-[#c0c1ff] font-label-tag text-label-tag text-[10px] transition-all border border-[#313540]/40"
                >
                  Instagram Close Friends
                </button>
                <button 
                  onClick={() => { playCyberSound('click'); onNavigate('livestreaming'); }}
                  className="px-3.5 py-1.5 rounded-full bg-[#171b26] hover:bg-[#1c1f2a] text-[#cbc3d7] hover:text-[#d0bcff] font-label-tag text-label-tag text-[10px] transition-all border border-[#313540]/40"
                >
                  Discord Bot Scams
                </button>
                <button 
                  onClick={() => { playCyberSound('click'); onNavigate('parents-guide'); }}
                  className="px-3.5 py-1.5 rounded-full bg-[#171b26] hover:bg-[#1c1f2a] text-[#cbc3d7] hover:text-[#4cd7f6] font-label-tag text-label-tag text-[10px] transition-all border border-[#313540]/40"
                >
                  Roblox Safety
                </button>
              </div>
            </div>

            {/* Quick Stat Pills Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mt-12">
              <div className="bg-[#1c1f2a]/80 backdrop-blur-md rounded-2xl p-4.5 flex items-center justify-center gap-3.5 shadow-md border border-[#313540]">
                <div className="w-10 h-10 rounded-full bg-[#a078ff]/20 flex items-center justify-center text-[#d0bcff]">
                  <span className="material-symbols-outlined text-[22px]">bolt</span>
                </div>
                <div className="text-left">
                  <div className="font-headline-md text-headline-md font-bold text-[#dfe2f1] leading-tight">142</div>
                  <div className="font-label-tag text-label-tag text-[#cbc3d7] uppercase text-[10px]">Apps Monitored Daily</div>
                </div>
              </div>

              <div className="bg-[#1c1f2a]/80 backdrop-blur-md rounded-2xl p-4.5 flex items-center justify-center gap-3.5 shadow-md border border-[#313540]">
                <div className="w-10 h-10 rounded-full bg-[#009eb9]/20 flex items-center justify-center text-[#4cd7f6]">
                  <span className="material-symbols-outlined text-[22px]">security</span>
                </div>
                <div className="text-left">
                  <div className="font-headline-md text-headline-md font-bold text-[#dfe2f1] leading-tight">98.4%</div>
                  <div className="font-label-tag text-label-tag text-[#cbc3d7] uppercase text-[10px]">Scam Detection Precision</div>
                </div>
              </div>

              <div className="bg-[#1c1f2a]/80 backdrop-blur-md rounded-2xl p-4.5 flex items-center justify-center gap-3.5 shadow-md border border-[#313540]">
                <div className="w-10 h-10 rounded-full bg-[#3131c0]/20 flex items-center justify-center text-[#c0c1ff]">
                  <span className="material-symbols-outlined text-[22px]">groups</span>
                </div>
                <div className="text-left">
                  <div className="font-headline-md text-headline-md font-bold text-[#dfe2f1] leading-tight">45,800+</div>
                  <div className="font-label-tag text-label-tag text-[#cbc3d7] uppercase text-[10px]">Student Guardians Active</div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================== */}
          {/* 2. DUAL INTEGRATED WEB SERVICES MODULE     */}
          {/* ========================================== */}
          <section className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#262a35] text-[#d0bcff] font-label-tag text-label-tag uppercase tracking-wider mb-2 border border-[#313540]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d0bcff] shadow-[0_0_6px_#d0bcff]"></span>
                  Live Telemetry Core
                </div>
                <h2 className="font-headline-lg text-headline-md sm:text-headline-lg font-bold text-[#dfe2f1]">
                  Integrated Cyber Intelligence Grid
                </h2>
              </div>
              <p className="font-body-sm text-body-sm text-[#cbc3d7] max-w-md">
                Connecting students directly to high-frequency network probes and permission audit gateways built for youth safety.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Container 1: Live Threat Intelligence API */}
              <div className="bg-[#1c1f2a]/85 backdrop-blur-xl rounded-2xl p-7 flex flex-col justify-between shadow-xl border border-[#313540] relative overflow-hidden group">
                <div className="absolute -right-20 -top-20 w-44 h-44 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#313540]/40">
                    <div className="flex flex-col">
                      <span className="font-label-tag text-label-tag text-rose-400 uppercase tracking-widest">
                        Active Stream: Protocol v4.2
                      </span>
                      <h3 className="font-headline-sm text-headline-sm font-bold text-[#dfe2f1] mt-0.5 text-base sm:text-lg">
                        Integrated Web Service 1: Live Threat Intelligence API
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-[#313540] font-label-tag text-label-tag text-[#4cd7f6] flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#4cd7f6]"></span> 24ms
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#313540] font-label-tag text-label-tag text-[#cbc3d7]">
                        Live Socket
                      </span>
                    </div>
                  </div>

                  {/* Threat Feeds Stream Box */}
                  <div className="flex flex-col gap-2.5 font-label-md text-label-md">
                    <div className="p-3.5 rounded-xl bg-[#171b26] flex items-start justify-between gap-3 hover:bg-[#262a35] transition-colors border border-[#313540]/30">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-rose-400 text-[22px] mt-0.5">warning</span>
                        <div>
                          <div className="font-semibold text-[#dfe2f1] flex items-center gap-2 flex-wrap">
                            <span>Viral AI Face-Swap Trend 'FaceCloneX'</span>
                            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-label-tag text-label-tag text-[9px]">
                              CRITICAL EXPOSURE
                            </span>
                          </div>
                          <p className="font-body-sm text-body-sm text-[#cbc3d7] mt-0.5 text-xs">
                            Arbitrary cloud storage clause secretly harvesting biometric facial maps without deletion expiry.
                          </p>
                        </div>
                      </div>
                      <span className="font-label-tag text-label-tag text-[#958ea0] shrink-0 text-[10px]">4m ago</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#171b26] flex items-start justify-between gap-3 hover:bg-[#262a35] transition-colors border border-[#313540]/30">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[#4cd7f6] text-[22px] mt-0.5">crisis_alert</span>
                        <div>
                          <div className="font-semibold text-[#dfe2f1] flex items-center gap-2 flex-wrap">
                            <span>Discord 'Free Nitro' QR Code Hijack</span>
                            <span className="px-2 py-0.5 rounded-full bg-[#009eb9]/20 text-[#4cd7f6] font-label-tag text-label-tag text-[9px]">
                              SESSION STEALER
                            </span>
                          </div>
                          <p className="font-body-sm text-body-sm text-[#cbc3d7] mt-0.5 text-xs">
                            Targeting gaming school communities; bypasses 2FA tokens using quick-scan token capture.
                          </p>
                        </div>
                      </div>
                      <span className="font-label-tag text-label-tag text-[#958ea0] shrink-0 text-[10px]">19m ago</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#171b26] flex items-start justify-between gap-3 hover:bg-[#262a35] transition-colors border border-[#313540]/30">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[#d0bcff] text-[22px] mt-0.5">radar</span>
                        <div>
                          <div className="font-semibold text-[#dfe2f1] flex items-center gap-2 flex-wrap">
                            <span>TikTok Algorithmic Loop Alert</span>
                            <span className="px-2 py-0.5 rounded-full bg-[#a078ff]/20 text-[#d0bcff] font-label-tag text-label-tag text-[9px]">
                              PSYCH AUDIT
                            </span>
                          </div>
                          <p className="font-body-sm text-body-sm text-[#cbc3d7] mt-0.5 text-xs">
                            Sudden spike in hyper-restrictive diet hashtags triggering aggressive dopamine cycle cascades.
                          </p>
                        </div>
                      </div>
                      <span className="font-label-tag text-label-tag text-[#958ea0] shrink-0 text-[10px]">38m ago</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-4 flex items-center justify-between border-t border-[#313540]/40">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4cd7f6] shadow-[0_0_8px_#4cd7f6]"></span>
                    <span className="font-label-tag text-label-tag text-[#cbc3d7] uppercase text-[10px]">
                      Endpoint: telemetry.smc-defense.org
                    </span>
                  </div>
                  <button 
                    onClick={handleConfigureWebhook}
                    className="px-4 py-2 rounded-full bg-[#313540] hover:bg-[#d0bcff] hover:text-[#3c0091] font-label-tag text-label-tag text-[#dfe2f1] transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">tune</span>
                    <span>{webhookConfigured ? 'Webhook Armed ✓' : 'Configure Webhook'}</span>
                  </button>
                </div>
              </div>

              {/* Container 2: Cloud Privacy Validator Service */}
              <div className="bg-[#1c1f2a]/85 backdrop-blur-xl rounded-2xl p-7 flex flex-col justify-between shadow-xl border border-[#313540] relative overflow-hidden group">
                <div className="absolute -left-20 -top-20 w-44 h-44 bg-[#3131c0]/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#313540]/40">
                    <div className="flex flex-col">
                      <span className="font-label-tag text-label-tag text-[#c0c1ff] uppercase tracking-widest">
                        OAuth 2.1 Engine
                      </span>
                      <h3 className="font-headline-sm text-headline-sm font-bold text-[#dfe2f1] mt-0.5 text-base sm:text-lg">
                        Integrated Web Service 2: Cloud Privacy Validator Service
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#a078ff]/20 text-[#d0bcff] font-label-tag text-label-tag flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">verified_user</span> Sandbox Validated
                    </span>
                  </div>

                  {/* Circular Score Gauge & Scopes */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center bg-[#171b26] p-4 rounded-xl border border-[#313540]/30">
                    <div className="sm:col-span-4 flex flex-col items-center justify-center text-center">
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <path 
                            className="text-[#313540]" 
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="3.5"
                          />
                          <path 
                            className="text-[#4cd7f6] transition-all duration-700" 
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeDasharray={`${validatorScore}, 100`} 
                            strokeLinecap="round" 
                            strokeWidth="3.5"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="font-display-hero text-headline-lg font-bold text-[#dfe2f1] leading-none">
                            {validatorScore}
                          </span>
                          <span className="font-label-tag text-label-tag text-[#4cd7f6] uppercase text-[10px]">
                            {validatorScore >= 90 ? 'Grade A+' : 'Grade A-'}
                          </span>
                        </div>
                      </div>
                      <span className="font-label-tag text-label-tag text-[#cbc3d7] uppercase mt-2 text-[10px]">
                        Active Safety Index
                      </span>
                    </div>

                    <div className="sm:col-span-8 flex flex-col gap-2.5">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-[#1c1f2a]">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">location_disabled</span>
                          <span className="font-label-md text-label-md text-[#dfe2f1]">Precise GPS Geolocation</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-[#313540] text-[#4cd7f6] font-label-tag text-label-tag text-[9px]">
                          BLOCKED
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-[#1c1f2a]">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-[#c0c1ff]">mic</span>
                          <span className="font-label-md text-label-md text-[#dfe2f1]">Microphone In Background</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-[#313540] text-[#c0c1ff] font-label-tag text-label-tag text-[9px]">
                          RESTRICTED
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-[#1c1f2a]">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-rose-400">contacts</span>
                          <span className="font-label-md text-label-md text-[#dfe2f1]">Contact Book Sync</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-label-tag text-label-tag text-[9px]">
                          AUDIT FLAG
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="font-body-sm text-body-sm text-[#cbc3d7] text-xs">
                    Runs an instant read-only simulation through your browser sandbox to verify third-party token scopes without storing personal credentials.
                  </p>
                </div>

                <div className="pt-6 mt-4 flex items-center justify-between border-t border-[#313540]/40">
                  <span className="font-label-tag text-label-tag text-[#cbc3d7] text-[10px]">
                    Last Full Verification: Today 14:22
                  </span>
                  <button 
                    onClick={handleRunValidator}
                    disabled={validatorRunning}
                    className="px-5 py-2 rounded-full bg-[#d0bcff] hover:bg-[#a078ff] text-[#3c0091] font-headline-sm text-sm font-bold shadow-[0_0_16px_rgba(208,188,255,0.3)] transition-all flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span className={`material-symbols-outlined text-[18px] ${validatorRunning ? 'animate-spin' : ''}`}>
                      sync
                    </span>
                    <span>{validatorRunning ? 'Simulating...' : 'Run Cloud Validator'}</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================== */}
          {/* 3. MOST POPULAR SOCIAL MEDIA APPS GRID     */}
          {/* ========================================== */}
          <section className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#262a35] text-[#4cd7f6] font-label-tag text-label-tag uppercase tracking-wider mb-2 border border-[#313540]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] shadow-[0_0_6px_#4cd7f6]"></span>
                  Safety &amp; Risk Metrics
                </div>
                <h2 className="font-headline-lg text-headline-md sm:text-headline-lg font-bold text-[#dfe2f1]">
                  Most Popular Social Media Apps
                </h2>
                <p className="font-body-md text-body-md text-[#cbc3d7] mt-1">
                  Real telemetry, empirical privacy audits, and tactical countermeasure guides.
                </p>
              </div>

              {/* Filter Navigation Tabs */}
              <div className="flex items-center gap-1.5 bg-[#171b26] p-1.5 rounded-full border border-[#313540] overflow-x-auto max-w-full">
                <button 
                  onClick={() => { playCyberSound('click'); setActiveCategory('all'); }}
                  className={`px-4 py-1.5 rounded-full font-label-tag text-label-tag uppercase tracking-wider text-[10px] shrink-0 transition-all ${
                    activeCategory === 'all'
                      ? 'bg-[#a078ff] text-[#340080] font-bold shadow-md'
                      : 'text-[#cbc3d7] hover:text-white'
                  }`}
                >
                  All Platforms
                </button>
                <button 
                  onClick={() => { playCyberSound('click'); setActiveCategory('short-video'); }}
                  className={`px-4 py-1.5 rounded-full font-label-tag text-label-tag uppercase tracking-wider text-[10px] shrink-0 transition-all ${
                    activeCategory === 'short-video'
                      ? 'bg-[#a078ff] text-[#340080] font-bold shadow-md'
                      : 'text-[#cbc3d7] hover:text-white'
                  }`}
                >
                  Short Video
                </button>
                <button 
                  onClick={() => { playCyberSound('click'); setActiveCategory('photo'); }}
                  className={`px-4 py-1.5 rounded-full font-label-tag text-label-tag uppercase tracking-wider text-[10px] shrink-0 transition-all ${
                    activeCategory === 'photo'
                      ? 'bg-[#a078ff] text-[#340080] font-bold shadow-md'
                      : 'text-[#cbc3d7] hover:text-white'
                  }`}
                >
                  Photo &amp; Ephemeral
                </button>
                <button 
                  onClick={() => { playCyberSound('click'); setActiveCategory('messaging'); }}
                  className={`px-4 py-1.5 rounded-full font-label-tag text-label-tag uppercase tracking-wider text-[10px] shrink-0 transition-all ${
                    activeCategory === 'messaging'
                      ? 'bg-[#a078ff] text-[#340080] font-bold shadow-md'
                      : 'text-[#cbc3d7] hover:text-white'
                  }`}
                >
                  Messaging &amp; Voice
                </button>
                <button 
                  onClick={() => { playCyberSound('click'); setActiveCategory('gaming'); }}
                  className={`px-4 py-1.5 rounded-full font-label-tag text-label-tag uppercase tracking-wider text-[10px] shrink-0 transition-all ${
                    activeCategory === 'gaming'
                      ? 'bg-[#a078ff] text-[#340080] font-bold shadow-md'
                      : 'text-[#cbc3d7] hover:text-white'
                  }`}
                >
                  Gaming
                </button>
              </div>
            </div>

            {/* App Matrix Cards Grid (3 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map((app) => (
                <div 
                  key={app.id} 
                  className="bg-[#1c1f2a]/80 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between shadow-xl border border-[#313540] hover:-translate-y-1.5 transition-all duration-300 relative group"
                >
                  <div>
                    {/* Top Row: App Icon & Score Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#262a35] flex items-center justify-center text-[#d0bcff] shadow-inner border border-[#313540]">
                          <span className="material-symbols-outlined text-[26px]">{app.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-headline-md text-headline-md font-bold text-[#dfe2f1] leading-none text-lg">
                            {app.name}
                          </h3>
                          <span className="font-label-tag text-label-tag text-[#cbc3d7] uppercase text-[10px]">
                            {app.company}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-headline-sm text-headline-sm font-bold text-[#dfe2f1] text-base">
                          {app.score}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full font-label-tag text-label-tag text-[9px] font-bold ${app.badgeColor}`}>
                          {app.badge}
                        </span>
                      </div>
                    </div>

                    {/* Metric Telemetry Bars */}
                    <div className="flex flex-col gap-3 mt-6">
                      {app.stats.map((s, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between font-label-tag text-label-tag text-[#cbc3d7] mb-1 text-[10px]">
                            <span>{s.label}</span>
                            <span className={`font-semibold ${s.textCol}`}>{s.val}</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-[#262a35] overflow-hidden">
                            <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Bullet Audit */}
                    <div className="mt-5 p-3 rounded-xl bg-[#171b26] flex flex-col gap-1.5 border border-[#313540]/30 text-xs">
                      <div className="flex items-center gap-2 font-label-tag text-label-tag text-[#dfe2f1] text-[10px]">
                        <span className="material-symbols-outlined text-[16px] text-[#4cd7f6]">check_circle</span>
                        <span>{app.pros}</span>
                      </div>
                      <div className="flex items-center gap-2 font-label-tag text-label-tag text-rose-400 text-[10px]">
                        <span className="material-symbols-outlined text-[16px] text-rose-400">warning</span>
                        <span>{app.cons}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Trigger */}
                  <div className="pt-6 mt-6 flex items-center justify-between border-t border-[#313540]/40">
                    <span className="font-label-tag text-label-tag text-[#958ea0] text-[10px]">{app.rev}</span>
                    <button 
                      onClick={() => {
                        playCyberSound('click');
                        onNavigate('apps-matrix');
                      }}
                      className="px-4 py-2 rounded-full bg-[#262a35] hover:bg-[#a078ff] hover:text-[#340080] font-label-tag text-label-tag text-[#dfe2f1] transition-all flex items-center gap-1 text-[10px]"
                    >
                      <span>View Full Audit Guide</span>
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================== */}
          {/* 4. EDUCATIONAL INFOGRAPHIC ROADMAP         */}
          {/* ========================================== */}
          <section className="bg-[#0a0e18]/90 backdrop-blur-2xl rounded-2xl p-8 md:p-12 shadow-2xl border border-[#313540] flex flex-col gap-10 relative overflow-hidden">
            <div className="absolute -right-40 -bottom-40 w-96 h-96 bg-[#a078ff]/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#262a35] text-[#d0bcff] font-label-tag text-label-tag uppercase tracking-wider mb-2 border border-[#313540]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d0bcff] shadow-[0_0_6px_#d0bcff]"></span>
                  Tactical Playbook
                </div>
                <h2 className="font-headline-lg text-headline-md sm:text-headline-lg font-bold text-[#dfe2f1]">
                  How To Stay Safe Online
                </h2>
                <p className="font-body-md text-body-md text-[#cbc3d7] mt-1 max-w-xl">
                  A 4-step mission roadmap built by teen cybersecurity fellows. Master your digital perimeter without deleting your social life.
                </p>
              </div>

              <button 
                onClick={handleDownloadCheatSheet}
                className="px-5 py-2.5 rounded-full bg-[#262a35] hover:bg-[#353944] text-[#dfe2f1] font-headline-sm text-sm transition-all flex items-center gap-2 shrink-0 self-start md:self-auto border border-[#313540] active:scale-95"
                title="Download SMC Tactical Cheat Sheet (TXT/Print)"
              >
                <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">download</span>
                <span>Get Defense Cheat Sheet</span>
              </button>
            </div>

            {/* 4-Step Interactive Roadmap */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {/* Step 01 */}
              <div className="bg-[#171b26] rounded-xl p-6 flex flex-col justify-between shadow-md border border-[#313540]/60 hover:border-[#d0bcff]/50 transition-all group">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display-hero text-3xl font-bold text-[#d0bcff]/40 leading-none group-hover:text-[#d0bcff] transition-colors">
                      01
                    </span>
                    <span className="material-symbols-outlined text-2xl text-[#d0bcff]">lock_reset</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-[#dfe2f1] text-base">
                    Hard-Lock Your Perimeter
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#cbc3d7] leading-relaxed text-xs">
                    Zero location leak policy: Switch off precise GPS permissions on image uploads, wipe phone numbers from account searchability, and lock down 2FA via an authenticator app (never SMS).
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#313540]/40">
                  <details className="group/pro cursor-pointer">
                    <summary className="font-label-tag text-label-tag text-[#4cd7f6] uppercase tracking-wider flex items-center justify-between select-none text-[10px]">
                      <span>Pro-Tip: Ghost Mode</span>
                      <span className="material-symbols-outlined text-sm group-open/pro:rotate-180 transition-transform">expand_more</span>
                    </summary>
                    <p className="font-body-sm text-body-sm text-[#dfe2f1] mt-2.5 p-2.5 rounded-lg bg-[#0a0e18] text-xs">
                      Always strip location tags from your smartphone camera rolls prior to publishing stories to avoid home coordinates leakage.
                    </p>
                  </details>
                </div>
              </div>

              {/* Step 02 */}
              <div className="bg-[#171b26] rounded-xl p-6 flex flex-col justify-between shadow-md border border-[#313540]/60 hover:border-[#4cd7f6]/50 transition-all group">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display-hero text-3xl font-bold text-[#4cd7f6]/40 leading-none group-hover:text-[#4cd7f6] transition-colors">
                      02
                    </span>
                    <span className="material-symbols-outlined text-2xl text-[#4cd7f6]">psychology</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-[#dfe2f1] text-base">
                    Decipher The Algorithm
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#cbc3d7] leading-relaxed text-xs">
                    Spot dopamine loop hooks and outrage baiting in under 3 seconds. The algorithm feeds on anger and duration. Use built-in reset options to wipe your feed profile when it turns toxic.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#313540]/40">
                  <details className="group/pro cursor-pointer">
                    <summary className="font-label-tag text-label-tag text-[#4cd7f6] uppercase tracking-wider flex items-center justify-between select-none text-[10px]">
                      <span>Pro-Tip: Feed Detox</span>
                      <span className="material-symbols-outlined text-sm group-open/pro:rotate-180 transition-transform">expand_more</span>
                    </summary>
                    <p className="font-body-sm text-body-sm text-[#dfe2f1] mt-2.5 p-2.5 rounded-lg bg-[#0a0e18] text-xs">
                      On TikTok: Go to Settings &gt; Content Preferences &gt; Refresh your For You Feed to purge toxic cycles instantly.
                    </p>
                  </details>
                </div>
              </div>

              {/* Step 03 */}
              <div className="bg-[#171b26] rounded-xl p-6 flex flex-col justify-between shadow-md border border-[#313540]/60 hover:border-[#c0c1ff]/50 transition-all group">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display-hero text-3xl font-bold text-[#c0c1ff]/40 leading-none group-hover:text-[#c0c1ff] transition-colors">
                      03
                    </span>
                    <span className="material-symbols-outlined text-2xl text-[#c0c1ff]">visibility</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-[#dfe2f1] text-base">
                    Spot The Digital Traps
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#cbc3d7] leading-relaxed text-xs">
                    Brand ambassadors offering $500 collabs or free gaming currency via direct messages are always credential-stealers. Cross-check sender profiles and look for AI deepfake voice glitches.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#313540]/40">
                  <details className="group/pro cursor-pointer">
                    <summary className="font-label-tag text-label-tag text-[#4cd7f6] uppercase tracking-wider flex items-center justify-between select-none text-[10px]">
                      <span>Pro-Tip: Domain Scan</span>
                      <span className="material-symbols-outlined text-sm group-open/pro:rotate-180 transition-transform">expand_more</span>
                    </summary>
                    <p className="font-body-sm text-body-sm text-[#dfe2f1] mt-2.5 p-2.5 rounded-lg bg-[#0a0e18] text-xs">
                      Never tap shortened URLs (bit.ly/tinyurl) inside Discord or Snapchat DMs without running them through an unshortener tool.
                    </p>
                  </details>
                </div>
              </div>

              {/* Step 04 */}
              <div className="bg-[#171b26] rounded-xl p-6 flex flex-col justify-between shadow-md border border-[#313540]/60 hover:border-rose-400/50 transition-all group">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display-hero text-3xl font-bold text-rose-500/40 leading-none group-hover:text-rose-400 transition-colors">
                      04
                    </span>
                    <span className="material-symbols-outlined text-2xl text-rose-400">shield_with_heart</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-[#dfe2f1] text-base">
                    Take Action &amp; Peer Shield
                  </h3>
                  <p className="font-body-sm text-body-sm text-[#cbc3d7] leading-relaxed text-xs">
                    When cyberbullying or digital extortion happens, do not self-isolate or stay silent. Take timestamped screenshots, report using SMC one-click escalations, and support your classmates.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#313540]/40">
                  <details className="group/pro cursor-pointer">
                    <summary className="font-label-tag text-label-tag text-[#4cd7f6] uppercase tracking-wider flex items-center justify-between select-none text-[10px]">
                      <span>Pro-Tip: Evidence Log</span>
                      <span className="material-symbols-outlined text-sm group-open/pro:rotate-180 transition-transform">expand_more</span>
                    </summary>
                    <p className="font-body-sm text-body-sm text-[#dfe2f1] mt-2.5 p-2.5 rounded-lg bg-[#0a0e18] text-xs">
                      Capture the perpetrator's permanent user ID numbers (not just their display name) before they block you or alter their handle.
                    </p>
                  </details>
                </div>
              </div>
            </div>

            {/* Student Ambassador Banner CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#3131c0]/25 via-[#a078ff]/20 to-[#009eb9]/25 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#313540]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#a078ff]/30 flex items-center justify-center text-[#d0bcff] shrink-0">
                  <span className="material-symbols-outlined text-2xl">campaign</span>
                </div>
                <div>
                  <div className="font-headline-sm text-headline-sm font-bold text-[#dfe2f1] text-base">
                    Lead the Movement at Your School
                  </div>
                  <div className="font-body-sm text-body-sm text-[#cbc3d7] text-xs">
                    Deploy peer workshops, run digital self-defense challenges, and earn verified Cyber Cadet badges.
                  </div>
                </div>
              </div>
              <button 
                onClick={() => {
                  playCyberSound('batch');
                  onNavigate('information');
                }}
                className="px-6 py-2.5 rounded-full bg-[#d0bcff] text-[#3c0091] font-headline-sm text-sm font-bold hover:shadow-[0_0_24px_rgba(208,188,255,0.4)] transition-all shrink-0 active:scale-95"
              >
                Join Student Ambassadors
              </button>
            </div>
          </section>

          {/* ========================================== */}
          {/* QUICK ACTION / IMMERSIVE RADAR CALLOUT     */}
          {/* ========================================== */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 p-8 rounded-2xl bg-[#1c1f2a]/60 border border-[#313540]">
            <div className="lg:col-span-8 flex flex-col gap-3">
              <span className="font-label-tag text-label-tag text-[#4cd7f6] uppercase tracking-widest text-[11px]">
                Always-On Defense Protocol
              </span>
              <h2 className="font-headline-lg text-headline-md sm:text-headline-lg font-bold text-[#dfe2f1]">
                Got an anonymous DM or suspicious link right now?
              </h2>
              <p className="font-body-md text-body-md text-[#cbc3d7] max-w-2xl text-sm leading-relaxed">
                Drop it into the SMC Emergency Verification Tool. It parses the URL or message through encrypted sandboxes to test for malicious redirects, phishing scripts, and account hijacking vectors without exposing your identity.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button 
                onClick={() => {
                  playCyberSound('alarm');
                  onNavigate('contact-us');
                }}
                className="w-full px-6 py-3 rounded-full bg-[#ffb4ab] text-[#690005] font-headline-sm text-sm font-bold hover:shadow-[0_0_24px_rgba(255,180,171,0.4)] transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">emergency_home</span>
                <span>Emergency Hotline &amp; Chat</span>
              </button>

              <button 
                onClick={() => {
                  playCyberSound('click');
                  onOpenScanner();
                }}
                className="w-full px-6 py-3 rounded-full bg-[#262a35] hover:bg-[#353944] text-[#dfe2f1] font-headline-sm text-sm font-bold transition-all flex items-center justify-center gap-2 border border-[#313540] active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px] text-[#4cd7f6]">document_scanner</span>
                <span>Scan Suspicious DM Link</span>
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
