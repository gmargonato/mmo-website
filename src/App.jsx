import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Index from './pages/Index'
import Main from './pages/Main'
import ScreenSizeIndicator from './components/ScreenSizeIndicator'

function App() {
  useEffect(() => {
    document.documentElement.classList.add('bg-backgroundBlue');
    document.body.classList.add('bg-backgroundBlue');
    return () => {
      document.documentElement.classList.remove('bg-backgroundBlue');
      document.body.classList.remove('bg-backgroundBlue');
    };
  }, []);

  return (
    <div className="min-h-screen bg-backgroundBlue">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/main" element={<Main />} />
      </Routes>
      {/* <ScreenSizeIndicator /> */}
    </div>
  )
}

export default App
