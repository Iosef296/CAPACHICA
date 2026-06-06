import type { APIRoute } from 'astro';

const API = import.meta.env.API_URL || 'http://backend:3001';

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const res  = await fetch(`${API}/api/reservas`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(body),
        });
        const data = await res.json();
        return new Response(JSON.stringify(data), {
            status:  res.status,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Error de conexión' }), {
            status: 500, headers: { 'Content-Type': 'application/json' },
        });
    }
};

export const GET: APIRoute = async ({ request }) => {
    try {
        const url   = new URL(request.url);
        const pass  = url.searchParams.get('pass') || '';
        const estado = url.searchParams.get('estado') || '';
        const params = new URLSearchParams({ pass });
        if (estado) params.set('estado', estado);
        const res  = await fetch(`${API}/api/reservas?${params.toString()}`);
        const data = await res.json();
        return new Response(JSON.stringify(data), {
            status:  res.status,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch {
        return new Response(JSON.stringify({ error: 'Error de conexión' }), {
            status: 500, headers: { 'Content-Type': 'application/json' },
        });
    }
};

export const PATCH: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const res  = await fetch(`${API}/api/reservas/${body.id}`, {
            method:  'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(body),
        });
        const data = await res.json();
        return new Response(JSON.stringify(data), {
            status:  res.status,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch {
        return new Response(JSON.stringify({ error: 'Error de conexión' }), {
            status: 500, headers: { 'Content-Type': 'application/json' },
        });
    }
};