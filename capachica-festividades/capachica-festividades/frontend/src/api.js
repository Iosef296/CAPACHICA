const API_URL = 'http://localhost:3001/api';

export async function getFestividades() {
  const res = await fetch(`${API_URL}/festividades`);
  if (!res.ok) throw new Error('Error fetching');
  return res.json();
}

export async function getFestividad(id) {
  const res = await fetch(
    `${API_URL}/festividades/${id}`
  );
  if (!res.ok) throw new Error('Error fetching');
  return res.json();
}

export async function createFestividad(data) {
  const res = await fetch(`${API_URL}/festividades`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error creating');
  return res.json();
}

export async function updateFestividad(id, data) {
  const res = await fetch(
    `${API_URL}/festividades/${id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
  );
  if (!res.ok) throw new Error('Error updating');
  return res.json();
}

export async function deleteFestividad(id) {
  const res = await fetch(
    `${API_URL}/festividades/${id}`,
    { method: 'DELETE' }
  );
  if (!res.ok) throw new Error('Error deleting');
  return res.json();
}