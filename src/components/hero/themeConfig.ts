import {
  Globe, Sparkles, BookOpen, Monitor, Command, Tv, Terminal,
  MessageSquare, FileText, Tv2, Box, PanelLeft, Activity, Cpu, Radio, Gamepad2
} from "lucide-react";

export type ThemeId =
  | "1990s" | "2010s" | "simple" | "win95" | "sys7" | "flash"
  | "terminal" | "llm-chat" | "md" | "teletext" | "brutalism"
  | "swiss" | "viz" | "workbench" | "3d" | "8bit";

export const THEMES: { id: ThemeId; label: string; Icon: any; color: string }[] = [
  { id: "1990s",     label: "1990S",     Icon: Globe,        color: "#f59e0b" },
  { id: "2010s",     label: "2010S",     Icon: Sparkles,     color: "#ec4899" },
  { id: "simple",    label: "SIMPLE",    Icon: BookOpen,     color: "#ffffff" },
  { id: "win95",     label: "WIN 95",    Icon: Monitor,      color: "#00bfff" },
  { id: "sys7",      label: "SYSTEM 7",  Icon: Command,      color: "#ffffff" },
  { id: "flash",     label: "FLASH",     Icon: Tv,           color: "#ef4444" },
  { id: "terminal",  label: "TERMINAL",  Icon: Terminal,     color: "#00ff41" },
  { id: "llm-chat",  label: "LLM CHAT",  Icon: MessageSquare,color: "#a78bfa" },
  { id: "md",        label: "MD",        Icon: FileText,     color: "#60a5fa" },
  { id: "teletext",  label: "TELETEXT",  Icon: Tv2,          color: "#facc15" },
  { id: "brutalism", label: "BRUTALISM", Icon: Box,          color: "#ffffff" },
  { id: "swiss",     label: "SWISS",     Icon: PanelLeft,    color: "#f87171" },
  { id: "viz",       label: "VIZ",       Icon: Activity,     color: "#818cf8" },
  { id: "workbench", label: "WORKBENCH", Icon: Cpu,          color: "#fb923c" },
  { id: "3d",        label: "3D",        Icon: Radio,        color: "#a78bfa" },
  { id: "8bit",      label: "8-BIT",     Icon: Gamepad2,     color: "#4ade80" },
];

export const STORAGE_KEY = "barskydesign-theme";
export const DEFAULT_THEME: ThemeId = "3d";
