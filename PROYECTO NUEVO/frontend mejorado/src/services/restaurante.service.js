// src/services/restaurante.service.js
import { fetchAPI } from './api.js';

export async function obtenerRestaurantes(filtros = {}) {
    const params = new URLSearchParams();
    Object.entries(filtros).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            params.append(key, value);
        }
    });
    const response = await fetchAPI(`/restaurantes?${params}`);
    // El backend devuelve { total, data, limit, offset }
    return response.data;
}

export async function obtenerRestaurantePorId(id) {
    return fetchAPI(`/restaurantes/${id}`);
}

export async function obtenerPlatosPorRestaurante(restauranteId) {
    return fetchAPI(`/platos/restaurante/${restauranteId}`);
}

export async function obtenerTalleresPorRestaurante(restauranteId) {
    return fetchAPI(`/talleres/restaurante/${restauranteId}`);
}

export async function obtenerRecetaPorPlato(platoId) {
    return fetchAPI(`/recetas/plato/${platoId}`);
}