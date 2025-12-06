// Initial mock data for job listings
export const initialJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salaryRange: '$120,000 - $160,000',
    description: 'We are seeking an experienced Frontend Developer to join our growing team. You will be responsible for building and maintaining high-quality web applications using modern frameworks.',
    qualifications: ['5+ years of React experience', 'Strong TypeScript skills', 'Experience with state management', 'Excellent problem-solving abilities'],
    responsibilities: ['Develop new user-facing features', 'Build reusable code and libraries', 'Ensure technical feasibility of UI/UX designs', 'Optimize applications for maximum speed'],
    employerId: 'emp1',
    postedDate: '2025-01-15',
    status: 'active'
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Creative Studios Inc',
    location: 'Remote',
    type: 'Full-time',
    salaryRange: '$90,000 - $130,000',
    description: 'Join our design team to create beautiful and functional user experiences. We value creativity, attention to detail, and user-centered design thinking.',
    qualifications: ['3+ years of product design experience', 'Proficiency in Figma and design tools', 'Strong portfolio showcasing UX/UI work', 'Understanding of design systems'],
    responsibilities: ['Design intuitive user interfaces', 'Create wireframes and prototypes', 'Collaborate with engineering teams', 'Conduct user research and testing'],
    employerId: 'emp2',
    postedDate: '2025-01-18',
    status: 'active'
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'CloudScale Systems',
    location: 'Austin, TX',
    type: 'Full-time',
    salaryRange: '$110,000 - $150,000',
    description: 'Looking for a DevOps Engineer to help us scale our infrastructure and improve deployment processes. You will work with cutting-edge cloud technologies.',
    qualifications: ['Experience with AWS/Azure/GCP', 'Strong knowledge of Docker and Kubernetes', 'CI/CD pipeline expertise', 'Scripting skills (Python, Bash)'],
    responsibilities: ['Maintain and improve infrastructure', 'Automate deployment processes', 'Monitor system performance', 'Implement security best practices'],
    employerId: 'emp1',
    postedDate: '2025-01-20',
    status: 'active'
  },
  {
    id: '4',
    title: 'Marketing Manager',
    company: 'Growth Ventures',
    location: 'New York, NY',
    type: 'Full-time',
    salaryRange: '$80,000 - $110,000',
    description: 'We need a creative Marketing Manager to lead our marketing initiatives and drive brand growth. Perfect for someone passionate about digital marketing.',
    qualifications: ['5+ years in digital marketing', 'Experience with SEO/SEM', 'Strong analytical skills', 'Leadership experience'],
    responsibilities: ['Develop marketing strategies', 'Manage marketing campaigns', 'Analyze market trends', 'Lead marketing team'],
    employerId: 'emp2',
    postedDate: '2025-01-22',
    status: 'active'
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'AI Innovations Lab',
    location: 'Boston, MA',
    type: 'Full-time',
    salaryRange: '$130,000 - $170,000',
    description: 'Join our data science team to work on cutting-edge machine learning projects. You will analyze complex datasets and build predictive models.',
    qualifications: ['PhD or Masters in related field', 'Strong Python and R skills', 'Experience with ML frameworks', 'Statistical analysis expertise'],
    responsibilities: ['Build predictive models', 'Analyze large datasets', 'Collaborate with product teams', 'Present findings to stakeholders'],
    employerId: 'emp1',
    postedDate: '2025-01-10',
    status: 'active'
  },
  {
    id: '6',
    title: 'Full Stack Developer',
    company: 'StartupHub',
    location: 'Remote',
    type: 'Contract',
    salaryRange: '$100,000 - $140,000',
    description: 'Fast-growing startup seeking a versatile Full Stack Developer. You will work across the entire stack and have significant impact on product development.',
    qualifications: ['Experience with Node.js and React', 'Database design skills', 'RESTful API development', 'Agile methodology experience'],
    responsibilities: ['Develop frontend and backend features', 'Design database schemas', 'Write clean, maintainable code', 'Participate in code reviews'],
    employerId: 'emp2',
    postedDate: '2025-01-25',
    status: 'active'
  }
];

// Initialize localStorage with mock data if empty
export const initializeMockData = () => {
  if (!localStorage.getItem('jobs')) {
    localStorage.setItem('jobs', JSON.stringify(initialJobs));
  }
  
  if (!localStorage.getItem('applications')) {
    localStorage.setItem('applications', JSON.stringify([]));
  }
};