import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

function NewTickerDialog({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState('technical')

  const categories = [
    { value: 'technical', label: 'Tecnico', icon: 'ui/news_technical.gif' },
    { value: 'community', label: 'Comunidade', icon: 'ui/news_community.gif' },
    { value: 'dev', label: 'Desenvolvimento', icon: 'ui/news_dev.gif' },
    { value: 'support', label: 'Suporte', icon: 'ui/news_support.gif' },
    { value: 'cipsoft', label: 'Aldória', icon: 'ui/news_cipsoft.gif' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      const { error } = await supabase
        .from('news_ticker')
        .insert([
          {
            category,
            message,
            posted_at: new Date().toISOString()
          }
        ])

      if (error) throw error

      setSuccess(true)
      setMessage('')
      
      // Refresh the news list
      onSuccess()
      
      // Close dialog after showing success message
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Reset states when dialog opens
  useEffect(() => {
    if (isOpen) {
      setError(null)
      setSuccess(false)
      setMessage('')
      setCategory('technical')
      setLoading(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <section className="fixed -inset-6 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-backgroundBeige border-4 border-gray-500 ring-1 ring-black max-w-lg w-full mx-4">
        {/* Header */}
        <div 
          className="px-4 py-0 flex justify-between items-center"
          style={{
            backgroundImage: 'url("ui/title-blue.jpg")',
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'left top'
          }}
        >
          <h1 className="text-fontBeige font-martel text-2xl flex items-center"
          style={{
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
          }}
          >Adicionar Notícia</h1>
          <button 
            onClick={onClose}
            className="text-blue hover:text-red-500"
          >
            <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 2h-14a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3 -3v-14a3 3 0 0 0 -3 -3zm-9.387 6.21l.094 .083l2.293 2.292l2.293 -2.292a1 1 0 0 1 1.497 1.32l-.083 .094l-2.292 2.293l2.292 2.293a1 1 0 0 1 -1.32 1.497l-.094 -.083l-2.293 -2.292l-2.293 2.292a1 1 0 0 1 -1.497 -1.32l.083 -.094l2.292 -2.293l-2.292 -2.293a1 1 0 0 1 1.32 -1.497z" /></svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Feedback Messages */}
          {error && (
            <div className="bg-backgroundBeigeDark border-4 border-gray-500 text-[#EF001A] px-4 py-2 flex items-center gap-2">
              <img src="ui/attentionsign.gif" className="w-8" />
              <div>
                <p className="font-bold">O seguinte erro ocorreu:</p>
                {error}
              </div>
            </div>
          )}
          
          {success && (
            <div className="bg-backgroundBeigeDark border-4 border-gray-500 text-green-700 px-4 py-2 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="font-bold">Notícia postada com sucesso!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category Selection */}
            <div className="space-y-2">
              <label className="block text-[#5A2800] font-bold mb-2">
                Categoria:
              </label>
              <div className="bg-backgroundBeigeDark p-3 border-2 border-[#FAF0D7] ring-2 ring-[#5F4D41] shadow-[5px_8px_4px_rgba(135,96,63,0.9)] space-y-2">
                {categories.map(cat => (
                  <label key={cat.value} className="flex items-center gap-3 cursor-pointer hover:bg-[#E6D5B9] p-1 rounded">
                    <input
                      type="radio"
                      name="category"
                      value={cat.value}
                      checked={category === cat.value}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-4 h-4 cursor-pointer"
                      required
                    />
                    <img src={cat.icon} alt="" className="w-4 h-4" />
                    <span className="text-[#5A2800]">{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <label className="block text-[#5A2800] font-bold">
                Mensagem: <span className="text-sm font-normal">({140 - message.length} caracteres restantes)</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 140))}
                className="w-full px-3 py-2 border border-gray-500 bg-white text-black h-24 resize-none"
                placeholder="Digite sua mensagem aqui..."
                required
                maxLength={140}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || success}
                className="
                bg-[#0010CB] hover:bg-[#005EEE] text-[#FCD954] font-martel px-12 py-1 border-2 border-black rounded-md 
                [background:linear-gradient(180deg,#0a2bb8_0%,#0b42ff_38%,#0b4bff_50%,#0b35e2_62%,#08259d_100%)]
                disabled:opacity-50 disabled:cursor-not-allowed
                "
                style={{
                  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.35), inset 0 -2px 0 rgba(0, 0, 0, 0.45), inset 0 0 0 1px #0a1f86'
                }}
              >
                {loading ? 'Postando...' : success ? 'Postado!' : 'Postar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default NewTickerDialog
