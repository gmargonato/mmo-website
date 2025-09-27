import { useState } from 'react'

function ExpTableContent() {
  const [calculatorLevel, setCalculatorLevel] = useState('')
  const [calculatedExp, setCalculatedExp] = useState(null)
  const [currentPage, setCurrentPage] = useState(0) // 0 = levels 1-50, 1 = levels 51-100, etc.

  // Formula: (50*level^3 - 300*level^2 + 850*level - 600)/3
  const calculateExp = (level) => {
    if (level < 1) return 0
    return Math.floor((50 * Math.pow(level, 3) - 300 * Math.pow(level, 2) + 850 * level - 600) / 3)
  }

  const handleCalculate = () => {
    const level = parseInt(calculatorLevel)
    if (level && level > 0) {
      setCalculatedExp(calculateExp(level))
    } else {
      setCalculatedExp(null)
    }
  }

  const generateTableData = (startLevel, endLevel) => {
    const data = []
    for (let level = startLevel; level <= endLevel; level++) {
      data.push({
        level: level,
        exp: calculateExp(level)
      })
    }
    return data
  }

  const getPageRange = () => {
    const startLevel = currentPage * 50 + 1
    const endLevel = Math.min((currentPage + 1) * 50, 600) // Max level 600
    return { startLevel, endLevel }
  }

  const { startLevel, endLevel } = getPageRange()
  const tableData = generateTableData(startLevel, endLevel)
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
          Tabela de Experiência
        </h1>
      </div>
      
      <div className="ring-1 ring-fontBrown text-fontBrown p-6 ml-1 mr-1 bg-backgroundBeige">
        
        {/* Introduction */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 text-md space-y-4">
            <p>Em Aldória OT Server, você evolui muito mais rápido! Aqui você ganha 2x mais experiência no New Aldória, e 5x mais no Old Aldória.</p>

            
            {/* Experience Calculator */}
            <h3 className="font-bold text-lg mb-3">Calculadora de Experiência</h3>
            <div className="space-y-2 bg-backgroundBeigeDark p-2 border-2 border-[#FAF0D7] ring-2 ring-[#5F4D41] shadow-[5px_8px_4px_rgba(135,96,63,0.9)]"> 
              
              <div className="items-start gap-4 flex">
                <label className="font-medium">Level desejado:</label>
                <input
                  type="number"
                  min="1"
                  max="600"
                  value={calculatorLevel}
                  onChange={(e) => setCalculatorLevel(e.target.value)}
                  className="px-2 py-1 border border-gray-400 rounded w-20"
                  placeholder="ex: 50"
                />
                <button
                  onClick={handleCalculate}
                  className="bg-[#0010CB] hover:bg-[#005EEE] text-[#FCD954] font-bold px-4 py-1 border-2 border-black rounded text-sm">Calcular</button>
              </div>
              {calculatedExp !== null && (
                <div className="mt-2">
                  <p>Experiência necessária para level {calculatorLevel}: {calculatedExp.toLocaleString()}</p>
                </div>
              )}
            </div>

          </div>
          <div className="md:w-1/3 flex-shrink-0">
            <img src="assets/exp-table.png" alt="Experience Table" className="w-[250px] h-auto object-contain mx-auto" />
          </div>
        </div>

        {/* Table Pagination Controls */}
        <div className="flex items-center justify-center mb-4">
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className={`mr-4 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}
          >
            <img src="ui/arrow-up.gif" alt="Previous" className="w-6 h-6 transform -rotate-90" />
          </button>
          
          <h2 className="font-bold text-xl">
            Níveis {startLevel}-{endLevel}
          </h2>
          
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={endLevel >= 600}
            className={`ml-4 ${endLevel >= 600 ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}
          >
            <img src="ui/arrow-up.gif" alt="Next" className="w-6 h-6 transform rotate-90" />
          </button>
        </div>

        {/* Experience Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-backgroundDust text-white">
              <th className="p-2 text-center border border-gray-500">Level</th>
              <th className="p-2 text-center border border-gray-500">Experiência Necessária</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-backgroundBeige' : 'bg-backgroundBeigeDark'}>
                <td className="p-2 text-center border border-gray-500">{row.level}</td>
                <td className="p-2 text-center border border-gray-500">{row.exp.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Additional Info */}
        <p className="mt-6 text-sm italic">A experiência real pode variar dependendo de diversos fatores como bônus de eventos, stamina, etc.</p>

      </div>
      <p>&nbsp;</p>
    </section>
  )
}

export default ExpTableContent
