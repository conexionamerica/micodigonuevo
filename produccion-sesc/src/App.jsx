import { useState } from 'react'
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2, Info } from 'lucide-react'
import { parseSESCExcel, validateSESCData, calculateConformity } from './lib/excelParser'

function App() {
    const [data, setData] = useState(null)
    const [errors, setErrors] = useState([])
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        setLoading(true)
        setError(null)

        try {
            const result = await parseSESCExcel(file)
            setData(result.data)

            const validationErrors = validateSESCData(result.data)
            setErrors(validationErrors)

            const conformityStats = calculateConformity(result.data, validationErrors)
            setStats(conformityStats)
        } catch (err) {
            setError('Error al procesar el archivo: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'error': return 'bg-red-50 border-red-200 text-red-800'
            case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800'
            default: return 'bg-blue-50 border-blue-200 text-blue-800'
        }
    }

    const getSeverityIcon = (severity) => {
        switch (severity) {
            case 'error': return <AlertCircle className="h-5 w-5 text-red-600" />
            case 'warning': return <Info className="h-5 w-5 text-yellow-600" />
            default: return <Info className="h-5 w-5 text-blue-600" />
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <FileSpreadsheet className="h-8 w-8 text-blue-600" />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Produccion SESC</h1>
                            <p className="text-sm text-gray-600">Validação de Dados de Produção</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* Upload Area */}
                <div className="bg-white p-8 rounded-lg shadow mb-6">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="h-12 w-12 text-blue-500 mb-3" />
                            <p className="mb-2 text-lg font-semibold text-gray-700">
                                {loading ? 'Procesando...' : 'Click para subir archivo Excel'}
                            </p>
                            <p className="text-sm text-gray-500">Archivos .xlsx o .xls</p>
                            <p className="text-xs text-gray-400 mt-2">
                                Columnas: Projeto, Mes, Subjetividade, Presença, Pessoas_Atendidas
                            </p>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            accept=".xlsx,.xls"
                            onChange={handleFileUpload}
                            disabled={loading}
                        />
                    </label>

                    {error && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">
                            {error}
                        </div>
                    )}
                </div>

                {/* Statistics Summary */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="text-sm text-gray-500">Total de Linhas</div>
                            <div className="text-2xl font-bold text-gray-900">{stats.totalLinhas}</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="text-sm text-gray-500">Conformidade</div>
                            <div className="text-2xl font-bold text-green-600">{stats.conformidade}%</div>
                            <div className="text-xs text-gray-600 mt-1">{stats.linhasConformes} linhas</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="text-sm text-gray-500">Com Erros</div>
                            <div className="text-2xl font-bold text-red-600">{stats.linhasComErro}</div>
                            <div className="text-xs text-gray-600 mt-1">linhas com problemas</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="text-sm text-gray-500">Total Erros</div>
                            <div className="text-2xl font-bold text-orange-600">{stats.totalErros}</div>
                            <div className="text-xs text-gray-600 mt-1">erros detectados</div>
                        </div>
                    </div>
                )}

                {/* Error List */}
                {errors && errors.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-red-600" />
                                Lista de Erros ({errors.length})
                            </h3>
                            <button
                                onClick={() => {
                                    const csv = errors.map(e =>
                                        `${e.linha},${e.projeto},${e.mes},${e.tipo},${e.mensagem},${e.severidade}`
                                    ).join('\n')
                                    const blob = new Blob([`Linha,Projeto,Mes,Tipo,Mensagem,Severidade\n${csv}`], { type: 'text/csv' })
                                    const url = URL.createObjectURL(blob)
                                    const a = document.createElement('a')
                                    a.href = url
                                    a.download = 'erros-validacao.csv'
                                    a.click()
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                            >
                                Exportar Erros (CSV)
                            </button>
                        </div>

                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {errors.map((err, idx) => (
                                <div
                                    key={idx}
                                    className={`p-4 border rounded-lg ${getSeverityColor(err.severidade)}`}
                                >
                                    <div className="flex items-start gap-3">
                                        {getSeverityIcon(err.severidade)}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold">Linha {err.linha}</span>
                                                {err.projeto && <span className="text-sm">• Projeto: {err.projeto}</span>}
                                                {err.mes && <span className="text-sm">• Mês: {err.mes}</span>}
                                                <span className="ml-auto text-xs font-mono bg-white px-2 py-1 rounded">
                                                    {err.tipo}
                                                </span>
                                            </div>
                                            <p className="text-sm">{err.mensagem}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Success Message */}
                {data && errors.length === 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                        <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-green-900 mb-2">
                            ¡Validación Exitosa!
                        </h3>
                        <p className="text-green-700">
                            Todos los {stats?.totalLinhas} registros están conformes con las reglas de validación.
                        </p>
                    </div>
                )}

                {!data && !loading && (
                    <div className="text-center py-12 text-gray-500">
                        <FileSpreadsheet className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                        <p>Sube un archivo Excel para validar los datos de producción</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
