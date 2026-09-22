import React, { useEffect, useRef, useState } from "react";

/**
 * Minimal Pac-Man. Single maze, 2 ghosts, pellets + 4 power pellets.
 * Arrow keys / WASD to move. Mobile: swipe inside the canvas.
 * Keeps things small to stay within the Win98 window aesthetic.
 */

const MAP = [
  "###################",
  "#........#........#",
  "#o##.###.#.###.##o#",
  "#.................#",
  "#.##.#.#####.#.##.#",
  "#....#...#...#....#",
  "####.### # ###.####",
  "   #.#       #.#   ",
  "####.# ##=## #.####",
  "#......#   #......#",
  "####.# ##### #.####",
  "   #.#       #.#   ",
  "####.# ##### #.####",
  "#........#........#",
  "#.##.###.#.###.##.#",
  "#o.#...........#.o#",
  "##.#.#.#####.#.#.##",
  "#....#...#...#....#",
  "#.######.#.######.#",
  "#.................#",
  "###################",
];

const TILE = 14;
const COLS = MAP[0].length;
const ROWS = MAP.length;

type Dir = "up" | "down" | "left" | "right" | "none";
const DV: Record<Dir, [number, number]> = {
  up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0], none: [0, 0],
};

const PacMan: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");

  const stateRef = useRef({
    pellets: new Set<string>(),
    power: new Set<string>(),
    pac: { x: 9, y: 15, dir: "left" as Dir, next: "left" as Dir, subX: 0, subY: 0 },
    ghosts: [
      { x: 9, y: 9, dir: "left" as Dir, color: "#ff0000", scared: 0 },
      { x: 9, y: 10, dir: "right" as Dir, color: "#00ffff", scared: 0 },
    ],
    tick: 0,
  });

  const reset = () => {
    const pellets = new Set<string>();
    const power = new Set<string>();
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const c = MAP[y][x];
        if (c === ".") pellets.add(`${x},${y}`);
        if (c === "o") power.add(`${x},${y}`);
      }
    }
    stateRef.current = {
      pellets,
      power,
      pac: { x: 9, y: 15, dir: "left", next: "left", subX: 0, subY: 0 },
      ghosts: [
        { x: 9, y: 9, dir: "left", color: "#ff0000", scared: 0 },
        { x: 9, y: 10, dir: "right", color: "#00ffff", scared: 0 },
      ],
      tick: 0,
    };
    setScore(0);
    setLives(3);
    setStatus("playing");
  };

  useEffect(() => { reset(); }, []);

  const isWall = (x: number, y: number) => {
    if (y < 0 || y >= ROWS) return true;
    const nx = ((x % COLS) + COLS) % COLS;
    const c = MAP[y][nx];
    return c === "#" || c === "=";
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
        w: "up", s: "down", a: "left", d: "right", W: "up", S: "down", A: "left", D: "right",
      };
      const dir = map[e.key];
      if (dir) { stateRef.current.pac.next = dir; e.preventDefault(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Swipe controls
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    let sx = 0, sy = 0;
    const ts = (e: TouchEvent) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; };
    const te = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      stateRef.current.pac.next = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up");
    };
    el.addEventListener("touchstart", ts);
    el.addEventListener("touchend", te);
    return () => { el.removeEventListener("touchstart", ts); el.removeEventListener("touchend", te); };
  }, []);

  useEffect(() => {
    let raf = 0;
    let last = 0;
    const step = (t: number) => {
      raf = requestAnimationFrame(step);
      if (t - last < 130) return;
      last = t;
      if (status !== "playing") return;

      const st = stateRef.current;
      st.tick++;

      // Pac movement
      const tryDir = (d: Dir) => {
        const [dx, dy] = DV[d];
        return !isWall(st.pac.x + dx, st.pac.y + dy);
      };
      if (tryDir(st.pac.next)) st.pac.dir = st.pac.next;
      if (tryDir(st.pac.dir)) {
        const [dx, dy] = DV[st.pac.dir];
        st.pac.x = ((st.pac.x + dx + COLS) % COLS);
        st.pac.y += dy;
      }

      // Eat
      const key = `${st.pac.x},${st.pac.y}`;
      if (st.pellets.has(key)) { st.pellets.delete(key); setScore((s) => s + 10); }
      if (st.power.has(key)) {
        st.power.delete(key);
        setScore((s) => s + 50);
        st.ghosts.forEach((g) => (g.scared = 30));
      }

      // Ghosts: simple — choose dir toward pac with 70% bias, else random valid
      for (const g of st.ghosts) {
        if (g.scared > 0) g.scared--;
        const dirs: Dir[] = ["up", "down", "left", "right"];
        const valid = dirs.filter((d) => {
          const [dx, dy] = DV[d];
          if (isWall(g.x + dx, g.y + dy)) return false;
          // don't immediately reverse
          const opp: Record<Dir, Dir> = { up: "down", down: "up", left: "right", right: "left", none: "none" };
          return d !== opp[g.dir] || Math.random() < 0.1;
        });
        if (valid.length) {
          let chosen = valid[Math.floor(Math.random() * valid.length)];
          if (Math.random() < 0.7) {
            valid.sort((a, b) => {
              const [ax, ay] = DV[a], [bx, by] = DV[b];
              const da = Math.abs(g.x + ax - st.pac.x) + Math.abs(g.y + ay - st.pac.y);
              const db = Math.abs(g.x + bx - st.pac.x) + Math.abs(g.y + by - st.pac.y);
              return g.scared > 0 ? db - da : da - db;
            });
            chosen = valid[0];
          }
          g.dir = chosen;
          const [dx, dy] = DV[g.dir];
          g.x = ((g.x + dx + COLS) % COLS);
          g.y += dy;
        }

        // Collision
        if (g.x === st.pac.x && g.y === st.pac.y) {
          if (g.scared > 0) {
            g.x = 9; g.y = 9; g.scared = 0;
            setScore((s) => s + 200);
          } else {
            setLives((l) => {
              const nl = l - 1;
              if (nl <= 0) setStatus("lost");
              else {
                st.pac.x = 9; st.pac.y = 15; st.pac.dir = "left"; st.pac.next = "left";
              }
              return nl;
            });
          }
        }
      }

      if (st.pellets.size === 0 && st.power.size === 0) setStatus("won");

      // Draw
      const c = canvasRef.current;
      if (!c) return;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, c.width, c.height);

      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const ch = MAP[y][x];
          if (ch === "#") {
            ctx.fillStyle = "#0000aa";
            ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
            ctx.fillStyle = "#000";
            ctx.fillRect(x * TILE + 2, y * TILE + 2, TILE - 4, TILE - 4);
            ctx.fillStyle = "#0000aa";
            ctx.fillRect(x * TILE + 4, y * TILE + 4, TILE - 8, TILE - 8);
          } else if (ch === "=") {
            ctx.fillStyle = "#ff80c0";
            ctx.fillRect(x * TILE, y * TILE + TILE / 2 - 1, TILE, 2);
          }
        }
      }
      ctx.fillStyle = "#ffb8a8";
      st.pellets.forEach((k) => {
        const [x, y] = k.split(",").map(Number);
        ctx.fillRect(x * TILE + TILE / 2 - 1, y * TILE + TILE / 2 - 1, 2, 2);
      });
      ctx.fillStyle = "#ffb8a8";
      st.power.forEach((k) => {
        const [x, y] = k.split(",").map(Number);
        ctx.beginPath();
        ctx.arc(x * TILE + TILE / 2, y * TILE + TILE / 2, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Pac
      ctx.fillStyle = "#ffff00";
      ctx.beginPath();
      const px = st.pac.x * TILE + TILE / 2;
      const py = st.pac.y * TILE + TILE / 2;
      const mouth = (st.tick % 2 === 0) ? 0.25 : 0.05;
      const baseAngle = { right: 0, down: Math.PI / 2, left: Math.PI, up: -Math.PI / 2, none: 0 }[st.pac.dir];
      ctx.moveTo(px, py);
      ctx.arc(px, py, TILE / 2 - 1, baseAngle + mouth * Math.PI, baseAngle - mouth * Math.PI + Math.PI * 2);
      ctx.closePath();
      ctx.fill();

      // Ghosts
      for (const g of st.ghosts) {
        ctx.fillStyle = g.scared > 0 ? "#2020ff" : g.color;
        const gx = g.x * TILE, gy = g.y * TILE;
        ctx.beginPath();
        ctx.arc(gx + TILE / 2, gy + TILE / 2, TILE / 2 - 1, Math.PI, 0);
        ctx.lineTo(gx + TILE - 1, gy + TILE - 1);
        ctx.lineTo(gx + 1, gy + TILE - 1);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.fillRect(gx + 3, gy + 5, 3, 4);
        ctx.fillRect(gx + TILE - 6, gy + 5, 3, 4);
        ctx.fillStyle = "#000";
        ctx.fillRect(gx + 4, gy + 6, 2, 2);
        ctx.fillRect(gx + TILE - 5, gy + 6, 2, 2);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [status]);

  return (
    <div style={{ background: "#c0c0c0" }} className="p-2 select-none">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={reset} className="raise w98-btn" style={{ minWidth: 70 }}>New</button>
        <div className="sunk text-[11px] text-black px-2 py-[2px]">Score: {score}</div>
        <div className="sunk text-[11px] text-black px-2 py-[2px]">Lives: {lives}</div>
        {status !== "playing" && (
          <div className="sunk text-[11px] text-black px-2 py-[2px] flex-1 text-center font-bold">
            {status === "won" ? "You win!" : "Game over"}
          </div>
        )}
      </div>
      <div className="sunk inline-block">
        <canvas
          ref={canvasRef}
          width={COLS * TILE}
          height={ROWS * TILE}
          tabIndex={0}
          style={{ display: "block", touchAction: "none" }}
        />
      </div>
      <div className="text-[10px] text-black mt-1">Arrow keys / WASD · swipe on mobile</div>
    </div>
  );
};

export default PacMan;
