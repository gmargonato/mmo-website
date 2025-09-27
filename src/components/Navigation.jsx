import { useAuth } from '../contexts/AuthContext'
import { useState, useEffect } from 'react'

const navigationItems = [
  { label: 'Notícias',  contentType: 'news', icon: 'ui/nav-news.gif' },
  { label: 'Sobre',      contentType: 'server', icon: 'ui/nav-sign.gif' },
  { label: 'Regras',    contentType: 'rules', icon: 'ui/nav-server.gif' },
  { label: 'Classes',   contentType: 'vocations', icon: 'ui/nav-magias.gif' },
  { label: 'Experiência', contentType: 'experience', icon: 'ui/nav-exp.gif' },
  { label: 'Rank',  contentType: 'rankings', icon: 'ui/nav-ranks.gif' },
  { label: 'Jogadores', contentType: 'characters', icon: 'ui/nav-char2.gif' },
  { label: 'Mortes', contentType: 'deaths', icon: 'ui/nav-skull.gif' },
  { label: 'Mapa',      contentType: 'map', icon: 'ui/nav-map.gif' },
  { label: 'Fórum',     contentType: 'forum', icon: 'ui/nav-forum.gif' },
  { label: 'Loja',      contentType: 'shop', icon: 'ui/nav-char1.gif' },
]

const NavButton = ({ contentType, label, icon, onClick, isActive }) => {
  return (
    <button 
      onClick={() => onClick(contentType)} 
      className={"relative block w-44 mx-auto group"}
    >
      {/* Button Background */}
      <img 
        src="ui/nav-button.gif" 
        alt=""
        className="w-full block "
      />
      <img 
        src="ui/nav-button-hover.gif" 
        alt=""
        className="w-full absolute top-0 left-0 opacity-0 group-hover:opacity-100"
      />
      
      {/* Button Content */}
      <div 
        className="absolute inset-0 flex items-center pl-3 text-fontBeige font-martel text-2xl"
        style={{
          textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
        }}
      >
        <img src={icon} alt="" className="w-8 h-8 mr-1" />{label}</div>
    </button>
  )
}

function Navigation({ onContentChange, currentContent }) {
  const { user, signOut } = useAuth()
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    // Start the cascade animation sequence
    const steps = [
      0,    // Initial state
      1,    // Login box appears
      2,    // Box top appears
      3,    // Navigation items start appearing
      4,    // All navigation items visible
      5     // Box bottom appears
    ]

    const animateSequence = async () => {
      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, i === 0 ? 100 : 200))
        setAnimationStep(steps[i])
      }
    }

    animateSequence()
  }, [])

  return (
    <nav className="h-full p-4 max-w-[250px] mx-auto">

      {/* Top Part */}
      <div className="w-48 mx-aut">

        {/* Animated Statues */}
        <div className="flex justify-between -mb-3 relative z-10">
          <img src="ui/animated-statue.gif" className="w-8 mx-auto scale-x-[-1]"/>
          <img src="ui/animated-statue.gif" className="w-8 mx-auto"/>
        </div>

        {/* Logo */}
        <a href="/">
          <div className="relative z-[5]">
            <img src="ui/aldoria-nav-logo.png" className="w-40 mx-auto"/>
            <img src="ui/pedestal-base.png" className="w-40 mx-auto -mt-1"/>
          </div>
        </a>

        {/*  Login */}
        <div 
          className={`w-full mx-auto -mt-3 relative h-[80px] transition-all duration-500 ease-out ${
            animationStep >= 1 ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-24 opacity-0'
          }`}
          style={{
            backgroundImage: 'url("ui/login-box.png")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'auto',
            backgroundPosition: 'center'
          }}
        >
          <button 
            onClick={async () => {
              if (user) {
                await signOut()
              } else {
                onContentChange('login')
              }
            }}
            className="
            mx-auto my-5 absolute left-1/2 transform -translate-x-1/2 hover:brightness-110
            bg-[#0010CB] hover:bg-[#005EEE] text-[#FCD954] font-martel px-12 py-1 border-2 border-black rounded-md 
            [background:linear-gradient(180deg,#0a2bb8_0%,#0b42ff_38%,#0b4bff_50%,#0b35e2_62%,#08259d_100%)]
            " style={{
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,.35), inset 0 -2px 0 rgba(0, 0, 0, 0.45), inset 0 0 0 1px #0a1f86'
          }}>{user ? 'Logout' : 'Login'}</button>
        </div>

        {/*  Download */}
        <div 
          className={`w-full mx-auto mt-3 relative h-[80px] transition-all duration-500 ease-out ${
            animationStep >= 1 ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-24 opacity-0'
          }`}
          style={{
            backgroundImage: 'url("ui/login-box.png")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'auto',
            backgroundPosition: 'center'
          }}
        >
          <button 
            onClick={() => onContentChange('download')}
            className="
            mx-auto my-5 absolute left-1/2 transform -translate-x-1/2 hover:brightness-110
            bg-[#0010CB] hover:bg-[#005EEE] text-[#FCD954] font-martel px-8 py-1 border-2 border-black rounded-md 
            [background:linear-gradient(180deg,#0a2bb8_0%,#0b42ff_38%,#0b4bff_50%,#0b35e2_62%,#08259d_100%)]
            " style={{
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,.35), inset 0 -2px 0 rgba(0, 0, 0, 0.45), inset 0 0 0 1px #0a1f86'
          }}>Download</button>
        </div>

        {/* Box Top */}
        <img src="ui/box-top.gif" className={`w-46 mt-4 mx-auto transition-all duration-500 ease-out ${
          animationStep >= 2 ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-16 opacity-0'
        }`}/>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-0 -ml-6">
        {navigationItems.map((item, index) => (
          <li key={item.contentType} className={`transition-all duration-500 ease-out ${
            animationStep >= 3 + (index * 0.1) ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-12 opacity-0'
          }`} style={{
            transitionDelay: animationStep >= 3 ? `${index * 50}ms` : '0ms'
          }}>
            <NavButton 
              {...item} 
              onClick={onContentChange}
              isActive={currentContent === item.contentType}
            />
          </li>
        ))}
      </ul>

      {/* Bottom Box */}
      <div className="w-full mx-auto ml-1.5">
        <img 
          src="ui/box-bottom.gif" 
          alt="Navigation Bottom" 
          className={`w-46 mt-0 transition-all duration-500 ease-out ${
            animationStep >= 5 ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-16 opacity-0'
          }`}
        />
      </div>
    </nav>
  )
}

export default Navigation