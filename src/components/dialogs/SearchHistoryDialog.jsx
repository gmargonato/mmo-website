import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

function SearchHistoryDialog({ isOpen, onClose }) {
  const [loading, setLoading] = useState(true)
  const [searches, setSearches] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isOpen) {
      fetchSearchHistory()
    }
  }, [isOpen])

  const fetchSearchHistory = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('pesquisa_player')
        .select('*')
        .order('search_time', { ascending: false })
        .limit(50)

      if (error) throw error
      setSearches(data)
    } catch (err) {
      console.error('Error fetching search history:', err)
      setError('Erro ao carregar histórico de buscas')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-backgroundBeige p-6 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-fontBrown">Histórico de Buscas</h2>
          <button 
            onClick={onClose}
            className="text-fontBrown hover:text-opacity-80"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-auto">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-fontBrown"></div>
              <p className="mt-2 text-fontBrown">Carregando histórico...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          ) : searches.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-fontBrown">Nenhuma busca registrada.</p>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-backgroundDust text-white">
                  <th className="p-2 text-left border border-gray-500">Nome do Jogador</th>
                  <th className="p-2 text-left border border-gray-500">Servidor</th>
                  <th className="p-2 text-left border border-gray-500">Encontrado</th>
                  <th className="p-2 text-left border border-gray-500">IP</th>
                  <th className="p-2 text-left border border-gray-500">Data/Hora</th>
                </tr>
              </thead>
              <tbody>
                {searches.map((search, index) => (
                  <tr key={search.id} className={index % 2 === 0 ? "bg-backgroundBeige" : "bg-backgroundBeigeDark"}>
                    <td className="p-2 border border-gray-500">{search.player_name}</td>
                    <td className="p-2 border border-gray-500">{search.server === 'New' ? 'New' : 'Old'}</td>
                    <td className="p-2 border border-gray-500">{search.success ? 'Sim' : 'Não'}</td>
                    <td className="p-2 border border-gray-500">{search.ip}</td>
                    <td className="p-2 border border-gray-500">{new Date(search.search_time).toLocaleString('pt-BR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchHistoryDialog
