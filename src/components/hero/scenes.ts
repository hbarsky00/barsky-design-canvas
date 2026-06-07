import mountainsNight from "@/assets/scenes/mountains-night.jpg";
import cityNight from "@/assets/scenes/city-night.jpg";
import beachDay from "@/assets/scenes/beach-day.jpg";
import snowCity from "@/assets/scenes/snow-city.jpg";

export type TextMode = "light" | "dark";
export type Celestial = "sun" | "moon" | null;

export type Scene = {
  id: string;
  label: string;
  /** Flat full-bleed PNG/JPG. Every scene is baked — no live rendering. */
  image: string;
  /** Whether hero text/pills/footer should be light or dark on this scene. */
  textMode: TextMode;
  /** Optional arcing celestial body painted in the overlay layer. */
  celestial: Celestial;
  /** Whether plane + helicopter fly across this scene. */
  aircraft: boolean;
};

export const SCENES: Scene[] = [
  {
    id: "mountains",
    label: "Mountains",
    image: mountainsNight,
    textMode: "light",
    celestial: "moon",
    aircraft: true,
  },
  {
    id: "city-night",
    label: "City — Night",
    image: cityNight,
    textMode: "light",
    celestial: "moon",
    aircraft: true,
  },
  {
    id: "beach-day",
    label: "Beach — Day",
    image: beachDay,
    textMode: "dark",
    celestial: "sun",
    aircraft: true,
  },
  {
    id: "snow-city",
    label: "Snow City",
    image: snowCity,
    textMode: "dark",
    celestial: "sun",
    aircraft: true,
  },
];

export const DEFAULT_SCENE_ID = "mountains";
