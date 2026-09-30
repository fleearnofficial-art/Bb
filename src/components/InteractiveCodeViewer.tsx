import React, { useState } from 'react';
import { Language } from '../types';
import { playClickSound } from '../utils/audio';
import { Code2, Copy, Check, Terminal, FileCode, Download, Eye } from 'lucide-react';

interface InteractiveCodeViewerProps {
  lang: Language;
}

export const InteractiveCodeViewer: React.FC<InteractiveCodeViewerProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [copied, setCopied] = useState<boolean>(false);

  const htmlCode = `<!-- ============================================== -->
<!-- Fleearn - Premium 3D EdTech & Freelance Portal  -->
<!-- Standalone Production HTML Architecture         -->
<!-- ============================================== -->
<!DOCTYPE html>
<html lang="bn" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Fleearn - 3D Skill & Freelance Learning Platform</title>
  
  <!-- Google Fonts: Hind Siliguri, Outfit & Space Grotesk -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Outfit:wght@400;600;800;900&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Three.js 3D WebGL Library -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  
  <link rel="stylesheet" href="style.css" />
</head>
<body class="bg-[#070913] text-slate-100 antialiased overflow-x-hidden font-sans">
  
  <!-- Navigation Header -->
  <header class="fixed top-0 inset-x-0 z-50 bg-[#070913]/80 backdrop-blur-xl border-b border-white/10">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-cyan-400 to-indigo-600 flex items-center justify-center font-black text-xl text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]">
          F
        </div>
        <span class="text-2xl font-black tracking-tight text-white font-['Outfit']">Fleearn<span class="text-cyan-400">.</span></span>
      </div>
      
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <a href="#courses" class="hover:text-cyan-400 transition-colors">কোর্সসমূহ</a>
        <a href="#3d-lab" class="hover:text-cyan-400 transition-colors">৩ডি ল্যাব</a>
        <a href="#calculator" class="hover:text-cyan-400 transition-colors">আয় ক্যালকুলেটর</a>
        <a href="#roadmap" class="hover:text-cyan-400 transition-colors">রোডম্যাপ</a>
      </nav>
      
      <a href="#courses" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all">
        ফ্রি ট্রায়াল শুরু করুন
      </a>
    </div>
  </header>

  <!-- Hero 3D Section -->
  <main class="pt-32 pb-20 relative">
    <section class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[75vh]">
      <!-- Left Content -->
      <div class="lg:col-span-6 space-y-6">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-cyan-300 text-xs font-mono">
          <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          NEXT-GEN 3D LEARNING & FREELANCING
        </div>
        <h1 class="text-4xl sm:text-6xl font-extrabold text-white leading-tight font-['Outfit']">
          ভবিষ্যতের স্কিল শিখুন <span class="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">৩ডি অভিজ্ঞতায়</span>
        </h1>
        <p class="text-slate-300 text-lg leading-relaxed">
          Next.js, Three.js 3D, এআই অটোমেশন এবং হাই-টিকেট আপওয়ার্ক ফ্রিল্যান্সিং এর প্রিমিয়াম মাস্টারক্লাস প্ল্যাটফর্ম।
        </p>
        <div class="flex flex-wrap gap-4 pt-4">
          <a href="#courses" class="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/30">
            কোর্স এক্সপ্লোর করুন →
          </a>
          <a href="#calculator" class="px-8 py-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-sm hover:bg-slate-800">
            ইনকাম ক্যালকুলেটর
          </a>
        </div>
      </div>
      
      <!-- Right 3D Canvas Canvas Mount -->
      <div class="lg:col-span-6 h-[500px] relative rounded-3xl overflow-hidden border border-indigo-500/30 bg-slate-950/60 shadow-2xl">
        <div id="threejs-container" class="w-full h-full"></div>
      </div>
    </section>
  </main>

  <script src="script.js"></script>
</body>
</html>`;

  const cssCode = `/* ============================================== */
/* Fleearn - Premium 3D Theme & Glassmorphism CSS  */
/* ============================================== */

:root {
  --color-bg: #070913;
  --color-primary: #6366f1;
  --color-secondary: #06b6d4;
  --color-accent: #34d399;
}

body {
  background-color: var(--color-bg);
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  color: #f8fafc;
}

/* Glassmorphism Panel */
.glass-panel {
  background: rgba(13, 17, 34, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
}

.glass-panel:hover {
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: 0 20px 40px -10px rgba(99, 102, 241, 0.2);
}

/* Hologram Neon Glows */
.glow-cyan {
  box-shadow: 0 0 35px -5px rgba(6, 182, 212, 0.5);
}

.glow-indigo {
  box-shadow: 0 0 35px -5px rgba(99, 102, 241, 0.5);
}

/* 3D Perspective Card Tilt */
.tilt-card {
  transform-style: preserve-3d;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.tilt-card:hover {
  transform: translateY(-8px) rotateX(4deg) rotateY(-4deg);
}

/* Custom Sleek Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #070913;
}
::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #334155;
}`;

  const jsCode = `// ==============================================
// Fleearn - Interactive Three.js 3D WebGL Engine
// ==============================================

window.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('threejs-container');
  if (!container) return;

  // 1. Scene & Camera Setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x070913, 0.04);

  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 12;

  // 2. WebGL Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // 3. Central Hologram Core (Nested 3D Geometry)
  const coreGroup = new THREE.Group();
  scene.add(coreGroup);

  const coreGeo = new THREE.IcosahedronGeometry(2.2, 2);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x4f46e5,
    emissive: 0x1e1b4b,
    roughness: 0.1,
    metalness: 0.9,
    wireframe: false
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreGroup.add(coreMesh);

  // Wireframe Outer Shell
  const shellGeo = new THREE.IcosahedronGeometry(2.8, 1);
  const shellMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    wireframe: true,
    transparent: true,
    opacity: 0.4
  });
  const shellMesh = new THREE.Mesh(shellGeo, shellMat);
  coreGroup.add(shellMesh);

  // 4. Orbiting Skill Satellites
  const orbitalRings = [
    { radius: 4.5, color: 0x6366f1, speed: 0.4 },
    { radius: 5.8, color: 0x06b6d4, speed: -0.3 },
    { radius: 7.0, color: 0xa855f7, speed: 0.25 },
  ];

  orbitalRings.forEach(ring => {
    const ringGeo = new THREE.TorusGeometry(ring.radius, 0.03, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: ring.color, transparent: true, opacity: 0.4 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    coreGroup.add(ringMesh);
  });

  // 5. Starfield Ambient Particles
  const count = 600;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 40;
    positions[i + 1] = (Math.random() - 0.5) * 40;
    positions[i + 2] = (Math.random() - 0.5) * 40;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.1, transparent: true, opacity: 0.6 });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // 6. Dynamic Lights
  const light1 = new THREE.PointLight(0x6366f1, 3, 20);
  light1.position.set(5, 5, 5);
  scene.add(light1);

  const light2 = new THREE.PointLight(0x06b6d4, 3, 20);
  light2.position.set(-5, -5, 5);
  scene.add(light2);

  // 7. Mouse Parallax Reaction
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // 8. Animation Render Loop
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    coreMesh.rotation.x = elapsed * 0.2 + mouseY * 0.3;
    coreMesh.rotation.y = elapsed * 0.3 + mouseX * 0.3;
    shellMesh.rotation.x = -elapsed * 0.15;
    shellMesh.rotation.y = -elapsed * 0.2;
    particles.rotation.y = elapsed * 0.02;

    renderer.render(scene, camera);
  }
  animate();

  // Resize Handler
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
});`;

  const getCodeContent = () => {
    switch (activeTab) {
      case 'html': return htmlCode;
      case 'css': return cssCode;
      case 'js': return jsCode;
    }
  };

  const handleCopy = () => {
    playClickSound();
    navigator.clipboard.writeText(getCodeContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="source-code" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-4">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              {lang === 'bn' ? 'স্ট্যান্ডঅ্যালোন কোড ও আর্কিটেকচার' : 'STANDALONE HTML / CSS / JS EXPORT'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-heading tracking-tight">
            {lang === 'bn' ? (
              <>
                Fleearn এর <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">HTML, CSS ও Three.js কোড</span>
              </>
            ) : (
              <>
                Production <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">HTML, CSS & JS Engine</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            {lang === 'bn'
              ? 'আপনার অনুরোধ অনুযায়ী প্রজেক্টের সম্পূর্ণ পিওর HTML5, আধুনিক CSS3 এবং থ্রি.জেএস স্ক্রিপ্ট এখানে কপি ও স্টাডি করার জন্য সাজানো হয়েছে।'
              : 'Complete, clean, modular standalone code snippets formatted for direct implementation and export.'}
          </p>
        </div>

        {/* Code Terminal Box */}
        <div className="rounded-3xl bg-white/5 border border-white/10 overflow-hidden shadow-2xl backdrop-blur-md">
          {/* Terminal Window Header */}
          <div className="px-6 py-4 bg-black/40 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            {/* Window Dots & Tabs */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>

              {/* Code Tabs */}
              <div className="flex items-center gap-2">
                {[
                  { id: 'html' as const, label: 'index.html', icon: FileCode, color: 'text-orange-400' },
                  { id: 'css' as const, label: 'style.css', icon: Code2, color: 'text-blue-400' },
                  { id: 'js' as const, label: 'script.js (Three.js 3D)', icon: Terminal, color: 'text-amber-400' },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isSelected = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      id={`code-tab-btn-${tab.id}`}
                      onClick={() => {
                        playClickSound();
                        setActiveTab(tab.id);
                      }}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white/10 text-white border border-white/20 shadow'
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${tab.color}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                id="copy-code-btn"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{lang === 'bn' ? 'কপি হয়েছে!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'কোড কপি করুন' : 'Copy Code'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Syntax Highlight Code Block */}
          <div className="p-6 bg-[#050508]/90 overflow-x-auto max-h-[500px] font-mono text-xs leading-relaxed text-gray-300">
            <pre className="whitespace-pre">
              <code>{getCodeContent()}</code>
            </pre>
          </div>

          {/* Terminal Footer */}
          <div className="px-6 py-3 bg-black/40 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
            <span>✨ Fleearn WebGL Engine • Ready for Production</span>
            <span className="text-blue-400">UTF-8 • Standard Web Standards</span>
          </div>
        </div>
      </div>
    </section>
  );
};
