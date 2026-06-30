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
  { label: "Side Quests", href: "#side-quests" }
];

export const resumePath = "/resume";

export const hero = {
  greeting: "Hey!",
  name: "Anson Chan",
  chineseName: "陳雋希",
  phrases: ["A software engineer", "CPEN student @ UBC", "Boba Tea Addict"],
  video: "/assets/chibi_dance.mp4"
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
  greeting: "Hey there!",
  paragraphs: [
    [
      { text: "I’m " },
      { text: "Anson", highlight: true },
      { text: ", and welcome to my personal website." }
    ],
    [
      { text: "I’m a third-year " },
      { text: "Computer Engineering", highlight: true },
      { text: " student @ " },
      { text: "UBC", highlight: true },
      { text: ", expecting to graduate in " },
      { text: "2029", highlight: true },
      { text: ". I’m currently a software engineer intern @ " },
      { text: "ScalePad", highlight: true },
      { text: "." }
    ],
    [
      { text: "I was born in " },
      { text: "Hong Kong", highlight: true },
      { text: " but lived in " },
      { text: "Australia", highlight: true },
      { text: " for 15 years. I moved to " },
      { text: "Canada", highlight: true },
      {
        text: " in late 2021. I play every racket sport, including tennis, badminton, table tennis, and even pickleball."
      },
    ],
    [
      {text: "Like every other SoCal Asian, I also like playing volleyball, drinking boba, and eating Korean BBQ. "},
      {
        text: "I've also been binging way too many C-dramas and K-dramas recently. Right now, I'm watching "
      },
      { text: "Night has Come ", highlight: true },
      { text: "and " },
      { text: "When I Fly Towards You", highlight: true },
      {text: "."}
    ]
  ],
  /** 
  quote: {
    original: "十年树木，百年树人",
    translation:
      "It takes ten years to grow a tree, but a hundred years to cultivate a person.",
    attribution: "Guan Zhong 管仲"
  },
  */
  closing:
    "If you like what you see and want to chat, I’m always down to connect :)", highlight: true
}; //maybe highlight doesn't work??

export const githubActivity = {
  username: "ansonnchan",
  profileUrl: "https://github.com/ansonnchan"
};

export const experiences: Experience[] = [
  {
    title: "Software Engineer Intern",
    organization: "ScalePad",
    dates: "June 2026 - Present",
    location: "Vancouver, BC",
    image: "/assets/experiences/scalepad_logo_black.png",
    bullets: [
      [{ text: "On the Lifecycle Manager Team 🌱" }]
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
        { text: "Integrated automated backend tests in the " },
        { text: "CI/CD", highlight: true },
        {
          text: " pipeline to support more reliable deployments. "
        },
      ],
      [
        {
          text: "Collaborated with product and design teams to ship practical features from bug reports and user feedback."
        }
      ], 
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
      /**[
        { text: "Architected " },
        { text: "LangGraph", highlight: true },
        {
          text: " pipelines to automate chunking, embedding, and reranking experiments."
        }
      ],**/
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
      "The third rendition of my portfolio",
    image: "/assets/projects/portfolio_pic1.png",
    icon: "/assets/projects/portfolio_icon.png",
    screenshots: [
      "/assets/projects/portfolio_pic1.png",
      "/assets/projects/portfolio_pic2.png"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GitHub GraphQL API"],
    github: "https://github.com/ansonnchan/portfolio",
    live: "https://www.ansonnchan.dev/",
    details: [
      "Added a server-side API route that calls GitHub’s GraphQL contributionCalendar API (showing you that I know how to code 😭😭).",
      "Please enjoy :)"
      //"Rendered the contribution data as a Jan-Dec activity heatmap with normalized weeks, month labels, hover titles, dark-mode styling, and future days greyed out."
    ]
  },
  {
    title: "Pear Programming",
    description:
      "A browser-based collaborative coding editor with real-time editing, shared workspaces, and AI-assisted coding features.",
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
  /**
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
  **/
];

export const sideQuests = {
  intro:
    "Contrary to what people may believe, I do have hobbies and interests, I do talk to other people, and I do touch grass.",
  bullets: [
    "I’ve played the violin and the trumpet for 12 years and 10 years respectively. Although I haven’t played as much as I used to in high school, I’m hoping to join UBC’s symphony orchestra before I graduate.",
    "I also play tennis and badminton regularly. One of my favorite flexes is that two of my high school friends in Australia went on to become professional tennis players, and I can say I beat them... before they got really good 😭😭",
    "I'm an avid lover of thrillers, mysteries, and sci-fi. Specifically the dystopian genre.",
    "I'm about 270 episodes deep into Detective Conan.",
    "My favorite anime is Your Lie in April, both from a musician's perspective and an emotional perspective. IT'S SO PEAK BUT SO SAD!!",
  ],
  shows: [
    {
      src: "/assets/photos/IMG_0668.JPG",
      alt: "Young Anson holding a violin before a performance",
      caption: "I promise I don't use stripes anymore"
    },
  ]
};
