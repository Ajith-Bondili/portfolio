// Personal Information - CUSTOMIZE THIS!
export const personalInfo = {
  // Basic Info
  name: "Ajith Bondili",
  username: "ajith", // Used in terminal display (username@computer)
  computerName: "portfolio", // Used in terminal display (username@computer)
  email: "ajith.bondili@uwaterloo.ca",
  title: "ML + SWE + Agents",
  education: "Computer Science @ University of Waterloo",
  location: "Toronto, ON",

  // Resume filename (must be in /public folder)
  resumeFileName: "resume.pdf",

  // Social Links
  socialLinks: {
    github: "https://github.com/Ajith-Bondili",
    linkedin: "https://www.linkedin.com/in/ajith-bondili/",
    spotify: "https://open.spotify.com",
    leetcode: "https://leetcode.com/Ajxpert/",
  },

  // Usernames for API integrations
  githubUsername: "Ajith-Bondili", // Used in /api/github-activity
  leetcodeUsername: "Ajxpert", // Used in /api/leetcode to fetch your stats

  // School identity block for "me" section
  school: {
    name: "University of Waterloo",
    program: "B.S. Computer Science",
    logoDitherPath: "/waterloo_logo_transparent_crest.png",
  },

  // About Me - Each string is a paragraph
  aboutMe: [
    "i build practical ai systems with clean ux and strong engineering fundamentals.",
    "my work spans ml infrastructure, agentic pipelines, and product-focused software from 0 to 1.",
    "i care about making advanced systems understandable, reliable, and genuinely useful to real users.",
  ],
};

export const experiencesData = [
  {
    title: "Machine Learning Engineering @ Shopify",
    window: "Shopify",
    date: "Jan 2026 - Apr 2026",
    description:
      "Part of the Dev AI team at Shopify, worked on an AI-powered PR reviewer and Code Scans to upkeep the monorepo's health. Built and optimized the batching algorithm at the core of the system, and touched upon context engineering, model work, and applied ML work.",
    image: "/efecto-shopify logo.png",
    links: [{ name: "Shopify", url: "https://www.shopify.com" }],
  },
  {
    title: "Research Assistant @ University of Waterloo",
    window: "UWaterloo",
    date: "Sept 2025 - Dec 2025",
    description:
      "Researched LLM safety, co-authoring SafeGuard, a modular multi-agent framework for evaluating harmful content in language models. Fine-tuned LoRA critic models and built the aggregation layer behind release/refusal decisions.",
    image: "/efecto-waterloo.png",
    links: [
      { name: "Implementation", url: "https://github.com/SohamNagi/ArmyOfSafeguards" },
    ],
  },
  {
    title: "AI Software Engineer @ FriedmannAI",
    window: "FriedmannAI",
    date: "May 2025 - Sept 2025",
    image: "/efecto-friedmannai.png",
    description:
      "Built a portfolio management dashboard from the ground up and developed multi-step agentic pipelines alongside IBM engineers. Mostly full stack and applied AI work.",
    links: [
      { name: "FriedmannAI", url: "https://www.friedmann.ai/" }
    ],
  },
  {
    title: "Machine Learning Engineer @ WAT.ai",
    window: "WAT.ai",
    date: "Mar 2025 - Sept 2025",
    image: "/efecto-watai.png",
    description:
      "Built emotion classification models for a journaling app and an end-to-end data pipeline to generate synthetic training samples.",
    links: [{ name: "WAT.ai", url: "https://watai.ca/" }],
  },
  {
    title: "Software Engineer @ Cita Marketplace",
    window: "Cita Marketplace",
    date: "May 2024 - Aug 2024",
    image: "/efecto-cita.png",
    description:
      "Built out backend features, wrote unit tests, and helped streamline the deployment pipeline.",
    links: [
      { name: "Cita Marketplace", url: "https://www.citamarketplace.com/" }
    ],
  },
];

export const projectsData = [
  {
    title: "arXivisual",
    hackathon: "TartanHacks",
    hackathonWon: true,
    window: "arXivisual",
    date: "2026",
    stats: "7k+ users  ·  130+ stars",
    video: "/projects-media/ArXivisual.mp4",
    description:
      "Converts complex arXiv research papers into simple animated visual explanations.",
      links: [
      {
        name: "Live",
        url: "https://www.arxivisual.org/",
      },
      {
        name: "GitHub",
        url: "https://github.com/rajshah6/arXivisual",
      },
    ],
  },
  {
    title: "Assembl3D",
    hackathon: "CalHacks",
    window: "Assembl3D",
    date: "2025",
    image: "/projects-media/Assembl3d.gif",
    description:
      "Transforms IKEA PDF manuals into interactive 3D assembly guides with step-by-step scene rendering. Extracts parts, tools, and instructions, then maps them into scenes.",
    links: [
      {
        name: "GitHub",
        url: "https://github.com/rajshah6/assembl3D",
      },
    ],
  },
  {
    title: "PrepPal",
    hackathon: "UofTHacks",
    window: "PrepPal",
    date: "2025",
    image: "/projects-media/Prepal.png",
    description:
      "Interview prep bot to help with behavioral Q&A, giving you feedback to improve on.",
    links: [
      {
      name: "GitHub",
      url: "https://github.com/Ajith-Bondili/PrePal",
    },
    ],
  },
  {
    title: "CodeMentor",
    window: "CodeMentor",
    date: "2025",
    image: "/projects-media/codementors.png",
    description:
      "A personalized coding tutor to make my exam prep more enjoyable :)",
    links: [
      { name: "Live", url: "https://cf-ai-codementor.pages.dev" },
      { name: "GitHub", url: "https://github.com/Ajith-Bondili/cf_ai_project" },
    ],
  },
  {
    title: "Website Cloner",
    window: "Website Cloner",
    date: "2025",
    description:
      "Clone any website you love—instantly! Dives deep into obfuscated DOMs, scrapes layers, and reconstructs landing pages as editable building blocks so you can prototype fast (and shamelessly borrow your favorite sites ;).",
    links: [
      { name: "GitHub", url: "https://github.com/Ajith-Bondili/Website-Cloner" },
    ],
  },
  {
    title: "Spell-check",
    window: "Spell-check",
    date: "2025",
    description:
      "A privacy-first autocorrect system that runs fully on localhost. No cloud calls. No remote model dependency. Fast typo correction + rule-based context disambiguation.",
    links: [
      { name: "GitHub", url: "https://github.com/Ajith-Bondili/Spell-check" },
    ],
  },
];

// Static fallback when Spotify API is unavailable
export const fallbackRecentTracks = {
  tracks: [
    {
      id: "fallback-1",
      name: "Not Like Us",
      artists: ["Kendrick Lamar"],
      album: "GNX",
      album_image: "https://i.scdn.co/image/ab67616d00001e02d2efa1580e44b1574f5549c0",
      spotify_url: "https://open.spotify.com/track/6AI3ezQ4o3HUoP6Dhudph3",
      preview_url: null,
      played_at: null,
    },
    {
      id: "fallback-2",
      name: "Call Back",
      artists: ["Metro Boomin", "Don Toliver"],
      album: "Heroes & Villains",
      album_image: "https://i.scdn.co/image/ab67616d00001e02c4fee55d7b51479627c31f89",
      spotify_url: "https://open.spotify.com/track/0qOnSQQF0yzuPWJmSgWDnr",
      preview_url: null,
      played_at: null,
    },
    {
      id: "fallback-3",
      name: "Sky Walker",
      artists: ["Miguel", "Travis Scott"],
      album: "War & Leisure",
      album_image: "https://i.scdn.co/image/ab67616d00001e0249b3b7e63de066083b343b53",
      spotify_url: "https://open.spotify.com/track/7xQAfvXzm3AkraOtGPWIZg",
      preview_url: null,
      played_at: null,
    },
  ],
  favorite_artist: {
    name: "Drake",
    image: "https://i.scdn.co/image/ab6761610000e5eb4293385d429161f11f146fb1",
    url: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
  },
};

export const asciiList = [
  `⣶⣶⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⠔⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤
⠛⠛⠁⠀⠀⠀⣠⠔⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠐⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠿
⠀⠀⠀⠀⠀⠀⢀⡤⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀
⠢⣄⣀⡠⠄⠒⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡠⠤⠀⠀⣠⠔⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠒⢄⡀⠀⠀
⣀⣙⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⢚⡁⠤⡤⠒⠉⠁⠀⠀⠠⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠦⣀
⠋⠉⠃⠀⠉⠐⢲⠤⠀⠀⠀⠀⠀⡠⠊⢁⡜⠋⠁⠀⠀⢇⠀⠀⢶⡤⣀⣀⠈⠉⢁⣐⣠⠤⠐⠀⠀⠑⠦⡀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡬
⠀⠀⡆⠀⢀⡜⣁⣀⠄⠀⠀⢠⠞⠁⢀⠞⠀⡀⠀⠀⠀⠀⡑⠤⣀⠙⠢⣀⠀⠉⠀⠀⠀⠀⠀⠀⢄⠀⠀⠈⢂⠀⠀⠀⠀⠈⠙⢧⠘⠇
⠀⠀⡇⠐⠛⠛⡴⠁⠀⠀⢠⠃⠀⢠⠊⢠⠊⠀⡰⠀⢠⠎⠀⠀⠀⢀⠉⠈⠉⠁⠐⢆⠀⠘⢆⠀⠀⠱⡄⠀⠀⢣⠀⠀⠀⠐⣶⠤⣷⡄
⣤⣤⡇⠀⣠⠞⠀⠀⠀⢀⡇⠀⢠⠇⢠⠃⠀⣴⠁⣰⡏⢀⡆⠀⠀⣾⠀⢰⣄⠀⠀⠈⢷⣄⠀⢣⠀⠀⠸⣦⡀⠈⡆⠀⠀⠀⠘⢆⢸⣷
⣿⣿⣯⣉⡁⠀⠀⠀⡀⣸⠀⢰⡟⠀⡎⢀⣾⡏⠐⣿⠀⠺⡇⠀⢰⣿⣆⠘⣿⠑⣄⠀⠸⣿⣷⡀⢷⡀⠀⢻⣷⡀⢳⡐⣦⣀⠀⠈⠻⣿
⣿⣿⣇⣠⣉⣉⣹⠏⣱⣿⢀⣿⠇⢸⡇⠈⣾⣇⢰⣹⡀⢸⣧⠀⢸⢀⣿⣆⣻⣾⡭⢷⡀⡿⠹⡇⢸⣷⡀⢸⡈⣧⣸⣷⠘⣷⣿⣷⣦⣾
⣿⡿⡏⠀⠀⠀⣽⣴⢿⠉⣦⣇⣼⠉⣿⣶⣿⣿⣿⣿⣧⣼⣌⢧⡀⠘⣷⡟⠳⣼⣶⣾⣿⣷⣾⣇⢸⣹⣥⣼⣉⢻⡏⢹⣄⢹⠉⠉⢹⣿
⣏⣀⡟⠀⠀⠀⠛⠁⡌⠀⢹⣡⢬⣦⣟⢿⠋⠁⠀⠠⣬⣟⠻⡄⠑⣄⠸⣤⢐⣿⠿⢭⣌⠁⠉⢻⡿⢻⣿⢯⠸⢻⠅⢸⣿⡾⠀⠀⢈⣿
⣿⣿⣷⠀⠀⠀⢀⡼⢁⣀⣼⠛⢸⠻⣿⠀⠀⢀⢰⣶⣿⣿⠀⠁⠀⠀⠙⠻⠋⢰⣦⣾⣿⡇⠀⠈⠁⣾⠏⡸⠀⣼⠀⢸⠈⠀⠀⠀⠘⠿
⢿⣏⣿⠘⣶⡶⠿⠻⠿⠶⠟⢦⣌⠓⢬⣇⠀⠈⠛⠿⠿⠛⠀⠀⢠⡀⠀⠀⠀⠐⠿⠿⠿⠖⠁⠀⢰⠓⠋⣤⣾⢿⣿⣿⡧⠤⠤⠤⠀⠀
⣿⣿⡟⢿⣽⣿⣦⡸⣷⣼⣿⡏⣻⣷⣤⣼⡶⠋⢳⠀⠀⠀⠀⠀⢿⡁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⢶⣾⠉⠙⢾⠿⣿⣇⠀⠀⠀⠀⠀
⡿⣾⣿⣟⢙⣿⣿⣥⣬⣼⣿⣿⣿⣿⣿⣃⣷⡀⠈⢆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠖⠳⣀⡼⣿⣿⣿⣉⣿⣿⣀⡀⠈⠀⠀⠦⢀⣀
⢷⣤⣿⢿⢹⣿⣿⣿⣿⣽⣿⣿⣠⣿⣯⠟⣿⢿⣷⣾⡀⠀⠀⠀⠀⡒⠀⠀⠀⠀⠀⣘⣴⣾⣿⣾⠷⢿⣬⣿⣿⡉⢙⣷⡖⡀⠀⠂⠈⠛
⣿⣿⣿⡿⣿⣿⣿⣿⣿⡿⢶⣿⡿⠛⠻⠛⠁⢸⣾⣿⣿⣷⣦⣄⡀⠀⠀⠀⣠⠴⠋⠹⣿⣧⣿⣿⣠⠈⠳⣄⣽⣿⣿⠛⢛⡓⢤⠁⠀⠛
⣿⣿⣷⣤⣼⣿⣿⣿⣿⡷⠾⠿⡇⠀⠀⠀⠀⠘⡌⢿⣿⡏⠈⠁⠉⠓⠒⠋⠀⠀⠀⢀⣼⣿⣿⣿⠏⠀⠀⠈⠀⠀⠈⢻⡋⢳⡀⠀⠀⠐
⣿⣿⣿⣿⢿⣿⣿⠋⠁⠀⠀⠀⢳⡀⠀⠀⠀⠀⢱⡈⢻⣿⡀⠀⠀⠀⠀⠀⠀⢀⣴⢿⣵⠟⢁⡎⠀⠀⠀⠀⠀⠀⢀⡰⠟⠶⣧⣄⠈⠉
⠉⣵⣶⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀⠱⣄⠀⠀⠀⠀⠱⣄⡙⢿⣶⢦⡀⠀⢀⣤⣿⣷⣟⣡⠴⠋⠀⠀⠀⠀⢀⣠⠖⠉⠀⠀⠀⠈⠻⣧⣀
⣿⣿⣿⠟⠁⠀⠀⠀⣿⡀⢀⠀⠀⢀⡨⠷⣦⣀⣀⠀⠀⠉⠛⠻⡦⠭⠷⠏⡼⠛⠋⠁⠀⠀⠀⠀⠀⢀⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿
⣩⡿⠋⠀⠀⠀⠀⠀⣹⠷⠼⡖⠚⠁⠀⠀⠀⠀⠀⠙⠲⢤⣶⣤⡘⡆⠀⡜⢁⣀⡄⠀⠀⢀⣀⣠⠖⠋⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠈⣿
⠀⠀⠀⠀⠀⣀⣠⠾⠃⠀⠀⠈⠲⢴⡶⠟⠛⢻⡿⠶⠦⣴⡛⠀⠙⣻⣶⠗⠛⣻⡟⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⢹`,
  //   `
  // ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠀⠙⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
  // ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠗⠀⠀⣀⣄⠀⢿⣿⣿⣿⠟⠁⢠⡆⠉⠙⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿
  // ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠀⠀⣴⣿⡟⠀⠘⣿⣿⠋⠀⠀⠀⢠⣶⡀⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿
  // ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⢠⣿⠛⣶⠀⠀⣿⡟⠀⠀⠀⢠⣿⣿⡇⠀⠠⣽⣿⣿⣿⣿⣿⣿⣿
  // ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠅⠀⠀⣿⠏⠀⣿⠀⠀⣿⠁⠀⠀⢠⣿⠟⢻⡇⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿
  // ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⣼⣿⠀⢰⡟⠀⠀⠛⠀⠀⠀⣾⡇⠀⢸⡇⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿
  // ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠿⠃⠀⠈⠀⢀⠀⣀⣀⠀⠘⠟⠀⠀⡾⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿
  // ⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀⠀⠀⢀⠂⠀⠈⠉⢴⣽⣿⠵⣿⡶⣂⣄⡀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿
  // ⣿⣿⣿⣿⣿⣿⣿⣿⡟⠡⠆⢀⠀⠀⠀⠀⠄⠀⠈⠘⠏⢿⣶⣿⡿⢟⣱⣖⠒⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿
  // ⣿⣿⣿⣿⣿⡟⣻⠏⣠⠄⠀⢀⡀⠀⠀⠀⠀⠈⠀⠀⠀⢸⣿⢦⠄⠙⣿⡇⠩⣭⣅⠈⢿⣿⣿⣿⣿⣿⣿
  // ⣿⣿⣿⣿⣟⣼⡇⠈⢀⣴⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠁⠀⢀⠀⠈⠰⣶⡤⠿⠃⢸⣿⣿⣿⣿⣿⣿
  // ⣿⣿⣿⣿⡟⠉⢠⡶⠋⠀⠀⠀⠀⠀⠀⠀⢀⣤⣤⣴⣶⣤⣄⡀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿
  // ⣿⣿⣿⡏⢀⡠⠀⠀⠀⠀⠀⠀⠀⢀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣶⣦⣄⠀⠀⠂⠀⠈⣿⣿⣿⣿
  // ⣿⣿⣿⢃⠈⠀⢠⠀⠀⠀⠀⠀⢠⣿⣿⣿⠿⣩⣏⡙⣛⣛⣿⣿⣿⣿⣿⣿⣿⡿⢇⠀⠀⠄⠀⠘⣿⣿⣿
  // ⣿⣿⣿⡎⠀⠀⠀⠀⠀⠀⠀⠠⣿⣿⣿⡟⣰⣿⠁⢀⠈⢿⣿⣿⣿⣿⢁⣴⠖⢲⣾⡇⠀⠀⠄⠀⣿⣿⣿
  // ⣿⣿⣿⢀⠀⠀⠀⠀⠀⠀⠀⠀⣏⢿⣿⡇⣿⡇⠀⠀⠀⣼⣿⣿⣿⡇⣼⡏⠀⠀⣿⡇⠀⠀⠀⠀⣻⣿⣿
  // ⣿⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⢸⣄⠻⣷⡘⣷⣀⣀⣴⣿⡟⠉⠛⠓⣿⡇⠀⢰⣿⡇⠀⠀⠀⣼⣿⣿⣿
  // ⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠙⢷⣌⠻⢿⣿⣿⣿⣿⣿⣦⣶⣿⣾⣧⣤⡾⠏⠀⠀⠀⠀⣿⣿⣿⣿
  // ⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⠶⢌⣉⣛⠛⠿⠿⠿⠿⠿⠛⠉⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿
  // ⣿⣿⣿⣿⣿⣿⣿⣶⣄⠀⠀⠀⠀⠲⠀⠀⠀⠀⠀⠀⠉⠉⠉⠀⠀⠀⠈⠁⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿
  // ⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠛⠻⠿⣿⣿⣿⣿⣿
  // ⣿⣿⣿⣿⣿⣿⣿⡏⠛⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡘⡻⣿⣿
  // ⣿⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⢨⡛⡛⣁⣿
  // ⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠂⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿
  // ⣿⣿⣿⣿⠇⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣄⣠⣴⣾⣿⣿⣿⣿

  // `,
  `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⠟⠻⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⠀⠀⠈⠻⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣶⣦⡀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡿⡇⠀⠀⠀⠀⠈⠙⢷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⠾⠋⠁⢸⣿⡇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⡇⠀⠀⠀⠀⠀⠀⠀⠙⢷⣆⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⡾⠛⠁⠀⠀⠀⣿⣼⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡏⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⡾⠛⠁⠀⠀⠀⠀⠀⣸⡿⣿⠂⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⣿⠀⠀⠀⠀⠀⠶⠶⠶⠶⠶⠶⠿⠷⠶⠶⠤⣤⣤⣀⣀⡀⢀⣤⡾⠛⠁⠀⠀⠀⠀⠀⠀⠀⢠⣿⢣⡟⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⣽⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⡷⣸⠇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⢣⡿⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣼⠃⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠇⠀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡏⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣿⣿⡾⠛⠉⣉⣽⣿⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⠶⠛⢛⣿⣿⣷⣶⣤⣀⠀⠀⠀⠀⠀⠀⢸⣿⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢰⣾⠛⢉⣵⡟⣃⣤⣶⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⠀⣠⣾⠏⣡⣴⣾⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⢈⡹⣇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠙⣷⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣀⣀⣀⣀⣰⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠶⠖⠲⠾⣿⣿⣦⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣠⣴⡾⠋⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠛⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠀⠀⠀⠀⠀⠈⠙⢿⣄⠀⠀⠀⠀
⠀⠀⣿⡛⠉⠁⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢷⣄⠀⠀
⠀⠀⣾⣷⣦⣀⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣧⠀
⠀⡀⠈⠻⢿⣿⣿⣷⠆⠀⠙⠻⠿⣿⣿⡿⢿⣿⠋⠀⠀⠀⣴⠇⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⡆
⠀⠻⣟⠛⠛⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠿⣿⣆⣀⣠⣼⢿⣧⠀⠀⠀⢀⣿⠿⢿⣿⣿⣿⣿⣿⣿⣿⠿⣛⠹⣮⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣷
⠀⠀⠈⠻⢦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⢩⠿⠻⣯⢻⣷⣶⣿⡿⠋⠀⠀⠀⠉⠉⠉⠉⠁⠀⣐⣭⣾⡿⠋⢻⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿
⠀⠀⠀⢀⣰⣿⣻⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⡿⠛⣍⠡⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡟
⠀⠀⠀⠛⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⡾⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡿⠁
⠀⠀⠀⢐⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⠟⠀⠀
⠀⠀⠀⣼⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡾⠃⠀⠀⠀
⠀⠀⠀⣸⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣶⡟⠀⠀⠀⠀⠀
⠀⠀⣰⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⠛⠀⠀⠀⠀⠀⠀
⢠⣾⢿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡏⠀⠀⠀⠀⠀⠀⠀
⠀⣰⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⣿⠀⠀⠀⠀⠀⠀⠀⠀
⣾⢿⣾⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠛⠀⠀⠀⠀⠀⠀⠀⠀
⢀⣾⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⠀⠀⠀⠀⠀⠀⠀⠀⠀
`,
  `
⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣼⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣸⣿⣿⣷⣤⣴⣦⣀⣠⣶⡶⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⣄⡀⠀⣼⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠘⣿⣿⣿⣿⣿⣿⣿⡾⢛⠋⡛⠻⣿⣿⣿⣿⣧⣴⣶⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢸⣿⣿⣿⣿⣽⡏⠰⡈⢆⢡⣷⢀⠻⣿⣿⣿⣿⣇⡀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢻⣿⣿⣿⣻⣿⠄⢣⠘⡄⢺⡏⢄⢣⡌⠻⣿⣿⣿⣿⣿⣿⣷⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣷⣶⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣀⣸⣿⣿⣿⣿⣿⡏⢄⠣⢌⣹⠇⡌⣼⢇⠱⡈⠿⣿⣿⣿⡿⠿⠛⠛⠛⠛⠛⠛⠛⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠹⢿⣿⣿⣿⣷⣿⣿⣦⠑⣂⡿⠰⡐⡿⢈⠆⡑⢢⢙⡿⢉⠐⡠⠑⣈⠂⠥⠘⡀⢃⠰⠀⡌⠙⠯⣉⢩⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠈⠹⣿⣿⣿⣽⣿⣷⣜⠏⡰⢱⡟⡠⢊⠔⣡⡿⢁⠂⡡⠄⢡⠠⠌⢠⠁⠒⡈⠄⡡⢀⠃⠤⣹⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠈⣻⣿⣿⣿⣿⣿⣷⣤⠹⢇⠰⡁⢎⣾⠁⠂⡔⠠⠘⡀⢂⠌⠄⠌⠡⡐⢈⡐⠄⢊⣼⣿⣿⣿⣿⣿⡃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠙⠛⠛⢻⣿⣿⣯⣿⣿⣷⣌⠢⠑⢬⡇⠌⠡⠠⠑⢂⢁⢢⡈⠌⡐⠡⠠⢁⡐⠈⢼⣿⣿⣿⣿⡿⢁⢻⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⣻⣿⣿⣿⣿⣿⣧⣍⢾⠃⠌⢂⡁⢎⣶⣿⣯⣭⡘⠰⡡⢁⠂⠤⢉⠈⠿⣿⣿⠟⢀⠂⠄⠛⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡿⡙⢹⣿⣿⣿⣿⣿⣿⠈⠔⠂⢤⣿⣿⣿⣿⣿⣅⠀⠹⠄⡘⢀⢂⠡⠂⢄⠠⢈⠄⠊⠌⡐⢉⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢰⡇⡇⣾⣿⣿⡿⣿⣿⣿⡈⠄⢃⠘⣿⣿⣿⣿⣿⣿⠀⢠⠃⠄⠃⠄⡂⢉⠄⢂⠡⢈⠌⡐⢈⠄⡘⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⣓⡘⠿⣿⢷⠙⠛⣻⠡⢈⠄⢊⡘⢿⢿⠿⠟⠃⢠⠞⣨⠐⡉⡐⢈⠤⠈⡄⢂⡁⢂⠌⠄⡂⠔⠘⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣯⠱⢈⠐⠂⢾⣁⣂⣽⣆⠂⣌⣼⠇⠠⢉⠐⡀⠉⠤⢈⠳⠇⡐⠠⢁⠂⡡⠐⡠⠐⠂⠌⡐⠐⡨⠐⠸⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣇⠂⠌⣁⠂⡉⢹⣟⣿⣻⡯⠁⠌⢂⡁⠢⢈⢁⠒⠠⠒⡀⠆⣁⠂⠡⠄⡑⠠⠑⣈⠐⡈⠔⠠⠑⢂⢹⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣧⠌⣀⠒⡈⡐⠻⣮⡷⠃⠌⢂⠡⠠⠑⣀⠊⠄⡑⠠⢁⠂⠤⢈⠁⠆⡐⠡⠌⣀⠂⠡⠌⢂⠡⢂⠘⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢳⣤⠒⠠⠐⠡⣀⠐⡈⠔⡈⠤⠑⡈⠄⠌⡐⢈⡁⢂⠡⠒⡈⠰⠈⢄⡁⠆⠠⠌⠡⣈⠐⡐⡈⠌⣻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢷⡈⠅⠒⡀⢂⠁⠆⠰⠀⡅⠂⠌⠒⡈⠄⠰⠈⢄⠡⠐⠡⠌⢠⠐⡈⢡⠈⠔⡀⠒⢠⠐⡈⣿⡃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠠⢁⠂⢿⡆⠌⡁⢺⠇⡁⢊⠐⣄⠉⠄⠃⡄⠊⠌⡐⠌⡀⠆⡁⢂⠌⡐⠠⠉⠄⢂⠁⣾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠘⣧⠒⡈⠄⢶⢀⠡⡞⡐⠠⢁⣞⠂⢌⠘⢠⠐⣡⡬⠴⢒⠃⡐⡈⠄⢂⠌⠡⠘⡈⠄⢊⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⠹⣧⠀⢀⣤⠾⢷⡐⡈⢼⡆⢸⡇⠡⢘⣼⢳⡿⣦⠈⣤⠿⢁⢂⠁⠆⡈⠔⠠⢁⠊⠄⡡⠡⢐⠈⣼⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⢃⢹⡷⠋⢄⠂⠜⠹⢶⠾⢁⠚⢿⡴⠟⢡⣿⠓⠸⣿⠋⡐⠄⢂⠉⡐⡐⠨⠐⠡⡈⢄⡛⢁⠂⣸⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⢰⠀⡂⠿⠈⢄⡈⢂⡁⢂⠐⠂⡌⠠⠐⡈⠴⣿⢀⠡⠘⣆⠰⢈⠂⢡⠐⣀⠃⠡⢒⡼⠋⡐⠈⣴⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⡀⠆⡁⢂⠡⢂⠐⡠⠐⡈⠄⠃⡄⠡⢁⠂⢼⣿⠀⠂⡅⢂⡐⠂⠌⢤⣒⠠⠬⠓⡉⠄⢒⣠⡿⠛⢶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠷⠶⠶⢧⠶⡶⢶⠶⡷⢶⠾⡶⢶⠷⡶⠾⠼⢿⣠⣁⣐⣠⣀⣉⣒⣰⣂⣦⣥⣖⣴⠮⠿⠳⠶⠾⠴⠿⠿⠿⠳⠶⣦⣀
⠀⠀⠀⠀
`,
  `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⣶⣦⣤⣄⡀⠀⠀⠙⢿⣿⣷⣶⣤⡀⠀⠢⡄⠀⠀⠙⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣷⣶⣬⣻⣿⣿⣿⣿⣷⣤⡙⣦⠀⠀⢹⣿⣿⡄⢰⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠙⠿⣶⣶⣾⣿⣿⣿⣿⠿⢿⣿⣿⣿⣿⣿⣛⡛⠛⠉⠉⠙⠛⣿⣿⠿⣿⣿⣿⣿⣿⣿⣿⣎⢧⡀⠀⣿⣿⣷⡈⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⣿⣿⣿⣿⣿⣿⣶⣮⣭⣭⣿⣟⣻⣿⣿⣿⣷⣦⣤⣬⣽⣓⡿⣿⣿⣿⣿⣿⣿⣿⣧⠀⣿⣿⣿⡇⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⣿⢿⡛⠛⠛⠛⠿⠿⣿⣿⣿⣿⣿⣇⣿⣿⣿⣧⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠐⢒⣻⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢿⣟⣛⡛⠛⠛⠛⠛⢻⣿⣷⣶⣶⣶⣦⣽⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⣤⣶⣿⠿⢟⣿⣿⣿⣿⣿⣿⣿⠿⣟⣯⡽⠾⣛⣉⣡⣤⣤⣴⣶⣶⣶⣶⣦⣬⣭⣽⣛⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣠⠾⣋⣭⣷⣶⣿⣿⣿⣿⣿⣿⣿⠿⣾⣫⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠿⠿⠿⠛⠿⠿⠿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠾⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⢟⣛⣯⣯⣤⠦⠤⣒⣀⣀⣤⣤⣤⣤⣶⣶⣶⣶⣿⣿⣿⢻⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣉⣽⣿⣿⣿⣿⣿⣿⣿⢿⣿⠿⣟⣯⣵⣾⣿⣿⣿⣭⣿⣶⠿⠟⠋⢝⣻⣭⣿⣿⣿⣿⣿⢟⣽⣿⣿⠏⣾⣿⣿⣿⣿⣿⣯⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣠⣴⣾⣿⣿⣿⣿⣿⡿⠛⠉⣠⣤⣷⣿⣿⣿⣿⣿⣿⣿⠟⠛⠉⠀⣠⠴⢚⣩⣵⣾⣯⣿⢿⣿⢫⣾⣿⣿⠟⣼⠿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣴⠿⠛⣋⣽⣿⣿⣿⣿⣡⣴⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⣤⣠⣤⣿⣾⣿⣿⣿⣿⣿⣯⣷⡿⣵⣿⢟⣿⢏⣾⠏⢼⣿⣿⣿⣿⣿⣿⢿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⡿⣼⡿⣣⡿⣽⣿⠏⢠⣾⣿⣿⡏⢻⣿⣿⣾⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠋⣿⣿⢟⣼⣿⣾⣿⣇⣴⣿⣿⣿⣿⠃⢸⣿⣿⡏⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⢻⣟⣉⣉⠙⢻⣶⡀⣼⣿⣧⣾⣿⣿⣿⣟⣽⠟⢻⣿⣿⣿⠀⣼⣿⣿⡇⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣝⠳⠶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢡⣶⣿⣿⣿⣿⣿⡿⠃⢀⠋⢸⣿⣿⠀⢸⠇⢱⣿⣿⣿⣿⣿⣿⣿⣿⣥⣀⣼⣿⣿⡏⣼⣿⣿⣿⢧⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢈⣶⣾⣿⣿⣿⠿⣿⣿⣿⣿⣿⣿⣿⠘⣿⣿⣿⣿⡟⣽⠁⠀⠈⢷⣤⣉⣁⣠⡀⣠⣾⡿⠟⠛⣿⡿⣟⣵⡯⢈⡏⣿⣿⣿⣷⣿⣿⢋⣿⠘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢿⡋⠉⠠⡄⣿⢠⣿⣿⣿⣿⣿⣿⣿⣆⣿⣿⣿⡿⢸⠇⠀⠀⠀⠀⠈⠛⠻⠟⠛⠉⠀⠀⣠⠾⠋⢰⢿⡿⠁⡸⠀⣿⣿⣿⣿⣿⡟⣸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠻⣄⠀⢳⣹⣿⣿⣿⣿⣿⣿⣿⣿⠟⣿⣿⣿⠃⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠘⠿⠶⠿⠃⣼⣿⣿⣿⣿⡟⢀⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠈⢦⣀⣿⣿⣿⣿⣿⠋⢸⣿⠇⠀⢿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢱⠀⠀⠀⠀⣰⣿⣿⣿⣿⡟⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡀⠀⠀⣠⡿⠋⣾⡿⣿⣇⠀⢸⡿⠀⠀⢸⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⣀⡼⠃⠀⠀⢠⣿⡿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠃⠉⠙⠻⣶⡿⠋⢳⡘⢿⡀⢸⡇⠀⠀⠘⣏⢿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⣆⠀⠀⠀⠀⢸⠋⠀⠀⠀⢠⣿⡟⢀⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⣀⣃⣙⡂⠀⠙⢦⣳⡌⠀⠀⠀⠀⠙⢸⣿⣷⡄⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠿⠃⠀⠀⢀⣴⣿⠛⠀⢸⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡀⠈⠉⠉⠉⠉⠙⠳⢤⣀⠙⢿⣆⠀⠀⠀⠀⠀⣹⣿⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣴⣿⡟⣁⣤⣴⣾⠒⠶⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡇⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⢮⣜⣧⡀⢠⣴⣾⣿⣿⠟⣿⣧⡀⠀⠀⠀⠀⠀⠀⣠⣤⣾⠟⢩⣿⡿⠀⠉⠉⠉⠉⢷⣄⡹⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⢿⡏⠁⢿⡟⠁⣼⠟⠉⠙⠶⠤⡤⠴⠞⠋⠁⢸⠏⠀⢸⣿⠃⠀⠀⠀⠀⠀⠀⠉⠉⠙⠺⢝⡲⢦⣀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠙⢧⣀⠀⠀⠀⠀⠀⠀⠀⠱⣄⠀⠀⢻⣆⠀⠀⠐⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡞⠀⠀⢸⠇⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠉⠳⣬⡙⠲⣄⣺⠉⠙⠶⠶⠖⠒⠶⣤⣀⠀
⣄⠀⠀⠙⢧⡀⠀⠀⠀⠀⠀⠀⠙⣄⠀⠀⢻⡄⠀⠀⢀⣀⠤⠶⣤⣀⣠⣤⣀⣀⣠⡀⠀⠀⠈⠀⠀⠀⠀⠀⢠⠟⣸⠃⠀⠀⠀⠀⠀⠀⠀⠙⢶⣄⡙⢷⣤⣀⣀⣤⠀⠀⠘⣧⡀
⣿⣻⣶⣤⣤⣉⣷⡀⠀⠀⠀⠀⠀⠹⣦⠀⠈⣧⣴⡛⠋⢁⠀⠀⠸⣇⠀⠈⢻⡄⠈⠻⣦⣄⡀⠀⠀⠀⢀⡴⠋⡴⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠉⢻⣦⣌⣻⡍⣿⠀⠀⠀⠈⣇
⣧⣻⣟⣽⣾⡏⣹⣟⢶⣦⣤⣀⠀⠀⠙⡆⠀⣧⠈⠙⢶⣾⡆⠀⠀⠹⡄⠀⠘⣇⠀⠀⠹⡎⠻⡆⠀⠀⠉⠠⠎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⠀⢰⡏⠉⠉⢡⠇⠀⠀⠀⠀⠘
⠞⢽⢿⠿⢿⡗⣴⣿⣿⣿⢼⡯⣿⡿⠶⣶⢤⣿⣀⣀⡀⢈⣙⢦⡀⠀⢹⡄⠀⢻⡄⠀⠀⢻⠀⢻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡾⠁⣰⠋⠀⠀⣰⠾⠀⠀⠀⢰⠀⠀
⣫⢶⣼⣽⣟⠧⢈⣿⣿⣻⣻⣷⣼⡟⢿⣁⡰⣻⣿⣟⣿⣿⣽⣨⡇⠀⢸⡇⠀⢸⣿⠀⠀⢸⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⠃⠀⠀⢻⣄⣠⠞⠁⠀⠀⠀⠀⠸⠀⠀
⠘⠉⢀⢘⠋⣃⡉⣛⢛⢙⠙⣿⣿⣓⣶⣾⣿⣟⣻⣫⠾⢮⣿⣽⢳⣦⣼⡇⠀⢸⢿⣦⠀⠀⠀⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡇⠀⡀⣘⣿⠋⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀
`,
];
