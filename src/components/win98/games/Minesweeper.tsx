import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Difficulty = "beginner" | "intermediate" | "expert";
const PRESETS: Record<Difficulty, { rows: number; cols: number; mines: number }> = {
  beginner: { rows: 9, cols: 9, mines: 10 },
  intermediate: { rows: 16, cols: 16, mines: 40 },
  expert: { rows: 16, cols: 30, mines: 99 },
};

type CellState = "hidden" | "revealed" | "flag" | "question";
interface Cell {
  mine: boolean;
  adj: number;
  state: CellState;
}

const NUM_COLORS = ["", "#0000ff", "#008000", "#ff0000", "#000080", "#800000", "#008080", "#000000", "#808080"];

function makeEmpty(rows: number, cols: number): Cell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ mine: false, adj: 0, state: "hidden" as CellState }))
  );
}

function placeMines(board: Cell[][], mines: number, safeR: number, safeC: number) {
  const rows = board.length;
  const cols = board[0].length;
  const forbidden = new Set<number>();
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -1; dc <= 1; dc++) {
      const r = safeR + dr, c = safeC + dc;
      if (r >= 0 && r < rows && c >= 0 && c < cols) forbidden.add(r * cols + c);
    }
  let placed = 0;
  while (placed < mines) {
    const idx = Math.floor(Math.random() * rows * cols);
    if (forbidden.has(idx)) continue;
    const r = Math.floor(idx / cols), c = idx % cols;
    if (board[r][c].mine) continue;
    board[r][c].mine = true;
    placed++;
  }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      if (board[r][c].mine) continue;
      let n = 0;
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const rr = r + dr, cc = c + dc;
          if (rr >= 0 && rr < rows && cc >= 0 && cc < cols && board[rr][cc].mine) n++;
        }
      board[r][c].adj = n;
    }
}

function floodReveal(board: Cell[][], r: number, c: number) {
  const rows = board.length, cols = board[0].length;
  const stack = [[r, c]];
  while (stack.length) {
    const [cr, cc] = stack.pop()!;
    const cell = board[cr][cc];
    if (cell.state === "revealed" || cell.state === "flag") continue;
    cell.state = "revealed";
    if (cell.adj === 0 && !cell.mine) {
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const nr = cr + dr, nc = cc + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].state !== "revealed")
            stack.push([nr, nc]);
        }
    }
  }
}

const LcdDigits: React.FC<{ value: number; width?: number }> = ({ value, width = 3 }) => {
  const v = Math.max(-99, Math.min(999, value));
  const str = v < 0 ? "-" + String(Math.abs(v)).padStart(width - 1, "0") : String(v).padStart(width, "0");
  return (
    <div
      className="px-1 py-[2px] font-mono text-[18px] leading-none"
      style={{ background: "#000", color: "#ff0000", border: "1px inset #808080", letterSpacing: "1px" }}
    >
      {str}
    </div>
  );
};

const Minesweeper: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");
  const preset = PRESETS[difficulty];
  const [board, setBoard] = useState<Cell[][]>(() => makeEmpty(preset.rows, preset.cols));
  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [flags, setFlags] = useState(0);
  const [time, setTime] = useState(0);
  const [face, setFace] = useState<"smile" | "ooh" | "dead" | "cool">("smile");
  const timerRef = useRef<number | null>(null);
  const longPressRef = useRef<number | null>(null);
  const longPressed = useRef(false);

  const reset = useCallback((d: Difficulty = difficulty) => {
    const p = PRESETS[d];
    setBoard(makeEmpty(p.rows, p.cols));
    setStarted(false);
    setStatus("playing");
    setFlags(0);
    setTime(0);
    setFace("smile");
    if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
  }, [difficulty]);

  useEffect(() => { reset(difficulty); }, [difficulty, reset]);

  useEffect(() => () => { if (timerRef.current) window.clearInterval(timerRef.current); }, []);

  const startTimer = () => {
    if (timerRef.current) return;
    timerRef.current = window.setInterval(() => {
      setTime((t) => Math.min(999, t + 1));
    }, 1000);
  };
  const stopTimer = () => {
    if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
  };

  const checkWin = (b: Cell[][]) => {
    for (const row of b) for (const cell of row) {
      if (!cell.mine && cell.state !== "revealed") return false;
    }
    return true;
  };

  const revealAt = (r: number, c: number) => {
    if (status !== "playing") return;
    const cell = board[r][c];
    if (cell.state === "revealed" || cell.state === "flag") return;

    const nb = board.map((row) => row.map((cc) => ({ ...cc })));
    if (!started) {
      placeMines(nb, preset.mines, r, c);
      setStarted(true);
      startTimer();
    }
    const target = nb[r][c];
    if (target.mine) {
      // explode
      for (const row of nb) for (const cc of row) {
        if (cc.mine) cc.state = "revealed";
      }
      target.state = "revealed";
      setBoard(nb);
      setStatus("lost");
      setFace("dead");
      stopTimer();
      return;
    }
    floodReveal(nb, r, c);
    setBoard(nb);
    if (checkWin(nb)) {
      // auto-flag remaining mines
      for (const row of nb) for (const cc of row) {
        if (cc.mine && cc.state !== "flag") cc.state = "flag";
      }
      setFlags(preset.mines);
      setStatus("won");
      setFace("cool");
      stopTimer();
    }
  };

  const cycleFlag = (r: number, c: number) => {
    if (status !== "playing") return;
    const nb = board.map((row) => row.map((cc) => ({ ...cc })));
    const cell = nb[r][c];
    if (cell.state === "revealed") return;
    if (cell.state === "hidden") { cell.state = "flag"; setFlags((f) => f + 1); }
    else if (cell.state === "flag") { cell.state = "question"; setFlags((f) => f - 1); }
    else { cell.state = "hidden"; }
    setBoard(nb);
  };

  const onCellPointerDown = (r: number, c: number, e: React.PointerEvent) => {
    if (e.button === 2) return;
    longPressed.current = false;
    setFace("ooh");
    if (e.pointerType === "touch") {
      longPressRef.current = window.setTimeout(() => {
        longPressed.current = true;
        cycleFlag(r, c);
        setFace("smile");
      }, 400);
    }
  };
  const onCellPointerUp = (r: number, c: number, e: React.PointerEvent) => {
    if (longPressRef.current) { window.clearTimeout(longPressRef.current); longPressRef.current = null; }
    if (status === "playing") setFace("smile");
    if (longPressed.current) return;
    if (e.button === 2) return;
    revealAt(r, c);
  };
  const onCellContextMenu = (r: number, c: number, e: React.MouseEvent) => {
    e.preventDefault();
    cycleFlag(r, c);
  };

  const headerFace = useMemo(() => {
    switch (face) {
      case "ooh": return "😮";
      case "dead": return "💀";
      case "cool": return "😎";
      default: return "🙂";
    }
  }, [face]);

  const cellSize = preset.cols > 20 ? 18 : 22;

  return (
    <div className="text-black" style={{ fontFamily: "'MS Sans Serif', Tahoma, Arial, sans-serif" }}>
      {/* Difficulty selector */}
      <div className="flex gap-1 mb-2 text-[11px]">
        {(["beginner", "intermediate", "expert"] as Difficulty[]).map((d) => (
          <button
            key={d}
            onClick={() => setDifficulty(d)}
            className={`${difficulty === d ? "sunk" : "raise"} px-2 py-[2px] capitalize`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="sunk p-2">
        {/* Header */}
        <div className="raise flex items-center justify-between px-2 py-1 mb-2">
          <LcdDigits value={preset.mines - flags} />
          <button
            onClick={() => reset()}
            className="raise w-8 h-8 flex items-center justify-center text-lg leading-none"
            aria-label="Reset"
          >
            {headerFace}
          </button>
          <LcdDigits value={time} />
        </div>

        {/* Board */}
        <div className="sunk p-[2px] inline-block max-w-full overflow-auto">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${preset.cols}, ${cellSize}px)`,
              gridAutoRows: `${cellSize}px`,
            }}
            onContextMenu={(e) => e.preventDefault()}
          >
            {board.map((row, r) =>
              row.map((cell, c) => {
                const revealed = cell.state === "revealed";
                const showMine = revealed && cell.mine;
                const showNum = revealed && !cell.mine && cell.adj > 0;
                return (
                  <div
                    key={`${r}-${c}`}
                    onPointerDown={(e) => onCellPointerDown(r, c, e)}
                    onPointerUp={(e) => onCellPointerUp(r, c, e)}
                    onPointerLeave={() => {
                      if (longPressRef.current) { window.clearTimeout(longPressRef.current); longPressRef.current = null; }
                      if (status === "playing") setFace("smile");
                    }}
                    onContextMenu={(e) => onCellContextMenu(r, c, e)}
                    className={`${revealed ? "" : "raise-thin"} flex items-center justify-center text-[12px] font-bold select-none cursor-default`}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      background: revealed ? (showMine && status === "lost" && cell.mine ? "#ff0000" : "#bdbdbd") : "#c0c0c0",
                      borderTop: revealed ? "1px solid #808080" : undefined,
                      borderLeft: revealed ? "1px solid #808080" : undefined,
                      color: showNum ? NUM_COLORS[cell.adj] : "#000",
                      touchAction: "manipulation",
                    }}
                  >
                    {showMine ? "💣"
                      : showNum ? cell.adj
                      : cell.state === "flag" ? "🚩"
                      : cell.state === "question" ? "?"
                      : ""}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Minesweeper;
