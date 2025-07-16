import { useState } from 'react'
import { 
  Trophy, 
  Crown, 
  Medal, 
  Flame, 
  Clock, 
  Target,
  TrendingUp,
  Calendar,
  Users,
  Star,
  Award
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'

export function Leaderboards() {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [selectedUniversity, setSelectedUniversity] = useState('all')

  // Mock data
  const currentUser = {
    id: 'current',
    name: 'You',
    rank: 15,
    points: 1250,
    studyHours: 45,
    streak: 7
  }

  const topPerformers = [
    {
      id: '1',
      name: 'Sarah Chen',
      university: 'MIT',
      major: 'Computer Science',
      points: 2850,
      studyHours: 89,
      streak: 23,
      level: 18,
      avatar: 'SC',
      change: '+2'
    },
    {
      id: '2',
      name: 'Alex Rodriguez',
      university: 'Stanford',
      major: 'Physics',
      points: 2720,
      studyHours: 82,
      streak: 19,
      level: 17,
      avatar: 'AR',
      change: '-1'
    },
    {
      id: '3',
      name: 'Emma Davis',
      university: 'Harvard',
      major: 'Biology',
      points: 2650,
      studyHours: 78,
      streak: 21,
      level: 16,
      avatar: 'ED',
      change: '+1'
    }
  ]

  const leaderboardData = [
    ...topPerformers,
    {
      id: '4',
      name: 'Mike Johnson',
      university: 'MIT',
      major: 'Mathematics',
      points: 2480,
      studyHours: 71,
      streak: 15,
      level: 15,
      avatar: 'MJ',
      change: '0'
    },
    {
      id: '5',
      name: 'Lisa Wang',
      university: 'UCLA',
      major: 'Chemistry',
      points: 2350,
      studyHours: 68,
      streak: 12,
      level: 14,
      avatar: 'LW',
      change: '+3'
    },
    // Add current user
    ...Array.from({ length: 9 }, (_, i) => ({
      id: `user-${i + 6}`,
      name: i === 9 ? currentUser.name : `Student ${i + 6}`,
      university: ['MIT', 'Stanford', 'Harvard', 'UCLA', 'Berkeley'][i % 5],
      major: ['Computer Science', 'Physics', 'Biology', 'Mathematics', 'Chemistry'][i % 5],
      points: 2200 - (i * 150),
      studyHours: 65 - (i * 5),
      streak: 10 - i,
      level: 13 - i,
      avatar: i === 9 ? 'YU' : `S${i + 6}`,
      change: Math.random() > 0.5 ? '+1' : '-1',
      isCurrentUser: i === 9
    }))
  ]

  const achievements = [
    {
      id: '1',
      name: 'Study Warrior',
      description: 'Study for 100+ hours',
      icon: Trophy,
      color: 'text-yellow-500',
      progress: 89,
      total: 100,
      rarity: 'Epic'
    },
    {
      id: '2',
      name: 'Streak Master',
      description: 'Maintain 30-day streak',
      icon: Flame,
      color: 'text-orange-500',
      progress: 23,
      total: 30,
      rarity: 'Rare'
    },
    {
      id: '3',
      name: 'Social Scholar',
      description: 'Help 50 friends',
      icon: Users,
      color: 'text-blue-500',
      progress: 12,
      total: 50,
      rarity: 'Common'
    }
  ]

  const challenges = [
    {
      id: '1',
      name: 'January Study Sprint',
      description: 'Study 40 hours this month',
      participants: 234,
      timeLeft: '12 days',
      reward: '500 points',
      progress: 65,
      isJoined: true
    },
    {
      id: '2',
      name: 'Math Masters Challenge',
      description: 'Complete 100 math problems',
      participants: 89,
      timeLeft: '5 days',
      reward: '300 points',
      progress: 0,
      isJoined: false
    }
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />
      case 2: return <Medal className="w-5 h-5 text-gray-400" />
      case 3: return <Medal className="w-5 h-5 text-amber-600" />
      default: return <span className="text-sm font-bold text-gray-600">#{rank}</span>
    }
  }

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return 'text-green-600'
    if (change.startsWith('-')) return 'text-red-600'
    return 'text-gray-600'
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leaderboards</h1>
          <p className="text-gray-600">Compete with students worldwide</p>
        </div>
        
        <div className="flex space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Universities</SelectItem>
              <SelectItem value="mit">MIT</SelectItem>
              <SelectItem value="stanford">Stanford</SelectItem>
              <SelectItem value="harvard">Harvard</SelectItem>
              <SelectItem value="ucla">UCLA</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Current User Stats */}
      <Card className="border-2 border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">#{currentUser.rank}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Your Ranking</p>
                  <p className="text-sm text-gray-600">Keep climbing!</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-gray-900">{currentUser.points}</p>
                <p className="text-xs text-gray-600">Points</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{currentUser.studyHours}h</p>
                <p className="text-xs text-gray-600">Study Time</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{currentUser.streak}</p>
                <p className="text-xs text-gray-600">Day Streak</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="rankings" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>

        {/* Rankings Tab */}
        <TabsContent value="rankings" className="space-y-4">
          {/* Top 3 Podium */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span>Top Performers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topPerformers.map((user, index) => (
                  <div key={user.id} className={`text-center p-4 rounded-lg ${
                    index === 0 ? 'bg-yellow-50 border-2 border-yellow-200' :
                    index === 1 ? 'bg-gray-50 border-2 border-gray-200' :
                    'bg-amber-50 border-2 border-amber-200'
                  }`}>
                    <div className="flex justify-center mb-3">
                      {getRankIcon(index + 1)}
                    </div>
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarFallback className="bg-gradient-to-br from-orange-400 to-blue-500 text-white font-bold text-lg">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.university}</p>
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold">{user.points}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
                        <span>{user.studyHours}h</span>
                        <span>{user.streak} days</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Full Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>Full Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leaderboardData.map((user, index) => (
                  <div 
                    key={user.id} 
                    className={`flex items-center space-x-4 p-3 rounded-lg transition-colors ${
                      user.isCurrentUser ? 'bg-orange-50 border-2 border-orange-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-center w-8">
                      {getRankIcon(index + 1)}
                    </div>
                    
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-br from-orange-400 to-blue-500 text-white font-semibold">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className={`font-medium truncate ${user.isCurrentUser ? 'text-orange-600' : 'text-gray-900'}`}>
                          {user.name}
                        </h3>
                        {user.isCurrentUser && (
                          <Badge className="bg-orange-500 text-white">You</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">{user.university} • {user.major}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-900">{user.points}</span>
                        <span className={`text-xs ${getChangeColor(user.change)}`}>
                          {user.change !== '0' && user.change}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-gray-600">
                        <span>{user.studyHours}h</span>
                        <span>{user.streak}d</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <Card key={achievement.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <Icon className={`w-6 h-6 ${achievement.color}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                          <Badge variant="secondary">{achievement.rarity}</Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{achievement.progress}/{achievement.total}</span>
                          </div>
                          <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Challenges Tab */}
        <TabsContent value="challenges" className="space-y-4">
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{challenge.name}</h3>
                        {challenge.isJoined && (
                          <Badge className="bg-green-100 text-green-700">Joined</Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span>{challenge.participants} participants</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{challenge.timeLeft} left</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span>{challenge.reward}</span>
                        </div>
                      </div>
                      
                      {challenge.isJoined && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Your Progress</span>
                            <span className="font-medium">{challenge.progress}%</span>
                          </div>
                          <Progress value={challenge.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-4">
                      {challenge.isJoined ? (
                        <Button variant="outline" size="sm">
                          View Progress
                        </Button>
                      ) : (
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                          Join Challenge
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}