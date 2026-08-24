import { EducationItem, CertificationItem } from '../types';

export const educationData: EducationItem[] = [
  {
    id: 'edu-01',
    institution: 'Bannari Amman Institute of Technology',
    degree: 'Bachelor of Engineering — Computer Science and Design',
    location: 'Erode, Tamil Nadu',
    period: '2023 – 2027',
    highlights: [
      'Focusing on Full-Stack Software Engineering, Spatial Mapping, and Design Principles',
      '1st Place Winner — Industry Innovation Hackathon 2026 at Sathyabama University (Software Domain)',
      'Developing data-driven applications with JavaScript, React, Node.js, Express, SQLite, and Python'
    ]
  },
  {
    id: 'edu-02',
    institution: 'Vishwa Sishya Vidyodaya School',
    degree: 'Higher Secondary Certificate (HSC) & SSLC',
    location: 'Pollachi, Tamil Nadu',
    period: '2020 – 2023',
    highlights: [
      'Higher Secondary Certificate (HSC) Completed in 2023',
      'Secondary School Leaving Certificate (SSLC) Completed in 2021',
      'Strong academic foundation in Mathematics, Computer Science & Design'
    ]
  }
];

export const certificationsData: CertificationItem[] = [
  {
    id: 'cert-cyber',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: 'Dec 2025',
    badge: 'Industry Verified Certification',
    skills: [
      'Network Security Protocols',
      'Threat Mitigation & Vulnerability Assessment',
      'Data Integrity & Authentication Standards',
      'Defensive Architecture & Cryptography'
    ],
    verified: true,
  }
];
