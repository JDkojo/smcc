import React, { useState } from 'react';
import { PageId } from '../types.ts';
import { playCyberSound } from '../utils/audio.ts';

interface InformationViewProps {
  onNavigate: (page: PageId) => void;
  onOpenScanner: () => void;
}

const DIRECTIVES = [
  {
    num: '01',
    title: 'Algorithmic Autonomy',
    subtitle: 'Reclaim agency over algorithmic recommendation loops',
    icon: 'neurology',
    color: 'text-primary border-primary/40 bg-primary/10',
    description: 'Recommendation algorithms optimize for emotional arousal, outrage, and session duration. We teach teens to poison synthetic behavioral models, intentionally introduce noise, and operate in chronological streams.',
    keyAction: 'Systematic Seed Cleansing & Periodic Profile Reset'
  },
  {
    num: '02',
    title: 'Data Sovereignty',
    subtitle: 'Absolute ownership of biometric, geospatial & relational graphs',
    icon: 'encrypted',
    color: 'text-secondary border-secondary/40 bg-secondary/10',
    description: 'No commercial platform has a natural right to your voiceprint, facial landmarks, or contact network. We advocate for zero-retention defaults and enforceable cryptographic erasure.',
    keyAction: 'Hardware Level Sensor Disconnection & EXIF Scrubbing'
  },
  {
    num: '03',
    title: 'Peer Defense Mutual Aid',
    subtitle: 'Crowdsourced threat verification and rapid response',
    icon: 'group_work',
    color: 'text-accent border-accent/40 bg-accent/10',
    description: 'Predatory actors and extortion rings rely on shame and isolation. By organizing school-level telemetry squads, teens verify deceptive DMs together and neutralize extortion before escalation.',
    keyAction: 'Anonymous Verification Protocol & Decoy Inboxes'
  },
  {
    num: '04',
    title: 'Legislative Accountability',
    subtitle: 'Policy pressure against deceptive age-gating and corporate surveillance',
    icon: 'gavel',
    color: 'text-warning border-warning/40 bg-warning/10',
    description: 'We hold tech conglomerates accountable under state privacy acts and federal frameworks without accepting mandatory government-ID surveillance disguised as child safety.',
    keyAction: 'Direct Youth Testimony & Policy Audit Reports'
  }
];

const SEATTLE_COHORT = [
  {
    name: 'Maya Lin',
    age: 17,
    role: 'Cryptographic Lead & OSINT Scout',
    roleColor: 'bg-primary/20 text-primary border-primary/40',
    school: 'Garfield High School, Seattle WA',
    focus: 'In-app keylogger auditing & browser isolation scripts',
    quote: '"We are not the product, and we refuse to be the experiment."',
    initials: 'ML'
  },
  {
    name: 'Darius Vance',
    age: 18,
    role: 'Threat Vector Researcher',
    roleColor: 'bg-secondary/20 text-secondary border-secondary/40',
    school: 'Ballard High School, Seattle WA',
    focus: 'Reverse engineering behavioral hooks in mobile video engines',
    quote: '"If an algorithm claims to know what you want before you do, it is shaping you, not serving you."',
    initials: 'DV'
  },
  {
    name: 'Elena Rostova',
    age: 16,
    role: 'Youth Policy Advocate',
    roleColor: 'bg-accent/20 text-accent border-accent/40',
    school: 'Roosevelt High School, Seattle WA',
    focus: 'Drafting youth privacy amendments for Washington State Legislature',
    quote: '"Digital street-smarts should be taught alongside physical self-defense."',
    initials: 'ER'
  },
  {
    name: 'Kofi Mensah',
    age: 17,
    role: 'Incident Response Coordinator',
    roleColor: 'bg-warning/20 text-warning border-warning/40',
    school: 'Franklin High School, Seattle WA',
    focus: 'Sextortion defense protocols & DM forensic sanitization',
    quote: '"Shame is the attacker\'s weapon. Sunlight and peer support is the antidote."',
    initials: 'KM'
  }
];

export const InformationView: React.FC<InformationViewProps> = ({ onNavigate, onOpenScanner }) => {
  const [activeDirective, setActiveDirective] = useState<number>(0);
  const [manifestoPledge, setManifestoPledge] = useState(false);

  return (
    <div className="min-h-screen pb-24 text-on-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-14 pb-12 border-b border-surface-container-high bg-surface-container-lowest/90">
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-mono font-medium tracking-widest bg-secondary/10 border border-secondary/30 text-secondary mb-4">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              SMC MANIFESTO // CODENAME: SOVEREIGN YOUTH
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-display">
              Youth Autonomy in the Algorithmic Age
            </h1>
            <p className="mt-4 text-base sm:text-lg text-on-surface-variant leading-relaxed">
              We reject the premise that growing up digital means living inside an unconsenting surveillance experiment. The Seattle Matrix Collective is building tactical digital street-smarts, open forensics, and peer-to-peer resistance.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high">
              <span className="text-2xl sm:text-3xl font-black font-mono text-primary">100%</span>
              <p className="text-xs font-mono text-outline mt-1 uppercase">Youth-Led Initiative</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high">
              <span className="text-2xl sm:text-3xl font-black font-mono text-secondary">3,400+</span>
              <p className="text-xs font-mono text-outline mt-1 uppercase">Students Shielded</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high">
              <span className="text-2xl sm:text-3xl font-black font-mono text-accent">14</span>
              <p className="text-xs font-mono text-outline mt-1 uppercase">School Alliances</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high">
              <span className="text-2xl sm:text-3xl font-black font-mono text-warning">0</span>
              <p className="text-xs font-mono text-outline mt-1 uppercase">Ad Trackers on SMC</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Tactical Directives */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
            OPERATIONAL DOCTRINE
          </span>
          <h2 className="text-3xl font-black text-white font-display uppercase mt-1">
            The 4 Defense Directives
          </h2>
          <p className="text-xs sm:text-sm text-outline mt-2">
            Non-negotiable protocols formulated by the youth research squad to neutralize platform manipulation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DIRECTIVES.map((directive, index) => (
            <div
              key={directive.num}
              onClick={() => {
                playCyberSound('click');
                setActiveDirective(index);
              }}
              className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                activeDirective === index
                  ? 'bg-surface-container-high/90 border-primary ring-1 ring-primary/40 shadow-xl shadow-primary/5'
                  : 'bg-surface-container-low border-surface-container-high hover:border-outline-variant hover:bg-surface-container'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-3xl font-black font-mono text-outline/30 group-hover:text-primary transition-colors">
                  {directive.num}
                </span>
                <span className={`p-2.5 rounded-xl border ${directive.color}`}>
                  <span className="material-symbols-outlined text-2xl">{directive.icon}</span>
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mt-4 font-display">
                {directive.title}
              </h3>
              <p className="text-xs font-mono text-primary font-medium mt-1">
                {directive.subtitle}
              </p>
              <p className="text-xs text-on-surface-variant leading-relaxed mt-3">
                {directive.description}
              </p>

              <div className="mt-5 pt-4 border-t border-surface-container-high/60 flex items-center justify-between">
                <span className="text-[11px] font-mono text-outline">
                  <strong className="text-white">Directive Action:</strong> {directive.keyAction}
                </span>
                <span className="material-symbols-outlined text-sm text-primary">arrow_forward</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seattle Cyber Cohort */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-surface-container-high">
          <div>
            <span className="text-xs font-mono text-secondary uppercase tracking-widest font-semibold">
              TACTICAL FIELD RECON
            </span>
            <h2 className="text-3xl font-black text-white font-display uppercase mt-1">
              Seattle Cyber Cohort
            </h2>
            <p className="text-xs sm:text-sm text-outline mt-1">
              The high-school researchers and ethical security leads reverse-engineering platform algorithms.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact-us')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-bright border border-outline-variant/30 text-xs font-mono font-bold text-white transition-all self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-sm">group_add</span>
            APPLY TO JOIN COHORT
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SEATTLE_COHORT.map((cadet, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-surface-container-low border border-surface-container-high hover:border-primary/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center font-display font-black text-lg text-primary shadow-inner">
                    {cadet.initials}
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono border font-semibold ${cadet.roleColor}`}>
                    {cadet.role}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mt-4">{cadet.name}</h3>
                <p className="text-[11px] font-mono text-outline">{cadet.school} • Age {cadet.age}</p>
                <p className="text-xs text-on-surface-variant mt-2 font-mono">
                  <strong className="text-white">Focus: </strong>{cadet.focus}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-container-high">
                <p className="text-[11px] italic text-outline leading-snug">
                  {cadet.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Youth Digital Bill of Rights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="rounded-3xl bg-gradient-to-br from-surface-container to-surface-container-lowest border border-primary/30 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
              THE SOVEREIGNTY PLEDGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display uppercase mt-2">
              Sign the Teen Digital Sovereignty Compact
            </h2>
            <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
              I pledge to protect my peers, audit predatory software, resist algorithmic doomscrolling loops, and demand that tech platforms treat teenagers as conscious humans—not behavioral metrics to be auctioned to advertisers.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  playCyberSound('success');
                  setManifestoPledge(!manifestoPledge);
                }}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-lg ${
                  manifestoPledge
                    ? 'bg-accent text-background shadow-accent/20'
                    : 'bg-primary text-background hover:bg-primary-hover shadow-primary/20'
                }`}
              >
                <span className="material-symbols-outlined text-lg">
                  {manifestoPledge ? 'verified' : 'edit_document'}
                </span>
                {manifestoPledge ? 'PLEDGE ACTIVE // COHORT REGISTERED' : 'CRYPTOGRAPHICALLY SIGN PLEDGE'}
              </button>

              <button
                onClick={() => onNavigate('legislation')}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-surface-container-high hover:bg-surface-container-bright border border-outline-variant/30 text-xs font-mono font-bold text-white transition-all"
              >
                <span className="material-symbols-outlined text-lg">policy</span>
                VIEW LEGISLATIVE TRACKER
              </button>
            </div>

            {manifestoPledge && (
              <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/30 text-accent text-xs font-mono flex items-center gap-2">
                <span className="material-symbols-outlined text-base">lock</span>
                Cryptographic signature stored locally: SHA256:{Math.random().toString(36).substring(2, 10)}...cadet. Welcome to the Seattle Collective.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
