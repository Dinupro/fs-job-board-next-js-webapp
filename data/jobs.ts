export interface Job {
  id: string;
  title: string;
  company: string;
  type: "Full-time" | "Part-time" | "Internship" | "Contract";
  location: string;
  salary: string;
  postedAt: string;
  skills: string[];
  term: string;
  description: string;
}

export const jobs: Job[] = [
  {
    id: "frontend-engineering-intern-technova-101",
    title: "Frontend Engineering Intern",
    company: "TechNova",
    type: "Internship",
    location: "Remote",
    salary: "$40-50/hr",
    postedAt: "2024-04-28",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    term: "Summer 2024",
    description: "Join our core product team to build responsive and accessible user interfaces. You will work closely with our design team to implement new features using modern web technologies."
  },
  {
    id: "junior-full-stack-developer-dataflow-102",
    title: "Junior Full Stack Developer",
    company: "DataFlow",
    type: "Full-time",
    location: "New York, NY",
    salary: "$90k-110k",
    postedAt: "2024-04-27",
    skills: ["Node.js", "React", "PostgreSQL"],
    term: "Immediate",
    description: "We are looking for a highly motivated junior developer to help scale our data pipelines and build interactive dashboards for our enterprise clients."
  },
  {
    id: "react-developer-student-program-innovate-ai-103",
    title: "React Developer (Student Program)",
    company: "Innovate AI",
    type: "Part-time",
    location: "San Francisco, CA",
    salary: "$35/hr",
    postedAt: "2024-04-26",
    skills: ["React", "JavaScript", "Redux"],
    term: "Fall 2024",
    description: "Work alongside senior AI researchers to build web interfaces for our cutting-edge machine learning models. This is a perfect role for students looking to gain part-time experience during the semester."
  },
  {
    id: "backend-engineer-entry-level-cloudsync-104",
    title: "Backend Engineer - Entry Level",
    company: "CloudSync",
    type: "Full-time",
    location: "Seattle, WA",
    salary: "$105k-125k",
    postedAt: "2024-04-25",
    skills: ["Go", "Docker", "Kubernetes"],
    term: "Immediate",
    description: "As an entry-level backend engineer, you will help design, build, and maintain our distributed microservices architecture powering millions of sync operations daily."
  },
  {
    id: "data-science-intern-metrics-analytics-105",
    title: "Data Science Intern",
    company: "Metrics Analytics",
    type: "Internship",
    location: "Remote",
    salary: "$45/hr",
    postedAt: "2024-04-24",
    skills: ["Python", "SQL", "Pandas", "Scikit-learn"],
    term: "Summer 2024",
    description: "Dive deep into our massive datasets to uncover trends and build predictive models. You'll gain hands-on experience with big data technologies."
  },
  {
    id: "software-engineer-i-fintech-solutions-106",
    title: "Software Engineer I",
    company: "FinTech Solutions",
    type: "Full-time",
    location: "Chicago, IL",
    salary: "$95k-115k",
    postedAt: "2024-04-23",
    skills: ["Java", "Spring Boot", "AWS"],
    term: "Immediate",
    description: "Build secure, high-performance financial systems. You will be responsible for developing backend services that handle millions of transactions securely."
  },
  {
    id: "mobile-app-developer-intern-appstudio-107",
    title: "Mobile App Developer Intern",
    company: "AppStudio",
    type: "Internship",
    location: "Austin, TX",
    salary: "$38/hr",
    postedAt: "2024-04-22",
    skills: ["Swift", "iOS", "React Native"],
    term: "Fall 2024",
    description: "Help build the next generation of our award-winning mobile application. You will work on both new feature development and performance optimizations."
  },
  {
    id: "junior-ui-ux-engineer-designco-108",
    title: "Junior UI/UX Engineer",
    company: "DesignCo",
    type: "Full-time",
    location: "Remote",
    salary: "$85k-100k",
    postedAt: "2024-04-21",
    skills: ["Figma", "HTML", "CSS", "Vue.js"],
    term: "Immediate",
    description: "Bridge the gap between design and engineering. You will translate beautiful Figma designs into pixel-perfect, responsive web applications."
  },
  {
    id: "machine-learning-intern-ai-start-109",
    title: "Machine Learning Intern",
    company: "AI Start",
    type: "Internship",
    location: "Boston, MA",
    salary: "$50/hr",
    postedAt: "2024-04-20",
    skills: ["Python", "TensorFlow", "PyTorch"],
    term: "Summer 2024",
    description: "Assist in developing and training deep learning models for computer vision tasks. Great opportunity to work closely with experienced ML engineers."
  },
  {
    id: "cybersecurity-analyst-trainee-securenet-110",
    title: "Cybersecurity Analyst Trainee",
    company: "SecureNet",
    type: "Full-time",
    location: "Washington, DC",
    salary: "$80k-95k",
    postedAt: "2024-04-19",
    skills: ["Network Security", "Python", "Linux"],
    term: "Immediate",
    description: "Learn from the best in the industry. You will be monitoring network traffic, investigating security incidents, and helping secure enterprise infrastructure."
  },
  {
    id: "devops-engineering-intern-scaleup-111",
    title: "DevOps Engineering Intern",
    company: "ScaleUp",
    type: "Internship",
    location: "Remote",
    salary: "$42/hr",
    postedAt: "2024-04-18",
    skills: ["AWS", "CI/CD", "Terraform", "Linux"],
    term: "Summer 2024",
    description: "Automate all the things! Help us build out our CI/CD pipelines and infrastructure as code to support our rapidly growing engineering team."
  },
  {
    id: "game-developer-c-junior-playmakers-112",
    title: "Game Developer (C++) - Junior",
    company: "PlayMakers",
    type: "Full-time",
    location: "Los Angeles, CA",
    salary: "$90k-110k",
    postedAt: "2024-04-17",
    skills: ["C++", "Unreal Engine", "Math"],
    term: "Immediate",
    description: "Join our gameplay team to implement new mechanics and systems for our upcoming AAA title. Strong math and C++ skills required."
  },
  {
    id: "web-accessibility-tester-part-time-inclusive-web-113",
    title: "Web Accessibility Tester (Part-time)",
    company: "Inclusive Web",
    type: "Part-time",
    location: "Remote",
    salary: "$30/hr",
    postedAt: "2024-04-16",
    skills: ["HTML", "WCAG", "Screen Readers"],
    term: "Immediate",
    description: "Ensure the web is accessible for everyone. You will audit web applications against WCAG guidelines and provide remediation reports."
  },
  {
    id: "cloud-architecture-intern-skyhigh-tech-114",
    title: "Cloud Architecture Intern",
    company: "SkyHigh Tech",
    type: "Internship",
    location: "Denver, CO",
    salary: "$45/hr",
    postedAt: "2024-04-15",
    skills: ["Azure", "Python", "Bash"],
    term: "Fall 2024",
    description: "Learn how to design scalable cloud systems. You will assist senior architects in migrating legacy systems to Azure cloud."
  },
  {
    id: "junior-qa-engineer-bugfree-software-115",
    title: "Junior QA Engineer",
    company: "BugFree Software",
    type: "Full-time",
    location: "Atlanta, GA",
    salary: "$75k-90k",
    postedAt: "2024-04-14",
    skills: ["Selenium", "JavaScript", "Cypress"],
    term: "Immediate",
    description: "Write automated tests to ensure our software is reliable. You will be a crucial part of our release process, maintaining test coverage across our platforms."
  }
];
