"use client";

import { useEffect, useRef } from "react";

/**
 * Fond 3D de l'accueil (Three.js) :
 * étoile marocaine à 8 branches en or poli, anneau doré en orbite et
 * particules violettes / dorées. L'étoile se place derrière l'élément
 * désigné par `targetId` (la photo de l'équipe) et suit la souris.
 *
 * Précautions :
 * - Three.js n'est chargé que sur l'accueil, après l'affichage de la page ;
 * - version allégée sur téléphone (moins de particules, résolution réduite) ;
 * - animation en pause quand le haut de page n'est plus visible ;
 * - « réduire les animations » activé → une seule image fixe ;
 * - pas de WebGL → rien ne s'affiche, le fond violet reste en place.
 */
export function Hero3D({ targetId }: { targetId: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (disposed) return;

      const isMobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: "high-performance" });
      } catch {
        return; // WebGL indisponible : on garde le fond CSS.
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.95;
      const canvas = renderer.domElement;
      canvas.setAttribute("aria-hidden", "true");
      canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 1.4s ease";
      host.appendChild(canvas);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0, 14);

      // Reflets « studio » pour un métal convaincant
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;

      scene.add(new THREE.AmbientLight(0xffffff, 0.25));
      const key = new THREE.DirectionalLight(0xfff1c4, 2.2);
      key.position.set(4, 6, 8);
      scene.add(key);
      const violetLight = new THREE.PointLight(0xb13cbb, 16, 30);
      violetLight.position.set(-5, -3, 4);
      scene.add(violetLight);

      // ── Étoile à 8 branches (Rub el Hizb) ──
      const group = new THREE.Group();
      scene.add(group);
      const shape = new THREE.Shape();
      const points = 8, R = 1, r = 0.72;
      for (let i = 0; i <= points * 2; i++) {
        const a = (i / (points * 2)) * Math.PI * 2 + Math.PI / 8;
        const rad = i % 2 === 0 ? R : r;
        const x = Math.cos(a) * rad, y = Math.sin(a) * rad;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      // Cœur évidé : l'étoile devient un cadre, comme sur les zelliges
      const hole = new THREE.Path();
      hole.absarc(0, 0, 0.42, 0, Math.PI * 2, true);
      shape.holes.push(hole);
      const starGeo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.16, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.045, bevelSegments: isMobile ? 2 : 5, curveSegments: 48,
      });
      starGeo.center();
      const gold = new THREE.MeshStandardMaterial({ color: 0xf8c012, metalness: 1, roughness: 0.22, envMapIntensity: 1.3 });
      const star = new THREE.Mesh(starGeo, gold);
      group.add(star);

      // Étoile violette en retrait (profondeur)
      const back = new THREE.Mesh(
        starGeo,
        new THREE.MeshStandardMaterial({ color: 0x4a0d50, metalness: 0.85, roughness: 0.32, emissive: 0x16051a, emissiveIntensity: 0.5, envMapIntensity: 0.7 }),
      );
      back.scale.setScalar(1.12);
      back.position.z = -0.45;
      back.rotation.z = Math.PI / 8;
      group.add(back);

      // Anneau doré en orbite
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.32, 0.014, 16, 160), gold);
      ring.rotation.x = Math.PI / 2.6;
      group.add(ring);
      const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(1.52, 0.006, 12, 160),
        new THREE.MeshBasicMaterial({ color: 0xf8c012, transparent: true, opacity: 0.35 }),
      );
      ring2.rotation.set(Math.PI / 2.2, 0.4, 0);
      group.add(ring2);

      // ── Particules ──
      const count = isMobile ? 220 : 650;
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const cGold = new THREE.Color(0xf8c012), cViolet = new THREE.Color(0xc78ccb), cWhite = new THREE.Color(0xfff6dc);
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 26;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
        const c = Math.random() < 0.5 ? cGold : Math.random() < 0.7 ? cViolet : cWhite;
        col.set([c.r, c.g, c.b], i * 3);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      pGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
      const dot = document.createElement("canvas");
      dot.width = dot.height = 64;
      const g = dot.getContext("2d")!;
      const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.35, "rgba(255,255,255,0.55)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 64);
      const pTex = new THREE.CanvasTexture(dot);
      const pMat = new THREE.PointsMaterial({
        size: isMobile ? 0.11 : 0.09, map: pTex, vertexColors: true, transparent: true, opacity: 0.85,
        depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
      });
      const particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

      // ── Placement : l'étoile suit la photo d'équipe ──
      const hero = host.parentElement!;
      const place = () => {
        const w = hero.clientWidth, h = hero.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const worldH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
        const worldW = worldH * camera.aspect;
        const target = document.getElementById(targetId);
        const hr = hero.getBoundingClientRect();
        if (target) {
          const tr = target.getBoundingClientRect();
          const cx = (tr.left + tr.width / 2 - hr.left) / w;
          const cy = (tr.top + tr.height / 2 - hr.top) / h;
          group.position.set((cx - 0.5) * worldW, -(cy - 0.5) * worldH, 0);
          const s = ((tr.height * (isMobile ? 0.46 : 0.5)) / h) * worldH;
          group.scale.setScalar(Math.max(1.2, s));
        } else {
          group.position.set(worldW * 0.25, 0, 0);
          group.scale.setScalar(worldH * 0.3);
        }
      };
      place();
      const ro = new ResizeObserver(place);
      ro.observe(hero);

      // ── Interaction ──
      const pointer = { x: 0, y: 0 }, eased = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let visible = true, running = false, raf = 0;
      const clock = new THREE.Clock();
      const frame = () => {
        const t = clock.getElapsedTime();
        const scroll = Math.min(window.scrollY / Math.max(1, hero.clientHeight), 1);
        eased.x += (pointer.x - eased.x) * 0.05;
        eased.y += (pointer.y - eased.y) * 0.05;
        star.rotation.z = t * 0.18 + scroll * 1.2;
        back.rotation.z = Math.PI / 8 - t * 0.1;
        group.rotation.x = eased.y * 0.35 + Math.sin(t * 0.5) * 0.08;
        group.rotation.y = eased.x * 0.5 + Math.cos(t * 0.4) * 0.1;
        group.position.y += Math.sin(t * 0.9) * 0.0015;
        ring.rotation.z = t * 0.35;
        ring2.rotation.z = -t * 0.22;
        particles.rotation.y = t * 0.02 + eased.x * 0.05;
        particles.position.y = Math.sin(t * 0.25) * 0.2 + scroll * 1.5;
        violetLight.position.x = -5 + Math.sin(t * 0.6) * 2;
        renderer.render(scene, camera);
        if (running) raf = requestAnimationFrame(frame);
      };
      const start = () => {
        if (running || reduceMotion || !visible || document.hidden) return;
        running = true;
        clock.start();
        raf = requestAnimationFrame(frame);
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(raf);
      };

      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible) start();
        else stop();
      });
      io.observe(hero);
      const onVis = () => (document.hidden ? stop() : start());
      document.addEventListener("visibilitychange", onVis);

      frame(); // première image (et seule image si « réduire les animations »)
      requestAnimationFrame(() => (canvas.style.opacity = "1"));
      start();

      cleanup = () => {
        stop();
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("visibilitychange", onVis);
        starGeo.dispose();
        pGeo.dispose();
        pTex.dispose();
        envTex.dispose();
        pmrem.dispose();
        renderer.dispose();
        canvas.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [targetId]);

  return <div ref={hostRef} className="pointer-events-none absolute inset-0" aria-hidden />;
}
