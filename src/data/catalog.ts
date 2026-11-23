export type MoodId = "activo" | "intenso" | "tranquilo" | "sensible";

export interface Mood {
  id: MoodId;
  name: string;
  duration: string;
  subtitle: string;
  bgImage: string;
  characterImage: string;
  bgColor: string;
  hasOverlay?: boolean;
  /** Custom crop class when the source sprite needs centering */
  characterPositionClass?: string;
}

export interface Track {
  id: string;
  moodId: MoodId;
  title: string;
  prompt: string;
  composer: string;
  durationSeconds: number;
  durationLabel: string;
  coverImage: string;
}

export type PadCategoryId =
  | "urbano"
  | "percusion"
  | "instrumentos"
  | "atmosferas";

export interface SoundPad {
  id: string;
  category: PadCategoryId;
  label: string;
  iconName: "car" | "footprints" | "siren" | "drum" | "music" | "cloud-rain" | "wind" | "radio";
}

export interface Challenge {
  id: string;
  title: string;
  shortSubtitle: string;
  description: string;
  iconName: "moon" | "cloud" | "sun" | "sparkles";
  gradientFrom: string;
  gradientTo: string;
  iconShadow: string;
  minLayers: number;
  requiredCategories?: PadCategoryId[];
  hint: string;
}

export const MOODS: Mood[] = [
  {
    id: "activo",
    name: "Activo",
    duration: "1h 20 min",
    subtitle: "Explora las atmósferas que hemos preparado para ti.",
    bgImage: "/assets/mood-activo-bg.png",
    characterImage: "/assets/mood-activo-char.png",
    bgColor: "#a79fd1",
  },
  {
    id: "intenso",
    name: "Intenso",
    duration: "1h 20 min",
    subtitle: "Explora las atmósferas que hemos preparado para ti.",
    bgImage: "/assets/mood-intenso-bg.png",
    characterImage: "/assets/mood-intenso-char.png",
    bgColor: "#f9c958",
    hasOverlay: true,
  },
  {
    id: "tranquilo",
    name: "Tranquilo",
    duration: "30 min",
    subtitle: "Explora las atmósferas que hemos preparado para ti.",
    bgImage: "/assets/mood-tranquilo-bg.png",
    characterImage: "/assets/mood-tranquilo-char.png",
    bgColor: "#bc195c",
    hasOverlay: true,
  },
  {
    id: "sensible",
    name: "Sensible",
    duration: "55 min",
    subtitle: "Explora las atmósferas que hemos preparado para ti.",
    bgImage: "/assets/mood-sensible-bg.png",
    characterImage: "/assets/mood-sensible-char.png",
    bgColor: "#f7b286",
    hasOverlay: true,
  },
];

export const TRACKS: Track[] = [
  // Activo
  {
    id: "can-can",
    moodId: "activo",
    title: "Can-Can",
    prompt: "Cuando quieres reírte y hacer demasiado ruido.",
    composer: "Jacques Offenbach",
    durationSeconds: 180,
    durationLabel: "3:00",
    coverImage: "/assets/cover-1.png",
  },
  {
    id: "the-typewriter",
    moodId: "activo",
    title: "The Typewriter",
    prompt: "Cuando tienes la mente acelerada y feliz.",
    composer: "Leroy Anderson",
    durationSeconds: 115,
    durationLabel: "1:55",
    coverImage: "/assets/cover-2.png",
  },
  {
    id: "william-tell-overture",
    moodId: "activo",
    title: "William Tell Overture",
    prompt: "Cuando sientes ganas de salir corriendo.",
    composer: "Gioachino Rossini",
    durationSeconds: 205,
    durationLabel: "3:25",
    coverImage: "/assets/cover-3.png",
  },
  {
    id: "trumpet-concerto",
    moodId: "activo",
    title: "Trumpet Concerto in E-flat major",
    prompt: "Cuando te sientes brillante e imparable.",
    composer: "Joseph Haydn",
    durationSeconds: 240,
    durationLabel: "4:00",
    coverImage: "/assets/cover-4.png",
  },

  // Intenso
  {
    id: "o-fortuna",
    moodId: "intenso",
    title: "O Fortuna",
    prompt: "Cuando sientes todo demasiado fuerte por dentro.",
    composer: "Carl Orff",
    durationSeconds: 165,
    durationLabel: "2:45",
    coverImage: "/assets/cover-1.png",
  },
  {
    id: "mars-bringer-of-war",
    moodId: "intenso",
    title: "Mars, the Bringer of War",
    prompt: "Cuando tienes rabia y demasiada energía acumulada.",
    composer: "Gustav Holst",
    durationSeconds: 220,
    durationLabel: "3:40",
    coverImage: "/assets/cover-2.png",
  },
  {
    id: "1812-overture",
    moodId: "intenso",
    title: "1812 Overture",
    prompt: "Cuando quieres explotar y liberar todo.",
    composer: "Pyotr Ilyich Tchaikovsky",
    durationSeconds: 250,
    durationLabel: "4:10",
    coverImage: "/assets/cover-3.png",
  },
  {
    id: "symphony-no-5",
    moodId: "intenso",
    title: "Symphony No. 5",
    prompt: "Cuando sigues adelante aunque todo pese muchísimo.",
    composer: "Ludwig van Beethoven",
    durationSeconds: 210,
    durationLabel: "3:30",
    coverImage: "/assets/cover-4.png",
  },

  // Tranquilo
  {
    id: "gymnopedie-no-1",
    moodId: "tranquilo",
    title: "Gymnopédie No. 1",
    prompt: "Cuando solo quieres respirar y pensar tranquilo.",
    composer: "Erik Satie",
    durationSeconds: 195,
    durationLabel: "3:15",
    coverImage: "/assets/cover-1.png",
  },
  {
    id: "clair-de-lune",
    moodId: "tranquilo",
    title: "Clair de Lune",
    prompt: "Cuando necesitas calma después de un día pesado.",
    composer: "Claude Debussy",
    durationSeconds: 245,
    durationLabel: "4:05",
    coverImage: "/assets/cover-2.png",
  },
  {
    id: "arabesque-no-1",
    moodId: "tranquilo",
    title: "Arabesque No. 1",
    prompt: "Cuando quieres perderte dentro de tus ideas.",
    composer: "Claude Debussy",
    durationSeconds: 215,
    durationLabel: "3:35",
    coverImage: "/assets/cover-3.png",
  },
  {
    id: "the-swan",
    moodId: "tranquilo",
    title: "The Swan",
    prompt: "Cuando te sientes sensible pero en paz.",
    composer: "Camille Saint-Saëns",
    durationSeconds: 175,
    durationLabel: "2:55",
    coverImage: "/assets/cover-4.png",
  },

  // Sensible
  {
    id: "clarinet-concerto",
    moodId: "sensible",
    title: "Clarinet Concerto in A major",
    prompt: "Cuando extrañas algo que no puedes explicar.",
    composer: "Wolfgang Amadeus Mozart",
    durationSeconds: 230,
    durationLabel: "3:50",
    coverImage: "/assets/cover-1.png",
  },
  {
    id: "adagio-for-strings",
    moodId: "sensible",
    title: "Adagio for Strings",
    prompt: "Cuando necesitas llorar todo lo que guardas.",
    composer: "Samuel Barber",
    durationSeconds: 260,
    durationLabel: "4:20",
    coverImage: "/assets/cover-2.png",
  },
  {
    id: "gnossienne-no-1",
    moodId: "sensible",
    title: "Gnossienne No. 1",
    prompt: "Cuando te sientes raro y muy distante.",
    composer: "Erik Satie",
    durationSeconds: 185,
    durationLabel: "3:05",
    coverImage: "/assets/cover-3.png",
  },
  {
    id: "moonlight-sonata",
    moodId: "sensible",
    title: "Moonlight Sonata",
    prompt: "Cuando la noche se siente demasiado silenciosa.",
    composer: "Ludwig van Beethoven",
    durationSeconds: 270,
    durationLabel: "4:30",
    coverImage: "/assets/cover-4.png",
  },
];

export const PAD_CATEGORIES: { id: PadCategoryId; label: string }[] = [
  { id: "urbano", label: "Urbano" },
  { id: "percusion", label: "Percusión" },
  { id: "instrumentos", label: "Instrumentos" },
  { id: "atmosferas", label: "Atmósferas" },
];

export const SOUND_PADS: SoundPad[] = [
  // Urbano
  { id: "trafico-lejano", category: "urbano", label: "Tráfico lejano", iconName: "car" },
  { id: "pasos", category: "urbano", label: "Pasos", iconName: "footprints" },
  { id: "sirena", category: "urbano", label: "Sirena", iconName: "siren" },
  // Percusión
  { id: "beat-lofi", category: "percusion", label: "Beat lofi", iconName: "drum" },
  { id: "cajon", category: "percusion", label: "Cajón", iconName: "drum" },
  { id: "hi-hat", category: "percusion", label: "Hi-hat", iconName: "drum" },
  // Instrumentos
  { id: "guitarra", category: "instrumentos", label: "Guitarra", iconName: "music" },
  { id: "piano-suave", category: "instrumentos", label: "Piano suave", iconName: "music" },
  { id: "bajo", category: "instrumentos", label: "Bajo", iconName: "music" },
  // Atmósferas
  { id: "lluvia", category: "atmosferas", label: "Lluvia", iconName: "cloud-rain" },
  { id: "viento", category: "atmosferas", label: "Viento", iconName: "wind" },
  { id: "murmullo", category: "atmosferas", label: "Murmullo", iconName: "radio" },
];

export const CHALLENGES: Challenge[] = [
  {
    id: "mezcla-nocturna",
    title: "Mezcla nocturna",
    shortSubtitle: "Completa y gana un badge",
    description:
      "Crea una composición usando solo sonidos capturados después de la medianoche.",
    iconName: "moon",
    gradientFrom: "#bc195c",
    gradientTo: "#8c1344",
    iconShadow: "rgba(188,25,92,0.3)",
    minLayers: 2,
    requiredCategories: ["atmosferas"],
    hint: "Activa al menos 2 capas incluyendo Atmósferas y guarda tu mezcla.",
  },
  {
    id: "sonidos-de-la-calle",
    title: "Sonidos de la calle",
    shortSubtitle: "Completa y gana un badge",
    description:
      "Usa 3 elementos urbanos y compón un beat lo-fi relajante.",
    iconName: "cloud",
    gradientFrom: "#f9c958",
    gradientTo: "#dca52d",
    iconShadow: "rgba(249,201,88,0.3)",
    minLayers: 3,
    requiredCategories: ["urbano"],
    hint: "Activa los 3 pads de Urbano (o 3+ capas con Urbano) y guarda.",
  },
  {
    id: "amanecer-ritmico",
    title: "Amanecer rítmico",
    shortSubtitle: "Completa y gana un badge",
    description:
      "Empieza con sonidos suaves y aumenta la energía gradualmente.",
    iconName: "sun",
    gradientFrom: "#f9c958",
    gradientTo: "#bc195c",
    iconShadow: "rgba(188,25,92,0.3)",
    minLayers: 3,
    requiredCategories: ["percusion", "instrumentos"],
    hint: "Combina al menos 3 capas con Percusión e Instrumentos.",
  },
  {
    id: "caos-armonico",
    title: "Caos armónico",
    shortSubtitle: "Completa y gana un badge",
    description:
      "Combina más de 5 capas de sonido aparentemente incompatibles y haz que funcionen.",
    iconName: "sparkles",
    gradientFrom: "#bc195c",
    gradientTo: "#f9c958",
    iconShadow: "rgba(249,201,88,0.3)",
    minLayers: 5,
    hint: "Activa 5 o más pads simultáneos y guarda tu creación.",
  },
];

export function formatSeconds(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
