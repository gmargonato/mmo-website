import { ClientDownloadLink } from '../../constants';

function DownloadContent() {
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
        >Download</h1>
      </div>
      
      <div className="ring-1 ring-fontBrown text-fontBrown p-6 ml-1 mr-1 bg-backgroundBeige">
        
        <div className="mx-auto text-center items-center relative" style={{
          backgroundImage: 'url("assets/bg-thais.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto',
          backgroundPosition: 'center'
        }}>
          <h1 className="font-bold text-2xl mb-2">Entre para o Mundo de Aldória</h1>
          <p className="mb-6 text-md">Nada de Homer Simpson por aqui! Faça o download do cliente próprio de Aldória.</p>
          <div className="relative">
            <img src="assets/newcomer-lady-homer.png" className="w-[300px] mb-6 mx-auto" />
            <button 
              onClick={() => { window.open(ClientDownloadLink , '_blank') }}
              className="
              absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-5
              w-[300px] h-[60px] px-9 rounded-lg transition-all duration-200 ease-in-out
              hover:brightness-110
              bg-[#0010CB] hover:bg-[#005EEE] text-[#FCD954] font-bold font-martel border-2 border-black 
              [background:linear-gradient(180deg,#0a2bb8_0%,#0b42ff_38%,#0b4bff_50%,#0b35e2_62%,#08259d_100%)]
              flex items-center justify-center
              " style={{
              textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,.35), inset 0 -2px 0 rgba(0, 0, 0, 0.45), inset 0 0 0 1px #0a1f86'
            }}>
              <img 
                src="assets/download-button.png" 
                className="h-8 w-auto object-contain" 
                alt="download"
              />
            </button>
          </div>
        </div>
        
      </div>
      <p>&nbsp;</p>
    </section>
  )
}

export default DownloadContent
