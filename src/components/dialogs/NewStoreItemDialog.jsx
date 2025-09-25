import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

function NewStoreItemDialog({ isOpen, onClose, onSuccess, editingItem = null }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    service_name: '',
    category: '',
    service_description: '',
    image: '',
    price: ''
  })
  const [selectedImage, setSelectedImage] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  useEffect(() => {
    if (editingItem) {
      setFormData({
        service_name: editingItem.service_name || '',
        category: editingItem.category || '',
        service_description: editingItem.service_description || '',
        image: editingItem.image || '',
        price: editingItem.price || ''
      })
    } else {
      setFormData({
        service_name: '',
        category: '',
        service_description: '',
        image: '',
        price: ''
      })
    }
    setError(null)
    setSuccess(false)
  }, [editingItem, isOpen])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (allowedTypes.includes(file.type)) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          setError('A imagem deve ter no máximo 5MB.')
          return
        }
        setSelectedImage(file)
        // Create preview URL
        const previewUrl = URL.createObjectURL(file)
        setFormData(prev => ({ ...prev, image: previewUrl }))
      } else {
        setError('Tipo de arquivo não suportado. Use JPG, PNG, GIF ou WebP.')
      }
    }
  }

  const uploadImageToStorage = async (file) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `store/${fileName}`

      const { error: uploadError, data } = await supabase.storage
        .from('public_external')
        .upload(filePath, file, {
          upsert: true,
          onUploadProgress: (progress) => {
            const percentage = (progress.loaded / progress.total) * 100
            setUploadProgress(Math.round(percentage))
          }
        })

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('public_external')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (err) {
      console.error('Error uploading image:', err)
      throw new Error('Erro ao fazer upload da imagem')
    }
  }

  const handleSubmit = async () => {
    if (!user) {
      setError('Você precisa estar logado para gerenciar a loja')
      return
    }

    if (!formData.service_name || !formData.category || !formData.price || !selectedImage) {
      setError('Por favor, preencha os campos obrigatórios: Nome, Categoria e Preço')
      return
    }

    try {
      setLoading(true)
      setError(null)
      setUploadProgress(0)

      let imageUrl = formData.image
      
      // If there's a new image selected, upload it
      if (selectedImage) {
        imageUrl = await uploadImageToStorage(selectedImage)
      }

      const itemData = {
        service_name: formData.service_name,
        category: formData.category,
        service_description: formData.service_description,
        image: imageUrl,
        price: formData.price
      }

      let result
      if (editingItem) {
        // Update existing item
        result = await supabase
          .from('store')
          .update(itemData)
          .eq('id', editingItem.id)
      } else {
        // Create new item
        result = await supabase
          .from('store')
          .insert([itemData])
      }

      if (result.error) {
        throw result.error
      }

      setSuccess(true)
      setTimeout(() => {
        onSuccess()
        onClose()
      }, 1500)

    } catch (err) {
      console.error('Error saving store item:', err)
      setError(err.message || 'Erro ao salvar item da loja')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!editingItem || !user) return
    
    if (!confirm('Tem certeza que deseja excluir este item?')) return

    try {
      setLoading(true)
      setError(null)

      const { error } = await supabase
        .from('store')
        .delete()
        .eq('id', editingItem.id)

      if (error) {
        throw error
      }

      setSuccess(true)
      setTimeout(() => {
        onSuccess()
        onClose()
      }, 1500)

    } catch (err) {
      console.error('Error deleting store item:', err)
      setError(err.message || 'Erro ao excluir item da loja')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <section className="fixed -inset-6 bg-black bg-opacity-50 z-50 flex items-center justify-center">
       <div className="bg-backgroundBeige border-4 border-gray-500 ring-1 ring-black max-w-lg w-full mx-4 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div 
          className="px-4 flex items-center justify-between"
          style={{
            backgroundImage: 'url("ui/title-green.gif")',
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'left top'
          }}
        >
          <h2 className="text-fontBeige font-martel text-xl font-bold"
          style={{
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
          }}
          >
            {editingItem ? 'Editar Item' : 'Adicionar novo item'}
          </h2>
          
          {/* Close/Cancel Button */}
          <button
            onClick={onClose}
            disabled={loading}
            className="text-fontBeige hover:text-white transition-colors duration-200 p-1"
            title="Cancelar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="icon icon-tabler icons-tabler-filled icon-tabler-square-x">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M19 2h-14a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3 -3v-14a3 3 0 0 0 -3 -3zm-9.387 6.21l.094 .083l2.293 2.292l2.293 -2.292a1 1 0 0 1 1.497 1.32l-.083 .094l-2.292 2.293l2.292 2.293a1 1 0 0 1 -1.32 1.497l-.094 -.083l-2.293 -2.292l-2.293 2.292a1 1 0 0 1 -1.497 -1.32l.083 -.094l2.292 -2.293l-2.292 -2.293a1 1 0 0 1 1.32 -1.497z" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              ✓ {editingItem ? 'Item atualizado' : 'Item criado'} com sucesso!
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Form */}
          <div className="space-y-4">
            {/* Service Name */}
            <div>
              <label className="block text-fontBrown font-bold mb-2">
                Nome do Serviço/Item *
              </label>
              <input
                type="text"
                value={formData.service_name}
                onChange={(e) => handleInputChange('service_name', e.target.value)}
                className="w-full p-2 border border-fontBrown rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Premium Account, Boost XP..."
                disabled={loading}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-fontBrown font-bold mb-2">
                Categoria *
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full p-2 border border-fontBrown rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Premium, Itens, Boost..."
                disabled={loading}
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-fontBrown font-bold mb-2">
                Preço (R$) *
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="w-full p-2 border border-fontBrown rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: 15.00, 25.90..."
                disabled={loading}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-fontBrown font-bold mb-2">
                Imagem
              </label>

              <div className="flex gap-4">
                {/* Left Side: Upload Controls */}
                <div className="w-1/2">
                  {/* File Input */}
                  <div className="flex items-center justify-center w-full">
                    <label
                      className={`w-full flex flex-col items-center justify-center px-4 py-6 bg-white rounded-lg border-2 border-fontBrown border-dashed cursor-pointer hover:bg-gray-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-fontBrown mb-3">
                          <path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z"/>
                        </svg>
                        <p className="mb-2 text-sm text-fontBrown">
                          <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                        </p>
                        <p className="text-xs text-fontBrown">
                          PNG, JPG, GIF ou WebP
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageSelect}
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                        disabled={loading}
                      />
                    </label>
                  </div>

                  {/* Upload Progress */}
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}
                </div>

                {/* Right Side: Preview */}
                <div className="w-1/2 flex items-center justify-center bg-white rounded-lg border-2 border-fontBrown p-4">
                  {formData.image ? (
                    <div className="relative w-full h-48">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-contain rounded"
                      />
                      <button
                        onClick={() => {
                          setFormData(prev => ({ ...prev, image: '' }))
                          setSelectedImage(null)
                          setUploadProgress(0)
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        type="button"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="text-fontBrown text-sm text-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="mx-auto mb-2 opacity-50">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                      </svg>
                      <p>Prévia da imagem</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-fontBrown font-bold mb-2">
                Descrição
              </label>
              <textarea
                value={formData.service_description}
                onChange={(e) => handleInputChange('service_description', e.target.value)}
                className="w-full p-2 border border-fontBrown rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                placeholder="Descrição detalhada do item/serviço..."
                disabled={loading}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 px-4 rounded transition-colors duration-200"
            >
              {loading ? 'Salvando...' : (editingItem ? 'Atualizar' : 'Criar Item')}
            </button>
            
            {editingItem && (
              <button
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-2 px-4 rounded transition-colors duration-200"
              >
                {loading ? 'Excluindo...' : 'Excluir'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewStoreItemDialog
