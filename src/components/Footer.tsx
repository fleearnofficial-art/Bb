import React, { useState } from 'react';
import { Language } from '../types';
import { playClickSound, playSuccessChime } from '../utils/audio';
import { Sparkles, Mail, Send, Check, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FooterProps {
  lang: Language;
  onOpenCodeView: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenCodeView }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    playSuccessChime();
    confetti({
      particleCount: 40,
      spread: 40,
      origin: { y: 0.9 },
    });
  };

  return (
    <footer className="bg-[#050508] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Glow Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xl text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                F
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-heading">
                Fleearn<span className="text-blue-400">.</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              {lang === 'bn'
                ? 'Fleearn হলো ২০২৬ এর অন্যতম উদ্ভাবনী ৩ডি এডুটেক ও ফ্রিল্যান্সিং ক্যারিয়ার প্ল্যাটফর্ম। হাই-ইনকাম স্কিল, ইন্টারঅ্যাক্টিভ ৩ডি ল্যাব এবং বাস্তব ক্লায়েন্ট হান্টিং মেথডলজি।'
                : 'Fleearn is the next-gen 3D skill and freelancing accelerator built for creators, engineers, and independent high-earners.'}
            </p>

            <div className="pt-2 text-xs font-mono text-blue-400 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              <a href="mailto:fleearnofficial@gmail.com" className="hover:underline">
                fleearnofficial@gmail.com
              </a>
            </div>
          </div>

          {/* Programs Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              {lang === 'bn' ? 'ফ্ল্যাগশিপ প্রোগ্রাম' : 'FLAGSHIP TRACKS'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="#courses" className="hover:text-white transition-colors">3D Web & Fullstack Next.js 15</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">AI Agents & n8n Automation</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">UI/UX & Spline 3D Design</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Upwork & High-Ticket Retainers</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Video 3D CGI & VFX Motion</a></li>
            </ul>
          </div>

          {/* Quick Tools */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              {lang === 'bn' ? 'ইন্টারেক্টিভ টুলস' : 'INTERACTIVE'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="#3d-lab" className="hover:text-white transition-colors">Three.js 3D Lab</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">{lang === 'bn' ? 'আয় ক্যালকুলেটর' : 'Income Simulator'}</a></li>
              <li><a href="#roadmap" className="hover:text-white transition-colors">{lang === 'bn' ? 'এআই রোডম্যাপ' : 'AI Sprint Roadmap'}</a></li>
              <li><a href="#mentors" className="hover:text-white transition-colors">{lang === 'bn' ? 'মেন্টর বুকিং' : '1-on-1 Mentors'}</a></li>
              <li>
                <button
                  id="footer-code-view-btn"
                  onClick={onOpenCodeView}
                  className="text-blue-400 hover:underline cursor-pointer font-mono"
                >
                  HTML/CSS/JS Code
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              {lang === 'bn' ? 'সাপ্তাহিক নিউজলেটার' : 'WEEKLY DISPATCH'}
            </h4>
            <p className="text-xs text-gray-400">
              {lang === 'bn'
                ? 'নতুন ৩ডি ওয়েব রিসোর্স, আপওয়ার্ক বিডিং টেমপ্লেট ও এআই প্রম্পটস সরাসরি ইনবক্সে পান।'
                : 'Get curated 3D code snippets, Upwork proposal templates & freelance gig leads.'}
            </p>

            {subscribed ? (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{lang === 'bn' ? 'সাবস্ক্রিপশন সম্পন্ন হয়েছে!' : 'Subscribed! Check inbox.'}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    placeholder="email@domain.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full p-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    className="p-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-mono">
          <div>
            © {new Date().getFullYear()} Fleearn Official (fleearnofficial@gmail.com). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SSL Secured • WebGL Enabled</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
