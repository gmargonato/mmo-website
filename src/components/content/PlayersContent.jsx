import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import SearchHistoryDialog from '../dialogs/SearchHistoryDialog'

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

const POSITION_MAP = {
  0: 'Player',
  1: 'Tutor',
  2: 'Senior Tutor',
  3: 'Game Master',
  4: 'Community Manager',
  5: 'God'
}

function PlayersContent() {
  const { user } = useAuth()
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchedPlayer, setSearchedPlayer] = useState(null)
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)
  const [selectedServer, setSelectedServer] = useState('New')  // Default to New Aldória

  const handleServerChange = (e) => {
    setSelectedServer(e.target.value)
    setSearchedPlayer(null) // Clear previous search when server changes
  }

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
      // Get client IP address
      const ipResponse = await fetch('https://api.ipify.org?format=json')
      const { ip } = await ipResponse.json()

      // First, try to find the player
      const { data: playerData, error: playerError } = await supabase
        .from('players')
        .select('*')
        .ilike('name', cleanedSearch)
        .eq('server', selectedServer)
        .single()

      // Log the search attempt
      const { error: logError } = await supabase
        .from('pesquisa_player')
        .insert({
          player_name: cleanedSearch,
          ip: ip,
          success: playerError ? false : true,
          server: selectedServer
        })
      
      // Continue with player search handling
      if (playerError) {
        if (playerError.code === 'PGRST116') {
          setSearchedPlayer('not_found')
        } else {
          console.error('Error searching for player:', playerError)
          setSearchedPlayer('not_found')
        }
        return
      }

      // Process the found player data
      const processedPlayer = {
        ...playerData,
        vocation_name: VOCATION_MAP[playerData.vocation] || 'Unknown'
      }

      // Log the status of the search logging
      if (logError) {
        console.log('Failed to save search:', logError.message)
      } else {
        console.log('Successfully logged search for:', cleanedSearch, '(Found:', !playerError ? 'Yes' : 'No', ')')
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
        {/* Only visible for authenticated users */}
        {user && (
          <div className="flex items-center gap-1 mt-1 mb-4">
            <svg className="text-blue" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4.929 4.929a10 10 0 1 1 14.141 14.141a10 10 0 0 1 -14.14 -14.14zm8.071 4.071a1 1 0 1 0 -2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0 -2h-2v-2z" /></svg>
            <a onClick={() => setIsHistoryDialogOpen(true)} className="text-blue text-sm hover:underline cursor-pointer">Ver histórico de buscas</a>
          </div>
        )}
      </div>
      
      <div className="ring-1 ring-fontBrown text-fontBrown p-6 ml-1 mr-1 bg-backgroundBeige">
        
        {/* Filter Section */}
        <div className="bg-backgroundBeigeDark border-4 border-gray-500 ring-1 ring-black">

          <h2 className="bg-backgroundDust p-2 text-white font-bold text-md border-b-4 border-gray-500">Buscar jogador</h2>
          <div className="space-y-4 p-4 bg-[#F1E0C5]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-start gap-2">
                <label className="text-sm font-medium sm:w-1/4 pt-2">Nome do jogador</label>
                <div className="w-full">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite o nome exato do jogador"
                    className="w-full p-2 border border-gray-400 bg-white"
                  />
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="novo-servidor"
                        name="server"
                        value="New"
                        checked={selectedServer === 'New'}
                        onChange={handleServerChange}
                        className="mr-2"
                      />
                      <label htmlFor="novo-servidor" className="text-sm">New Aldória</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="antigo-servidor"
                        name="server"
                        value="Old"
                        checked={selectedServer === 'Old'}
                        onChange={handleServerChange}
                        className="mr-2"
                      />
                      <label htmlFor="antigo-servidor" className="text-sm">Old Aldória</label>
                    </div>
                  </div>
                </div>
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
                <div className="grid grid-cols-1 gap-6">
                  {/* Section 1: Basic Information */}
                  <div>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-backgroundDust text-white border border-gray-500">
                          <th className="p-2 text-left">Visão Geral</th>
                          <th className="p-2 text-left"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-backgroundBeige">
                          <td className="p-2 border border-gray-500 font-bold">Nome</td>
                          <td className="p-2 border border-gray-500">{searchedPlayer.name}</td>
                        </tr>
                        <tr className="bg-backgroundBeigeDark">
                          <td className="p-2 border border-gray-500 font-bold">Level</td>
                          <td className="p-2 border border-gray-500">{searchedPlayer.level}</td>
                        </tr>
                        <tr className="bg-backgroundBeige">
                          <td className="p-2 border border-gray-500 font-bold">Vocação</td>
                          <td className="p-2 border border-gray-500">{searchedPlayer.vocation_name}</td>
                        </tr>
                        <tr className="bg-backgroundBeigeDark">
                          <td className="p-2 border border-gray-500 font-bold">Sexo</td>
                          <td className="p-2 border border-gray-500">{searchedPlayer.sex === 1 ? 'Male' : 'Female'}</td>
                        </tr>
                        <tr className="bg-backgroundBeige">
                          <td className="p-2 border border-gray-500 font-bold">Último Login</td>
                          <td className="p-2 border border-gray-500">{searchedPlayer.last_login || 'Never'}</td>
                        </tr>
                        <tr className="bg-backgroundBeigeDark">
                          <td className="p-2 border border-gray-500 font-bold">Servidor</td>
                          <td className="p-2 border border-gray-500">{searchedPlayer.server === 'New' ? 'New Aldória' : 'Old Aldória'}</td>
                        </tr>
                        <tr className="bg-backgroundBeige">
                          <td className="p-2 border border-gray-500 font-bold">Status</td>
                          <td className="p-2 border border-gray-500">
                            {searchedPlayer.premium ? (
                              <span className="text-green-600 font-bold">Premium Account</span>
                            ) : (
                              'Free Account'
                            )}
                          </td>
                        </tr>
                        {searchedPlayer.access > 0 && (
                          <tr className="bg-backgroundBeigeDark">
                            <td className="p-2 border border-gray-500 font-bold">Posição</td>
                            <td className="p-2 border border-gray-500">
                              {POSITION_MAP[searchedPlayer.access] || 'Player'}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Section 2: Skills - Only shown for players and tutors */}
                  {searchedPlayer.access < 3 && (
                    <div>
                      <table className="w-full border-collapse mb-2">
                        <thead>
                          <tr className="bg-backgroundDust text-white">
                            <th className="p-2 text-left border border-gray-500">Skill</th>
                            <th className="p-2 text-left border border-gray-500">Valor</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-backgroundBeige">
                            <td className="p-2 border border-gray-500 font-bold">Magic</td>
                            <td className="p-2 border border-gray-500">{searchedPlayer.magic_level || 0}</td>
                          </tr>
                          <tr className="bg-backgroundBeigeDark">
                            <td className="p-2 border border-gray-500 font-bold">Fist</td>
                            <td className="p-2 border border-gray-500">{searchedPlayer.fist || 0}</td>
                          </tr>
                          <tr className="bg-backgroundBeige">
                            <td className="p-2 border border-gray-500 font-bold">Club</td>
                            <td className="p-2 border border-gray-500">{searchedPlayer.club || 0}</td>
                          </tr>
                          <tr className="bg-backgroundBeigeDark">
                            <td className="p-2 border border-gray-500 font-bold">Sword</td>
                            <td className="p-2 border border-gray-500">{searchedPlayer.sword || 0}</td>
                          </tr>
                          <tr className="bg-backgroundBeige">
                            <td className="p-2 border border-gray-500 font-bold">Axe</td>
                            <td className="p-2 border border-gray-500">{searchedPlayer.axe || 0}</td>
                          </tr>
                          <tr className="bg-backgroundBeigeDark">
                            <td className="p-2 border border-gray-500 font-bold">Distance</td>
                            <td className="p-2 border border-gray-500">{searchedPlayer.distance || 0}</td>
                          </tr>
                          <tr className="bg-backgroundBeige">
                            <td className="p-2 border border-gray-500 font-bold">Shielding</td>
                            <td className="p-2 border border-gray-500">{searchedPlayer.shielding || 0}</td>
                          </tr>
                          <tr className="bg-backgroundBeigeDark">
                            <td className="p-2 border border-gray-500 font-bold">Fishing</td>
                            <td className="p-2 border border-gray-500">{searchedPlayer.fishing || 0}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

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
                        // Sort deaths by time in descending order (most recent first) and take top 20
                        const sortedDeaths = [...deathsData]
                          .sort((a, b) => new Date(b.time) - new Date(a.time))
                          .slice(0, 20);
                        
                        return (
                          <div>
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-backgroundDust text-white border border-gray-500">
                                  <th className="p-2 text-left">Mortes Recentes</th>
                                  <th className="p-2 text-left"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {sortedDeaths.map((death, index) => (
                                  <tr key={index} className={index % 2 === 0 ? "bg-backgroundBeige" : "bg-backgroundBeigeDark"}>
                                    <td className="p-2 border border-gray-500 w-48">
                                      {new Date(death.time).toLocaleString('pt-BR')}
                                    </td>
                                    <td className="p-2 border border-gray-500">
                                      Morreu no level {death.level} para <strong>{death.name.toLowerCase()}</strong>
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

      {/* Search History Dialog */}
      <SearchHistoryDialog
        isOpen={isHistoryDialogOpen}
        onClose={() => setIsHistoryDialogOpen(false)}
      />
    </section>
  )
}

export default PlayersContent
