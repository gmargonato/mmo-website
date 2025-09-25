import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const VOCATION_MAP = {
  0: 'None',
  13: 'None',
  1: 'Sorcerer',
  9: 'Sorcerer',
  2: 'Druid',
  10: 'Druid',
  3: 'Paladin',
  11: 'Paladin',
  4: 'Knight',
  12: 'Knight',
  5: 'Sorcerer',
  6: 'Druid',
  7: 'Paladin',
  8: 'Knight'
}

function PlayersContent() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchedPlayer, setSearchedPlayer] = useState(null)

  useEffect(() => {
    fetchPlayers()
  }, [])

  const fetchPlayers = async () => {
    try {
      // Query the players table
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('access', 0)
        .order('level', { ascending: false })
      
      if (error) throw error
      
      // Process the data
      const processedData = data.map(player => ({
        ...player,
        vocation_name: VOCATION_MAP[player.vocation] || 'Unknown'
      }))
      
      setPlayers(processedData)
    } catch (error) {
      console.error('Error fetching players:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    const cleanedSearch = searchTerm.trim().toLowerCase()
    
    if (!cleanedSearch) {
      setSearchedPlayer(null)
      return
    }

    try {
      // Perform exact name search using Supabase with case-insensitive matching
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .ilike('name', cleanedSearch)
        .single()
      
      if (error) {
        if (error.code === 'PGRST116') {
          // No rows found
          setSearchedPlayer('not_found')
        } else {
          console.error('Error searching for player:', error)
          setSearchedPlayer('not_found')
        }
        return
      }
      
      // Process the found player data
      const processedPlayer = {
        ...data,
        vocation_name: VOCATION_MAP[data.vocation] || 'Unknown'
      }
      
      setSearchedPlayer(processedPlayer)
    } catch (error) {
      console.error('Error searching for player:', error)
      setSearchedPlayer('not_found')
    }
  }

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
    // Clear previous search when input changes
    setSearchedPlayer(null)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <section className="mb-6 bg-backgroundBrown font-fontBrown">
      
      {/* Header */}
      <div 
        className="px-4 py-0"
        style={{
          backgroundImage: 'url("ui/title-green.gif")',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'left top'
        }}
      >
        <h1 className="text-fontBeige font-martel text-2xl flex items-center"
        style={{
          textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
        }}
        >Jogadores</h1>
      </div>
      
      <div className="ring-1 ring-fontBrown text-fontBrown p-6 ml-1 mr-1 bg-backgroundBeige">
        
        {/* Filter Section */}
        <div className="bg-backgroundBeigeDark border-4 border-gray-500 ring-1 ring-black">

          <h2 className="bg-backgroundDust p-2 text-white font-bold text-md border-b-4 border-gray-500">Buscar jogador</h2>
          <div className="space-y-4 p-4 bg-[#F1E0C5]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <label className="text-sm font-medium sm:w-1/4 self-start sm:self-center">Nome do jogador</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite o nome exato do jogador"
                  className="w-full p-2 border border-gray-400 bg-white"
                />
              </div>
                <button
                  onClick={handleSearch}
                  className="
                  w-32 sm:self-end hover:brightness-110
                  bg-[#0010CB] hover:bg-[#005EEE] text-[#FCD954] font-martel py-2 sm:py-1 border-2 border-black rounded-md 
                  [background:linear-gradient(180deg,#0a2bb8_0%,#0b42ff_38%,#0b4bff_50%,#0b35e2_62%,#08259d_100%)]
                  " style={{
                  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.35), inset 0 -2px 0 rgba(0, 0, 0, 0.45), inset 0 0 0 1px #0a1f86'
                  }}>
                  Buscar
                </button>
            </div>
          </div>
        </div>

        {/* Player Information Section */}
        {searchedPlayer && (
          <div className="bg-backgroundBeigeDark border-4 border-gray-500 ring-1 ring-black mt-4">
            <h2 className="bg-backgroundDust p-2 text-white font-bold text-md border-b-4 border-gray-500">
              Informação do Jogador
            </h2>
            <div className="p-4 bg-[#F1E0C5]">
              {searchedPlayer === 'not_found' ? (
                <p className="text-red-600 font-medium">Jogador não encontrado.</p>
              ) : (
                <div className="space-y-4">
                {/* Section 1: Basic Information */}
                <h3 className="font-bold text-sm">Visão Geral</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-gray-400">
                      <td className="py-1 font-bold border-r border-gray-400 w-32">Nome:</td>
                      <td className="py-1 px-3">{searchedPlayer.name}</td>
                    </tr>
                    <tr className="border-b border-gray-400">
                      <td className="py-1 font-bold border-r border-gray-400">Level:</td>
                      <td className="py-1 px-3">{searchedPlayer.level}</td>
                    </tr>
                    <tr className="border-b border-gray-400">
                      <td className="py-1 font-bold border-r border-gray-400">Vocação:</td>
                      <td className="py-1 px-3">{searchedPlayer.vocation_name}</td>
                    </tr>
                    <tr className="border-b border-gray-400">
                      <td className="py-1 font-bold border-r border-gray-400">Sexo:</td>
                      <td className="py-1 px-3">{searchedPlayer.sex === 1 ? 'Male' : 'Female'}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold border-r border-gray-400">Último Login:</td>
                      <td className="py-1 px-3">{searchedPlayer.last_login || 'Never'}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Section 2: Skills */}
                <h3 className="font-bold text-sm">Skills:</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="py-1"><strong>Fist:</strong> {searchedPlayer.fist || 0}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-1"><strong>Club:</strong> {searchedPlayer.club || 0}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-1"><strong>Sword:</strong> {searchedPlayer.sword || 0}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-1"><strong>Axe:</strong> {searchedPlayer.axe || 0}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-1"><strong>Distance:</strong> {searchedPlayer.distance || 0}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-1"><strong>Shielding:</strong> {searchedPlayer.shielding || 0}</td>
                    </tr>
                    <tr>
                      <td className="py-1"><strong>Fishing:</strong> {searchedPlayer.fishing || 0}</td>
                    </tr>
                  </tbody>
                </table>

                  {/* Section 3: Guild (if any) */}
                  {(() => {
                    try {
                      const guildData = typeof searchedPlayer.guild === 'string' ? JSON.parse(searchedPlayer.guild) : searchedPlayer.guild;
                      if (guildData && guildData.name && guildData.id !== "0") {
                        return (
                          <div className="">
                            <h3 className="font-bold text-sm">Guild:</h3>
                              <table className="w-full text-sm">
                                <tbody>
                                  <tr className="border-b border-gray-300">
                                    <td className="py-1"><strong>Nome da Guild:</strong> {guildData.name}</td>
                                  </tr>
                                  {guildData.rank && (
                                    <tr className="border-b border-gray-300">
                                      <td className="py-1"><strong>Rank:</strong> {guildData.rank}</td>
                                    </tr>
                                  )}
                                  {guildData.nick && guildData.nick !== guildData.name && (
                                    <tr>
                                      <td className="py-1"><strong>Nickname:</strong> {guildData.nick}</td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                          </div>
                        );
                      }
                    } catch {
                      // If there's an error parsing guild data, don't show the section
                    }
                    return null;
                  })()}

                  {/* Section 4: Deaths (if any) */}
                  {(() => {
                    try {
                      const deathsData = typeof searchedPlayer.deaths === 'string' ? JSON.parse(searchedPlayer.deaths) : searchedPlayer.deaths;
                      if (Array.isArray(deathsData) && deathsData.length > 0) {
                        // Sort deaths by time in descending order (most recent first)
                        const sortedDeaths = [...deathsData].sort((a, b) => new Date(b.time) - new Date(a.time));
                        
                        return (
                           <div className="">
                             <h3 className="font-bold text-sm">Histórico de Mortes:</h3>
                               <table className="w-full text-sm">
                                 <tbody>
                                   {sortedDeaths.map((death, index) => (
                                     <tr key={index} className={index < sortedDeaths.length - 1 ? "border-b border-gray-300" : ""}>
                                       <td className="py-2">
                                         <div>{new Date(death.time).toLocaleString('pt-BR')} - Morreu no level {death.level} para <strong>{death.name.toLowerCase()}</strong>.</div>
                                       </td>
                                     </tr>
                                   ))}
                                 </tbody>
                               </table>
                           </div>
                        );
                      }
                    } catch {
                      // If there's an error parsing deaths data, don't show the section
                    }
                    return null;
                  })()}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
      <p>&nbsp;</p>
    </section>
  )
}

export default PlayersContent
