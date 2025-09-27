import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

function DeathContent() {
  const [loading, setLoading] = useState(true)
  const [deaths, setDeaths] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchRecentDeaths()
  }, [])

  const fetchRecentDeaths = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('players')
        .select('name, level, deaths')
        .eq('access', 0)
        .not('deaths', 'is', null)

      if (error) throw error

      // Process and flatten death data
      const allDeaths = data.reduce((acc, player) => {
        try {
          const playerDeaths = typeof player.deaths === 'string' 
            ? JSON.parse(player.deaths) 
            : player.deaths

          if (Array.isArray(playerDeaths)) {
            const processedDeaths = playerDeaths.map(death => ({
              ...death,
              playerName: player.name,
              playerLevel: player.level
            }))
            return [...acc, ...processedDeaths]
          }
        } catch (e) {
          console.error('Error processing deaths for player:', player.name)
        }
        return acc
      }, [])

      // Sort by time and take most recent 20
      const sortedDeaths = allDeaths
        .sort((a, b) => new Date(b.time) - new Date(a.time))
        .slice(0, 20)

      setDeaths(sortedDeaths)
    } catch (err) {
      console.error('Error fetching deaths:', err)
      setError('Erro ao carregar mortes recentes')
    } finally {
      setLoading(false)
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
        >Mortes Recentes</h1>
      </div>
      
      <div className="ring-1 ring-fontBrown text-fontBrown p-6 ml-1 mr-1 bg-backgroundBeige">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-fontBrown"></div>
            <p className="mt-2 text-fontBrown">Carregando mortes recentes...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600 text-lg">{error}</p>
            <button 
              onClick={fetchRecentDeaths}
              className="mt-4 bg-fontBrown hover:bg-opacity-80 text-backgroundBeige px-4 py-2 rounded"
            >
              Tentar novamente
            </button>
          </div>
        ) : deaths.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg">Nenhuma morte registrada recentemente.</p>
          </div>
        ) : (
          <div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-backgroundDust text-white border border-gray-500">
                  <th className="p-2 text-left">Data</th>
                  <th className="p-2 text-left">Jogador</th>
                  <th className="p-2 text-left">Morreu para</th>
                </tr>
              </thead>
              <tbody>
                {deaths.map((death, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-backgroundBeige" : "bg-backgroundBeigeDark"}>
                    <td className="p-2 border border-gray-500 w-48">
                      {new Date(death.time).toLocaleString('pt-BR')}
                    </td>
                    <td className="p-2 border border-gray-500">
                      {death.playerName} (Level {death.playerLevel})
                    </td>
                    <td className="p-2 border border-gray-500">
                      {death.name.toLowerCase()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <p>&nbsp;</p>
    </section>
  )
}

export default DeathContent
