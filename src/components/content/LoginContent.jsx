import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

function LoginContent({ onContentChange }) {
  const { user, signOut } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setError(null)
      setLoading(true)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      
      // Successfully logged in
      console.log('Logged in:', data)
      // Return to news page after successful login
      onContentChange('news')
      
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

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
        >
          Gerenciamento de Conta
        </h1>
      </div>

      {/* Content Area */}
      <div className="space-y-6 ring-1 ring-fontBrown p-2 ml-1 mr-1 bg-backgroundBeige">
        
        {/* Error Message */}
        {error && (
          <div className="bg-backgroundBeigeDark border-4 border-gray-500 text-[#EF001A] px-4 py-2 flex items-center gap-2">
            <img src="ui/attentionsign.gif" className="w-8" />
            <div>
              <p className="font-bold">O seguinte erro ocorreu:</p>
              {error}
            </div>
          </div>
        )}

        {/* Form Entrar Com Conta */}
        <div className="bg-backgroundBeigeDark border-4 border-gray-500 ring-1 ring-black">

          <h2 className="bg-backgroundDust p-2 text-white font-bold text-md border-b-4 border-gray-500">Entre com sua conta Aldória</h2>

          <form onSubmit={handleLogin} className="space-y-2 p-4 bg-[#F1E0C5]">
            
            <div className="space-y-2 bg-backgroundBeigeDark p-2 border-2 border-[#FAF0D7] ring-2 ring-[#5F4D41] shadow-[5px_8px_4px_rgba(135,96,63,0.9)]"> 

              {/* Email */}
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="email" className="font-bold text-[#5A2800]">
                  Email:&nbsp;
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-500 bg-white text-black"
                  required
                />
              </div>

              {/* Senha */}
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="password" className="font-bold text-[#5A2800]">
                  Senha:
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-500 bg-white text-black"
                  required
                />
              </div>
              
              {/* Button Entrar */}
              <button
                type="submit"
                disabled={loading}
                className="
                mx-auto flex hover:brightness-110
                bg-[#0010CB] hover:bg-[#005EEE] text-[#FCD954] font-martel px-12 py-1 border-2 border-black rounded-md 
                [background:linear-gradient(180deg,#0a2bb8_0%,#0b42ff_38%,#0b4bff_50%,#0b35e2_62%,#08259d_100%)]
                " style={{
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,.35), inset 0 -2px 0 rgba(0, 0, 0, 0.45), inset 0 0 0 1px #0a1f86'
              }}
              >
                {loading ? 'Carregando' : 'Entrar'}
              </button>

            </div>
           </form>
         </div>
        
        {/* New Account */}
        <div className="mx-auto text-fontBrown p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Text Column */}
            <div className="space-y-2">
              <h1 className="font-bold text-2xl mb-6">Novo em Aldória?</h1>
              <p className="mb-6 font-bold">Siga o passo a passo para criar sua conta no servidor:</p>
              <p>1. Faça o download do cliente Aldória.</p>
              <p>2. Utilize as credenciais <b>Account Number 1</b> e <b>Password 1</b> para acessar o <i>Account Manager</i>.</p>
              <p>3. Crie uma conta com as credenciais que desejar e seu primeiro personagem.</p>
              <p>4. Faça o login com a conta recém criada e divirta-se!</p>
            </div>
            
            {/* Image Column */}
            <div className="flex flex-col items-center lg:items-end">
              <img 
                src="/assets/Ferumbras_Finger.png" 
                alt="Ferumbras Finger" 
                className="max-w-full h-auto"
              />
              <button 
                onClick={() => onContentChange('download')}
                className="
                px-6 py-2 rounded-lg transition-all duration-200 ease-in-out
                hover:brightness-110
                bg-[#0010CB] hover:bg-[#005EEE] text-[#FCD954] font-bold font-martel border-2 border-black 
                [background:linear-gradient(180deg,#0a2bb8_0%,#0b42ff_38%,#0b4bff_50%,#0b35e2_62%,#08259d_100%)]
                " style={{
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,.35), inset 0 -2px 0 rgba(0, 0, 0, 0.45), inset 0 0 0 1px #0a1f86'
              }}>
                Fazer Download
              </button>
            </div>
          </div>
        </div>

      </div>
      
      <p>&nbsp;</p>
    </section>
    
  )
}

export default LoginContent
