import React, { useMemo, useState } from "react";

/**
 * Klondike Solitaire (draw 1). Win98-flavored, minimal but fully playable.
 * - 7 tableau piles, 4 foundations, stock + waste
 * - Click waste/tableau top to auto-move to foundation (double-click)
 * - Click a card to select, click destination pile to move
 * - Only valid moves allowed (alternating colors descending on tableau, same-suit ascending on foundation)
 */

type Suit = "♠" | "♥" | "♦" | "♣";
type Card = { id: string; suit: Suit; rank: number; faceUp: boolean };
type PileId =
  | { kind: "tableau"; index: number }
  | { kind: "foundation"; index: number }
  | { kind: "waste" };

const SUITS: Suit[] = ["♠", "♥", "♦", "♣"];
const RED = new Set<Suit>(["♥", "♦"]);
const rankLabel = (r: number) =>
  r === 1 ? "A" : r === 11 ? "J" : r === 12 ? "Q" : r === 13 ? "K" : String(r);

function makeDeck(): Card[] {
  const d: Card[] = [];
  for (const s of SUITS) for (let r = 1; r <= 13; r++) d.push({ id: `${s}${r}`, suit: s, rank: r, faceUp: false });
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
}

function deal(deck: Card[]) {
  const tableau: Card[][] = [[], [], [], [], [], [], []];
  let i = 0;
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row <= col; row++) {
      const c = { ...deck[i++] };
      c.faceUp = row === col;
      tableau[col].push(c);
    }
  }
  const stock = deck.slice(i).map((c) => ({ ...c, faceUp: false }));
  return { tableau, stock };
}

const CardView: React.FC<{ card: Card; selected?: boolean; onClick?: () => void; style?: React.CSSProperties }> = ({ card, selected, onClick, style }) => {
  const red = RED.has(card.suit);
  if (!card.faceUp) {
    return (
      <div
        onClick={onClick}
        style={style}
        className="absolute w-[42px] h-[58px] rounded-[2px] border border-black cursor-pointer"
      >
        <div className="w-full h-full" style={{ background: "repeating-linear-gradient(45deg,#000080 0 3px,#4040a0 3px 6px)" }} />
      </div>
    );
  }
  return (
    <div
      onClick={onClick}
      style={style}
      className={`absolute w-[42px] h-[58px] rounded-[2px] border border-black bg-white cursor-pointer ${selected ? "outline outline-2 outline-[#ffd700]" : ""}`}
    >
      <div className={`px-[3px] pt-[2px] text-[11px] leading-none font-bold ${red ? "text-red-600" : "text-black"}`}>
        {rankLabel(card.rank)}
      </div>
      <div className={`text-center text-[18px] leading-none mt-[2px] ${red ? "text-red-600" : "text-black"}`}>{card.suit}</div>
    </div>
  );
};

const EmptySlot: React.FC<{ onClick?: () => void; label?: string }> = ({ onClick, label }) => (
  <div
    onClick={onClick}
    className="w-[42px] h-[58px] rounded-[2px] border border-dashed border-[#404040] flex items-center justify-center text-[10px] text-[#404040] cursor-pointer"
  >
    {label}
  </div>
);

const Solitaire: React.FC = () => {
  const initial = useMemo(() => deal(makeDeck()), []);
  const [tableau, setTableau] = useState<Card[][]>(initial.tableau);
  const [stock, setStock] = useState<Card[]>(initial.stock);
  const [waste, setWaste] = useState<Card[]>([]);
  const [foundations, setFoundations] = useState<Card[][]>([[], [], [], []]);
  const [sel, setSel] = useState<{ pile: PileId; index: number } | null>(null);

  const reset = () => {
    const d = deal(makeDeck());
    setTableau(d.tableau);
    setStock(d.stock);
    setWaste([]);
    setFoundations([[], [], [], []]);
    setSel(null);
  };

  const drawStock = () => {
    if (stock.length === 0) {
      setStock(waste.slice().reverse().map((c) => ({ ...c, faceUp: false })));
      setWaste([]);
      return;
    }
    const top = { ...stock[stock.length - 1], faceUp: true };
    setStock(stock.slice(0, -1));
    setWaste([...waste, top]);
    setSel(null);
  };

  const canPlaceOnTableau = (moving: Card, dest: Card | undefined) => {
    if (!dest) return moving.rank === 13;
    return dest.faceUp && RED.has(dest.suit) !== RED.has(moving.suit) && dest.rank === moving.rank + 1;
  };
  const canPlaceOnFoundation = (moving: Card, pile: Card[]) => {
    if (pile.length === 0) return moving.rank === 1;
    const top = pile[pile.length - 1];
    return top.suit === moving.suit && top.rank + 1 === moving.rank;
  };

  const getMovingCards = (s: { pile: PileId; index: number }): Card[] => {
    if (s.pile.kind === "tableau") return tableau[s.pile.index].slice(s.index);
    if (s.pile.kind === "waste") return waste.slice(-1);
    return foundations[s.pile.index].slice(-1);
  };

  const removeFromSource = (s: { pile: PileId; index: number }) => {
    if (s.pile.kind === "tableau") {
      const col = s.pile.index;
      const next = tableau.slice();
      const remaining = next[col].slice(0, s.index);
      if (remaining.length && !remaining[remaining.length - 1].faceUp) {
        remaining[remaining.length - 1] = { ...remaining[remaining.length - 1], faceUp: true };
      }
      next[col] = remaining;
      setTableau(next);
    } else if (s.pile.kind === "waste") {
      setWaste(waste.slice(0, -1));
    } else {
      const next = foundations.slice();
      next[s.pile.index] = next[s.pile.index].slice(0, -1);
      setFoundations(next);
    }
  };

  const tryMoveTo = (dest: PileId) => {
    if (!sel) return;
    const moving = getMovingCards(sel);
    if (moving.length === 0) return;

    if (dest.kind === "foundation") {
      if (moving.length !== 1) return;
      if (!canPlaceOnFoundation(moving[0], foundations[dest.index])) return;
      const next = foundations.slice();
      next[dest.index] = [...next[dest.index], moving[0]];
      setFoundations(next);
      removeFromSource(sel);
      setSel(null);
      return;
    }
    if (dest.kind === "tableau") {
      const destPile = tableau[dest.index];
      if (!canPlaceOnTableau(moving[0], destPile[destPile.length - 1])) return;
      const next = tableau.slice();
      next[dest.index] = [...destPile, ...moving];
      setTableau(next);
      removeFromSource(sel);
      setSel(null);
      return;
    }
  };

  const selectCard = (pile: PileId, index: number, card: Card) => {
    if (!card.faceUp) return;
    if (sel && sel.pile.kind === pile.kind && (pile.kind === "tableau" || pile.kind === "foundation" ? (sel.pile as any).index === (pile as any).index : true) && sel.index === index) {
      setSel(null);
      return;
    }
    setSel({ pile, index });
  };

  const autoToFoundation = (pile: PileId, index: number, card: Card) => {
    if (!card.faceUp) return;
    for (let f = 0; f < 4; f++) {
      if (canPlaceOnFoundation(card, foundations[f])) {
        const sourceSel = { pile, index };
        const next = foundations.slice();
        next[f] = [...next[f], card];
        setFoundations(next);
        // remove
        if (pile.kind === "tableau") {
          const t = tableau.slice();
          const col = pile.index;
          const remaining = t[col].slice(0, index);
          if (remaining.length && !remaining[remaining.length - 1].faceUp) {
            remaining[remaining.length - 1] = { ...remaining[remaining.length - 1], faceUp: true };
          }
          t[col] = remaining;
          setTableau(t);
        } else if (pile.kind === "waste") {
          setWaste(waste.slice(0, -1));
        }
        setSel(null);
        return;
      }
    }
  };

  return (
    <div style={{ background: "#008080" }} className="p-2 select-none">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={reset} className="raise w98-btn" style={{ minWidth: 70 }}>New</button>
        <div className="sunk text-[11px] text-black px-2 py-[2px] flex-1">
          {sel ? "Click a pile to move, or click again to deselect" : "Click stock to draw"}
        </div>
      </div>

      <div className="flex gap-[6px] mb-3">
        {/* Stock */}
        <div onClick={drawStock} className="cursor-pointer">
          {stock.length > 0 ? (
            <div className="relative w-[42px] h-[58px]">
              <CardView card={stock[stock.length - 1]} style={{ left: 0, top: 0 }} />
            </div>
          ) : (
            <EmptySlot onClick={drawStock} label="↺" />
          )}
        </div>
        {/* Waste */}
        <div className="relative w-[42px] h-[58px]">
          {waste.length > 0 ? (
            <CardView
              card={waste[waste.length - 1]}
              selected={sel?.pile.kind === "waste"}
              onClick={() => selectCard({ kind: "waste" }, waste.length - 1, waste[waste.length - 1])}
              style={{ left: 0, top: 0 }}
            />
          ) : (
            <EmptySlot />
          )}
        </div>
        <div className="w-[42px]" />
        {/* Foundations */}
        {foundations.map((f, i) => (
          <div key={i} className="relative w-[42px] h-[58px]" onClick={() => sel && tryMoveTo({ kind: "foundation", index: i })}>
            {f.length > 0 ? (
              <CardView
                card={f[f.length - 1]}
                onClick={(e) => {
                  if (sel) tryMoveTo({ kind: "foundation", index: i });
                }}
                style={{ left: 0, top: 0 }}
              />
            ) : (
              <EmptySlot label="A" onClick={() => sel && tryMoveTo({ kind: "foundation", index: i })} />
            )}
          </div>
        ))}
      </div>

      {/* Tableau */}
      <div className="flex gap-[6px]">
        {tableau.map((col, ci) => (
          <div
            key={ci}
            className="relative w-[42px]"
            style={{ minHeight: 58 + (col.length > 0 ? (col.length - 1) * 14 : 0) }}
            onClick={() => {
              if (sel && col.length === 0) tryMoveTo({ kind: "tableau", index: ci });
            }}
          >
            {col.length === 0 && <EmptySlot onClick={() => sel && tryMoveTo({ kind: "tableau", index: ci })} />}
            {col.map((card, ri) => (
              <CardView
                key={card.id}
                card={card}
                selected={sel?.pile.kind === "tableau" && (sel.pile as any).index === ci && sel.index <= ri}
                onClick={() => {
                  if (sel && (sel.pile.kind !== "tableau" || (sel.pile as any).index !== ci)) {
                    // Try move to this column
                    tryMoveTo({ kind: "tableau", index: ci });
                    return;
                  }
                  // Double-click-ish: if already selected this exact card, send to foundation
                  if (sel && sel.pile.kind === "tableau" && (sel.pile as any).index === ci && sel.index === ri) {
                    autoToFoundation({ kind: "tableau", index: ci }, ri, card);
                    return;
                  }
                  selectCard({ kind: "tableau", index: ci }, ri, card);
                }}
                style={{ top: ri * 14, left: 0 }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Solitaire;
