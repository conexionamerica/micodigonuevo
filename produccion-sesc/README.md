# Produccion SESC

Dashboard web para análisis estadístico de datos de producción con cálculo de conformidad.

## Características

- 📊 Análisis estadístico completo (media, desviación, rango, cuartiles)
- 📈 Índices de capacidad del proceso (Cp, Cpk)
- ✅ Análisis de conformidad (% dentro/fuera de especificación)
- 📁 Importación de archivos Excel (.xlsx, .xls)
- 🎯 Límites de especificación configurables
- 📱 Interfaz responsive

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Build para producción
npm run build
```

## Formato del Archivo Excel

### Opción 1: Solo Mediciones
```
| Medicion |
|----------|
| 10.2     |
| 10.5     |
| 10.1     |
| 9.8      |
```

### Opción 2: Con Límites de Especificación
```
| Medicion | LSL  | USL  |
|----------|------|------|
| 10.2     | 9.5  | 10.8 |
| 10.5     | 9.5  | 10.8 |
| 10.1     | 9.5  | 10.8 |
```

**Nota**: El parser es flexible y acepta variaciones en los nombres de columnas:
- Mediciones: `Medicion`, `medicion`, `Medición`, `value`, `Value`, `measurement`
- LSL: `LSL`, `lsl`, `LIE`
- USL: `USL`, `usl`, `LSE`

## Uso

1. Abre la aplicación en tu navegador
2. Sube un archivo Excel con tus datos de producción
3. (Opcional) Ingresa los límites de especificación LSL y USL
4. Revisa las estadísticas y análisis de conformidad

## Métricas Calculadas

### Estadísticas Básicas
- Media (x̄)
- Desviación Estándar (σ)
- Mínimo, Máximo
- Mediana
- Cuartiles (Q1, Q3)
- Rango

### Índices de Capacidad
- **Cp**: Capacidad del proceso = (USL - LSL) / (6σ)
- **Cpk**: Capacidad centrada = min[(USL - x̄) / 3σ, (x̄ - LSL) / 3σ]

### Conformidad
- Porcentaje de conformidad
- Cantidad de mediciones dentro/fuera de especificación
- Desglose de no conformidades (altas/bajas)

## Interpretación de Índices

### Cp (Capacidad del Proceso)
- **≥ 2.0**: Excelente - Proceso muy capaz
- **≥ 1.33**: Aceptable - Proceso capaz
- **≥ 1.0**: Marginal - Proceso justo
- **< 1.0**: Pobre - Proceso no capaz

### Cpk (Capacidad Centrada)
- **≥ 1.33**: Aceptable - Proceso centrado y capaz
- **≥ 1.0**: Marginal - Monitoreo requerido
- **< 1.0**: Pobre - Acción correctiva necesaria

## Tecnologías

- React 18
- Vite
- Tailwind CSS
- xlsx (SheetJS) - Parsing de Excel
- simple-statistics - Cálculos estadísticos
- Lucide React - Iconos

## Estructura del Proyecto

```
produccion-sesc/
├── src/
│   ├── lib/
│   │   ├── excelParser.js    # Parsing de Excel
│   │   ├── statistics.js     # Cálculos estadísticos
│   │   └── utils.js          # Utilidades
│   ├── App.jsx                # Componente principal
│   ├── main.jsx               # Entry point
│   └── index.css              # Estilos
├── package.json
└── README.md
```

## Licencia

Proyecto privado - Produccion SESC

---

Creado para análisis de conformidad estadística en procesos de producción
