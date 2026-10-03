import React, { useState } from 'react';
import { LegislativeBill, PageId } from '../types.ts';
import { playCyberSound } from '../utils/audio.ts';

interface LegislationViewProps {
  onNavigate: (page: PageId) => void;
  onOpenScanner: () => void;
}

const BILLS: LegislativeBill[] = [
  {
    id: 'kosa',
    jurisdiction: 'US Federal Senate',
    mandateStatus: 'Active Floor Review',
    mandateColor: 'text-warning border-warning/40 bg-warning/10',
    title: 'Kids Online Safety Act (KOSA)',
    subTitle: 'Duty of care mandate on algorithmic design & parental dashboards',
    description: 'Imposes a legal duty of care on platforms to mitigate psychological distress, self-harm, eating disorders, and substance abuse promotion in minors under 17.',
    provisions: [
      { title: 'Duty of Care', text: 'Platforms must prevent and mitigate algorithmic amplification of suicide, depression, and harassment.', icon: 'gavel', color: 'text-warning' },
      { title: 'Default High Privacy', text: 'Platforms must turn on strictest privacy settings by default for minors under 17.', icon: 'lock', color: 'text-primary' },
      { title: 'Auditing Independent Data', text: 'Requires platforms to allow academic researchers access to internal behavioral data.', icon: 'analytics', color: 'text-secondary' },
      { title: 'Enforcement Risks', text: 'Civil liberties groups warn state attorneys general could weaponize duty-of-care against LGBTQ+ or health info.', icon: 'warning', color: 'text-error' }
    ],
    target: 'Social media networks with >10M monthly active users',
    actionText: 'Demand privacy-by-default safeguards without content censorship loopholes.',
    category: 'age-code'
  },
  {
    id: 'coppa2',
    jurisdiction: 'US Federal FTC',
    mandateStatus: 'Bipartisan Push',
    mandateColor: 'text-primary border-primary/40 bg-primary/10',
    title: 'COPPA 2.0 (Children & Teens\' Online Privacy)',
    subTitle: 'Extending zero-tracking protections from age 12 to 16',
    description: 'Modernizes the 1998 Children\'s Online Privacy Protection Act. Explicitly outlaws surveillance advertising targeting teenagers 13 through 16 and institutes an "Eraser Button".',
    provisions: [
      { title: 'Ad Tracking Outlawed', text: 'Prohibits behavioral ad targeting toward youth under 17 without affirmative consent.', icon: 'block', color: 'text-error' },
      { title: 'Digital Eraser Button', text: 'Gives minors and parents the enforceable legal right to delete personal data on demand.', icon: 'delete_forever', color: 'text-accent' },
      { title: 'Constructive Knowledge', text: 'Replaces actual knowledge loophole with constructive knowledge standards.', icon: 'visibility', color: 'text-primary' }
    ],
    target: 'All commercial web services, mobile apps, and ad-tech aggregators',
    actionText: 'Support full passage to end teen behavioral ad auctions.',
    category: 'data-protection'
  },
  {
    id: 'wa-privacy',
    jurisdiction: 'Washington State (Olympia)',
    mandateStatus: 'Enacted & Enforcing',
    mandateColor: 'text-accent border-accent/40 bg-accent/10',
    title: 'WA My Health My Data Act & Youth Safeguards',
    subTitle: 'Nation\'s strongest consumer biometric & reproductive geofencing shield',
    description: 'Strictly bans geofencing around healthcare facilities, counseling centers, and school wellness clinics. Forbids commercial sale of teen health and search logs.',
    provisions: [
      { title: 'Geofencing Prohibition', text: 'Criminalizes establishing virtual perimeters to track youth visiting health or crisis centers.', icon: 'location_off', color: 'text-accent' },
      { title: 'Private Right of Action', text: 'Allows consumers to directly sue companies that illegally sell or harvest health telemetry.', icon: 'balance', color: 'text-primary' },
      { title: 'Biometric Consent', text: 'Explicit written opt-in required prior to collecting voiceprints or facial geometry.', icon: 'fingerprint', color: 'text-secondary' }
    ],
    target: 'Data brokers, mobile advertising SDKs, health apps',
    actionText: 'Model legislation for teen health confidentiality nationwide.',
    category: 'data-protection'
  },
  {
    id: 'eu-dsa',
    jurisdiction: 'European Union (Brussels)',
    mandateStatus: 'Enacted & Enforced',
    mandateColor: 'text-secondary border-secondary/40 bg-secondary/10',
    title: 'EU Digital Services Act (DSA Article 28)',
    subTitle: 'Strict ban on profiling minors for behavioral ad placement',
    description: 'Very Large Online Platforms (VLOPs) like TikTok, Instagram, and YouTube cannot present advertising based on profiling using personal data of minors.',
    provisions: [
      { title: 'No Minor Profiling', text: 'Algorithms cannot serve targeted ads using minors\' sensitive behavioral data.', icon: 'person_off', color: 'text-secondary' },
      { title: 'Algorithmic Audits', text: 'Independent third-party audits of recommendation system systemic risks.', icon: 'fact_check', color: 'text-primary' },
      { title: 'Dark Pattern Ban', text: 'Deceptive cancellation flows and countdown timers are strictly prohibited.', icon: 'psychology_alt', color: 'text-warning' }
    ],
    target: 'Tech platforms with >45M users in the European Union',
    actionText: 'Gold standard framework for algorithmic accountability.',
    category: 'intl'
  }
];

export const LegislationView: React.FC<LegislationViewProps> = ({ onNavigate, onOpenScanner }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBill, setSelectedBill] = useState<LegislativeBill>(BILLS[0]);

  const filteredBills = BILLS.filter(b => selectedCategory === 'all' || b.category === selectedCategory);

  return (
    <div className="min-h-screen pb-24 text-on-surface">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-14 pb-12 border-b border-surface-container-high bg-surface-container-lowest/80">
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-mono font-medium tracking-widest bg-secondary/10 border border-secondary/30 text-secondary mb-4">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              POLICY RECON // JURISDICTION INTELLIGENCE
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-display">
              Digital Rights &amp; Legal Shields
            </h1>
            <p className="mt-4 text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Tracking state, federal, and global privacy statutes. We dissect the difference between genuine privacy protections and surveillance masquerading as child safety.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-surface-container-high/60">
            {[
              { id: 'all', label: 'All Bills & Statutes', icon: 'gavel' },
              { id: 'data-protection', label: 'Data Protection & Tracking', icon: 'shield' },
              { id: 'age-code', label: 'Age Codes & Duty of Care', icon: 'child_care' },
              { id: 'intl', label: 'Global Treaties (EU/UK)', icon: 'public' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  playCyberSound('click');
                  setSelectedCategory(tab.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-secondary text-background font-bold shadow-lg shadow-secondary/20'
                    : 'bg-surface-container-high/60 text-outline hover:text-white hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined text-base">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Bills List */}
          <div className="lg:col-span-7 space-y-4">
            {filteredBills.map(bill => {
              const isSelected = selectedBill.id === bill.id;
              return (
                <div
                  key={bill.id}
                  onClick={() => {
                    playCyberSound('click');
                    setSelectedBill(bill);
                  }}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'bg-surface-container-high/90 border-secondary ring-1 ring-secondary/40 shadow-xl shadow-secondary/5'
                      : 'bg-surface-container-low border-surface-container-high hover:border-outline-variant hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-outline uppercase font-semibold">
                          {bill.jurisdiction}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border font-bold ${bill.mandateColor}`}>
                          {bill.mandateStatus}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-secondary transition-colors font-display mt-1">
                        {bill.title}
                      </h3>
                      <p className="text-xs font-mono text-on-surface-variant mt-1">
                        {bill.subTitle}
                      </p>
                    </div>

                    <span className="material-symbols-outlined text-outline group-hover:text-secondary group-hover:translate-x-1 transition-all">
                      arrow_forward
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-outline leading-relaxed line-clamp-2">
                    {bill.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-surface-container-high/40 flex items-center justify-between text-xs font-mono">
                    <span className="text-outline">
                      Target: <strong className="text-white">{bill.target}</strong>
                    </span>
                    <span className="text-secondary font-semibold">
                      {bill.provisions.length} Core Provisions
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Bill Inspector */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl bg-surface-container-low border border-secondary/30 p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-primary to-accent" />

              <div className="pb-4 border-b border-surface-container-high">
                <span className="text-[10px] font-mono text-secondary tracking-widest uppercase font-bold">
                  STATUTORY RECON DOSSIER
                </span>
                <h2 className="text-2xl font-black text-white font-display mt-1">{selectedBill.title}</h2>
                <p className="text-xs font-mono text-outline mt-0.5">{selectedBill.jurisdiction} • {selectedBill.mandateStatus}</p>
              </div>

              <div className="mt-4">
                <h4 className="text-xs font-mono uppercase text-outline font-semibold mb-1">Executive Summary</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {selectedBill.description}
                </p>
              </div>

              {/* Provisions List */}
              <div className="mt-6">
                <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider mb-3 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-secondary">verified</span>
                  KEY STATUTORY PROVISIONS
                </h4>

                <div className="space-y-2.5">
                  {selectedBill.provisions.map((prov, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-surface-container-high/40 border border-outline-variant/30 flex items-start gap-3"
                    >
                      <span className={`material-symbols-outlined text-lg mt-0.5 ${prov.color}`}>
                        {prov.icon}
                      </span>
                      <div>
                        <h5 className="text-xs font-mono font-bold text-white">{prov.title}</h5>
                        <p className="text-[11px] text-outline mt-0.5 leading-snug">{prov.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Youth Tactical Stance */}
              <div className="mt-6 p-4 rounded-xl bg-secondary/10 border border-secondary/30">
                <div className="flex items-center gap-2 text-xs font-mono text-secondary font-bold mb-1">
                  <span className="material-symbols-outlined text-sm">campaign</span>
                  SMC YOUTH POSITION &amp; CALL TO ACTION
                </div>
                <p className="text-xs text-on-surface leading-relaxed">
                  {selectedBill.actionText}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => onNavigate('contact-us')}
                  className="flex-1 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-bright border border-outline-variant/30 text-xs font-mono font-bold text-white transition-all text-center"
                >
                  SUBMIT TESTIMONY
                </button>
                <button
                  onClick={() => onNavigate('information')}
                  className="flex-1 py-2.5 rounded-lg bg-secondary text-background font-mono text-xs font-bold uppercase tracking-wider hover:bg-secondary/90 transition-all text-center"
                >
                  VIEW DIRECTIVES
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
