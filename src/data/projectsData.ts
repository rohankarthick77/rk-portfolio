import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'acoustic-pulse',
    slug: 'acoustic-pulse',
    title: 'AcousticPulse',
    subtitle: 'Urban Noise Pollution – Spatial Mapping and Acoustic Analytics',
    tagline: 'Real-time interactive geospatial noise monitoring with Leaflet & WHO compliance auditing.',
    category: 'Spatial Analytics & Full-Stack',
    year: '2026',
    timeline: 'Jun 2026 – Present',
    role: 'Lead Full-Stack Developer & Systems Architect',
    description: 'A full-stack urban acoustic intelligence dashboard engineered to monitor, map, and visualize urban noise pollution. Integrates interactive Leaflet geospatial mapping with color-coded decibel markers, Chart.js temporal sound classification, WHO-based environmental limit auditing, and citizen noise report submissions powered by a Node.js/Express backend with Prisma ORM and SQLite.',
    problemStatement: 'Urban noise pollution is a critical public health hazard that frequently goes unmonitored at street-level resolution. Municipal authorities and citizens lack centralized geospatial tools to track decibel violations and audit compliance against World Health Organization (WHO) standards.',
    architecturalSolution: 'Constructed an end-to-end spatial mapping web platform utilizing React, Leaflet, and Chart.js coupled with an Express/Node.js API and Prisma ORM on SQLite. Enabled authenticated community incident submissions, automatic WHO threshold alerts, and dynamic decibel color-coding.',
    keyFeatures: [
      'Interactive Mapbox/Leaflet spatial canvas featuring dynamic, color-coded location markers based on real-time decibel (dB) levels',
      'Data visualization suite with Chart.js for noise trends, acoustic classifications, and peak intervals',
      'Automated WHO environmental noise threshold auditing and classification into Safe (<55dB), Moderate (55-70dB), and Critical (>70dB) zones',
      'Secured Node.js/Express.js backend with Prisma ORM, SQLite, JWT auth & bcryptjs',
      'Citizen noise report submission portal allowing authenticated users to log pollution incidents with coordinates and timestamps'
    ],
    technologies: [
      'React.js',
      'Vite',
      'Node.js',
      'Express.js',
      'SQLite',
      'Prisma ORM',
      'Leaflet',
      'React-Leaflet',
      'Chart.js',
      'React-Chartjs-2',
      'JWT',
      'bcryptjs',
      'Lucide React',
      'Tailwind CSS'
    ],
    metrics: [
      { label: 'Map Engine', value: 'Leaflet 60 FPS' },
      { label: 'Security Auth', value: 'JWT + bcryptjs' },
      { label: 'Database / ORM', value: 'Prisma + SQLite' },
      { label: 'Standard Auditing', value: 'WHO Compliant' }
    ],
    accentColor: '#ff1e42',
    // High-impact acoustic decibel sound wave & frequency spectrum visualization
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1400&q=80',
    mockupType: 'map',
    githubUrl: 'https://github.com/rohankarthick',
    liveUrl: 'https://github.com/rohankarthick',
    featured: true,
  },
  {
    id: 'speed-analyzer',
    slug: 'speed-analyzer',
    title: 'Internet Speed Analyzer',
    subtitle: 'Python-Based Precision Network Telemetry & Diagnostics Platform',
    tagline: 'High-precision socket throughput diagnostics, upload/download measurement, and historical telemetry logging.',
    category: 'Network Engineering & Python',
    year: '2025',
    timeline: 'Dec 2025',
    role: 'Python Developer & Network Analyst',
    description: 'A modular Python-based network diagnostic platform engineered to measure download throughput, upload throughput, round-trip time (RTT), and latency variance with microsecond precision. Features persistent historical data logging, result verification checksums, and graphical performance summaries.',
    problemStatement: 'Web-based speed tests frequently deliver distorted burst averages without recording consistent socket streaming behavior or long-term historical degradation across ISP peering routes.',
    architecturalSolution: 'Engineered a multi-threaded Python benchmarking client utilizing raw socket streams and standard HTTP payload chunking, paired with SQLite historical logging and automated statistical summaries.',
    keyFeatures: [
      'Multi-stream Python socket benchmarking for precision download and upload throughput calculation',
      'Microsecond latency and ping jitter tracking under active network load',
      'Secure SQLite historical data storage and result verification pipeline for reliable trend analysis',
      'Automated summary generation with statistical deviation metrics and historical ISP benchmarking'
    ],
    technologies: [
      'Python',
      'Network Sockets',
      'Data Storage',
      'Performance Telemetry',
      'Chart.js / Data Viz',
      'Linux Networking'
    ],
    metrics: [
      { label: 'Timing Precision', value: 'Microsecond' },
      { label: 'Test Diagnostics', value: 'Down/Up/Ping' },
      { label: 'Data Persistence', value: 'Historical Log' },
      { label: 'Verification', value: '100% Reliable' }
    ],
    accentColor: '#00f0ff',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80',
    mockupType: 'telemetry',
    githubUrl: 'https://github.com/rohankarthick',
    liveUrl: 'https://github.com/rohankarthick',
    featured: true,
  },
  {
    id: 'smart-study-planner',
    slug: 'smart-study-planner',
    title: 'Smart Study Planner',
    subtitle: 'Cognitive Scheduling & Academic Trajectory Engineering',
    tagline: 'Algorithmic study scheduling optimized for spaced repetition and exam mastery.',
    category: 'Productivity Architecture & React',
    year: '2024',
    timeline: '2024',
    role: 'Product Architect & Frontend Engineer',
    description: 'An academic management system that dynamically adjusts study regimens based on cognitive fatigue curves, syllabus complexity weighting, and Leitner spaced-repetition algorithms with Prisma and SQLite persistence.',
    problemStatement: 'Students face cognitive overload when calendars fail to adapt dynamically to missed topics or varying chapter complexities.',
    architecturalSolution: 'Constructed an interactive React + Tailwind scheduler with graph-based topic dependencies and local SQLite persistence.',
    keyFeatures: [
      'Adaptive Spaced Repetition Scheduling Engine',
      'Cognitive Energy Level & Difficulty Balancing',
      'Interactive Gantt & Kanban Timeline Synchronization',
      'Prisma ORM & SQLite Offline Data Storage'
    ],
    technologies: ['React.js', 'JavaScript', 'Prisma', 'SQLite', 'Tailwind CSS', 'Framer Motion', 'Node.js'],
    metrics: [
      { label: 'Retention Boost', value: '+42%' },
      { label: 'Schedule Adaptability', value: 'Real-time' },
      { label: 'Offline Sync', value: 'Zero-latency' },
      { label: 'User Flow Rating', value: '4.9 / 5.0' }
    ],
    accentColor: '#ff007f',
    // Academic desk, focused study planning and cognitive learning workspace
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1400&q=80',
    mockupType: 'calendar',
    githubUrl: 'https://github.com/rohankarthick',
    liveUrl: 'https://github.com/rohankarthick',
    featured: true,
  }
];
