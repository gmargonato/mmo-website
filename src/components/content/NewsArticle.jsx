import { useAuth } from '../../contexts/AuthContext'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import NewArticleDialog from '../dialogs/NewArticleDialog'
import ImagePreviewDialog from '../dialogs/ImagePreviewDialog'
import NewTickerDialog from '../dialogs/NewTickerDialog'

function NewsArticle() {
  const { user } = useAuth()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingArticle, setEditingArticle] = useState(null)
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState({ src: '', alt: '' })
  
  // News Ticker states
  const [isTickerDialogOpen, setIsTickerDialogOpen] = useState(false)
  const [newsItems, setNewsItems] = useState([])
  const [tickerLoading, setTickerLoading] = useState(true)
  const [tickerError, setTickerError] = useState(null)

  // Category icons mapping
  const categoryIcons = {
    technical: 'ui/news_technical.gif',
    community: 'ui/news_community.gif',
    dev: 'ui/news_dev.gif',
    support: 'ui/news_support.gif',
    cipsoft: 'ui/news_cipsoft.gif'
  }

  const fetchArticles = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('news_article')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      setArticles(data || [])
    } catch (err) {
      setError(err.message)
      console.error('Error fetching articles:', err)
    } finally {
      setLoading(false)
    }
  }

  // News Ticker functions
  const fetchNewsItems = async () => {
    try {
      setTickerLoading(true)
      const { data, error } = await supabase
        .from('news_ticker')
        .select('id, category, message, posted_at')
        .order('posted_at', { ascending: false })
        .limit(5)

      if (error) throw error

      const transformedNews = data.map(item => ({
        id: item.id,
        category: item.category,
        text: item.message,
        time: formatDate(item.posted_at)
      }))

      setNewsItems(transformedNews)
    } catch (error) {
      console.error('Error fetching news:', error)
      setTickerError(error.message)
    } finally {
      setTickerLoading(false)
    }
  }

  const handleDeleteNewsItem = async (id) => {
    try {
      const { error } = await supabase
        .from('news_ticker')
        .delete()
        .eq('id', id)

      if (error) throw error

      console.log('News item deleted successfully')
      fetchNewsItems()
    } catch (error) {
      console.error('Error deleting news:', error)
    }
  }

  useEffect(() => {
    fetchArticles()
    fetchNewsItems()
  }, [])

  const handleArticleSuccess = () => {
    // Refresh the articles list when a new article is created/updated
    fetchArticles()
    setEditingArticle(null)
  }

  const handleEditArticle = (article) => {
    setEditingArticle(article)
    setIsDialogOpen(true)
  }

  const handleDeleteArticle = async (articleId) => {
    if (!window.confirm('Tem certeza que deseja deletar este artigo?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('news_article')
        .delete()
        .eq('id', articleId)

      if (error) throw error

      // Refresh the articles list
      fetchArticles()
    } catch (err) {
      console.error('Error deleting article:', err)
      alert('Erro ao deletar artigo: ' + err.message)
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingArticle(null)
  }

  const handleImagePreview = (imageSrc, imageAlt) => {
    setPreviewImage({ src: imageSrc, alt: imageAlt })
    setIsImagePreviewOpen(true)
  }

  const handleCloseImagePreview = () => {
    setIsImagePreviewOpen(false)
    setPreviewImage({ src: '', alt: '' })
  }

  const capitalizeWords = (str) => {
    if (!str) return ''
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = date.toLocaleDateString('pt-BR', { month: 'short' }).slice(0, 3)
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  // Available letter images
  const availableLetters = ['A', 'B', 'D', 'F', 'H', 'I', 'M', 'N', 'O', 'S', 'T', 'U', 'W', 'Y', 'Z']
  
  const getLetterImage = (letter) => {
    const upperLetter = letter.toUpperCase()
    if (availableLetters.includes(upperLetter)) {
      return `/letters/letter_martel_${upperLetter}.gif`
    }
    return null
  }

  const processArticleContent = (htmlContent) => {
    if (!htmlContent) return { firstChar: null, remainingContent: htmlContent }

    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlContent

    // Get the text content to find the first character
    const textContent = tempDiv.textContent || tempDiv.innerText || ''
    const firstChar = textContent.trim().charAt(0)

    if (!firstChar) return { firstChar: null, remainingContent: htmlContent }

    // Get the letter image path
    const letterImagePath = getLetterImage(firstChar)

    if (!letterImagePath) return { firstChar: null, remainingContent: htmlContent }

    // Remove the first character from the HTML content
    // Find the first text node and remove its first character
    const walker = document.createTreeWalker(
      tempDiv,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Only process text nodes that are not inside script or style tags
          const parentElement = node.parentElement
          if (parentElement && (parentElement.tagName === 'SCRIPT' || parentElement.tagName === 'STYLE')) {
            return NodeFilter.FILTER_REJECT
          }
          return NodeFilter.FILTER_ACCEPT
        }
      },
      false
    )

    const firstTextNode = walker.nextNode()
    if (firstTextNode && firstTextNode.textContent) {
      const trimmedText = firstTextNode.textContent.trimStart()
      if (trimmedText.length > 0 && trimmedText.charAt(0) === firstChar) {
        // Remove only the first character from this text node
        firstTextNode.textContent = firstTextNode.textContent.substring(1)
      }
    }

    return {
      firstChar: letterImagePath,
      remainingContent: tempDiv.innerHTML
    }
  }

  return (
    <div className="space-y-6">
      {/* News Ticker Section */}
      <section className="bg-[#DEBB9D] overflow-hidden shadow-lg">
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
          >
            Anúncios
          </h1>
          {/* Only visible for authenticated users */}
          {user && (
            <div className="flex items-center gap-1 mt-1 mb-4">
              <svg className="text-blue" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4.929 4.929a10 10 0 1 1 14.141 14.141a10 10 0 0 1 -14.14 -14.14zm8.071 4.071a1 1 0 1 0 -2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0 -2h-2v-2z" /></svg>
              <a onClick={() => setIsTickerDialogOpen(true)} className="text-blue text-sm hover:underline cursor-pointer">Adicionar notícia</a>
            </div>
          )}
        </div>

        {/* News Ticker Section */}
        <div className="pl-1 pr-1 mb-1 -mt-1">
          <div className="border border-[#793D03] text-fontBrown">
            {tickerLoading ? (
              <div className="flex items-center justify-center p-4">
                <span className="text-sm">Carregando notícias...</span>
              </div>
            ) : tickerError ? (
              <div className="flex items-center justify-center p-4">
                <span className="text-sm text-red-600">Erro ao carregar notícias: {tickerError}</span>
              </div>
            ) : newsItems.length === 0 ? (
              <div className="flex items-center justify-center p-4">
                <span className="text-sm">Nenhuma notícia encontrada.</span>
              </div>
            ) : (
              newsItems.map((item, index) => (
                <div 
                  key={item.id}
                  className={`flex items-start space-x-1 p-0 ${
                    index % 2 === 0 ? 'bg-backgroundBeige' : 'bg-backgroundBeigeDark'
                  }`}
                >
                   <div className="flex items-center justify-between w-full pl-1 pr-2">
                     <div className="flex items-center space-x-3">
                       <img 
                         src={categoryIcons[item.category]} 
                         alt="" 
                         className="w-4 h-4"
                       />
                       <span className="font-semibold text-sm">{item.time}</span>
                       <p className="text-sm">{item.text}</p>
                     </div>
                     {user && (
                        <button 
                          className="text-red-600 flex-shrink-0 ml-4" 
                          onClick={() => handleDeleteNewsItem(item.id)}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        </button>
                      )}
                   </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Bottom border for the News Ticker Section*/}
        <div 
          className="px-0 py-6 -mt-10"
          style={{
            backgroundImage: 'url("ui/border-center.gif")',
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'left bottom'
          }}
        />
      
      </section>

      {/* Articles Section */}
      <section className="bg-backgroundBrown font-fontBrown shadow-lg">

      {/* Top border for the Articles Section */}
      <img src="ui/corner-tl.gif" alt="Border" className="w-auto h-[17px] -mb-[17px]" />
      <div 
        className="px-0 py-1 -mb-1"
        style={{
          backgroundImage: 'url("ui/border-center.gif")',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'left top'
        }}
      />

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
        >
          Notícias
        </h1>
      </div>

      {/* Only visible for authenticated users */}
      {user && (
        <div className="flex items-center gap-1 mt-1 mb-3 pl-4">
          <svg className="text-blue" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4.929 4.929a10 10 0 1 1 14.141 14.141a10 10 0 0 1 -14.14 -14.14zm8.071 4.071a1 1 0 1 0 -2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0 -2h-2v-2z" /></svg>
          <a onClick={() => setIsDialogOpen(true)} className="text-blue text-sm hover:underline cursor-pointer">Adicionar artigo</a>
        </div>
      )}
      
      <div className="space-y-6 ring-1 ring-fontBrown p-2 ml-1 mr-1 bg-backgroundBeige">

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <p className="text-[#5A2800]">Carregando artigos...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-backgroundBeigeDark border-4 border-gray-500 text-[#EF001A] px-4 py-2 flex items-center gap-2">
            <img src="ui/attentionsign.gif" className="w-8" />
            <div>
              <p className="font-bold">Erro ao carregar artigos:</p>
              {error}
            </div>
          </div>
        )}

        {/* Articles List */}
        {!loading && !error && articles.length === 0 && (
          <div className="text-center py-8">
            <p className="text-[#5A2800]">Nenhum artigo encontrado.</p>
          </div>
        )}

        {!loading && !error && articles.map((article) => (
          <div key={article.id}>
            {/* Article Header */}
            <div 
              className="px-4 h-[26px] flex items-center justify-between"
              style={{
                backgroundImage: 'url("ui/title-red.gif")',
                backgroundRepeat: 'repeat-x',
                backgroundPosition: 'left top'
              }}
            >
              <div className="flex items-center flex-1 min-w-0">
                <img 
                  src={categoryIcons[article.category] || 'ui/nav-support.gif'} 
                  className="mr-2 h-5" 
                  alt={article.category}
                />
                <h1 className="text-white text-xs mr-4">
                  {formatDate(article.created_at)}
                </h1>
                <p className="text-white font-bold text-xs truncate">
                  {capitalizeWords(article.title) || 'Sem Título'}
                </p>
              </div>
              
              {/* Edit and Delete buttons - only visible for authenticated users */}
              {user && (
                <div className="flex items-center gap-2 ml-2">
                  <button
                    onClick={() => handleEditArticle(article)}
                    className="text-white hover:text-yellow-300 transition-colors"
                    title="Editar artigo"
                  >
                    <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                      <path d="M16 5l3 3" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteArticle(article.id)}
                    className="text-white hover:text-red-300 transition-colors"
                    title="Deletar artigo"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M4 7l16 0" />
                      <path d="M10 11l0 6" />
                      <path d="M14 11l0 6" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Article Content */}
            <div className="p-4 bg-backgroundBeige min-h-[300px]">
              {/* Article Image - positioned to the right */}
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title || 'Imagem do artigo'}
                  className="float-right ml-4 mb-2 w-auto max-w-[200px] h-auto max-h-[300px] object-contain cursor-pointer"
                  style={{ 
                    shapeOutside: 'margin-box',
                    zIndex: 10,
                    position: 'relative'
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleImagePreview(article.image, article.title || 'Imagem do artigo')
                  }}
                />
              )}

              {/* Article Text Content */}
              <div className="text-[#5A2800] text-sm leading-relaxed">
                {(() => {
                  const { firstChar, remainingContent } = processArticleContent(article.html_body)

                  return (
                    <>
                      {firstChar ? (
                        <div className="relative">
                          <img
                            src={firstChar}
                            alt="First letter"
                            className="float-left w-[25px] h-[25px] object-contain mr-1"
                            style={{
                              shapeOutside: 'margin-box',
                              marginTop: '-0.2em'
                            }}
                          />
                          <div
                            dangerouslySetInnerHTML={{ __html: remainingContent }}
                            className="article-content"
                          />
                        </div>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{ __html: article.html_body }}
                          className="article-content"
                        />
                      )}
                    </>
                  )
                })()}
              </div>
            </div>
          </div>
        ))}

      </div>
      <p>&nbsp;</p>

      </section>

      {/* Dialogs */}
      <ImagePreviewDialog
        isOpen={isImagePreviewOpen}
        onClose={handleCloseImagePreview}
        imageSrc={previewImage.src}
        imageAlt={previewImage.alt}
      />

      <NewArticleDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleArticleSuccess}
        editingArticle={editingArticle}
      />

      <NewTickerDialog 
        isOpen={isTickerDialogOpen}
        onClose={() => setIsTickerDialogOpen(false)}
        onSuccess={() => fetchNewsItems()}
      />
    </div>
  )
}

export default NewsArticle
