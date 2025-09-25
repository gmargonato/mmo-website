function NotFoundContent() {
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
          >Página não encontrada</h1>
        </div>
        
        <div className="ring-1 ring-fontBrown text-fontBrown p-6 ml-1 mr-1 bg-backgroundBeige">
          
          <img src="assets/manutencao.png" alt="em manutenção" className="w-3/4 h-full object-cover items-center mx-auto" />
          
        </div>
        <p>&nbsp;</p>
      </section>
    )
  }
  
  export default NotFoundContent
  