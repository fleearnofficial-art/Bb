import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playClickSound, playHoverSound } from '../utils/audio';

interface ThreeHeroSceneProps {
  onSelectNode?: (nodeName: string) => void;
  activeSkill?: string;
}

export const ThreeHeroScene: React.FC<ThreeHeroSceneProps> = ({ onSelectNode, activeSkill }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [fps, setFps] = useState<number>(60);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [particleDensity, setParticleDensity] = useState<'normal' | 'high'>('normal');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070913, 0.035);

    // 2. Camera setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x38bdf8, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 4, 30);
    pointLight1.position.set(6, 8, 8);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 4, 30);
    pointLight2.position.set(-8, -6, 6);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xec4899, 3, 25);
    pointLight3.position.set(0, 0, 10);
    scene.add(pointLight3);

    // 5. Central 3D Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner Icosahedron with glass/metal glow
    const coreGeometry = new THREE.IcosahedronGeometry(2.4, 2);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x4f46e5,
      emissive: 0x1e1b4b,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreGroup.add(coreMesh);

    // Outer Wireframe Cage
    const cageGeometry = new THREE.IcosahedronGeometry(3.1, 1);
    const cageMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const cageMesh = new THREE.Mesh(cageGeometry, cageMaterial);
    coreGroup.add(cageMesh);

    // Dynamic Orbital Rings
    const createRing = (radius: number, color: number, tiltX: number, tiltY: number) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.035, 16, 120);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.6,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = tiltX;
      ring.rotation.y = tiltY;
      return ring;
    };

    const ring1 = createRing(4.8, 0x6366f1, Math.PI / 3, Math.PI / 6);
    const ring2 = createRing(6.0, 0x06b6d4, -Math.PI / 4, Math.PI / 4);
    const ring3 = createRing(7.2, 0xa855f7, Math.PI / 6, -Math.PI / 3);
    coreGroup.add(ring1);
    coreGroup.add(ring2);
    coreGroup.add(ring3);

    // 6. Interactive Skill Satellites / Spheres
    const skillNodesData = [
      { name: 'Full-Stack 3D Web', color: 0x38bdf8, radius: 4.8, speed: 0.6, angle: 0, size: 0.65, icon: '🌐' },
      { name: 'AI & Automation', color: 0xc084fc, radius: 6.0, speed: -0.45, angle: (Math.PI * 2) / 5, size: 0.6, icon: '⚡' },
      { name: 'UI/UX & 3D Motion', color: 0xf472b6, radius: 4.8, speed: 0.5, angle: (Math.PI * 4) / 5, size: 0.55, icon: '🎨' },
      { name: 'High-Ticket Freelancing', color: 0x34d399, radius: 7.2, speed: -0.35, angle: (Math.PI * 6) / 5, size: 0.7, icon: '💼' },
      { name: 'Video & 3D CGI VFX', color: 0xfbbf24, radius: 6.0, speed: 0.4, angle: (Math.PI * 8) / 5, size: 0.55, icon: '🎬' },
    ];

    const satelliteMeshes: {
      mesh: THREE.Mesh;
      data: typeof skillNodesData[0];
      glowMesh: THREE.Mesh;
    }[] = [];

    const satellitesGroup = new THREE.Group();
    scene.add(satellitesGroup);

    skillNodesData.forEach((node) => {
      // Node Sphere
      const sphereGeo = new THREE.DodecahedronGeometry(node.size, 1);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.7,
        roughness: 0.2,
        metalness: 0.8,
      });
      const nodeMesh = new THREE.Mesh(sphereGeo, sphereMat);

      // Glow Halo
      const haloGeo = new THREE.SphereGeometry(node.size * 1.4, 16, 16);
      const haloMat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.2,
        wireframe: true,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      nodeMesh.add(haloMesh);

      nodeMesh.userData = { name: node.name, color: node.color };
      satellitesGroup.add(nodeMesh);

      satelliteMeshes.push({
        mesh: nodeMesh,
        data: node,
        glowMesh: haloMesh,
      });
    });

    // 7. Ambient Particle Starfield
    const particleCount = particleDensity === 'high' ? 1200 : 700;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x38bdf8),
      new THREE.Color(0x818cf8),
      new THREE.Color(0xc084fc),
      new THREE.Color(0x34d399),
      new THREE.Color(0xf472b6),
    ];

    for (let i = 0; i < particleCount; i++) {
      const r = 8 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. Mouse Parallax & Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let targetCameraX = 0;
    let targetCameraY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

      mouse.x = x;
      mouse.y = y;

      targetCameraX = x * 2.5;
      targetCameraY = y * 2.0;
      targetRotationY = x * 0.4;
      targetRotationX = -y * 0.4;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(satelliteMeshes.map((s) => s.mesh));

      if (intersects.length > 0) {
        const intersected = intersects[0].object as THREE.Mesh;
        const name = intersected.userData.name;
        if (hoveredNode !== name) {
          setHoveredNode(name);
          playHoverSound();
        }
      } else {
        if (hoveredNode !== null) {
          setHoveredNode(null);
        }
      }
    };

    const handleClick = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(satelliteMeshes.map((s) => s.mesh));

      if (intersects.length > 0) {
        const intersected = intersects[0].object as THREE.Mesh;
        const name = intersected.userData.name;
        playClickSound();
        if (onSelectNode) {
          onSelectNode(name);
        }

        // Pulse animation on click
        intersected.scale.set(1.4, 1.4, 1.4);
        setTimeout(() => {
          intersected.scale.set(1, 1, 1);
        }, 300);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);

    // 9. Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let lastTime = performance.now();
    let frames = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // FPS Tracker
      frames++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frames * 1000) / (now - lastTime)));
        frames = 0;
        lastTime = now;
      }

      // Smooth camera interpolation
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Core rotation
      coreMesh.rotation.x = elapsedTime * 0.2 + targetRotationX * 0.5;
      coreMesh.rotation.y = elapsedTime * 0.25 + targetRotationY * 0.5;
      cageMesh.rotation.x = -elapsedTime * 0.15;
      cageMesh.rotation.y = -elapsedTime * 0.2;

      // Rings animation
      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.z = -elapsedTime * 0.25;
      ring3.rotation.z = elapsedTime * 0.18;

      // Satellite revolutions
      satelliteMeshes.forEach((item) => {
        const angle = item.data.angle + elapsedTime * item.data.speed * 0.8;
        const rad = item.data.radius;
        const tilt = item.data.radius * 0.15;

        item.mesh.position.x = Math.cos(angle) * rad;
        item.mesh.position.y = Math.sin(angle) * rad * 0.5 + Math.sin(elapsedTime * 2 + rad) * 0.3;
        item.mesh.position.z = Math.sin(angle) * rad * 0.7;

        item.mesh.rotation.x += 0.02;
        item.mesh.rotation.y += 0.03;

        // Hover pulsing
        if (hoveredNode === item.data.name || activeSkill === item.data.name) {
          item.glowMesh.scale.setScalar(1.8 + Math.sin(elapsedTime * 8) * 0.2);
          (item.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.6;
        } else {
          item.glowMesh.scale.setScalar(1.3);
          (item.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.7;
        }
      });

      // Starfield rotation
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('click', handleClick);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      cageGeometry.dispose();
      cageMaterial.dispose();
    };
  }, [wireframeMode, particleDensity, activeSkill]);

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] lg:h-[680px] rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl backdrop-blur-sm">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 3D Viewport Controls & Telemetry Overlay */}
      <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 pointer-events-auto z-10">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-blue-400 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          <span>Three.js 3D Lab</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-mono text-gray-400">
          <span className="text-emerald-400 font-bold">FPS: {fps}</span>
        </div>
      </div>

      {/* Immersive Floating Badge - Top Right */}
      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center px-4 py-1.5 space-x-2 pointer-events-none z-10 shadow-lg">
        <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] text-black font-bold">
          ✓
        </div>
        <span className="text-xs font-semibold text-white">Skill Certified</span>
      </div>

      {/* Immersive Floating Metric Badge - Bottom Left */}
      <div className="hidden sm:flex absolute bottom-16 left-4 bg-indigo-950/60 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 shadow-xl items-center gap-3 pointer-events-none z-10">
        <div className="text-2xl font-bold text-white font-mono">98%</div>
        <div className="text-[10px] uppercase text-gray-400 tracking-wider leading-tight">
          Success<br />Rate
        </div>
      </div>

      {/* Interactive Node Hover Tooltip */}
      {hoveredNode && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 transition-all duration-200">
          <div className="px-5 py-2.5 rounded-2xl bg-[#050508]/90 backdrop-blur-xl border border-blue-400/60 shadow-[0_0_30px_rgba(37,99,235,0.4)] text-center animate-bounce">
            <span className="text-[10px] uppercase tracking-widest text-blue-400 font-mono block">CLICK TO EXPLORE TRACK</span>
            <span className="text-base font-bold text-white tracking-wide">{hoveredNode}</span>
          </div>
        </div>
      )}

      {/* Interactive Quick Skill Chips at Bottom */}
      <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
          {['Web 3D', 'AI Agents', 'UI/UX 3D', 'Freelance Pro', 'Motion VFX'].map((tag) => (
            <button
              key={tag}
              id={`hero-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => {
                playClickSound();
                if (onSelectNode) onSelectNode(tag);
              }}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-white/5 hover:bg-blue-600/30 text-gray-300 hover:text-white border border-white/10 hover:border-blue-400/50 transition-all cursor-pointer backdrop-blur-md uppercase tracking-wider"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2 pointer-events-auto text-xs text-gray-400 font-mono bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          <span>🖱️ Mouse Parallax Active</span>
        </div>
      </div>
    </div>
  );
};
