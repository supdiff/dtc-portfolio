type MediaItem = {
  type: 'image' | 'video';
  url: string;
};

export interface Project {
  title: string;
  description: string;
  media: MediaItem[];
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    title: 'theMERCURY.ai',
    description:
      "A showcase web application for 'theMERCURY.ai', an AI-powered video intelligence platform. It demonstrates advanced video analytics, threat detection, and workforce optimization capabilities. ",
    media: [
      {
        type: 'image',
        url: '/mercury4.png',
      },
    ],
    tags: [
      'Next.js 15',
      'TypeScript',
      'Tailwind CSS 4',
      'Framer Motion',
      'GSAP',
    ],
    demoUrl: 'https://themercury.vercel.app/',
    githubUrl: 'https://github.com/DTcode22/themercury',
  },
  {
    title: 'Laufer Driving School',
    description:
      'A modern, responsive website for a driving school featuring course information, online booking, and pricing information. Built with Astro for optimal performance and SEO optimization.',
    media: [
      {
        type: 'image',
        url: '/laufer2.png',
      },
    ],
    tags: ['Astro', 'JavaScript', 'GSAP', 'Framer Motion'],
    demoUrl: 'https://lauferkgdesign.netlify.app/',
    githubUrl: 'https://github.com/dtcode22/lauferkg',
  },
  {
    title: 'Pattern Editor',
    description:
      'An interactive visual pattern generator with parameter controls used for a costum android live wallpaper app. Features include video and json export, canvas resizing and zoom options.',
    media: [
      {
        type: 'image',
        url: '/editor.png',
      },
    ],
    tags: ['TypeScript', 'Next.js', 'Canvas', 'Math'],
    demoUrl: 'https://pattern-editor-zhrt.vercel.app/',
    githubUrl: 'https://github.com/dtcode22/pattern-editor',
  },
  {
    title: 'Dynamic Pattern Live Wallpaper',
    description:
      'An Android live wallpaper that generates mesmerizing dynamic patterns with customizable parameters and multiple operational modes.',
    media: [
      { type: 'image', url: '/dynamic-pattern.gif' },
      { type: 'image', url: '/dynamic-pattern-static.jpg' },
    ],
    tags: ['Android', 'Kotlin', 'Jetpack Compose', 'Live Wallpaper'],
    demoUrl: 'https://github.com/dtcode22/wpmod02',
    githubUrl: 'https://github.com/dtcode22/wpmod02',
  },
];
export interface OtherProject {
  title: string;
  description: string;
  tags?: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
}

export const otherProjects: OtherProject[] = [
  {
    title: 'Svelte Admin Dashboard',
    description:
      'Developed a comprehensive admin dashboard for an e-commerce client using Svelte and Firebase. The project involved creating a user-friendly interface for managing products, services, filter by category and file storage. Due to a non-disclosure agreement, I cannot share the source code or a live demo.',
    tags: ['Svelte', 'Firebase', 'Node.js', 'Tailwind CSS'],
    image: '/dashb.png',
  },
  {
    title: 'Webcam Filter',
    description:
      'Webcam filter with white dots filter includes record start/stop,  and download option runnable on desktop/mobile in browser.',
    image: '/webcam.png',
    demoUrl: 'https://webcamfilter.vercel.app/',
    githubUrl: 'https://github.com/DTcode22',
  },
];
