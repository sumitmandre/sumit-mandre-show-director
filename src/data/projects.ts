import pChamkila from "@/assets/p-chamkila.jpg";
import pIndira from "@/assets/p-indira-emergency.jpg";
import pPubg from "@/assets/p-pubg-bgmi.jpg";
import pHeirloom from "@/assets/p-heirloom.jpg";
import pBlackWarrant from "@/assets/p-black-warrant.jpg";
import pDevshala from "@/assets/p-devshala.jpg";
import pUnreal from "@/assets/p-unreal-previz.png";
import pLupin from "@/assets/p-lupin-tales.jpg";
import pCtrl from "@/assets/p-ctrl.jpg";
import pIllustrations from "@/assets/p-illustrations.png";

export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  posterImage: string;
  videoEmbedId?: string;
  videoEmbedIds?: string[];
  externalUrl?: string;
  category: string;
  awards?: string[];
  director?: string;
  cast?: string;
}

export const projects: Project[] = [
  {
    id: "chamkila",
    title: "Amar Singh Chamkila",
    role: "Animation Supervisor — Storyboard & Character Design",
    description:
      "Directed by Imtiaz Ali, this Netflix film brings to life the legendary Punjabi singer Amar Singh Chamkila, portrayed by Diljit Dosanjh alongside Parineeti Chopra. A powerful exploration of an artist's craft versus the weight of society, the film blends live-action with stylized animated sequences. As Animation Supervisor, I led storyboard development and character design for the animated segments, translating Imtiaz Ali's vision into expressive, emotionally charged visual storytelling.",
    posterImage: pChamkila,
    videoEmbedId: "61pvxwm0z7o",
    category: "Netflix Film",
    director: "Imtiaz Ali",
    cast: "Diljit Dosanjh, Parineeti Chopra",
    awards: [
      "Filmfare OTT Award — Best Film",
      "Multiple international wins for Direction & Music",
      "Original Score by A.R. Rahman",
    ],
  },
  {
    id: "indira-emergency",
    title: "Indi(r)a's Emergency",
    role: "Animation Director, Art Director — Storyboard & Character Design",
    description:
      "In June 1975, Prime Minister Indira Gandhi declared a sweeping internal Emergency — imprisoning opponents and silencing the press. Indi(r)a's Emergency tells the true, agenda-free story from both sides of that defining moment in Indian history. One of my most personal projects: built entirely from the client's narrative dialogues, I drove every layer of the visual storytelling — direction, art, storyboards and character design — pushing the craft to deliver a film I'm deeply proud of.",
    posterImage: pIndira,
    videoEmbedId: "kRRaHQI8oKo",
    category: "Documentary Series",
  },
  {
    id: "ctrl",
    title: "CTRL",
    role: "Animation Supervisor — Motion Capture, Metahuman, Motion Graphics",
    description:
      "Directed by Vikramaditya Motwane and starring Ananya Panday, CTRL is a Netflix screen-life thriller told entirely through laptop interfaces. I supervised the animation across two pipelines: motion-capturing Aparshakti Khurana's performance via iPhone and driving a Metahuman antagonist through Unreal Live Link, and designing every fictional app, OS and motion-graphic interface that frames the film's narrative. Additional 2D animated music sequences round out the production.",
    posterImage: pCtrl,
    videoEmbedId: "gG5I4wLh8MY",
    category: "Netflix Film",
    director: "Vikramaditya Motwane",
    cast: "Ananya Panday, Aparshakti Khurana",
  },
  {
    id: "black-warrant",
    title: "Black Warrant",
    role: "Animation Director — Title Sequence Storyboard",
    description:
      "Black Warrant is a 2025 Hindi-language crime drama based on Sunil Gupta's memoir of his years as a Tihar Prison jailer. Created by Vikramaditya Motwane and Satyanshu Singh, it stars Zahan Kapoor, Rahul Bhat, Paramvir Singh Cheema and Anurag Thakur. The series swept major awards in 2025–26 including Best Series at Filmfare OTT and Best Web Series at the News18 Showsha Reel Awards, alongside wins for direction, writing and acting. I directed the animation and storyboarded the title sequence.",
    posterImage: pBlackWarrant,
    videoEmbedId: "qnem9jGtuW8",
    category: "Netflix Series",
    director: "Vikramaditya Motwane, Satyanshu Singh",
    cast: "Zahan Kapoor, Rahul Bhat, Paramvir Singh Cheema",
    awards: [
      "Best Series — Filmfare OTT Awards 2025",
      "Best Web Series — News18 Showsha Reel Awards 2026",
      "Multiple wins for direction, writing, and acting",
    ],
  },
  {
    id: "heirloom",
    title: "Heirloom — Annecy Showcase",
    role: "Storyboard Artist & Technical Director",
    description:
      "Heirloom examines the dark side of nostalgia while celebrating Indian textiles. Selected for the first Annecy Festival Residency for animation films in 2021, it was subsequently pitched at the Marché du Film at Cannes, the MIFA at Annecy and the Film Bazaar at IFFI Goa in 2023. I storyboarded the film and led the technical direction — architecting the full production pipeline including the Moho 2D pipeline and a Blender integration, then supervising the cleanup and color departments end to end.",
    posterImage: pHeirloom,
    videoEmbedId: "olygAzuXwPE",
    category: "Festival Film",
    awards: [
      "Annecy Festival Residency 2021",
      "Pitched at Marché du Film, Cannes",
      "MIFA, Annecy Film Market",
      "Film Bazaar, IFFI Goa 2023",
    ],
  },
  {
    id: "lupin-tales",
    title: "Lupin's Tales",
    role: "Show Director — End-to-End Production",
    description:
      "A French-Chinese-Italian international animated children's series created by Xilam (France) and Youku (China). As Show Director I led the full production of 52 × 7-minute episodes over a year — cracking the POC test, building the schedule and pipeline, and assembling and managing a 40-person team. I worked closely with the client, including an on-site visit to Xilam's Paris studio for deep alignment.",
    posterImage: pLupin,
    externalUrl: "https://youtube.com/@lupinstales",
    category: "International Series",
  },
  {
    id: "pubg-bgmi",
    title: "PUBG / BGMI — Anime Promo",
    role: "Director — Concept, Storyboard & Supervision",
    description:
      "BGMI (Battlegrounds Mobile India) is the Indian edition of PUBG. The anime-styled promo I directed reached 20M+ views on YouTube — with the full release crossing 92M views and 474K likes. I owned the project end-to-end: concept discussions with the client, plot improvisation, pitching concept art and storyboards, supervising every department through to final After Effects compositing. A successful delivery and a delighted client.",
    posterImage: pPubg,
    videoEmbedId: "y1lYCrbKMHM",
    category: "Anime Promo",
    awards: ["20M+ YouTube views (promo)", "92M+ views, 474K likes (full release)"],
  },
  {
    id: "devshala",
    title: "Devshala — AI Animated Series",
    role: "Director — AI Pipeline Architect",
    description:
      "Devshala is a fully AI-animated series pilot targeted at YouTube and OTT. I storyboarded the entire pilot manually first to lock story control, then refined ChatGPT-generated character and set designs by hand, built 3D models in Meshy.ai, and produced previz in Maya matching the boards shot-for-shot. Backgrounds and characters were generated separately as first/last frames per shot, then characters were animated on green screen in Veo3 and Kling for compositional control. Final compositing in After Effects and sound in Premiere Pro. The pipeline I established gives continuity, scene flow and storytelling control that pure prompt-to-video cannot match.",
    posterImage: pDevshala,
    videoEmbedId: "XfYx4f2akhA",
    category: "AI Production",
  },
  {
    id: "unreal-previz",
    title: "Unreal Cinematic Previz",
    role: "Previz Director — Unreal Engine Pipeline",
    description:
      "High-budget feature previz with creatures, produced fast and lean through smart tricks and makeshifts. I LiDAR-scanned the set and textured it in Unreal; built creatures in Meshy.ai and rigged them in Maya; mocapped performances using Autodesk Flow and Mimem.ai markerless capture, refined in Maya, with Mixamo where it fit. Full-length animation was exported to Unreal in compact FBX, then I shot the film virtually as DOP — Live Linked iPad as a virtual camera with proper lenses and handheld feel — before lighting, rendering and editing every shot. A complete filmmaking experience from scan to cut.",
    posterImage: pUnreal,
    videoEmbedIds: ["uRbVh0i_FFg", "x37ctP4DbFU"],
    category: "Previz",
  },
  {
    id: "storyboard-reel",
    title: "Storyboarding & Animatics",
    role: "Director & Story Artist",
    description:
      "Storyboarding is one of my core strengths — and increasingly, the discipline that separates great AI video from generic AI video, because the story and the emotion live in the board. Years of boarding across feature films, series, cartoons, anime and live-action have sharpened my instinct for direction, story flow, cinematic technique, timing, camera angles, composition and the rules of filmmaking.",
    posterImage: `https://i.ytimg.com/vi/_5sHf0ItMhk/maxresdefault.jpg`,
    videoEmbedIds: [
      "_5sHf0ItMhk",
      "bZoFbCegtsE",
      "Qzr-f7np1qU",
      "4-a7BAKX2ks",
      "GoHgGbwJJTc",
      "5GGat3soI_E",
      "ZHxkDp41G4c",
    ],
    category: "Storyboard Reel",
  },
  {
    id: "illustrations",
    title: "Illustrations & Character Designs",
    role: "Character Designer & Illustrator",
    description:
      "I've always loved drawing and painting characters. AI may be reshaping the craft, but having designed and rendered characters by hand for years gives me a sharper eye for evaluating AI output — and the skill to step in with manual tweaks that lock in the exact appeal a story needs.",
    posterImage: pIllustrations,
    category: "Visual Development",
  },
  {
    id: "movies-series-vfx",
    title: "Movies, Series & VFX",
    role: "Animation / VFX / Motion Graphics",
    description:
      "A decade of contributions across feature films and series — motion graphics, 2D cheat-shot VFX, motion capture into Unreal Metahumans, music-video animation and PIP shots. Highlights:\n\n• Bhavesh Joshi Superhero — 2D image-warp VFX in Moho\n• Ghost Stories (Netflix anthology by Anurag Kashyap, Zoya Akhtar, Karan Johar, Dibakar Banerjee) — 2D mesh-warp VFX shots saving full CG cost\n• Jigra (Alia Bhatt) — 2D mesh-warp VFX shots\n• Dobaaraa (Taapsee Pannu) — 15-year timelapse VFX sequence in Blender\n• Sacred Games (Anurag Kashyap; Saif Ali Khan, Nawazuddin Siddiqui) — 2D motion graphics\n• Animator credits on international shows including Ninja Hattori, Oggy and the Cockroaches, Kid Krrish, Jules Verne, Mati & Dada and more.",
    posterImage: pBlackWarrant,
    category: "Selected Filmography",
  },
];

export const clients = [
  "Netflix", "Amazon Prime", "Xilam", "Youku", "Cartoon Network", "Sony",
  "Reliance", "Fantom", "Grid", "Pocket FM", "Byjus",
  "Pinkfong", "Applause", "TV Asahi", "Dharma Productions"
];

export const skills = {
  "Direction & Storytelling": [
    "Animation Direction", "Storyboarding", "Previz", "Narrative Design",
    "Shot Composition", "Cinematic Storytelling"
  ],
  "Team Leadership": [
    "Team Building (40+ artists)", "Cross-department Coordination",
    "Client Communication", "Project Bidding", "Mentorship"
  ],
  "Animation Pipeline": [
    "Pipeline Architecture", "Workflow Optimization", "Asset Management",
    "Quality Control", "Production Scheduling"
  ],
  "Visual Development": [
    "Character Design", "Environment Design", "Color Scripts",
    "Style Guides", "Art Direction"
  ],
  "AI & Virtual Production": [
    "AI Pipeline Design", "Veo3 / Kling", "Meshy.ai", "Unreal Engine",
    "Metahuman + Live Link", "LiDAR Scan-to-Set", "Markerless Mocap"
  ],
  "Software": [
    "Toon Boom Harmony", "Autodesk Maya", "Blender", "Unreal Engine",
    "Moho", "After Effects", "Premiere Pro", "Photoshop", "Storyboard Pro", "TVPaint", "Nuke"
  ],
};

export const awards = [
  { year: "2025", title: "Best Series", event: "Filmfare OTT Awards", project: "Black Warrant" },
  { year: "2026", title: "Best Web Series", event: "News18 Showsha Reel Awards", project: "Black Warrant" },
  { year: "2024", title: "Best Film", event: "Filmfare OTT Awards", project: "Amar Singh Chamkila" },
  { year: "2023", title: "Annecy Festival Residency Selection", event: "Annecy International Animation Festival", project: "Heirloom" },
  { year: "2023", title: "Official Pitch", event: "Marché du Film, Cannes / MIFA / Film Bazaar IFFI", project: "Heirloom" },
  { year: "2022", title: "20M+ Views Anime Promo", event: "YouTube Global", project: "PUBG / BGMI" },
];
