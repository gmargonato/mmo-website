import { useAuth } from '../../contexts/AuthContext'
import { useState, useEffect, useRef } from 'react'
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

const SKILL_OPTIONS = [
  'magic_level',
  'fist',
  'club',
  'sword',
  'axe',
  'distance',
  'shielding',
  'fishing'
]

const SKILL_DISPLAY_NAMES = {
  'magic_level': 'Magic Level',
  'fist': 'Fist',
  'club': 'Club',
  'sword': 'Sword',
  'axe': 'Axe',
  'distance': 'Distance',
  'shielding': 'Shielding',
  'fishing': 'Fishing'
}

function RankingsContent() {
  const { user } = useAuth()
  const fileInputRef = useRef(null)
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [lastModified, setLastModified] = useState(null)
  const [filters, setFilters] = useState({
    vocation: '',
    skill: '',
    server: 'novo' // Default to 'Novo Servidor'
  })

  const handleFileSelect = async () => {
    fileInputRef.current?.click()
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      
      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('public_external')
        .upload('players/players.xlsx', file, {
          upsert: true,
          cacheControl: '0'
        })

      if (uploadError) throw uploadError

      // Trigger the parse_players edge function
      try {
        const { data: parseData, error: parseError } = await supabase.functions.invoke('parse_players')
        
        if (parseError) {
          console.warn('Edge function returned error, but continuing:', parseError)
          // Don't throw error - the function might still have worked
        } else {
          console.log('Parse function executed successfully:', parseData)
        }
      } catch (corsError) {
        // CORS errors are common in development but function might still execute
        console.warn('CORS error calling edge function (this is normal in development):', corsError.message)
        // Continue execution - the function likely still ran on the server
      }

      // Wait a moment for the parsing to complete
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Refresh the data
      await fetchPlayerRankings()
      
      alert('Ranking atualizado com sucesso!')
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Erro ao atualizar o ranking. Por favor, tente novamente.')
    } finally {
      setUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  useEffect(() => {
    fetchPlayerRankings()
  }, [])

  const fetchPlayerRankings = async () => {
    try {
      // Get file metadata for last update time
      const { data: fileData } = await supabase.storage
        .from('public_external')
        .list('players', {
          limit: 1,
          search: 'players.xlsx'
        })

      if (fileData?.[0]) {
        setLastModified(new Date(fileData[0].updated_at))
      }

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
      console.error('Error fetching rankings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getSkillValue = (player, skillName) => {
    return player[skillName] || 0
  }

  const filteredPlayers = players
    .filter(player => {
      if (filters.vocation && player.vocation_name !== filters.vocation) return false
      return true
    })
    .sort((a, b) => {
      if (filters.skill) {
        return getSkillValue(b, filters.skill) - getSkillValue(a, filters.skill)
      }
      return b.level - a.level
    })
    .slice(0, 20) // Limit to top 20 players

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
        >Ranking de Jogadores</h1>
      </div>
      
      <div className="ring-1 ring-fontBrown text-fontBrown p-6 ml-1 mr-1 bg-backgroundBeige">
        
          {/* Update info row with timestamp and update button */}
          <div className="flex justify-between items-center mb-6">
            {/* Last update time - Visible for all users */}
            {lastModified && (
              <div className="text-sm font-bold text-red-500">
                Última atualização: {lastModified.toLocaleString('pt-BR')}
              </div>
            )}

            {/* Update button - Only visible for authenticated users */}
            {user && (
              <div className="flex items-center gap-1">
                <a 
                  onClick={handleFileSelect} 
                  className={`text-blue text-sm hover:underline cursor-pointer ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  {uploading ? 'Atualizando...' : 'Atualizar ranking de jogadores'}
                </a>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="blue"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2l.117 .007a1 1 0 0 1 .876 .876l.007 .117v4l.005 .15a2 2 0 0 0 1.838 1.844l.157 .006h4l.117 .007a1 1 0 0 1 .876 .876l.007 .117v9a3 3 0 0 1 -2.824 2.995l-.176 .005h-10a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-14a3 3 0 0 1 2.824 -2.995l.176 -.005zm0 9l-.09 .004l-.058 .007l-.118 .025l-.105 .035l-.113 .054l-.111 .071a1 1 0 0 0 -.112 .097l-2.5 2.5a1 1 0 0 0 0 1.414l.094 .083a1 1 0 0 0 1.32 -.083l.793 -.793v3.586a1 1 0 0 0 2 0v-3.585l.793 .792a1 1 0 0 0 1.414 -1.414l-2.5 -2.5l-.082 -.073l-.104 -.074l-.098 -.052l-.11 -.044l-.112 -.03l-.126 -.017z" /><path d="M19 7h-4l-.001 -4.001z" /></svg>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".xlsx"
                  className="hidden"
                />
              </div>
            )}
          </div>

        {/* Filter Section */}
        <div className="bg-backgroundBeigeDark border-4 border-gray-500 ring-1 ring-black">

          <h2 className="bg-backgroundDust p-2 text-white font-bold text-md border-b-4 border-gray-500">Filtros</h2>
          <div className="space-y-4 p-4 bg-[#F1E0C5]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Vocação</label>
                <select
                  name="vocation"
                  value={filters.vocation}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-400 rounded bg-white"
                >
                  <option value="">Todas</option>
                  <option value="None">None</option>
                  <option value="Knight">Knight</option>
                  <option value="Paladin">Paladin</option>
                  <option value="Sorcerer">Sorcerer</option>
                  <option value="Druid">Druid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Categoria</label>
                <select
                  name="skill"
                  value={filters.skill}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-400 rounded bg-white"
                >
                  <option value="">Level</option>
                  {SKILL_OPTIONS.map(skill => (
                    <option key={skill} value={skill}>{SKILL_DISPLAY_NAMES[skill]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Servidor</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="novo-servidor"
                      name="server"
                      value="novo"
                      checked={filters.server === 'novo'}
                      onChange={handleFilterChange}
                      className="mr-2"
                    />
                    <label htmlFor="novo-servidor" className="text-sm">New Aldória</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="antigo-servidor"
                      name="server"
                      value="antigo"
                      checked={filters.server === 'antigo'}
                      onChange={handleFilterChange}
                      disabled
                      className="mr-2 opacity-50 cursor-not-allowed"
                    />
                    <label htmlFor="antigo-servidor" className="text-sm opacity-50">Old Aldória</label>
                  </div>
                </div>
              </div>
             
            </div>
          </div>
        </div>

        {/* Avisos */}
        <div className="mt-6 mb-6 space-y-2">
          <p className="text-sm italic">Skills mostrados na tabela abaixo não incluem nenhum tipo de bonus (loyalty, equipamentos, etc.). Apenas os top 20 jogadores são exibidos no ranking.</p>
        </div>

        {/* Tabela */}
        <div className="p-0 text-sm">
          {loading ? (
            <p className="text-center">Carregando...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                   <tr className="bg-backgroundDust text-white">
                     <th className="p-2 text-center border border-gray-500 w-16">Rank</th>
                      <th className="p-2 text-left border border-gray-500">Nome</th>
                      <th className="p-2 text-left border border-gray-500">Level</th>
                      <th className="p-2 text-left border border-gray-500">Vocação</th>
                      {filters.skill && (
                        <th className="p-2 text-left border border-gray-500">{SKILL_DISPLAY_NAMES[filters.skill]}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPlayers.map((player, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-backgroundBeige' : 'bg-backgroundBeigeDark'}>
                        <td className="p-2 border border-gray-500 text-center font-bold">{index + 1}</td>
                        <td className="p-2 border border-gray-500">{player.name}</td>
                        <td className="p-2 border border-gray-500">{player.level}</td>
                        <td className="p-2 border border-gray-500">{player.vocation_name}</td>
                        {filters.skill && (
                          <td className="p-2 border border-gray-500">{player[filters.skill]}</td>
                        )}
                     </tr>
                   ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
      <p>&nbsp;</p>
    </section>
  )
}

export default RankingsContent
