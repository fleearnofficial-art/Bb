import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playClickSound } from '../utils/audio';
import { Sparkles, Code2, Palette, TrendingUp, Film, Cpu, RotateCw, Eye, Flame } from 'lucide-react';
import { Language } from '../types';

interface ThreeSkillShowcaseProps {
  lang: Language;
  onEnrollClick?: (trackId: string) => void;
}

type ModelType = 'icosahedron' | 'torusKnot' | 'cyberBox' | 'dodecahedron' | 'ringSphere';

export const ThreeSkillShowcase: React.FC<ThreeSkillShowcaseProps> = ({ lang, onEnrollClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedShape, setSelectedShape] = useState<ModelType>('torusKnot');
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [glowColor, setGlowColor] = useState<string>('#6366f1');
  const [rotationSpeed, setRotationSpeed] = useState<number>(1.2);
  const [meshRefState, setMeshRefState] = useState<THREE.Mesh | null>(null);

  const tracks = [
    {
      id: 'fullstack-web3d',
      shape: 'torusKnot' as ModelType,
      title: lang === 'bn' ? '3D ওয়েব ও ফুলস্ট্যাক ইঞ্জিন' : '3D Web & Fullstack Engine',
      category: lang === 'bn' ? 'নেক্সটজেএস ও থ্রি.জেএস' : 'Next.js & Three.js',
      description: lang === 'bn' 
        ? 'আধুনিক ওয়েব আর্কিটেকচার, ইন্টারঅ্যাক্টিভ ৩ডি সিন এবং স্কেলেবল ক্লাউড ব্যাকএন্ডের কমপ্লিট মাস্টারক্লাস।' 
        : 'Deep dive into WebGL pipelines, custom shaders, and scalable full-stack applications.',
      icon: Code2,
      color: '#38bdf8',
      marketDemand: '98% Hiring Rate',
      hourlyRate: '$45 - $95/hr',
    },
    {
      id: 'ai-prompt-automation',
      shape: 'icosahedron' as ModelType,
      title: lang === 'bn' ? 'এআই এজেন্ট ও প্রম্পট ম্যাট্রিক্স' : 'AI Agents & Automation Matrix',
      category: lang === 'bn' ? 'জেমিনাই ও পাইথন' : 'Gemini & Python Agents',
      description: lang === 'bn'
        ? 'অটোনোমাস এআই বট, এলএলএম ওয়ার্কফ্লো এবং বিজনেস অটোমেশন সিস্টেম ডেভেলপমেন্ট।'
        : 'Craft intelligent agent workflows, multi-modal LLM pipelines and automated client funnels.',
      icon: Cpu,
      color: '#c084fc',
      marketDemand: '99% High Demand',
      hourlyRate: '$50 - $110/hr',
    },
    {
      id: 'uiux-3d-motion',
      shape: 'dodecahedron' as ModelType,
      title: lang === 'bn' ? 'প্রোডাক্ট ডিজাইন ও ৩ডি স্প্লাইন' : 'UI/UX & 3D Spline Experience',
      category: lang === 'bn' ? 'ফিগমা ও ব্লেন্ডার' : 'Figma & Spline 3D',
      description: lang === 'bn'
        ? 'হাই-কনভার্টিং সাস ইউআই সিস্টেম, ৩ডি প্রোডাক্ট ইন্টারঅ্যাকশন ও ড্রিবল কেস স্টাডি।'
        : 'Convert standard interfaces into hypnotic 3D micro-interactive web experiences.',
      icon: Palette,
      color: '#f472b6',
      marketDemand: '94% Industry Need',
      hourlyRate: '$40 - $85/hr',
    },
    {
      id: 'freelance-agency-growth',
      shape: 'cyberBox' as ModelType,
      title: lang === 'bn' ? 'আপওয়ার্ক ও ফ্রিল্যান্স সেলস ব্লুপ্রিন্ট' : 'High-Ticket Freelance Engine',
      category: lang === 'bn' ? 'ক্লায়েন্ট একুইজিশন' : 'Client Acquisition & Retainers',
      description: lang === 'bn'
        ? 'জিরো থেকে প্রতি মাসে $৩,০০০+ আয়ের প্রপোজাল মেথড, কোল্ড আউটরিচ এবং কন্ট্রাক্ট সাইনিং।'
        : 'Master the Upwork algorithm, cold video pitching, high-ticket proposals & retainers.',
      icon: TrendingUp,
      color: '#34d399',
      marketDemand: '97% Client Success',
      hourlyRate: '$35 - $80/hr',
    },
    {
      id: 'video-motion-cgi',
      shape: 'ringSphere' as ModelType,
      title: lang === 'bn' ? '৩ডি সিজিআই ও মোশন ভিএফএক্স' : '3D CGI & Motion VFX Studio',
      category: lang === 'bn' ? 'আফটার ইফেক্টস' : 'After Effects & Blender',
      description: lang === 'bn'
        ? 'কমার্শিয়াল ভিডিও অ্যাডভার্টাইজিং, ৩ডি টাইপোগ্রাফি ও ইউটিউব ভাইরাল পেসিং।'
        : 'Hollywood-style 3D particle animations, camera tracking, and commercial ads.',
      icon: Film,
      color: '#fbbf24',
      marketDemand: '92% Creator Boom',
      hourlyRate: '$40 - $90/hr',
    }
  ];

  const activeTrack = tracks.find((t) => t.shape === selectedShape) || tracks[0];

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Dynamic Geometry based on selectedShape
    let geometry: THREE.BufferGeometry;
    switch (selectedShape) {
      case 'torusKnot':
        geometry = new THREE.TorusKnotGeometry(1.2, 0.38, 128, 32);
        break;
      case 'icosahedron':
        geometry = new THREE.IcosahedronGeometry(1.6, 2);
        break;
      case 'dodecahedron':
        geometry = new THREE.DodecahedronGeometry(1.6, 1);
        break;
      case 'cyberBox':
        geometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);
        break;
      case 'ringSphere':
        geometry = new THREE.TorusGeometry(1.5, 0.4, 30, 100);
        break;
      default:
        geometry = new THREE.TorusKnotGeometry(1.2, 0.38, 128, 32);
    }

    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(glowColor),
      emissive: new THREE.Color(glowColor),
      emissiveIntensity: 0.5,
      roughness: 0.1,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: wireframe,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    setMeshRefState(mesh);

    // Surrounding floating orbital particle ring
    const ringGeo = new THREE.BufferGeometry();
    const ringCount = 300;
    const ringPos = new Float32Array(ringCount * 3);
    for (let i = 0; i < ringCount; i++) {
      const u = Math.random();
      const radius = 2.4 + Math.random() * 0.4;
      const angle = u * Math.PI * 2;
      ringPos[i * 3] = Math.cos(angle) * radius;
      ringPos[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
      ringPos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
    const ringMat = new THREE.PointsMaterial({
      color: new THREE.Color(glowColor),
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const ringPoints = new THREE.Points(ringGeo, ringMat);
    scene.add(ringPoints);

    // Lights
    const light1 = new THREE.DirectionalLight(0xffffff, 2.5);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(new THREE.Color(glowColor), 4, 20);
    light2.position.set(-4, -4, 4);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.5);
    scene.add(ambientLight);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      mesh.rotation.x = elapsed * 0.4 * rotationSpeed;
      mesh.rotation.y = elapsed * 0.6 * rotationSpeed;
      mesh.rotation.z = Math.sin(elapsed * 0.5) * 0.2;

      ringPoints.rotation.y = -elapsed * 0.3 * rotationSpeed;
      ringPoints.rotation.x = Math.sin(elapsed * 0.2) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, [selectedShape, wireframe, glowColor, rotationSpeed]);

  const colorPresets = ['#6366f1', '#38bdf8', '#c084fc', '#34d399', '#f43f5e', '#fbbf24'];

  return (
    <section id="3d-lab" className="py-20 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-4">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              {lang === 'bn' ? 'ইন্টারেক্টিভ ৩ডি লার্নিং ল্যাব' : 'INTERACTIVE 3D SKILL MATRIX'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-heading">
            {lang === 'bn' ? (
              <>
                ভবিষ্যতের হাই-ইনকাম স্কিল <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">৩ডি তে টেস্ট করুন</span>
              </>
            ) : (
              <>
                Test-Drive Next-Gen Skills in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">Real-Time 3D</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            {lang === 'bn'
              ? 'Fleearn এর ৩ডি ল্যাবে যেকোনো ফিল্ড নির্বাচন করুন এবং দেখুন এর বর্তমান মার্কেট চাহিদা, আয়ের সম্ভাবনা ও টেক স্ট্যাক।'
              : 'Interact with geometric skill modules, customize WebGL shaders, and explore projected freelance market rates.'}
          </p>
        </div>

        {/* 3D Lab Interactive Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Skill Selector Tabs */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2 px-1">
              {lang === 'bn' ? 'স্কিল ফিল্ড বেছে নিন' : 'SELECT SKILL TRACK'}
            </h3>
            {tracks.map((track) => {
              const Icon = track.icon;
              const isSelected = selectedShape === track.shape;
              return (
                <button
                  key={track.id}
                  id={`skill-track-btn-${track.id}`}
                  onClick={() => {
                    playClickSound();
                    setSelectedShape(track.shape);
                    setGlowColor(track.color);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer backdrop-blur-md ${
                    isSelected
                      ? 'bg-white/10 border-blue-500/50 shadow-[0_0_25px_rgba(59,130,246,0.2)]'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div
                    className="p-3 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `${track.color}20`,
                      color: track.color,
                      boxShadow: isSelected ? `0 0 15px ${track.color}50` : 'none',
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-base font-bold text-white truncate">{track.title}</h4>
                      {isSelected && (
                        <span className="shrink-0 w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{track.category}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs font-mono">
                      <span className="text-emerald-400 font-semibold">{track.hourlyRate}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-blue-400">{track.marketDemand}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center Column: 3D Interactive Viewport */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl h-[420px] sm:h-[480px] backdrop-blur-md">
              {/* Three.js Canvas Mount */}
              <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

              {/* Shaders and Lighting Controls */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050508]/80 backdrop-blur-md border border-white/10 text-xs font-mono text-blue-400">
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span>3D SHADER LAB</span>
                </div>

                <button
                  id="toggle-wireframe-mode-btn"
                  onClick={() => {
                    playClickSound();
                    setWireframe(!wireframe);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-mono border transition-all cursor-pointer ${
                    wireframe
                      ? 'bg-blue-600 text-white font-bold border-blue-400'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/20'
                  }`}
                >
                  {wireframe ? 'WIRE: ON' : 'WIRE: OFF'}
                </button>
              </div>

              {/* Bottom Color & Speed Toolbar */}
              <div className="absolute bottom-4 inset-x-4 p-3 rounded-2xl bg-[#050508]/85 backdrop-blur-xl border border-white/10 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-gray-400 uppercase">COLOR:</span>
                  <div className="flex items-center gap-1.5">
                    {colorPresets.map((c) => (
                      <button
                        key={c}
                        id={`color-picker-${c.replace('#', '')}`}
                        onClick={() => {
                          playClickSound();
                          setGlowColor(c);
                        }}
                        style={{ backgroundColor: c }}
                        className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                          glowColor === c ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-950' : 'opacity-70 hover:opacity-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <RotateCw className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-[11px] font-mono text-gray-400 uppercase">SPD:</span>
                  <input
                    id="rotation-speed-slider"
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.2"
                    value={rotationSpeed}
                    onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                    className="w-20 accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Track Curriculum & Fast Enrollment */}
          <div className="lg:col-span-3">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                  {lang === 'bn' ? 'ব্যাচ এনরোলমেন্ট ওপেন' : 'ENROLLMENT LIVE'}
                </span>
                <span className="text-xs font-mono text-gray-400">2026 Batch</span>
              </div>

              <div>
                <h4 className="text-xl font-bold text-white font-heading">{activeTrack.title}</h4>
                <p className="mt-2 text-xs text-gray-300 leading-relaxed">{activeTrack.description}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-gray-400">
                  <span>{lang === 'bn' ? 'মার্কেট রেইট:' : 'Freelance Rate:'}</span>
                  <span className="text-blue-400 font-bold">{activeTrack.hourlyRate}</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span>{lang === 'bn' ? 'চাহিদা রেটিং:' : 'Success Metric:'}</span>
                  <span className="text-emerald-400 font-bold">{activeTrack.marketDemand}</span>
                </div>
                <div className="flex items-center justify-between text-gray-400">
                  <span>{lang === 'bn' ? 'মেন্টরিং মোড:' : 'Support Type:'}</span>
                  <span className="text-amber-300 font-semibold">1-on-1 VIP Live</span>
                </div>
              </div>

              <button
                id={`lab-enroll-btn-${activeTrack.id}`}
                onClick={() => {
                  playClickSound();
                  if (onEnrollClick) onEnrollClick(activeTrack.id);
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 group"
              >
                <Flame className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
                <span>{lang === 'bn' ? 'কোর্সে যোগ দিন' : 'Enroll in Track'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
