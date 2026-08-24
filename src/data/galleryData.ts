import { GalleryItem } from '../types';

export const galleryData: GalleryItem[] = [
  {
    id: 'visual-01',
    title: 'Monolithic Structure & Dark brutalism',
    category: 'Visual Architecture',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    aspect: 'portrait',
    description: 'An exploration of concrete textures, dramatic negative space, and deep shadows shaping physical and digital interfaces.',
    cameraInfo: {
      lens: '35mm Prime f/1.4',
      iso: '100',
      shutter: '1/500s',
      aperture: 'f/2.8',
      sensor: 'Full Frame'
    }
  },
  {
    id: 'visual-02',
    title: 'Spectral Light Dispersion',
    category: 'Generative 3D',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    aspect: 'landscape',
    description: 'Raymarched glass refraction and chromatic caustics simulation rendered with custom GLSL fragment shaders.',
    cameraInfo: {
      lens: 'Procedural Raymarcher',
      iso: 'GLSL Uniforms',
      shutter: 'Real-time 60fps',
      aperture: 'Dispersion 1.45',
      sensor: 'GPU Compute'
    }
  },
  {
    id: 'visual-03',
    title: 'Hardware Circuitry & Embedded Core',
    category: 'Hardware Labs',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    aspect: 'square',
    description: 'Macro inspection of microcontroller surface mount pins, oscillator crystals, and bus traces in low-light laboratory setup.',
    cameraInfo: {
      lens: '90mm Macro f/2.8',
      iso: '400',
      shutter: '1/125s',
      aperture: 'f/5.6',
      sensor: 'Laboratory Rig'
    }
  },
  {
    id: 'visual-04',
    title: 'Cinematic Nocturne & Neon Horizon',
    category: 'Cinematography',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80',
    aspect: 'landscape',
    description: 'Urban midnight atmosphere capturing crimson neon reflections and ambient mist over metropolis architecture.',
    cameraInfo: {
      lens: '50mm Anamorphic 1.33x',
      iso: '800',
      shutter: '1/48s',
      aperture: 'T2.0',
      sensor: 'Super 35'
    }
  },
  {
    id: 'visual-05',
    title: 'Topological Density & Spatial Mesh',
    category: 'Generative 3D',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    aspect: 'portrait',
    description: 'Algorithmic point cloud topography simulating continuous elevation curves and acoustic pressure contours.',
    cameraInfo: {
      lens: 'Procedural Topo Engine',
      iso: 'Octree Grid',
      shutter: 'Spatial Index',
      aperture: 'f/1.8',
      sensor: 'Vector Compute'
    }
  },
  {
    id: 'visual-06',
    title: 'Editorial Typography & Spatial Minimal',
    category: 'Editorial',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    aspect: 'square',
    description: 'Study of asymmetric Swiss grids, massive kerning balances, and monochromatic editorial hierarchies.',
    cameraInfo: {
      lens: 'Digital Grid System',
      iso: 'Custom Fonts',
      shutter: 'Editorial Vector',
      aperture: '8pt Grid',
      sensor: 'Creative Lab'
    }
  }
];
