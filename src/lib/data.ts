// ============================================================
// data.ts — Centralized, strongly-typed portfolio data layer
// ============================================================

export interface Project {
  id: string;
  slug: string; // used as URL anchor (#slug) and image dir (/projects/slug/)
  title: string;
  description: string;
  imageUrls: string[]; // e.g. ["/projects/nest-track/1.png", ".../2.png"]
  /**
   * Zero-based indices of imageUrls that are portrait/mobile screenshots.
   * Those slides render in a phone mockup frame; all others are full-bleed desktop.
   * If undefined, every image defaults to full-bleed.
   */
  mobileImageIndices?: number[];
  techStack: string[];
  githubLink?: string; // only GitHub / LinkedIn post links — no live deploys
  githubLinks?: { label: string; url: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  achievements: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string; // lucide icon name (string key)
  skills: string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // lucide icon name
}

// ─── Personal Info ────────────────────────────────────────────
export const personalInfo = {
  name: "Imadh Hussain",
  title: "Full Stack Software Engineer",
  email: "immylance@gmail.com",
  phone: "+94 742 5586 94",
  website: "imadh.com",
  bio: "Full-Stack Developer and Software Engineering student with hands-on experience building scalable web and mobile applications. Passionate about developing practical, user-focused solutions and continuously expanding technical expertise across modern software stacks. Demonstrated strong leadership, communication, and teamwork skills through roles as Club President, consistently taking initiative to drive technical projects and community events to successful outcomes.",
  stats: [
    { label: "3rd Year SE Student", icon: "GraduationCap" },
    { label: "VP at APIIT FCS", icon: "Users" },
  ],
};

// ─── Navigation ───────────────────────────────────────────────
export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// ─── Social Links ─────────────────────────────────────────────
export const socialLinks: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/TitanOfTime", icon: "Github" },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/imadh-hussain",
    icon: "Linkedin",
  },
  { platform: "Email", url: "mailto:immylance@gmail.com", icon: "Mail" },
  { platform: "Website", url: "https://imadh.com", icon: "Globe" },
];

// ─── Skills ───────────────────────────────────────────────────
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    icon: "Layout",
    skills: ["React", "Next.js", "Flutter", "Tailwind CSS", "JavaScript", "HTML5 / CSS3"],
  },
  {
    id: "backend",
    title: "Backend Development",
    icon: "Server",
    skills: ["Laravel", "PHP", "C# .NET", "REST APIs", "Laravel Sanctum", "Secure APIs"],
  },
  {
    id: "devops-cloud",
    title: "DevOps & Cloud",
    icon: "Cloud",
    skills: ["MySQL", "Firebase", "Firestore", "Vercel", "Git / GitHub", "AWS"],
  },
  {
    id: "architecture-leadership",
    title: "Architecture & Leadership",
    icon: "Cpu",
    skills: ["3-Tier Architecture", "OOP Principles", "MVC Pattern", "Agile Methods", "Club Leadership"],
  },
];

// ─── Experience ───────────────────────────────────────────────
export const experiences: Experience[] = [
  {
    id: "vp-fcs",
    role: "Vice President",
    company: "APIIT FullStack Computer Society",
    type: "Leadership",
    period: "Jan 2025 – Present",
    location: "Colombo, Sri Lanka",
    description: [
      "Lead the official tech club by organising high-impact events including hackathons, coding workshops, and CTF competitions.",
      "Drive strategic planning and industry partnerships (e.g., WSO2) to bridge the gap between theoretical computing and real-world tech.",
    ],
  },
  {
    id: "stem-tutor",
    role: "STEM Tutor",
    company: "Virtual Steps LK",
    type: "Teaching",
    period: "Jul 2024 – Jun 2026",
    location: "Remote",
    description: [
      "Provided personalised tutoring to 10+ students in mathematics and sciences, resulting in an average 40% test score improvement.",
      "Conducted interactive group classes utilising engaging digital tools to simplify complex STEM concepts.",
    ],
  },
];

// ─── Education ────────────────────────────────────────────────
export const education: Education[] = [
  {
    id: "staffordshire",
    degree: "Bachelor of Engineering in Software Engineering (2nd Year)",
    institution: "University of Staffordshire",
    period: "Oct 2024 – Present",
    location: "Colombo, Sri Lanka",
    achievements: [
      "1st Place Winner — APIIT Mini Hackathon",
      "Participant — APIIT Inter-University Hackathon",
    ],
  },
];

// ─── Projects ─────────────────────────────────────────────────
// imageUrls follow the convention: /projects/[slug]/1.png, 2.png, …
// Add screenshots to public/projects/[slug]/ before deploying.
// mobileImageIndices: zero-based indices of portrait/mobile screenshots.
//   Those slides render in a phone mockup frame; the rest are full-bleed.
export const projects: Project[] = [
  {
    id: "nest-track",
    slug: "nest-track",
    title: "Nest Track",
    description:
      "Cross-platform reverse logistics system featuring a Flutter mobile app with QR scanning and photo proof, synced to a real-time Next.js web dashboard.",
    imageUrls: [
      "/projects/nest-track/1.png",
      "/projects/nest-track/2.png",
      "/projects/nest-track/3.png",
      "/projects/nest-track/4.png",
      "/projects/nest-track/5.png",
      "/projects/nest-track/6.png",
    ],
    // 1.png & 2.png → Next.js web dashboard (landscape/desktop)
    // 3.png – 6.png → Flutter mobile app (portrait/mobile)
    mobileImageIndices: [2, 3, 4, 5],
    techStack: ["Next.js", "Flutter", "Firebase", "Agile"],
    githubLinks: [
      { label: "Mobile Repo", url: "https://github.com/TitanOfTime/NestTrack" },
      { label: "Web Repo", url: "https://github.com/TitanOfTime/NestTrack-web" },
    ],
  },
  {
    id: "campus-reserve-web",
    slug: "campus-reserve-web",
    title: "Campus Reserve (Web)",
    description:
      "Full-stack SaaS room booking platform featuring a reactive Livewire user dashboard and a secure REST API powered by Laravel Sanctum.",
    imageUrls: [
      "/projects/campus-reserve-web/1.png",
      "/projects/campus-reserve-web/2.png",
      "/projects/campus-reserve-web/3.png",
      "/projects/campus-reserve-web/4.png",
      "/projects/campus-reserve-web/5.png",
      "/projects/campus-reserve-web/6.png",
    ],
    // All screenshots are landscape/desktop (Laravel web app)
    techStack: ["Laravel 12", "Tailwind CSS", "MySQL", "REST API"],
    githubLink: "https://github.com/TitanOfTime/CampusReserve-V2",
  },
  {
    id: "campus-reserve-mobile",
    slug: "campus-reserve-mobile",
    title: "Campus Reserve (Mobile)",
    description:
      "Mobile booking app featuring local caching via SharedPreferences and native device sensor integration to support full offline functionality.",
    imageUrls: [
      "/projects/campus-reserve-mobile/1.png",
      "/projects/campus-reserve-mobile/2.png",
      "/projects/campus-reserve-mobile/3.png",
      "/projects/campus-reserve-mobile/4.png",
      "/projects/campus-reserve-mobile/5.png",
      "/projects/campus-reserve-mobile/6.png",
    ],
    // All screenshots are portrait/mobile (Flutter app)
    mobileImageIndices: [0, 1, 2, 3, 4, 5],
    techStack: ["Flutter", "Provider"],
    githubLink: "https://github.com/TitanOfTime/CampusReserve-MAD",
  },
  {
    id: "aegis",
    slug: "aegis",
    title: "Aegis",
    description:
      "Offline-first PWA emergency rapid response system designed with decoupled local storage for high availability during low connectivity.",
    imageUrls: [
      "/projects/aegis/1.png",
      "/projects/aegis/2.png",
      "/projects/aegis/3.png",
      "/projects/aegis/4.png",
    ],
    // 1.png - 3.png are landscape/desktop; 4.png is a portrait mobile PWA screenshot
    mobileImageIndices: [3],
    techStack: ["PHP", "MySQL", "JavaScript"],
    githubLink: "https://github.com/TitanOfTime/Aegis",
  },
  {
    id: "inventory-system",
    slug: "inventory-system",
    title: "Inventory Management System",
    description:
      "Desktop inventory system built using a 3-tier architecture to decouple UI, business logic, and database operations with parameterized queries.",
    imageUrls: [
      "/projects/inventory-system/1.png",
      "/projects/inventory-system/2.png",
      "/projects/inventory-system/3.png",
      "/projects/inventory-system/4.png",
      "/projects/inventory-system/5.png",
    ],
    // All screenshots are landscape/desktop (C# .NET app)
    techStack: ["C# .NET", "MySQL"],
    githubLink: "https://github.com/TitanOfTime/Inventory-Management-System",
  },
];
