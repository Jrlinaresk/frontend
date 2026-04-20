const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateClientFilters = ({ identification, name }) => {
  const errors = {};
  if (identification && identification.trim().length > 20) {
    errors.identification = 'La identificación no debe superar 20 caracteres.';
  }
  if (name && name.trim().length > 100) {
    errors.name = 'El nombre no debe superar 100 caracteres.';
  }
  return errors;
};

export const validateClientForm = (values) => {
  const errors = {};
  const required = (value) => !String(value ?? '').trim();

  if (required(values.identification)) errors.identification = 'La identificación es obligatoria.';
  if (required(values.firstName)) errors.firstName = 'El nombre es obligatorio.';
  if (required(values.lastName)) errors.lastName = 'Los apellidos son obligatorios.';
  if (required(values.gender)) errors.gender = 'El género es obligatorio.';
  if (required(values.birthDate)) errors.birthDate = 'La fecha de nacimiento es obligatoria.';
  if (required(values.affiliationDate)) errors.affiliationDate = 'La fecha de afiliación es obligatoria.';
  if (required(values.cellphone)) errors.cellphone = 'El teléfono celular es obligatorio.';
  if (required(values.otherPhone)) errors.otherPhone = 'El teléfono otro es obligatorio.';
  if (required(values.address)) errors.address = 'La dirección es obligatoria.';
  if (required(values.reseña)) errors.reseña = 'La reseña personal es obligatoria.';
  if (required(values.interestId)) errors.interestId = 'Debes seleccionar un interés.';
  if (values.email && !EMAIL_PATTERN.test(values.email)) errors.email = 'Ingresa un correo válido.';

  if (values.identification && values.identification.length > 20) {
    errors.identification = 'Máximo 20 caracteres.';
  }
  if (values.firstName && values.firstName.length > 50) errors.firstName = 'Máximo 50 caracteres.';
  if (values.lastName && values.lastName.length > 100) errors.lastName = 'Máximo 100 caracteres.';
  if (values.cellphone && values.cellphone.length > 20) errors.cellphone = 'Máximo 20 caracteres.';
  if (values.otherPhone && values.otherPhone.length > 20) errors.otherPhone = 'Máximo 20 caracteres.';
  if (values.address && values.address.length > 200) errors.address = 'Máximo 200 caracteres.';
  if (values.reseña && values.reseña.length > 200) errors.reseña = 'Máximo 200 caracteres.';

  return errors;
};
