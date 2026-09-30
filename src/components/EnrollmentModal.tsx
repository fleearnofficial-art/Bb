import React, { useState, useEffect } from 'react';
import { Course, Language } from '../types';
import { playClickSound, playSuccessChime } from '../utils/audio';
import { X, Check, ShieldCheck, CreditCard, Sparkles, Flame, Clock, Radio, User as UserIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

interface EnrollmentModalProps {
  course: Course | null;
  lang: Language;
  onClose: () => void;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ course, lang, onClose }) => {
  const { user, signIn } = useAuth();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'card'>('bkash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      if (!name && user.displayName) setName(user.displayName);
      if (!email && user.email) setEmail(user.email);
    }
  }, [user]);

  if (!course) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!user) {
      // Prompt user to sign in first to bind record to their Google ID
      try {
        await signIn();
      } catch (err) {
        setSubmitError(lang === 'bn' ? 'দয়া করে গুগলে সাইন ইন করে এগিয়ে যান।' : 'Please sign in with Google to continue.');
        return;
      }
      return;
    }

    setIsSubmitting(true);
    const enrollmentId = `enr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const enrollmentPath = `enrollments/${enrollmentId}`;

    try {
      await setDoc(doc(db, 'enrollments', enrollmentId), {
        userId: user.uid,
        courseId: course.id,
        courseTitle: course.title.en,
        studentName: name.trim() || user.displayName || 'Student',
        email: email.trim() || user.email || '',
        phone: phone.trim() || 'N/A',
        paymentMethod,
        priceBDT: course.discountBDT,
        status: 'active',
        createdAt: serverTimestamp(),
      });

      setIsSubmitting(false);
      playSuccessChime();
      setStep('success');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(lang === 'bn' ? 'ভর্তি প্রক্রিয়াকরণে সমস্যা হয়েছে। আবার চেষ্টা করুন।' : 'Failed to record enrollment. Please try again.');
      handleFirestoreError(error, OperationType.CREATE, enrollmentPath);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#050508]/95 rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <button
          id="close-enrollment-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'success' ? (
          <div className="text-center py-6 space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white font-heading">
              {lang === 'bn' ? 'অভিনন্দন! রেজিস্ট্রেশন সফল হয়েছে 🎉' : 'Welcome to Fleearn Academy! 🎉'}
            </h3>
            <p className="text-sm text-gray-300">
              {lang === 'bn'
                ? `আপনার ইমেইলে (${email}) স্টুডেন্ট পোর্টাল ও ডিসকর্ড কমিউনিটির ইনভাইটেশন পাঠানো হয়েছে। ক্লাসের সব এক্সেস প্রস্তুত!`
                : `Student dashboard credentials and Discord VIP invites have been sent to ${email}.`}
            </p>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-blue-400">
              {lang === 'bn' ? 'কোর্স: ' : 'Course: '} {course.title[lang]}
            </div>
            <button
              id="success-close-btn"
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors cursor-pointer"
            >
              {lang === 'bn' ? 'পোর্টালে প্রবেশ করুন' : 'Go to Student Portal'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-mono">
                  {course.categoryLabel[lang]}
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  {Math.round(((course.priceBDT - course.discountBDT) / course.priceBDT) * 100)}% Discount
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-2 font-heading">
                {course.title[lang]}
              </h3>
            </div>

            {/* Price Preview */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-gray-400 block">{lang === 'bn' ? 'মোট কোর্স ফি:' : 'Total Admission:'}</span>
                <div className="text-2xl font-bold text-white font-mono">
                  ৳{course.discountBDT.toLocaleString()}{' '}
                  <span className="text-xs text-gray-500 line-through">৳{course.priceBDT.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-right text-xs font-mono text-gray-400">
                <div className="text-blue-400">${course.discountUSD} USD</div>
                <div className="text-[10px] text-gray-500">{course.duration}</div>
              </div>
            </div>

            {/* Inputs */}
            <div>
              <label className="text-xs font-mono text-gray-400 block mb-1">
                {lang === 'bn' ? 'আপনার নাম' : 'Full Name'}
              </label>
              <input
                id="enroll-name-input"
                required
                type="text"
                placeholder="e.g. Arif Hossain"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-gray-400 block mb-1">
                {lang === 'bn' ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
              </label>
              <input
                id="enroll-email-input"
                required
                type="email"
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-gray-400 block mb-1">
                {lang === 'bn' ? 'মোবাইল / হোয়াটসঅ্যাপ নম্বর' : 'Phone / WhatsApp'}
              </label>
              <input
                id="enroll-phone-input"
                required
                type="tel"
                placeholder="+880 1700-000000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="text-xs font-mono text-gray-400 block mb-1.5">
                {lang === 'bn' ? 'পেমেন্ট মেথড বেছে নিন' : 'Select Payment Gateway'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'bkash' as const, label: 'bKash (বিকাশ)' },
                  { id: 'nagad' as const, label: 'Nagad (নগদ)' },
                  { id: 'card' as const, label: 'Card / USD' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    id={`payment-${pm.id}-btn`}
                    onClick={() => {
                      playClickSound();
                      setPaymentMethod(pm.id);
                    }}
                    className={`py-2.5 px-1 rounded-2xl text-xs font-mono border text-center transition-all cursor-pointer ${
                      paymentMethod === pm.id
                        ? 'bg-blue-600/30 border-blue-400 text-white font-bold'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {pm.label}
                  </button>
                ))}
              </div>
            </div>

            {submitError && (
              <p className="text-xs text-rose-400 font-mono bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-xl">
                {submitError}
              </p>
            )}

            {!user && (
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-gray-400">
                <span>{lang === 'bn' ? 'স্টুডেন্ট আইডি কানেক্ট করতে' : 'Connect account to sync'}</span>
                <button
                  type="button"
                  onClick={signIn}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  {lang === 'bn' ? 'গুগল সাইন-ইন' : 'Google Sign-In'}
                </button>
              </div>
            )}

            <button
              id="confirm-admission-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all cursor-pointer mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{lang === 'bn' ? 'ফায়ারবেসে সংরক্ষণ হচ্ছে...' : 'Saving to Firestore Cloud...'}</span>
                </>
              ) : (
                <span>{lang === 'bn' ? 'ভর্তি নিশ্চিত করুন ও শুরু করুন' : 'Confirm Admission & Start Learning'}</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
