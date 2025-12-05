import * as XLSX from 'xlsx';

export const parseSESCExcel = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet, { defval: '' });

                // Procesar datos y validar
                const processedData = jsonData.map((row, index) => {
                    // Buscar columnas con nombres flexibles
                    const projeto = row.Projeto || row.projeto || row.PROJETO || row.Proyecto || '';
                    const mes = row.Mes || row.mes || row.MES || row.Mês || '';
                    const subjetividade = row.Subjetividade || row.subjetividade || row.SUBJETIVIDADE || '';
                    const presenca = parseFloat(row.Presença || row.Presenca || row.presenca || row.PRESENCA || 0);
                    const pessoasAtendidas = parseFloat(row.Pessoas_Atendidas || row.pessoas_atendidas || row['Pessoas Atendidas'] || row.PESSOAS_ATENDIDAS || 0);

                    return {
                        linha: index + 2, // +2 porque Excel empieza en 1 y tiene header
                        projeto,
                        mes,
                        subjetividade: String(subjetividade).toLowerCase(),
                        presenca,
                        pessoasAtendidas,
                        rawData: row
                    };
                });

                resolve({
                    data: processedData,
                    total: processedData.length
                });
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
    });
};

// Validar según reglas SESC
export const validateSESCData = (data) => {
    const errors = [];
    const tiposValidos = ['apresentação', 'mediadas', 'exposição', 'intercambio'];

    data.forEach(row => {
        const { linha, projeto, mes, subjetividade, presenca, pessoasAtendidas } = row;

        // Validación 1: Tipo de actividad válido
        const tipoEncontrado = tiposValidos.some(tipo =>
            subjetividade.includes(tipo)
        );

        if (!tipoEncontrado && subjetividade) {
            errors.push({
                linha,
                projeto,
                mes,
                tipo: 'TIPO_INVALIDO',
                mensagem: `Subjetividade inválida: "${subjetividade}". Debe contener: apresentação, mediadas, exposição o intercambio`,
                severidade: 'warning'
            });
        }

        // Validación 2: Si presença > 0, então deve haver número > 0 e pessoas_atendidas <= presença
        if (presenca > 0) {
            // Debe haber personas atendidas > 0
            if (pessoasAtendidas <= 0) {
                errors.push({
                    linha,
                    projeto,
                    mes,
                    tipo: 'PESSOAS_ZERO',
                    mensagem: `Presença = ${presenca} mas Pessoas Atendidas = ${pessoasAtendidas}. Deve ser > 0`,
                    severidade: 'error'
                });
            }

            // Pessoas atendidas não pode ser maior que presença
            if (pessoasAtendidas > presenca) {
                errors.push({
                    linha,
                    projeto,
                    mes,
                    tipo: 'PESSOAS_MAIOR',
                    mensagem: `Pessoas Atendidas (${pessoasAtendidas}) maior que Presença (${presenca})`,
                    severidade: 'error'
                });
            }
        }

        // Validación 3: Se presença = 0, pessoas atendidas também deve ser 0
        if (presenca === 0 && pessoasAtendidas > 0) {
            errors.push({
                linha,
                projeto,
                mes,
                tipo: 'INCONSISTENCIA',
                mensagem: `Presença = 0 mas Pessoas Atendidas = ${pessoasAtendidas}. Deve ser 0`,
                severidade: 'error'
            });
        }
    });

    return errors;
};

// Calcular estadísticas de conformidad
export const calculateConformity = (data, errors) => {
    const totalLinhas = data.length;
    const linhasComErro = new Set(errors.map(e => e.linha)).size;
    const linhasConformes = totalLinhas - linhasComErro;

    const errorsByType = errors.reduce((acc, error) => {
        acc[error.tipo] = (acc[error.tipo] || 0) + 1;
        return acc;
    }, {});

    const errorsBySeverity = errors.reduce((acc, error) => {
        acc[error.severidade] = (acc[error.severidade] || 0) + 1;
        return acc;
    }, {});

    return {
        totalLinhas,
        linhasConformes,
        linhasComErro,
        totalErros: errors.length,
        conformidade: ((linhasConformes / totalLinhas) * 100).toFixed(2),
        errorsByType,
        errorsBySeverity
    };
};
