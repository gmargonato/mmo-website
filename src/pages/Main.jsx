import { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import ServerInfo from '../components/ServerInfo'
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
  // Add other implemented components here
}

function Main() {
  const [currentContent, setCurrentContent] = useState('news')
  const [backgroundImage, setBackgroundImage] = useState('/wallpapers/1.jpg')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
        backgroundImage: `url("${backgroundImage}")`,
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

          {/* Fixed bar with links */}
          <img src="ui/corner-tl.gif" alt="Border" className="w-auto h-[17px] -mb-[16px]" />
          <div 
            className="px-0 py-1 -mb-1"
            style={{
              backgroundImage: 'url("ui/border-center.gif")',
              backgroundRepeat: 'repeat-x',
              backgroundPosition: 'left top'
            }}
          />
          <div 
            className="px-4 py-0"
            style={{
              backgroundImage: 'url("ui/title-red.gif")',
              backgroundRepeat: 'repeat-x',
              backgroundPosition: 'left top'
            }}
          >
            <div className="flex flex-row justify-between items-center gap-2 md:gap-4">
              <h1 className="text-white font-martel text-2xl"
              style={{
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
              >Links Úteis</h1>
              
              <div className="flex items-center gap-4 -mt-1.5">
                <a 
                  href="https://discord.gg/aldoria" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white text-xs underline flex items-center gap-1"
                  style={{
                    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                  }}
                >
                  <svg width="20"  height="20"  viewBox="0 0 24 24"  fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14.983 3l.123 .006c2.014 .214 3.527 .672 4.966 1.673a1 1 0 0 1 .371 .488c1.876 5.315 2.373 9.987 1.451 12.28c-1.003 2.005 -2.606 3.553 -4.394 3.553c-.732 0 -1.693 -.968 -2.328 -2.045a21.512 21.512 0 0 0 2.103 -.493a1 1 0 1 0 -.55 -1.924c-3.32 .95 -6.13 .95 -9.45 0a1 1 0 0 0 -.55 1.924c.717 .204 1.416 .37 2.103 .494c-.635 1.075 -1.596 2.044 -2.328 2.044c-1.788 0 -3.391 -1.548 -4.428 -3.629c-.888 -2.217 -.39 -6.89 1.485 -12.204a1 1 0 0 1 .371 -.488c1.439 -1.001 2.952 -1.459 4.966 -1.673a1 1 0 0 1 .935 .435l.063 .107l.651 1.285l.137 -.016a12.97 12.97 0 0 1 2.643 0l.134 .016l.65 -1.284a1 1 0 0 1 .754 -.54l.122 -.009zm-5.983 7a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15zm6 0a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15z" /></svg>
                  <span>Servidor Discord</span>
                </a>
                <a 
                  href="https://whatsapp.com/aldoria" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white text-xs underline flex items-center gap-1"
                  style={{
                    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                  }}
                >
                  <svg width="20"  height="20"  viewBox="0 0 24 24"  fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18.497 4.409a10 10 0 0 1 -10.36 16.828l-.223 -.098l-4.759 .849l-.11 .011a1 1 0 0 1 -.11 0l-.102 -.013l-.108 -.024l-.105 -.037l-.099 -.047l-.093 -.058l-.014 -.011l-.012 -.007l-.086 -.073l-.077 -.08l-.067 -.088l-.056 -.094l-.034 -.07l-.04 -.108l-.028 -.128l-.012 -.102a1 1 0 0 1 0 -.125l.012 -.1l.024 -.11l.045 -.122l1.433 -3.304l-.009 -.014a10 10 0 0 1 1.549 -12.454l.215 -.203a10 10 0 0 1 13.226 -.217m-8.997 3.09a1.5 1.5 0 0 0 -1.5 1.5v1a6 6 0 0 0 6 6h1a1.5 1.5 0 0 0 0 -3h-1l-.144 .007a1.5 1.5 0 0 0 -1.128 .697l-.042 .074l-.022 -.007a4.01 4.01 0 0 1 -2.435 -2.435l-.008 -.023l.075 -.041a1.5 1.5 0 0 0 .704 -1.272v-1a1.5 1.5 0 0 0 -1.5 -1.5" /></svg>
                  <span>Grupo WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
          <img src="ui/corner-bl.gif" alt="Border" className="w-auto h-[17px] absolute -mt-4" />
          <div 
            className="px-0 py-1 -mt-[7px]"
            style={{
              backgroundImage: 'url("ui/border-center.gif")',
              backgroundRepeat: 'repeat-x',
              backgroundPosition: 'left'
            }}
          />
          <span className="block h-5"></span>
          {/* End of Fixed Bar */}
          
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
          <ServerInfo />
        </div>
      </div>
      <p className="text-white text-center text-xs mt-4 mb-4">Copyright {new Date().getFullYear()} por GM Aldo. Todos os direitos reservados.</p>
    </section>
  )
}

export default Main
