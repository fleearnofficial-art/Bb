import React, { useState, useEffect } from 'react';
import { Mentor, Language } from '../types';
import { MENTORS_DATA } from '../data/fleearnData';
import { playClickSound, playSuccessChime } from '../utils/audio';
import { Sparkles, Star, Users, DollarSign, Award, Calendar, Check, X, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

interface MentorsSectionProps {
  lang: Language;
}

export const MentorsSection: React.FC<MentorsSectionProps> = ({ lang }) => {
  const { user, signIn } = useAuth();
  const [activeBookingMentor, setActiveBookingMentor] = useState<Mentor | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    name: user?.displayName || '', 
    email: user?.email || '', 
    date: '', 
    goal: '' 
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.displayName || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  const handleBookConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);

    if (!user) {
      try {
        await signIn();
      } catch (err) {
        setBookingError(lang === 'bn' ? 'বুকিং সম্পন্ন করতে অনুগ্রহ করে গুগলে সাইন ইন করুন।' : 'Please sign in with Google to book your session.');
        return;
      }
      return;
    }

    if (!activeBookingMentor) return;

    setIsSubmitting(true);
    const bookingId = `mb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const bookingPath = `mentor_bookings/${bookingId}`;

    try {
      await setDoc(doc(db, 'mentor_bookings', bookingId), {
        userId: user.uid,
        mentorId: activeBookingMentor.id,
        mentorName: activeBookingMentor.name,
        studentName: formData.name.trim() || user.displayName || 'Student',
        email: formData.email.trim() || user.email || '',
        preferredDate: formData.date,
        status: 'scheduled',
        createdAt: serverTimestamp(),
      });

      setIsSubmitting(false);
      setBookingSuccess(true);
      playSuccessChime();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        setBookingSuccess(false);
        setActiveBookingMentor(null);
        setFormData({ name: '', email: '', date: '', goal: '' });
      }, 2500);
    } catch (error) {
      setIsSubmitting(false);
      setBookingError(lang === 'bn' ? 'সেশন বুক করতে ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।' : 'Failed to book session. Please try again.');
      handleFirestoreError(error, OperationType.CREATE, bookingPath);
    }
  };

  return (
    <section id="mentors" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-4">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <Award className="w-3.5 h-3.5" />
              {lang === 'bn' ? 'টপ-রেটেড ইন্ডাস্ট্রি মেন্টরবৃন্দ' : 'TOP-TIER FREELANCE LEADERS'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-heading tracking-tight">
            {lang === 'bn' ? (
              <>
                সরাসরি শিখুন <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">টপ-রেটেড ফ্রিল্যান্সারদের থেকে</span>
              </>
            ) : (
              <>
                Learn Directly from <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Six-Figure Practitioners</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            {lang === 'bn'
              ? 'আপওয়ার্ক ও ফাইভার টপ-রেটেড প্লাস এবং গ্লোবাল এজেন্সির মেন্টরদের সাথে সরাসরি ১-অন-১ কনসাল্টেশন ও প্রজেক্ট রিভিউ।'
              : 'Our mentors have generated hundreds of thousands of dollars in international contracts and are here to guide your exact journey.'}
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MENTORS_DATA.map((mentor) => (
            <div
              key={mentor.id}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between group backdrop-blur-md hover:-translate-y-1"
            >
              <div>
                {/* Mentor Photo & Badge */}
                <div className="relative mb-4">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-48 rounded-2xl object-cover border border-white/10 group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-amber-300 text-[11px] font-mono font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{mentor.rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-blue-400 text-[11px] font-mono">
                    {mentor.platform}
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors font-heading">
                  {mentor.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1 font-medium">{mentor.title[lang]}</p>

                {/* Earnings Proof */}
                <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-xs font-mono">
                  <div className="flex items-center justify-between text-gray-400">
                    <span>{lang === 'bn' ? 'মোট আর্নিং:' : 'Total Verified:'}</span>
                    <span className="text-emerald-400 font-bold">{mentor.earnings}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-400">
                    <span>{lang === 'bn' ? 'শিক্ষার্থী সংখ্যা:' : 'Mentored:'}</span>
                    <span className="text-blue-400 font-bold">{mentor.studentsMentored}+</span>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {mentor.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  id={`mentor-book-btn-${mentor.id}`}
                  onClick={() => {
                    playClickSound();
                    setActiveBookingMentor(mentor);
                  }}
                  className="w-full py-2.5 px-3 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white border border-white/10 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>{lang === 'bn' ? '১-অন-১ সেশন বুক করুন' : 'Book 1-on-1 Session'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {activeBookingMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#050508]/95 rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            <button
              id="close-booking-modal-btn"
              onClick={() => setActiveBookingMentor(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-heading">
                  {lang === 'bn' ? 'সেশন বুকিং সম্পন্ন হয়েছে!' : 'Consultation Booked!'}
                </h3>
                <p className="text-sm text-gray-300">
                  {lang === 'bn'
                    ? `আপনার মিটিং লিঙ্ক ও শিডিউল ইমেইলে পাঠিয়ে দেওয়া হয়েছে। মেন্টর ${activeBookingMentor.name} এর সাথে লাইভ মিটে দেখা হবে!`
                    : `Calendar invitation & meeting link sent to your email. See you live with ${activeBookingMentor.name}!`}
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookConsultation} className="space-y-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-mono">
                    1-on-1 Career Mentoring
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2 font-heading">
                    {lang === 'bn' ? `${activeBookingMentor.name} এর সাথে সেশন` : `Session with ${activeBookingMentor.name}`}
                  </h3>
                  <p className="text-xs text-gray-400">{activeBookingMentor.title[lang]}</p>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">
                    {lang === 'bn' ? 'আপনার পূর্ণ নাম' : 'Your Full Name'}
                  </label>
                  <input
                    id="booking-name-input"
                    required
                    type="text"
                    placeholder="e.g. Tanvir Karim"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">
                    {lang === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
                  </label>
                  <input
                    id="booking-email-input"
                    required
                    type="email"
                    placeholder="name@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">
                    {lang === 'bn' ? 'কাঙ্ক্ষিত তারিখ ও সময়' : 'Preferred Date & Time'}
                  </label>
                  <input
                    id="booking-date-input"
                    required
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:border-blue-500 focus:outline-none cursor-pointer"
                  />
                </div>

                {bookingError && (
                  <p className="text-xs text-rose-400 font-mono bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-xl">
                    {bookingError}
                  </p>
                )}

                <button
                  id="booking-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/20 transition-all cursor-pointer mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{lang === 'bn' ? 'বুকিং সংরক্ষিত হচ্ছে...' : 'Saving to Firestore...'}</span>
                    </>
                  ) : (
                    <span>{lang === 'bn' ? 'ফ্রি সেশন কনফার্ম করুন' : 'Confirm Free 1-on-1 Session'}</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
