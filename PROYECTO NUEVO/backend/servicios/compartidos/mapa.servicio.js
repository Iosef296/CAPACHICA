// backend/servicios/compartidos/mapa.servicio.js
// Simulación de servicios de mapa (Google Maps o OSRM)
class MapaService {
    async calcularDistancia(desde, hasta) {
        // Simulación: retorna distancia en km
        const R = 6371;
        const dLat = (hasta.latitud - desde.latitud) * (Math.PI / 180);
        const dLon = (hasta.longitud - desde.longitud) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(desde.latitud * (Math.PI / 180)) * Math.cos(hasta.latitud * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    async calcularRuta(puntos) {
        // Simulación: retorna ruta en GeoJSON
        return {
            type: 'FeatureCollection',
            features: puntos.map((p, i) => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [p.longitud, p.latitud],
                },
                properties: { index: i },
            })),
        };
    }
}

module.exports = new MapaService();