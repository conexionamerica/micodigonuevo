import * as ss from 'simple-statistics';

export const calculateStatistics = (measurements, lsl = null, usl = null) => {
    if (!measurements || measurements.length === 0) {
        return null;
    }

    const mean = ss.mean(measurements);
    const stdDev = ss.standardDeviation(measurements);
    const min = ss.min(measurements);
    const max = ss.max(measurements);
    const median = ss.median(measurements);

    // Calculate range
    const range = max - min;

    // Calculate quartiles
    const q1 = ss.quantile(measurements, 0.25);
    const q3 = ss.quantile(measurements, 0.75);

    // Process Capability Indices
    let cp = null;
    let cpk = null;
    let cpkUpper = null;
    let cpkLower = null;

    if (lsl !== null && usl !== null) {
        // Cp = (USL - LSL) / (6 * sigma)
        cp = (usl - lsl) / (6 * stdDev);

        // Cpk = min[(USL - mean) / 3*sigma, (mean - LSL) / 3*sigma]
        cpkUpper = (usl - mean) / (3 * stdDev);
        cpkLower = (mean - lsl) / (3 * stdDev);
        cpk = Math.min(cpkUpper, cpkLower);
    } else if (usl !== null) {
        // Only upper limit
        cpkUpper = (usl - mean) / (3 * stdDev);
        cpk = cpkUpper;
    } else if (lsl !== null) {
        // Only lower limit
        cpkLower = (mean - lsl) / (3 * stdDev);
        cpk = cpkLower;
    }

    // Conformity analysis
    const inSpec = measurements.filter(v =>
        (lsl === null || v >= lsl) && (usl === null || v <= usl)
    ).length;

    const outOfSpecLow = lsl !== null ? measurements.filter(v => v < lsl).length : 0;
    const outOfSpecHigh = usl !== null ? measurements.filter(v => v > usl).length : 0;
    const outOfSpec = outOfSpecLow + outOfSpecHigh;

    const conformity = (inSpec / measurements.length) * 100;

    // Control limits (for control chart)
    const ucl = mean + 3 * stdDev;  // Upper Control Limit
    const lcl = mean - 3 * stdDev;  // Lower Control Limit

    return {
        // Basic statistics
        mean: Number(mean.toFixed(4)),
        stdDev: Number(stdDev.toFixed(4)),
        min: Number(min.toFixed(4)),
        max: Number(max.toFixed(4)),
        median: Number(median.toFixed(4)),
        range: Number(range.toFixed(4)),
        q1: Number(q1.toFixed(4)),
        q3: Number(q3.toFixed(4)),

        // Process capability
        cp: cp !== null ? Number(cp.toFixed(4)) : null,
        cpk: cpk !== null ? Number(cpk.toFixed(4)) : null,
        cpkUpper: cpkUpper !== null ? Number(cpkUpper.toFixed(4)) : null,
        cpkLower: cpkLower !== null ? Number(cpkLower.toFixed(4)) : null,

        // Conformity
        total: measurements.length,
        inSpec,
        outOfSpec,
        outOfSpecLow,
        outOfSpecHigh,
        conformity: Number(conformity.toFixed(2)),
        nonConformity: Number((100 - conformity).toFixed(2)),

        // Control limits
        ucl: Number(ucl.toFixed(4)),
        lcl: Number(lcl.toFixed(4)),
    };
};

// Interpretation helpers
export const interpretCp = (cp) => {
    if (cp === null) return { level: 'N/A', color: 'gray', description: 'Sin límites de especificación' };
    if (cp >= 2.0) return { level: 'Excelente', color: 'green', description: 'Proceso muy capaz' };
    if (cp >= 1.33) return { level: 'Aceptable', color: 'blue', description: 'Proceso capaz' };
    if (cp >= 1.0) return { level: 'Marginal', color: 'yellow', description: 'Proceso justo' };
    return { level: 'Pobre', color: 'red', description: 'Proceso no capaz' };
};

export const interpretCpk = (cpk) => {
    if (cpk === null) return { level: 'N/A', color: 'gray', description: 'Sin límites de especificación' };
    if (cpk >= 1.33) return { level: 'Aceptable', color: 'green', description: 'Proceso centrado y capaz' };
    if (cpk >= 1.0) return { level: 'Marginal', color: 'yellow', description: 'Monitoreo requerido' };
    return { level: 'Pobre', color: 'red', description: 'Acción correctiva necesaria' };
};
