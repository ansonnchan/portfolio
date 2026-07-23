export type RichSegment = {
  text: string;
  highlight?: boolean;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ImageGallery = {
  title?: string;
  images: GalleryImage[];
};

export type Experience = {
  title: string;
  organization: string;
  dates: string;
  location: string;
  image: string;
  eyebrow?: string;
  bullets: RichSegment[][];
  gallery?: ImageGallery;
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
  gallery: ImageGallery;
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
  { label: "Goodbyes", href: "#goodbyes" }
];

export const hero = {
  greeting: "Hello, World!",
  title: "Welcome to Anson’s corner of the internet",
  phrases: [
    "Software Engineer",
    "Computer Engineering Student @ UBC",
    "Boba Addict",
  ],
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
  },
  {
    label: "Resume",
    href: "/resume",
    icon: "/assets/about/document.png"
  }
];

export const about = {
  profileImage: "/assets/pfp-square.jpeg",
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
        text: " in late 2021. I play every racket sport, including tennis, badminton, and table tennis. "
      },

      {text: "Like any other SoCal Asian, I also like playing volleyball, drinking boba, and watching C-dramas. "},
      {
        text: "Right now, I'm watching \"When I Fly Towards You\" and it's really good. ",
      },
    ],[
      {text: "In the future, I also want to study abroad. I have a few ideas in mind: Germany, Korea, China, Australia and the UK. If you have any suggestions, please let me know!" },
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
  profileUrl: "https://github.com/ansonnchan",
  year: 2026
};

export const experiences: Experience[] = [
  {
    title: "Software Engineer Intern",
    organization: "ScalePad",
    dates: "June 2026 - Present",
    location: "Vancouver, BC",
    image: "/assets/experiences/scalepad_logo_black.png",
    bullets: [
      [{ text: "Currently on the Lifecycle Manager Team 🌱" }]
    ],
    gallery: {
      images: [
        {
          src: "/assets/experiences/scalepad_volunteer.jpg",
          alt: "The ScalePad team together during a company Serve Day",
          caption: "ScalePad Serve Day with the team."
        }
      ]
    }
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
          text: "Delivered product features and performance improvements, improving internal tooling and resolving user-facing issues for beta release."
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
        { text: "computational modeling", highlight: true },
        { text: " under the guidance of" },
        { text: " Dr. Terence Chan", highlight: true },
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
        { text: "Did some " },
        { text: "Python", highlight: true },
        { text: " and " },
        { text: "MATLAB", highlight: true },
        {
          text: " work, including an implementation of"},
          {text: " Conway's Game of Life", highlight: true},
          {text: "."}
        
      ]
    ]
  }
];

/** 
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
**/

export const projects: Project[] = [
  {
    title: "Personal Portfolio",
    description:
      "You're on it now silly 🤦. I've done a lot of revamping since the first version. I hope you enjoy the design and features.",
    image: "/assets/projects/portfolio_pic1.png",
    icon: "/assets/stickers/kaori-surprised.png",
    gallery: {
      images: [
        {
          src: "/assets/projects/portfolio_pic1.png",
          alt: "Personal portfolio home page"
        },
        {
          src: "/assets/projects/portfolio_pic2.png",
          alt: "Personal portfolio projects section"
        }
      ]
    },
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GitHub GraphQL API"],
    github: "https://github.com/ansonnchan/portfolio",
    live: "https://www.ansonnchan.dev/",
    details: [
      "Added a server-side API route that calls GitHub’s GraphQL contributionCalendar API.",
      //"Please enjoy :)"
      //"Rendered the contribution data as a Jan-Dec activity heatmap with normalized weeks, month labels, hover titles, dark-mode styling, and future days greyed out."
    ]
  },
  {
    title: "Pear Programming",
    description:
      "A collaborative coding editor with real-time editing, shared workspaces, and AI-assisted coding features.",
    image: "/assets/projects/pear-program-pic2.png",
    icon: "/assets/projects/pear-programming-favicon.png",
    gallery: {
      images: [
        {
          src: "/assets/projects/pear-program-pic3.png",
          alt: "Pear Programming collaborative code editor"
        },
        {
          src: "/assets/projects/pear-program-pic2.png",
          alt: "Pear Programming shared workspace"
        }
      ]
    },
    techStack: [
      "Java",
      "TypeScript",
      "Spring Boot",
      "Redis",
      "Yjs",
      "Monaco Editor",
      "Groq",
      "Judge0"
    ],
    github: "https://github.com/ansonnchan/PearProgramming",
    live: "https://pear-programming.vercel.app/",
    details: [
      "Supports multi-user code editing, shared workspaces, live code execution, and context-aware AI assistance.",
      "Includes recovery mechanisms such as fallback syncing, room state persistence, stale-session cleanup, and cross-instance fanout."
    ]
  },
  {
    title: "hear me out",
    description:
      "An AI-powered venting app where users can talk to five different AI personalities and crash out to their heart’s content.",
    image: "/assets/projects/vent.ai_pic1.png",
    icon: "/assets/projects/vent.ai_icon.png",
    gallery: {
      images: [
        {
          src: "/assets/projects/vent.ai_pic1.png",
          alt: "Hear Me Out AI personality selection screen"
        },
        {
          src: "/assets/projects/vent.ai_pic2.png",
          alt: "Hear Me Out AI conversation screen"
        }
      ]
    },
    techStack: ["TypeScript", "React", "Next.js", "Groq", "Redis"],
    github: "https://github.com/ansonnchan/hear-me-out",
    live: "https://hear-me-out-web.vercel.app/",
    details: [
      "Supports five AI personalities powered by Groq, ranging from ancient wisdom to straight-up tiger mom energy.",
      "Zero persistent storage of user data, with all conversations stored in memory and cleared after the session ends.",
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
    gallery: {
      images: [
        {
          src: "/assets/projects/wallfacer_pic1.png",
          alt: "The Wallfacer Project game screen"
        },
        {
          src: "/assets/projects/wallfacer_pic2.png",
          alt: "The Wallfacer Project review screen"
        }
      ]
    },
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
  bullets: [
    "I’ve played the violin and the trumpet for 12 years and 10 years respectively. I’m hoping to join UBC’s symphony orchestra before I graduate.",
    "I like to play tennis and badminton regularly. Fun fact: two of my high school friends in Australia have played in professional events.",
    "I'm an avid lover of thrillers, mysteries, and sci-fi.",
    "My favorite anime is Your Lie in April, both from an emotional and musical perspective.",
  ],
  shows: [
    {
      src: "/assets/sidequests/anson_violin.JPG",
      alt: "Young Anson holding a violin before a performance",
      caption: "peak camera quality"
    },
  ]
};
