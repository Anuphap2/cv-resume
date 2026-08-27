export const defaultResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    photoUrl: '',
  },
  summary: '',
  experience: [
    {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    },
  ],
  education: [
    {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    },
  ],
  skills: [
    { id: crypto.randomUUID(), category: 'Technical', items: '' },
    { id: crypto.randomUUID(), category: 'Soft Skills', items: '' },
  ],
  certifications: [
    {
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      date: '',
      url: '',
    },
  ],
  languages: [
    { id: crypto.randomUUID(), language: '', proficiency: 'Native' },
  ],
  projects: [
    {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      technologies: '',
      url: '',
    },
  ],
};

export const defaultCVData = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    orcid: '',
    photoUrl: '',
  },
  profile: '',
  education: [
    {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      thesis: '',
      advisor: '',
      gpa: '',
    },
  ],
  experience: [
    {
      id: crypto.randomUUID(),
      organization: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    },
  ],
  publications: [
    {
      id: crypto.randomUUID(),
      title: '',
      authors: '',
      journal: '',
      year: '',
      doi: '',
    },
  ],
  research: [
    {
      id: crypto.randomUUID(),
      title: '',
      role: '',
      institution: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ],
  certifications: [
    {
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      date: '',
    },
  ],
  languages: [
    { id: crypto.randomUUID(), language: '', proficiency: 'Native' },
  ],
  teaching: [
    {
      id: crypto.randomUUID(),
      course: '',
      institution: '',
      role: '',
      period: '',
    },
  ],
  awards: [
    {
      id: crypto.randomUUID(),
      title: '',
      organization: '',
      year: '',
      description: '',
    },
  ],
};

export const PROFICIENCY_LEVELS = [
  'Native',
  'Fluent',
  'Advanced',
  'Intermediate',
  'Basic',
];

export const ACCENT_COLORS = [
  { name: 'Navy', value: '#1e3a5f', light: '#e8eef5' },
  { name: 'Teal', value: '#0d9488', light: '#e6f7f5' },
  { name: 'Indigo', value: '#4f46e5', light: '#eef2ff' },
  { name: 'Rose', value: '#e11d48', light: '#fff1f2' },
  { name: 'Amber', value: '#d97706', light: '#fffbeb' },
  { name: 'Emerald', value: '#059669', light: '#ecfdf5' },
];

export const RESUME_TEMPLATES = [
  { id: 'classic', name: 'Classic', description: 'Clean & professional' },
  { id: 'modern', name: 'Modern', description: 'Bold & contemporary' },
];

export const CV_TEMPLATES = [
  { id: 'academic', name: 'Academic', description: 'Traditional scholarly format' },
  { id: 'professional', name: 'Professional', description: 'Polished & structured' },
];

export const SAMPLE_RESUME_DATA = {
  personalInfo: {
    fullName: 'John Smith',
    jobTitle: 'Senior Software Engineer',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johnsmith',
    website: 'johnsmith.dev',
    photoUrl: '',
  },
  summary:
    'Passionate software engineer with 8+ years of experience building scalable web applications. Expert in React, Node.js, and cloud technologies. Led teams of 5-10 engineers, delivering products used by millions.',
  experience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      startDate: '2021-01',
      endDate: '',
      current: true,
      description:
        '• Led development of a real-time analytics dashboard serving 2M+ users\n• Reduced page load time by 40% through code splitting and lazy loading\n• Mentored 5 junior developers and conducted code reviews',
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: '2018-03',
      endDate: '2020-12',
      current: false,
      description:
        '• Built and deployed microservices architecture handling 10K+ requests/sec\n• Implemented CI/CD pipeline reducing deployment time by 60%',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2013',
      endDate: '2017',
      gpa: '3.8',
    },
  ],
  skills: [
    { id: '1', category: 'Technical', items: 'React, TypeScript, Node.js, Python, AWS, Docker, PostgreSQL, GraphQL' },
    { id: '2', category: 'Soft Skills', items: 'Team Leadership, Agile/Scrum, Communication, Problem Solving' },
  ],
  certifications: [
    { id: '1', name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2023', url: '' },
  ],
  languages: [
    { id: '1', language: 'English', proficiency: 'Native' },
    { id: '2', language: 'Spanish', proficiency: 'Intermediate' },
  ],
  projects: [
    {
      id: '1',
      name: 'Open Source Dashboard',
      description: 'A customizable analytics dashboard with 2K+ GitHub stars',
      technologies: 'React, D3.js, Node.js',
      url: 'github.com/johnsmith/dashboard',
    },
  ],
};

export const PORTFOLIO_TEMPLATES = [
  { id: 'glassmorphism', name: 'Creative Glass', description: 'Interactive frosted glass cards with gradient glows' },
  { id: 'cyberpunk', name: 'Cyber Neon', description: 'Futuristic dark mode with neon glow accents' },
  { id: 'minimalist', name: 'Minimal Retro', description: 'Sleek black & white with bold typography' },
];

export const defaultPortfolioData = {
  personalInfo: {
    fullName: '',
    tagline: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
    website: '',
    photoUrl: '',
  },
  skills: [
    { id: crypto.randomUUID(), category: 'Frontend', items: 'React, HTML, CSS, Tailwind' },
    { id: crypto.randomUUID(), category: 'Backend', items: 'Node.js, Express, databases' },
  ],
  projects: [
    {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      technologies: '',
      url: '',
    },
  ],
  experience: [
    {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    },
  ],
};

export const SAMPLE_PORTFOLIO_DATA = {
  personalInfo: {
    fullName: 'Alex River',
    tagline: 'Creative Full Stack Developer & UI/UX Specialist',
    bio: 'I build high-performance, visually stunning web applications that combine top-tier software engineering with state-of-the-art interactive designs.',
    email: 'alex.river@design.dev',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    github: 'github.com/alexriver',
    linkedin: 'linkedin.com/in/alexriver',
    website: 'alexriver.dev',
  },
  skills: [
    { id: 's1', category: 'Frontend & UI', items: 'React, Next.js, Three.js, TailwindCSS, CSS Glassmorphism, Framer Motion' },
    { id: 's2', category: 'Backend & Cloud', items: 'Node.js, Go, PostgreSQL, AWS, Docker, GraphQL' },
    { id: 's3', category: 'Design Tools', items: 'Figma, Adobe Creative Suite, Blender 3D modeling' },
  ],
  projects: [
    {
      id: 'p1',
      name: 'Interactive 3D Universe',
      description: 'An immersive in-browser astronomical simulation using WebGL. Renders 100k+ stars in real-time.',
      technologies: 'Three.js, GLSL, React, Vite',
      url: 'universe.alexriver.dev',
    },
    {
      id: 'p2',
      name: 'Glassmorphic Dashboard',
      description: 'A premium analytics platform with frosted glass cards, dynamic light/dark ambient glows, and interactive graphs.',
      technologies: 'React, D3.js, TailwindCSS, HSL-Colors',
      url: 'glassy-charts.dev',
    },
  ],
  experience: [
    {
      id: 'e1',
      company: 'Creative Labs Co.',
      position: 'Lead Web Architect',
      startDate: '2022',
      endDate: '',
      current: true,
      description: 'Spearheaded development of high-fidelity client landing pages and WebGL experiences, increasing visitor retention by 35%. Implemented a shared component design system.',
    },
    {
      id: 'e2',
      company: 'FutureTech Corp',
      position: 'Frontend Developer',
      startDate: '2020',
      endDate: '2022',
      current: false,
      description: 'Designed and built accessible user dashboards. Collaborated closely with design team to construct interactive micro-interactions and animations.',
    },
  ],
};
