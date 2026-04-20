# Frontend Prueba Técnica

SPA en React 17 para la prueba técnica de mantenimiento de clientes.

## Stack

- React 17
- React Router DOM 6
- Axios
- Material UI v5
- Context API
- ECMAScript 6

## Estructura

- `src/app`: arranque de la app y composición de providers
- `src/router`: guards y definición de rutas
- `src/core`: cliente HTTP, sesión y feedback global
- `src/design-system`: tokens, theme y componentes reutilizables
- `src/shared`: enums, constantes, validadores, utils y mappers
- `src/features`: módulos por dominio

## API

La URL base se centraliza con `REACT_APP_API_BASE_URL`.

Por defecto apunta a:

```bash
https://pruebareactjs.test-class.com/Api
```

## Decisiones

- La UI no conoce inconsistencias del contrato, porque los mappers normalizan request/response.
- El token y la sesión se manejan con `SessionProvider` y `axios` interceptors.
- Las rutas protegidas se resuelven con guards sobre React Router.
- El layout ejecutivo se compone con Material UI y un theme basado en tokens.

## Scripts

- `npm start`
- `npm test`
- `npm run build`
