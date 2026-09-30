import React, { useState } from 'react';
import { Language } from '../types';
import { playClickSound, setSoundEnabled, getSoundEnabled } from '../utils/audio';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Globe, 
  Menu, 
  X, 
  Code2, 
  ArrowRight,
  Flame,
  User as UserIcon,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenCodeView: () => void;
  onOpenEnroll: () => void;
  onOpenDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenCodeView,
  onOpenEnroll,
  onOpenDashboard,
}) => {
  const { user, signIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playClickSound();
  };

  const navLinks = [
    { href: '#courses', label: lang === 'bn' ? 'কোর্সসমূহ' : 'Courses' },
    { href: '#3d-lab', label: lang === 'bn' ? '৩ডি ল্যাব' : '3D Lab' },
    { href: '#calculator', label: lang === 'bn' ? 'আয় ক্যালকুলেটর' : 'Calculator' },
    { href: '#roadmap', label: lang === 'bn' ? 'রোডম্যাপ' : 'Roadmap' },
    { href: '#mentors', label: lang === 'bn' ? 'মেন্টরস' : 'Mentors' },
    { href: '#stories', label: lang === 'bn' ? 'রিভিউ' : 'Success Stories' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#050508]/80 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: 3D Holographic Fleearn Logo */}
        <a 
          href="#" 
          id="navbar-logo-link"
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => playClickSound()}
        >
          <div className="relative w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all">
            <span className="font-black text-xl text-white font-heading">F</span>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-bold tracking-tight text-white font-heading">
                Fleearn
              </span>
              <span className="px-2 py-0.5 text-[9px] font-mono font-semibold uppercase tracking-wider rounded-full bg-white/5 text-blue-400 border border-white/10">
                3D
              </span>
            </div>
            <span className="text-[10px] text-gray-400 -mt-0.5 tracking-wider uppercase font-medium">
              {lang === 'bn' ? 'ভবিষ্যতের স্কিল ও ফ্রিল্যান্সিং' : 'Next-Gen Skill Mastery'}
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium uppercase tracking-widest text-gray-400">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => playClickSound()}
              className="hover:text-white transition-colors py-2 relative group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right: Actions & Tools */}
        <div className="flex items-center gap-3">
          {/* HTML/CSS/JS Source Code Modal Trigger */}
          <button
            id="nav-code-export-btn"
            onClick={() => {
              playClickSound();
              onOpenCodeView();
            }}
            title={lang === 'bn' ? 'HTML, CSS, JS কোড দেখুন' : 'View HTML, CSS, JS code'}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-blue-400 border border-white/10 text-xs font-mono font-medium transition-all cursor-pointer shadow-sm"
          >
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            <span>HTML/CSS/JS</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            id="nav-sound-toggle-btn"
            onClick={toggleSound}
            title={soundOn ? 'Sound FX On' : 'Sound FX Off'}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              soundOn
                ? 'bg-blue-600/20 border-blue-500/40 text-blue-400 shadow-[0_0_12px_rgba(37,99,235,0.3)]'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Language Switcher */}
          <button
            id="nav-lang-toggle-btn"
            onClick={() => {
              playClickSound();
              onToggleLang();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{lang === 'bn' ? 'EN' : 'বাংলা'}</span>
          </button>

          {/* Student Portal / Cloud Auth Button */}
          {user ? (
            <button
              id="nav-user-profile-btn"
              onClick={() => {
                playClickSound();
                onOpenDashboard();
              }}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-white/5 border border-white/10 hover:border-blue-500/40 text-xs text-white transition-all cursor-pointer"
            >
              <img
                src={user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt={user.displayName || 'User'}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover border border-blue-400/40"
              />
              <span className="hidden sm:inline font-medium text-xs max-w-[90px] truncate">
                {user.displayName?.split(' ')[0] || 'Student'}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          ) : (
            <button
              id="nav-google-login-btn"
              onClick={() => {
                playClickSound();
                signIn();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'bn' ? 'লগইন' : 'Login'}</span>
            </button>
          )}

          {/* Primary CTA */}
          <button
            id="nav-enroll-cta-btn"
            onClick={() => {
              playClickSound();
              onOpenEnroll();
            }}
            className="hidden md:flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-200 transition-all cursor-pointer shadow-md shadow-white/10 group"
          >
            <Flame className="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform" />
            <span>{lang === 'bn' ? 'জয়েন করুন' : 'Join Now'}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="nav-mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden p-6 bg-[#050508]/95 backdrop-blur-2xl border-b border-white/10 space-y-4 animate-fade-in">
          <nav className="flex flex-col space-y-3 text-sm font-semibold text-gray-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  playClickSound();
                  setMobileOpen(false);
                }}
                className="p-2 rounded-xl hover:bg-white/5 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              id="mobile-nav-dashboard-btn"
              onClick={() => {
                playClickSound();
                setMobileOpen(false);
                if (user) {
                  onOpenDashboard();
                } else {
                  signIn();
                }
              }}
              className="w-full py-3 rounded-xl bg-white/5 text-white border border-white/10 text-xs font-mono font-bold flex items-center justify-center gap-2"
            >
              <UserIcon className="w-4 h-4 text-blue-400" />
              <span>{user ? (lang === 'bn' ? 'স্টুডেন্ট ড্যাশবোর্ড' : 'Student Dashboard') : (lang === 'bn' ? 'গুগল দিয়ে লগইন করুন' : 'Sign in with Google')}</span>
            </button>

            <button
              id="mobile-nav-code-btn"
              onClick={() => {
                playClickSound();
                setMobileOpen(false);
                onOpenCodeView();
              }}
              className="w-full py-3 rounded-xl bg-white/5 text-blue-400 border border-white/10 text-xs font-mono font-bold flex items-center justify-center gap-2"
            >
              <Code2 className="w-4 h-4" />
              <span>HTML, CSS & Three.js Code</span>
            </button>

            <button
              id="mobile-nav-enroll-btn"
              onClick={() => {
                playClickSound();
                setMobileOpen(false);
                onOpenEnroll();
              }}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
            >
              <span>{lang === 'bn' ? 'ফ্রি ট্রায়াল শুরু করুন' : 'Start Free Trial'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
