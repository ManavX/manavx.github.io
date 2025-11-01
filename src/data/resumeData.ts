export const resumeData = {
  name: "Manav Acharya",
  title: "Software Developer",
  contact: {
    email: "manavxa@gmail.com",
    phone: "+1 604 967 2772",
    location: "Coquitlam, BC Canada",
    github: "ManavX",
    linkedin: "https://www.linkedin.com/in/manav-acharya-0594131b1/"
  },

  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "Java", "C#", "HTML", "CSS", "SQL", "PHP", "RISC-V"],
    technologies: ["NodeJS", "ReactJS", "Axios", "Angular", "JUnit", ".NET", "MySQL", "JQuery", "Docker", "Kubernetes"],
    tools: ["Linux", "Git", "MS Intune", "Office365", "Azure AD", "JPEXS", "Jumpcloud", "Google Cloud", "AWS", "Prefect", "Elastic"]
  },

  experience: [
    {
      company: "TideSpark",
      role: "AI Automation & DevOps Engineer",
      period: "Aug 2025 - Present",
      chessRank: "Grandmaster",
      highlights: [
        "Designed and optimized CI/CD pipelines for automated build, test, and deployment of microservices and ML models",
        "Developed and managed container infrastructure with Docker and Kubernetes for scalable AI workloads",
        "Built infrastructure for LLM deployment, including prompt APIs, tuning workflows, and RAG pipelines",
        "Implemented monitoring and observability tools (Elastic) to ensure system reliability"
      ]
    },
    {
      company: "Operto",
      role: "Full Stack Developer & IT Intern",
      period: "Jan 2025 - Aug 2025",
      chessRank: "Master",
      highlights: [
        "Developed and maintained Prefect workflows in Python to automate business processes and reduce manual effort",
        "Resolved issues across SQL, APIs, JavaScript apps, and AWS services including S3 and Cognito",
        "Improved API documentation by restructuring parameters and examples for better clarity and usability",
        "Managed global IT operations for 80+ users, handling MDM, hardware inventory, onboarding, and support",
        "Collaborated with engineering and product teams to deliver software improvements and streamline integrations"
      ]
    },
    {
      company: "YMCA BC",
      role: "Information Systems Coordinator",
      period: "Sep 2022 - Apr 2023",
      chessRank: "Expert",
      highlights: [
        "Worked in a six-person IT team managing infrastructure and technical operations across all YMCA sites in British Columbia",
        "Used Azure Active Directory and MS Intune to deploy devices, manage users, and enforce security and compliance policies",
        "Provided timely support to hundreds of end-users, resolving hardware, software, and network-related issues efficiently",
        "Trained and guided new IT staff, sharing best practices for troubleshooting and device management",
        "Automated application deployments with PowerShell scripts for streamlined Autopilot device provisioning"
      ]
    }
  ],

  projects: [
    {
      name: "Multiplayer IO Game",
      tech: ["JavaScript", "NodeJS", "SocketIO"],
      period: "Oct 2024 - Dec 2024",
      chessRank: "Grandmaster",
      description: "Developing a real-time multiplayer browser game enabling players to compete in an open arena with leaderboard tracking",
      highlights: [
        "Developing a real-time multiplayer browser game enabling players to compete in an open arena with leaderboard tracking",
        "Built a custom physics engine for player movement, projectile handling, and collision detection",
        "Designed a scalable server architecture to support simultaneous player connections and game state synchronization"
      ],
      color: "#FF6B6B"
    },
    {
      name: "EduLink Platform",
      tech: ["ReactJS", "NodeJS", "Google Cloud"],
      period: "Jan 2024 - Apr 2024",
      chessRank: "Master",
      description: "An innovative educational web application that seamlessly connects students with tutors or peers based on similar academic interests",
      highlights: [
        "Spearheaded the development and implementation of EduLink, an innovative educational web application that seamlessly connects students with tutors or peers based on similar academic interests",
        "Designed and implemented a scalable microservices architecture, utilizing Google Cloud Platform services such as Cloud Run for containerized application deployment",
        "Engineered advanced real-time messaging and collaboration features using Firebase Cloud Messaging and Cloud Firestore for data storage"
      ],
      color: "#4ECDC4"
    },
    {
      name: "Spotify Playlist Curator",
      tech: ["ReactJS", "Axios", "MySQL"],
      period: "May 2023 - Sep 2023",
      chessRank: "Expert",
      description: "A ReactJS application that analyzes a user's Spotify account to generate curated playlists",
      highlights: [
        "Created a ReactJS application that analyzes a user's Spotify account to generate curated playlists",
        "Allowed users to log into their Spotify account by calling the Spotify API for authentication redirect",
        "Fetched user data using the Spotify API and stored it in a MySQL database for future use",
        "Utilized SQL queries and Axios requests to store and fetch data from a database to display on the UI"
      ],
      color: "#95E1D3"
    },
    {
      name: "NHL Statistics Website",
      tech: ["Java", "JavaScript", "HTML", "CSS"],
      period: "May 2022 - Aug 2022",
      chessRank: "Intermediate",
      description: "Team project creating an NHL Statistics Website using Springboot framework",
      highlights: [
        "Utilized the NHL API, Bootstrap for formatting, Thymeleaf for HTML processing",
        "Completed in multiple iterations following the Scrum Agile framework with regular team meetings"
      ],
      color: "#F38181"
    }
  ],

  education: {
    degree: "BSc, Major in Computing Science",
    school: "Simon Fraser University",
    period: "Jan 2020 - 2025"
  },

  interests: ["Chess", "Gaming", "Fitness", "Music", "Bouldering"]
};

export type Project = typeof resumeData.projects[0];
export type Experience = typeof resumeData.experience[0];
