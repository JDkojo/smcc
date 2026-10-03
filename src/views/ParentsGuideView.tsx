import React, { useState } from 'react';
import { PageId } from '../types.ts';
import { playCyberSound } from '../utils/audio.ts';

interface ParentsGuideViewProps {
  onNavigate: (page: PageId) => void;
  onOpenScanner: () => void;
}

const JARGON_TERMS = [
  {
    term: 'Ghost Mode',
    platform: 'Snapchat',
    riskLevel: 'Critical to Enable',
    definition: 'Setting that hides your teen\'s real-time physical GPS location on the interactive Snap Map.',
    parentAdvice: 'Never let teens keep this disabled for "everyone" or mutual friends. Predators use map clusters to identify local parks and school dismissal zones.'
  },
  {
    term: 'Sextortion Funnels',
    platform: 'Instagram / Discord / Wizz',
    riskLevel: 'Immediate Red Flag',
    definition: 'Coordinated criminal rings that pose as attractive peers, solicit compromising photos within hours, and immediately demand gift cards or crypto.',
    parentAdvice: 'Crucial: Never punish your teen if this happens. Attackers thrive on shame. Assure them immediately: "You are not in trouble, this is an organized crime syndicate."'
  },
  {
    term: 'Burner / Finsta',
    platform: 'Instagram / TikTok',
    riskLevel: 'Moderate Context',
    definition: 'Secondary or "fake" accounts reserved for close friends or venting, kept hidden from family members.',
    parentAdvice: 'Don\'t panic if they have one—it is often a defense mechanism against social perfectionism. Instead of banning it, agree on safety ground rules.'
  },
  {
    term: 'Nitro Scams & Drive-Bys',
    platform: 'Discord',
    riskLevel: 'High Cyber Vector',
    definition: 'Deceptive messages promising free Discord Nitro or game items that contain session token grabbers.',
    parentAdvice: 'Instruct your teen never to scan QR codes shown on untrusted screens or click links with slight misspellings (e.g., "discorcl-gift.ru").'
  },
  {
    term: 'Dwell Time Tracking',
    platform: 'TikTok / YouTube Shorts',
    riskLevel: 'Psychological Optimization',
    definition: 'The fraction of a second a user pauses on a video, used by algorithms to detect anxiety, depressive moods, or body dysphoria.',
    parentAdvice: 'Notice if your teen appears agitated after scrolling. Encourage taking algorithmic "palette cleansers" or resetting the recommendation cache.'
  }
];

const CONVERSATION_SCRIPTS = [
  {
    id: 'script-extortion',
    scenario: 'A teen comes forward about compromising photos or blackmail',
    wrongWay: '"Why on earth would you send that to a stranger?! You are losing your phone for a month."',
    tacticalWay: '"I love you and you are safe. You are the victim of a criminal scam, and you did the right thing by telling me. We will handle this together without giving them a single cent."',
    actionSteps: [
      'Do NOT pay any ransom or gift card demand (extortionists never delete photos).',
      'Take screenshots of the threats, user handles, and platform URLs before blocking.',
      'Report directly to TakeItDown.ncmec.org to create a hash of the image and prevent redistribution.',
      'File an anonymous report at CyberTipline (800-843-5678).'
    ]
  },
  {
    id: 'script-privacy',
    scenario: 'Negotiating parental controls vs spyware apps (Life360, Bark)',
    wrongWay: '"I pay for this phone so I have the right to read every single text and track your footsteps 24/7."',
    tacticalWay: '"I care about your physical and digital safety, not snooping on your friendships. Let\'s agree on hardware-level shields and check-in protocols that respect your privacy."',
    actionSteps: [
      'Invasive spyware pushes teens to buy second burner devices or side-load unvetted evasion apps.',
      'Agree on designated "charging docks" outside the bedroom during sleep hours.',
      'Prioritize teaching threat identification over invasive surveillance logs.'
    ]
  },
  {
    id: 'script-doomscroll',
    scenario: 'Noticing sleep deprivation and algorithmic fatigue',
    wrongWay: '"You\'re addicted to that screen! Hand it over right now!"',
    tacticalWay: '"These platforms employ thousands of PhD behavioral psychologists designed to trap our brains. I get sucked in too. Let\'s look at our screen analytics together and tweak our bedtime filters."',
    actionSteps: [
      'Set automated grayscale or black-and-white display filters at 9:00 PM to reduce dopamine triggers.',
      'Enable Wi-Fi router-level sleep schedules for non-essential entertainment servers.',
      'Schedule offline family activities without phone notifications.'
    ]
  }
];

export const ParentsGuideView: React.FC<ParentsGuideViewProps> = ({ onNavigate, onOpenScanner }) => {
  const [activeTab, setActiveTab] = useState<'scripts' | 'jargon' | 'contract'>('scripts');
  const [contractClauses, setContractClauses] = useState([
    { id: 'bedroom', text: 'Devices recharge outside bedrooms 30 minutes before sleep hours', agreed: true },
    { id: 'extortion', text: 'Zero punitive punishment for disclosing digital harassment or accidental scams', agreed: true },
    { id: 'spyware', text: 'No covert spyware or keyloggers installed without mutual consent', agreed: true },
    { id: 'rescue', text: 'A "No Questions Asked" code word for emergency ride home from unsafe situations', agreed: true },
    { id: 'dm_check', text: 'Teens agree to run unverified suspicious links through the SMC DM Scanner', agreed: true },
  ]);

  const toggleClause = (id: string) => {
    playCyberSound('toggle');
    setContractClauses(prev => prev.map(c => c.id === id ? { ...c, agreed: !c.agreed } : c));
  };

  const handlePrintContract = () => {
    playCyberSound('success');
    window.print();
  };

  return (
    <div className="min-h-screen pb-24 text-on-surface">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-14 pb-12 border-b border-surface-container-high bg-surface-container-lowest/80">
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-mono font-medium tracking-widest bg-accent/10 border border-accent/30 text-accent mb-4">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              GUARDIAN &amp; EDUCATOR INTERFACE
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-display">
              Bridge the Digital Divide
            </h1>
            <p className="mt-4 text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Moving past punitive "device confiscation" to tactical alliance. Arm yourself with real terminology, non-hostile de-escalation scripts, and collaborative safety compacts.
            </p>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="mt-8 flex items-center gap-2 border-b border-surface-container-high/60 pb-3">
            {[
              { id: 'scripts', label: 'Tactical Scripts', icon: 'forum' },
              { id: 'jargon', label: 'Jargon & Threat Decoder', icon: 'translate' },
              { id: 'contract', label: 'Family Digital Compact', icon: 'handshake' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  playCyberSound('click');
                  setActiveTab(tab.id as any);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-accent text-background font-bold shadow-lg shadow-accent/20'
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

      {/* Main Content Area based on Tab */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* TAB 1: SCRIPTS */}
        {activeTab === 'scripts' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <span className="text-xs font-mono text-accent uppercase tracking-widest font-semibold">
                COMMUNICATION MATRIX
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase mt-1">
                De-escalation &amp; Crisis Response Scripts
              </h2>
              <p className="text-xs sm:text-sm text-outline mt-1">
                How you respond in the first 60 seconds determines whether your teenager ever asks for your help again when threatened online.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {CONVERSATION_SCRIPTS.map(script => (
                <div
                  key={script.id}
                  className="rounded-2xl bg-surface-container-low border border-surface-container-high p-6 sm:p-8"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="p-2 rounded-lg bg-surface-container-high border border-outline-variant/30 text-accent">
                      <span className="material-symbols-outlined text-xl">contact_support</span>
                    </span>
                    <h3 className="text-lg font-bold text-white font-display">
                      Scenario: {script.scenario}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* The Punitive Way */}
                    <div className="p-4 rounded-xl bg-error/5 border border-error/20 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-error text-xs font-mono font-bold mb-2">
                          <span className="material-symbols-outlined text-sm">cancel</span>
                          PUNITIVE APPROACH (DRIVES SECRETIVENESS)
                        </div>
                        <p className="text-xs text-on-surface italic leading-relaxed">
                          {script.wrongWay}
                        </p>
                      </div>
                      <p className="text-[10px] font-mono text-outline mt-3">
                        Result: Teen deletes evidence, complies with blackmailer, and isolates.
                      </p>
                    </div>

                    {/* The Tactical Way */}
                    <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold mb-2">
                          <span className="material-symbols-outlined text-sm">check_circle</span>
                          TACTICAL PARTNERSHIP APPROACH
                        </div>
                        <p className="text-xs text-on-surface leading-relaxed">
                          {script.tacticalWay}
                        </p>
                      </div>
                      <p className="text-[10px] font-mono text-accent mt-3">
                        Result: Immediate threat de-escalation, evidence preservation, zero ransom paid.
                      </p>
                    </div>
                  </div>

                  {/* Immediate Action Steps */}
                  <div className="mt-5 pt-4 border-t border-surface-container-high">
                    <h4 className="text-xs font-mono uppercase text-white font-bold mb-2 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-primary">task_alt</span>
                      IMMEDIATE ACTION CHECKLIST
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-outline font-mono">
                      {script.actionSteps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-surface-container-high/40 p-2.5 rounded-lg border border-outline-variant/20">
                          <span className="text-primary font-bold">{idx + 1}.</span>
                          <span className="text-on-surface-variant">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: JARGON */}
        {activeTab === 'jargon' && (
          <div className="space-y-6">
            <div className="max-w-3xl">
              <span className="text-xs font-mono text-secondary uppercase tracking-widest font-semibold">
                VOCABULARY PROTOCOL
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase mt-1">
                Jargon &amp; Threat Vector Decoder
              </h2>
              <p className="text-xs sm:text-sm text-outline mt-1">
                Learn the actual terminology used in teen group chats, gaming lobbies, and predatory online vectors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {JARGON_TERMS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-surface-container-low border border-surface-container-high hover:border-secondary/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-white font-display">{item.term}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-warning/15 border border-warning/30 text-warning font-semibold">
                        {item.riskLevel}
                      </span>
                    </div>
                    <span className="inline-block text-[11px] font-mono text-secondary mb-3">
                      Platform: {item.platform}
                    </span>
                    <p className="text-xs text-on-surface leading-relaxed">
                      {item.definition}
                    </p>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-xs text-outline font-mono">
                    <strong className="text-accent">Guardian Strategy: </strong>
                    {item.parentAdvice}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CONTRACT */}
        {activeTab === 'contract' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center">
              <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
                MUTUAL ACCORD
              </span>
              <h2 className="text-3xl font-black text-white font-display uppercase mt-1">
                Family Digital Safety Compact
              </h2>
              <p className="text-xs sm:text-sm text-outline mt-1">
                A non-punitive, bilateral agreement between parents and teenagers. Both sides sign and commit to mutual privacy and safety.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-low border border-primary/30 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-surface-container-high mb-6">
                <div>
                  <span className="text-[10px] font-mono text-primary tracking-widest">DOC REF: SMC-COMPACT-2026</span>
                  <h3 className="text-lg font-bold text-white uppercase font-display">Bilateral Safety Agreement</h3>
                </div>
                <button
                  onClick={handlePrintContract}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-bright border border-outline-variant/30 text-xs font-mono font-bold text-white transition-all"
                >
                  <span className="material-symbols-outlined text-sm">print</span>
                  PRINT / PDF
                </button>
              </div>

              <div className="space-y-3">
                {contractClauses.map(clause => (
                  <div
                    key={clause.id}
                    onClick={() => toggleClause(clause.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      clause.agreed
                        ? 'bg-primary/5 border-primary/40 text-white'
                        : 'bg-surface-container-lowest border-outline-variant/30 text-outline opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-lg ${clause.agreed ? 'text-primary' : 'text-outline'}`}>
                        {clause.agreed ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                      <span className="text-xs font-mono leading-relaxed">{clause.text}</span>
                    </div>
                    <span className="text-[10px] font-mono text-outline uppercase shrink-0">
                      {clause.agreed ? 'COMMITTED' : 'EXCLUDED'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Signatures Mock */}
              <div className="mt-8 pt-6 border-t border-surface-container-high grid grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-surface-container-lowest border border-dashed border-outline-variant/40 text-center">
                  <span className="text-[10px] font-mono text-outline uppercase block mb-6">Teen Signature</span>
                  <div className="h-0.5 bg-outline-variant/50 w-3/4 mx-auto mb-2" />
                  <span className="text-xs font-mono text-white">Seattle Cadet (Signed)</span>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-lowest border border-dashed border-outline-variant/40 text-center">
                  <span className="text-[10px] font-mono text-outline uppercase block mb-6">Guardian Signature</span>
                  <div className="h-0.5 bg-outline-variant/50 w-3/4 mx-auto mb-2" />
                  <span className="text-xs font-mono text-white">Guardian / Educator (Signed)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Hotline Directory */}
        <div className="mt-14 p-6 rounded-2xl bg-surface-container-high/40 border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="w-12 h-12 rounded-xl bg-error/20 border border-error/30 flex items-center justify-center text-error shrink-0">
              <span className="material-symbols-outlined text-2xl">emergency</span>
            </span>
            <div>
              <h4 className="text-sm font-bold text-white font-display">Immediate Emergency &amp; Crisis Resources</h4>
              <p className="text-xs text-outline mt-0.5">Free, 24/7 confidential crisis hotlines for teens and families under acute threat.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:988"
              className="px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-xs font-mono text-white hover:border-error transition-all"
            >
              988 Suicide &amp; Crisis Lifeline
            </a>
            <a
              href="sms:741741"
              className="px-3.5 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 text-xs font-mono text-white hover:border-primary transition-all"
            >
              Crisis Text Line: Text HOME to 741741
            </a>
            <a
              href="https://takeitdown.ncmec.org"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-error/15 border border-error/40 text-xs font-mono text-error hover:bg-error/25 transition-all"
            >
              TakeItDown (NCMEC)
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
