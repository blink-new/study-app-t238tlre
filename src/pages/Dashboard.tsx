import { useState, useEffect } from 'react'
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Users, 
  Trophy,
  Play,
  Pause,
  Square,
  Plus,
  Calendar,
  Flame,
  Star
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

interface DashboardProps {
  user?: any
}

export function Dashboard({ user }: DashboardProps) {
  const [isStudying, setIsStudying] = useState(false)
  const [studyTime, setStudyTime] = useState(0)
  const [currentSubject, setCurrentSubject] = useState('')

  // Mock data for demonstration
  const todayGoal = 4 // hours
  const todayProgress = 2.5 // hours
  const weeklyStreak = user?.studyStreak || 7
  const totalPoints = user?.points || 1250

  const recentSessions = [
    { subject: 'Mathematics', duration: 90, date: 'Today' },
    { subject: 'Physics', duration: 60, date: 'Yesterday' },
    { subject: 'Chemistry', duration: 120, date: 'Yesterday' },
  ]

  const friendsActivity = [
    { name: 'Sarah Chen', action: 'completed 2h of Biology', time: '30 min ago', avatar: 'SC' },
    { name: 'Mike Johnson', action: 'achieved 10-day streak!', time: '1h ago', avatar: 'MJ' },
    { name: 'Emma Davis', action: 'joined Physics study group', time: '2h ago', avatar: 'ED' },
  ]

  const achievements = [
    { name: 'Study Streak', description: '7 days in a row', icon: Flame, color: 'text-orange-500' },
    { name: 'Night Owl', description: 'Study after 10 PM', icon: Star, color: 'text-purple-500' },
    { name: 'Social Learner', description: 'Join 5 study groups', icon: Users, color: 'text-blue-500' },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isStudying) {
      interval = setInterval(() => {
        setStudyTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isStudying])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startStudySession = () => {
    if (!currentSubject) {
      setCurrentSubject('General Study')
    }
    setIsStudying(true)
  }

  const pauseStudySession = () => {
    setIsStudying(false)
  }

  const stopStudySession = () => {
    setIsStudying(false)
    setStudyTime(0)
    setCurrentSubject('')
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 pb-20 lg:pb-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-orange-500 to-blue-500 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.displayName || 'Student'}! 👋
        </h1>
        <p className="text-orange-100">
          Ready to continue your learning journey? You're doing great!
        </p>
      </div>

      {/* Study Timer Card */}
      <Card className="border-2 border-dashed border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span>Study Session</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-mono font-bold text-orange-600 mb-2">
              {formatTime(studyTime)}
            </div>
            {currentSubject && (
              <p className="text-sm text-gray-600">Studying: {currentSubject}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="What are you studying?"
              value={currentSubject}
              onChange={(e) => setCurrentSubject(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={isStudying}
            />
          </div>

          <div className="flex items-center justify-center space-x-3">
            {!isStudying ? (
              <Button 
                onClick={startStudySession}
                className="bg-orange-500 hover:bg-orange-600 text-white"
                disabled={!currentSubject}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Session
              </Button>
            ) : (
              <>
                <Button 
                  onClick={pauseStudySession}
                  variant="outline"
                  className="border-orange-500 text-orange-600"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
                <Button 
                  onClick={stopStudySession}
                  variant="outline"
                  className="border-red-500 text-red-600"
                >
                  <Square className="w-4 h-4 mr-2" />
                  Stop
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-600">Today's Goal</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold text-gray-900">{todayProgress}</span>
                <span className="text-sm text-gray-500">/ {todayGoal}h</span>
              </div>
              <Progress value={(todayProgress / todayGoal) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-600">Study Streak</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{weeklyStreak} days</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-600">Total Points</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalPoints.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-600">This Week</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">12.5h</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Friends */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Study Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Sessions</span>
              <Button variant="ghost" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{session.subject}</p>
                  <p className="text-sm text-gray-600">{session.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{session.duration}m</p>
                  <Badge variant="secondary" className="text-xs">
                    Completed
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Friends Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Friends Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {friendsActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">{activity.avatar}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.name}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Icon className={`w-6 h-6 ${achievement.color}`} />
                  <div>
                    <p className="font-medium text-gray-900">{achievement.name}</p>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Button variant="outline" className="h-20 flex-col space-y-2">
          <BookOpen className="w-6 h-6" />
          <span>Add Material</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col space-y-2">
          <Users className="w-6 h-6" />
          <span>Find Friends</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col space-y-2">
          <Calendar className="w-6 h-6" />
          <span>Schedule</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col space-y-2">
          <Trophy className="w-6 h-6" />
          <span>Challenges</span>
        </Button>
      </div>
    </div>
  )
}