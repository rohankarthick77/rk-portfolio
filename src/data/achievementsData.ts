import { Achievement } from '../types';

export const achievementsData: Achievement[] = [
  {
    id: 'achieve-01',
    year: '2026',
    title: 'Winners — Industry Innovation Hackathon 2026',
    organization: 'Sathyabama Institute of Science and Technology',
    badge: 'Winners (Software Domain)',
    category: 'Hackathon',
    description: 'Awarded Certificate of Appreciation for outstanding performance and securing winning honors in the Industry Innovation Hackathon 2026 (held on 17th – 18th March 2026) hosted by Sathyabama Institute of Science and Technology (Accredited NAAC A++ / Category-1 University by UGC). Evaluated and awarded by industry jury & startup innovation council.',
    impactMetrics: 'Winners — Software Domain (March 2026)',
    tags: ['Sathyabama University', 'Winners', 'Industry Innovation Hackathon', 'Software Domain', 'Full-Stack Architecture', 'Live Jury Defense'],
    images: [
      {
        src: 'sathyabama-hackathon-certificate.png',
        caption: 'Official Certificate of Appreciation — Industry Innovation Hackathon 2026',
        type: 'certificate'
      },
      {
        src: 'sathyabama-hackathon-presentation.jpg',
        caption: 'Live Project Presentation & Jury Evaluation at Sathyabama University (Block-14, Chennai)',
        type: 'photo'
      }
    ],
    pdfUrl: 'sathyabama-hackathon-certificate.pdf'
  },
  {
    id: 'achieve-02',
    year: '2026',
    title: 'Python Essentials 1 — Cisco & Python Institute',
    organization: 'Cisco Networking Academy × OpenEDG Python Institute',
    badge: 'Verified Python Credential (PCEP Aligned)',
    category: 'Technical Milestone',
    description: 'Awarded the Statement of Achievement for Python Essentials 1 by Cisco Networking Academy in collaboration with OpenEDG Python Institute (Aug 2026). Validates proficiency in algorithmic problem solving, Python 3 Standard Library, software refactoring, and PCEP qualification readiness.',
    impactMetrics: 'Cisco & OpenEDG Certified (Aug 2026)',
    tags: ['Cisco Networking Academy', 'Python Institute', 'Python 3', 'PCEP', 'Algorithms', 'Software Engineering']
  },
  {
    id: 'achieve-03',
    year: '2026',
    title: 'Front-End Development Internship',
    organization: 'Cognifyz Technologies',
    badge: 'Front-End Intern (ID: CTI/A1/C276478)',
    category: 'Technical Milestone',
    description: 'Successfully served as a Front-End Development Intern at Cognifyz Technologies (Dec 2025 – Jan 2026). Recognized for exceptional UI coordination, passion for frontend architecture, and delivering high-quality responsive web solutions.',
    impactMetrics: 'Completed Internship (ISO 9001:2015 Verified)',
    tags: ['Cognifyz Technologies', 'Front-End Development', 'React.js', 'JavaScript', 'UI/UX Design', 'Agile']
  },
  {
    id: 'achieve-04',
    year: '2025',
    title: 'Introduction to Cybersecurity Credential',
    organization: 'Cisco Networking Academy',
    badge: 'Certified Security Specialist',
    category: 'Technical Milestone',
    description: 'Successfully achieved the Introduction to Cybersecurity certification from Cisco Networking Academy (Dec 2025), validating expertise in cybersecurity threat models, defensive networking architectures, data privacy protocols, and network vulnerability mitigation.',
    impactMetrics: 'Cisco Certified (Dec 2025)',
    tags: ['Cisco Networking Academy', 'Cybersecurity', 'Network Defense', 'Threat Analysis', 'Protocols']
  }
];
