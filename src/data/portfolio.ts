export type RichSegment = {
  text: string;
  highlight?: boolean;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

export type Experience = {
  title: string;
  organization: string;
  dates: string;
  location: string;
  image: string;
  eyebrow?: string;
  bullets: RichSegment[][];
  defaultOpen?: boolean;
};

export type ArchivedExperience = {
  title: string;
  role?: string;
  location: string;
  dates: string;
  image: string;
  bullets: string[];
};

export type Project = {
  title: string;
  description: string;
  image: string;
  icon: string;
  screenshots: string[];
  techStack: string[];
  github: string;
  live?: string;
  details: string[];
  defaultOpen?: boolean;
};

export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Side Quests", href: "#side-quests" },
  { label: "Memories", href: "#photos" }
];

export const resumePath = "/resume";

export const hero = {
  greeting: "Hey!",
  name: "Anson Chan",
  chineseName: "陳雋希",
  phrases: ["A software engineer", "CPEN student @ UBC", "A C-drama enthusiast"],
  video: "/assets/chibi-wave-transparent.webm"
};

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/ansonnchan",
    icon: "/assets/about/github_icon.png"
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ansonnchan",
    icon: "/assets/about/linkedin.png"
  },
  {
    label: "Email",
    href: "mailto:ananryry180@gmail.com",
    icon: "/assets/about/mail_icon.png"
  }
];

export const about = {
  profileImage: "/assets/pfp.jpeg",
  darkProfileImage: "/assets/about/dark_me.JPG",
  paragraphs: [
    [{ text: "Hi there!" }],
    [
      { text: "I’m " },
      { text: "Anson", highlight: true },
      {
        text: ", and welcome to my portfolio. I’m a third-year "
      },
      { text: "Computer Engineering", highlight: true },
      { text: " student @ " },
      { text: "UBC", highlight: true },
      {
        text: ", expecting to graduate in "
       },
       { text:  "2029.", highlight: true }
    ],
    [
      {
        text: "I was born in "},
        { text: "Hong Kong", highlight: true },
        { text: " but lived in " },
        { text: "Australia", highlight: true },
        { text: " for 15 years. I moved to Canada " },
        { text: " in late 2021. I play basically every racket sport like tennis, badminton, table tennis and even pickleball." },

      
    ],
    [
      {
        text: "I’ve also been binging way too many C-dramas recently. Right now,"
      },
      { text: " I’m currently watching " },
      { text: "Pursuit of Jade", highlight: true },
      { text: " (逐玉) and " },
      { text: "When I Fly Towards You", highlight: true },
      { text: " (当我飞奔向你)." }
    ]
  
  /** 
  quote: {
    original: "十年树木，百年树人",
    translation:
      "It takes ten years to grow a tree, but a hundred years to cultivate a person.",
    attribution: "Guan Zhong 管仲"
  },
  */
],
  closing:
    "If you like what you see and want to chat, my socials are underneath my profile picture. I’m always down for a coffee chat or to connect anytime :) (i also lowk need someone to duo with me and carry me to Diamond in League)"
};

export const experiences: Experience[] = [
  {
    title: "Software Engineer Intern",
    organization: "ScalePad",
    dates: "June 2026 - Present",
    location: "Vancouver, BC",
    image: "/assets/experiences/scalepad_logo.jpeg",
    bullets: [
      [{ text: "incoming s26" }]
    ]
  },
  {
    title: "Software Engineer Intern",
    organization: "Borrow’d",
    dates: "Jan. 2026 - Apr. 2026",
    location: "Vancouver, BC",
    image: "/assets/experiences/borrowd_org_logo.jpeg",
    bullets: [
      [
        {
          text: "Delivered product features and performance improvements, improving internal tooling and resolving user-facing issues."
        }
      ],
      [
        { text: "Streamlined " },
        { text: "CI/CD", highlight: true },
        {
          text: " by integrating automated backend tests to support more reliable "
        },
        { text: "Kubernetes", highlight: true },
        { text: " deployments." }
      ],
      [
        {
          text: "Collaborated with product and design teams to ship practical features from bug reports and user feedback."
        }
      ],
      [{ text: "Touched grass and talked to people once." }]
    ]
  },
  {
    title: "Undergraduate Research Assistant",
    organization: "University of South Australia",
    dates: "Jun. 2025 - Aug. 2025",
    location: "Adelaide, Australia",
    image: "/assets/experiences/unisa-logo.svg",
    bullets: [
      [
        { text: "Worked on " },
        { text: "RAG", highlight: true },
        { text: " pipeline optimization for document retrieval under " },
        { text: "Dr. Terence Chan", highlight: true },
        { text: "." }
      ],
      [
        { text: "Architected " },
        { text: "LangGraph", highlight: true },
        {
          text: " pipelines to automate chunking, embedding, and reranking experiments."
        }
      ],
      [
        { text: "Built " },
        { text: "Python", highlight: true },
        {
          text: " benchmarking scripts to measure retrieval accuracy and pipeline performance across configurations."
        }
      ]
    ]
  }
];

export const archivedExperiences: ArchivedExperience[] = [
  {
    title: "GAP",
    location: "Richmond, BC",
    dates: "June 2022 - April 2025",
    image: "/assets/experiences/gap.png",
    bullets: ["Smile and wave, boys.", "Would you like a bag for 25¢?"]
  },
  {
    title: "Kumon",
    role: "Center Assistant",
    location: "Richmond, BC",
    dates: "May 2022 - August 2024",
    image: "/assets/experiences/kumon.png",
    bullets: [
      "Taught math, reading, and valuable life lessons.",
      "Carried on intergenerational trauma."
    ]
  },
  {
    title: "McDonald’s",
    role: "Crew Member",
    location: "Vancouver, BC",
    dates: "Jan. 2022 - Apr. 2022",
    image: "/assets/experiences/mcdonalds.png",
    bullets: [
      "Y’all, I really didn’t last long here, but I was literally putting the fries in the bag."
    ]
  }
];


export const projects: Project[] = [
  {
    title: "Personal Portfolio",
    description:
      "This website :) The third rendition of my portfolio, built to showcase everything you need to know about me.",
    image: "/assets/projects/portfolio_pic1.png",
    icon: "/assets/favicon.png",
    screenshots: [
      "/assets/projects/portfolio_pic1.png",
      "/assets/projects/portfolio_pic2.png"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/ansonnchan/portfolio",
    live: "https://www.ansonnchan.dev/",
    details: [
      "Everything you need to know about me."
    ]
  },
  {
    title: "Pear Programming",
    description:
      "A browser-based collaborative coding IDE with real-time editing, shared workspaces, and AI-assisted coding features.",
    image: "/assets/projects/pear-program-pic2.png",
    icon: "/assets/projects/pear-programming-favicon.png",
    screenshots: [
      "/assets/projects/pear-program-pic2.png",
      "/assets/projects/pear-program-pic3.png"
    ],
    techStack: [
      "Java",
      "TypeScript",
      "Spring Boot",
      "Redis",
      "Yjs",
      "Monaco Editor",
      "Groq"
    ],
    github: "https://github.com/ansonnchan/PearProgramming",
    live: "https://pear-programming.vercel.app/",
    details: [
      "Supports multi-user code editing, shared workspaces, live code execution, and context-aware AI assistance.",
      "Includes recovery mechanisms such as fallback syncing, room state persistence, stale-session cleanup, and cross-instance fanout."
    ]
  },
  {
    title: "vent.ai",
    description:
      "An AI-powered venting app where users can talk to five different AI personalities and crash out to their heart’s content.",
    image: "/assets/projects/vent.ai_pic1.png",
    icon: "/assets/projects/vent.ai_icon.png",
    screenshots: [
      "/assets/projects/vent.ai_pic1.png",
      "/assets/projects/vent.ai_pic2.png"
    ],
    techStack: ["TypeScript", "React", "Next.js", "Groq", "Upstash Redis"],
    github: "https://github.com/ansonnchan/vent.ai",
    live: "https://ventai-web.vercel.app/",
    details: [
      "Supports five AI personalities powered by Groq, ranging from ancient wisdom to straight-up tiger mom energy.",
      "Uses Upstash Redis rate limiting and progressive context compression to control usage while keeping conversations responsive."
    ]
  },
  {
    title: "The Wallfacer Project",
    description:
      "An AI-assisted hidden-state social deduction game inspired by Liu Cixin’s The Three-Body Problem. The player must figure out which alien civilizations are hostile by reading clues, transmissions, contradictions, and asking strategic questions.",
    image: "/assets/projects/wallfacer_pic1.png",
    icon: "/assets/projects/wallfacer_icon.png",
    screenshots: [
      "/assets/projects/wallfacer_pic1.png",
      "/assets/projects/wallfacer_pic2.png"
    ],
    techStack: ["Python", "React", "TypeScript", "PostgreSQL", "FastAPI", "Groq"],
    github: "https://github.com/ansonnchan/dark-forest",
    live: "https://wallfacer-project.vercel.app/",
    details: [
      "Built a backend simulation engine where the game state is hidden from the player.",
      "Used Groq to generate narrative dialogue while keeping important game logic controlled by the backend.",
      "Stored turns, actions, accusations, and outcomes so each run can be reviewed after the game."
    ]
  }
];

export const sideQuests = {
  intro:
    "Contrary to what people may believe, I do have hobbies and interests, I do talk to other people, and I do touch grass.",
  bullets: [
    "I’ve played violin and trumpet for 12 years and 10 years respectively. Although I haven’t played as much as I used to in high school, I’m hoping to join UBC’s symphony orchestra before I graduate.",
    "I also play tennis and badminton regularly. In high school, our tennis team made it all the way to provincials. We don’t talk about our results there though.",
    "I’m currently watching Pursuit of Jade and When I Fly Towards You.",
    "I'm hardstuck Emerald rank in League of Legends and my mains are ahri and shen (pls save me from ELO hell).",
    "I’m reading The Three-Body Problem (三体) by Liu Cixin (刘慈欣). If you like dystopian sci-fi mystery thrillers, I highly recommend the series or the Netflix adaptation (so excited for season 2)."
  ],
  shows: [
    {
      src: "/assets/sidequests/when_i_fly_towards_you.jpg",
      alt: "When I Fly Towards You poster",
      caption: "When I Fly Towards You - what I'm binging rn"
    },
  ]
};

export const photos = {
  title: "Memory Lane",
  intro:
    "I hope you enjoy these old photos of mine. I was doing some digging and spent a lot of time laughing, reminiscing, and feeling grateful for the old days. I found this quote online and loved the reminder: you only get one chance to live this life, so take a little time to look back at the moments that made you.",
  quote:
    "One day, you're 17 and you're planning for someday. And then quietly, without you ever really noticing, someday is today. And then someday is yesterday. And this is your life.",
  attribution: "Nathan Scott, One Tree Hill (9x13)",
  gallery: [
    { src: "/assets/photos/IMG_0192.JPG", caption: "y'all, i was really wearing alphabet pajamas" },
    { src: "/assets/photos/IMG_0668.JPG", caption: "get your eyes checked" },
    { src: "/assets/photos/IMG_0734.JPG", caption: "i promise i hold chopsticks better now" },
    { src: "/assets/photos/IMG_0916.JPG", caption: "pachinko" },
    { src: "/assets/photos/IMG_1953.JPG", caption: "universal studios - orlando, florida" },
    { src: "/assets/photos/IMG_2256.JPG", caption: "book title is \"unfortunate series of events\"" },
    { src: "/assets/photos/IMG_4235.JPG", caption: "peak" },
    { src: "/assets/photos/swollen.JPG", caption: "yo, why was my left ear hella swollen?" }
  ]
};
