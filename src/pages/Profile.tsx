import { useState } from 'react'
import { 
  User, 
  Edit, 
  Camera, 
  Trophy, 
  Clock, 
  Flame, 
  Star,
  BookOpen,
  Users,
  Target,
  Calendar,
  Settings,
  LogOut,
  Save,
  X
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useStudyData } from '@/hooks/useStudyData'
import { useToast } from '@/hooks/use-toast'
import blink from '@/blink/client'

interface ProfileProps {
  user?: any
}

export function Profile({ user }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  
  const { user: userData, studySessions, studyMaterials, updateProfile } = useStudyData()
  const { toast } = useToast()
  
  // Use userData from hook if available, fallback to prop
  const currentUser = userData || user
  
  const [editedProfile, setEditedProfile] = useState({
    displayName: currentUser?.displayName || 'Student',
    university: currentUser?.university || 'MIT',
    major: currentUser?.major || 'Computer Science',
    yearOfStudy: currentUser?.yearOfStudy || 2,
    bio: currentUser?.bio || 'Passionate about learning and helping others succeed in their academic journey.'
  })

  // Calculate stats from actual data
  const profileStats = {
    level: currentUser?.level || 1,
    points: currentUser?.points || 0,
    studyStreak: currentUser?.studyStreak || 0,
    totalStudyHours: currentUser?.totalStudyHours || 0,
    materialsCreated: studyMaterials.length,
    friendsCount: 0, // Would come from friends data
    quizzesCompleted: 0, // Would come from quiz attempts
    averageScore: 0 // Would be calculated from quiz attempts
  }

  const achievements = [
    {
      id: '1',
      name: 'Study Warrior',
      description: 'Study for 100+ hours',
      icon: Trophy,
      color: 'text-yellow-500',
      earned: true,
      earnedDate: '2024-01-10'
    },
    {
      id: '2',
      name: 'Streak Master',
      description: 'Maintain 15-day streak',
      icon: Flame,
      color: 'text-orange-500',
      earned: true,
      earnedDate: '2024-01-15'
    },
    {
      id: '3',
      name: 'Social Scholar',
      description: 'Help 50 friends',
      icon: Users,
      color: 'text-blue-500',
      earned: false,
      progress: 45,
      total: 50
    },
    {
      id: '4',
      name: 'Quiz Master',
      description: 'Complete 100 quizzes',
      icon: Star,
      color: 'text-purple-500',
      earned: false,
      progress: 67,
      total: 100
    }
  ]

  const recentActivity = [
    {
      id: '1',
      type: 'study',
      description: 'Completed 2h study session in Mathematics',
      date: '2024-01-15',
      icon: Clock
    },
    {
      id: '2',
      type: 'achievement',
      description: 'Earned "Streak Master" achievement',
      date: '2024-01-15',
      icon: Trophy
    },
    {
      id: '3',
      type: 'quiz',
      description: 'Scored 95% on Physics Mechanics quiz',
      date: '2024-01-14',
      icon: Star
    },
    {
      id: '4',
      type: 'social',
      description: 'Added 3 new friends',
      date: '2024-01-14',
      icon: Users
    }
  ]

  const studyGoals = [
    {
      id: '1',
      title: 'Study 40 hours this month',
      progress: 32,
      target: 40,
      deadline: '2024-01-31',
      category: 'time'
    },
    {
      id: '2',
      title: 'Complete 20 quizzes',
      progress: 15,
      target: 20,
      deadline: '2024-01-31',
      category: 'quiz'
    },
    {
      id: '3',
      title: 'Maintain 30-day streak',
      progress: 15,
      target: 30,
      deadline: '2024-02-15',
      category: 'streak'
    }
  ]

  const handleSaveProfile = async () => {
    try {
      await updateProfile(editedProfile)
      toast({
        title: "Profile updated! ✨",
        description: "Your profile information has been saved successfully.",
      })
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: "There was a problem saving your profile changes.",
        variant: "destructive"
      })
    }
  }

  const handleCancelEdit = () => {
    setEditedProfile({
      displayName: currentUser?.displayName || 'Student',
      university: currentUser?.university || 'MIT',
      major: currentUser?.major || 'Computer Science',
      yearOfStudy: currentUser?.yearOfStudy || 2,
      bio: currentUser?.bio || 'Passionate about learning and helping others succeed in their academic journey.'
    })
    setIsEditing(false)
  }

  const handleSignOut = () => {
    blink.auth.logout()
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'study': return Clock
      case 'achievement': return Trophy
      case 'quiz': return Star
      case 'social': return Users
      default: return BookOpen
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'study': return 'text-blue-500'
      case 'achievement': return 'text-yellow-500'
      case 'quiz': return 'text-purple-500'
      case 'social': return 'text-green-500'
      default: return 'text-gray-500'
    }
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-gradient-to-br from-orange-400 to-blue-500 text-white font-bold text-2xl">
                {editedProfile.displayName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button size="sm" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0">
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={editedProfile.displayName}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, displayName: e.target.value }))}
                  className="text-xl font-bold"
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <Select value={editedProfile.university} onValueChange={(value) => setEditedProfile(prev => ({ ...prev, university: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MIT">MIT</SelectItem>
                      <SelectItem value="Stanford">Stanford</SelectItem>
                      <SelectItem value="Harvard">Harvard</SelectItem>
                      <SelectItem value="UCLA">UCLA</SelectItem>
                      <SelectItem value="Berkeley">UC Berkeley</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={editedProfile.major}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, major: e.target.value }))}
                    placeholder="Major"
                  />
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{editedProfile.displayName}</h1>
                <p className="text-gray-600">{editedProfile.university} • {editedProfile.major}</p>
                <p className="text-sm text-gray-500">Year {editedProfile.yearOfStudy} • Level {profileStats.level}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button onClick={handleSaveProfile} className="bg-green-500 hover:bg-green-600 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancelEdit} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(true)} variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Bio */}
      {isEditing ? (
        <Card>
          <CardContent className="p-4">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={editedProfile.bio}
              onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
              rows={3}
              className="mt-2"
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-4">
            <p className="text-gray-700">{editedProfile.bio}</p>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{profileStats.points}</p>
            <p className="text-sm text-gray-600">Total Points</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{profileStats.studyStreak}</p>
            <p className="text-sm text-gray-600">Day Streak</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{profileStats.totalStudyHours}</p>
            <p className="text-sm text-gray-600">Study Hours</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{profileStats.averageScore}%</p>
            <p className="text-sm text-gray-600">Quiz Average</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="achievements" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <Card key={achievement.id} className={achievement.earned ? 'border-yellow-200 bg-yellow-50' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                        <Icon className={`w-6 h-6 ${achievement.earned ? achievement.color : 'text-gray-400'}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                          {achievement.earned && (
                            <Badge className="bg-yellow-500 text-white">Earned</Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                        
                        {achievement.earned ? (
                          <p className="text-xs text-gray-500">
                            Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                          </p>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium">{achievement.progress}/{achievement.total}</span>
                            </div>
                            <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <div className="space-y-3">
            {recentActivity.map((activity) => {
              const Icon = getActivityIcon(activity.type)
              return (
                <Card key={activity.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Icon className={`w-5 h-5 ${getActivityColor(activity.type)}`} />
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-gray-900">{activity.description}</p>
                        <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Study Goals</h3>
            <Button variant="outline" size="sm">
              <Target className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
          </div>
          
          <div className="space-y-4">
            {studyGoals.map((goal) => (
              <Card key={goal.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Due {new Date(goal.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">{goal.category}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{goal.progress}/{goal.target}</span>
                    </div>
                    <Progress value={(goal.progress / goal.target) * 100} className="h-2" />
                    <p className="text-xs text-gray-500">
                      {Math.round((goal.progress / goal.target) * 100)}% complete
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Logout Button */}
      <Card className="border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Account</h3>
              <p className="text-sm text-gray-600">Manage your account settings</p>
            </div>
            <Button 
              variant="outline" 
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}