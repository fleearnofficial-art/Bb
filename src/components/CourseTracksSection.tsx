import React, { useState } from 'react';
import { Course, Language } from '../types';
import { COURSES_DATA } from '../data/fleearnData';
import { playClickSound } from '../utils/audio';
import { 
  Sparkles, 
  Code2, 
  Palette, 
  TrendingUp, 
  Film, 
  Smartphone, 
  Cpu, 
  Star, 
  Users, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  X,
  Award
} from 'lucide-react';

interface CourseTracksSectionProps {
  lang: Language;
  onEnrollCourse: (course: Course) => void;
}

export const CourseTracksSection: React.FC<CourseTracksSectionProps> = ({ lang, onEnrollCourse }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalCourse, setActiveModalCourse] = useState<Course | null>(null);

  const categories = [
    { id: 'all', label: lang === 'bn' ? 'সব কোর্স (All)' : 'All Programs', icon: Sparkles },
    { id: 'web-dev', label: lang === 'bn' ? 'ওয়েব ও ৩ডি (Web 3D)' : 'Web & 3D Dev', icon: Code2 },
    { id: 'ai-prompt', label: lang === 'bn' ? 'এআই ও অটোমেশন (AI)' : 'AI & Automation', icon: Cpu },
    { id: 'ui-ux-3d', label: lang === 'bn' ? 'ইউআই/ইউএক্স ৩ডি' : 'UI/UX & 3D', icon: Palette },
    { id: 'freelancing', label: lang === 'bn' ? 'ফ্রিল্যান্সিং ক্যারিয়ার' : 'Freelance Agency', icon: TrendingUp },
    { id: 'video-editing', label: lang === 'bn' ? 'ভিডিও ও মোশন সিজিআই' : 'Video & CGI VFX', icon: Film },
    { id: 'app-dev', label: lang === 'bn' ? 'মোবাইল অ্যাপস' : 'Mobile Apps', icon: Smartphone },
  ];

  const filteredCourses = selectedCategory === 'all'
    ? COURSES_DATA
    : COURSES_DATA.filter((c) => c.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web-dev': return Code2;
      case 'ai-prompt': return Cpu;
      case 'ui-ux-3d': return Palette;
      case 'freelancing': return TrendingUp;
      case 'video-editing': return Film;
      case 'app-dev': return Smartphone;
      default: return Sparkles;
    }
  };

  return (
    <section id="courses" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-4">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {lang === 'bn' ? 'হাই-ডিমান্ড প্রিমিয়াম কোর্স ও ট্র‍্যাক' : 'CAREER-ACCELERATOR TRACKS'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-heading tracking-tight">
            {lang === 'bn' ? (
              <>
                মার্কেট-রেডি স্কিল শিখে <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">ফ্রিল্যান্স ক্যারিয়ার গড়ুন</span>
              </>
            ) : (
              <>
                Master Modern Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Scale Your Income</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            {lang === 'bn'
              ? 'বাস্তব প্রজেক্ট, ৩ডি ইন্টারেক্টিভ লার্নিং এবং আপওয়ার্ক টপ-রেটেড মেন্টরদের সরাসরি দিকনির্দেশনায় তৈরি প্রতিটি ট্র্যাক।'
              : 'Production-ready curriculums created with Top-Rated mentors to turn you into a high-earning independent creator.'}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-filter-${cat.id}`}
                onClick={() => {
                  playClickSound();
                  setSelectedCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black font-bold shadow-lg shadow-white/10'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:bg-white/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const Icon = getCategoryIcon(course.category);
            return (
              <div
                key={course.id}
                className="group relative rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] backdrop-blur-md"
              >
                {/* Card Top: Badge & Category */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
                      <Icon className="w-3.5 h-3.5 text-blue-400" />
                      <span>{course.categoryLabel[lang]}</span>
                    </div>

                    {course.badge && (
                      <span className="px-3 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-blue-500/10 border border-blue-500/30 text-blue-400">
                        {course.badge[lang]}
                      </span>
                    )}
                  </div>

                  {/* Course Title & Subtitle */}
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors font-heading line-clamp-2">
                    {course.title[lang]}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed">
                    {course.subtitle[lang]}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {course.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {course.technologies.length > 4 && (
                      <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-gray-400">
                        +{course.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-5 space-y-2 pt-4 border-t border-white/10">
                    {course.features[lang].slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Mentor Preview */}
                  <div className="mt-5 p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={course.mentor.avatar}
                        alt={course.mentor.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border border-blue-400/40"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">{course.mentor.name}</div>
                        <div className="text-[11px] text-gray-400 truncate max-w-[160px]">{course.mentor.company}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-mono text-gray-400">{lang === 'bn' ? 'রেটিং' : 'Rating'}</div>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{course.mentor.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Bar */}
                  <div className="mt-4 grid grid-cols-3 gap-2 py-2 px-3 rounded-2xl bg-white/5 border border-white/10 text-center font-mono text-xs">
                    <div>
                      <div className="text-gray-400 text-[10px] flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{lang === 'bn' ? 'মেয়াদ' : 'Time'}</span>
                      </div>
                      <div className="text-gray-200 font-semibold mt-0.5 text-[11px]">{course.duration}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-[10px] flex items-center justify-center gap-1">
                        <Award className="w-3 h-3" />
                        <span>{lang === 'bn' ? 'প্রজেক্ট' : 'Apps'}</span>
                      </div>
                      <div className="text-blue-400 font-semibold mt-0.5 text-[11px]">{course.projectsCount}+ লাইভ</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-[10px] flex items-center justify-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{lang === 'bn' ? 'শিক্ষার্থী' : 'Students'}</span>
                      </div>
                      <div className="text-emerald-400 font-semibold mt-0.5 text-[11px]">{course.studentsCount}</div>
                    </div>
                  </div>
                </div>

                {/* Card Bottom: Pricing & Actions */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-xs text-gray-400 block">{lang === 'bn' ? 'কোর্স ফি (ফুল অ্যাক্সেস):' : 'Course Fee:'}</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white font-mono">
                          ৳{course.discountBDT.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500 line-through font-mono">
                          ৳{course.priceBDT.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        {Math.round(((course.priceBDT - course.discountBDT) / course.priceBDT) * 100)}% OFF
                      </span>
                      <div className="text-xs text-gray-400 font-mono mt-0.5">(${course.discountUSD} USD)</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id={`course-view-syllabus-btn-${course.id}`}
                      onClick={() => {
                        playClickSound();
                        setActiveModalCourse(course);
                      }}
                      className="py-2.5 px-3 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                      <span>{lang === 'bn' ? 'সিলেবাস' : 'Syllabus'}</span>
                    </button>

                    <button
                      id={`course-enroll-btn-${course.id}`}
                      onClick={() => {
                        playClickSound();
                        onEnrollCourse(course);
                      }}
                      className="py-2.5 px-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 transition-all cursor-pointer group/btn"
                    >
                      <span>{lang === 'bn' ? 'এনরোল করুন' : 'Enroll Now'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Syllabus Modal */}
      {activeModalCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel-active rounded-3xl border border-indigo-500/40 p-6 sm:p-8 shadow-2xl">
            <button
              id="close-syllabus-modal-btn"
              onClick={() => setActiveModalCourse(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pr-8">
              <span className="px-3 py-1 rounded-md bg-indigo-950/80 border border-indigo-500/40 text-cyan-300 text-xs font-mono">
                {activeModalCourse.categoryLabel[lang]}
              </span>
              <h3 className="text-2xl font-bold text-white mt-3 font-heading">
                {activeModalCourse.title[lang]}
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                {activeModalCourse.subtitle[lang]}
              </p>
            </div>

            {/* Syllabus breakdown */}
            <div className="mt-8 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono">
                {lang === 'bn' ? 'মডিউল ও সিলেবাস ব্রেকডাউন:' : 'Curriculum & Modules:'}
              </h4>
              {activeModalCourse.syllabus.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-300 mb-1">
                    <span>{item.week}</span>
                    <span className="text-slate-500">Module 0{idx + 1}</span>
                  </div>
                  <h5 className="text-base font-bold text-white">{item.title[lang]}</h5>
                  <ul className="mt-3 space-y-1.5">
                    {item.topics[lang].map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Modal Bottom CTA */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs text-slate-400">{lang === 'bn' ? 'অফার প্রাইস:' : 'Offer Price:'}</div>
                <div className="text-2xl font-black text-white font-mono">
                  ৳{activeModalCourse.discountBDT.toLocaleString()}
                </div>
              </div>

              <button
                id="modal-enroll-confirm-btn"
                onClick={() => {
                  const c = activeModalCourse;
                  setActiveModalCourse(null);
                  onEnrollCourse(c);
                }}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>{lang === 'bn' ? 'এখনই এনরোল করুন' : 'Confirm Enrollment'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
