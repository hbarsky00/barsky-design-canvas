import beachDay from "@/assets/scenes/beach-day.jpg";
import snowCity from "@/assets/scenes/snow-city.jpg";

export type TextMode = "light" | "dark";

export type Scene = {
  id: string;
  label: string;
  /** Flat full-bleed PNG/JPG. `null` = use the live code-drawn scene. */
  image: string | null;
  /** Whether hero text/pills should be light or dark on this scene. */
  textMode: TextMode;
};

export const SCENES: Scene[] = [
  {
    id: "mountains",
    label: "Mountains",
    image: null, // live ParallaxHero scene (gradient + sun/moon/mountains)
    textMode: "light",
  },
  {
    id: "city",
    label: "City",
    image: null, // live drifting city skyline (day + night)
    textMode: "light",
  },
  {
    id: "beach-day",
    label: "Beach — Day",
    image: beachDay,
    textMode: "dark",
  },
  {
    id: "snow-city",
    label: "Snow City",
    image: snowCity,
    textMode: "dark",
  },
];

export const DEFAULT_SCENE_ID = "mountains";

