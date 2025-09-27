import { ForumLink } from '../../constants'

function ForumContent() {
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
        >Fórum da Comunidade</h1>
      </div>
      
      <div className="ring-1 ring-fontBrown text-center items-center text-fontBrown p-6 ml-1 mr-1 bg-backgroundBeige">
        
        <img src="/assets/friends_1.png" className="w-full max-w-[500px] h-full mb-6 mx-auto" />
        <button 
          onClick={() => { window.open(ForumLink , '_blank') }}
          className="
          mx-auto w-[200px] h-[60px] px-9 rounded-lg transition-all duration-200 ease-in-out
          hover:brightness-125
          bg-[#0010CB] hover:bg-[#005EEE] text-[#FCD954] text-3xl font-bold font-martel border-2 border-black 
          [background:linear-gradient(180deg,#0a2bb8_0%,#0b42ff_38%,#0b4bff_50%,#0b35e2_62%,#08259d_100%)]
          flex items-center justify-center
          " style={{
          textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.35), inset 0 -2px 0 rgba(0, 0, 0, 0.45), inset 0 0 0 1px #0a1f86'
        }}>Acessar</button>
      </div>
        
      <p>&nbsp;</p>
    </section>
  )
}

export default ForumContent
