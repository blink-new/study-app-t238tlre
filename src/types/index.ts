export interface User {
  id: string
  email: string
  displayName?: string
  avatarUrl?: string
  university?: string
  major?: string
  yearOfStudy?: number
  studyStreak: number
  totalStudyHours: number
  points: number
  level: number
  createdAt: string
  updatedAt: string
}

export interface StudySession {
  id: string
  userId: string
  subject: string
  durationMinutes: number
  notes?: string
  sessionDate: string
  createdAt: string
}

export interface StudyMaterial {
  id: string
  userId: string
  title: string
  subject: string
  materialType: 'note' | 'flashcard' | 'document' | 'video'
  content?: string
  fileUrl?: string
  tags: string[]
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export interface Friendship {
  id: string
  userId: string
  friendId: string
  status: 'pending' | 'accepted' | 'blocked'
  createdAt: string
}

export interface StudyGroup {
  id: string
  name: string
  description?: string
  subject?: string
  creatorId: string
  university?: string
  isPublic: boolean
  memberLimit: number
  createdAt: string
}

export interface Achievement {
  id: string
  userId: string
  achievementType: 'streak' | 'hours' | 'sessions' | 'social'
  achievementName: string
  description?: string
  icon?: string
  earnedAt: string
}

export interface QuizQuestion {
  id: string
  userId: string
  subject: string
  question: string
  options: string[]
  correctAnswer: number
  difficulty: 'easy' | 'medium' | 'hard'
  isPublic: boolean
  createdAt: string
}

export interface StudyChallenge {
  id: string
  creatorId: string
  title: string
  description?: string
  challengeType: 'hours' | 'streak' | 'sessions' | 'quiz'
  targetValue: number
  durationDays: number
  startDate: string
  endDate: string
  isPublic: boolean
  createdAt: string
}