const RULES_DICTIONARY = {
  nomes: {
    title: "Nomes",
    items: [
      'Nomes contendo linguagem de insultos (ex. "Bastard"), racista (ex. "Nigger"), extremistas (ex. "Hitler"), sexual (ex. "Bitch") ou ofensiva (ex. "Copkiller")',
      'Nomes contendo partes de sentenças (ex. "Mike returns"), combinação de letras sem sentido (ex. "Fgfshdsfg") ou formatos inválidos (ex. "Thegreatknight")',
      'Nomes que obviamente não descrevem uma pessoa (ex. "Árvoredenatal", "Matrix"), nomes de celebridades na vida real (ex. "Britney Spears"), nomes que se referem a países reais (ex. "Brazilian Druid")',
      'Nomes que são criados para falsificar a identidade de outros jogadores (ex. "GM Ado" ao invés de "GM Aldo") ou posições oficiais (ex. "System Admin")'
    ],
    comments: 'No jogo Aldoria, a escolha do nome do personagem é fundamental e definitiva, devendo refletir uma identidade coerente com o ambiente de fantasia medieval. São proibidos nomes ofensivos, com conotações sexuais, extremistas, relacionados a drogas, violentos ou degradantes, bem como combinações aleatórias de letras, frases, abreviações, grafias distorcidas, uso excessivo de caracteres especiais e nomes de objetos, marcas, países, localidades ou sentimentos. Também não é permitido utilizar nomes de celebridades contemporâneas, falsificar a identidade de outros jogadores ou simular cargos oficiais do jogo. O nome deve ser sempre legível, começando com letra maiúscula, e soar como um nome de pessoa; violar essas regras pode resultar em namelock ou banimento da conta.' 
  },
  declaracoes: {
    title: "Declarações",
    items: [
        'Declarações de insulto, racistas, extremistas, sexuais, embaraçosas ou declarações ofensivas em geral.',
        'Repetindo declarações idênticas, similares ou sem sentido dentro de um curto período de tempo ou usar texto mal-formatado ("spamming").',
        'Anunciando conteúdo não-relacionado ao jogo ou oferecendo itens de Aldoria por dinheiro real.',
        'Declarações não relacionadas ao tópico em um game channel público ou fórum.',
        'Incentivar a violação das Regras.'
    ],
    comments: 'Em Aldoria, é proibido fazer declarações ofensivas — incluindo insultos, racismo, extremismo, conteúdo sexual ou embaraçoso — seja dentro do jogo, nos fóruns ou nas informações da conta, pois a intenção de ofender conta mais do que a forma usada, podendo resultar em banimento. Também não é permitido spamming, seja por repetição de mensagens, uso de textos sem sentido, formatações inadequadas ou arte ASCII, tanto nos canais públicos quanto nos fóruns, onde posts sem conteúdo relevante também são passíveis de punição. Anúncios não relacionados ao jogo, propaganda de outros produtos ou trocas de itens de Aldoria por dinheiro real são vetados, assim como conversas públicas em idiomas diferentes do inglês ou português, exceto em canais específicos como o RL-chat. Além disso, não é permitido incentivar ou enaltecer a violação das regras, sendo responsabilidade de cada jogador respeitar e orientar os demais sobre infrações observadas.' 
  },
  trapacas: {
    title: "Trapaças",
    items: [
        'Explorando erros óbvios do jogo ("bugs"), por exemplo para duplicar itens. Se você encontrar um erro você deve reporta-lo imediatamente à Aldória OT Server.',
        'Abuso intencional de fraquezas no jogo, por exemplo ordenar objetos ou jogadores de uma maneira que os outros jogadores não podem move-los.',
        'Tentando roubar os dados da account de outro jogador ("hacking").',
        'Oferecendo dados da account para outros jogadores ou aceitando os dados de outros jogadores ("comércio de account/sharing").',
    ],
    comments: 'Em Aldoria, é estritamente proibido explorar bugs ou abusar de fraquezas do jogo, sendo obrigação do jogador reportar imediatamente qualquer erro encontrado, sob risco de banimento ou até deleção da conta. Manipular o client, usar softwares externos ou programas de cheat também é ilegal e expõe o usuário a riscos de hacking. Da mesma forma, tentar roubar ou compartilhar dados de accounts, comprar, vender ou trocar personagens é proibido, já que cada conta deve pertencer e ser usada apenas por uma pessoa. Ameaçar ou fingir ser um Game Master, fornecer informações falsas em investigações ou fazer denúncias mal-intencionadas também resultam em punições severas, preservando a integridade do jogo e da comunidade.' 
  },
  gamemasters: {
    title: "Game Masters",
    items: [
        'Ameaçando um GM ou membro da equipe por causa de suas ações ou posição como um administrador.',
        'Fingindo ser um GM ou membro da equipe ou ter influencia nas decisões de um GM.',
        'Intencionalmente fornecendo informações erradas ou falsas para um GM a respeito de suas investigações ou fazendo denúncias falsas sobre violações de regras.'
    ],
    comments: 'Em Aldoria, ameaçar gamemasters ou a equipe, seja no jogo, no site ou em reclamações, é estritamente proibido e leva ao banimento; é obrigatório manter a comunicação respeitosa e restrita aos fatos. Também é ilegal vingar-se de personagens de gamemasters ou fingir ser um deles para enganar ou intimidar outros jogadores, incluindo alegar influência sobre suas decisões. Além disso, fornecer informações falsas em investigações, fazer denúncias sem fundamento ou acionar gamemasters sem motivo válido são condutas puníveis. Por fim, é importante lembrar que membros da equipe nunca solicitarão sua senha ou número de conta, e qualquer tentativa de se passar por eles é considerada grave violação das regras.'
    },
    playerkilling: {
        title: "Player Killing",
        items: [
            'Matando excessivamente personagens que não são marcados com uma " skull" (caveira) em mundos que não são PvP-enforced. Por favor note que matando personagens marcados não é uma razão para banimento.',
            'Uma violação das Regras de Aldoria pode levar ao banimento temporário de personagens e accounts. Em muitos casos é feita a remoção ou modificação de habilidades do personagem, atributos e pertences, assim como a remoção permanente de accounts sem nenhuma compensação a ser considerada. A sanção é baseada na seriedade da violação de regra e os registros anteriores do jogador. É determinada por um membro da equipe Aldoria que impôs o banimento.'
        ],
        comments: 'Em mundos de PvP regular em Aldoria, matar excessivamente personagens sem caveira (“skull”) é proibido e pode levar ao banimento automático da conta, independentemente do motivo pessoal da agressão; nesses casos, o sistema considera a morte como injusta. Embora seja permitido vingar-se de roubos ou insultos, a recomendação é tentar resolver conflitos por meio de diálogo e acordos antes de partir para a violência. Acumular muitas mortes injustas gera punições progressivas, como a red skull (caveira vermelha), que serve de alerta claro para parar imediatamente de atacar jogadores não marcados, já que o sistema de auto-banimento não permite apelação.'
    }

}

function RulesContent() {
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
          Regras do Servidor
        </h1>
      </div>
      
        <div className="ring-1 ring-fontBrown text-fontBrown p-6 ml-1 mr-1 bg-backgroundBeige">
          
        {/* Introdução: Imagem e Texto */}
        <div className="">
            <div className="flex flex-col md:flex-row mb-0">
                <div className="flex-1 text-md space-y-2">
                    <p>Aldoria é um role playing game online no qual milhares de jogadores do mundo todo se encontram todos os dias. Para garantir que este jogo seja divertido para todos Aldória OT Server espera que todos os jogadores se comportem de maneira razoável e amigável.</p>
                    <p>Aldória OT Server aponta "Game Masters" e Membros da Equipe Aldoria têm o poder de deter comportamento destrutivo no jogo, website ou forum, penalizando, banindo ou deletando personagens ou contas.</p>
                    <p>Este tipo de comportamento inclui, mas não é limitado às seguintes ofensas.</p>
                </div>
                <div className="flex-1 text-md">
                    <img src="assets/regras.png" alt="Rules Image" className="w-full max-w-[300px] h-auto object-contain mx-auto" />
                </div>
            </div>

            <p>Uma grande comunidade como a de Aldoria precisa de um código de conduta básico para prevenir o caos e comportamento injusto entre seus jogadores. Este código de conduta é listado e explicado nas Regras de Aldoria, incluindo alguns exemplos para clarificar como se espera do comportamento e quais ações você sempre deverá evitar. Entretanto, por favor note que as Regras de Aldoria não são limitadas apenas a estes exemplos.</p>
            <br />
            <p>Acima de tudo, você deve tratar os outros jogadores amigavelmente e com respeito, assim como você gostaria de ser tratado. Se comportamento agressivo e destrutivo contra os outros o faz sentir bem, este não é o lugar para você, porque esta atitude não vai leva-lo a lugar nenhum a não ser a um banimento.</p>
            <br />
            <p>Com o poder vem a responsabilidade, e você não deve abusar dos seus poderes para oprimir os outros e forçá-los a jogar pelas suas próprias regras. Ajude os outros ao invés de persegui-los, você sempre parecerá mais alto se tiver amparando alguém nos seus ombros. E às vezes é muito útil lembrar-se que Aldoria é apenas um jogo.</p>
        </div>
            

          {/* Rules Sections */}
          {Object.entries(RULES_DICTIONARY).map(([key, category]) => (
            <div key={key} className="mt-8 mb-8">
              {/* Category Title */}
              <div className="bg-backgroundDust p-2 text-white font-bold text-md border-4 border-gray-500">
                {category.title}
              </div>

               {/* Category Items */}
               <div className="bg-[#F1E0C5] p-4 border-4 border-t-0 border-gray-500">
                 {/* Items */}
                 <ul className="list-disc pl-6 space-y-2">
                   {category.items.map((item, index) => (
                     <li key={index}>{item}</li>
                   ))}
                 </ul>
                 
                 {/* Comments */}
                 {category.comments && (
                   <div className="mt-6 pt-4 border-t-2 border-gray-400">
                     <p className="text-sm italic">{category.comments}</p>
                   </div>
                 )}
               </div>
            </div>
          ))}

        <p>Uma violação das Regras de Aldoria pode levar ao banimento temporário de personagens e accounts. Em muitos casos é feita a remoção ou modificação de habilidades do personagem, atributos e pertences, assim como a remoção permanente de accounts sem nenhuma compensação a ser considerada. A sanção é baseada na seriedade da violação de regra e os registros anteriores do jogador. É determinada por um membro da equipe Aldoria que impôs o banimento.</p>
        <br />
        <p>Estas regras podem ser modificadas a qualquer momento. Todas as alterações serão anunciadas no website oficial ou forum.</p>
  
        </div>
      <p>&nbsp;</p>
    </section>
  )
}

export default RulesContent
