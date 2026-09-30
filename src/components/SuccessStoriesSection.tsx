import React from 'react';
import { Language } from '../types';
import { TESTIMONIALS_DATA } from '../data/fleearnData';
import { Sparkles, Star, Quote, ArrowUpRight, CheckCircle2, TrendingUp } from 'lucide-react';

interface SuccessStoriesSectionProps {
  lang: Language;
}

export const SuccessStoriesSection: React.FC<SuccessStoriesSectionProps> = ({ lang }) => {
  return (
    <section id="stories" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-4">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5" />
              {lang === 'bn' ? 'বাস্তব সফলতার গল্প ও ইনকাম প্রুফ' : 'STUDENT CASE STUDIES & EARNINGS'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-heading tracking-tight">
            {lang === 'bn' ? (
              <>
                Fleearn গ্র্যাজুয়েটদের <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">লাইভ ট্রান্সফর্মেশন</span>
              </>
            ) : (
              <>
                Real Transformations from <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Fleearn Graduates</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            {lang === 'bn'
              ? 'শূন্য থেকে শুরু করে কীভাবে আমাদের শিক্ষার্থীরা আন্তর্জাতিক মার্কেটপ্লেসে টপ-রেটেড ফ্রিল্যান্সার হয়েছেন।'
              : 'Discover how everyday students transitioned into high-earning independent creators earning $2,000 to $5,000+ every month.'}
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between group backdrop-blur-md hover:-translate-y-1"
            >
              <div>
                {/* Header Profile */}
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-2xl object-cover border border-white/10"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white font-heading">{item.name}</h3>
                    <p className="text-xs text-gray-400">{item.role[lang]}</p>
                    <span className="text-[11px] font-mono text-blue-400">{item.city}</span>
                  </div>
                </div>

                {/* Monthly Earnings Highlight */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 mb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 block">
                      {lang === 'bn' ? 'ভেরিফাইড মাসিক আয়' : 'Verified Monthly Income'}
                    </span>
                    <span className="text-base font-bold text-emerald-400 font-mono">
                      {item.monthlyEarnings}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/5 text-gray-300 border border-white/10">
                    {item.platform}
                  </span>
                </div>

                {/* Quote */}
                <div className="relative text-xs sm:text-sm text-gray-300 italic leading-relaxed pt-2">
                  <Quote className="w-6 h-6 text-blue-500/20 absolute -top-1 -left-2 -z-10" />
                  "{item.quote[lang]}"
                </div>
              </div>

              {/* Before / After Stats */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between text-gray-400">
                  <span>{lang === 'bn' ? 'পূর্বে:' : 'Before:'}</span>
                  <span className="text-gray-400">{item.stats.before}</span>
                </div>
                <div className="flex items-center justify-between text-blue-400 font-bold">
                  <span>{lang === 'bn' ? 'বর্তমানে:' : 'After:'}</span>
                  <span>{item.stats.after}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
