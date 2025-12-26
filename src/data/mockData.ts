// Mock data for the entire application

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Admin' | 'Manager' | 'Member';
  status: 'online' | 'away' | 'busy' | 'offline';
  department: string;
  skills: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'in-review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignees: User[];
  dueDate: string;
  tags: string[];
  subtasks: { id: string; title: string; completed: boolean }[];
  projectId: string;
  createdAt: string;
  comments: number;
  attachments: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
  status: 'active' | 'on-hold' | 'completed';
  progress: number;
  members: User[];
  tasksCount: number;
  completedTasks: number;
  startDate: string;
  endDate: string;
  type: string;
}

export interface FileItem {
  id: string;
  name: string;
  type: 'image' | 'document' | 'pdf' | 'video' | 'folder';
  size: string;
  uploadedBy: User;
  uploadedAt: string;
  projectId: string;
}

export interface Activity {
  id: string;
  user: User;
  action: string;
  target: string;
  timestamp: string;
  type: 'task' | 'comment' | 'file' | 'project';
}

export interface Message {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  reactions: { emoji: string; count: number }[];
  replies: number;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    role: 'Admin',
    status: 'online',
    department: 'Engineering',
    skills: ['React', 'TypeScript', 'Node.js'],
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus.j@company.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    role: 'Manager',
    status: 'online',
    department: 'Product',
    skills: ['Product Management', 'Agile', 'UX'],
  },
  {
    id: '3',
    name: 'Emily Watson',
    email: 'emily.w@company.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    role: 'Member',
    status: 'away',
    department: 'Design',
    skills: ['UI Design', 'Figma', 'Prototyping'],
  },
  {
    id: '4',
    name: 'David Park',
    email: 'david.p@company.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    role: 'Member',
    status: 'busy',
    department: 'Engineering',
    skills: ['Backend', 'Python', 'AWS'],
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa.t@company.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    role: 'Member',
    status: 'online',
    department: 'Marketing',
    skills: ['Content Strategy', 'SEO', 'Analytics'],
  },
  {
    id: '6',
    name: 'Alex Rivera',
    email: 'alex.r@company.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    role: 'Member',
    status: 'offline',
    department: 'Engineering',
    skills: ['Mobile', 'React Native', 'iOS'],
  },
];

export const currentUser = mockUsers[0];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website with modern design',
    emoji: '🎨',
    color: 'hsl(250, 84%, 54%)',
    status: 'active',
    progress: 68,
    members: [mockUsers[0], mockUsers[2], mockUsers[4]],
    tasksCount: 24,
    completedTasks: 16,
    startDate: '2024-01-15',
    endDate: '2024-03-30',
    type: 'Design',
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native mobile application for iOS and Android platforms',
    emoji: '📱',
    color: 'hsl(173, 80%, 40%)',
    status: 'active',
    progress: 45,
    members: [mockUsers[1], mockUsers[3], mockUsers[5]],
    tasksCount: 32,
    completedTasks: 14,
    startDate: '2024-02-01',
    endDate: '2024-06-15',
    type: 'Development',
  },
  {
    id: '3',
    name: 'Marketing Campaign',
    description: 'Q2 marketing campaign for product launch',
    emoji: '📢',
    color: 'hsl(45, 93%, 47%)',
    status: 'active',
    progress: 82,
    members: [mockUsers[4], mockUsers[1]],
    tasksCount: 18,
    completedTasks: 15,
    startDate: '2024-01-20',
    endDate: '2024-02-28',
    type: 'Marketing',
  },
  {
    id: '4',
    name: 'API Integration',
    description: 'Third-party API integration for payment processing',
    emoji: '🔗',
    color: 'hsl(25, 95%, 53%)',
    status: 'on-hold',
    progress: 30,
    members: [mockUsers[0], mockUsers[3]],
    tasksCount: 12,
    completedTasks: 4,
    startDate: '2024-02-10',
    endDate: '2024-04-10',
    type: 'Development',
  },
  {
    id: '5',
    name: 'User Research',
    description: 'Customer interviews and usability testing',
    emoji: '🔍',
    color: 'hsl(340, 82%, 52%)',
    status: 'completed',
    progress: 100,
    members: [mockUsers[2], mockUsers[1]],
    tasksCount: 8,
    completedTasks: 8,
    startDate: '2024-01-05',
    endDate: '2024-01-25',
    type: 'Research',
  },
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design homepage mockups',
    description: 'Create high-fidelity mockups for the new homepage design',
    status: 'in-progress',
    priority: 'high',
    assignees: [mockUsers[2]],
    dueDate: '2024-02-15',
    tags: ['Design', 'UI/UX'],
    subtasks: [
      { id: '1-1', title: 'Hero section', completed: true },
      { id: '1-2', title: 'Features section', completed: true },
      { id: '1-3', title: 'Footer design', completed: false },
    ],
    projectId: '1',
    createdAt: '2024-02-01',
    comments: 5,
    attachments: 3,
  },
  {
    id: '2',
    title: 'Implement user authentication',
    description: 'Set up OAuth and email/password authentication',
    status: 'todo',
    priority: 'urgent',
    assignees: [mockUsers[0], mockUsers[3]],
    dueDate: '2024-02-12',
    tags: ['Backend', 'Security'],
    subtasks: [
      { id: '2-1', title: 'OAuth setup', completed: false },
      { id: '2-2', title: 'Email verification', completed: false },
    ],
    projectId: '2',
    createdAt: '2024-02-03',
    comments: 8,
    attachments: 1,
  },
  {
    id: '3',
    title: 'Create social media content',
    description: 'Design and schedule posts for product launch',
    status: 'in-review',
    priority: 'medium',
    assignees: [mockUsers[4]],
    dueDate: '2024-02-18',
    tags: ['Marketing', 'Content'],
    subtasks: [
      { id: '3-1', title: 'Instagram posts', completed: true },
      { id: '3-2', title: 'Twitter thread', completed: true },
      { id: '3-3', title: 'LinkedIn article', completed: false },
    ],
    projectId: '3',
    createdAt: '2024-02-05',
    comments: 12,
    attachments: 8,
  },
  {
    id: '4',
    title: 'Set up CI/CD pipeline',
    description: 'Configure automated testing and deployment',
    status: 'completed',
    priority: 'high',
    assignees: [mockUsers[3]],
    dueDate: '2024-02-08',
    tags: ['DevOps', 'Automation'],
    subtasks: [
      { id: '4-1', title: 'GitHub Actions setup', completed: true },
      { id: '4-2', title: 'Docker configuration', completed: true },
    ],
    projectId: '2',
    createdAt: '2024-01-28',
    comments: 3,
    attachments: 2,
  },
  {
    id: '5',
    title: 'Write API documentation',
    description: 'Document all REST endpoints with examples',
    status: 'todo',
    priority: 'low',
    assignees: [mockUsers[0]],
    dueDate: '2024-02-25',
    tags: ['Documentation'],
    subtasks: [],
    projectId: '4',
    createdAt: '2024-02-06',
    comments: 1,
    attachments: 0,
  },
  {
    id: '6',
    title: 'User flow optimization',
    description: 'Analyze and improve the checkout user flow',
    status: 'in-progress',
    priority: 'high',
    assignees: [mockUsers[2], mockUsers[1]],
    dueDate: '2024-02-20',
    tags: ['UX', 'Research'],
    subtasks: [
      { id: '6-1', title: 'Heatmap analysis', completed: true },
      { id: '6-2', title: 'A/B test setup', completed: false },
    ],
    projectId: '1',
    createdAt: '2024-02-04',
    comments: 7,
    attachments: 4,
  },
  {
    id: '7',
    title: 'Database optimization',
    description: 'Improve query performance and add indexes',
    status: 'todo',
    priority: 'medium',
    assignees: [mockUsers[3]],
    dueDate: '2024-02-22',
    tags: ['Backend', 'Performance'],
    subtasks: [],
    projectId: '2',
    createdAt: '2024-02-07',
    comments: 2,
    attachments: 0,
  },
  {
    id: '8',
    title: 'Email newsletter design',
    description: 'Create template for weekly newsletters',
    status: 'in-review',
    priority: 'low',
    assignees: [mockUsers[4], mockUsers[2]],
    dueDate: '2024-02-16',
    tags: ['Design', 'Marketing'],
    subtasks: [
      { id: '8-1', title: 'Header design', completed: true },
      { id: '8-2', title: 'Content blocks', completed: true },
    ],
    projectId: '3',
    createdAt: '2024-02-02',
    comments: 4,
    attachments: 2,
  },
];

// Mock Files
export const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'Homepage_v3.fig',
    type: 'document',
    size: '2.4 MB',
    uploadedBy: mockUsers[2],
    uploadedAt: '2024-02-08',
    projectId: '1',
  },
  {
    id: '2',
    name: 'Brand_Guidelines.pdf',
    type: 'pdf',
    size: '8.1 MB',
    uploadedBy: mockUsers[4],
    uploadedAt: '2024-02-05',
    projectId: '1',
  },
  {
    id: '3',
    name: 'App_Screenshots',
    type: 'folder',
    size: '45 MB',
    uploadedBy: mockUsers[5],
    uploadedAt: '2024-02-07',
    projectId: '2',
  },
  {
    id: '4',
    name: 'Product_Demo.mp4',
    type: 'video',
    size: '156 MB',
    uploadedBy: mockUsers[1],
    uploadedAt: '2024-02-06',
    projectId: '3',
  },
  {
    id: '5',
    name: 'hero-image.png',
    type: 'image',
    size: '1.2 MB',
    uploadedBy: mockUsers[2],
    uploadedAt: '2024-02-08',
    projectId: '1',
  },
];

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: '1',
    user: mockUsers[2],
    action: 'completed task',
    target: 'Design homepage mockups',
    timestamp: '2 minutes ago',
    type: 'task',
  },
  {
    id: '2',
    user: mockUsers[0],
    action: 'commented on',
    target: 'Implement user authentication',
    timestamp: '15 minutes ago',
    type: 'comment',
  },
  {
    id: '3',
    user: mockUsers[4],
    action: 'uploaded file to',
    target: 'Marketing Campaign',
    timestamp: '1 hour ago',
    type: 'file',
  },
  {
    id: '4',
    user: mockUsers[1],
    action: 'created project',
    target: 'Q3 Planning',
    timestamp: '3 hours ago',
    type: 'project',
  },
  {
    id: '5',
    user: mockUsers[3],
    action: 'moved task to In Review',
    target: 'API Integration',
    timestamp: '5 hours ago',
    type: 'task',
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: '1',
    user: mockUsers[1],
    content: 'Hey team! Just wanted to share the updated timeline for the website redesign. We\'re on track for the March launch.',
    timestamp: '10:30 AM',
    reactions: [{ emoji: '👍', count: 4 }, { emoji: '🎉', count: 2 }],
    replies: 3,
  },
  {
    id: '2',
    user: mockUsers[2],
    content: 'I\'ve uploaded the new mockups to the project files. Please take a look and share your feedback!',
    timestamp: '11:15 AM',
    reactions: [{ emoji: '❤️', count: 5 }],
    replies: 7,
  },
  {
    id: '3',
    user: mockUsers[0],
    content: 'Quick reminder: We have a sync call at 2 PM today to discuss the API integration blockers.',
    timestamp: '12:00 PM',
    reactions: [{ emoji: '✅', count: 6 }],
    replies: 0,
  },
];

// Stats for dashboard
export const dashboardStats = {
  activeProjects: 4,
  tasksDueToday: 3,
  pendingReviews: 5,
  teamOnline: 4,
  completionRate: 78,
  weeklyTasks: [
    { day: 'Mon', completed: 8, total: 12 },
    { day: 'Tue', completed: 10, total: 14 },
    { day: 'Wed', completed: 6, total: 10 },
    { day: 'Thu', completed: 12, total: 15 },
    { day: 'Fri', completed: 9, total: 11 },
  ],
  tasksByStatus: {
    todo: 12,
    inProgress: 8,
    inReview: 5,
    completed: 24,
  },
};

// Calendar events
export const calendarEvents = [
  { id: '1', title: 'Team Standup', date: '2024-02-12', time: '09:00', type: 'meeting' },
  { id: '2', title: 'Design Review', date: '2024-02-12', time: '14:00', type: 'meeting' },
  { id: '3', title: 'Homepage mockups due', date: '2024-02-15', type: 'deadline' },
  { id: '4', title: 'Sprint Planning', date: '2024-02-16', time: '10:00', type: 'meeting' },
  { id: '5', title: 'Client Presentation', date: '2024-02-18', time: '15:00', type: 'meeting' },
];

// Notifications
export const mockNotifications = [
  {
    id: '1',
    type: 'mention',
    title: 'Sarah mentioned you',
    message: 'in "Implement user authentication"',
    timestamp: '5 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'task',
    title: 'Task due soon',
    message: 'Homepage mockups is due tomorrow',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'comment',
    title: 'New comment',
    message: 'Marcus commented on your task',
    timestamp: '3 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'project',
    title: 'Project update',
    message: 'Website Redesign reached 70% completion',
    timestamp: 'Yesterday',
    read: true,
  },
];
