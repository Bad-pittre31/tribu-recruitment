/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HeroJungleReveal } from './components/HeroJungleReveal';
import { Differentiators } from './components/Differentiators';
import { SplineFeature } from './components/SplineFeature';
import { AILayer } from './components/AILayer';
import { TribuTransition } from './components/TribuTransition';
import { TalentPortal } from './components/TalentPortal';
import { SharedSuccess } from './components/SharedSuccess';
import { TransparencyEconomics } from './components/TransparencyEconomics';
import { Manifesto } from './components/Manifesto';
import { Protocol } from './components/Protocol';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { CandidateAuth } from './components/CandidateAuth';
import { CandidateDashboard } from './components/CandidateDashboard';
import { LegalNotice } from './pages/LegalNotice';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { AboutPage } from './pages/AboutPage';
import { AIRecruitmentPage } from './pages/AIRecruitmentPage';
import { TermsConditions } from './pages/TermsConditions';
import { useAuth } from './contexts/AuthContext';

import { CandidatesPage } from './pages/CandidatesPage';

function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-tribu-bg)] text-[var(--color-tribu-text)] selection:bg-[var(--color-tribu-accent)] selection:text-[var(--color-tribu-bg)]">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <HeroJungleReveal />
        <Differentiators />
        <SplineFeature />
        <Protocol />
        <AILayer />
        <TribuTransition />
        <TalentPortal />
        <SharedSuccess />
        <TransparencyEconomics />
        <Manifesto />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F9F5] flex items-center justify-center font-[Inter,ui-sans-serif,system-ui,sans-serif]">
        <div className="text-sm font-medium text-gray-400 uppercase tracking-widest animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/candidate-space" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/ai-recruitment" element={<AIRecruitmentPage />} />
      <Route path="/legal-notice" element={<LegalNotice />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsConditions />} />
      <Route path="/candidates" element={<CandidatesPage />} />
      <Route path="/candidate-space" element={<CandidateAuth />} />
      <Route path="/candidate-space/dashboard" element={
        <ProtectedRoute>
          <CandidateDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
}
