# Frontend Prueba Técnica

[![build](https://github.com/Jrlinaresk/frontend/actions/workflows/build.yml/badge.svg)](https://github.com/Jrlinaresk/frontend/actions/workflows/build.yml)
[![deploy](https://github.com/Jrlinaresk/frontend/actions/workflows/deploy-prod.yml/badge.svg)](https://github.com/Jrlinaresk/frontend/actions/workflows/deploy-prod.yml)

SPA en React 17 para una prueba técnica de mantenimiento de clientes.  
La solución está pensada para mostrar criterio de arquitectura, separación de responsabilidades y una base clara para mantener y escalar sin perder simplicidad.

## Vista General

- Arquitectura modular por capas.
- UI desacoplada del backend mediante mappers y servicios.
- Sistema de diseño propio sobre Material UI.
- Autenticación, sesión y feedback global centralizados.
- Despliegue productivo con Docker, Nginx y Cloudflare Tunnel.

## Stack

| Capa | Tecnología |
| --- | --- |
| UI | React 17, Material UI v5 |
| Navegación | React Router DOM 6 |
| Datos | Axios |
| Estado global | Context API |
| Lenguaje | ECMAScript 6 |
| Infraestructura | Docker, Nginx, Cloudflare Tunnel |

## Arquitectura

La aplicación se organiza en bloques con responsabilidades claras:

- `src/app`: composición raíz de providers y router.
- `src/router`: guards de autenticación y definición de rutas.
- `src/core`: cliente HTTP, sesión y feedback global.
- `src/design-system`: tokens, theme, layouts y componentes reutilizables.
- `src/shared`: constantes, enums, utilidades, validadores y mappers.
- `src/features`: módulos por dominio funcional.

### Qué aporta esta estructura

- Aísla la UI de las inconsistencias del backend.
- Reduce duplicación entre pantallas.
- Hace que auth, clientes y layout evolucionen de forma independiente.
- Deja el proyecto listo para sumar nuevos módulos sin rehacer la base.

## Decisiones Técnicas

- La normalización de request/response se resuelve con mappers para que la UI trabaje con un modelo estable.
- El token y la sesión se manejan desde `SessionProvider` y `axios interceptors`.
- Las rutas privadas y públicas se protegen con guards en React Router.
- Los textos y constantes repetidos se centralizan para evitar hardcodes dispersos.
- La consulta de clientes incluye paginación en frontend con control de página y reset al buscar.

## Funcionalidad Clave

- Login y registro.
- Sesión con persistencia y expiración.
- Consulta, alta, edición y eliminación de clientes.
- Filtros por nombre e identificación.
- Paginación en la lista de clientes.
- Subida y preview de imagen en el formulario de clientes.

## Calidad de Implementación

- Formularios validados antes de enviar.
- Manejo centralizado de errores de API.
- Estados de loading, empty y error visibles en pantalla.
- Componentes reutilizables para botones, inputs, loader, empty state y dialogs.
- Accesibilidad cuidada en acciones y navegación principal.

## Integración con API

La URL base se centraliza con `REACT_APP_API_BASE_URL`.

Por defecto apunta a:

```bash
https://pruebareactjs.test-class.com/Api
```

La capa de servicios encapsula el acceso a datos:

- `src/features/auth/services/authService.js`
- `src/features/clients/services/clientService.js`

Y la normalización de contratos vive en:

- `src/shared/mappers/authMappers.js`
- `src/shared/mappers/clientMappers.js`
- `src/core/api/errorNormalizer.js`

## Producción y Despliegue

El frontend está preparado para ejecutarse y publicarse en un entorno productivo real.

### Archivos de infraestructura

- [`Dockerfile`](./Dockerfile)
- [`nginx.conf`](./nginx.conf)
- [`docker-compose.prod.yml`](./docker-compose.prod.yml)
- [`.github/workflows/deploy-prod.yml`](./.github/workflows/deploy-prod.yml)
- [`.github/workflows/build.yml`](./.github/workflows/build.yml)

### Flujo de despliegue

1. Un push sobre `main` dispara el workflow de producción.
2. El runner self-hosted `excalapp-prod` construye y levanta el stack.
3. El frontend se sirve detrás de Nginx.
4. Cloudflare Tunnel expone la app en el subdominio público.

### Variables y secretos

- `REACT_APP_API_BASE_URL`: endpoint base de la API.
- `CLOUDFLARE_TUNNEL_TOKEN`: token del tunnel de Cloudflare.

### URLs útiles

- Producción pública: `https://class.excalapp.com`
- Entorno local de producción: `http://192.168.1.19:8088`

## Calidad Verificable

- `npm run build`
- `npm test`
- `npx eslint src --ext .js,.jsx --max-warnings=0`

## Arranque Local

```bash
npm install
npm start
```

Si quieres probar la build de producción localmente:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Y si quieres levantar también el tunnel:

```bash
docker compose -f docker-compose.prod.yml --profile tunnel up -d --build
```

## Estructura de Referencia

- `src/features/auth`: login y registro.
- `src/features/clients`: consulta y mantenimiento de clientes.
- `src/features/home`: pantalla de inicio.
- `src/features/not-found`: manejo de rutas inexistentes.
- `src/shared`: validaciones, formatos, constantes y adaptadores.

## Valor de la Entrega

Esta solución prioriza claridad, mantenibilidad y operación real sobre complejidad innecesaria.  
Se entrega una base defendible en entrevista porque cada decisión técnica puede explicarse con evidencia en el código.
