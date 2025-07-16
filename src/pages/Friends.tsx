import { useState } from 'react'
import { 
  Users, 
  UserPlus, 
  Search, 
  MessageCircle, 
  Trophy, 
  Clock,
  Flame,
  Star,
  Plus,
  Check,
  X,
  Crown,
  Target,
  Calendar
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export function Friends() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddFriendDialogOpen, setIsAddFriendDialogOpen] = useState(false)

  // Mock data
  const friends = [
    {
      id: '1',
      name: 'Sarah Chen',
      university: 'MIT',
      major: 'Computer Science',
      level: 15,
      studyStreak: 12,
      totalHours: 245,
      status: 'online',
      lastActive: 'Active now',
      avatar: 'SC',
      recentActivity: 'Completed 3h of Algorithms study'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      university: 'Stanford',
      major: 'Physics',
      level: 12,
      studyStreak: 8,
      totalHours: 189,
      status: 'studying',
      lastActive: '2 hours ago',
      avatar: 'MJ',
      recentActivity: 'Started Quantum Mechanics session'
    },
    {
      id: '3',
      name: 'Emma Davis',
      university: 'Harvard',
      major: 'Biology',
      level: 18,
      studyStreak: 15,
      totalHours: 312,
      status: 'offline',
      lastActive: '1 day ago',
      avatar: 'ED',
      recentActivity: 'Joined Organic Chemistry group'
    }
  ]

  const friendRequests = [
    {
      id: '1',
      name: 'Alex Rodriguez',
      university: 'UCLA',
      major: 'Mathematics',
      mutualFriends: 3,
      avatar: 'AR'
    },
    {
      id: '2',
      name: 'Lisa Wang',
      university: 'MIT',
      major: 'Computer Science',
      mutualFriends: 5,
      avatar: 'LW'
    }
  ]

  const studyGroups = [
    {
      id: '1',
      name: 'Advanced Calculus Study Group',
      subject: 'Mathematics',
      members: 12,
      university: 'MIT',
      nextSession: '2024-01-20 14:00',
      isJoined: true
    },
    {
      id: '2',
      name: 'Organic Chemistry Masters',
      subject: 'Chemistry',
      members: 8,
      university: 'Harvard',
      nextSession: '2024-01-21 16:00',
      isJoined: false
    },
    {
      id: '3',
      name: 'Physics Problem Solvers',
      subject: 'Physics',
      members: 15,
      university: 'Stanford',
      nextSession: '2024-01-22 10:00',
      isJoined: true
    }
  ]

  const suggestions = [
    {
      id: '1',
      name: 'David Kim',
      university: 'MIT',
      major: 'Computer Science',
      mutualFriends: 2,
      reason: 'Same university and major',
      avatar: 'DK'
    },
    {
      id: '2',
      name: 'Sophie Brown',
      university: 'Stanford',
      major: 'Physics',
      mutualFriends: 1,
      reason: 'Similar study interests',
      avatar: 'SB'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'studying': return 'bg-orange-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online'
      case 'studying': return 'Studying'
      case 'offline': return 'Offline'
      default: return 'Unknown'
    }
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Friends & Social</h1>
          <p className="text-gray-600">Connect with fellow students and study together</p>
        </div>
        
        <Dialog open={isAddFriendDialogOpen} onOpenChange={setIsAddFriendDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Friend
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Friend</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search by name or email..." className="pl-10" />
              </div>
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Enter a name or email to find friends</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="friends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="requests">
            Requests
            {friendRequests.length > 0 && (
              <Badge className="ml-2 bg-orange-500 text-white">
                {friendRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>

        {/* Friends Tab */}
        <TabsContent value="friends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {friends.map((friend) => (
              <Card key={friend.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-blue-500 text-white font-semibold">
                          {friend.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(friend.status)} rounded-full border-2 border-white`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 truncate">{friend.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          Level {friend.level}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600">{friend.university} • {friend.major}</p>
                      <p className="text-xs text-gray-500 mb-2">{getStatusText(friend.status)} • {friend.lastActive}</p>
                      
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="flex items-center space-x-1 text-xs">
                          <Flame className="w-3 h-3 text-orange-500" />
                          <span>{friend.studyStreak} days</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs">
                          <Clock className="w-3 h-3 text-blue-500" />
                          <span>{friend.totalHours}h</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-3">{friend.recentActivity}</p>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trophy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Friend Requests Tab */}
        <TabsContent value="requests" className="space-y-4">
          {friendRequests.length > 0 ? (
            <div className="space-y-4">
              {friendRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-blue-500 text-white font-semibold">
                          {request.avatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{request.name}</h3>
                        <p className="text-sm text-gray-600">{request.university} • {request.major}</p>
                        <p className="text-xs text-gray-500">{request.mutualFriends} mutual friends</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                          <Check className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                        <Button size="sm" variant="outline">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No friend requests</h3>
              <p className="text-gray-600">You're all caught up!</p>
            </div>
          )}
        </TabsContent>

        {/* Study Groups Tab */}
        <TabsContent value="groups" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Study Groups</h3>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </div>
          
          <div className="space-y-4">
            {studyGroups.map((group) => (
              <Card key={group.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{group.name}</h3>
                        {group.isJoined && (
                          <Badge className="bg-green-100 text-green-700">
                            <Check className="w-3 h-3 mr-1" />
                            Joined
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>{group.subject} • {group.university}</p>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{group.members} members</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Next: {new Date(group.nextSession).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {group.isJoined ? (
                        <Button size="sm" variant="outline">
                          View Group
                        </Button>
                      ) : (
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                          Join Group
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Discover Tab */}
        <TabsContent value="discover" className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">People You May Know</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {suggestions.map((suggestion) => (
                <Card key={suggestion.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-blue-500 text-white font-semibold">
                          {suggestion.avatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{suggestion.name}</h3>
                        <p className="text-sm text-gray-600">{suggestion.university} • {suggestion.major}</p>
                        <p className="text-xs text-gray-500">{suggestion.reason}</p>
                        <p className="text-xs text-gray-500">{suggestion.mutualFriends} mutual friends</p>
                      </div>
                      
                      <Button size="sm" variant="outline">
                        <UserPlus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}