import { useState } from 'react'
import { 
  Brain, 
  Play, 
  Clock, 
  Target, 
  Trophy,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  RotateCcw,
  Star,
  Users,
  BookOpen
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function Quiz() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [currentQuiz, setCurrentQuiz] = useState<any>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [quizResults, setQuizResults] = useState<any>(null)

  // Mock data
  const quizzes = [
    {
      id: '1',
      title: 'Calculus Fundamentals',
      subject: 'Mathematics',
      difficulty: 'medium',
      questions: 15,
      timeLimit: 30,
      attempts: 234,
      averageScore: 78,
      creator: 'Dr. Smith',
      isPublic: true,
      tags: ['calculus', 'derivatives', 'integrals']
    },
    {
      id: '2',
      title: 'Physics Mechanics',
      subject: 'Physics',
      difficulty: 'hard',
      questions: 20,
      timeLimit: 45,
      attempts: 156,
      averageScore: 65,
      creator: 'Prof. Johnson',
      isPublic: true,
      tags: ['mechanics', 'forces', 'motion']
    },
    {
      id: '3',
      title: 'Organic Chemistry Basics',
      subject: 'Chemistry',
      difficulty: 'easy',
      questions: 10,
      timeLimit: 20,
      attempts: 89,
      averageScore: 85,
      creator: 'You',
      isPublic: false,
      tags: ['organic', 'molecules', 'reactions']
    }
  ]

  const recentAttempts = [
    {
      id: '1',
      quizTitle: 'Calculus Fundamentals',
      score: 85,
      totalQuestions: 15,
      timeSpent: 25,
      date: '2024-01-15',
      passed: true
    },
    {
      id: '2',
      quizTitle: 'Physics Mechanics',
      score: 72,
      totalQuestions: 20,
      timeSpent: 42,
      date: '2024-01-14',
      passed: true
    },
    {
      id: '3',
      quizTitle: 'Biology Cells',
      score: 58,
      totalQuestions: 12,
      timeSpent: 18,
      date: '2024-01-13',
      passed: false
    }
  ]

  const sampleQuestions = [
    {
      id: '1',
      question: 'What is the derivative of x²?',
      options: ['2x', 'x', '2', 'x²'],
      correctAnswer: 0,
      explanation: 'The derivative of x² is 2x using the power rule.'
    },
    {
      id: '2',
      question: 'What is the integral of 2x?',
      options: ['x²', 'x² + C', '2', '2x + C'],
      correctAnswer: 1,
      explanation: 'The integral of 2x is x² + C, where C is the constant of integration.'
    }
  ]

  const subjects = ['all', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science']

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const startQuiz = (quiz: any) => {
    setCurrentQuiz({
      ...quiz,
      questions: sampleQuestions
    })
    setCurrentQuestionIndex(0)
    setSelectedAnswer('')
    setQuizResults(null)
  }

  const submitAnswer = () => {
    if (!selectedAnswer) return

    const isCorrect = parseInt(selectedAnswer) === currentQuiz.questions[currentQuestionIndex].correctAnswer
    
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer('')
    } else {
      // Quiz completed
      setQuizResults({
        score: 85,
        totalQuestions: currentQuiz.questions.length,
        correctAnswers: Math.floor(currentQuiz.questions.length * 0.85),
        timeSpent: 25,
        passed: true
      })
    }
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer('')
    setQuizResults(null)
  }

  const exitQuiz = () => {
    setCurrentQuiz(null)
    setCurrentQuestionIndex(0)
    setSelectedAnswer('')
    setQuizResults(null)
  }

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesSubject = selectedSubject === 'all' || quiz.subject === selectedSubject
    return matchesSearch && matchesSubject
  })

  // Quiz Taking Interface
  if (currentQuiz && !quizResults) {
    const currentQuestion = currentQuiz.questions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100

    return (
      <div className="p-4 lg:p-6 space-y-6 pb-20 lg:pb-6">
        {/* Quiz Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{currentQuiz.title}</h1>
            <p className="text-gray-600">Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</p>
          </div>
          <Button variant="outline" onClick={exitQuiz}>
            Exit Quiz
          </Button>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {currentQuestion.question}
            </h2>

            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              >
                Previous
              </Button>
              <Button 
                onClick={submitAnswer}
                disabled={!selectedAnswer}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                {currentQuestionIndex === currentQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Quiz Results Interface
  if (quizResults) {
    return (
      <div className="p-4 lg:p-6 space-y-6 pb-20 lg:pb-6">
        <div className="text-center">
          <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
            quizResults.passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {quizResults.passed ? (
              <CheckCircle className="w-10 h-10 text-green-600" />
            ) : (
              <XCircle className="w-10 h-10 text-red-600" />
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {quizResults.passed ? 'Congratulations!' : 'Keep Practicing!'}
          </h1>
          <p className="text-gray-600">
            You scored {quizResults.score}% on {currentQuiz.title}
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{quizResults.score}%</p>
                <p className="text-sm text-gray-600">Score</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{quizResults.correctAnswers}/{quizResults.totalQuestions}</p>
                <p className="text-sm text-gray-600">Correct</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{quizResults.timeSpent}m</p>
                <p className="text-sm text-gray-600">Time</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">+{Math.floor(quizResults.score * 2)}</p>
                <p className="text-sm text-gray-600">Points</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-4">
          <Button onClick={restartQuiz} variant="outline" className="flex-1">
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Quiz
          </Button>
          <Button onClick={exitQuiz} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
            Continue Learning
          </Button>
        </div>
      </div>
    )
  }

  // Main Quiz Interface
  return (
    <div className="p-4 lg:p-6 space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quiz Center</h1>
          <p className="text-gray-600">Test your knowledge and track your progress</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Quiz
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Quiz</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="quiz-title">Quiz Title</Label>
                <Input id="quiz-title" placeholder="Enter quiz title" />
              </div>
              <div>
                <Label htmlFor="quiz-subject">Subject</Label>
                <Select>
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
                <Label htmlFor="quiz-difficulty">Difficulty</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                  Create Quiz
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
            placeholder="Search quizzes..."
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

      {/* Tabs */}
      <Tabs defaultValue="available" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">Available Quizzes</TabsTrigger>
          <TabsTrigger value="my-quizzes">My Quizzes</TabsTrigger>
          <TabsTrigger value="history">Quiz History</TabsTrigger>
        </TabsList>

        {/* Available Quizzes */}
        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredQuizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-purple-600" />
                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                    </div>
                    <Badge variant="secondary">{quiz.subject}</Badge>
                  </div>
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                  <p className="text-sm text-gray-600">by {quiz.creator}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4 text-gray-500" />
                      <span>{quiz.questions} questions</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{quiz.timeLimit} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{quiz.attempts} attempts</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{quiz.averageScore}% avg</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {quiz.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    onClick={() => startQuiz(quiz)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* My Quizzes */}
        <TabsContent value="my-quizzes" className="space-y-4">
          <div className="text-center py-12">
            <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes created yet</h3>
            <p className="text-gray-600 mb-4">Create your first quiz to share with others</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Quiz
            </Button>
          </div>
        </TabsContent>

        {/* Quiz History */}
        <TabsContent value="history" className="space-y-4">
          <div className="space-y-4">
            {recentAttempts.map((attempt) => (
              <Card key={attempt.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        attempt.passed ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {attempt.passed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900">{attempt.quizTitle}</h3>
                        <p className="text-sm text-gray-600">
                          {attempt.score}% • {attempt.timeSpent} minutes • {new Date(attempt.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{attempt.score}%</p>
                      <p className="text-sm text-gray-600">{attempt.score >= 70 ? 'Passed' : 'Failed'}</p>
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