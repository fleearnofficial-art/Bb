import { Course, Mentor, Testimonial, RoadmapStep, LiveMasterclass } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'fullstack-web3d',
    title: {
      bn: 'ফুলস্ট্যাক ওয়েব ডেভেলপমেন্ট ও 3D এক্সপেরিয়েন্স',
      en: 'Modern Full-Stack Web & 3D Interactive Masterclass'
    },
    subtitle: {
      bn: 'Next.js 15, TypeScript, Tailwind CSS, Three.js, Node.js & ফ্রিল্যান্স প্রজেক্টস',
      en: 'Next.js 15, TypeScript, Three.js 3D, Node.js Backend & Real Upwork Gig Mastery'
    },
    category: 'web-dev',
    categoryLabel: {
      bn: 'ওয়েব ও ৩ডি ডেভেলপমেন্ট',
      en: 'Web & 3D Development'
    },
    level: 'All Levels',
    duration: '৫ মাস (১৬০+ ঘণ্টা)',
    projectsCount: 12,
    studentsCount: 3840,
    rating: 4.95,
    reviewsCount: 680,
    priceBDT: 8500,
    priceUSD: 75,
    discountBDT: 5500,
    discountUSD: 49,
    badge: {
      bn: 'বেস্টসেলার ও ফ্ল্যাগশিপ',
      en: 'Bestseller & Flagship',
      type: 'flagship'
    },
    technologies: ['React 19', 'Next.js 15', 'Three.js / WebGL', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Docker'],
    features: {
      bn: [
        'লাইভ ৩ডি ওয়েবসাইট বিল্ডিং প্র্যাকটিস',
        'ক্লায়েন্ট হ্যান্ডলিং ও প্রস্তাবনা লেখার লাইভ ক্লাস',
        '১০+ প্রোডাকশন-রেডি পোর্টফোলিও প্রজেক্ট',
        'লাইফটাইম ডিসকর্ড ভিআইপি কমিউনিটি ও ১-অন-১ সাপোর্ট'
      ],
      en: [
        'Live 3D Website Architecture & Interactive Three.js',
        'High-ticket Client Pitching & Upwork Proposal Mastery',
        '10+ Production-Ready Portfolio Apps',
        'Lifetime VIP Discord Support & 1-on-1 Code Reviews'
      ]
    },
    syllabus: [
      {
        week: 'সপ্তাহ ১ - ৩',
        title: { bn: 'মডার্ন জাভাস্ক্রিপ্ট ও টাইপস্ক্রিপ্ট আর্কিটেকচার', en: 'Modern TypeScript & Frontend Foundations' },
        topics: {
          bn: ['ESNext কনসেপ্টস', 'TypeScript টাইপ সেফটি', 'Async/Await & DOM ইঞ্জিন'],
          en: ['ESNext deep dive', 'TypeScript type safety', 'Async state architecture']
        }
      },
      {
        week: 'সপ্তাহ ৪ - ৭',
        title: { bn: 'React 19 & Next.js 15 স্কেলেবল অ্যাপস', en: 'React 19 & Next.js 15 Server Components' },
        topics: {
          bn: ['App Router & Server Actions', 'State Management & Custom Hooks', 'Tailwind CSS আর্ট'],
          en: ['App Router architecture', 'State management & hooks', 'Modern Tailwind system']
        }
      },
      {
        week: 'সপ্তাহ ৮ - ১১',
        title: { bn: 'Three.js, WebGL ও ইন্টারেক্টিভ 3D ওয়েবসাইট', en: 'Three.js, WebGL & Interactive 3D Web' },
        topics: {
          bn: ['3D সিন, ক্যামেরা ও লাইটিং', 'কাস্টম শেডার্স ও পার্টিকেলস', 'স্মুথ স্ক্রোল ও ইন্টারঅ্যাকশন'],
          en: ['3D Scenes, lights & cameras', 'Custom shaders & particles', 'Smooth scroll integration']
        }
      },
      {
        week: 'সপ্তাহ ১২ - ১৬',
        title: { bn: 'আপওয়ার্ক, ফাইভার ও ইন্টারন্যাশনাল ক্লায়েন্ট উইন', en: 'Upwork, Fiverr & High-Ticket International Freelancing' },
        topics: {
          bn: ['১০০% প্রোফাইল অপটিমাইজেশন', 'উইনিং প্রপোজাল মেথডোলজি', 'পেমেন্ট গেটওয়ে ও ট্যাক্স গাইড'],
          en: ['Profile SEO optimization', 'Winning bid strategies', 'Direct contract negotiation']
        }
      }
    ],
    mentor: {
      name: 'তানভীর আহমেদ',
      role: 'Lead Full-Stack & 3D Creative Engineer',
      company: 'Upwork Top-Rated Plus ($180k+ Earned)',
      rating: 4.98,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    avgFreelanceHourly: '$45 - $95/hr',
    iconName: 'Code2',
    colorTheme: 'from-indigo-500 to-cyan-500'
  },
  {
    id: 'ai-prompt-automation',
    title: {
      bn: 'এআই প্রম্পট ইঞ্জিনিয়ারিং, অটোমেশন ও ফ্রিল্যান্সিং',
      en: 'AI Engineering, Prompt Mastery & Workflow Automation'
    },
    subtitle: {
      bn: 'Gemini, ChatGPT, LangChain, Make.com, n8n & এআই এজেন্ট ডেভেলপমেন্ট',
      en: 'AI Agents, LLM Integration, Multi-Modal Systems, n8n Automation & AI Freelance Agency'
    },
    category: 'ai-prompt',
    categoryLabel: {
      bn: 'এআই ও অটোমেশন',
      en: 'AI & Automation'
    },
    level: 'All Levels',
    duration: '৪ মাস (১২০+ ঘণ্টা)',
    projectsCount: 15,
    studentsCount: 4210,
    rating: 4.97,
    reviewsCount: 790,
    priceBDT: 7500,
    priceUSD: 69,
    discountBDT: 4800,
    discountUSD: 42,
    badge: {
      bn: 'সবচেয়ে চাহিদাসম্পন্ন ২০২৬',
      en: 'Most In-Demand 2026',
      type: 'hot'
    },
    technologies: ['Gemini 2.0 / 3.0', 'Python', 'LangChain', 'n8n Workflow', 'Make.com', 'OpenAI API', 'Vector DB', 'Voice AI'],
    features: {
      bn: [
        'কাস্টম এআই চ্যাটবট ও এজেন্ট তৈরির হ্যান্ডস-অন মেথড',
        'বিজনেস অটোমেশন থেকে মাসে $২০০০+ আয়ের ব্লুপ্রিন্ট',
        'এআই কনটেন্ট ও এসইও সিস্টেম অটোমেশন',
        'রিয়েল ইউএস/ইউকে ক্লায়েন্টের লাইভ প্রজেক্ট অডিট'
      ],
      en: [
        'Build custom autonomous AI agents & voice bots',
        'Business automation pipeline for $2,000+/mo freelance contracts',
        'Automated AI content & intelligent data workflows',
        'Live US/EU agency project audits & templates'
      ]
    },
    syllabus: [
      {
        week: 'সপ্তাহ ১ - ৩',
        title: { bn: 'অ্যাডভান্সড প্রম্পটিং ফ্রেমওয়ার্কস', en: 'Advanced Prompting & Mental Models' },
        topics: {
          bn: ['চেন-অব-থট (CoT)', 'ফিউ-শট লার্নিং আর্ট', 'সিস্টেম প্রম্পট ইঞ্জিনিয়ারিং'],
          en: ['Chain-of-Thought prompting', 'Few-shot pattern matching', 'System prompt architecture']
        }
      },
      {
        week: 'সপ্তাহ ৪ - ৮',
        title: { bn: 'n8n & Make.com দিয়ে বিজনেস অটোমেশন', en: 'Enterprise Automation with n8n & Make' },
        topics: {
          bn: ['Webhook & API কানেকশন', 'CRM অটোমেশন ও লিড স্ক্যানার', 'AI ডিরেক্টরি ক্রিয়েশন'],
          en: ['Webhooks & REST APIs', 'CRM auto-responder', 'AI Lead qualification engines']
        }
      },
      {
        week: 'সপ্তাহ ৯ - ১২',
        title: { bn: 'কাস্টম এআই এজেন্ট ও পাইথন ইন্টিগ্রেশন', en: 'Custom AI Agents & Python Microservices' },
        topics: {
          bn: ['RAG ও ভেক্টর ডাটাবেজ', 'অটোনোমাস এআই বট', 'ক্লাউড ডেপ্লয়মেন্ট'],
          en: ['RAG & Vector stores', 'Autonomous agents', 'Cloud deployment on GCP']
        }
      }
    ],
    mentor: {
      name: 'সাকিব আল হাসান',
      role: 'AI Solutions Architect & Founder',
      company: 'Ex-AI Lead & Upwork Top-Rated',
      rating: 4.99,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    avgFreelanceHourly: '$50 - $110/hr',
    iconName: 'Sparkles',
    colorTheme: 'from-purple-500 to-pink-500'
  },
  {
    id: 'uiux-3d-motion',
    title: {
      bn: 'প্রিমিয়াম UI/UX ও 3D মোশন ডিজাইন মাস্টারক্লাস',
      en: 'Premium UI/UX, 3D Product & Motion Design Mastery'
    },
    subtitle: {
      bn: 'Figma, Spline 3D, Blender, Design Systems & মাইক্রো-ইন্টারঅ্যাকশন',
      en: 'Figma Auto-Layout, Spline 3D, Blender Holograms, Design Systems & High-Ticket Dribbble Case Studies'
    },
    category: 'ui-ux-3d',
    categoryLabel: {
      bn: 'ইউআই/ইউএক্স ও ৩ডি ডিজাইন',
      en: 'UI/UX & 3D Motion'
    },
    level: 'All Levels',
    duration: '৪.৫ মাস (১৪০+ ঘণ্টা)',
    projectsCount: 10,
    studentsCount: 2950,
    rating: 4.93,
    reviewsCount: 520,
    priceBDT: 8000,
    priceUSD: 70,
    discountBDT: 5200,
    discountUSD: 45,
    badge: {
      bn: 'হাই-কনভার্টিং পোর্টফোলিও',
      en: 'High-Converting Portfolio',
      type: 'popular'
    },
    technologies: ['Figma Pro', 'Spline 3D', 'Blender', 'Design Systems', 'ProtoPie', 'After Effects', 'Webflow'],
    features: {
      bn: [
        'হাই-কনভার্টিং ফিনটেক ও সাস (SaaS) ডিজাইন',
        'Spline 3D দিয়ে ইন্টারঅ্যাকটিভ ওয়েব অ্যাসেট ক্রিয়েশন',
        'Dribbble & Behance টপ-টিয়ার কেস স্টাডি প্রেজেন্টেশন',
        'গ্লোবাল এজেন্সির সাথে রিমোট ইন্টার্নশিপ সুবিধা'
      ],
      en: [
        'High-converting SaaS & Fintech product visual systems',
        'Interactive 3D Web assets with Spline & Blender',
        'Dribbble/Behance case study presentation mastery',
        'Remote agency internship fast-track opportunities'
      ]
    },
    syllabus: [
      {
        week: 'সপ্তাহ ১ - ৪',
        title: { bn: 'ডিজাইন সাইকোলজি ও ফিগমা সিস্টেমস', en: 'Design Psychology & Figma Systems' },
        topics: {
          bn: ['ভিজুয়াল হায়ারার্কি ও কালার থিওরি', 'কম্পোনেন্ট ভেরিয়েন্ট ও অটো-লেআউট', 'ডিজাইন টোকেনস'],
          en: ['Visual hierarchy & contrast', 'Dynamic auto-layouts', 'Design token architectures']
        }
      },
      {
        week: 'সপ্তাহ ৫ - ৮',
        title: { bn: 'Spline 3D ও ইন্টারঅ্যাকটিভ মডেলিং', en: 'Spline 3D & Interactive Web Scenes' },
        topics: {
          bn: ['3D ম্যাটেরিয়াল ও লাইটিং', 'মাইক্রো-অ্যানিমেশন ট্রিগারস', 'রিয়েক্টে ৩ডি এক্সপোর্ট'],
          en: ['3D materials & lighting setup', 'Hover & scroll triggers', 'React/Webflow export']
        }
      },
      {
        week: 'সপ্তাহ ৯ - ১৪',
        title: { bn: 'ফুল প্রোডাক্ট কেস স্টাডি ও ফ্রিল্যান্স সেলস', en: 'Complete SaaS Case Study & International Pitch' },
        topics: {
          bn: ['ইউজার জার্নি ও ওয়্যারফ্রেম', 'ইন্টারেক্টিভ হাই-ফিডেলিটি প্রোটোটাইপ', 'ক্লায়েন্ট পিচিং ফর্মুলা'],
          en: ['User journey & wireframing', 'High-fidelity prototypes', 'Client pricing & contracts']
        }
      }
    ],
    mentor: {
      name: 'ফারহানা ইসলাম মেধা',
      role: 'Principal Product Designer',
      company: 'Silicon Valley Remote Consultant',
      rating: 4.96,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    avgFreelanceHourly: '$40 - $85/hr',
    iconName: 'Palette',
    colorTheme: 'from-amber-500 to-rose-500'
  },
  {
    id: 'freelance-agency-growth',
    title: {
      bn: 'জিরো থেকে ফ্রিল্যান্স এজেন্সি ও ক্লায়েন্ট হান্টিং ব্লুপ্রিন্ট',
      en: 'Zero to $5k/Month Freelance & Agency Mastery Blueprint'
    },
    subtitle: {
      bn: 'Upwork, LinkedIn Lead Gen, Cold Emailing, Contract Closing & Agency Scaling',
      en: 'Upwork Algorithm Mastery, LinkedIn B2B Outreach, Contract Closing & Team Scaling'
    },
    category: 'freelancing',
    categoryLabel: {
      bn: 'ফ্রিল্যান্সিং ও এজেন্সি',
      en: 'Freelance & Business'
    },
    level: 'All Levels',
    duration: '৩ মাস (৯০+ ঘণ্টা)',
    projectsCount: 8,
    studentsCount: 5120,
    rating: 4.98,
    reviewsCount: 1120,
    priceBDT: 6500,
    priceUSD: 59,
    discountBDT: 3999,
    discountUSD: 35,
    badge: {
      bn: 'ইনকাম গ্রোথ বুস্টার',
      en: 'Income Growth Booster',
      type: 'hot'
    },
    technologies: ['Upwork Pro', 'LinkedIn Sales Nav', 'Loom Video Pitches', 'Stripe / Payoneer', 'Apollo.io', 'Contract Law'],
    features: {
      bn: [
        'টপ-রেটেড ফ্রিল্যান্সারদের লাইভ বিডিং ও প্রপোজাল রিভিউ',
        'লিংকডইন দিয়ে হাই-টিকিট ইউএস ও ইউকে বায়ার খোঁজার সিক্রেট',
        'আন্তর্জাতিক ব্যাংক ও পেওনিয়ার ডলার ফান্ড ম্যানেজমেন্ট',
        'সাপ্তাহিক লাইভ ফ্রিল্যান্সিং প্রশ্নোত্তর ও পিচ টেস্ট'
      ],
      en: [
        'Live proposal drafting & bidding breakdown with Top-Rated mentors',
        'B2B LinkedIn outreach framework for high-ticket US/EU clients',
        'Multi-currency payment gateways & contract protection',
        'Weekly live proposal mock audits & real client negotiation calls'
      ]
    },
    syllabus: [
      {
        week: 'সপ্তাহ ১ - ৩',
        title: { bn: 'আপওয়ার্ক ও প্রোফাইল ক্র্যাকিং সিস্টেম', en: 'Upwork Algorithm & Profile Optimization' },
        topics: {
          bn: ['বায়ার সার্চ র‍্যাংকিং অপটিমাইজেশন', '১০০% যেবস উইনিং পোর্টফোলিও সেটআপ', 'কানেক্টস ইনভেস্টমেন্ট স্ট্র্যাটেজি'],
          en: ['SEO algorithm ranking factors', 'Irresistible video intros', 'Connects ROI strategy']
        }
      },
      {
        week: 'সপ্তাহ ৪ - ৭',
        title: { bn: 'কোল্ড আউটরিচ ও লিঙ্কডইন বি২বি লিড জেনারেশন', en: 'Cold Outreach & LinkedIn B2B Lead Engine' },
        topics: {
          bn: ['Apollo.io দিয়ে ডিসিশন মেকার খোঁজা', 'লুম (Loom) ভিডিও পিচিং মেথড', 'ফলো-আপ সাইকোলজি'],
          en: ['Finding CEO/Founders with Apollo', 'Custom Loom video audit pitch', 'High-converting follow-up cycles']
        }
      },
      {
        week: 'সপ্তাহ ৮ - ১২',
        title: { bn: 'এজেন্সি স্কেলিং ও প্রজেক্ট ম্যানেজমেন্ট', en: 'Agency Scaling, Team Building & Retainers' },
        topics: {
          bn: ['মাসিক রিটেইনার ক্লায়েন্ট ক্লোজিং', 'টিম হায়ার ও প্রজেক্ট ডেলিভারি', 'লিজাল এগ্রিমেন্ট ও ট্যাক্স'],
          en: ['Closing $3k/mo retainers', 'Hiring sub-contractors safely', 'International contracts & NDA']
        }
      }
    ],
    mentor: {
      name: 'হাসান মাহবুব',
      role: 'Top-Rated Plus Agency Founder',
      company: 'Fleearn Senior Strategy Mentor',
      rating: 4.99,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    avgFreelanceHourly: '$35 - $80/hr',
    iconName: 'TrendingUp',
    colorTheme: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'video-motion-cgi',
    title: {
      bn: 'প্রো ভিডিও এডিটিং, 3D CGI ও মোশন গ্রাফিক্স',
      en: 'Cinema-Grade Video Editing, 3D CGI & Motion Graphics'
    },
    subtitle: {
      bn: 'Premiere Pro, After Effects, 3D Camera Tracking, Sound Design & YouTube Ads',
      en: 'Premiere Pro, After Effects, 3D Camera Tracking, Sound Design, 3D Title VFX & High-Paying Client Ads'
    },
    category: 'video-editing',
    categoryLabel: {
      bn: 'ভিডিও ও মোশন সিজিআই',
      en: 'Video & Motion CGI'
    },
    level: 'All Levels',
    duration: '৪ মাস (১১০+ ঘণ্টা)',
    projectsCount: 14,
    studentsCount: 2480,
    rating: 4.92,
    reviewsCount: 410,
    priceBDT: 7500,
    priceUSD: 65,
    discountBDT: 4600,
    discountUSD: 40,
    badge: {
      bn: 'নতুন আপডেট',
      en: 'New 2026 Edition',
      type: 'new'
    },
    technologies: ['Premiere Pro', 'After Effects', 'Cinema 4D / Blender', 'DaVinci Resolve', 'Sound Design Pro', '3D Tracking'],
    features: {
      bn: [
        'হলিউড-স্টাইল ৩ডি ভিজ্যুয়াল ইফেক্টস ও টাইটেলস',
        'ইউটিউবার ও ব্র্যান্ডের জন্য ভাইরাল ভিডিও এডিটিং পেসিং',
        'কমপ্লিট রিয়েল-ওয়ার্ল্ড কমার্শিয়াল অ্যাডভার্টাইজিং শুট এডিটিং',
        'স্টক মিউজিক, এফএক্স এবং সাউন্ড লাইব্রেরির ফ্রি অ্যাক্সেস'
      ],
      en: [
        'Cinematic 3D VFX, motion typography & camera projection',
        'Pacing techniques for top YouTube creators & brands',
        'End-to-end commercial product video workflows',
        '100GB+ curated SFX, LUTs & motion pack library'
      ]
    },
    syllabus: [
      {
        week: 'সপ্তাহ ১ - ৩',
        title: { bn: 'সিনেমাটিক স্টোরিটেলিং ও পেসিং', en: 'Cinematic Storytelling & Fast Pacing' },
        topics: {
          bn: ['কালার গ্রেডিং ডিলজিস্টিক্স', 'কাট ট্রানজিশন ও জাম্প কাট ম্যাজিক', 'অডিও ড্রাইভেন এডিটিং'],
          en: ['Advanced color grading with LUTs', 'Rhythmic transitions', 'Audio stem mixing']
        }
      },
      {
        week: 'সপ্তাহ ৪ - ৮',
        title: { bn: 'After Effects & 3D মোশন গ্রাফিক্স', en: 'After Effects & 3D Motion Graphics' },
        topics: {
          bn: ['3D ক্যামেরা ট্র্যাকিং', 'কাইনেটিক টাইপোগ্রাফি', 'গ্লো ও পার্টিকেল ভিএফএক্স'],
          en: ['3D camera tracking & matchmoving', 'Kinetic typography', 'Particle effects & glows']
        }
      },
      {
        week: 'সপ্তাহ ৯ - ১২',
        title: { bn: 'ক্লায়েন্ট পোর্টফোলিও ও হাই-টিকেট সেলস', en: 'Client Showreel & High-Ticket Outreach' },
        topics: {
          bn: ['শো-রিল মেকিং মাস্টারক্লাস', 'ইউএস ইউটিউবারদের কোল্ড পিচিং', 'কন্ট্রাক্ট রেট প্রাইসিং'],
          en: ['60-second killer showreel', 'Pitching top creators', 'Commercial package pricing']
        }
      }
    ],
    mentor: {
      name: 'আবরার জাহিদ',
      role: 'Commercial Film & 3D Motion Director',
      company: 'Creative Lead at Neon Media UK',
      rating: 4.95,
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80'
    },
    avgFreelanceHourly: '$40 - $90/hr',
    iconName: 'Film',
    colorTheme: 'from-orange-500 to-amber-500'
  },
  {
    id: 'flutter-crossplatform-apps',
    title: {
      bn: 'ফ্লাটার ও রিঅ্যাক্ট নেটিভ ক্রস-প্ল্যাটফর্ম অ্যাপ মাস্টারক্লাস',
      en: 'Cross-Platform Mobile App Mastery (Flutter & React Native)'
    },
    subtitle: {
      bn: 'iOS ও Android এর জন্য ফুলস্ট্যাক মোবাইল অ্যাপ, Firebase & ইন-অ্যাপ পেমেন্টস',
      en: 'iOS & Android Native Performance, AI Integration, Firebase & Global Store Publishing'
    },
    category: 'app-dev',
    categoryLabel: {
      bn: 'মোবাইল অ্যাপস',
      en: 'Mobile Apps'
    },
    level: 'All Levels',
    duration: '৪.৫ মাস (১৩০+ ঘণ্টা)',
    projectsCount: 9,
    studentsCount: 2190,
    rating: 4.94,
    reviewsCount: 380,
    priceBDT: 8000,
    priceUSD: 72,
    discountBDT: 5100,
    discountUSD: 44,
    badge: {
      bn: 'জনপ্রিয় কোর্স',
      en: 'Popular Track',
      type: 'popular'
    },
    technologies: ['Flutter / Dart', 'React Native', 'Firebase Cloud', 'SQLite / Hive', 'Stripe Mobile SDK', 'App Store / Play Store'],
    features: {
      bn: [
        'একটি কোডবেজ দিয়ে আইওএস এবং অ্যান্ড্রয়েড অ্যাপ তৈরি',
        'রিয়েল-টাইম চ্যাট ও নোটিফিকেশন সিস্টেম',
        'প্লে স্টোর ও অ্যাপল অ্যাপ স্টোরে লাইভ পাবলিশিং গাইড',
        'ইন্টারন্যাশনাল রিমোট জব ও ফ্রিল্যান্স প্রজেক্ট সাপোর্ট'
      ],
      en: [
        'Single codebase for iOS & Android native apps',
        'Real-time chat, push notifications & live streaming',
        'App Store & Google Play Store release blueprint',
        'Global remote job interview prep & portfolio showcase'
      ]
    },
    syllabus: [
      {
        week: 'সপ্তাহ ১ - ৪',
        title: { bn: 'ডার্ট ল্যাঙ্গুয়েজ ও ফ্লাটার উইজেটস আর্কিটেকচার', en: 'Dart & Flutter Widget Tree Architecture' },
        topics: {
          bn: ['OOP ও ডার্ট ফান্ডামেন্টালস', 'কাস্টম রেসপন্সিভ উইজেট ডিজাইন', 'স্টেট ম্যানেজমেন্ট (Bloc/Riverpod)'],
          en: ['Dart deep dive', 'Custom responsive UI', 'Bloc & Riverpod state patterns']
        }
      },
      {
        week: 'সপ্তাহ ৫ - ৯',
        title: { bn: 'ব্যাকএন্ড ইন্টিগ্রেশন ও রিয়েলটাইম ক্লাউড', en: 'Backend APIs & Realtime Cloud Data' },
        topics: {
          bn: ['REST API ও GraphQL', 'ফায়ারবেস অথ ও ক্লাউড মেসেজিং', 'লোকাল স্টোরেজ ক্যাশিং'],
          en: ['REST API & GraphQL integration', 'Firebase Auth & Cloud Messaging', 'Offline local caching']
        }
      },
      {
        week: 'সপ্তাহ ১০ - ১৪',
        title: { bn: 'অ্যাপ স্টোর ডেপ্লয় ও ফ্রিল্যান্স ক্যারিয়ার', en: 'Production Release & Upwork Mobile Contracts' },
        topics: {
          bn: ['পেমেন্ট গেটওয়ে ইন্টিগ্রেশন', 'সিআই/সিডি অটোমেশন', 'হাই-ভ্যালু মোবাইল অ্যাপ ক্লায়েন্ট পিচ'],
          en: ['In-app purchases & Stripe', 'CI/CD fastlane builds', 'Freelance mobile contracts']
        }
      }
    ],
    mentor: {
      name: 'রাইহান কবির',
      role: 'Senior Staff Mobile Architect',
      company: 'Fintech Mobile Lead & Top-Rated Dev',
      rating: 4.97,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
    },
    avgFreelanceHourly: '$45 - $95/hr',
    iconName: 'Smartphone',
    colorTheme: 'from-blue-500 to-indigo-600'
  }
];

export const MENTORS_DATA: Mentor[] = [
  {
    id: 'tanvir-ahmed',
    name: 'তানভীর আহমেদ (Tanvir Ahmed)',
    title: {
      bn: 'ফুলস্ট্যাক ও ৩ডি ক্রিয়েটিভ ইঞ্জিনিয়ার',
      en: 'Lead 3D Web Creative & Full-Stack Architect'
    },
    experience: '৮+ বছরের অভিজ্ঞতা',
    specialty: 'Next.js 15, Three.js, Upwork Top-Rated Plus',
    studentsMentored: 2400,
    hourlyRate: '$85/hr',
    rating: 4.98,
    earnings: '$180,000+ (Upwork Proof)',
    platform: 'Upwork Top Rated Plus',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    bio: {
      bn: 'যুক্তরাষ্ট্র ও ইউরোপের শীর্ষ এজেন্সির সাথে কাজ করার বাস্তব অভিজ্ঞতা থেকে সরাসরি ৩ডি ওয়েব ও ফুলস্ট্যাক স্কিল শেয়ার করছেন।',
      en: 'Mentoring thousands of developers on high-end 3D WebGL interfaces and high-ticket client conversion.'
    },
    skills: ['Three.js', 'Next.js', 'TypeScript', 'Upwork Sales', 'WebGL Shaders']
  },
  {
    id: 'sakib-al-hasan',
    name: 'সাকিব আল হাসান (Sakib AI)',
    title: {
      bn: 'এআই সলিউশনস আর্কিটেক্ট ও অটোমেশন স্পেশালিস্ট',
      en: 'AI Solutions Architect & Enterprise Automation Lead'
    },
    experience: '৬+ বছরের অভিজ্ঞতা',
    specialty: 'Gemini, LangChain, n8n, AI Agent Systems',
    studentsMentored: 3100,
    hourlyRate: '$95/hr',
    rating: 4.99,
    earnings: '$145,000+',
    platform: 'Upwork Top Rated Plus',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    bio: {
      bn: 'গ্লোবাল বিজনেসের জন্য প্রম্পট ইঞ্জিনিয়ারিং এবং ওয়ার্কফ্লো অটোমেশন তৈরি করে সফল এজেন্সি পরিচালনা করছেন।',
      en: 'Building scalable autonomous agent infrastructure and teaching students how to monetize AI workflows.'
    },
    skills: ['Gemini 2.5', 'n8n Automations', 'Python Agents', 'B2B Client Strategy']
  },
  {
    id: 'farhana-medha',
    name: 'ফারহানা ইসলাম মেধা (Farhana Medha)',
    title: {
      bn: 'প্রিন্সিপাল প্রোডাক্ট ও ৩ডি ইউআই ডিজাইনার',
      en: 'Principal Product & 3D Interactive UI Designer'
    },
    experience: '৭+ বছরের অভিজ্ঞতা',
    specialty: 'Figma Systems, Spline 3D, High-ticket SaaS',
    studentsMentored: 1900,
    hourlyRate: '$75/hr',
    rating: 4.96,
    earnings: '$120,000+',
    platform: 'Toptal',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    bio: {
      bn: 'সিলিকন ভ্যালি স্টার্টআপের ইউআই/ইউএক্স ও ৩ডি ইন্টারেক্টিভ প্রোডাক্ট ডিজাইনার হিসেবে কর্মরত।',
      en: 'Specializing in converting complex product requirements into visually stunning 3D user experiences.'
    },
    skills: ['Figma Design System', 'Spline 3D', 'Blender', 'SaaS UX']
  },
  {
    id: 'hasan-mahbub',
    name: 'হাসান মাহবুব (Hasan Mahbub)',
    title: {
      bn: 'ফ্রিল্যান্স এজেন্সি গ্রোথ স্ট্র্যাটেজিস্ট',
      en: 'Top-Rated Plus Agency Founder & Growth Strategist'
    },
    experience: '৯+ বছরের অভিজ্ঞতা',
    specialty: 'Upwork Algorithm, Cold Emailing, Retainer Contracts',
    studentsMentored: 4500,
    hourlyRate: '$80/hr',
    rating: 4.99,
    earnings: '$250,000+',
    platform: 'Upwork Top Rated Plus',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    bio: {
      bn: 'শূন্য থেকে ফ্রিল্যান্সিং শুরু করে ১৫ জনের সফল ডিজিটাল এজেন্সি গড়ে তুলেছেন।',
      en: 'Scaled a solo freelancing profile to a multi-6-figure digital agency with recurring US clients.'
    },
    skills: ['Upwork Bidding', 'Cold Emailing', 'Proposal Writing', 'Contract Closing']
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    name: 'রাশেদুল করিম',
    role: { bn: 'টপ-রেটেড ফুলস্ট্যাক ৩ডি ওয়েব ডেভেলপার', en: 'Top-Rated Full-Stack 3D Web Dev' },
    city: 'ঢাকা, বাংলাদেশ',
    course: 'ফুলস্ট্যাক ওয়েব ও ৩ডি এক্সপেরিয়েন্স',
    monthlyEarnings: '$৩,৪০০ / মাস (৳৪.১ লক্ষ+)',
    platform: 'Upwork & Direct US Clients',
    quote: {
      bn: 'Fleearn এর ৩ডি ওয়েব এবং নেক্সটজেএস কোর্সটি করার পর আমার আপওয়ার্ক প্রোফাইলে কাজের কোনো অভাব নেই। প্রথম মাসেই $১,২০০ এর ৩টি কাজ কমপ্লিট করেছিলাম!',
      en: 'After completing Fleearn 3D Web and Next.js track, my Upwork profile gained massive traction. Landed 3 high-ticket clients in the very first month!'
    },
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    stats: {
      before: 'বেকার / ফ্রেশ গ্র্যাজুয়েট (৳০)',
      after: 'মাসে $৩,৪০০+ স্থায়ী রেটেইনার'
    }
  },
  {
    id: '2',
    name: 'সুমাইয়া জাহান',
    role: { bn: 'এআই অটোমেশন কনসালট্যান্ট', en: 'AI Automation Consultant & Agency Owner' },
    city: 'চট্টগ্রাম, বাংলাদেশ',
    course: 'এআই প্রম্পট ও অটোমেশন ফ্রিল্যান্সিং',
    monthlyEarnings: '$২,৮০০ / মাস (৳৩.৩ লক্ষ+)',
    platform: 'Fiverr Pro & LinkedIn B2B',
    quote: {
      bn: 'এআই দিয়ে বিজনেস প্রসেস অটোমেশনের যে ভ্যালু Fleearn শিখিয়েছে তা অতুলনীয়। এখন ইউকের একটি রিয়েল এস্টেট কোম্পানির অটোমেশন পার্টনার হিসেবে কাজ করছি।',
      en: 'The practical hands-on n8n & Gemini AI automation frameworks at Fleearn opened up high-paying contracts for me in the UK real estate market.'
    },
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    stats: {
      before: 'নন-টেক ব্যাকগ্রাউন্ড',
      after: 'হাই-টিকেট এআই কনসালট্যান্ট'
    }
  },
  {
    id: '3',
    name: 'নাঈমুর রহমান',
    role: { bn: 'প্রোডাক্ট ডিজাইনার ও ৩ডি আর্টিস্ট', en: 'Product Designer & 3D Web Visualizer' },
    city: 'সিলেট, বাংলাদেশ',
    course: 'প্রিমিয়াম UI/UX ও 3D মোশন',
    monthlyEarnings: '$২,২০০ / মাস (৳২.৬ লক্ষ+)',
    platform: 'Toptal & Dribbble Leads',
    quote: {
      bn: 'ফিগমার পাশাপাশি Spline 3D ইন্টিগ্রেশন আমাকে অন্যান্য ডিজাইনারদের থেকে ১০০ গুণ এগিয়ে রেখেছে। মেন্টরদের ডেডিকেটেড ফিডব্যাক ছিল সেরা!',
      en: 'Combining Figma systems with Spline 3D transformed my portfolio. Mentors gave precise design audits that helped me clear Toptal screening!'
    },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    stats: {
      before: 'বেসিক গ্রাফিক্স ডিজাইনার ($৫ গিগ)',
      after: '$৫০/ঘণ্টা ইউআই/ইউএক্স ডিজাইনার'
    }
  }
];

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    month: 'মাস ০১',
    phase: { bn: 'ফাউন্ডেশন ও ফান্ডামেন্টালস', en: 'Core Foundations & Mental Models' },
    title: { bn: 'আধুনিক টেক ও ফ্রেমওয়ার্ক মাস্টার করা', en: 'Master Modern Architecture & Tools' },
    description: {
      bn: 'বেসিক থেকে শুরু করে আধুনিক ফ্রেমওয়ার্ক, কোড স্ট্যান্ডার্ডস ও ইন্ডাস্ট্রি বেস্ট প্র্যাকটিস আয়ত্ত করা।',
      en: 'Deep-dive into professional coding standards, clean patterns and production toolchains.'
    },
    deliverables: {
      bn: ['ক্লিন আর্কিটেকচার সেটআপ', '৩টি ফান্ডামেন্টাল মিনি-অ্যাপ', 'গিটহাব প্রোফাইল বিল্ড'],
      en: ['Clean workspace environment', '3 fundamental micro-apps', 'Pro GitHub portfolio structure']
    },
    icon: 'Layers'
  },
  {
    month: 'মাস ০২ - ০৩',
    phase: { bn: '৩ডি ও অ্যাডভান্সড ইঞ্জিনিয়ারিং', en: '3D Interactive & Advanced Systems' },
    title: { bn: 'হাই-লেভেল ৩ডি ও এআই সিস্টেম ইমপ্লিমেন্টেশন', en: '3D WebGL, Physics & AI Workflows' },
    description: {
      bn: 'Three.js, ইন্টারেক্টিভ শেডার্স, এআই অটোমেশন এবং পারফরম্যান্ট অ্যানিমেশন তৈরি করা।',
      en: 'Crafting responsive 3D WebGL canvases, interactive physics nodes and AI agent pipelines.'
    },
    deliverables: {
      bn: ['ইন্টারেক্টিভ ৩ডি ওয়েব পোর্টাল', 'এআই এজেন্ট ওয়ার্কফ্লো', 'লাইভ লাইটহাউস ১০০% স্কোর'],
      en: ['Interactive 3D Web showcase', 'AI agent automation pipeline', '100% Lighthouse audit optimization']
    },
    icon: 'Cpu'
  },
  {
    month: 'মাস ০৪ - ০৫',
    phase: { bn: 'রিয়েল প্রোডাকশন কেস স্টাডি', en: 'Real-World Production Applications' },
    title: { bn: 'কমার্শিয়াল প্রজেক্ট ও এন্টারপ্রাইজ রেডি অ্যাপস', en: 'Enterprise Grade Portfolio Development' },
    description: {
      bn: 'আন্তর্জাতিক ক্লায়েন্টের স্ট্যান্ডার্ডে ফুল-ফিচারড সাস (SaaS) ও প্ল্যাটফর্ম ডেভেলপমেন্ট।',
      en: 'Building scalable multi-tenant SaaS products and live commerce systems ready for clients.'
    },
    deliverables: {
      bn: ['লাইভ প্রোডাকশন সাস অ্যাপ', 'ভিডিও কেস স্টাডি প্রেজেন্টেশন', 'ক্লাউড ডেপ্লয়মেন্ট আর্কিটেকচার'],
      en: ['Live production SaaS product', 'Video case study breakdown', 'GCP / AWS deployment flow']
    },
    icon: 'Box'
  },
  {
    month: 'মাস ০৬',
    phase: { bn: 'ফ্রিল্যান্স লঞ্চ ও প্রথম $১,০০০+', en: 'High-Ticket Freelance Launch' },
    title: { bn: 'আপওয়ার্ক টপ-রেটেড ক্লায়েন্ট একুইজিশন', en: 'Upwork, Fiverr & Direct B2B Outreach' },
    description: {
      bn: 'প্রোফাইল অপটিমাইজেশন, উইনিং বিডিং ফর্মুলা, কন্ট্রাক্ট নেগোসিয়েশন এবং নিয়মিত আয় নিশ্চিত করা।',
      en: 'Algorithm-optimized bidding, video proposals, contract signing and scaling to recurring retainers.'
    },
    deliverables: {
      bn: ['১০০% অপটিমাইজড আপওয়ার্ক অ্যাকাউন্ট', 'প্রথম ৩টি পেইড ক্লায়েন্ট প্রজেক্ট', 'স্মুথ ডলার পেমেন্ট চ্যানেল'],
      en: ['100% Top-Rated ready Upwork profile', 'First 3 high-ticket contracts', 'Secure multi-currency wallet setup']
    },
    icon: 'Award'
  }
];

export const LIVE_MASTERCLASSES: LiveMasterclass[] = [
  {
    id: 'masterclass-1',
    title: {
      bn: 'লাইভ ৩ডি ওয়েবসাইট বিল্ড ও আপওয়ার্কে $১০০/ঘণ্টা গিগ সিক্রেটস',
      en: 'Live 3D Website Architecture & Winning $100/hr Upwork Gigs'
    },
    instructor: 'তানভীর আহমেদ (Upwork Top Rated Plus)',
    date: 'শুক্রবার, সন্ধ্যা ৮:০০ টা',
    time: '২ ঘণ্টা লাইভ ইন্টারঅ্যাক্টিভ ওয়ার্কশপ',
    seatsLeft: 38,
    totalSeats: 250,
    tag: { bn: '১০০% ফ্রি লাইভ ক্লাস', en: '100% Free Live Session' }
  },
  {
    id: 'masterclass-2',
    title: {
      bn: 'Gemini ও n8n দিয়ে মাসে $২,০০০ আয়ের এআই অটোমেশন সিস্টেম',
      en: 'Building $2,000/mo AI Automation Pipelines with Gemini & n8n'
    },
    instructor: 'সাকিব আল হাসান (AI Architect)',
    date: 'রবিবার, রাত ৯:০০ টা',
    time: '১.৫ ঘণ্টা হ্যান্ডস-অন ওয়ার্কশপ',
    seatsLeft: 19,
    totalSeats: 200,
    tag: { bn: 'হট মাস্টারক্লাস', en: 'Hot Masterclass' }
  }
];

export const FAQS_DATA = [
  {
    question: {
      bn: 'আমার কোনো পূর্ব কোডিং বা ফ্রিল্যান্সিং অভিজ্ঞতা নেই, আমি কি শিখতে পারব?',
      en: 'I have zero prior coding or freelancing experience, can I join?'
    },
    answer: {
      bn: 'হ্যাঁ, একদম শূন্য থেকে শুরু করার জন্য Fleearn এর প্রতিটি কোর্স ডিজাইন করা হয়েছে। বেসিক কম্পিউটার জ্ঞান থাকলেই আপনি স্টেপ বাই স্টেপ এগিয়ে যেতে পারবেন। প্রতিটি ক্লাসের সাথে রয়েছে হ্যান্ডস-অন অ্যাসাইনমেন্ট ও ডেডিকেটেড মেন্টর সাপোর্ট।',
      en: 'Absolutely! Fleearn courses are built from step zero with foundational conceptual models, accompanied by personalized 1-on-1 mentor guidance, practical code templates, and daily feedback.'
    }
  },
  {
    question: {
      bn: 'কোর্সের সাথে কি কোনো ল্যাপটপ বা হার্ডওয়্যার রিকোয়ারমেন্ট আছে?',
      en: 'What are the hardware and laptop requirements for these courses?'
    },
    answer: {
      bn: 'যেকোনো স্ট্যান্ডার্ড ল্যাপটপ বা পিসি (ন্যূনতম Core i3 / Ryzen 3, 8GB RAM, SSD) দিয়ে আপনি খুব সুন্দরভাবে শিখতে পারবেন। ৩ডি এবং কোডিংয়ের জন্য আমরা লাইটওয়েট অপটিমাইজড টুলস ও ক্লাউড এনভায়রনমেন্ট ব্যবহার শেখাই।',
      en: 'Any modern laptop or desktop with at least 8GB RAM and an SSD is sufficient. We teach industry-standard, lightweight web and cloud workflows optimized for smooth development.'
    }
  },
  {
    question: {
      bn: 'কোর্স শেষ করার পর ফ্রিল্যান্সিং কাজে কিভাবে সহায়তা করা হবে?',
      en: 'How does Fleearn support graduates in landing real freelance clients?'
    },
    answer: {
      bn: 'আমাদের প্রতিটি ফ্ল্যাগশিপ ট্র্যাকে রয়েছে ডেডিকেটেড "ফ্রিল্যান্স এক্সেলেটর মডিউল"। এখানে আপওয়ার্ক প্রোফাইল অডিট, লাইভ বিডিং সেশন, উইনিং প্রপোজাল রাইটিং, ক্লায়েন্ট কমিউনিকেশন ট্রেইনিং এবং লাইফটাইম জব প্লেসমেন্ট চ্যানেল সরবরাহ করা হয়।',
      en: 'We provide full lifecycle career coaching: 1-on-1 profile audits, live proposal critique, high-ticket client negotiation playbooks, and exclusive direct client matching in our VIP network.'
    }
  },
  {
    question: {
      bn: 'পেমেন্ট কিভাবে করতে পারব? কিস্তির বা ডিসকাউন্টের কোনো সুযোগ আছে?',
      en: 'What are the accepted payment methods? Are installment options available?'
    },
    answer: {
      bn: 'আপনি bKash, Nagad, Rocket, ক্রেডিট/ডেবিট কার্ড (Visa, Mastercard) অথবা সরাসরি আন্তর্জাতিক কার্ড/পেওনিয়ার দিয়ে সম্পূর্ণ নিরাপদভাবে পেমেন্ট করতে পারবেন। এছাড়া শিক্ষার্থীদের সুবিধার্থে ২ কিস্তিতে ফি পরিশোধের সুযোগ রয়েছে।',
      en: 'We accept bKash, Nagad, Bank Cards, Visa/Mastercard, Apple Pay, and Stripe with instant automatic access. Flexible 2-part installment plans are also available for eligible learners.'
    }
  },
  {
    question: {
      bn: 'কোর্সের ভিডিও কি লাইফটাইম অ্যাক্সেস থাকবে?',
      en: 'Will I get lifetime access to recorded classes and course resources?'
    },
    answer: {
      bn: 'হ্যাঁ! একবার এনরোল করলে আপনি কোর্সের সমস্ত রেকর্ডেড ক্লাস, সোর্স কোড, ৩ডি অ্যাসেটস লাইব্রেরি, প্রজেক্ট ফাইলস এবং ভবিষ্যতের যেকোনো আপডেটেড লেকচারের আজীবন ফ্রি অ্যাক্সেস পাবেন।',
      en: 'Yes! You get unrestricted lifetime access to all high-definition recordings, downloadable 3D assets, source code repositories, and future syllabus upgrades.'
    }
  }
];
