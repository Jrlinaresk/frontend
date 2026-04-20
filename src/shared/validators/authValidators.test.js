import { validateAuthLogin, validateRegister } from './authValidators';

describe('authValidators', () => {
  it('requires username and password on login', () => {
    expect(validateAuthLogin({ username: '', password: '' })).toEqual({
      username: 'El usuario es obligatorio.',
      password: 'La contraseña es obligatoria.',
    });
  });

  it('validates register password strength and email', () => {
    const errors = validateRegister({
      username: 'user',
      email: 'not-an-email',
      password: 'weak',
    });

    expect(errors.email).toBe('Ingresa un correo electrónico válido.');
    expect(errors.password).toContain('8 y 20');
  });
});
