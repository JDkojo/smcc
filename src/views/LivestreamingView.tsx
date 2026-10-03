import React, { useState } from 'react';
import { PageId } from '../types.ts';
import { playCyberSound } from '../utils/audio.ts';

interface LivestreamingViewProps {
  onNavigate: (page: PageId) => void;
  onOpenScanner: () => void;
}

const AMBIENT_VECTORS = [
  {
    vector: 'Window & Skylight Reflection',
    risk: 'High Geolocation Leak',
    description: 'Sunlight angles and tree branch silhouettes allow OSINT investigators to triangulate neighborhood and floor level within minutes.',
    counterMeasure: 'Use opaque blackout curtains or directional RGB panels.'
  },
  {
    vector: 'Mail, School Merch & Sports Gear',
    risk: 'Direct School/Town Exposure',
    description: 'School athletic hoodies, localized tournament trophies, or discarded Amazon packages on desks expose zip codes immediately.',
    counterMeasure: 'Maintain a sterile 3-meter camera backdrop or clean chroma green-screen.'
  },
  {
    vector: 'Microphone Acoustic Spill',
    risk: 'Acoustic Triangulation',
    description: 'Sirens, train whistles, commuter flight paths, or local church bells can pinpoint geographical coordinates.',
    counterMeasure: 'Use directional dynamic microphones with steep noise gates (RTX Voice / Krisp).'
  },
  {
    vector: 'Dual Monitor Screen Bleed',
    risk: 'Credential & Discord Dox',
    description: 'Accidentally dragging Discord, email notifications, or steam gift codes onto the active broadcast capture screen.',
    counterMeasure: 'Configure Window Capture instead of Display Capture in OBS / Twitch Studio.'
  }
];

export const LivestreamingView: React.FC<LivestreamingViewProps> = ({ onNavigate, onOpenScanner }) => {
  const [killswitchEngaged, setKillswitchEngaged] = useState(false);
  const [checklist, setChecklist] = useState([
    { id: 'display_cap', text: 'Display capture disabled; only direct game/window capture enabled', completed: true },
    { id: 'stream_delay', text: '60-second broadcast latency buffer configured in OBS/Twitch', completed: true },
    { id: 'notifs_off', text: 'Windows/macOS "Focus Assist" activated to suppress popup toasts', completed: true },
    { id: 'mod_auto', text: 'Automatrix AutoMod & banned word dictionary loaded in chat', completed: false },
    { id: 'geo_metadata', text: 'Location tag deleted from stream title and broadcast tags', completed: true },
    { id: 'swat_precaution', text: 'Address pre-notified on local dispatch non-emergency swat registry', completed: false }
  ]);

  const toggleCheck = (id: string) => {
    playCyberSound('toggle');
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const handleTriggerKillswitch = () => {
    if (!killswitchEngaged) {
      playCyberSound('alarm');
      setKillswitchEngaged(true);
    } else {
      playCyberSound('success');
      setKillswitchEngaged(false);
    }
  };

  return (
    <div className="min-h-screen pb-24 text-on-surface">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-14 pb-12 border-b border-surface-container-high bg-surface-container-lowest/80">
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-mono font-medium tracking-widest bg-error/10 border border-error/30 text-error mb-4">
                <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
                BROADCAST COUNTER-SURVEILLANCE
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-display">
                Real-Time Broadcast Defense
              </h1>
              <p className="mt-4 text-base text-on-surface-variant leading-relaxed">
                Stream sniping, accidental doxxing, swatting, and ambient metadata leaks threaten teen creators daily. Arm your OBS workspace with hard stop barriers.
              </p>
            </div>

            {/* Emergency Killswitch Simulator */}
            <div className="p-6 rounded-2xl bg-surface-container-low border border-error/40 flex flex-col items-center text-center max-w-sm">
              <span className="text-[10px] font-mono text-error uppercase font-bold tracking-widest mb-2">
                BROADCAST EMERGENCY PROTOCOL
              </span>
              <button
                onClick={handleTriggerKillswitch}
                className={`w-36 h-36 rounded-full font-black text-sm tracking-wider font-mono uppercase transition-all shadow-2xl flex flex-col items-center justify-center gap-1 border-4 ${
                  killswitchEngaged
                    ? 'bg-error border-error-container text-white shadow-error/40 animate-pulse'
                    : 'bg-error/20 border-error/50 text-error hover:bg-error hover:text-white hover:border-error'
                }`}
              >
                <span className="material-symbols-outlined text-4xl">
                  {killswitchEngaged ? 'lock' : 'power_settings_new'}
                </span>
                <span>{killswitchEngaged ? 'FEED KILLED' : 'KILL SWITCH'}</span>
              </button>
              <p className="text-[11px] font-mono text-outline mt-3">
                {killswitchEngaged
                  ? 'Black screen engaged. Audio muted. IP relay decoupled.'
                  : 'Click to test instant blackout hotkey simulation.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Ambient Leak Radar & Pre-Flight Checklist */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Ambient Vector Shields */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-mono text-warning uppercase tracking-widest font-semibold">
                OSINT STERILIZATION
              </span>
              <h2 className="text-2xl font-black text-white font-display uppercase mt-1">
                Ambient Environmental Leak Radar
              </h2>
              <p className="text-xs sm:text-sm text-outline mt-1">
                Adversaries don't need your IP address if your streaming background gives away your high school mascot or window geometry.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AMBIENT_VECTORS.map((v, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-surface-container-low border border-surface-container-high hover:border-warning/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-sm font-bold text-white font-display">{v.vector}</h3>
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-error/15 border border-error/30 text-error font-semibold">
                        {v.risk}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface leading-relaxed mt-2">
                      {v.description}
                    </p>
                  </div>

                  <div className="mt-4 p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-[11px] font-mono text-warning">
                    <strong className="text-white">Counter-measure: </strong>
                    {v.counterMeasure}
                  </div>
                </div>
              ))}
            </div>

            {/* Anti-Swatting Tactical Protocol */}
            <div className="p-6 rounded-2xl bg-surface-container-low border border-primary/30">
              <div className="flex items-center gap-3 mb-3">
                <span className="p-2 rounded-lg bg-primary/20 text-primary">
                  <span className="material-symbols-outlined text-xl">shield_person</span>
                </span>
                <div>
                  <h3 className="text-base font-bold text-white font-display uppercase">Anti-Swatting Dispatch Protocol</h3>
                  <span className="text-[10px] font-mono text-outline">PACIFIC NORTHWEST LAW ENFORCEMENT DIRECTIVE</span>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                If you stream to more than 50 concurrent viewers, malicious trolls may place fraudulent hostage calls to local 911 dispatch. Call your municipal police department non-emergency line and request to be placed on the <strong className="text-primary">Anti-Swatting Verification Registry</strong>. Dispatch will flag your address so patrol officers verify before deploying tactical units.
              </p>
            </div>
          </div>

          {/* Right Column: Pre-Flight Checklist */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl bg-surface-container-low border border-outline-variant/30 p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
                <div>
                  <span className="text-[10px] font-mono text-secondary tracking-widest uppercase font-bold">
                    PRE-FLIGHT HARDENING
                  </span>
                  <h3 className="text-xl font-black text-white font-display uppercase mt-1">Live Safety Checklist</h3>
                </div>
                <span className="text-xs font-mono font-bold text-primary">
                  {checklist.filter(c => c.completed).length}/{checklist.length} SECURED
                </span>
              </div>

              <div className="mt-4 space-y-2.5">
                {checklist.map(item => (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      item.completed
                        ? 'bg-primary/5 border-primary/40 text-white'
                        : 'bg-surface-container-lowest border-outline-variant/30 text-outline'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-lg mt-0.5 ${item.completed ? 'text-primary' : 'text-outline'}`}>
                      {item.completed ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    <span className="text-xs font-mono leading-snug">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* OBS Integration Hotkey Suggestion */}
              <div className="mt-6 pt-4 border-t border-surface-container-high">
                <span className="text-[10px] font-mono text-outline uppercase block mb-1">Recommended OBS Panic Hotkey</span>
                <div className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between">
                  <span className="text-xs font-mono text-white">Scene: "DEFENSE BLACKOUT"</span>
                  <kbd className="px-2 py-1 rounded bg-surface-container-high border border-outline-variant text-[11px] font-mono text-primary font-bold">
                    Ctrl + Alt + K
                  </kbd>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => onNavigate('apps-matrix')}
                  className="w-full py-2.5 rounded-lg bg-primary text-background font-mono text-xs font-bold uppercase tracking-wider hover:bg-primary-hover transition-all text-center"
                >
                  AUDIT STREAM APPS MATRIX
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
