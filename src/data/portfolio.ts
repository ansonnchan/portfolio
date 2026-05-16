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
  techStack: string[];
  github: string;
  live?: string;
  details: string[];
  defaultOpen?: boolean;
};

export const navLinks = [
  { label: "About Me", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Side Quests", href: "#side-quests" }
];

export const resumePath = "/assets/resume.pdf";

export const hero = {
  greeting: "Hey!",
  name: "Anson Chan",
  phrases: ["A software engineer", "A caffeine addict", "C-drama enthusiast"],
  lightImage: "/assets/hero-light-placeholder.svg",
  darkImage: "/assets/hero-dark-placeholder.svg"
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
  profileImage: "/assets/about/pfp.png",
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
        text: ", studying somewhere between the hell that is hardware and the heaven that is software, but you won’t catch me touching hardware with a ten-foot pole. I expect to graduate in 2029, but watch me take 10 years."
      }
    ],
    [
      {
        text: "I was born in Hong Kong, lived in Australia for 15 years, and moved to Canada in late 2021. Nothing could have prepared me for going from sunny Australian days to rainy Vancouver weather."
      }
    ],
    [
      {
        text: "I love playing basically every racket sport imaginable: tennis, badminton, table tennis, squash, and even pickleball."
      }
    ],
    [
      {
        text: "I’ve also been trying to learn Chinese, thank god I know Cantonese, hence my obsession with "
      },
      { text: "C-dramas", highlight: true },
      { text: ". I’m currently watching " },
      { text: "Pursuit of Jade", highlight: true },
      { text: " 《逐玉》 and " },
      { text: "When I Fly Towards You", highlight: true },
      { text: " 《当我飞奔向你》. Genuinely peak." }
    ]
  ],
  quote: {
    original: "十年树木，百年树人",
    translation:
      "It takes ten years to grow a tree, but a hundred years to cultivate a person.",
    attribution: "Guan Zhong 管仲"
  },
  closing:
    "If you like what you see and want to chat, my socials are underneath my profile picture. I’m always down for a coffee chat or to connect anytime :) I also need someone to duo with me and carry me to Diamond in League."
};

export const experiences: Experience[] = [
  {
    title: "Software Engineering Intern",
    organization: "Borrow’d",
    dates: "Jan 2026 - Apr 2026",
    location: "Vancouver, BC",
    image: "/assets/experiences/borrowd_org_logo.jpeg",
    defaultOpen: true,
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
    dates: "June 2025 - Aug. 2025",
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
      "This website :) Rendition 3 of my portfolio, built to showcase everything you need to know about me.",
    image: "/assets/projects/portfolio_pic1.png",
    icon: "/assets/projects/portfolio_pic1.png",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/ansonnchan/personal-portfolio",
    live: "https://www.ansonnchan.dev/",
    details: [
      "Built as a responsive portfolio with dark mode, playful interaction, and recruiter-friendly project storytelling."
    ]
  },
  {
    title: "Pear Programming",
    description:
      "A browser-based collaborative coding IDE with real-time editing, shared workspaces, live code execution, and AI-assisted coding features.",
    image: "/assets/projects/pear-program-pic2.png",
    icon: "/assets/projects/pear-programming-favicon.png",
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
    techStack: ["TypeScript", "React", "Next.js", "Groq SDK", "Upstash Redis"],
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
      "An AI-assisted hidden-state social deduction game inspired by Liu Cixin’s The Three-Body Problem 三体. The player acts as humanity’s Wallfacer and must figure out which alien civilizations are hostile by reading clues, transmissions, contradictions, and asking strategic questions.",
    image: "/assets/projects/wallfacer_pic1.png",
    icon: "/assets/projects/wallfacer_icon.png",
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
    "Contrary to what people may believe, I do touch grass and I do talk to other people.",
  bullets: [
    "I’ve played violin and trumpet for 12 years and 10 years respectively. Although I haven’t played as much as I used to in high school, I’m hoping to join UBC’s symphony orchestra before I graduate.",
    "I also play tennis and badminton regularly. In high school, our tennis team made it all the way to provincials. We don’t talk about our results there though.",
    "I’m currently watching Pursuit of Jade and When I Fly Towards You.",
    "I’m reading The Three-Body Problem 三体 by Liu Cixin 刘慈欣. If you like dystopian sci-fi mystery thrillers, I highly recommend the series or the Netflix adaptation."
  ],
  gallery: [
    { src: "/assets/sidequests/IMG_0192.JPG", alt: "Side quest moment 1" },
    { src: "/assets/sidequests/IMG_0668.JPG", alt: "Side quest moment 2" },
    { src: "/assets/sidequests/IMG_0734.JPG", alt: "Side quest moment 3" },
    { src: "/assets/sidequests/IMG_0916.JPG", alt: "Side quest moment 4" },
    { src: "/assets/sidequests/IMG_1953.JPG", alt: "Side quest moment 5" },
    { src: "/assets/sidequests/IMG_2256.JPG", alt: "Side quest moment 6" },
    { src: "/assets/sidequests/IMG_4235.JPG", alt: "Side quest moment 7" },
    { src: "/assets/sidequests/swollen.JPG", alt: "Side quest moment 8" }
  ]
};
