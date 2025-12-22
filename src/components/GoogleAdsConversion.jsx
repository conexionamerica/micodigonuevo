import { useEffect } from 'react';

/**
 * Google Ads Conversion Tracking
 * 
 * INSTRUCCIONES:
 * 1. Crea la conversión en Google Ads
 * 2. Copia el ID de conversión (AW-XXXXXXXXX)
 * 3. Copia el label de conversión
 * 4. Reemplaza abajo
 * 5. Importa este componente en WhatsAppFloat.jsx
 */

const CONVERSION_ID = 'AW-XXXXXXXXX'; // ⚠️ REEMPLAZAR
const CONVERSION_LABEL = 'XXXXXXXXXXXXX'; // ⚠️ REEMPLAZAR

const GoogleAdsConversion = () => {
    useEffect(() => {
        // Cargar script de Google Ads solo una vez
        if (!window.gtag && CONVERSION_ID !== 'AW-XXXXXXXXX') {
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${CONVERSION_ID}`;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            window.gtag = function () {
                window.dataLayer.push(arguments);
            };
            window.gtag('js', new Date());
            window.gtag('config', CONVERSION_ID);
        }
    }, []);

    return null;
};

// Función para rastrear conversión cuando hacen clic en WhatsApp
export const trackWhatsAppClick = () => {
    if (window.gtag && CONVERSION_ID !== 'AW-XXXXXXXXX') {
        window.gtag('event', 'conversion', {
            'send_to': `${CONVERSION_ID}/${CONVERSION_LABEL}`,
            'value': 50.0,
            'currency': 'BRL'
        });
        console.log('✅ Conversión de WhatsApp rastreada');
    }
};

export default GoogleAdsConversion;
