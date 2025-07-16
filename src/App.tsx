import { useState, useEffect } from 'react'
import { Navigation } from './components/layout/Navigation'
import { Dashboard } from './pages/Dashboard'
import { StudyMaterials } from './pages/StudyMaterials'
import { Friends } from './pages/Friends'
import { Leaderboards } from './pages/Leaderboards'
import { Quiz } from './pages/Quiz'
import { Profile } from './pages/Profile'
import { Toaster } from './components/ui/toaster'
import blink from './blink/client'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setIsLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={user} />
      case 'materials':
        return <StudyMaterials />
      case 'friends':
        return <Friends />
      case 'leaderboards':
        return <Leaderboards />
      case 'quiz':
        return <Quiz />
      case 'profile':
        return <Profile user={user} />
      default:
        return <Dashboard user={user} />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 studymate-gradient rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">StudyMate</h2>
          <p className="text-gray-600">Loading your study dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 studymate-gradient rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to StudyMate</h1>
          <p className="text-gray-600 mb-8">
            Your comprehensive study companion for academic success. Track progress, connect with friends, and gamify your learning journey.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-semibold">1</span>
              </div>
              <span className="text-gray-700">Track your study sessions and build streaks</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">2</span>
              </div>
              <span className="text-gray-700">Connect with study partners and join groups</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold">3</span>
              </div>
              <span className="text-gray-700">Compete on leaderboards and earn achievements</span>
            </div>
          </div>
          
          <button
            onClick={() => blink.auth.login()}
            className="w-full bg-gradient-to-r from-orange-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
          >
            Get Started - Sign In
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            Join thousands of students already using StudyMate
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        user={user}
      />
      
      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="min-h-screen">
          {renderCurrentPage()}
        </main>
      </div>
      
      <Toaster />
    </div>
  )
}

export default App