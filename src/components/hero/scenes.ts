import cityNight from "@/assets/scenes/city-night.jpg";
import beachDay from "@/assets/scenes/beach-day.jpg";
import snowCity from "@/assets/scenes/snow-city.jpg";
import oceanDay from "@/assets/scenes/ocean-day.jpg";
import oceanNight from "@/assets/scenes/ocean-night.jpg";

export type TextMode = "light" | "dark";

export type Scene = {
  id: string;
  label: string;
  /** Flat full-bleed PNG/JPG. `null` = live code-drawn silhouette scene. */
  image: string | null;
  /** Whether hero text/pills should be light or dark on this scene. */
  textMode: TextMode;
};

export const SCENES: Scene[] = [
  { id: "mountains", label: "Mountains", image: null, textMode: "light" },
  { id: "city", label: "City", image: null, textMode: "light" },
  { id: "coastline", label: "Coastline", image: null, textMode: "light" },
  
  { id: "city-night", label: "City — Night", image: cityNight, textMode: "light" },
  { id: "beach-day", label: "Beach — Day", image: beachDay, textMode: "dark" },
  { id: "snow-city", label: "Snow City", image: snowCity, textMode: "dark" },
  { id: "ocean-day", label: "Ocean — Day", image: oceanDay, textMode: "dark" },
  { id: "ocean-night", label: "Ocean — Night", image: oceanNight, textMode: "light" },
];

/** Live silhouette scene ids that are NOT flat images. */
export const LIVE_SCENE_IDS = ["mountains", "city", "coastline", "palms"] as const;

export const DEFAULT_SCENE_ID = "mountains";
