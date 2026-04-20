import { toApiDateString, toDateInputValue } from '../utils/date';
import { mapClientRow } from '../formatters/clientFormatter';

export const normalizeClientListResponse = (payload) =>
  Array.isArray(payload) ? payload.map(mapClientRow) : [];

export const normalizeInterestResponse = (payload) =>
  Array.isArray(payload)
    ? payload.map((item) => ({
        id: item.id || item.interestId || item.interesId || item.interesFK || '',
        label: item.nombre || item.name || item.descripcion || item.descripcionInteres || '',
      }))
    : [];

export const buildClientDetails = (client = {}) => ({
  id: client.id || '',
  identification: client.identificacion || '',
  firstName: client.nombre || '',
  lastName: client.apellidos || '',
  gender: client.sexo || '',
  birthDate: toDateInputValue(client.fNacimiento || client.fechaNacimiento),
  affiliationDate: toDateInputValue(client.fAfiliacion || client.fechaAfiliacion),
  cellphone: client.telefonoCelular || client.celular || '',
  otherPhone: client.otroTelefono || '',
  address: client.direccion || '',
  reseña: client.resenaPersonal || client.resennaPersonal || '',
  imageBase64: client.imagen || '',
  interestId: client.interesFK || client.interesesId || client.interesId || '',
});

export const buildCreateClientPayload = (values, userId) => ({
  nombre: values.firstName.trim(),
  apellidos: values.lastName.trim(),
  identificacion: values.identification.trim(),
  telefonoCelular: values.cellphone.trim(),
  otroTelefono: values.otherPhone.trim(),
  direccion: values.address.trim(),
  fNacimiento: toApiDateString(values.birthDate),
  fAfiliacion: toApiDateString(values.affiliationDate),
  sexo: values.gender,
  resenaPersonal: values.reseña.trim(),
  imagen: values.imageBase64 || '',
  interesFK: values.interestId,
  usuarioId: userId,
});

export const buildUpdateClientPayload = (values, userId) => ({
  id: values.id,
  nombre: values.firstName.trim(),
  apellidos: values.lastName.trim(),
  identificacion: values.identification.trim(),
  celular: values.cellphone.trim(),
  otroTelefono: values.otherPhone.trim(),
  direccion: values.address.trim(),
  fNacimiento: toApiDateString(values.birthDate),
  fAfiliacion: toApiDateString(values.affiliationDate),
  sexo: values.gender,
  resennaPersonal: values.reseña.trim(),
  imagen: values.imageBase64 || '',
  interesFK: values.interestId,
  usuarioId: userId,
});

export const buildClientSearchPayload = ({ identification, name }, userId) => ({
  identificacion: identification?.trim() || '',
  nombre: name?.trim() || '',
  usuarioId: userId,
});
