export const getClientFullName = (client) => {
  const parts = [client?.nombre, client?.apellidos].filter(Boolean);
  return parts.join(' ').trim();
};

export const mapClientRow = (client) => ({
  id: client.id,
  identification: client.identificacion ?? client.identification ?? '',
  fullName: client.nombreCompleto || getClientFullName(client),
  nombre: client.nombre ?? '',
  apellidos: client.apellidos ?? '',
});
