/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStudentData } from '../hooks/useStudentData';
import { Language } from '../types';
import { playClickSound } from '../utils/audio';
import { 
  X, 
  BookOpen, 
  Calendar, 
  Video, 
  Map, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  LogOut, 
  User as UserIcon,
  ShieldCheck,
  ExternalLink,
  Flame,
  Radio
} from 'lucide-react';

interface StudentDashboardModalProps {
  lang: Language;
  onClose: () => void;
  onOpenEnroll: () => void;
}

export const StudentDashboardModal: React.FC<StudentDashboardModalProps> = ({
  lang,
  onClose,
  onOpenEnroll,
}) => {
  const { user, signIn, signOutUser } = useAuth();
  const { enrollments, mentorBookings, workshops, savedRoadmaps, loading } = useStudentData();
  const [activeTab, setActiveTab] = useState<'courses' | 'mentors' | 'workshops' | 'roadmaps'>('courses');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#050508]/95 rounded-3xl border border-white/10 p-5 sm:p-8 shadow-2xl backdrop-blur-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          id="close-student-dashboard-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Profile / Auth Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div className="flex items-center gap-3.5">
            {user ? (
              <div className="relative">
                <img
                  src={user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                  alt={user.displayName || 'User'}
                  referrerPolicy="no-referrer"
                  className="w-13 h-13 rounded-2xl object-cover border-2 border-blue-500/40 shadow-lg shadow-blue-500/20"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#050508]" />
              </div>
            ) : (
              <div className="w-13 h-13 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                <UserIcon className="w-6 h-6" />
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white font-heading">
                  {user ? (user.displayName || 'Fleearn Student') : (lang === 'bn' ? 'স্টুডেন্ট পোর্টাল' : 'Student Portal')}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono flex items-center gap-1">
                  <Radio className="w-2.5 h-2.5 animate-pulse" />
                  Firebase Cloud Sync
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {user ? user.email : (lang === 'bn' ? 'আপনার কোর্স ও বুকিং ট্র্যাক করতে লগইন করুন' : 'Sign in to access real-time enrollments & bookings')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <button
                id="dashboard-signout-btn"
                onClick={() => {
                  playClickSound();
                  signOutUser();
                }}
                className="px-3.5 py-2 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span>{lang === 'bn' ? 'লগআউট' : 'Sign Out'}</span>
              </button>
            ) : (
              <button
                id="dashboard-signin-btn"
                onClick={() => {
                  playClickSound();
                  signIn();
                }}
                className="px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{lang === 'bn' ? 'গুগল দিয়ে লগইন করুন' : 'Sign in with Google'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 pt-4 pb-3 overflow-x-auto text-xs font-mono border-b border-white/5">
          {[
            { id: 'courses' as const, label: lang === 'bn' ? 'আমার কোর্সসমূহ' : 'My Courses', count: enrollments.length, icon: BookOpen },
            { id: 'mentors' as const, label: lang === 'bn' ? '১-অন-১ মেন্টরিং' : '1-on-1 Sessions', count: mentorBookings.length, icon: Calendar },
            { id: 'workshops' as const, label: lang === 'bn' ? 'লাইভ মাস্টারক্লাস' : 'Masterclasses', count: workshops.length, icon: Video },
            { id: 'roadmaps' as const, label: lang === 'bn' ? 'সংরক্ষিত রোডম্যাপ' : 'Saved Roadmaps', count: savedRoadmaps.length, icon: Map },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playClickSound();
                  setActiveTab(tab.id);
                }}
                className={`py-2 px-3.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-blue-600/25 border border-blue-500/40 text-white font-bold shadow-md shadow-blue-600/20'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-blue-400' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${active ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-400'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
          {!user ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-blue-400">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-white">
                {lang === 'bn' ? 'ক্লাউড ডেটাবেজে সংরক্ষিত রেকর্ড দেখুন' : 'Access Your Real-Time Learning Records'}
              </h4>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                {lang === 'bn'
                  ? 'গুগল অ্যাকাউন্ট দিয়ে লগইন করলেই ফায়ারবেস ক্লাউড স্টোরেজে আপনার কোর্স ও সেশন স্বয়ংক্রিয়ভাবে সংরক্ষিত থাকবে।'
                  : 'Sign in to persist admissions, mentor sessions, and tailored career blueprints securely in Google Cloud Firestore.'}
              </p>
              <button
                onClick={() => {
                  playClickSound();
                  signIn();
                }}
                className="px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'bn' ? 'গুগল দিয়ে প্রবেশ করুন' : 'Sign in with Google'}</span>
              </button>
            </div>
          ) : loading ? (
            <div className="text-center py-12 text-xs font-mono text-gray-400 flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <span>Syncing from Firestore...</span>
            </div>
          ) : (
            <>
              {/* Courses Tab */}
              {activeTab === 'courses' && (
                <div>
                  {enrollments.length === 0 ? (
                    <div className="text-center py-10 space-y-3">
                      <p className="text-xs text-gray-400">
                        {lang === 'bn' ? 'আপনি এখনো কোনো কোর্সে ভর্তি হননি।' : 'No enrolled courses found yet.'}
                      </p>
                      <button
                        onClick={() => {
                          playClickSound();
                          onClose();
                          onOpenEnroll();
                        }}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <Flame className="w-3.5 h-3.5" />
                        <span>{lang === 'bn' ? 'কোর্সসমূহ দেখুন' : 'Explore Courses'}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {enrollments.map((en) => (
                        <div
                          key={en.id}
                          className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono border border-blue-500/20">
                                {en.status.toUpperCase()}
                              </span>
                              <span className="text-[10px] font-mono text-gray-400">
                                {en.paymentMethod.toUpperCase()} (৳{en.priceBDT.toLocaleString()})
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-white mt-1 font-heading">{en.courseTitle}</h4>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">Student: {en.studentName} ({en.phone})</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Enrolled</span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Mentors Tab */}
              {activeTab === 'mentors' && (
                <div>
                  {mentorBookings.length === 0 ? (
                    <div className="text-center py-10 space-y-3">
                      <p className="text-xs text-gray-400">
                        {lang === 'bn' ? 'কোনো মেন্টর কনসাল্টেশন বুক করা হয়নি।' : 'No 1-on-1 mentor sessions scheduled yet.'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {mentorBookings.map((mb) => (
                        <div
                          key={mb.id}
                          className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-mono border border-purple-500/20">
                                {mb.status.toUpperCase()}
                              </span>
                              <span className="text-[10px] font-mono text-gray-400">
                                Preferred Date: {mb.preferredDate}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-white mt-1 font-heading">
                              1-on-1 with {mb.mentorName}
                            </h4>
                            <p className="text-xs text-gray-400 mt-0.5">Attendee: {mb.studentName}</p>
                          </div>
                          <div className="px-3 py-1.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-mono flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Scheduled</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Workshops Tab */}
              {activeTab === 'workshops' && (
                <div>
                  {workshops.length === 0 ? (
                    <div className="text-center py-10 space-y-3">
                      <p className="text-xs text-gray-400">
                        {lang === 'bn' ? 'কোনো মাস্টারক্লাসে সিট বুক করা হয়নি।' : 'No live masterclasses reserved yet.'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {workshops.map((ws) => (
                        <div
                          key={ws.id}
                          className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between"
                        >
                          <div>
                            <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 text-[10px] font-mono border border-rose-500/20">
                              LIVE WORKSHOP
                            </span>
                            <h4 className="text-sm font-bold text-white mt-1 font-heading">{ws.workshopTitle}</h4>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">Invited: {ws.email}</p>
                          </div>
                          <span className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                            Seat Confirmed
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Roadmaps Tab */}
              {activeTab === 'roadmaps' && (
                <div>
                  {savedRoadmaps.length === 0 ? (
                    <div className="text-center py-10 space-y-3">
                      <p className="text-xs text-gray-400">
                        {lang === 'bn' ? 'কোনো কাস্টম রোডম্যাপ সংরক্ষিত নেই।' : 'No saved roadmaps in your cloud vault.'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {savedRoadmaps.map((rm) => (
                        <div
                          key={rm.id}
                          className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between"
                        >
                          <div>
                            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-mono border border-blue-500/20">
                              6-MONTH SPRINT
                            </span>
                            <h4 className="text-sm font-bold text-white mt-1 font-heading">{rm.title}</h4>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">
                              {rm.background} • {rm.goal} • {rm.commitment}
                            </p>
                          </div>
                          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
                            Saved
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
