import React, { useState } from 'react';
import { Language } from '../types';
import { FAQS_DATA } from '../data/fleearnData';
import { playClickSound } from '../utils/audio';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';

interface FAQSectionProps {
  lang: Language;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    playClickSound();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-4">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <HelpCircle className="w-3.5 h-3.5" />
              {lang === 'bn' ? 'সাধারণ প্রশ্নোত্তর ও গাইডলাইন' : 'FREQUENTLY ASKED QUESTIONS'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading tracking-tight">
            {lang === 'bn' ? (
              <>
                আপনার মনে থাকা <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">সকল প্রশ্নের উত্তর</span>
              </>
            ) : (
              <>
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Questions & Details</span>
              </>
            )}
          </h2>
          <p className="mt-3 text-gray-400 text-sm sm:text-base">
            {lang === 'bn'
              ? 'ভর্তি, ক্লাসের সময়সূচী, পেমেন্ট ও ফ্রিল্যান্স ক্যারিয়ার সাপোর্ট সংক্রান্ত সাধারণ তথ্য।'
              : 'Everything you need to know about enrollment, hardware requirements, and placement mentorship.'}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition-all backdrop-blur-md"
              >
                <button
                  id={`faq-toggle-btn-${idx}`}
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <span className="text-base font-bold text-white font-heading">
                    {faq.question[lang]}
                  </span>
                  <div
                    className={`p-1.5 rounded-full bg-white/10 text-gray-300 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-blue-600 text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-gray-300 leading-relaxed border-t border-white/10 animate-fade-in">
                    {faq.answer[lang]}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-4 text-center sm:text-left backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {lang === 'bn' ? 'আরও কোনো প্রশ্ন আছে?' : 'Have more questions?'}
              </h4>
              <p className="text-xs text-gray-400">
                {lang === 'bn' ? 'আমাদের মেন্টরদের সাথে সরাসরি চ্যাট বা ইমেইলে যোগাযোগ করুন' : 'Contact our admissions team directly at fleearnofficial@gmail.com'}
              </p>
            </div>
          </div>

          <a
            href="mailto:fleearnofficial@gmail.com"
            className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
          >
            fleearnofficial@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};
