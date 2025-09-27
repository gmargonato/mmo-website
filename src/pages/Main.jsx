import { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import ServerInfo from '../components/ServerInfo'
import QuickLinks from '../components/QuickLinks'
import NewsArticle from '../components/content/NewsArticle'
import AboutContent from '../components/content/AboutContent'
import DownloadContent from '../components/content/DownloadContent'
import MapContent from '../components/content/MapContent'
import RankingsContent from '../components/content/RankingsContent'
import ForumContent from '../components/content/ForumContent'
import LoginContent from '../components/content/LoginContent'
import NotFoundContent from '../components/content/NotFoundContent'
import PlayersContent from '../components/content/PlayersContent'
import RulesContent from '../components/content/RulesContent'
import ExpTableContent from '../components/content/ExpTableContent'
import ShopContent from '../components/content/ShopContent'
import DeathContent from '../components/content/DeathContent'

const contentComponents = {
  'news': NewsArticle,
  'server': AboutContent,
  'download': DownloadContent,
  'map': MapContent,
  'rankings': RankingsContent,
  'forum': ForumContent,
  'login': LoginContent,
  'characters': PlayersContent,
  'rules': RulesContent,
  'experience': ExpTableContent,
  'shop': ShopContent,
  'deaths': DeathContent,
  // Add other implemented components here
}

function Main() {
  const [currentContent, setCurrentContent] = useState('news')
  const [backgroundImage, setBackgroundImage] = useState('/wallpapers/1.jpg')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  const backgrounds = [
    '/wallpapers/1.jpg',
    '/wallpapers/2.jpg',
    '/wallpapers/3.jpg',
    '/wallpapers/4.png',
    '/wallpapers/5.jpg',
    '/wallpapers/6.jpg',
    '/wallpapers/7.jpg',
  ]

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length)
    setBackgroundImage(backgrounds[randomIndex])

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleContentChange = (contentType) => {
    setCurrentContent(contentType)
    setMobileMenuOpen(false) // Close mobile menu when content changes
    // Scroll to top when content changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Use NotFoundContent as fallback for unimplemented sections
  const ContentComponent = contentComponents[currentContent] || NotFoundContent

  return (
    <section 
      className="min-h-screen bg-backgroundBlue"
      style={{
        backgroundImage: !isMobile ? `url("${backgroundImage}")` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundColor: '#041121'
      }}
    >
      {/* Mobile Menu Button - Only visible on small screens */}
      <div className="md:hidden fixed w-full z-50 top-0">
        {/* Background container with repeating image */}
        <div 
          className="absolute inset-0 w-full h-full shadow-xl"
          style={{
            backgroundImage: 'url(ui/mobile-header.png)',
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%'
          }}
        />
        {/* Content container */}
        <div className="relative p-4 flex items-center justify-between">
          <img src="ui/aldoria-title.png" alt="Aldoria" className="w-40 h-auto"/>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center"
          >
            <img src="ui/button-square-menu.png" alt="Menu" className="w-12 h-auto"/>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - Only visible on small screens when open */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-80">
          <div className="fixed h-full w-full mt-14 overflow-auto">
            <div className="p-4">
              <Navigation onContentChange={handleContentChange} currentContent={currentContent} />
            </div>
          </div>
        </div>
      )}

      {/* Main container using CSS Grid for better layout control */}
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[250px_1fr_250px] min-h-screen">
        {/* Left Navigation - Hidden on small screens */}
        <div className="hidden md:block pt-4">
          <Navigation onContentChange={handleContentChange} currentContent={currentContent} />
        </div>

        {/* Main Content */}
        <main className="mt-5 md:mt-44 pt-20 md:pt-12 px-0 md:px-2">

          <QuickLinks />
          
          {/* Top Border */}
          <img src="ui/corner-tl.gif" alt="Border" className="w-auto h-[17px] -mb-[16px]" />
          <div 
            className="px-0 py-1 -mb-1"
            style={{
              backgroundImage: 'url("ui/border-center.gif")',
              backgroundRepeat: 'repeat-x',
              backgroundPosition: 'left top'
            }}
          />

          <ContentComponent onContentChange={handleContentChange}/>

          {/* Bottom Border */}
          <div 
            className="px-0 py-6 -mt-12"
            style={{
              backgroundImage: 'url("ui/border-center.gif")',
              backgroundRepeat: 'repeat-x',
              backgroundPosition: 'left'
            }}
          />
        </main>

        {/* Right Server Info - Hidden on small and medium */}
        <div className="hidden lg:block pt-4">
          <ServerInfo onContentChange={handleContentChange} />
        </div>
      </div>
      <p className="text-white text-center text-xs mt-4 mb-4">Copyright {new Date().getFullYear()} por GM Aldo. Todos os direitos reservados.</p>
    </section>
  )
}

export default Main
