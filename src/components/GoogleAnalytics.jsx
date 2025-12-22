import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Google Analytics Component
 * 
 * INSTRUCCIONES DE USO:
 * 1. Crea una cuenta en Google Analytics: https://analytics.google.com
 * 2. Obtén tu ID de medición (formato: G-XXXXXXXXXX)
 * 3. Reemplaza 'G-XXXXXXXXXX' abajo con tu ID real
 * 4. Importa este componente en App.jsx
 * 5. Agrega <GoogleAnalytics /> dentro del Router
 */

const MEASUREMENT_ID = 'G-XXXXXXXXXX'; // ⚠️ REEMPLAZAR CON TU ID REAL

const GoogleAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        // Solo ejecutar si el ID fue configurado
        if (MEASUREMENT_ID === 'G-XXXXXXXXXX') {
            console.warn('⚠️ Google Analytics no configurado. Por favor actualiza el MEASUREMENT_ID en GoogleAnalytics.jsx');
            return;
        }

        // Cargar el script de Google Analytics
        if (!window.gtag) {
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            window.gtag = function () {
                window.dataLayer.push(arguments);
            };
            window.gtag('js', new Date());
            window.gtag('config', MEASUREMENT_ID);
        }
    }, []);

    // Rastrear cambios de página
    useEffect(() => {
        if (window.gtag && MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
            window.gtag('config', MEASUREMENT_ID, {
                page_path: location.pathname + location.search,
            });
        }
    }, [location]);

    return null;
};

export default GoogleAnalytics;
