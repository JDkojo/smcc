import React, { useState, useEffect } from 'react';
import { PageId } from './types.ts';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { SearchModal } from './components/SearchModal.tsx';
import { NotificationsModal } from './components/NotificationsModal.tsx';
import { CadetProfileModal } from './components/CadetProfileModal.tsx';
import { DmScannerModal } from './components/DmScannerModal.tsx';
import { MobileBottomNav } from './components/MobileBottomNav.tsx';
import { MobileDrawer } from './components/MobileDrawer.tsx';

import { HomeView } from './views/HomeView.tsx';
import { InformationView } from './views/InformationView.tsx';
import { AppsMatrixView } from './views/AppsMatrixView.tsx';
import { ParentsGuideView } from './views/ParentsGuideView.tsx';
import { LivestreamingView } from './views/LivestreamingView.tsx';
import { LegislationView } from './views/LegislationView.tsx';
import { ContactView } from './views/ContactView.tsx';

import { playCyberSound } from './utils/audio.ts';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCadetOpen, setIsCadetOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        playCyberSound('click');
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsNotificationsOpen(false);
        setIsCadetOpen(false);
        setIsScannerOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-sans selection:bg-primary/30 selection:text-primary">
      {/* Top Fixed Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => {
          playCyberSound('click');
          setIsSearchOpen(true);
        }}
        onOpenNotifications={() => {
          playCyberSound('beep');
          setIsNotificationsOpen(true);
        }}
        onOpenCadet={() => {
          playCyberSound('click');
          setIsCadetOpen(true);
        }}
        onOpenDrawer={() => setIsMobileMenuOpen(true)}
      />

      {/* Main Content View with padding for fixed header and mobile dock */}
      <main className="flex-1 pt-20 pb-20 xl:pb-0">
        {currentPage === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenScanner={() => {
              playCyberSound('click');
              setIsScannerOpen(true);
            }}
            onOpenSearch={() => {
              playCyberSound('click');
              setIsSearchOpen(true);
            }}
          />
        )}

        {currentPage === 'information' && (
          <InformationView
            onNavigate={handleNavigate}
            onOpenScanner={() => {
              playCyberSound('click');
              setIsScannerOpen(true);
            }}
          />
        )}

        {currentPage === 'apps-matrix' && (
          <AppsMatrixView
            onNavigate={handleNavigate}
            onOpenScanner={() => {
              playCyberSound('click');
              setIsScannerOpen(true);
            }}
          />
        )}

        {currentPage === 'parents-guide' && (
          <ParentsGuideView
            onNavigate={handleNavigate}
            onOpenScanner={() => {
              playCyberSound('click');
              setIsScannerOpen(true);
            }}
          />
        )}

        {currentPage === 'livestreaming' && (
          <LivestreamingView
            onNavigate={handleNavigate}
            onOpenScanner={() => {
              playCyberSound('click');
              setIsScannerOpen(true);
            }}
          />
        )}

        {currentPage === 'legislation' && (
          <LegislationView
            onNavigate={handleNavigate}
            onOpenScanner={() => {
              playCyberSound('click');
              setIsScannerOpen(true);
            }}
          />
        )}

        {currentPage === 'contact-us' && (
          <ContactView
            onNavigate={handleNavigate}
            onOpenScanner={() => {
              playCyberSound('click');
              setIsScannerOpen(true);
            }}
          />
        )}
      </main>

      {/* Site Footer */}
      <Footer
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Modals & Overlays */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigate={handleNavigate}
      />

      <CadetProfileModal
        isOpen={isCadetOpen}
        onClose={() => setIsCadetOpen(false)}
      />

      <DmScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />

      {/* Full Viewport Mobile Drawer with Backdrop */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenScanner={() => setIsScannerOpen(true)}
      />

      {/* Mobile Floating Bottom Cyber Navigation Dock */}
      <MobileBottomNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenDrawer={() => setIsMobileMenuOpen(true)}
      />
    </div>
  );
}
