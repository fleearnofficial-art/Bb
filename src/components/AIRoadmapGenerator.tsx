import React, { useState } from 'react';
import { Language } from '../types';
import { ROADMAP_STEPS } from '../data/fleearnData';
import { playClickSound, playSuccessChime } from '../utils/audio';
import { Sparkles, ArrowRight, CheckCircle2, Layers, Cpu, Box, Award, Download, RefreshCw, Cloud, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

interface AIRoadmapGeneratorProps {
  lang: Language;
}

export const AIRoadmapGenerator: React.FC<AIRoadmapGeneratorProps> = ({ lang }) => {
  const { user, signIn } = useAuth();
  const [background, setBackground] = useState<string>('beginner');
  const [goal, setGoal] = useState<string>('freelance');
  const [commitment, setCommitment] = useState<string>('medium');
  const [isGenerated, setIsGenerated] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return Layers;
      case 'Cpu': return Cpu;
      case 'Box': return Box;
      case 'Award': return Award;
      default: return Sparkles;
    }
  };

  const handleGenerate = () => {
    playClickSound();
    setIsGenerating(true);
    setIsSaved(false);
    setSaveMessage(null);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      playSuccessChime();
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
      });
    }, 600);
  };

  const handleSaveToCloud = async () => {
    playClickSound();
    setSaveMessage(null);

    if (!user) {
      try {
        await signIn();
      } catch (err) {
        setSaveMessage(lang === 'bn' ? 'সংরক্ষণ করতে গুগলে সাইন ইন করুন।' : 'Please sign in to save.');
        return;
      }
      return;
    }

    setIsSaving(true);
    const roadmapId = `rm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const roadmapPath = `saved_roadmaps/${roadmapId}`;

    const roadmapTitle = `6-Month Sprint (${background.toUpperCase()} -> ${goal.toUpperCase()})`;

    try {
      await setDoc(doc(db, 'saved_roadmaps', roadmapId), {
        userId: user.uid,
        background,
        goal,
        commitment,
        title: roadmapTitle,
        createdAt: serverTimestamp(),
      });

      setIsSaving(false);
      setIsSaved(true);
      playSuccessChime();
      setSaveMessage(lang === 'bn' ? 'রোডম্যাপ ক্লাউড ভল্টে সংরক্ষিত হয়েছে! ✓' : 'Roadmap saved to your Cloud Vault! ✓');
    } catch (error) {
      setIsSaving(false);
      setSaveMessage(lang === 'bn' ? 'সংরক্ষণে ব্যর্থ হয়েছে।' : 'Failed to save roadmap.');
      handleFirestoreError(error, OperationType.CREATE, roadmapPath);
    }
  };

  return (
    <section id="roadmap" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-4">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              {lang === 'bn' ? 'এআই পার্সোনালাইজড ক্যারিয়ার গাইড' : 'AI-POWERED FAST TRACK ROADMAP'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-heading tracking-tight">
            {lang === 'bn' ? (
              <>
                ৬ মাসের <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">৩ডি ও ফ্রিল্যান্স রোডম্যাপ</span> জেনারেট করুন
              </>
            ) : (
              <>
                Generate Your 6-Month <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Skill & Freelance Roadmap</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            {lang === 'bn'
              ? 'আপনার বর্তমান লেভেল ও লক্ষ্যের ওপর ভিত্তি করে কাস্টমাইজড স্টেপ-বাই-স্টেপ লার্নিং ও ক্লায়েন্ট হান্টিং প্ল্যান।'
              : 'Tailored milestone roadmap engineered for zero-to-hero career transition and international freelancing.'}
          </p>
        </div>

        {/* Input Parameters Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 mb-12 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Background */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 block mb-2">
                1. {lang === 'bn' ? 'বর্তমান ব্যাকগ্রাউন্ড' : 'Current Background'}
              </label>
              <select
                id="roadmap-background-select"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-gray-200 text-xs sm:text-sm font-medium focus:border-blue-500 focus:outline-none cursor-pointer"
              >
                <option value="beginner" className="bg-[#050508]">{lang === 'bn' ? 'একদম নতুন / নন-টেক ব্যাকগ্রাউন্ড' : 'Complete Beginner (Non-Tech)'}</option>
                <option value="student" className="bg-[#050508]">{lang === 'bn' ? 'বিশ্ববিদ্যালয় শিক্ষার্থী / ফ্রেশার' : 'College Student / Graduate'}</option>
                <option value="basic_dev" className="bg-[#050508]">{lang === 'bn' ? 'বেসিক এইচটিএমএল/সিএসএস জানা' : 'Basic Web / Design Knowledge'}</option>
                <option value="switch" className="bg-[#050508]">{lang === 'bn' ? 'চাকরি থেকে ফ্রিল্যান্সিং ক্যারিয়ার ট্রানজিশন' : 'Working Pro Switching to Freelance'}</option>
              </select>
            </div>

            {/* 2. Target Goal */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 block mb-2">
                2. {lang === 'bn' ? 'প্রধান লক্ষ্য (Primary Goal)' : 'Primary Career Goal'}
              </label>
              <select
                id="roadmap-goal-select"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-gray-200 text-xs sm:text-sm font-medium focus:border-blue-500 focus:outline-none cursor-pointer"
              >
                <option value="freelance" className="bg-[#050508]">{lang === 'bn' ? 'আপওয়ার্ক ও ফাইভার থেকে মাসে $২k+ আয়' : 'Upwork & Fiverr Freelancing ($2k+/mo)'}</option>
                <option value="remote_job" className="bg-[#050508]">{lang === 'bn' ? 'ইউএস / ইউরোপ রিমোট ফুলটাইম জব' : 'US / EU Full-Time Remote Job'}</option>
                <option value="agency" className="bg-[#050508]">{lang === 'bn' ? 'নিজের ডিজিটাল ৩ডি বা এআই এজেন্সি তৈরি' : 'Launch Digital 3D / AI Agency'}</option>
              </select>
            </div>

            {/* 3. Commitment */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 block mb-2">
                3. {lang === 'bn' ? 'দৈনিক পড়াশোনার সময়' : 'Daily Time Commitment'}
              </label>
              <select
                id="roadmap-commitment-select"
                value={commitment}
                onChange={(e) => setCommitment(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-gray-200 text-xs sm:text-sm font-medium focus:border-blue-500 focus:outline-none cursor-pointer"
              >
                <option value="low" className="bg-[#050508]">{lang === 'bn' ? '১-২ ঘণ্টা / দিন (পার্ট-টাইম)' : '1 - 2 Hours / Day (Part-Time)'}</option>
                <option value="medium" className="bg-[#050508]">{lang === 'bn' ? '৩-৪ ঘণ্টা / দিন (স্ট্যান্ডার্ড স্পিড)' : '3 - 4 Hours / Day (Standard Sprint)'}</option>
                <option value="high" className="bg-[#050508]">{lang === 'bn' ? '৫-৬ ঘণ্টা / দিন (ফাস্ট-ট্র্যাক বুটকাম্প)' : '5 - 6 Hours / Day (Ultra Fast-Track)'}</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              {saveMessage && (
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                  {saveMessage}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                id="save-roadmap-btn"
                type="button"
                onClick={handleSaveToCloud}
                disabled={isSaving || isGenerating}
                className="flex-1 sm:flex-initial py-3 px-5 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                    <span>{lang === 'bn' ? 'সংরক্ষণ হচ্ছে...' : 'Saving...'}</span>
                  </>
                ) : isSaved ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'bn' ? 'সংরক্ষিত হয়েছে' : 'Saved to Cloud'}</span>
                  </>
                ) : (
                  <>
                    <Cloud className="w-4 h-4 text-blue-400" />
                    <span>{lang === 'bn' ? 'ক্লাউডে সেভ করুন' : 'Save to Cloud'}</span>
                  </>
                )}
              </button>

              <button
                id="generate-roadmap-btn"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1 sm:flex-initial py-3 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{lang === 'bn' ? 'রোডম্যাপ তৈরি হচ্ছে...' : 'Generating Custom Roadmap...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>{lang === 'bn' ? 'রোডম্যাপ আপডেট করুন' : 'Generate Sprint Roadmap'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Generated Timeline Visualizer */}
        {isGenerated && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ROADMAP_STEPS.map((step, idx) => {
                const Icon = getStepIcon(step.icon);
                return (
                  <div
                    key={idx}
                    className="relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between group backdrop-blur-md hover:-translate-y-1"
                  >
                    {/* Step Number Bubble */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 font-mono text-xs font-bold">
                        {step.month}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block">
                        {step.phase[lang]}
                      </span>
                      <h4 className="text-lg font-bold text-white mt-1 group-hover:text-blue-400 transition-colors font-heading">
                        {step.title[lang]}
                      </h4>
                      <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                        {step.description[lang]}
                      </p>

                      {/* Deliverables */}
                      <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{lang === 'bn' ? 'লক্ষ্যমাত্রা (Milestones):' : 'Key Deliverables:'}</div>
                        {step.deliverables[lang].map((d, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2 text-xs text-gray-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step Status */}
                    <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                      <span>Fleearn Sprint 0{idx + 1}</span>
                      <span className="text-blue-400 font-bold">100% Guided</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
