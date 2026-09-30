/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, Course } from './types';
import { COURSES_DATA } from './data/fleearnData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ThreeSkillShowcase } from './components/ThreeSkillShowcase';
import { CourseTracksSection } from './components/CourseTracksSection';
import { IncomeCalculatorSection } from './components/IncomeCalculatorSection';
import { AIRoadmapGenerator } from './components/AIRoadmapGenerator';
import { InteractiveCodeViewer } from './components/InteractiveCodeViewer';
import { MentorsSection } from './components/MentorsSection';
import { SuccessStoriesSection } from './components/SuccessStoriesSection';
import { LiveWorkshopBanner } from './components/LiveWorkshopBanner';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { EnrollmentModal } from './components/EnrollmentModal';
import { StudentDashboardModal } from './components/StudentDashboardModal';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  const [lang, setLang] = useState<Language>('bn');
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState<Course | null>(null);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  const handleOpenGeneralEnrollment = () => {
    setSelectedCourseForEnroll(COURSES_DATA[0]);
  };

  const handleEnrollCourse = (course: Course) => {
    setSelectedCourseForEnroll(course);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCodeView = () => {
    handleScrollToSection('source-code');
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#050508] text-slate-100 selection:bg-blue-600 selection:text-white flex flex-col justify-between relative overflow-x-hidden">
        {/* Immersive UI Ambient Glow Backgrounds */}
        <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="fixed top-[40%] left-[20%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0" />

        {/* Top Futuristic Navigation */}
        <Navbar
          lang={lang}
          onToggleLang={toggleLanguage}
          onOpenCodeView={handleOpenCodeView}
          onOpenEnroll={handleOpenGeneralEnrollment}
          onOpenDashboard={() => setDashboardOpen(true)}
        />

        {/* Main Landing Flow */}
        <main className="flex-grow relative z-10">
          {/* 1. Hero 3D Section */}
          <HeroSection
            lang={lang}
            onExploreCourses={() => handleScrollToSection('courses')}
            onOpenCalculator={() => handleScrollToSection('calculator')}
            onOpenFreeDemo={handleOpenGeneralEnrollment}
            onSelectHeroSkill={() => handleScrollToSection('3d-lab')}
          />

          {/* 2. Interactive Three.js 3D Skill Lab */}
          <ThreeSkillShowcase
            lang={lang}
            onEnrollClick={(trackId) => {
              const course = COURSES_DATA.find((c) => c.id === trackId) || COURSES_DATA[0];
              setSelectedCourseForEnroll(course);
            }}
          />

          {/* 3. Flagship Career Courses & Modules */}
          <CourseTracksSection
            lang={lang}
            onEnrollCourse={handleEnrollCourse}
          />

          {/* 4. Live Freelance Income Potential Calculator */}
          <IncomeCalculatorSection lang={lang} />

          {/* 5. 6-Month AI Accelerated Roadmap Generator */}
          <AIRoadmapGenerator lang={lang} />

          {/* 6. Dedicated Standalone HTML, CSS, Three.js Code Viewer */}
          <InteractiveCodeViewer lang={lang} />

          {/* 7. Industry Mentors & 1-on-1 Consultation */}
          <MentorsSection lang={lang} />

          {/* 8. Verified Student Success Stories & Earnings Proof */}
          <SuccessStoriesSection lang={lang} />

          {/* 9. Live Free Masterclass Workshop Banner */}
          <LiveWorkshopBanner lang={lang} />

          {/* 10. Frequently Asked Questions */}
          <FAQSection lang={lang} />
        </main>

        {/* Footer */}
        <Footer
          lang={lang}
          onOpenCodeView={handleOpenCodeView}
        />

        {/* Enrollment & Admission Modal */}
        {selectedCourseForEnroll && (
          <EnrollmentModal
            course={selectedCourseForEnroll}
            lang={lang}
            onClose={() => setSelectedCourseForEnroll(null)}
          />
        )}

        {/* Real-time Student Cloud Portal Modal */}
        {dashboardOpen && (
          <StudentDashboardModal
            lang={lang}
            onClose={() => setDashboardOpen(false)}
            onOpenEnroll={handleOpenGeneralEnrollment}
          />
        )}
      </div>
    </AuthProvider>
  );
}
