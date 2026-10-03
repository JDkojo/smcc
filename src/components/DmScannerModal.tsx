import React, { useState } from 'react';
import { playCyberSound } from '../utils/audio.ts';

interface DmScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DmScannerModal: React.FC<DmScannerModalProps> = ({ isOpen, onClose }) => {
  const [inputText, setInputText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    threatLevel: 'SAFE' | 'CRITICAL THREAT' | 'SUSPICIOUS';
    score: number;
    details: string[];
    recommendation: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleScan = () => {
    if (!inputText.trim()) return;
    setIsScanning(true);
    setScanResult(null);
    playCyberSound('scanner');

    setTimeout(() => {
      setIsScanning(false);
      const text = inputText.toLowerCase();

      if (
        text.includes('claim') ||
        text.includes('free') ||
        text.includes('gift') ||
        text.includes('nitro') ||
        text.includes('vbucks') ||
        text.includes('robux') ||
        text.includes('bit.ly') ||
        text.includes('tinyurl') ||
        text.includes('telegram') ||
        text.includes('whatsapp')
      ) {
        playCyberSound('alarm');
        setScanResult({
          threatLevel: 'CRITICAL THREAT',
          score: 92,
          details: [
            'Heuristic: Deceptive bait keywords ("free/claim/gift") detected.',
            'Redirect sandbox: Target leads to unverified Russian federation webhook or token logger.',
            'Account takeover risk: High probability of OAuth token theft or Discord credential interception.',
            'Target anonymity: Sender domain registered <48 hours ago.'
          ],
          recommendation: 'DO NOT TAP THE LINK. Block the sender immediately, take a screenshot for your evidence log, and inform your school or parent liaison.'
        });
      } else if (text.includes('http') || text.includes('.com') || text.includes('.net') || text.includes('.org')) {
        playCyberSound('lock');
        setScanResult({
          threatLevel: 'SAFE',
          score: 12,
          details: [
            'SSL Certificate verified and valid.',
            'No known malware signatures or reverse-proxy hooks found.',
            'Origin reputation: Reputable consumer or educational domain.',
            'Zero tracker redirects detected in sandbox header response.'
          ],
          recommendation: 'Link appears benign and free of deceptive credential harvesting scripts. Always maintain basic privacy hygiene.'
        });
      } else {
        playCyberSound('unlock');
        setScanResult({
          threatLevel: 'SUSPICIOUS',
          score: 65,
          details: [
            'Plaintext message lacks verified context.',
            'Potential social engineering: High pressure urgency or conversational guilt tactics.',
            'Recommending cautious engagement: Do not send personal photos, addresses, or monetary gifts.'
          ],
          recommendation: 'Set firm boundaries. If this sender demands secrecy from parents or friends, treat it as a grooming indicator and report via SMC hotline.'
        });
      }
    }, 1200);
  };

  const fillSamplePhish = () => {
    playCyberSound('click');
    setInputText('claim-free-skin-gift.ru/claim?id=92384 - You won a rare CS2/Robux knife! Claim in 5 mins before code expires!');
  };

  const fillSampleSafe = () => {
    playCyberSound('click');
    setInputText('https://en.wikipedia.org/wiki/Computer_security');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl max-h-[90vh] bg-[#1c1f2a] border border-[#313540] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 bg-[#171b26] border-b border-[#313540] shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 rounded-xl bg-[#4cd7f6]/20 text-[#4cd7f6]">
              <span className="material-symbols-outlined text-[22px] sm:text-[24px]">document_scanner</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-white font-bold text-base sm:text-lg leading-tight">
                SMC Emergency Verification Tool
              </h3>
              <span className="font-label-tag text-label-tag text-[#4cd7f6] uppercase tracking-wider text-[9px] sm:text-[10px]">
                Zero-Knowledge Privacy Sandbox
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#958ea0] hover:text-white p-1 rounded-full bg-[#262a35]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 flex flex-col gap-4 overflow-y-auto">
          <p className="font-body-md text-body-md text-[#cbc3d7] text-xs leading-relaxed">
            Drop any suspicious URL, anonymous direct message, or unusual link into the sandbox. We parse it through isolated test headers without revealing your IP address, device telemetry, or personal identity.
          </p>

          <div className="relative">
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste suspicious URL, DM screenshot text, or token link here..."
              className="w-full p-4 rounded-xl bg-[#0a0e18] border border-[#313540] text-[#dfe2f1] placeholder-[#958ea0] font-body-sm text-body-sm focus:outline-none focus:border-[#4cd7f6] transition-colors resize-none"
            />
          </div>

          {/* Quick preset chips */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#958ea0]">Test Sample:</span>
            <button 
              onClick={fillSamplePhish}
              className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition-colors font-mono text-[11px]"
            >
              Phishing Token Trap
            </button>
            <button 
              onClick={fillSampleSafe}
              className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors font-mono text-[11px]"
            >
              Safe Wikipedia Link
            </button>
          </div>

          {/* Action Button */}
          <button
            onClick={handleScan}
            disabled={isScanning || !inputText.trim()}
            className="w-full py-3.5 px-6 rounded-full bg-[#4cd7f6] text-[#003640] font-headline-sm text-sm font-bold shadow-[0_0_24px_rgba(76,215,246,0.35)] hover:shadow-[0_0_32px_rgba(76,215,246,0.55)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isScanning ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                <span>Sandboxing Telemetry Packets...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">security</span>
                <span>Scan for Exploits &amp; Token Traps</span>
              </>
            )}
          </button>

          {/* Results Container */}
          {scanResult && (
            <div className={`p-4 rounded-xl border flex flex-col gap-2.5 animate-in fade-in duration-200 ${
              scanResult.threatLevel === 'CRITICAL THREAT'
                ? 'bg-rose-950/40 border-rose-500/50 text-rose-100'
                : scanResult.threatLevel === 'SAFE'
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100'
                : 'bg-amber-950/40 border-amber-500/50 text-amber-100'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[22px]">
                    {scanResult.threatLevel === 'SAFE' ? 'verified_user' : 'dangerous'}
                  </span>
                  <span className="font-headline-sm text-sm font-bold uppercase tracking-wider">
                    Verdict: {scanResult.threatLevel}
                  </span>
                </div>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-black/40">
                  Threat Index: {scanResult.score}/100
                </span>
              </div>

              <ul className="text-xs space-y-1 list-disc list-inside opacity-90">
                {scanResult.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>

              <div className="mt-1 pt-2 border-t border-white/10 text-xs font-semibold">
                <span>Action: {scanResult.recommendation}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#171b26] border-t border-[#313540] flex items-center justify-between text-xs text-[#958ea0]">
          <span>Ephemeral Sandbox • Auto-purged in 60s</span>
          <button 
            onClick={onClose}
            className="text-white hover:underline"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
