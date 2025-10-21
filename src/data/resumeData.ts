export const resumeData = {
  name: "Manav Acharya",
  title: "Software Developer",
  contact: {
    email: "manavxa@gmail.com",
    phone: "+1 604 967 2772",
    location: "Coquitlam, BC Canada",
    github: "ManavX",
    linkedin: "Manav Acharya"
  },

  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "Java", "C#", "HTML", "CSS", "SQL", "PHP", "Visual Basic", "RISC-V"],
    technologies: ["NodeJS", "ReactJS", "Angular", "REST APIs", "JUnit", "MySQL", "JQuery", "Axios"],
    tools: ["Linux", "VS Code", "IntelliJ", "Git", "MS Intune", "Office365", "Azure AD", "WinSCP", "JPEXS", "ZENWorks", "SolarWinds", "Jumpcloud", "MATLAB", "Google Cloud", "AWS", "Prefect"]
  },

  experience: [
    {
      company: "Operto",
      role: "Full Stack Developer & IT Intern",
      period: "Jan 2025 - Aug 2025",
      grade: "V7", // Advanced work
      highlights: [
        "Built and maintained Prefect workflows in Python to automate business processes",
        "Resolved issues with SQL, APIs, JavaScript apps, and AWS (S3, Cognito)",
        "Improved API docs by organizing parameters and enhancing usability",
        "Managed global IT for 80+ users, including MDM, inventory, and tech support",
        "Worked with engineering and product teams to deliver software improvements"
      ]
    },
    {
      company: "YMCA BC",
      role: "Information Systems Coordinator",
      period: "Sep 2022 - Apr 2023",
      grade: "V5",
      highlights: [
        "Worked in a team of six managing IT operations for all YMCA sites throughout BC",
        "Utilized Azure AD and MS Intune to deploy devices and manage all users in the organization",
        "Communicated effectively and timely with hundreds of end-users regarding various technical issues",
        "Trained and mentored new IT staff on best practices",
        "Employed Windows Powershell scripting to deploy applications to Autopilot devices"
      ]
    }
  ],

  projects: [
    {
      name: "Multiplayer IO Game",
      tech: ["JavaScript", "NodeJS", "SocketIO"],
      period: "Oct 2024 - Dec 2024",
      grade: "V8",
      chessRank: "Grandmaster",
      description: "Developing a real-time multiplayer browser game enabling players to compete in an open arena with leaderboard tracking",
      highlights: [
        "Built a custom physics engine for player movement, projectile handling, and collision detection",
        "Designed a scalable server architecture to support simultaneous player connections and game state synchronization"
      ],
      color: "#FF6B6B"
    },
    {
      name: "EduLink Platform",
      tech: ["ReactJS", "NodeJS", "Google Cloud"],
      period: "Jan 2024 - Apr 2024",
      grade: "V7",
      chessRank: "Master",
      description: "An innovative educational web application that seamlessly connects students with tutors or peers based on similar academic interests",
      highlights: [
        "Designed and implemented a scalable microservices architecture, utilizing Google Cloud Platform services",
        "Engineered advanced real-time messaging and collaboration features using Firebase Cloud Messaging and Cloud Firestore"
      ],
      color: "#4ECDC4"
    },
    {
      name: "Spotify Playlist Curator",
      tech: ["ReactJS", "Axios", "MySQL"],
      period: "May 2023 - Sep 2023",
      grade: "V5",
      chessRank: "Expert",
      description: "A ReactJS application that analyzes a user's Spotify account to generate curated playlists",
      highlights: [
        "Implemented Spotify API authentication and data fetching",
        "Utilized SQL queries and Axios requests to store and fetch data from a MySQL database"
      ],
      color: "#95E1D3"
    },
    {
      name: "NHL Statistics Website",
      tech: ["Java", "JavaScript", "HTML", "CSS"],
      period: "May 2022 - Aug 2022",
      grade: "V4",
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
