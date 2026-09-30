import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { LIVE_MASTERCLASSES } from '../data/fleearnData';
import { playClickSound, playSuccessChime } from '../utils/audio';
import { Video, Calendar, Clock, Users, Sparkles, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

interface LiveWorkshopBannerProps {
  lang: Language;
}

export const LiveWorkshopBanner: React.FC<LiveWorkshopBannerProps> = ({ lang }) => {
  const { user, signIn } = useAuth();
  const [reserved, setReserved] = useState<{ [key: string]: boolean }>({});
  const [activeEmail, setActiveEmail] = useState<string>(user?.email || '');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [reserveError, setReserveError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.email && !activeEmail) {
      setActiveEmail(user.email);
    }
  }, [user]);

  const handleReserveSeat = async (id: string) => {
    playClickSound();
    setReserveError(null);

    if (!user) {
      try {
        await signIn();
      } catch (err) {
        setReserveError(lang === 'bn' ? 'অনুগ্রহ করে গুগলে সাইন ইন করে সিট বুক করুন।' : 'Please sign in with Google to reserve your seat.');
        return;
      }
      return;
    }

    const workshop = LIVE_MASTERCLASSES.find((w) => w.id === id) || LIVE_MASTERCLASSES[0];
    const emailToUse = activeEmail.trim() || user.email || '';

    if (!emailToUse) {
      setReserveError(lang === 'bn' ? 'একটি সঠিক ইমেইল অ্যাড্রেস লিখুন।' : 'Please provide a valid email.');
      return;
    }

    setIsSubmitting(true);
    const regId = `ws_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const regPath = `workshop_registrations/${regId}`;

    try {
      await setDoc(doc(db, 'workshop_registrations', regId), {
        userId: user.uid,
        workshopId: workshop.id,
        workshopTitle: workshop.title.en,
        email: emailToUse,
        createdAt: serverTimestamp(),
      });

      setIsSubmitting(false);
      setReserved((prev) => ({ ...prev, [id]: true }));
      playSuccessChime();
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.8 },
      });
    } catch (error) {
      setIsSubmitting(false);
      setReserveError(lang === 'bn' ? 'সিট বুক করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।' : 'Failed to reserve seat. Please try again.');
      handleFirestoreError(error, OperationType.CREATE, regPath);
    }
  };

  return (
    <section id="workshops" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-10 rounded-3xl bg-white/5 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-md">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Description */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-rose-400 text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                <span>{lang === 'bn' ? 'আসন্ন ফ্রি লাইভ ওয়ার্কশপ' : 'UPCOMING LIVE FREE MASTERCLASS'}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tight">
                {LIVE_MASTERCLASSES[0].title[lang]}
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed">
                {lang === 'bn'
                  ? `ইন্সট্রাক্টর: ${LIVE_MASTERCLASSES[0].instructor}। সরাসরি ৩ডি প্রজেক্ট কোডিং ও ক্লায়েন্ট ক্লোজিং লাইভ দেখুন। কোনো প্রকার ফি ছাড়াই রেজিস্ট্রেশন করুন।`
                  : `Instructor: ${LIVE_MASTERCLASSES[0].instructor}. Watch live 3D web development and high-ticket freelance proposal breakdown.`}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-blue-400 pt-2">
                <div className="flex items-center gap-1.5 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>{LIVE_MASTERCLASSES[0].date}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{LIVE_MASTERCLASSES[0].time}</span>
                </div>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  {lang === 'bn' ? 'আসন সংখ্যা সীমিত:' : 'Seats Remaining:'}
                </span>
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  {LIVE_MASTERCLASSES[0].seatsLeft} / {LIVE_MASTERCLASSES[0].totalSeats} {lang === 'bn' ? 'সিট বাকি' : 'Left'}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full w-[85%]" />
              </div>

              {reserved[LIVE_MASTERCLASSES[0].id] ? (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1 animate-fade-in">
                  <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm">
                    <Check className="w-4 h-4" />
                    <span>{lang === 'bn' ? 'আপনার সিট রিজার্ভ করা হয়েছে!' : 'Seat Successfully Reserved!'}</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    {lang === 'bn'
                      ? 'জুম / গুগল মিট লাইভ লিংক আপনার ইমেইলে পাঠিয়ে দেওয়া হয়েছে।'
                      : 'Live Google Meet link will be dispatched 30 minutes before showtime.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    id="workshop-email-input"
                    type="email"
                    placeholder={lang === 'bn' ? 'আপনার ইমেইল অ্যাড্রেস লিখুন' : 'Enter your email for the live link'}
                    value={activeEmail}
                    onChange={(e) => setActiveEmail(e.target.value)}
                    className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:border-blue-500 focus:outline-none"
                  />
                  {reserveError && (
                    <p className="text-xs text-rose-400 font-mono bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-xl">
                      {reserveError}
                    </p>
                  )}
                  <button
                    id="reserve-masterclass-seat-btn"
                    onClick={() => handleReserveSeat(LIVE_MASTERCLASSES[0].id)}
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{lang === 'bn' ? 'সংরক্ষণ হচ্ছে...' : 'Reserving in Firestore...'}</span>
                      </>
                    ) : (
                      <>
                        <span>{lang === 'bn' ? 'ফ্রি সিট বুক করুন (১০০% ফ্রি)' : 'Claim Free Seat Now'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
