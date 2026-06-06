// src/services/api.js
const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

export async function fetchAPI(endpoint, options = {}) {
    let token = null;
    // Solo acceder a localStorage si estamos en el cliente
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('accessToken');
    }

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!res.ok) {
        let errorMsg = 'Error en la petición';
        try {
            const errorData = await res.json();
            errorMsg = errorData.error || errorMsg;
        } catch (e) {
            errorMsg = res.statusText || errorMsg;
        }
        throw new Error(errorMsg);
    }

    if (res.status === 204) return null;
    return res.json();
}