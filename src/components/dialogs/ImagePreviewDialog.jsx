import { useEffect } from 'react'

function ImagePreviewDialog({ isOpen, onClose, imageSrc, imageAlt }) {
  // Handle escape key to close dialog
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when dialog is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Handle click outside to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <section
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      style={{ position: 'fixed', zIndex: 50 }}
      onClick={handleBackdropClick}
    >
      <div
        className="flex flex-col items-center justify-center"
        style={{
          position: 'relative',
          zIndex: 50
        }}
      >
        {/* Content - Full Size Image */}
        <div className="flex flex-col items-center">
          
          <img
            src={imageSrc}
            alt={imageAlt || 'Imagem'}
            className="min-w-[300px] max-w-[90vw] max-h-[85vh] object-contain"
            style={{
              display: 'block'
            }}
            onLoad={(e) => {
              // Match header width to image width
              const header = e.target.previousElementSibling
              if (header) {
                header.style.width = `${e.target.offsetWidth}px`
              }
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default ImagePreviewDialog
