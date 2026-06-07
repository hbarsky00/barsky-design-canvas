import cityNight from "@/assets/scenes/city-night.jpg";

export type TextMode = "light" | "dark";

export type Scene = {
  id: string;
  label: string;
  /** Flat full-bleed PNG/JPG. `null` = use the live code-drawn mountains scene. */
  image: string | null;
  /** Whether hero text/pills should be light or dark on this scene. */
  textMode: TextMode;
};

export const SCENES: Scene[] = [
  {
    id: "mountains",
    label: "Mountains",
    image: null, // live ParallaxHero scene (gradient + sun/moon/mountains)
    textMode: "light", // overridden at runtime by is-day for the live scene
  },
  {
    id: "city-night",
    label: "City — Night",
    image: cityNight,
    textMode: "light",
  },
];

export const DEFAULT_SCENE_ID = "mountains";
