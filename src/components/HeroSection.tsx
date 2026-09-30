import React from 'react';
import { Language } from '../types';
import { ThreeHeroScene } from './ThreeHeroScene';
import { playClickSound } from '../utils/audio';
import { 
  Sparkles, 
  ArrowRight, 
  Flame, 
  ShieldCheck, 
  Star, 
  TrendingUp, 
  Users, 
  Award,
  Play,
  Zap
} from 'lucide-react';

interface HeroSectionProps {
  lang: Language;
  onExploreCourses: () => void;
  onOpenCalculator: () => void;
  onOpenFreeDemo: () => void;
  onSelectHeroSkill?: (skill: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onExploreCourses,
  onOpenCalculator,
  onOpenFreeDemo,
  onSelectHeroSkill,
}) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
      {/* Background Cyber Ambient Lights */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-600/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                {lang === 'bn' ? '২০২৬ এর নেক্সট-জেন ৩ডি এডুটেক ও ফ্রিল্যান্সিং' : 'Evolution of Learning'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] font-heading">
              {lang === 'bn' ? (
                <>
                  ভবিষ্যতের স্কিল শিখুন <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                    ৩ডি রিয়েল-টাইম অভিজ্ঞতায়
                  </span>
                </>
              ) : (
                <>
                  Master Your <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                    Future Skills.
                  </span>
                </>
              )}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {lang === 'bn'
                ? 'Next.js 15, Three.js 3D, এআই অটোমেশন ও আপওয়ার্ক টপ-রেটেড ক্লায়েন্ট হ্যান্ডলিং। থিওরি নয়, রিয়েল প্রোডাকশন প্রজেক্ট ও লাইভ মেন্টরশিপের মাধ্যমে গড়ে তুলুন আন্তর্জাতিক ফ্রিল্যান্স ক্যারিয়ার।'
                : 'Experience an immersive learning environment designed for the modern creator, coder, and high-earning freelancer.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-explore-courses-btn"
                onClick={() => {
                  playClickSound();
                  onExploreCourses();
                }}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold shadow-xl shadow-blue-600/25 hover:translate-y-[-2px] transition-all cursor-pointer flex items-center gap-2 group"
              >
                <span>{lang === 'bn' ? 'কোর্সসমূহ এক্সপ্লোর করুন' : 'Get Started Free'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-income-calc-btn"
                onClick={() => {
                  playClickSound();
                  onOpenCalculator();
                }}
                className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl font-bold transition-all cursor-pointer flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-blue-400" />
                <span>{lang === 'bn' ? 'সম্ভাব্য আয় ক্যালকুলেটর' : 'Income Simulator'}</span>
              </button>
            </div>

            {/* Trust Badges & Metrics Row */}
            <div className="pt-6 grid grid-cols-3 gap-4 text-left">
              <div className="p-4 sm:p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold text-white mb-1 font-mono">
                  ৫০,০০০+
                </div>
                <div className="text-[10px] sm:text-xs uppercase text-gray-400 tracking-widest">
                  {lang === 'bn' ? 'অ্যাক্টিভ লার্নার' : 'Active Learners'}
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold text-blue-400 mb-1 font-mono">
                  $২.৪M+
                </div>
                <div className="text-[10px] sm:text-xs uppercase text-gray-400 tracking-widest">
                  {lang === 'bn' ? 'শিক্ষার্থীদের মোট আয়' : 'Verified Earnings'}
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold text-white mb-1 font-mono">
                  ৪.৯৮ ★
                </div>
                <div className="text-[10px] sm:text-xs uppercase text-gray-400 tracking-widest">
                  {lang === 'bn' ? 'টপ রিভিউ রেটিং' : 'Satisfaction'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Three.js Interactive 3D Canvas */}
          <div className="lg:col-span-6 relative">
            <ThreeHeroScene onSelectNode={onSelectHeroSkill} />
          </div>
        </div>
      </div>
    </section>
  );
};
