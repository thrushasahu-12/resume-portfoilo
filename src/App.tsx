import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { LiveSqlWorkbench } from './components/LiveSqlWorkbench';
import { CohortEngine } from './components/CohortEngine';
import { EtlPipelineSimulator } from './components/EtlPipelineSimulator';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsMatrix } from './components/SkillsMatrix';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactTerminal } from './components/ContactTerminal';
import { ScrollTelemetryHUD } from './components/ScrollTelemetryHUD';
import { WorkstationModal } from './components/WorkstationModal';
import { ResumeModal } from './components/ResumeModal';
import { PORTFOLIO_DATA } from './data/portfolioData';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeWorkstation, setActiveWorkstation] = useState<'sql' | 'cohort' | 'etl' | null>(null);

  // Voice introduction state
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [voiceProgress, setVoiceProgress] = useState(0);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voiceTimerRef = useRef<number | null>(null);

  // Section observer for scroll telemetry
  useEffect(() => {
    const sections = [
      'overview',
      'live-sql',
      'cohorts',
      'etl-pipeline',
      'projects',
      'experience',
      'skills',
      'certifications',
      'contact'
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Voice Intro playback with Web Speech API
  const handleToggleVoice = () => {
    if (isPlayingVoice) {
      // Stop speech
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (voiceTimerRef.current) {
        clearInterval(voiceTimerRef.current);
      }
      setIsPlayingVoice(false);
      setVoiceProgress(0);
    } else {
      setIsPlayingVoice(true);
      setVoiceProgress(0);

      // Try Web Speech API
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stop any pending
        const utterance = new SpeechSynthesisUtterance(PORTFOLIO_DATA.personal.audioTranscript);
        utterance.rate = 1.0;
        utterance.pitch = 1.05;
        
        // Select a natural voice if available
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Natural') || v.name.includes('Female') || v.name.includes('Google') || v.name.includes('Samantha')));
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        utterance.onend = () => {
          setIsPlayingVoice(false);
          setVoiceProgress(100);
          if (voiceTimerRef.current) clearInterval(voiceTimerRef.current);
        };

        utterance.onerror = () => {
          setIsPlayingVoice(false);
          if (voiceTimerRef.current) clearInterval(voiceTimerRef.current);
        };

        speechUtteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }

      // Simulated timer for visual progress
      const totalDuration = 22000; // ~22 seconds
      const interval = 100;
      let elapsed = 0;

      voiceTimerRef.current = window.setInterval(() => {
        elapsed += interval;
        const pct = Math.min(100, (elapsed / totalDuration) * 100);
        setVoiceProgress(pct);

        if (pct >= 100) {
          clearInterval(voiceTimerRef.current!);
          setIsPlayingVoice(false);
        }
      }, interval);
    }
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenWorkstation = (type: 'sql' | 'cohort' | 'etl' | 'resume') => {
    if (type === 'resume') {
      setIsResumeOpen(true);
    } else {
      setActiveWorkstation(type);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Fixed Header */}
      <Navigation
        onOpenResume={() => setIsResumeOpen(true)}
        isPlayingVoice={isPlayingVoice}
        onToggleVoice={handleToggleVoice}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 0: Hero & Executive Profile */}
        <HeroSection
          isPlayingVoice={isPlayingVoice}
          onToggleVoice={handleToggleVoice}
          voiceProgress={voiceProgress}
          onScrollTo={handleScrollTo}
          onOpenLiveSqlModal={() => setActiveWorkstation('sql')}
        />

        {/* Hairline Divider */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </motion.div>

        {/* Section 1: Interactive Live SQL Sandbox (Project 01) */}
        <LiveSqlWorkbench />

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </motion.div>

        {/* Section 2: Interactive Cohort Retention Engine (Project 03) */}
        <CohortEngine />

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </motion.div>

        {/* Section 3: Interactive Python ETL Pipeline (Project 02) */}
        <EtlPipelineSimulator />

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </motion.div>

        {/* Section 4: Projects Showcase & Case Studies */}
        <ProjectsSection />

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </motion.div>

        {/* Section 5: Enterprise Work History & Experience */}
        <ExperienceTimeline />

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </motion.div>

        {/* Section 6: Skills Matrix & Tools */}
        <SkillsMatrix />

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </motion.div>

        {/* Section 7: Verified Certifications */}
        <CertificationsSection />

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </motion.div>

        {/* Section 8: Contact Terminal */}
        <ContactTerminal />
      </main>

      {/* Floating Scroll Telemetry HUD & Pop-Up Trigger */}
      <ScrollTelemetryHUD
        activeSection={activeSection}
        onOpenWorkstation={handleOpenWorkstation}
      />

      {/* Pop-Up Workstation Modal (Full screen interactive sandbox) */}
      <WorkstationModal
        type={activeWorkstation}
        onClose={() => setActiveWorkstation(null)}
      />

      {/* Pop-Up Resume Dossier Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
