import { useState } from 'react'
import { 
  BookOpen, 
  FileText, 
  Video, 
  Brain, 
  Plus, 
  Search, 
  Filter,
  Download,
  Share,
  Edit,
  Trash2,
  Eye,
  Clock,
  Tag
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useStudyData } from '@/hooks/useStudyData'
import { useToast } from '@/hooks/use-toast'

export function StudyMaterials() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  
  const { studyMaterials, saveMaterial, deleteMaterial, updateMaterialViews } = useStudyData()
  const { toast } = useToast()
  
  // Form state for creating new materials
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    subject: '',
    type: '',
    content: '',
    tags: ''
  })

  const subjects = ['all', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science']

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'note': return FileText
      case 'flashcard': return Brain
      case 'document': return BookOpen
      case 'video': return Video
      default: return FileText
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'note': return 'bg-blue-100 text-blue-700'
      case 'flashcard': return 'bg-purple-100 text-purple-700'
      case 'document': return 'bg-green-100 text-green-700'
      case 'video': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setNewMaterial(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle creating new material
  const handleCreateMaterial = async () => {
    if (!newMaterial.title || !newMaterial.subject || !newMaterial.type || !newMaterial.content) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    try {
      const tagsArray = newMaterial.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      
      await saveMaterial({
        title: newMaterial.title,
        subject: newMaterial.subject,
        materialType: newMaterial.type as 'note' | 'flashcard' | 'document' | 'video',
        content: newMaterial.content,
        tags: tagsArray,
        isPublic: false
      })
      
      toast({
        title: "Material created! 📚",
        description: `Your ${newMaterial.type} "${newMaterial.title}" has been saved.`,
      })
      
      // Reset form
      setNewMaterial({
        title: '',
        subject: '',
        type: '',
        content: '',
        tags: ''
      })
      
      setIsCreateDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error creating material",
        description: "There was a problem saving your material.",
        variant: "destructive"
      })
    }
  }

  const handleDeleteMaterial = async (materialId: string, title: string) => {
    try {
      await deleteMaterial(materialId)
      toast({
        title: "Material deleted",
        description: `"${title}" has been removed.`,
      })
    } catch (error) {
      toast({
        title: "Error deleting material",
        description: "There was a problem deleting the material.",
        variant: "destructive"
      })
    }
  }

  const handleViewMaterial = async (materialId: string) => {
    try {
      await updateMaterialViews(materialId)
    } catch (error) {
      console.error('Error updating views:', error)
    }
  }

  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (material.content || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesSubject = selectedSubject === 'all' || material.subject === selectedSubject
    return matchesSearch && matchesSubject
  })

  return (
    <div className="p-4 lg:p-6 space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Study Materials</h1>
          <p className="text-gray-600">Organize and access your learning resources</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Material
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Material</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter material title" 
                  value={newMaterial.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select value={newMaterial.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.slice(1).map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={newMaterial.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="note">Note</SelectItem>
                    <SelectItem value="flashcard">Flashcard</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  placeholder="Enter your content here..." 
                  rows={4}
                  value={newMaterial.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input 
                  id="tags" 
                  placeholder="e.g. calculus, integration, advanced"
                  value={newMaterial.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                  onClick={handleCreateMaterial}
                >
                  Create Material
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search materials, tags, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-full lg:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {subjects.map(subject => (
              <SelectItem key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Materials Tabs */}
      <Tabs defaultValue="my-materials" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-materials">My Materials</TabsTrigger>
          <TabsTrigger value="public-materials">Public Library</TabsTrigger>
        </TabsList>

        <TabsContent value="my-materials" className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Notes</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {studyMaterials.filter(m => m.materialType === 'note').length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">Flashcards</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {studyMaterials.filter(m => m.materialType === 'flashcard').length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Documents</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {studyMaterials.filter(m => m.materialType === 'document').length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Video className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium">Videos</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {studyMaterials.filter(m => m.materialType === 'video').length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredMaterials.map((material) => {
              const TypeIcon = getTypeIcon(material.materialType)
              return (
                <Card key={material.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <TypeIcon className="w-4 h-4 text-gray-600" />
                        <Badge className={getTypeColor(material.materialType)}>
                          {material.materialType}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteMaterial(material.id, material.title)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{material.title}</CardTitle>
                    <p className="text-sm text-gray-600">{material.subject}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {material.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {material.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {material.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{material.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(material.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{material.views} views</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleViewMaterial(material.id)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredMaterials.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No materials found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || selectedSubject !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Start by creating your first study material'
                }
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Material
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="public-materials" className="space-y-4">
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Public Library</h3>
            <p className="text-gray-600 mb-4">
              Discover study materials shared by other students
            </p>
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Browse Public Materials
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}