function MapContent() {
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
        >Mapa Aldória</h1>
      </div>
      
      <div className="ring-1 ring-fontBrown text-fontBrown p-6 ml-1 mr-1 bg-backgroundBeige">
        
        <h1 className="text-center text-2xl font-bold mb-6 items-center">Clique no mapa para ver em alta resolução</h1>
        <img 
          src="https://i.servimg.com/u/f24/18/00/04/42/mapa_111.jpg" 
          alt="Mapa Aldória" 
          className="w-[300px] h-full object-cover items-center mx-auto cursor-pointer" 
          onClick={() => window.open('https://i.servimg.com/u/f24/18/00/04/42/mapa_111.jpg', '_blank')}
        />
        
      </div>
      <p>&nbsp;</p>
    </section>
  )
}

export default MapContent
