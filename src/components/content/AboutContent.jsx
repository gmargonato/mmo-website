function AboutContent() {
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
          Sobre Tibia Aldória
        </h1>
      </div>
      
      <div className="ring-1 ring-fontBrown text-fontBrown p-6 ml-1 mr-1 bg-backgroundBeige">
        
        {/* Sobre */}
        <img src="assets/cm_bemvindo.jpg" alt="History Image" className="max-w-3/4 h-full object-cover items-center mx-auto mb-6" />
        <p className="text-md mb-6">
          <b>On-line desde 2006</b>, Aldória é um dos servidores <b>retrô alternativos</b> mais bem sucedidos. Mais de <b>28.000</b> jogadores de todo o mundo já passaram por estas terras e puderam deixar suas marcas.
          </p>
        
        {/* História */}
        <p className="text-md mb-6">
          Agindo como <b>cavaleiros, paladinos, magos ou druidas</b>, os jogadores são confrontados com o desafio de desenvolver as <b>habilidades</b> de seus personagens selecionados, explorando uma grande variedade de áreas perigosas como masmorras, cavernas e tumbas, interagindo com outros jogadores em um nível social e diplomático. Além do <b>bate-papo</b>, os jogadores tem <b>total liberdade em Aldoria</b> e acabam criando uma enorme experiência em jogo.
          <img src="assets/what_is_aldoria.png" alt="History Image" className="max-w-3/4 h-full object-cover items-center mx-auto mt-6 mb-6" />
          Aldória OT Server tenta trazer a você o Máximo de diversão mantendo sempre as características originais do Old Tibia. Como <b>Jogabilidade Clássica do 7.6 e 8.0</b>, contamos com quase todo conteúdo original do mapa e quests, e possuímos alguns lugares extras, como cidades e ilhas feitas pela própria equipe Aldória. <b>Os níveis de Experiência aqui são maiores que no Oficial</b>, 2x No Servidor New Aldoria e 5x no Servidor Old Aldoria, isso significa que você evolui muito mais rápido. (ex: uma criatura que antes daria 100 de XP aqui no Old Aldoria você ganha 500), aqui você também evolui seus Skills e Magic level muito mais rápido que no Tibia Oficial.
        </p>
        <img src="assets/what_is_tibia_vocations.jpg" alt="History Image" className="max-w-3/4 h-full object-cover items-center mx-auto mb-6" />
        <p className="text-md"> 
          Tíbia Aldória <b>pode ser jogado gratuitamente</b> por qualquer pessoa. No entanto, sua conta pode ser atualizado a qualquer momento para uma <b>conta Premium</b>. Vantagens de ser um jogador Premium Account incluem o acesso a áreas especiais do jogo e itens especiais, bem como novas funcionalidades relacionadas ao jogo.
          <br /><br />
          Você sempre terra uma grande ajuda pela equipe Aldória, constituída por tutores e gamemasters, garante que os jogadores posam desfrutar de Tudo em Tibia Aldória. Tutores podem responder às perguntas dos jogadores não experientes, você só deve entrar no canal de ajuda do jogo. Gamemasters fazem os jogadores cumprir o Regimento Tibia Aldória, um código especial de conduta que determina o que os jogadores estão autorizados a fazer no jogo e quais não.
          <br /><br />
          Mais <b>Informações detalhadas</b> sobre o jogo pode ser encontradas em nosso Forum.
        </p>

      </div>
      <p>&nbsp;</p>
    </section>
  )
}

export default AboutContent
