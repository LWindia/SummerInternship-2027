// Content for each course landing page. One entry per course (8 total).
// The URL of every page is `/${slug}`. Topics, prices and payment links come
// from ./data.ts so they stay in sync. Edit the text below; the design is shared.
// NOTE: headline/description copy is starter content. Replace with final copy.

import { NewData } from "./data";
import type { CourseVideo } from "./CourseVideoTestimonials";

export interface ProjectPage {
  slug: string;
  shortTitle: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  badge: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  image: { src: string; alt: string };
  duration: string;
  mode: string;
  price: string;
  originalPrice: string;
  paymentLink: string;
  brochurePdfUrl: string;
  stats: { value: string; label: string }[];
  tech: string[];
  // points: optional bullet list, shown instead of description when present
  // label: optional card label, e.g. "Mini Project 1" (default "Project 01")
  whatYouBuild: { title: string; description: string; points?: string[]; label?: string }[];
  // outcome: optional "Learning Outcome" line, shown only when present
  // projectsAfter: optional project numbers (1-based, from whatYouBuild) shown right
  // after this module. If any module sets it, the page uses the large
  // "modules + projects in between" curriculum layout instead of the roadmap.
  curriculum: { week: string; title: string; topics: string[]; outcome?: string; projectsAfter?: number[] }[];
  outcomes: string[];
  faqs: { question: string; answer: string }[];
  // Learner video testimonials for this course. Paste YouTube links here, e.g.
  // { youtubeUrl: "https://youtube.com/shorts/VIDEO_ID", name: "Learner Name", college: "College Name" }.
  // Empty list = the section shows "coming soon" placeholders.
  videos: CourseVideo[];
}

const IGNORED_TOPICS = new Set(["MACHINE LEARNING-AI", "MERN STACK DEVELOPMENT"]);

const topicsOf = (index: number): string[] => {
  const seen = new Set<string>();
  return NewData.projects[index].content
    .map((t) => t.trim())
    .filter((t) => t && !IGNORED_TOPICS.has(t) && !seen.has(t.toLowerCase()) && seen.add(t.toLowerCase()));
};

// Split topics into roadmap phases, as evenly as possible.
const phases = (titles: string[], topics: string[]) => {
  const size = Math.ceil(topics.length / titles.length);
  return titles
    .map((title, i) => ({
      week: i === titles.length - 1 ? `Week ${i + 1}+` : `Week ${i + 1}`,
      title,
      topics: topics.slice(i * size, (i + 1) * size),
    }))
    .filter((p) => p.topics.length > 0);
};

const faqs = (name: string) => [
  {
    question: `Who can join the ${name} summer internship?`,
    answer:
      "Engineering and computer-science students (B.Tech, BCA, MCA, M.Tech and similar) from any year. No prior experience is required, we start from the basics.",
  },
  {
    question: "Will I get an internship certificate?",
    answer:
      "Yes. After you complete the live project you receive an industry-recognised internship (project) certificate.",
  },
  {
    question: "Is the training online or offline?",
    answer:
      "Sessions are live and instructor-led with hands-on labs. You also get recordings and project guidance from industry mentors.",
  },
  {
    question: "Do I get to showcase my project?",
    answer:
      "Yes. Best projects are showcased on JAZBAA 4.0, a platform where industry experts and investors review student work.",
  },
];

interface Spec {
  dataIndex: number; // index in data.ts
  slug: string;
  shortTitle: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  badge: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  image: string;
  phaseTitles: string[];
  whatYouBuild: { title: string; description: string }[];
  outcomes: string[];
  brochure: string;
  videos: CourseVideo[];
}

const make = (s: Spec): ProjectPage => {
  const source = NewData.projects[s.dataIndex];
  const topics = topicsOf(s.dataIndex);
  return {
    slug: s.slug,
    shortTitle: s.shortTitle,
    seoTitle: s.seoTitle,
    seoDescription: s.seoDescription,
    keywords: s.keywords,
    badge: s.badge,
    headline: s.headline,
    headlineAccent: s.headlineAccent,
    subheadline: s.subheadline,
    image: { src: s.image, alt: `${s.shortTitle} summer internship 2027` },
    duration: "4-6 Weeks",
    mode: "Live + Hands-on Labs",
    price: source.price.trim(),
    originalPrice: source.originalPrice.trim(),
    paymentLink: source.registerLink.trim(),
    brochurePdfUrl: s.brochure, // Dummy - replace with real brochure PDF
    stats: [
      { value: "100%", label: "Practical Learning" },
      { value: "4-6", label: "Weeks Live Project" },
      { value: `${topics.length}+`, label: "Core Topics" },
      { value: "1", label: "Industry Certificate" },
    ],
    tech: topics.slice(0, 12),
    whatYouBuild: s.whatYouBuild,
    curriculum: phases(s.phaseTitles, topics),
    outcomes: [...s.outcomes, "Earn an industry-recognised internship certificate"],
    faqs: faqs(s.shortTitle),
    videos: s.videos,
  };
};

const brochure = (name: string) => `https://example.com/brochures/${name}-brochure.pdf`;

// ---- Shared LinuxWorld brochure content (identical in the GenAI and Cloud brochures) ----

const LW_STATS = [
  { value: "60/90 Days", label: "Duration" },
  { value: "Real - Live", label: "Projects" },
  { value: "May | June", label: "Training Starts" },
  { value: "NO", label: "Pre-requisite required" },
  { value: "9.9/10", label: "Program Rating" },
];

const LW_BENEFITS = [
  "No Prior Knowledge Required",
  "Get Industry Recognized Certificate",
  "100% Placement Assistance",
  "Duration : 60 | 90 Days",
  "Modes: Online & Offline Available",
  "Live Q&A sessions",
  "Project driven approach",
  "Interview Preparation",
];

const LW_FAQS = [
  {
    question: "Who can join this Summer Training?",
    answer: "For 3rd year | final year students. Open for B.Tech | BCA | MCA | Bsc. IT | BE. NO Pre-requisite required.",
  },
  {
    question: "Will I get a certificate to enhance my resume?",
    answer:
      "Earn Not One, But Two Certificates to Flaunt Your New Skills! Gain a competitive edge with two prestigious certifications that validate your skills, enhance your credibility, and sets you apart.",
  },
  {
    question: "What is the duration and when does the training start?",
    answer: "60/90 Days Duration. May | June Training Starts.",
  },
  {
    question: "Is the training online or offline?",
    answer: "Modes: Online & Offline Available",
  },
  {
    question: "Who conducts this training?",
    answer:
      "LinuxWorld Informatics Pvt. Ltd. is a leading IT training and consulting organization with 20+ years of experience in delivering industry-aligned technical training for engineering and computer science students.",
  },
];

// Turns [title, [point, point, point]] rows into project cards.
const brochureProjects = (rows: [string, string[], string?][]) =>
  rows.map(([title, points, label]) => ({ title, description: points.join(" "), points, label }));

// Turns [title, topics, outcome] rows into "Module N" entries. A topic ending in ":"
// is a sub-heading inside the module (as printed in the brochure).
// projectsAfter: { moduleNumber: [projectNumbers] } places projects after that module.
const brochureModules = (rows: [string, string[], string][], projectsAfter: Record<number, number[]>) =>
  rows.map(([title, topics, outcome], i) => ({
    week: `Module ${i + 1}`,
    title,
    topics,
    outcome,
    projectsAfter: projectsAfter[i + 1],
  }));

export const projectPages: ProjectPage[] = [
  make({
    dataIndex: 0,
    slug: "machine-learning-ai-summer-internship",
    shortTitle: "Machine Learning & AI",
    seoTitle: "Machine Learning & AI Summer Internship 2027 | Live AI Project & Certificate",
    seoDescription:
      "Learn Python, deep learning, NLP and computer vision by building a live AI project in a 4-6 week machine learning summer internship 2027. Industry mentors and certificate.",
    keywords: ["machine learning summer internship 2027", "AI internship for engineering students", "deep learning NLP computer vision training", "python machine learning course"],
    badge: "Summer Internship 2027 · Machine Learning & AI",
    headline: "Train Real Models on a",
    headlineAccent: "Live Machine Learning Project",
    subheadline:
      "Master Python, data science and deep learning, then turn raw data into a working AI product with industry mentors.",
    image: "/assets/Projects/MLAI.png",
    phaseTitles: ["Python & Data Science Basics", "Classical Machine Learning", "Deep Learning, NLP & Vision", "Evaluation & Capstone"],
    whatYouBuild: [
      { title: "Data Pipelines", description: "Clean, preprocess and engineer features from messy real-world data." },
      { title: "Supervised & Unsupervised Models", description: "Classification and clustering with proper validation." },
      { title: "Deep Learning Models", description: "CNNs and neural networks for vision and language tasks." },
      { title: "Capstone AI Project", description: "A tuned, evaluated model packaged as a demo-ready product." },
    ],
    outcomes: [
      "Build and evaluate machine learning models from scratch",
      "Apply deep learning to images and text",
      "Tune and validate models the way industry teams do",
      "Showcase an AI project on your resume and GitHub",
    ],
    // YouTube learner videos for this course, e.g. { youtubeUrl: "https://youtube.com/shorts/VIDEO_ID", name: "Learner Name", college: "College Name" }
    videos: [],
    brochure: brochure("machine-learning-ai"),
  }),
  // Cloud Computing (AWS + Azure)
  // Source of truth: LinuxWorld "Summer Industrial Training on CLOUD COMPUTING" brochure.
  // Keep wording exactly as printed. Price and payment link are unchanged (data.ts index 1).
  {
    slug: "aws-cloud-computing-summer-internship",
    shortTitle: "Cloud Computing",
    seoTitle: "Cloud Computing Summer Industrial Training | AWS & Azure | LinuxWorld",
    seoDescription:
      "Summer Industrial Training on Cloud Computing by LinuxWorld Informatics Pvt. Ltd. Master the Concepts of Cloud Computing with AWS and Microsoft Azure. 60/90 Days Duration, Real - Live Projects, NO Pre-requisite required.",
    keywords: [
      "Cloud Computing summer training",
      "Summer Industrial Training on Cloud Computing",
      "AWS summer internship",
      "Microsoft Azure training",
      "LinuxWorld Informatics",
    ],
    badge: "Summer Industrial Training · LinuxWorld Informatics Pvt. Ltd.",
    headline: "Summer Industrial Training on",
    headlineAccent: "Cloud Computing",
    subheadline: "Master the Concepts of Cloud Computing",
    image: { src: "/assets/Projects/AWS.png", alt: "Summer Industrial Training on Cloud Computing" },
    duration: "60/90 Days",
    mode: "Online & Offline Available",
    price: NewData.projects[1].price.trim(),
    originalPrice: NewData.projects[1].originalPrice.trim(),
    paymentLink: NewData.projects[1].registerLink.trim(),
    brochurePdfUrl: brochure("cloud-computing"), // Dummy - replace with real brochure PDF
    stats: LW_STATS,
    tech: [
      "AWS",
      "Microsoft Azure",
      "GCP",
      "Amazon EC2",
      "Amazon S3",
      "IAM",
      "VPC",
      "EBS",
      "EFS",
      "Load Balancer",
      "Auto Scaling",
      "AWS Lambda",
      "API Gateway",
      "Amazon RDS",
      "DynamoDB",
      "CloudWatch",
      "CloudTrail",
      "AWS CloudFormation",
      "Python",
      "Boto3",
    ],
    // Mini Projects 1-3 sit between modules (as in the brochure); Capstone Projects 1-5 follow Module 19.
    whatYouBuild: brochureProjects([
      ["Static Website Hosting", ["Design static website hosting using S3", "Understand object storage and accessibility", "Focus on cost-efficient hosting model"], "Mini Project 1"],
      ["Secure Access Design", ["Design IAM-based access control system", "Apply least privilege principle", "Define role-based access"], "Mini Project 2"],
      ["Custom VPC Design", ["Design secure network architecture", "Create subnet segmentation", "Define routing and access control"], "Mini Project 3"],
      ["Scalable Web App Architecture (AWS)", ["Design scalable and highly available system", "Integrate EC2, S3, Load Balancer, Auto Scaling", "Implement monitoring with CloudWatch"], "Capstone Project 1"],
      ["Secure Cloud Infrastructure Design (AWS)", ["Design secure architecture using IAM and VPC", "Implement logging and auditing with CloudTrail", "Apply encryption and security controls"], "Capstone Project 2"],
      ["Multi-Tier Application Architecture", ["Design 3-tier architecture (Web, App, Database)", "Use EC2 and RDS", "Implement scalability and isolation"], "Capstone Project 3"],
      ["Cloud Automation using Python (Boto3)", ["Design automation workflows", "Manage AWS resources programmatically", "Automate operations and backups"], "Capstone Project 4"],
      ["Microsoft Azure Application Architecture", ["Design application deployment on Azure", "Use Azure VM, Storage, Networking", "Implement monitoring using Azure tools"], "Capstone Project 5"],
    ]),
    curriculum: brochureModules(
      [
        ["Fundamentals of Cloud Computing", ["Evolution of IT Infrastructure: Traditional vs Cloud", "Characteristics: On-demand, Elasticity, Scalability", "Cloud Service Models: IaaS, PaaS, SaaS", "Deployment Models: Public, Private, Hybrid, Multi-Cloud", "High Availability, Fault Tolerance, Disaster Recovery", "Benefits and Challenges of Cloud Computing"], "Students will understand the core concepts of cloud computing, including service models, deployment models, and how cloud infrastructure differs from traditional IT systems."],
        ["Cloud Ecosystem & Providers", ["Overview of AWS, Azure, GCP", "Market Trends and Industry Adoption", "Service Comparison Across Providers", "Vendor Lock-in and Multi-Cloud Strategies", "Real-world Cloud Use Cases"], "Students will gain knowledge of major cloud platforms like AWS and Azure, their services, and how organizations choose cloud providers based on requirements."],
        ["AWS Global Infrastructure & Architecture", ["AWS Regions, Availability Zones, Edge Locations", "Global Network Design and Content Delivery", "Shared Responsibility Model", "Resource Organization and Tagging", "Billing Concepts and Cost Awareness"], "Students will understand how AWS global infrastructure is designed, including regions, availability zones, and how applications are distributed for high availability."],
        ["Compute Services (Amazon EC2)", ["Virtual Machines and Cloud Compute Concepts", "EC2 Architecture and Components", "Instance Types and Workload Mapping", "AMI (Machine Images)", "Pricing Models (On-Demand, Reserved, Spot)", "Elastic Scaling Concepts"], "Students will understand how virtual machines work in the cloud and how compute resources are provisioned, scaled, and optimized."],
        ["Identity & Access Management (IAM)", ["IAM Users, Groups, Roles", "Policies and Permission Models", "Role-Based Access Control (RBAC)", "Multi-Factor Authentication (MFA)", "Identity Federation Concepts", "Security Best Practices"], "Students will understand how access control and security are managed in the cloud using users, roles, and permission policies."],
        ["Cloud Storage Services", ["Object, Block, and File Storage Concepts", "Amazon S3 Architecture", "Storage Classes and Lifecycle Policies", "Data Durability and Availability", "EBS vs EFS vs S3 Comparison", "Backup and Archival Strategies"], "Students will understand different storage types in cloud environments and how data is stored, managed, and protected."],
        ["Networking in Cloud (VPC)", ["VPC Architecture and Components", "Subnetting and IP Addressing", "Public vs Private Subnets", "Internet Gateway and NAT Concepts", "Route Tables and Traffic Flow", "Security Groups vs NACL"], "Students will understand how networking works in the cloud, including virtual networks, subnets, routing, and secure communication."],
        ["Load Balancing & Auto Scaling", ["Load Balancing Concepts", "Types: Application and Network Load Balancer", "Traffic Distribution Strategies", "Auto Scaling Concepts and Policies", "Designing Highly Available Systems"], "Students will understand how applications handle traffic efficiently and scale automatically to ensure high availability and performance."],
        ["Serverless Computing", ["Serverless Architecture Concepts", "Event-driven Computing", "AWS Lambda Overview", "API Gateway Concepts", "Microservices Architecture"], "Students will understand event-driven architectures and how applications can run without managing servers."],
        ["Database Services", ["Relational vs NoSQL Databases", "Amazon RDS Concepts", "Backup, Replication, and Scaling", "DynamoDB Overview", "Database Selection Strategies"], "Students will understand different database types and how cloud databases are designed for scalability, availability, and performance."],
        ["Monitoring, Logging & Observability", ["CloudWatch Concepts", "Metrics, Logs, and Alerts", "CloudTrail for Auditing", "Observability in Distributed Systems"], "Students will understand how cloud systems are monitored, how logs are analyzed, and how issues are detected and resolved."],
        ["Automation & Infrastructure Management", ["Infrastructure as Code (IaC) Concepts", "AWS CloudFormation Overview", "Automation in Cloud Environments", "Resource Provisioning Strategies"], "Students will understand how cloud resources are automated and managed using infrastructure as code concepts."],
        ["Python for Cloud Automation (Boto3)", ["Introduction to Python in Cloud", "Boto3 (AWS SDK) Overview", "Cloud APIs and SDK Concepts", "Authentication using IAM", "Resource Automation Concepts:", "EC2 lifecycle management using scripts", "S3 bucket operations automation", "IAM user and role automation", "Backup and snapshot automation", "Industry Use Cases:", "Infrastructure automation", "Scheduled cloud operations", "DevOps scripting workflows"], "Students will understand how Python is used to automate cloud operations and manage resources programmatically using AWS SDK."],
        ["Cloud Security & Compliance", ["Security Challenges in Cloud", "Data Encryption (At Rest & In Transit)", "IAM Security Best Practices", "Compliance Standards Overview", "Risk Management"], "Students will understand security best practices, data protection techniques, and compliance requirements in cloud environments."],
        ["Cost Management & Optimization", ["Cloud Pricing Models", "Budgeting and Cost Allocation", "Cost Optimization Strategies", "Avoiding Cost Overruns"], "Students will understand cloud pricing models and how to optimize costs while maintaining performance and efficiency."],
        ["Microsoft Azure Fundamentals", ["Azure Architecture Overview", "Azure Resource Manager", "Azure Virtual Machines", "Azure Storage (Blob, Disk, File)", "Azure Virtual Network", "Azure Identity & Access Management", "Azure Monitoring Concepts"], "Students will understand the basics of Microsoft Azure services and how cloud solutions are designed on the Azure platform."],
        ["Cloud Architecture Design Principles", ["Well-Architected Framework", "Designing Scalable Systems", "High Availability and Fault Tolerance", "Performance Optimization", "Cost-efficient Architecture"], "Students will understand how to design scalable, reliable, and cost-effective cloud architectures using industry best practices."],
        ["Industry Use Cases & Case Studies", ["Cloud in E-commerce", "Cloud in Banking Systems", "SaaS Application Architectures", "Real-world Architecture Analysis"], "Students will understand how cloud computing is applied in real-world industries and how solutions are designed for different domains."],
        ["Emerging Trends in Cloud", ["Multi-Cloud Strategies", "Edge Computing", "AI/ML Integration with Cloud", "Future of Cloud Technologies"], "Students will gain awareness of modern cloud trends such as AI integration, edge computing, and future advancements."],
      ],
      // Mini Project 1 after Module 4, Mini Project 2 after Module 5, Mini Project 3 after Module 7,
      // Capstone Projects 1-5 after Module 19.
      { 4: [1], 5: [2], 7: [3], 19: [4, 5, 6, 7, 8] }
    ),
    outcomes: LW_BENEFITS,
    faqs: LW_FAQS,
    // YouTube learner videos for this course, e.g. { youtubeUrl: "https://youtube.com/shorts/VIDEO_ID", name: "Learner Name", college: "College Name" }
    videos: [],
  },
  make({
    dataIndex: 2,
    slug: "python-programming-summer-internship",
    shortTitle: "Python Programming",
    seoTitle: "Python Programming Summer Internship 2027 | Live Project & Certificate",
    seoDescription:
      "Learn Python from scratch, from data structures and OOP to multi-threading and sockets, with a live project in a 4-6 week python summer internship 2027, with certificate.",
    keywords: ["python summer internship 2027", "python programming training for students", "python OOP multithreading course", "learn python with live project"],
    badge: "Summer Internship 2027 · Python",
    headline: "Master Python and Build a",
    headlineAccent: "Real-World Python Project",
    subheadline:
      "Start from zero and finish with strong Python fundamentals, clean code habits and a project you can show in interviews.",
    image: "/assets/Projects/Python.png",
    phaseTitles: ["Python Basics", "Data Structures & Logic", "Files, Modules & Errors", "OOP, Threads & Capstone"],
    whatYouBuild: [
      { title: "Command-Line Tools", description: "Automate everyday tasks with scripts and file handling." },
      { title: "Data Processing Programs", description: "Use data structures and regular expressions effectively." },
      { title: "Object-Oriented Applications", description: "Design reusable classes, modules and packages." },
      { title: "Capstone Python Project", description: "A complete project with threading and socket programming." },
    ],
    outcomes: [
      "Write clean, reusable Python code",
      "Handle files, errors and modules like a professional",
      "Apply object-oriented design in projects",
      "Get ready for data science, web and automation roles",
    ],
    // YouTube learner videos for this course, e.g. { youtubeUrl: "https://youtube.com/shorts/VIDEO_ID", name: "Learner Name", college: "College Name" }
    videos: [],
    brochure: brochure("python-programming"),
  }),
  make({
    dataIndex: 3,
    slug: "python-full-stack-web-development-summer-internship",
    shortTitle: "Python Full Stack Web Development",
    seoTitle: "Python Full Stack Web Development Summer Internship 2027 | Flask, React & MySQL",
    seoDescription:
      "Build a complete web app with Python, Flask, React, JavaScript and MySQL in a 4-6 week python full stack summer internship 2027. Live project and certificate.",
    keywords: ["python full stack internship 2027", "flask react mysql course", "full stack web development summer training", "python web development for students"],
    badge: "Summer Internship 2027 · Python Full Stack",
    headline: "Build End-to-End Apps with",
    headlineAccent: "Python Full Stack",
    subheadline:
      "Combine Flask, React, JavaScript and MySQL to design, build and ship a complete web application on a live project.",
    image: "/assets/Projects/PythoFullStack.png",
    phaseTitles: ["Web Fundamentals", "JavaScript & Frontend", "Backend with Python & Flask", "Database, Git & Capstone"],
    whatYouBuild: [
      { title: "Responsive Frontend", description: "HTML, JavaScript, Bootstrap and React interfaces." },
      { title: "Flask REST APIs", description: "GET and POST endpoints tested with Postman." },
      { title: "MySQL Backed Data Layer", description: "Persistent data with clean schema design." },
      { title: "Deployed Capstone App", description: "A full stack product managed with Git and GitHub." },
    ],
    outcomes: [
      "Build and connect frontend, backend and database",
      "Create and test APIs with Flask and Postman",
      "Collaborate using Git and GitHub",
      "Present a full stack project to recruiters",
    ],
    // YouTube learner videos for this course, e.g. { youtubeUrl: "https://youtube.com/shorts/VIDEO_ID", name: "Learner Name", college: "College Name" }
    videos: [],
    brochure: brochure("python-full-stack"),
  }),
  make({
    dataIndex: 4,
    slug: "mern-stack-web-development-summer-internship",
    shortTitle: "MERN Stack Web Development",
    seoTitle: "MERN Stack Web Development Summer Internship 2027 | Live Project & Certificate",
    seoDescription:
      "Build a production-grade full stack app with MongoDB, Express, React and Node.js in a 4-6 week MERN stack summer internship 2027. Live project and certificate.",
    keywords: ["MERN stack summer internship 2027", "full stack web development internship", "React Node.js summer training", "MongoDB Express React Node course"],
    badge: "Summer Internship 2027 · MERN Stack",
    headline: "Build & Ship a Real",
    headlineAccent: "MERN Stack Product",
    subheadline:
      "Go from HTML to a deployed full stack application with React, Node.js, Express and MongoDB, guided by industry mentors.",
    image: "/assets/Projects/MERN.png",
    phaseTitles: ["Web Foundations", "Modern JavaScript & React", "Backend with Node & Express", "Database, Integration & Capstone"],
    whatYouBuild: [
      { title: "Responsive React Frontend", description: "Component-driven UI with hooks and routing." },
      { title: "REST API with Node & Express", description: "Structured APIs with validation and error handling." },
      { title: "MongoDB Data Layer", description: "Schema design and queries for real application data." },
      { title: "Deployed Capstone Project", description: "Authentication, CRUD and deployment of a product-style app." },
    ],
    outcomes: [
      "Design and build full stack applications end to end",
      "Create and consume REST APIs confidently",
      "Use Git and GitHub like a professional team",
      "Present a deployable project in interviews",
    ],
    // YouTube learner videos for this course, e.g. { youtubeUrl: "https://youtube.com/shorts/VIDEO_ID", name: "Learner Name", college: "College Name" }
    videos: [],
    brochure: brochure("mern-stack"),
  }),
  // Mastering GenAI : Prompt Engineering to AI Agents
  // Source of truth: LinuxWorld brochure PDF. Keep wording exactly as printed.
  // Price and payment link are unchanged (data.ts index 5).
  {
    slug: "generative-ai-machine-learning-summer-internship",
    shortTitle: "Mastering GenAI : Prompt Engineering to AI Agents",
    seoTitle: "Mastering GenAI : Prompt Engineering to AI Agents | Summer Industrial Training",
    seoDescription:
      "Summer Industrial Training on Mastering GenAI : Prompt Engineering to AI Agents by LinuxWorld Informatics Pvt. Ltd. 60/90 Days Duration, Real - Live Projects, NO Pre-requisite required.",
    keywords: [
      "Mastering GenAI",
      "Prompt Engineering to AI Agents",
      "Summer Industrial Training",
      "Generative AI summer training",
      "LinuxWorld Informatics",
    ],
    badge: "Summer Industrial Training · LinuxWorld Informatics Pvt. Ltd.",
    headline: "Mastering GenAI :",
    headlineAccent: "Prompt Engineering to AI Agents",
    subheadline: "Master the Concepts of Generative AI",
    image: {
      src: "/assets/Projects/GenAIML.png",
      alt: "Mastering GenAI : Prompt Engineering to AI Agents",
    },
    duration: "60/90 Days",
    mode: "Online & Offline Available",
    price: NewData.projects[5].price.trim(),
    originalPrice: NewData.projects[5].originalPrice.trim(),
    paymentLink: NewData.projects[5].registerLink.trim(),
    brochurePdfUrl: brochure("mastering-genai"), // Dummy - replace with real brochure PDF
    stats: LW_STATS,
    tech: [
      "LLMs",
      "GPT",
      "Claude",
      "Gemini",
      "ChatGPT",
      "Prompt Engineering",
      "Context Engineering",
      "Multimodal AI",
      "REST",
      "JSON",
      "OpenAI API",
      "LangChain",
      "Agentic AI",
    ],
    whatYouBuild: [
      ["AI Resume & Cover Letter Generator", ["Generating tailored resumes based on job roles", "Creating personalized cover letters using prompts", "Optimizing content for ATS & recruiter visibility"]],
      ["Business Idea Generator AI", ["Generating startup ideas with AI", "Including problem, solution & target audience", "Providing basic market validation insights"]],
      ["AI Study Assistant", ["Converting notes into summaries & flashcards", "Generating quizzes for self-assessment", "Simplifying complex topics using AI"]],
      ["Prompt-Based Coding Assistant", ["Generating code using structured prompts", "Debugging and optimising existing code", "Understanding code logic step-by-step"]],
      ["AI Email Automation System", ["Generating professional emails (HR, sales, support)", "Automating replies based on context", "Maintaining tone & personalization"]],
      ["AI Content Creation Platform", ["Generating blogs, captions & ad copies", "Creating SEO-optimized content", "Automating multi-format content creation"]],
      ["AI Chatbot for Business", ["Building chatbot for FAQs & support", "Handling user queries intelligently", "Improving response accuracy using prompts"]],
      ["AI Code Assistant Tool", ["Assisting in writing and debugging code", "Generating documentation automatically", "Improving developer productivity"]],
      ["AI Social Media Automation Tool", ["Generating daily social media posts", "Creating captions & hashtags", "Automating content planning"]],
      ["AI Image Prompt Generator", ["Generating prompts for image tools", "Creating high-quality visuals using AI", "Optimizing prompts for better output"]],
      ["Personal AI Assistant", ["Managing tasks, reminders & schedules", "Providing daily planning suggestions", "Automating routine activities"]],
      ["AI Research Agent", ["Collecting and summarizing information", "Generating structured research reports", "Providing insights from multiple sources"]],
      ["AI Job Search Agent", ["Finding relevant job opportunities", "Customizing resumes & applications", "Automating job application workflow"]],
      ["AI Business Automation Agent", ["Automating emails, reports & workflows", "Generating business insights", "Reducing manual effort using AI"]],
      ["Multi-Step AI Decision Agent", ["Analyzing input data step-by-step", "Providing decision-based outputs", "Supporting basic business or personal decisions"]],
    ].map(([title, points]) => ({
      title: title as string,
      description: (points as string[]).join(" "),
      points: points as string[],
    })),
    curriculum: (
      [
        ["Foundations of AI & LLMs", ["AI, ML, Deep Learning overview", "What are LLMs (GPT, Claude, Gemini)", "Tokens, temperature, top-p", "How LLMs generate responses"], "Learners will understand how AI models think and respond."],
        ["Prompt Engineering Fundamentals", ["What is prompting", "Zero-shot, One-shot, Few-shot", "Prompt anatomy (instruction, context, examples, output)"], "Learners will create structured and effective prompts."],
        ["Prompt Patterns & Frameworks", ["Role-based prompting", "Instruction-based prompting", "Output formatting (JSON, tables, structured text)", "Reusable prompt templates"], "Learners will design reusable and scalable prompts."],
        ["Advanced Prompting Techniques", ["Chain of Thought (CoT)", "Step-by-step reasoning", "Prompt chaining", "Multi-turn conversations"], "Learners will handle complex problem-solving using prompts."],
        ["Prompt Optimization & Debugging", ["Identifying bad prompts", "Reducing hallucination", "Prompt testing & iteration", "Improving accuracy & consistency"], "Learners will refine prompts for reliable outputs."],
        ["Context Engineering", ["Context window management", "Long prompt handling", "Memory simulation", "Context injection techniques"], "Learners will control AI responses using context effectively."],
        ["Prompt Use Cases", ["Content generation", "Resume & email automation", "Business workflows", "Coding assistance"], "Learners will apply prompts in real-world scenarios."],
        ["Prompt Automation & Productivity", ["Prompt libraries", "Prompt workflows", "Using AI for daily productivity", "Prompt chaining for automation"], "Learners will automate tasks using prompt systems."],
        ["Generative AI Ecosystem", ["Overview of GenAI tools (ChatGPT, Gemini, Claude)", "Model capabilities comparison", "Choosing the right AI tool"], "Learners will select appropriate tools for different tasks."],
        ["AI for Content & Marketing", ["Blog writing", "Social media content", "Ad copy & SEO content", "Content personalization"], "Learners will create production-level content using AI."],
        ["AI for Developers", ["Code generation", "Debugging with AI", "Documentation generation", "Code optimization"], "Learners will improve development productivity using AI."],
        ["Multimodal AI (Text + Image + Video)", ["Image generation basics", "Prompting for images", "Intro to video generation", "Use cases"], "Learners will work with multimodal AI tools."],
        ["Introduction to APIs", ["API fundamentals", "REST concepts", "JSON handling"], "Learners will understand how AI integrates with applications."],
        ["OpenAI API & Integration", ["API setup & keys", "Sending prompts via API", "Handling responses", "Error handling"], "Learners will build AI-powered applications using APIs."],
        ["Building AI Applications", ["AI chatbots", "UI + AI integration", "Use case-based applications"], "Learners will build functional AI applications."],
        ["AI Automation & Workflows", ["Workflow design", "Automation pipelines", "Business use cases (HR, marketing, support)"], "Learners will automate real-world processes using AI."],
        ["Introduction to Agentic AI", ["What is Agentic AI", "Agents vs chatbots", "Autonomous decision-making"], "Learners will understand how AI agents work."],
        ["AI Agent Components", ["Tools, memory, reasoning", "Task execution", "Planning basics"], "Learners will understand core agent architecture."],
        ["Building Basic AI Agents", ["Intro to LangChain / frameworks", "Creating simple agents", "Task automation"], "Learners will build beginner-level AI agents."],
      ] as [string, string[], string][]
    ).map(([title, topics, outcome], i) => ({
      week: `Module ${i + 1}`,
      title,
      topics,
      outcome,
      // Projects shown after a module. Key = module number, value = project numbers.
      // Edit this map to match the brochure page order.
      projectsAfter: ({ 4: [1, 2, 3, 4], 8: [5, 6], 12: [7, 8, 9, 10], 16: [11], 19: [12, 13, 14, 15] } as Record<number, number[]>)[i + 1],
    })),
    outcomes: LW_BENEFITS,
    faqs: LW_FAQS,
    // GenAI learner testimonial videos (name and college as provided).
    videos: [
      // College was missing in the list provided (the column repeated the name), so none is shown.
      { youtubeUrl: "https://www.youtube.com/shorts/S-Rl46SCs6k", name: "Sankalp S Pathak" },
      { youtubeUrl: "https://www.youtube.com/shorts/MqlApeYvLAo", name: "Avi Maanju", college: "Arya College Of Engineering & IT" },
      { youtubeUrl: "https://www.youtube.com/shorts/S6ftj86CsBo", name: "Ananya Singhal", college: "JECRC Foundation" },
      { youtubeUrl: "https://www.youtube.com/shorts/dPZwZj_SLEA", name: "Kanakaboina Ankith Raj", college: "Swami Vivekananda Institute of Technology" },
      { youtubeUrl: "https://www.youtube.com/watch?v=BqLkGoFYZnY", name: "Palak Narang", college: "Model Institute of Engineering & Technology" },
      { youtubeUrl: "https://www.youtube.com/shorts/BZrcdaf01J0", name: "Muskan Mehta", college: "The Technological Institute of Textile and Sciences" },
      // This video is currently PRIVATE on YouTube, so it cannot play on the site.
      // Uncomment once it is set to Public or Unlisted.
      // { youtubeUrl: "https://www.youtube.com/shorts/w00RMkRp1Oc", name: "Venaya Mulani", college: "LNMIIT" },
    ],  },
  make({
    dataIndex: 6,
    slug: "full-stack-development-machine-learning-summer-internship",
    shortTitle: "Full Stack + Machine Learning",
    seoTitle: "Full Stack Web Development + Machine Learning Summer Internship 2027",
    seoDescription:
      "Combine web development and machine learning: build ML models and ship them in a Flask and React app in a 4-6 week full stack plus ML summer internship 2027, with certificate.",
    keywords: ["full stack machine learning internship 2027", "flask react machine learning project", "deploy ML model web app", "full stack and data science training"],
    badge: "Summer Internship 2027 · Full Stack + ML",
    headline: "Ship Intelligent Web Apps with",
    headlineAccent: "Full Stack + Machine Learning",
    subheadline:
      "Learn data science and web development together, then deploy a machine learning model inside a real full stack product.",
    image: "/assets/Projects/FullStackML.png",
    phaseTitles: ["Data Science with Python", "Machine Learning Models", "Frontend & Web Basics", "Backend, Database & Capstone"],
    whatYouBuild: [
      { title: "Predictive Models", description: "Regression, clustering and decision trees on real data." },
      { title: "Recommendation System", description: "Personalised suggestions powered by ML." },
      { title: "React + Flask Application", description: "A full stack app that serves your model." },
      { title: "Capstone ML Product", description: "An end-to-end intelligent app backed by MySQL." },
    ],
    outcomes: [
      "Train models and expose them through web APIs",
      "Build full stack apps with Flask and React",
      "Work across the data and web stack",
      "Stand out with a combined AI + web project",
    ],
    // YouTube learner videos for this course, e.g. { youtubeUrl: "https://youtube.com/shorts/VIDEO_ID", name: "Learner Name", college: "College Name" }
    videos: [],
    brochure: brochure("full-stack-ml"),
  }),
  make({
    dataIndex: 7,
    slug: "cloud-computing-full-stack-web-development-summer-internship",
    shortTitle: "Cloud Computing + Full Stack",
    seoTitle: "Cloud Computing + Full Stack Web Development Summer Internship 2027 | AWS, Flask & React",
    seoDescription:
      "Build full stack apps with Flask, React and MySQL, then deploy and scale them on AWS in a 4-6 week cloud computing plus full stack summer internship 2027, with certificate.",
    keywords: ["cloud full stack internship 2027", "AWS and web development training", "deploy flask react app on AWS", "cloud computing and full stack course"],
    badge: "Summer Internship 2027 · Cloud + Full Stack",
    headline: "Build It, Deploy It, Scale It with",
    headlineAccent: "Cloud + Full Stack",
    subheadline:
      "Develop a complete web application and launch it on AWS with networking, serverless, monitoring and security best practices.",
    image: "/assets/Projects/CloudFullStack.png",
    phaseTitles: ["Web Development Foundations", "Backend, Database & Git", "AWS Storage & Networking", "Serverless, AI Services & Capstone"],
    whatYouBuild: [
      { title: "Full Stack Web App", description: "React frontend with Flask and MySQL backend." },
      { title: "AWS Infrastructure", description: "VPC, load balancer, storage and access management." },
      { title: "Serverless & Monitoring", description: "API Gateway, CloudWatch and auto scaling." },
      { title: "Cloud-Deployed Capstone", description: "A secure, scalable product live on AWS." },
    ],
    outcomes: [
      "Build and deploy applications end to end",
      "Secure and scale workloads on AWS",
      "Use AWS AI services in your apps",
      "Present a cloud-hosted full stack project",
    ],
    // YouTube learner videos for this course, e.g. { youtubeUrl: "https://youtube.com/shorts/VIDEO_ID", name: "Learner Name", college: "College Name" }
    videos: [],
    brochure: brochure("cloud-full-stack"),
  }),
];

export const getProjectPage = (slug: string) =>
  projectPages.find((p) => p.slug === slug);
