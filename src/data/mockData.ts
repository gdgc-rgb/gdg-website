export interface TeamMember {
  id: number;
  name: string;
  position: string;
  photoUrl: string;
  bio?: string;
}

export interface Certificate {
  id: number;
  title: string;
  icon: string;
  description: string;
  color: string;
}

export interface CommunityHighlight {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Johnson",
    position: "Lead Organizer",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Cloud architect with 5+ years of GCP experience"
  },
  {
    id: 2,
    name: "Sarah Chen",
    position: "Technical Coordinator",
    photoUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b5ad?w=400&h=400&fit=crop&crop=face",
    bio: "Full-stack developer passionate about cloud technologies"
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    position: "Community Manager",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Building communities and connecting developers worldwide"
  },
  {
    id: 4,
    name: "Emily Zhang",
    position: "Content Creator",
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    bio: "Creating engaging content for cloud learning journeys"
  },
  {
    id: 5,
    name: "David Kim",
    position: "Workshop Facilitator",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    bio: "Hands-on workshop expert in machine learning and AI"
  },
  {
    id: 6,
    name: "Lisa Thompson",
    position: "Event Coordinator",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    bio: "Organizing seamless events and memorable experiences"
  }
];

export const certificates: Certificate[] = [
  {
    id: 1,
    title: "Cloud Digital Leader",
    icon: "🏆",
    description: "Demonstrate fundamental knowledge of cloud concepts",
    color: "gcp-blue"
  },
  {
    id: 2,
    title: "Associate Cloud Engineer",
    icon: "⚙️",
    description: "Deploy applications, monitor operations, and manage solutions",
    color: "gcp-green"
  },
  {
    id: 3,
    title: "Cloud Architect",
    icon: "🏗️",
    description: "Design and plan cloud solution architectures",
    color: "gcp-yellow"
  },
  {
    id: 4,
    title: "Data Engineer",
    icon: "📊",
    description: "Design and build data processing systems",
    color: "gcp-red"
  }
];

export const swags: Certificate[] = [
  {
    id: 1,
    title: "Google Cloud T-Shirt",
    icon: "👕",
    description: "Exclusive GCSJ branded apparel",
    color: "gcp-blue"
  },
  {
    id: 2,
    title: "GCP Sticker Pack",
    icon: "🏷️",
    description: "Collection of Google Cloud stickers",
    color: "gcp-green"
  },
  {
    id: 3,
    title: "Cloud Champion Badge",
    icon: "🎖️",
    description: "Digital badge for LinkedIn profile",
    color: "gcp-yellow"
  },
  {
    id: 4,
    title: "Google Cloud Mug",
    icon: "☕",
    description: "Keep your coffee cloud-ready",
    color: "gcp-red"
  }
];

export const communityHighlights: CommunityHighlight[] = [
  {
    id: 1,
    title: "Learn Together",
    description: "Join study groups, participate in discussions, and learn from peers in a collaborative environment.",
    icon: "🤝",
    color: "gcp-blue"
  },
  {
    id: 2,
    title: "Build Projects",
    description: "Work on real-world projects using Google Cloud Platform and showcase your skills to the community.",
    icon: "🚀",
    color: "gcp-green"
  },
  {
    id: 3,
    title: "Network & Grow",
    description: "Connect with industry professionals, mentors, and fellow developers to expand your network.",
    icon: "🌐",
    color: "gcp-yellow"
  },
  {
    id: 4,
    title: "Career Opportunities",
    description: "Access exclusive job opportunities, internships, and career guidance from our industry partners.",
    icon: "💼",
    color: "gcp-red"
  }
];

export const communityInfo = {
  mission: "Our mission is to create an inclusive and collaborative environment where students and professionals can learn, grow, and excel in cloud technologies. We believe in the power of community-driven learning and aim to make Google Cloud Platform accessible to everyone.",
  stats: {
    members: "2,500+",
    events: "150+",
    projects: "200+",
    certifications: "500+"
  }
};