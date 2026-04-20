import {
  buildClientDetails,
  buildCreateClientPayload,
  buildUpdateClientPayload,
  normalizeClientListResponse,
} from './clientMappers';

describe('clientMappers', () => {
  it('normalizes list responses', () => {
    expect(
      normalizeClientListResponse([
        { id: '1', identificacion: '123', nombre: 'Ana', apellidos: 'Lopez' },
      ])
    ).toEqual([
      {
        id: '1',
        identification: '123',
        fullName: 'Ana Lopez',
        nombre: 'Ana',
        apellidos: 'Lopez',
      },
    ]);
  });

  it('builds a consistent create payload', () => {
    const payload = buildCreateClientPayload(
      {
        firstName: 'Ana',
        lastName: 'Lopez',
        identification: '123',
        cellphone: '555',
        otherPhone: '777',
        address: 'Street 1',
        birthDate: '2024-04-20',
        affiliationDate: '2024-04-20',
        gender: 'F',
        reseña: 'Cliente',
        imageBase64: 'abc',
        interestId: 'interest-id',
      },
      'user-id'
    );

    expect(payload.usuarioId).toBe('user-id');
    expect(payload.interesFK).toBe('interest-id');
    expect(payload.sexo).toBe('F');
  });

  it('builds a client detail model from api data', () => {
    expect(buildClientDetails({ identificacion: '1', nombre: 'Ana', apellidos: 'Lopez' })).toMatchObject({
      identification: '1',
      firstName: 'Ana',
      lastName: 'Lopez',
    });
  });
});
