import React, { useState } from 'react';
import { PageId } from '../types.ts';
import { playCyberSound } from '../utils/audio.ts';

interface ContactViewProps {
  onNavigate: (page: PageId) => void;
  onOpenScanner: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate, onOpenScanner }) => {
  const [reportType, setReportType] = useState('sextortion');
  const [platform, setPlatform] = useState('instagram');
  const [urgency, setUrgency] = useState('high');
  const [details, setDetails] = useState('');
  const [contactHandle, setContactHandle] = useState('');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [submittedHash, setSubmittedHash] = useState<string | null>(null);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;

    playCyberSound('glitch');
    setIsTransmitting(true);

    setTimeout(() => {
      playCyberSound('success');
      setIsTransmitting(false);
      const generatedHash = `SMC-SEC-${Math.random().toString(36).substring(2, 9).toUpperCase()}-${Date.now().toString().slice(-4)}`;
      setSubmittedHash(generatedHash);
    }, 1500);
  };

  const handleReset = () => {
    setSubmittedHash(null);
    setDetails('');
    setContactHandle('');
  };

  return (
    <div className="min-h-screen pb-24 text-on-surface">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-14 pb-12 border-b border-surface-container-high bg-surface-container-lowest/80">
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-mono font-medium tracking-widest bg-error/10 border border-error/30 text-error mb-4">
              <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
              ENCRYPTED DISPATCH // ZERO-KNOWLEDGE COMMS
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-display">
              Incident Response &amp; Encrypted Comms
            </h1>
            <p className="mt-4 text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Facing an active extortion threat, doxxing attempt, or discovered a predatory vulnerability? Transmit an encrypted report directly to the Seattle Cyber Cohort triage unit.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Encrypted Form & Emergency Hotlines */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Encrypted Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-surface-container-low border border-primary/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-error to-secondary" />

              {submittedHash ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/40 text-accent flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-3xl">verified</span>
                  </div>
                  <h3 className="text-2xl font-black text-white font-display uppercase">
                    Encrypted Payload Received
                  </h3>
                  <p className="text-xs font-mono text-outline max-w-md mx-auto">
                    Your transmission has been encrypted with our cohort public key and queued for immediate human triage.
                  </p>
                  <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 font-mono text-xs text-primary">
                    TRACKING TOKEN: {submittedHash}
                  </div>
                  <p className="text-[11px] text-on-surface-variant font-mono">
                    If this is a physical safety emergency, please dial 911 or call 988 immediately.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-bright border border-outline-variant/30 text-xs font-mono font-bold text-white transition-all"
                    >
                      FILE ANOTHER REPORT
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitReport} className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
                    <span className="text-xs font-mono text-primary font-bold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base">lock</span>
                      END-TO-END CLIENT ENCRYPTED (PGP-4096)
                    </span>
                    <span className="text-[10px] font-mono text-outline">ZERO IP LOGGED</span>
                  </div>

                  {/* Incident Vector Selector */}
                  <div>
                    <label className="block text-xs font-mono text-white font-bold uppercase mb-2">
                      Incident Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'sextortion', label: 'Sextortion / Blackmail' },
                        { id: 'doxxing', label: 'Doxxing / Swatting Threat' },
                        { id: 'phishing', label: 'Malicious Link / Scam' },
                        { id: 'stalking', label: 'Persistent Stalking' },
                        { id: 'token_hijack', label: 'Discord / Account Hijack' },
                        { id: 'other', label: 'Other Cyber Incident' },
                      ].map(type => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => {
                            playCyberSound('click');
                            setReportType(type.id);
                          }}
                          className={`p-2.5 rounded-lg text-[11px] font-mono border text-left transition-all ${
                            reportType === type.id
                              ? 'bg-primary/20 border-primary text-primary font-bold'
                              : 'bg-surface-container-high/40 border-outline-variant/20 text-outline hover:text-white'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Platform & Urgency */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white font-bold uppercase mb-1">
                        Platform Involved
                      </label>
                      <select
                        value={platform}
                        onChange={e => setPlatform(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-lg p-2.5 text-xs font-mono text-white focus:border-primary focus:outline-none"
                      >
                        <option value="instagram">Instagram / Threads</option>
                        <option value="snapchat">Snapchat</option>
                        <option value="discord">Discord</option>
                        <option value="tiktok">TikTok</option>
                        <option value="roblox">Roblox</option>
                        <option value="telegram">Telegram</option>
                        <option value="imessage">iMessage / SMS</option>
                        <option value="other">Other Platform</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white font-bold uppercase mb-1">
                        Urgency Level
                      </label>
                      <select
                        value={urgency}
                        onChange={e => setUrgency(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-lg p-2.5 text-xs font-mono text-white focus:border-primary focus:outline-none"
                      >
                        <option value="high">Critical (Active extortion / hours count)</option>
                        <option value="medium">Elevated (Harassment in progress)</option>
                        <option value="low">Intel Report (Suspicious link or bot)</option>
                      </select>
                    </div>
                  </div>

                  {/* Incident Description */}
                  <div>
                    <label className="block text-xs font-mono text-white font-bold uppercase mb-1">
                      Incident Description &amp; Attacker Handles (Sanitized)
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={details}
                      onChange={e => setDetails(e.target.value)}
                      placeholder="Do not paste raw passwords. Describe what the attacker is demanding, their usernames, and what links they sent..."
                      className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-lg p-3 text-xs font-mono text-white placeholder-outline focus:border-primary focus:outline-none resize-none"
                    />
                  </div>

                  {/* Optional Contact Handle */}
                  <div>
                    <label className="block text-xs font-mono text-white font-bold uppercase mb-1">
                      Optional Contact for Cohort Response (Signal / Proton / Discord)
                    </label>
                    <input
                      type="text"
                      value={contactHandle}
                      onChange={e => setContactHandle(e.target.value)}
                      placeholder="Leave blank for 100% anonymous report, or enter @handle"
                      className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-lg p-2.5 text-xs font-mono text-white placeholder-outline focus:border-primary focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isTransmitting}
                      className="w-full py-3.5 rounded-xl bg-primary text-background font-mono text-xs font-black uppercase tracking-wider hover:bg-primary-hover transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
                    >
                      {isTransmitting ? (
                        <>
                          <span className="material-symbols-outlined text-base animate-spin">refresh</span>
                          ENCRYPTING &amp; DISPATCHING...
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-base">send</span>
                          TRANSMIT ENCRYPTED DISPATCH
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Seattle Cohort Ops & PGP Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* PGP Key Card */}
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30">
              <div className="flex items-center gap-2 text-xs font-mono text-secondary font-bold mb-3">
                <span className="material-symbols-outlined text-base">key</span>
                SMC PUBLIC PGP FINGERPRINT
              </div>
              <div className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/20 font-mono text-[11px] text-outline break-all">
                4B91 78F2 C004 9EE1 3829 0081 DA19 82F1 990B E23C
              </div>
              <p className="text-xs text-outline mt-3 leading-relaxed">
                For independent security disclosures, send encrypted mail to <strong className="text-white">intel@matrixcollective.internal</strong> using our public key.
              </p>
            </div>

            {/* Direct Youth Crisis Lines */}
            <div className="p-6 rounded-2xl bg-surface-container-low border border-error/30">
              <div className="flex items-center gap-2 text-xs font-mono text-error font-bold mb-2">
                <span className="material-symbols-outlined text-base">emergency</span>
                CRISIS INTERVENTION DIRECTORY
              </div>
              <p className="text-xs text-outline mb-4">
                These services are free, confidential, and run by certified crisis counselors:
              </p>
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between">
                  <span className="text-white font-semibold">988 Suicide &amp; Crisis Lifeline</span>
                  <a href="tel:988" className="text-primary hover:underline font-bold">Call/Text 988</a>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between">
                  <span className="text-white font-semibold">Crisis Text Line</span>
                  <a href="sms:741741" className="text-secondary hover:underline font-bold">Text HOME to 741741</a>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between">
                  <span className="text-white font-semibold">Take It Down (NCMEC)</span>
                  <a href="https://takeitdown.ncmec.org" target="_blank" rel="noopener noreferrer" className="text-error hover:underline font-bold">takeitdown.ncmec.org</a>
                </div>
              </div>
            </div>

            {/* Seattle Hub Location info */}
            <div className="p-6 rounded-2xl bg-surface-container-low border border-surface-container-high">
              <span className="text-[10px] font-mono text-outline uppercase tracking-wider">REGIONAL COHORT HUB</span>
              <h4 className="text-base font-bold text-white font-display mt-1">Seattle Matrix Collective Lab</h4>
              <p className="text-xs text-outline mt-1 font-mono">
                Capitol Hill / Garfield Innovation Annex<br />
                Seattle, WA 98122
              </p>
              <div className="mt-4 pt-3 border-t border-surface-container-high text-[11px] font-mono text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">wifi_tethering</span>
                Mesh Network Active // Node ID: SEA-081-ALPHA
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
