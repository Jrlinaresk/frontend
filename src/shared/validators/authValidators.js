const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/;

export const validateAuthLogin = ({ username, password }) => {
  const errors = {};
  if (!username?.trim()) errors.username = 'El usuario es obligatorio.';
  if (!password) errors.password = 'La contraseña es obligatoria.';
  return errors;
};

export const validateRegister = ({ username, email, password }) => {
  const errors = {};
  if (!username?.trim()) errors.username = 'El usuario es obligatorio.';
  if (!email?.trim()) errors.email = 'El correo electrónico es obligatorio.';
  if (email && !EMAIL_PATTERN.test(email)) errors.email = 'Ingresa un correo electrónico válido.';
  if (!password) errors.password = 'La contraseña es obligatoria.';
  if (password && !PASSWORD_PATTERN.test(password)) {
    errors.password =
      'La contraseña debe tener entre 8 y 20 caracteres, incluir mayúscula, minúscula y número.';
  }
  return errors;
};
