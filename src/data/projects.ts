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

// Google Drive thumbnail helper — uses the public file ID
const dt = (id: string, w = 1600) => `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`;

export interface ImageSection {
  heading?: string;
  images: string[];
}

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
  stills?: string[];
  /** When set, render these image sections instead of stills+video (used for illustrations / cartoons-only). */
  imageSections?: ImageSection[];
  /** When true, hide the video section entirely (e.g. illustrations). */
  hideVideo?: boolean;
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
    stills: [
      "1iJVtU_35WZirSz4x8V--EAUl2mmtblP7",
      "1l88yrOuwd27XF1dSa0XVt6h96BUcIzLs",
      "1N9mio4KGo5yjoUC0Lw1BEVQq4d350pjG",
      "1uV6e_VaH1dqWvYFDLwfur-z5XlRHiKhg",
      "1uhX4IgVpWRvFRz-sGyVV7QDM7TIabnnX",
      "1w0B0p9czC7XE9-ZYrm6gHZymUtaRfdBm",
      "1u-2nbNlLDFnOPpI1BmvNWwjKSGbPawsP",
    ].map((id) => dt(id)),
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
    stills: [
      "1WxorKpXKKOqAWwTEslDND1V2MhWzthXz",
      "1imbE7_wrnc-mq_WHRpxR-j_XfR0HfPcg",
      "1r-tjDnBEpC1DfRFgjFy8qyDwc5lbz5Ro",
      "1mnpmNbN9x832BuG2F04r2Mrc3z74U-Z0",
      "1PKRSlsjyAS3yxBVzIT7EkkDFOJRBnZer",
      "1kjyYRBhjafhuqYgeCWFs1cuqMwIuneOu",
      "1oZ9WfX9vLmLacrHUhswtRYToJAa5nIiw",
      "19GBlbj_EfOpt97uxotaF1yrW2Ue6T_-s",
      "1Mv8LBiLMegPD6qqJpBr1zHf8Fupw2nvp",
    ].map((id) => dt(id)),
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
    stills: [
      "11t_5qXe5jTNpNDPQ5gr6ju5whdv-COTy",
      "1bRpCf4hc1NzyNivvBKgZlpY8Soxs2aJH",
      "14eKgO5e0WDjKHWhNjD3LJ93HWQRuytSp",
      "1kDyLIDCEEtwOp440TgeCTqFbUbLJOX6A",
    ].map((id) => dt(id)),
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
    stills: [
      "1hF5Pa3fSewWpwSskUyxBfeaXFrmZi-Gv",
      "18dgCNcWI6Hapye0KO9Qv0bcp2fTxDptz",
      "16gAaapuyRX_-hLPIPY8OlsB0-gtCSwO5",
      "1zrBKxyv9dMFwBtwDAaMvMOq7NQpCJqAP",
      "18-Iil00ivsZ59klE52Hq08PFRTjc-FUp",
      "1AoOCpxAKDUWtBxwoy1CyvrP_R4sG5Wcg",
      "1jusroIRIExz_ltNwfjxc1uW23x9-wP1b",
      "1VIlLmYWGq-wCfyVgoozdrKXTR2pPFdTe",
      "152gMdmEfuHP7eyYdNnIlHeCgmlSBah7U",
      "1RMps-NCUttPcGF6ehuS7cPa9iyrJbI9w",
      "1iZ0CZsFz6bCHrshzUleFOlyBxnVcUdPr",
      "1_UXUmZf670MtyentllG-ZJzQv76hmLQi",
    ].map((id) => dt(id)),
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
    stills: [
      "1LcRaJp4gjFxs7eCTW6ZKD4uoDr_V_O_F",
      "15SJ0vgh_aKDQ8VnqUK74r8QDsims3pCs",
      "12L1SN1SsqivWPaP-4yJ6H8ibRGSWsqIV",
      "1TWMtpBjriUA3dnMb7T8_SZD2tBIJb5Jw",
      "1dKmED58TJySfoZeMk2WF-mpCyG6Jac3Y",
    ].map((id) => dt(id)),
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
    stills: [
      "1Wf8-3CfACwvUwmpf1zK5lCWidwpXUwaw",
      "1qUzqlb0MVJ4nwCzD6vM6Q12OGTtyIfzV",
      "1fWk6kOhu7O-G0cjBTeYJVFSWz42CL1Qv",
      "1d3R7Rcuwsn9DO-N3_v85omQ0pOfYIQ7t",
      "1ODI_PvNfCyNpwiF4_JFZffiiAoi8XwHl",
      "1cZpkqJWOzujQXYtRakFFze8IpzAs4wkJ",
      "1Db02oQZKlHlYIAqrg-8FcnYMmlhF0X97",
      "1lE5FEZL9JLCwov2g0ZE3h-Ei5iFmg0Qz",
    ].map((id) => dt(id)),
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
    stills: [
      "1DA8h3zyaQzL3wp-ThbFgqDcI_7rGyBLk",
      "1x4tjxu9SKPYCxbgDbSA1HSFi64bRnd0Z",
      "1ArX8LgD1d1i7_5gr6RnzoD2OLrxzTn6M",
      "1kKedtvsAvcDxiXZVInlX3IcXKfXQhhGd",
    ].map((id) => dt(id)),
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
    stills: [
      "1fNWVsjXtSuKKyqfoS17vuLpUBLMxGs1g",
      "1yK7s-qvhjoypj98FG-UVqFz_Zw0Rnt40",
      "15y1DTbfSDqt4PipkA5W2FGKZb2kPkxV0",
      "1f1FX17fLTGz8EDuJS-HDWRCgBHzrl2DW",
      "18fzdrg54QFSVXlO-hjKYMkCNDcy1c_O0",
      "1kH5Egmr_vwe7FxvR9agND0HGmRtlbYus",
      "1o2FzwORakrjeAsk-fDXOaocaxty1b2zY",
      "161oY2syJnxMb5olsEMhXXWugHOLoIpEs",
      "1sDXn9Y320hgfRznT5JuSxckuYVJaNbyM",
      "1iTR8DTdmykRhD1MoCg_cpPbKNHeJ4eW_",
    ].map((id) => dt(id)),
  },
  {
    id: "illustrations",
    title: "Illustrations & Character Designs",
    role: "Character Designer & Illustrator",
    description:
      "I've always loved drawing and painting characters. AI may be reshaping the craft, but having designed and rendered characters by hand for years gives me a sharper eye for evaluating AI output — and the skill to step in with manual tweaks that lock in the exact appeal a story needs.",
    posterImage: pIllustrations,
    category: "Visual Development",
    hideVideo: true,
    imageSections: [
      {
        heading: "Character Designs",
        images: [
          "16l4NgyS0ikeMOvyXhRdkgxv4beuoDdlO",
          "1FQ00HJ8Fb8VM3ubSnRcGr_5rQszzgjZb",
          "1fKGaqtaxkYJvMW0TsuVHRhEA155vUiLb",
          "14oakMsvGqABR6DIlcsI8nNu5gouug1Bq",
          "1HVg7kKE2eeMAw4LO90n7avIPLv2vGNVP",
          "1Sh6awym2ytm-cONq3P5n2s9mU5NFtXPj",
          "1TnfpB1jV5PILyJQ9yHL_oH5mJ6R5pJAi",
          "1EFutoR17_MoZzQrVkNXh29GMvR9QBfC0",
          "1UA-jWDkoGZoOrmx8iTcunZFTZq1_f5xl",
          "168GG9o1hnpJ880EFeysADOSyNQxtgsyA",
          "1X6viYIx49JZSSB7nGqjkB8-SPOWuHuNE",
          "1FzLrru2qNiUDXHgg3MqggZVU4it0zF7o",
          "1PX1ZLYgWEFIy2t8p135dOF4R3pJTTMN0",
          "1IUfQRHeSVSIedCKaE9YVU18GSNiaby1D",
          "18ZmAaaud8QbhEaBvBzvUEaL-6mphwCtl",
          "12l2AzORbggOZea8pWEzUN5eUcDgt0jWz",
          "1XGpO2v-GRHxGcNbf6DWqQy0j_9mhfYxJ",
          "1c2CXXT7nFwC4puTkBEtv2vqBqtuJE1_o",
          "1aM49C8hFLIijLsDBETSMI83zRFO-jdBG",
          "1vFfuwpRiQbqU4shfyhW514dCf82zsMkf",
          "1A_LCrJbpNbnGm-G9SdrwfMWcVwR-sdzB",
          "1IwOWlsz_TGqv6hT4dQWIobwnOz9GP-hr",
          "107s68XNxgryxCccvoXSUgEh8-wMNHw3b",
          "15q0wqgLA4LYN9GfiZ9ym6QlONsn-RQQg",
          "1Co7mybh-Nj8ULWneMnbKCbpzoWSs3yGA",
          "1VQknN25d9mr4z5YmHqtZMfDlsl0YwJbX",
          "1t2ElaQIZsXjMsvhj3f_ttlhWownIXQ4r",
          "1el72f1m3CXGeepsQ-X1peivt0l-jg_hs",
          "1_2Bsqw68RJheRFAvvhovvFhPpET3ri8W",
          "1FCdus61CS1t6f48jvzkRNDmEqG8rIb0r",
          "1r4Y-4FhB-Em9mI_EVzOC9ygaBagtvpQn",
          "11CJ_M8fP5mDV-r4qtfDvWI4QaWS3mEBi",
        ].map((id) => dt(id)),
      },
      {
        heading: "Illustrations",
        images: [
          "1gf_roI1MrnLvTcecdNC7li-afnJOO2nw",
          "1h3SE-eq2iIf8Me9I9uQCkAPf3dj6o0Ng",
          "1IYMVtucOOph2cVJegePGGDqFL3QvuIgz",
          "1EIqwO1uLU2-O1iIoMOy1TTY2qdNNUBrd",
          "1JH6p4c8GQHdOT5yc4AE1Kn511RBgziKo",
          "1nmGavQ80igUZu73M65PjUdJnqaBIj9oT",
          "1nzJTRllRUtKeU-O5i9mr6vEgX6KJWDIS",
          "1Yg5QDb3-17sQ4YypJqTowEBxOjg08q7H",
          "1TkRhnV33Udz2PvqbOZB4Y3XDpbEbmnd8",
        ].map((id) => dt(id)),
      },
    ],
  },
  {
    id: "movies-series-vfx",
    title: "Movies, Series & Cartoon Projects",
    role: "Animation / VFX / Motion Graphics — Selected Filmography",
    description:
      "A decade of contributions across feature films and series — motion graphics, 2D cheat-shot VFX, motion capture into Unreal Metahumans, music-video animation and PIP shots. Highlights:\n\n• Bhavesh Joshi Superhero — 2D image-warp VFX in Moho\n• Ghost Stories (Netflix anthology by Anurag Kashyap, Zoya Akhtar, Karan Johar, Dibakar Banerjee) — 2D mesh-warp VFX shots saving full CG cost\n• Jigra (Alia Bhatt) — 2D mesh-warp VFX shots\n• Dobaaraa (Taapsee Pannu) — 15-year timelapse VFX sequence in Blender\n• Sacred Games (Anurag Kashyap; Saif Ali Khan, Nawazuddin Siddiqui) — 2D motion graphics\n• Cartoon credits include Ninja Hattori, Oggy and the Cockroaches, Kid Krrish, Jules Verne, Mati & Dada and more.",
    posterImage: dt("16fuffHdtWi5O_wantUwFWkheVkYhWqVd"),
    category: "Selected Filmography",
    hideVideo: true,
    imageSections: [
      {
        heading: "Movies, Series & VFX",
        images: [
          "1GTFl_JU03S_Qevd48mxlI9G0ImMV95ef",
          "1lHB944EgoZAwbOEoc0ENKdwtd2rACcUh",
          "1fkvWbSGBE1JB1D_0kTIU1srB7siCifBF",
          "1zyT_bS4W3tQ3VvL8l3qZT4yO-FxPlqJG",
          "1GXO6b_0BkeT5ANdEY0B3D6jpFkCF18iR",
          "16fuffHdtWi5O_wantUwFWkheVkYhWqVd",
        ].map((id) => dt(id)),
      },
      {
        heading: "Cartoon Projects",
        images: [
          "1yDjKJkqHoFR8UR3oY736pqi5wphN8bi_",
        ].map((id) => dt(id)),
      },
    ],
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
