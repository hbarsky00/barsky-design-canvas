import React, { useEffect, useRef } from "react";
import alienShipNightUrl from "@/assets/hero-alien-ship.png";
import alienShipDayUrl from "@/assets/hero-alien-ship-day.png";


/**
 * Spawns shooting stars, meteors, and airplanes into the parallax hero sky.
 * DOM-only (no canvas) so the parent parallax transform still works.
 */
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const SkyEffects: React.FC = () => {
  const fxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = fxRef.current;
    if (!layer) return;

    // Respect reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const tracked = new Set<HTMLElement>();

    const append = (el: HTMLElement, lifeMs: number) => {
      layer.appendChild(el);
      tracked.add(el);
      const onEnd = () => {
        el.removeEventListener("animationend", onEnd);
        if (el.parentNode) el.parentNode.removeChild(el);
        tracked.delete(el);
      };
      el.addEventListener("animationend", onEnd);
      // Hard fallback cleanup in case animationend doesn't fire
      const t = setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
        tracked.delete(el);
      }, lifeMs + 500);
      timeouts.push(t);
    };

    const spawnShootingStar = () => {
      const el = document.createElement("span");
      el.className = "sky-shooting-star";
      el.style.left = `${rand(0, 80)}%`;
      el.style.top = `${rand(5, 50)}%`;
      append(el, 800);
    };

    const spawnMeteor = () => {
      const el = document.createElement("span");
      el.className = "sky-meteor";
      el.style.left = `${rand(0, 60)}%`;
      el.style.top = `${rand(2, 30)}%`;

      // Glowing endpoint dot (delayed fade)
      const dot = document.createElement("span");
      dot.className = "sky-meteor-dot";
      el.appendChild(dot);

      append(el, 1600);
    };

    const rafs = new Set<number>();

    const spawnAirplane = () => {
      const heroW = layer.clientWidth || window.innerWidth;
      const heroH = layer.clientHeight || window.innerHeight;
      const rtl = Math.random() < 0.5;
      const dir = rtl ? -1 : 1;

      // Plane element
      const el = document.createElement("span");
      el.className = "sky-airplane";
      const body = document.createElement("span");
      body.className = "sky-airplane-body";
      body.innerHTML =
        '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">' +
        '<path fill="currentColor" d="M21 12l-7-1.2V5.5a1.5 1.5 0 0 0-3 0v5.3L4 12v1.6l7-1v3.7l-1.8 1v1.2L12 18l2.8.5v-1.2l-1.8-1v-3.7l7 1V12z"/>' +
        '</svg>';
      // Nose points right by default; rotate so nose follows direction
      body.style.setProperty("--plane-rot", dir > 0 ? "90deg" : "-90deg");
      el.appendChild(body);
      layer.appendChild(el);
      tracked.add(el);

      const durationS = rand(10, 18);
      const startX = dir > 0 ? -50 : heroW + 50;
      const endX = dir > 0 ? heroW + 50 : -50;
      const speedPxPerMs = (endX - startX) / (durationS * 1000); // signed
      const baseY = rand(0.1, 0.45) * heroH;

      const plane = {
        x: startX,
        y: baseY,
        targetY: baseY,
        baseY,
        w: 26,
        h: 26,
      };

      // Hard cleanup — guarantees the plane is removed even if rAF stalls
      // (e.g. the tab was backgrounded mid-flight). Without this, planes
      // accumulate over time because spawning is on setTimeout but motion
      // is on requestAnimationFrame.
      const planeCleanupT = setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
        tracked.delete(el);
      }, (durationS + 4) * 1000);
      timeouts.push(planeCleanupT);


      // Spawn 1–2 alien ships from the opposite direction during the flight
      type Ship = { el: HTMLImageElement; x: number; y: number; vx: number; w: number; h: number; alive: boolean };
      const ships: Ship[] = [];
      const shipCount = Math.random() < 0.55 ? 1 : 2;
      for (let i = 0; i < shipCount; i++) {
        const sEl = document.createElement("img");
        const isDay = !!layer.closest(".parallax-hero")?.classList.contains("is-day");
        sEl.src = isDay ? alienShipDayUrl : alienShipNightUrl;
        sEl.alt = "";
        // Ship PNG faces left by default. If plane goes left, ship must travel right → mirror.
        sEl.className = "sky-alien-ship" + (dir < 0 ? " is-mirrored" : "");
        // If plane goes right, ship faces left (image default faces left) → mirror when dir<0
        // Ship comes from opposite edge
        const shipDurS = rand(6, 10);
        const sStartX = dir > 0 ? heroW + 80 : -80;
        const sEndX = dir > 0 ? -120 : heroW + 120;
        const sSpeed = (sEndX - sStartX) / (shipDurS * 1000);
        // Lane near plane's baseY so a collision is plausible
        const laneY = Math.max(20, Math.min(heroH * 0.6, baseY + rand(-40, 40)));
        const w = 64;
        const h = 36;
        Object.assign(sEl.style, {
          width: `${w}px`,
          height: "auto",
        });
        layer.appendChild(sEl);
        tracked.add(sEl);
        const launchDelay = (i === 0 ? rand(0.2, 1.0) : rand(2.0, 4.0)) * 1000;
        const ship: Ship = { el: sEl, x: sStartX + sSpeed * -launchDelay, y: laneY, vx: sSpeed, w, h, alive: true };
        ships.push(ship);
        // Hard cleanup
        const t = setTimeout(() => {
          if (sEl.parentNode) sEl.parentNode.removeChild(sEl);
          tracked.delete(sEl);
          ship.alive = false;
        }, (durationS + 2) * 1000);
        timeouts.push(t);
      }

      let last = performance.now();
      let raf = 0;
      const tick = (now: number) => {
        const dt = Math.min(48, now - last);
        last = now;

        // Advance plane
        plane.x += speedPxPerMs * dt;

        // Advance ships and check for impending collision
        const lookAhead = 450;
        let dodgeY: number | null = null;
        for (const s of ships) {
          if (!s.alive) continue;
          s.x += s.vx * dt;
          s.el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)${dir < 0 ? " scaleX(-1)" : ""}`;
          const pFx = plane.x + speedPxPerMs * lookAhead;
          const sFx = s.x + s.vx * lookAhead;
          const horizOverlap =
            Math.abs(pFx - sFx) < (plane.w + s.w) / 2 + 30 ||
            Math.abs(plane.x - s.x) < (plane.w + s.w) / 2 + 20;
          const vertOverlap = Math.abs(plane.y - s.y) < (plane.h + s.h) / 2 + 24;
          if (horizOverlap && vertOverlap && dodgeY === null) {
            const up = s.y - 70;
            const down = s.y + 70;
            const upRoom = up;
            const downRoom = heroH * 0.7 - down;
            dodgeY = upRoom > downRoom ? Math.max(15, up) : Math.min(heroH * 0.7, down);
          }
        }


        plane.targetY = dodgeY ?? plane.baseY;
        plane.y += (plane.targetY - plane.y) * Math.min(1, dt / 220);

        // Tilt body proportional to vertical motion
        const dy = plane.targetY - plane.y;
        const tilt = Math.max(-18, Math.min(18, -dy * 0.4)) * dir;
        body.style.setProperty("--plane-tilt", `${tilt}deg`);

        el.style.transform = `translate3d(${plane.x}px, ${plane.y}px, 0)`;

        // Done?
        const finished = dir > 0 ? plane.x > endX : plane.x < endX;
        if (finished) {
          if (el.parentNode) el.parentNode.removeChild(el);
          tracked.delete(el);
          for (const s of ships) {
            if (s.el.parentNode) s.el.parentNode.removeChild(s.el);
            tracked.delete(s.el);
            s.alive = false;
          }
          rafs.delete(raf);
          return;
        }
        raf = requestAnimationFrame(tick);
        rafs.add(raf);
      };
      raf = requestAnimationFrame(tick);
      rafs.add(raf);
    };


    const spawnHelicopter = () => {
      const heroW = layer.clientWidth || window.innerWidth;
      const rtl = Math.random() < 0.5;
      const el = document.createElement("span");
      el.className = "sky-helicopter" + (rtl ? " sky-helicopter--rtl" : "");
      // Wider altitude band; helicopters tend to fly lower than planes
      el.style.top = `${rand(18, 65)}%`;
      // Randomize speed per flight (12s brisk → 24s lazy)
      const durationS = rand(12, 24);
      el.style.animationDuration = `${durationS}s`;

      const body = document.createElement("span");
      body.className = "sky-helicopter-body";
      body.textContent = "🚁";
      el.appendChild(body);

      const light = document.createElement("span");
      light.className = "sky-helicopter-light";
      el.appendChild(light);

      if (rtl) {
        el.style.left = `${heroW + 40}px`;
        el.style.setProperty("--heli-distance", `${-(heroW + 120)}px`);
      } else {
        el.style.left = `-40px`;
        el.style.setProperty("--heli-distance", `${heroW + 80}px`);
      }
      append(el, durationS * 1000 + 500);
    };


    const spawnUfo = () => {
      const heroW = layer.clientWidth || window.innerWidth;
      const rtl = Math.random() < 0.5;
      const isDay = !!layer.closest(".parallax-hero")?.classList.contains("is-day");
      // Rare event: a mothership — much bigger, higher, slower, brighter beam.
      const isMothership = Math.random() < 0.18;

      const el = document.createElement("span");
      el.className = "sky-ufo" + (isMothership ? " sky-ufo--mothership" : "");
      el.style.top = isMothership ? `${rand(4, 16)}%` : `${rand(8, 45)}%`;
      const durS = isMothership ? rand(26, 34) : rand(14, 20);
      el.style.animationDuration = `${durS}s`;

      const img = document.createElement("img");
      img.src = isDay ? alienShipDayUrl : alienShipNightUrl;
      img.alt = "";
      // Ship art faces left; mirror it when the flight path goes left-to-right.
      img.className = "sky-ufo-img" + (rtl ? "" : " is-mirrored");
      el.appendChild(img);

      const beam = document.createElement("span");
      beam.className = "sky-ufo-beam";
      el.appendChild(beam);

      if (rtl) {
        el.style.left = `${heroW + 80}px`;
        el.style.setProperty("--ufo-distance", `${-(heroW + 240)}px`);
      } else {
        el.style.left = `-80px`;
        el.style.setProperty("--ufo-distance", `${heroW + 200}px`);
      }
      append(el, durS * 1000 + 500);
    };

    // Fighter jets: fast, straight, afterburner + contrails, sometimes a
    // two-ship formation. Night flights get a hotter afterburner glow via CSS.
    const spawnJet = () => {
      const heroW = layer.clientWidth || window.innerWidth;
      const rtl = Math.random() < 0.5;
      const formation = Math.random() < 0.35 ? 2 : 1;

      const flight = document.createElement("span");
      flight.className = "sky-jet-flight" + (rtl ? " is-rtl" : "");
      flight.style.top = `${rand(6, 36)}%`;
      const durS = rand(3.8, 6);
      flight.style.animationDuration = `${durS}s`;
      flight.style.setProperty("--jet-climb", `${rand(-36, 20)}px`);

      const jetSvg =
        '<svg viewBox="0 0 64 20" width="38" height="12" aria-hidden="true" focusable="false">' +
        '<path fill="currentColor" d="M63 10 L46 7.4 L38 4.5 L34.5 1 L33 4.2 L20 5.6 L14 1.8 L16.5 6.4 L4 8.2 L1 10 L4 11.8 L16.5 13.6 L14 18.2 L20 14.4 L33 15.8 L34.5 19 L38 15.5 L46 12.6 Z"/>' +
        "</svg>";

      for (let i = 0; i < formation; i++) {
        const jet = document.createElement("span");
        jet.className = "sky-jet" + (i === 1 ? " sky-jet--wingman" : "");
        const trail = document.createElement("span");
        trail.className = "sky-jet-contrail";
        const trail2 = document.createElement("span");
        trail2.className = "sky-jet-contrail sky-jet-contrail--lower";
        const body = document.createElement("span");
        body.className = "sky-jet-body";
        body.innerHTML = jetSvg;
        const flame = document.createElement("span");
        flame.className = "sky-jet-flame";
        jet.append(trail, trail2, flame, body);
        flight.appendChild(jet);
      }

      if (rtl) {
        flight.style.left = `${heroW + 220}px`;
        flight.style.setProperty("--jet-distance", `${-(heroW + 460)}px`);
      } else {
        flight.style.left = `-220px`;
        flight.style.setProperty("--jet-distance", `${heroW + 460}px`);
      }
      append(flight, durS * 1000 + 500);
    };

    const scheduleLoop = (fn: () => void, minS: number, maxS: number) => {
      let cancelled = false;
      const tick = () => {
        if (cancelled) return;
        // Skip spawning while the tab is hidden — rAF is paused, so anything
        // we spawn here would just accumulate in the DOM until the user returns.
        if (typeof document === "undefined" || !document.hidden) {
          fn();
        }
        const t = setTimeout(tick, rand(minS, maxS) * 1000);
        timeouts.push(t);
      };
      const t = setTimeout(tick, rand(minS, maxS) * 1000);
      timeouts.push(t);
      return () => {
        cancelled = true;
      };
    };


    const cancelStar = scheduleLoop(spawnShootingStar, 4, 8);
    const cancelMeteor = scheduleLoop(spawnMeteor, 15, 30);
    const cancelPlane = scheduleLoop(spawnAirplane, 45, 90);
    const cancelHeli = scheduleLoop(spawnHelicopter, 20, 50);
    const cancelUfo = scheduleLoop(spawnUfo, 30, 70);
    const cancelJet = scheduleLoop(spawnJet, 22, 50);

    return () => {
      cancelStar();
      cancelMeteor();
      cancelPlane();
      cancelHeli();
      cancelUfo();
      cancelJet();
      timeouts.forEach(clearTimeout);
      rafs.forEach((id) => cancelAnimationFrame(id));
      rafs.clear();
      tracked.forEach((el) => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
      tracked.clear();
    };
  }, []);

  return <div ref={fxRef} aria-hidden className="parallax-fx" />;
};

export default SkyEffects;
