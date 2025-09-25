import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import NewStoreItemDialog from '../dialogs/NewStoreItemDialog'

function ShopContent() {
  const { user } = useAuth()
  const [storeItems, setStoreItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isStoreDialogOpen, setIsStoreDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  useEffect(() => {
    fetchStoreItems()
  }, [])

  const fetchStoreItems = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('store')
        .select('*')
        .order('category', { ascending: true })
        .order('service_name', { ascending: true })

      if (error) {
        throw error
      }

      setStoreItems(data || [])
    } catch (err) {
      console.error('Error fetching store items:', err)
      setError('Erro ao carregar itens da loja')
    } finally {
      setLoading(false)
    }
  }

  const handleDialogSuccess = () => {
    fetchStoreItems() // Refresh the items list
    setEditingItem(null)
  }

  const handleEditItem = (item) => {
    setEditingItem(item)
    setIsStoreDialogOpen(true)
  }

  // Group items by category
  const groupedItems = storeItems.reduce((groups, item) => {
    const category = item.category || 'Outros'
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(item)
    return groups
  }, {})

  const StoreItemCard = ({ item }) => (
    <div className="space-y-4 bg-backgroundBeigeDark p-4 border-2 border-[#FAF0D7] ring-2 ring-[#5F4D41] shadow-[5px_8px_4px_rgba(135,96,63,0.9)] relative text-center"> 
      {/* Edit button for authenticated users */}
      {user && (
        <button
          onClick={() => handleEditItem(item)}
          className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-1 rounded text-xs z-10"
          title="Editar item"
        >
          <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="white"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="bg-blue rounded-md"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
        </button>
      )}
      
      {/* Item Title */}
      <h3 className="text-lg font-bold text-fontBrown">
        {item.service_name}
      </h3>
      
      {/* Item Image */}
      <div className="h-24 flex items-center justify-center mx-auto">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.service_name}
            className="max-h-full max-w-full object-contain"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div className="hidden items-center justify-center w-full h-full text-fontBrown">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
        </div>
      </div>
      
      {/* Item Description */}
      {item.service_description && (
        <p className="text-sm text-fontBrown leading-relaxed">
          {item.service_description}
        </p>
      )}
      
      {/* Buy Button */}
      <div className="flex justify-center">
        <div className="mx-auto font-belwe text-xl">Doe R$ {item.price}
        </div>
      </div>
    </div>
  )

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
        >Loja Aldória</h1>
        {/* Only visible for authenticated users */}
        {user && (
          <div className="flex items-center gap-1 mt-1 mb-4">
            <svg className="text-blue" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4.929 4.929a10 10 0 1 1 14.141 14.141a10 10 0 0 1 -14.14 -14.14zm8.071 4.071a1 1 0 1 0 -2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0 -2h-2v-2z" /></svg>
            <a onClick={() => {
              setEditingItem(null)
              setIsStoreDialogOpen(true)
            }} className="text-blue text-sm hover:underline cursor-pointer">Adicionar itens à loja</a>
          </div>
        )}
      </div>
      
      <div className="ring-1 ring-fontBrown text-fontBrown p-6 ml-1 mr-1 bg-backgroundBeige">
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-fontBrown"></div>
            <p className="mt-2 text-fontBrown">Carregando itens da loja...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600 text-lg">{error}</p>
            <button 
              onClick={fetchStoreItems}
              className="mt-4 bg-fontBrown hover:bg-opacity-80 text-backgroundBeige px-4 py-2 rounded"
            >
              Tentar novamente
            </button>
          </div>
        ) : Object.keys(groupedItems).length === 0 ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Loja em construção</h2>
            <p className="text-lg">
              Em breve você poderá adquirir itens especiais, premium points e muito mais!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedItems)
              .sort(([categoryA], [categoryB]) => categoryA.localeCompare(categoryB))
              .map(([category, items]) => (
              <div key={category}>
                {/* Category Header */}
                <div 
                  className="px-4 mb-4"
                  style={{
                    backgroundImage: 'url("ui/title-blue.jpg")',
                    backgroundRepeat: 'repeat-x',
                    backgroundPosition: 'left top'
                  }}
                >
                  <h2 className="text-white text-xl font-bold">{category}</h2>
                </div>
                
                {/* Items Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {items.map((item, index) => (
                    <StoreItemCard key={`${item.service_name}-${index}`} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
      <p>&nbsp;</p>

      {/* Store Item Dialog */}
      <NewStoreItemDialog
        isOpen={isStoreDialogOpen}
        onClose={() => {
          setIsStoreDialogOpen(false)
          setEditingItem(null)
        }}
        onSuccess={handleDialogSuccess}
        editingItem={editingItem}
      />
    </section>
  )
}

export default ShopContent
