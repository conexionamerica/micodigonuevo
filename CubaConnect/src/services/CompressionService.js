import LZString from 'lz-string';
import pako from 'pako';

/**
 * Servicio de compresión para optimizar el uso de datos
 * Utiliza diferentes algoritmos según el tipo de datos
 */
class CompressionService {
    /**
     * Comprime texto usando LZ-String
     * Ideal para mensajes de chat
     * @param {string} text - Texto a comprimir
     * @returns {string} Texto comprimido en base64
     */
    compressText(text) {
        if (!text || text.length === 0) return '';

        try {
            // LZ-String es muy eficiente para texto
            const compressed = LZString.compressToBase64(text);

            // Solo usar compresión si reduce el tamaño
            return compressed.length < text.length ? compressed : text;
        } catch (error) {
            console.error('Error compressing text:', error);
            return text;
        }
    }

    /**
     * Descomprime texto comprimido con LZ-String
     * @param {string} compressed - Texto comprimido
     * @returns {string} Texto original
     */
    decompressText(compressed) {
        if (!compressed || compressed.length === 0) return '';

        try {
            const decompressed = LZString.decompressFromBase64(compressed);
            return decompressed || compressed; // Fallback si no está comprimido
        } catch (error) {
            console.error('Error decompressing text:', error);
            return compressed;
        }
    }

    /**
     * Comprime datos binarios usando Pako (gzip)
     * Ideal para imágenes, audio, video
     * @param {Uint8Array|ArrayBuffer} data - Datos a comprimir
     * @returns {Uint8Array} Datos comprimidos
     */
    compressBinary(data) {
        try {
            const uint8Array = data instanceof ArrayBuffer
                ? new Uint8Array(data)
                : data;

            return pako.deflate(uint8Array, { level: 9 }); // Máxima compresión
        } catch (error) {
            console.error('Error compressing binary:', error);
            return data;
        }
    }

    /**
     * Descomprime datos binarios
     * @param {Uint8Array} compressed - Datos comprimidos
     * @returns {Uint8Array} Datos originales
     */
    decompressBinary(compressed) {
        try {
            return pako.inflate(compressed);
        } catch (error) {
            console.error('Error decompressing binary:', error);
            return compressed;
        }
    }

    /**
     * Comprime un objeto JSON
     * @param {Object} obj - Objeto a comprimir
     * @returns {string} JSON comprimido en base64
     */
    compressJSON(obj) {
        try {
            const jsonString = JSON.stringify(obj);
            return this.compressText(jsonString);
        } catch (error) {
            console.error('Error compressing JSON:', error);
            return JSON.stringify(obj);
        }
    }

    /**
     * Descomprime un objeto JSON
     * @param {string} compressed - JSON comprimido
     * @returns {Object} Objeto original
     */
    decompressJSON(compressed) {
        try {
            const jsonString = this.decompressText(compressed);
            return JSON.parse(jsonString);
        } catch (error) {
            console.error('Error decompressing JSON:', error);
            return null;
        }
    }

    /**
     * Comprime una imagen en base64
     * @param {string} base64Image - Imagen en base64
     * @param {number} quality - Calidad de compresión (0-1)
     * @returns {Promise<string>} Imagen comprimida
     */
    async compressImage(base64Image, quality = 0.6) {
        try {
            // En una implementación real, usarías expo-image-manipulator
            // Por ahora, solo comprimimos el base64
            return this.compressText(base64Image);
        } catch (error) {
            console.error('Error compressing image:', error);
            return base64Image;
        }
    }

    /**
     * Calcula la tasa de compresión
     * @param {number} originalSize - Tamaño original en bytes
     * @param {number} compressedSize - Tamaño comprimido en bytes
     * @returns {number} Porcentaje de compresión
     */
    getCompressionRatio(originalSize, compressedSize) {
        if (originalSize === 0) return 0;
        return ((1 - compressedSize / originalSize) * 100).toFixed(2);
    }

    /**
     * Estima el tamaño de un string en bytes
     * @param {string} str - String a medir
     * @returns {number} Tamaño en bytes
     */
    getByteSize(str) {
        return new Blob([str]).size;
    }

    /**
     * Comprime un mensaje completo (con metadatos)
     * @param {Object} message - Mensaje a comprimir
     * @returns {Object} Mensaje comprimido
     */
    compressMessage(message) {
        const compressed = {
            ...message,
            text: message.text ? this.compressText(message.text) : null,
            compressed: true,
            originalSize: this.getByteSize(JSON.stringify(message))
        };

        compressed.compressedSize = this.getByteSize(JSON.stringify(compressed));
        compressed.ratio = this.getCompressionRatio(
            compressed.originalSize,
            compressed.compressedSize
        );

        return compressed;
    }

    /**
     * Descomprime un mensaje completo
     * @param {Object} message - Mensaje comprimido
     * @returns {Object} Mensaje original
     */
    decompressMessage(message) {
        if (!message.compressed) return message;

        return {
            ...message,
            text: message.text ? this.decompressText(message.text) : null,
            compressed: false
        };
    }
}

export default new CompressionService();
