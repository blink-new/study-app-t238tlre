import { useState, useEffect } from 'react'
import blink from '@/blink/client'

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
  views: number
  createdAt: string
  updatedAt: string
}

export interface Quiz {
  id: string
  userId: string
  title: string
  subject: string
  description?: string
  difficulty: 'easy' | 'medium' | 'hard'
  timeLimitMinutes: number
  isPublic: boolean
  attempts: number
  averageScore: number
  tags: string[]
  questions: QuizQuestion[]
  createdAt: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface UserProfile {
  id: string
  email: string
  displayName?: string
  university?: string
  major?: string
  yearOfStudy?: number
  studyStreak: number
  totalStudyHours: number
  points: number
  level: number
  bio?: string
  lastStudyDate?: string
}

export function useStudyData() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [studySessions, setStudySessions] = useState<StudySession[]>([])
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  // Initialize with auth state
  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setIsLoading(state.isLoading)
      
      if (state.user) {
        loadUserData(state.user.id)
      }
    })
    return unsubscribe
  }, [])

  const loadUserData = async (userId: string) => {
    try {
      // Load user profile data from localStorage for now
      const savedProfile = localStorage.getItem(`profile_${userId}`)
      if (savedProfile) {
        const profile = JSON.parse(savedProfile)
        setUser(prev => ({ ...prev, ...profile }))
      }

      // Load study sessions
      const savedSessions = localStorage.getItem(`sessions_${userId}`)
      if (savedSessions) {
        setStudySessions(JSON.parse(savedSessions))
      }

      // Load study materials
      const savedMaterials = localStorage.getItem(`materials_${userId}`)
      if (savedMaterials) {
        setStudyMaterials(JSON.parse(savedMaterials))
      }

      // Load quizzes
      const savedQuizzes = localStorage.getItem(`quizzes_${userId}`)
      if (savedQuizzes) {
        setQuizzes(JSON.parse(savedQuizzes))
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    }
  }

  const saveStudySession = async (session: Omit<StudySession, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return

    const newSession: StudySession = {
      id: `session_${Date.now()}`,
      userId: user.id,
      createdAt: new Date().toISOString(),
      ...session
    }

    const updatedSessions = [newSession, ...studySessions]
    setStudySessions(updatedSessions)
    localStorage.setItem(`sessions_${user.id}`, JSON.stringify(updatedSessions))

    // Update user stats
    const updatedUser = {
      ...user,
      totalStudyHours: (user.totalStudyHours || 0) + (session.durationMinutes / 60),
      points: (user.points || 0) + Math.floor(session.durationMinutes * 2),
      lastStudyDate: session.sessionDate
    }

    // Update streak
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    
    if (session.sessionDate === today) {
      if (user.lastStudyDate === yesterday || !user.lastStudyDate) {
        updatedUser.studyStreak = (user.studyStreak || 0) + 1
      }
    }

    setUser(updatedUser)
    localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedUser))

    return newSession
  }

  const saveMaterial = async (material: Omit<StudyMaterial, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'views'>) => {
    if (!user) return

    const newMaterial: StudyMaterial = {
      id: `material_${Date.now()}`,
      userId: user.id,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...material
    }

    const updatedMaterials = [newMaterial, ...studyMaterials]
    setStudyMaterials(updatedMaterials)
    localStorage.setItem(`materials_${user.id}`, JSON.stringify(updatedMaterials))

    return newMaterial
  }

  const saveQuiz = async (quiz: Omit<Quiz, 'id' | 'userId' | 'createdAt' | 'attempts' | 'averageScore'>) => {
    if (!user) return

    const newQuiz: Quiz = {
      id: `quiz_${Date.now()}`,
      userId: user.id,
      attempts: 0,
      averageScore: 0,
      createdAt: new Date().toISOString(),
      ...quiz
    }

    const updatedQuizzes = [newQuiz, ...quizzes]
    setQuizzes(updatedQuizzes)
    localStorage.setItem(`quizzes_${user.id}`, JSON.stringify(updatedQuizzes))

    return newQuiz
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return

    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedUser))

    return updatedUser
  }

  const deleteMaterial = async (materialId: string) => {
    const updatedMaterials = studyMaterials.filter(m => m.id !== materialId)
    setStudyMaterials(updatedMaterials)
    localStorage.setItem(`materials_${user.id}`, JSON.stringify(updatedMaterials))
  }

  const updateMaterialViews = async (materialId: string) => {
    const updatedMaterials = studyMaterials.map(m => 
      m.id === materialId ? { ...m, views: m.views + 1 } : m
    )
    setStudyMaterials(updatedMaterials)
    localStorage.setItem(`materials_${user.id}`, JSON.stringify(updatedMaterials))
  }

  return {
    user,
    isLoading,
    studySessions,
    studyMaterials,
    quizzes,
    saveStudySession,
    saveMaterial,
    saveQuiz,
    updateProfile,
    deleteMaterial,
    updateMaterialViews
  }
}