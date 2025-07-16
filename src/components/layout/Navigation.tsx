import { useState } from 'react'
import { 
  Home, 
  BookOpen, 
  Users, 
  Trophy, 
  Brain, 
  User,
  Menu,
  X,
  Flame,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
  user?: any
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'materials', label: 'Materials', icon: BookOpen },
  { id: 'friends', label: 'Friends', icon: Users },
  { id: 'leaderboards', label: 'Rankings', icon: Trophy },
  { id: 'quiz', label: 'Quiz', icon: Brain },
  { id: 'profile', label: 'Profile', icon: User },
]

export function Navigation({ currentPage, onPageChange, user }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 studymate-gradient rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">StudyMate</h1>
            {user && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>{user.studyStreak || 0} day streak</span>
                <Clock className="w-4 h-4 text-blue-500 ml-2" />
                <span>{user.totalStudyHours || 0}h</span>
              </div>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="bg-white w-64 h-full p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 studymate-gradient rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold">StudyMate</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onPageChange(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={cn(
                      'w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors',
                      currentPage === item.id
                        ? 'bg-orange-50 text-orange-600 border border-orange-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
        <div className="flex-1 flex flex-col min-h-0">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 studymate-gradient rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">StudyMate</span>
            </div>
          </div>

          {/* User Stats */}
          {user && (
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.displayName || 'Student'}</p>
                  <p className="text-sm text-gray-600">Level {user.level || 1}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-orange-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-orange-700">Streak</span>
                  </div>
                  <p className="text-lg font-bold text-orange-600">{user.studyStreak || 0}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-700">Hours</span>
                  </div>
                  <p className="text-lg font-bold text-blue-600">{user.totalStudyHours || 0}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={cn(
                    'w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors',
                    currentPage === item.id
                      ? 'bg-orange-50 text-orange-600 border border-orange-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.id === 'quiz' && (
                    <Badge variant="secondary" className="ml-auto">
                      New
                    </Badge>
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={cn(
                  'flex flex-col items-center space-y-1 px-2 py-1 rounded-lg transition-colors',
                  currentPage === item.id
                    ? 'text-orange-600'
                    : 'text-gray-600'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}