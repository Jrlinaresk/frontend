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

## Producción

El frontend quedó preparado para desplegarse bajo Docker y publicarse detrás de Cloudflare Tunnel.

### Archivos de infraestructura

- `Dockerfile`
- `nginx.conf`
- `docker-compose.prod.yml`
- `.github/workflows/deploy-prod.yml`

### Flujo de despliegue

- El workflow se ejecuta al hacer push en `main`.
- El job corre sobre un runner self-hosted con la etiqueta `excalapp-prod`.
- El runner debe vivir en el VPS local `192.168.1.19`, porque un runner hospedado por GitHub no puede entrar a una IP privada de red local.
- `docker compose` reconstruye la imagen y levanta el stack de producción.
- `cloudflared` publica la app en el subdominio que configures en Cloudflare Zero Trust.

### Variables y secretos

- `CLOUDFLARE_TUNNEL_TOKEN`: token del tunnel creado en Cloudflare.
- `REACT_APP_API_BASE_URL`: opcional, ya tiene un valor por defecto para la API de la prueba.

### Pasos de puesta en marcha en el VPS

1. Instalar Docker y el plugin de Compose.
2. Instalar el runner self-hosted de GitHub en el VPS y asignarle la etiqueta `excalapp-prod`.
3. Crear un public hostname en Cloudflare Tunnel apuntando al servicio interno `http://frontend:80`.
4. Guardar el token del tunnel como secret en GitHub.
5. Hacer push a `main`.
