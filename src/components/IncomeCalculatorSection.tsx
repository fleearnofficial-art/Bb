import React, { useState } from 'react';
import { Language } from '../types';
import { playClickSound, playSuccessChime } from '../utils/audio';
import { Calculator, DollarSign, Clock, Sparkles, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface IncomeCalculatorSectionProps {
  lang: Language;
}

export const IncomeCalculatorSection: React.FC<IncomeCalculatorSectionProps> = ({ lang }) => {
  const [skill, setSkill] = useState<'web' | 'ai' | 'design' | 'video' | 'mobile'>('web');
  const [tier, setTier] = useState<'beginner' | 'intermediate' | 'expert'>('intermediate');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(20);
  const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT');

  // Rates in USD per hour
  const ratesConfig = {
    web: { name: lang === 'bn' ? '৩ডি ওয়েব ও ফুলস্ট্যাক' : '3D Web & Fullstack', beginner: 25, intermediate: 55, expert: 95 },
    ai: { name: lang === 'bn' ? 'এআই এজেন্ট ও অটোমেশন' : 'AI Agents & Automation', beginner: 30, intermediate: 65, expert: 110 },
    design: { name: lang === 'bn' ? 'ইউআই/ইউএক্স ও ৩ডি মোশন' : 'UI/UX & 3D Motion', beginner: 20, intermediate: 45, expert: 85 },
    video: { name: lang === 'bn' ? '৩ডি সিজিআই ও ভিডিও এডিটিং' : '3D CGI & Video Editing', beginner: 22, intermediate: 48, expert: 90 },
    mobile: { name: lang === 'bn' ? 'মোবাইল অ্যাপস (Flutter)' : 'Mobile Apps (Flutter)', beginner: 25, intermediate: 50, expert: 95 },
  };

  const selectedRate = ratesConfig[skill][tier];
  const weeklyUSD = selectedRate * hoursPerWeek;
  const monthlyUSD = Math.round(weeklyUSD * 4.33);
  const annualUSD = monthlyUSD * 12;

  const USD_TO_BDT = 122; // Current exchange rate
  const monthlyBDT = monthlyUSD * USD_TO_BDT;
  const annualBDT = annualUSD * USD_TO_BDT;

  const triggerConfetti = () => {
    playSuccessChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#38bdf8', '#34d399', '#f59e0b'],
    });
  };

  return (
    <section id="calculator" className="py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-4">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <Calculator className="w-3.5 h-3.5 text-blue-400" />
              {lang === 'bn' ? 'লাইভ ফ্রিল্যান্স আর্নিং ক্যালকুলেটর' : 'EARNING POTENTIAL SIMULATOR'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-heading tracking-tight">
            {lang === 'bn' ? (
              <>
                আপনার সম্ভাব্য ফ্রিল্যান্সিং আয় <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">হিসাব করুন</span>
              </>
            ) : (
              <>
                Calculate Your Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Freelance Earning Potential</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            {lang === 'bn'
              ? 'আপওয়ার্ক ও আন্তর্জাতিক ক্লায়েন্টদের গড় রেট এবং আপনার সময় দেওয়ার ক্ষমতার ওপর ভিত্তি করে সরাসরি হিসাব দেখুন।'
              : 'Estimate real market income based on actual hourly benchmarks from top international freelancing platforms.'}
          </p>
        </div>

        {/* Interactive Calculator Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6 backdrop-blur-md">
            {/* Skill Selector */}
            <div>
              <label className="text-xs uppercase font-semibold tracking-widest text-gray-400 block mb-3">
                1. {lang === 'bn' ? 'আপনার পছন্দের স্কিল ফিল্ড' : 'Select Target Skill Domain'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {(Object.keys(ratesConfig) as Array<keyof typeof ratesConfig>).map((key) => {
                  const isSelected = skill === key;
                  return (
                    <button
                      key={key}
                      id={`calc-skill-${key}`}
                      onClick={() => {
                        playClickSound();
                        setSkill(key);
                      }}
                      className={`p-3.5 rounded-2xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white/10 border-blue-500/50 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)]'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="font-bold">{ratesConfig[key].name}</div>
                      <div className="text-[10px] font-mono text-blue-400 mt-1">
                        ${ratesConfig[key].intermediate}/hr avg
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Experience Tier */}
            <div>
              <label className="text-xs uppercase font-semibold tracking-widest text-gray-400 block mb-3">
                2. {lang === 'bn' ? 'অভিজ্ঞতা স্তর ও দক্ষতা' : 'Select Experience Tier'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'beginner' as const, label: lang === 'bn' ? 'শুরুর ৩-৬ মাস' : 'Junior (0-6 mo)', desc: '$20-30/hr' },
                  { id: 'intermediate' as const, label: lang === 'bn' ? 'মিড-লেভেল (৬-১৮ মাস)' : 'Mid-Level', desc: '$45-65/hr' },
                  { id: 'expert' as const, label: lang === 'bn' ? 'টপ-রেটেড এক্সপার্ট' : 'Top-Rated Pro', desc: '$85-110/hr' },
                ].map((item) => {
                  const isSelected = tier === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`calc-tier-${item.id}`}
                      onClick={() => {
                        playClickSound();
                        setTier(item.id);
                      }}
                      className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white/10 border-blue-500/50 text-white shadow-[0_0_15px_rgba(59,130,246,0.25)]'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[11px] font-mono text-emerald-400 mt-1 font-semibold">{item.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hours Per Week Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs uppercase font-semibold tracking-widest text-gray-400">
                  3. {lang === 'bn' ? 'সাপ্তাহিক কাজের সময়' : 'Weekly Working Hours'}
                </label>
                <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 font-mono font-bold text-sm">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{hoursPerWeek} {lang === 'bn' ? 'ঘণ্টা / সপ্তাহ' : 'hrs / week'}</span>
                </div>
              </div>
              <input
                id="calc-hours-slider"
                type="range"
                min="5"
                max="40"
                step="5"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-2">
                <span>5 hrs (Part-time)</span>
                <span>20 hrs (Semi-Pro)</span>
                <span>40 hrs (Full-Time Studio)</span>
              </div>
            </div>

            {/* Currency Switcher */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-xs text-gray-400">{lang === 'bn' ? 'কারেন্সি নির্বাচন করুন:' : 'Display Currency:'}</span>
              <div className="flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10">
                <button
                  id="currency-bdt-btn"
                  onClick={() => {
                    playClickSound();
                    setCurrency('BDT');
                  }}
                  className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold transition-colors cursor-pointer ${
                    currency === 'BDT' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  ৳ BDT (টাকা)
                </button>
                <button
                  id="currency-usd-btn"
                  onClick={() => {
                    playClickSound();
                    setCurrency('USD');
                  }}
                  className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold transition-colors cursor-pointer ${
                    currency === 'USD' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  $ USD (ডলার)
                </button>
              </div>
            </div>
          </div>

          {/* Results Projection Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between shadow-2xl relative backdrop-blur-md">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>{lang === 'bn' ? 'প্রজেক্টেড ফ্রিল্যান্স আয়' : 'EARNING PROJECTION'}</span>
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-semibold">
                  ${selectedRate}/hour
                </span>
              </div>

              {/* Monthly Amount Showcase */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center relative overflow-hidden">
                <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                  {lang === 'bn' ? 'সম্ভাব্য মাসিক ইনকাম' : 'Estimated Monthly Income'}
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-white font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                  {currency === 'BDT' ? `৳${monthlyBDT.toLocaleString()}` : `$${monthlyUSD.toLocaleString()}`}
                </div>
                <div className="text-xs text-gray-400 font-mono mt-2">
                  {currency === 'BDT'
                    ? `(প্রায় $${monthlyUSD.toLocaleString()} USD / মাস)`
                    : `(Approx ৳${monthlyBDT.toLocaleString()} BDT / month)`}
                </div>
              </div>

              {/* Annual & Weekly Breakdown */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-gray-400 text-[11px] uppercase tracking-wider">{lang === 'bn' ? 'সাপ্তাহিক আয়' : 'Weekly Income'}</div>
                  <div className="text-base font-bold text-white mt-1">
                    {currency === 'BDT' ? `৳${(weeklyUSD * USD_TO_BDT).toLocaleString()}` : `$${weeklyUSD.toLocaleString()}`}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-gray-400 text-[11px] uppercase tracking-wider">{lang === 'bn' ? 'বাৎসরিক আয়' : 'Annual Run-Rate'}</div>
                  <div className="text-base font-bold text-blue-400 mt-1">
                    {currency === 'BDT' ? `৳${annualBDT.toLocaleString()}` : `$${annualUSD.toLocaleString()}`}
                  </div>
                </div>
              </div>

              {/* Growth Roadmap Guarantee */}
              <div className="space-y-2 text-xs text-gray-300 pt-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{lang === 'bn' ? '১০০% ভেরিফাইড আপওয়ার্ক ও ফাইভার মার্কেট ডেটা' : '100% verified Upwork & Fiverr market metrics'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{lang === 'bn' ? 'Fleearn ক্যারিয়ার ট্র্যাকে এই মাইলস্টোনে পৌঁছানোর গাইড' : 'Guided roadmap to reach this earning tier in 6 months'}</span>
                </div>
              </div>
            </div>

            {/* Confetti Trigger Action */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                id="celebrate-goal-btn"
                onClick={triggerConfetti}
                className="w-full py-4 px-6 rounded-2xl bg-white text-black hover:bg-gray-200 font-bold text-sm shadow-lg shadow-white/10 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>{lang === 'bn' ? 'এই টার্গেট সেট করুন 🎉' : 'Lock in this Target 🎉'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
