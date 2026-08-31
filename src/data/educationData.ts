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
    id: 'cert-python',
    title: 'Python Essentials 1 — Statement of Achievement',
    issuer: 'Cisco Networking Academy × OpenEDG Python Institute',
    date: 'Aug 29, 2026',
    badge: 'Verified Python Credential (PCEP Aligned)',
    skills: [
      'Python 3 Syntax & Algorithmic Problem Solving',
      'Python Standard Library & Scripting',
      'Software Development Process & Refactoring',
      'PCEP Entry-Level Python Alignment',
      'Modular Code Design & Debugging'
    ],
    verified: true,
    image: 'cisco-python-certificate.png',
    pdfUrl: 'cisco-python-certificate.pdf',
    topics: [
      'Design, develop, debug, execute, and refactor computer programs in Python 3',
      'Think algorithmically to analyze problems and implement them as computer processes',
      'Use Python Standard Library modules to resolve typical implementation challenges',
      'Understand the programmer’s role across modern software engineering workflows'
    ]
  },
  {
    id: 'cert-cyber',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: 'Dec 2025',
    badge: 'Certified Security Specialist',
    skills: [
      'Network Security Protocols',
      'Threat Mitigation & Vulnerability Assessment',
      'Data Integrity & Authentication Standards',
      'Defensive Architecture & Cryptography'
    ],
    verified: true,
  }
];
