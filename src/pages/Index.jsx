import { Link } from 'react-router-dom'
import '../styles/PlayButton.css'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const vocations = [
  { name: 'Sorcerer', image: '/artwork-sorcerer.png' },
  { name: 'Druid', image: '/artwork-druid.png' },
  
  { name: 'Knight', image: '/artwork-knight.png' },
  { name: 'Paladin', image: '/artwork-paladin.png' },
]

function Index() {
  const [playerCount, setPlayerCount] = useState(0)

  const fetchPlayerCount = async () => {
    try {
      const { count, error } = await supabase
        .from('players')
        .select('*', { count: 'exact', head: true })
        // .eq('access', 0)
        // .eq('server', 'New');
      
      if (error) throw error;
      setPlayerCount(count || 0);
    } catch (error) {
      console.error('Error fetching player count:', error);
      setPlayerCount(0);
    }
  };

  useEffect(() => {
    fetchPlayerCount();
  }, []);
  return (
    <section className="h-screen w-screen relative overflow-hidden">
      
      {/* 1. Background Image - Main Section */}
      <div 
        className="absolute inset-0 w-auto h-auto"
        style={{
          backgroundImage: 'url("wallpapers/landing-background.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#041121'
        }}
      />

      {/* 2. Vocation Artworks - Positioned below title, top aligned */}
      <div className="absolute h-1/2 top-32 left-0 right-0 flex justify-center">
        <div className="flex items-center justify-center w-full px-4">
          {/* Sorcerer */}
          <div className="z-20 ml-28 -mr-60 ">
            <img src="assets/artwork-sorcerer.png" alt="Sorcerer" className="max-w-[350px] h-auto" />
          </div>
          
          {/* Druid */}
          <div className="z-20 ml-0 -mr-60">
            <img src="assets/artwork-druid.png" alt="Druid" className="max-w-[320px] h-auto" />
          </div>
          
          {/* Knight */}
          <div className="z-20 -mr-60">
            <img src="assets/artwork-knight.png" alt="Knight" className="max-w-[350px] h-auto" />
            
          </div>
          {/* Paladin */}
          <div className="z-10 mr-10">
          <img src="assets/artwork-paladin.png" alt="Paladin" className="max-w-[350px] h-auto" />
          </div>
          
        </div>
      </div>

      {/* 3. Title */}
      <div className="absolute top-0 left-0 right-0 z-30 pt-8 pb-4">
        <h1 
          className="text-4xl font-bart text-white px-4 text-center"
          style={{
            textShadow: '-4px 4px 5px #09062B, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
          }}
        >Você nunca esquecerá seu primeiro Dragão!</h1>
      </div>

      {/* 3. Mist Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 40%, rgba(4, 17, 33, 0.95) 60%, rgba(0, 0, 0, 1) 100%)'
        }}
      />

      {/* 4. Enter Area*/}
      <div className="absolute bottom-24 left-0 right-0 h-1/2 flex flex-col items-center justify-center z-30">

        {/* Dragon Logo - Two pieces that scale together */}
        <div className="flex flex-col items-center w-full max-w-sm px-4">
          <div className="w-full max-w-md relative z-20">
            <img 
              src="assets/dragon-top.png" 
              alt="Dragon Logo Top" 
              className="w-[250px] mx-auto h-auto"
            />
            {/* Number of players in the database */}
            <p className="left-1/2 -translate-x-1/2 text-yellow-400 text-[11px] text-center bg-black rounded-full absolute w-32 h-8" style={{lineHeight: '1', paddingTop: '4px'}}>{playerCount}<br/>Jogadores</p>
      
          </div>
      
          <div className="w-full max-w-md -mt-8 relative z-10">
            <button 
              onClick={() => {
                // Clear cache
                if (window.caches) {
                  caches.keys().then((names) => {
                    names.forEach(name => {
                      caches.delete(name);
                    });
                  });
                }
                // Clear local storage except for specific items we want to keep
                const playerSearchTerm = localStorage.getItem('playerSearchTerm');
                localStorage.clear();
                if (playerSearchTerm) {
                  localStorage.setItem('playerSearchTerm', playerSearchTerm);
                }
                // Force reload all assets by adding timestamp to URLs
                const timestamp = new Date().getTime();
                const images = document.getElementsByTagName('img');
                Array.from(images).forEach(img => {
                  if (img.src) {
                    img.src = img.src.split('?')[0] + '?v=' + timestamp;
                  }
                });
                // Navigate to main page
                window.location.href = '/main';
              }} 
              className="block w-full"
            >
              <img 
                src="assets/dragon-bottom.png" 
                alt="Play Button" 
                className="w-full h-auto"
              />
            </button>
          </div>
          
        </div>
      </div>

    </section>
  )
}

export default Index
