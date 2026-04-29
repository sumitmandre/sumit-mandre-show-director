import chamkilaPoster from "@/assets/chamkila-poster.jpg";

export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  posterImage: string;
  videoPreview?: string;
  videoEmbedId?: string;
  stills?: string[];
  credits?: string;
  category: string;
  awards?: string[];
  director?: string;
  cast?: string;
}

export const projects: Project[] = [
  {
    id: "chamkila",
    title: "Amar Singh Chamkila",
    role: "Animation Supervisor | Storyboard & Character Design",
    description:
      "Directed by Imtiaz Ali, this Netflix film brings to life the legendary Punjabi singer Amar Singh Chamkila, portrayed by Diljit Dosanjh alongside Parineeti Chopra. A powerful exploration of an artist's craft versus the weight of society, the film blends live-action with stylized animated sequences that visualize Chamkila's inner world, music, and the cultural pulse of Punjab. As Animation Supervisor, I led storyboard development and character design for the animated segments — translating Imtiaz Ali's vision into expressive, emotionally charged visual storytelling.",
    posterImage: chamkilaPoster,
    videoEmbedId: "61pvxwm0z7o",
    category: "Netflix Film",
    director: "Imtiaz Ali",
    cast: "Diljit Dosanjh, Parineeti Chopra",
    awards: [
      "Filmfare OTT Award — Best Film",
      "Multiple International Awards for Direction & Music",
      "A.R. Rahman — Original Score",
    ],
  },
  {
    id: "mighty-little-bheem",
    title: "Mighty Little Bheem",
    role: "Animation Director",
    description: "Directed animation sequences for Netflix's internationally acclaimed preschool series. Led a team of 40+ animators, overseeing character performance, timing, and visual storytelling across multiple seasons.",
    posterImage: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=800&q=80",
    category: "Series",
  },
  {
    id: "kotaro-lives-alone",
    title: "Kotaro Lives Alone",
    role: "Story Artist & Previz Lead",
    description: "Created storyboards and previz for this emotionally driven anime series. Developed key emotional sequences that became central to the show's narrative impact.",
    posterImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    category: "Series",
  },
  {
    id: "oggy-oggy",
    title: "Oggy Oggy",
    role: "Animation Director",
    description: "Directed animation for Xilam's spin-off preschool series. Managed international production pipeline and maintained visual consistency across episodes.",
    posterImage: "https://images.unsplash.com/photo-1536104968055-4d61aa56f46a?w=800&q=80",
    category: "Series",
  },
  {
    id: "baby-shark",
    title: "Baby Shark's Big Show",
    role: "Senior Animator",
    description: "Led animation sequences for Pinkfong's globally recognized franchise. Delivered high-energy character animation with precise comedic timing.",
    posterImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    category: "Series",
  },
  {
    id: "commercial-reel",
    title: "Commercial Reel",
    role: "Creative Director",
    description: "A collection of commercial projects spanning product launches, brand films, and advertising campaigns. End-to-end creative direction from concept to final delivery.",
    posterImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
    category: "Commercial",
  },
  {
    id: "short-film-collection",
    title: "Short Film Collection",
    role: "Director & Story Artist",
    description: "Original short films exploring diverse visual styles and storytelling techniques. From hand-drawn 2D to full CG pipelines.",
    posterImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
    category: "Film",
  },
];

export const clients = [
  "Netflix", "Amazon Prime", "Xilam", "Cartoon Network", "Sony",
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
  "Software": [
    "Toon Boom Harmony", "Autodesk Maya", "Blender", "Adobe After Effects",
    "Photoshop", "Storyboard Pro", "TVPaint", "Nuke"
  ],
};

export const awards = [
  { year: "2023", title: "Best Animated Series", event: "International Animation Festival", project: "Mighty Little Bheem" },
  { year: "2022", title: "Excellence in Direction", event: "Asian Animation Awards", project: "Kotaro Lives Alone" },
  { year: "2020", title: "Outstanding Visual Storytelling", event: "Digital Media Awards", project: "Commercial Reel" },
  { year: "2018", title: "Best Animation Direction", event: "India Animation Summit", project: "Original Series" },
];
