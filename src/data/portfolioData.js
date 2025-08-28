export const clusters = {
  projects: [
    {
      id: 'scamvanguard',
      title: "ScamVanguard",
      category: "AI Security Platform",
      description: "Serverless AI-powered scam detection system processing 200+ daily requests via AWS Lambda, SES, and SQS. Achieves 95% response delivery within 10 minutes using OpenAI GPT-4 for email classification with detailed explanations.",
      tech: ["AWS Lambda", "Terraform", "GPT-4", "Python", "DynamoDB", "SES", "SQS"],
      link: "https://github.com/haydencj/scamvanguard",
      logo: "SV",
      color: 0x4a9eff
    },
    {
      id: 'deepwokenbot',
      title: "DeepwokenBot", 
      category: "AI Assistant",
      description: "AI-powered Q&A system using Retrieval-Augmented Generation (RAG) for Roblox Deepwoken. Features semantic search with Pinecone vector database and advanced token-based document chunking with overlapping context.",
      tech: ["Python", "FastAPI", "Pinecone", "OpenAI", "RAG", "MediaWiki API"],
      link: "https://github.com/haydencj/deepwoken-ai",
      logo: "DW",
      color: 0x4a9eff
    },
    {
      id: 'textract',
      title: "Textract",
      category: "Desktop Application", 
      description: "High-performance desktop OCR tool built in Go with OpenGL/GLFW GUI. Features Tesseract integration with concurrent goroutines and in-memory processing for low-latency text extraction.",
      tech: ["Go", "OpenGL", "OCR", "RobotGo", "Tesseract", "GLFW"],
      link: "https://github.com/haydencj/textract",
      logo: "TX",
      color: 0x4a9eff
    },
    {
      id: 'cloudchat',
      title: "CloudChat",
      category: "Real-time Platform",
      description: "Scalable real-time messaging platform using React and Remix.js. Engineered distributed architecture with GCP services, Redis pub/sub, and Auth0 authentication with SSO integration.",
      tech: ["Remix.js", "GCP", "Socket.IO", "Redis", "Auth0", "Docker"],
      link: "https://github.com/haydencj/cloudchat",
      logo: "CC",
      color: 0x4a9eff
    }
  ],
  internships: [
    {
      id: 'jpmorgan',
      title: "JPMorgan Chase",
      category: "Software Engineering Intern",
      description: "Designed and implemented full-stack solutions with React UI for querying OpenSearch events. Built backend services using Go, Echo framework, and event-driven architecture with AWS DynamoDB. Achieved 85%+ test coverage.",
      tech: ["React", "Go", "Echo", "AWS", "OpenSearch", "DynamoDB", "Testing"],
      link: "https://www.jpmorganchase.com/",
      logo: "JP",
      color: 0xff6b4a
    },
    {
      id: 'oncor',
      title: "Oncor Electric",
      category: "Full Stack Developer", 
      description: "Architected and maintained 3+ internal web applications using Next.js and TypeScript. Built robust document management platform reducing processing time by 20%. Designed responsive interfaces with Figma.",
      tech: ["Next.js", "TypeScript", "React", "Redux", "Figma", "Document Management"],
      link: "https://www.oncor.com/",
      logo: "ON",
      color: 0xff6b4a
    },
    {
      id: 'hennge',
      title: "HENNGE Inc",
      category: "Software Engineering Intern",
      description: "Developed Twitter clone with Flask and AWS services. Implemented secure authentication using Google OAuth. Enhanced deployment with CI/CD pipeline using Terraform, Docker, and GitHub Actions.",
      tech: ["Flask", "AWS", "Docker", "Terraform", "Python", "OAuth"],
      link: "https://hennge.com/",
      logo: "HN",
      color: 0xff6b4a
    }
  ],
  skills: [
    {
      id: 'cloud',
      title: "Cloud Architecture",
      category: "AWS • GCP • Infrastructure",
      description: "Expert in cloud-native architectures with AWS Lambda, DynamoDB, S3, SES, SQS, EC2, ECR, ECS. Google Cloud Platform experience with Cloud SQL, Compute Engine, Memorystore. Infrastructure as Code with Terraform.",
      tech: ["AWS", "GCP", "Terraform", "Docker", "Kubernetes", "Serverless"],
      link: "#cloud",
      logo: "☁",
      color: 0x4aff6b
    },
    {
      id: 'fullstack',
      title: "Full-Stack Development",
      category: "Frontend • Backend • APIs",
      description: "Proficient in modern web technologies: React, Next.js, Vue.js, TypeScript, Node.js, Express.js, Flask, Django. Experience with GraphQL, REST APIs, WebSockets, and real-time applications.",
      tech: ["React", "Node.js", "TypeScript", "GraphQL", "WebSockets", "APIs"],
      link: "#fullstack",
      logo: "⚡",
      color: 0x4aff6b
    },
    {
      id: 'systems',
      title: "Systems Programming",
      category: "Go • Python • C++ • Performance",
      description: "Strong systems programming skills in Go, Python, C++, and Java. Experience with concurrent programming, memory management, performance optimization, and low-level system design.",
      tech: ["Go", "Python", "C++", "Java", "Concurrency", "Optimization"],
      link: "#systems",
      logo: "⚙",
      color: 0x4aff6b
    },
    {
      id: 'ai',
      title: "AI & Machine Learning",
      category: "OpenAI • RAG • Vector Databases",
      description: "Experience integrating AI/ML models into production systems. Worked with OpenAI GPT-4, Retrieval-Augmented Generation (RAG), Pinecone vector databases, and semantic search systems.",
      tech: ["OpenAI", "RAG", "Pinecone", "Vector DB", "Semantic Search", "NLP"],
      link: "#ai",
      logo: "🧠",
      color: 0x4aff6b
    }
  ]
}

export const clusterPositions = {
  // Projects cluster - top-left region
  projects: [
    { phiIndex: 3, thetaIndex: 8 },
    { phiIndex: 3, thetaIndex: 9 },
    { phiIndex: 4, thetaIndex: 8 },
    { phiIndex: 4, thetaIndex: 9 }
  ],
  // Internships cluster - right region  
  internships: [
    { phiIndex: 7, thetaIndex: 20 },
    { phiIndex: 7, thetaIndex: 21 },
    { phiIndex: 8, thetaIndex: 20 }
  ],
  // Skills cluster - bottom region
  skills: [
    { phiIndex: 11, thetaIndex: 4 },
    { phiIndex: 11, thetaIndex: 5 },
    { phiIndex: 12, thetaIndex: 4 },
    { phiIndex: 12, thetaIndex: 5 }
  ]
}