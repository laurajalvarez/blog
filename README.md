# Bloguito - Base de Conexion Multiusuario

Este proyecto usa Next.js (`app/`) para demostrar `SSG`, `ISR` y `SSR` en publicaciones.

## Hasta aquí

Se implemento una capa de **conexion/presencia multiusuario en tiempo real** sin tocar base de datos ni el render de posts.

### Tecnica usada

- HTTP API + **SSE (Server-Sent Events)**
- Heartbeat periodico para mantener sesiones activas
- Desconexion al cerrar pestana
- Estado de presencia en memoria del servidor

## Archivos agregados/modificados para esta funcionalidad

- `lib/presenceStore.ts`: store global en memoria (sesiones online)
- `app/api/presence/route.ts`: `GET/POST/PATCH/DELETE` de presencia
- `app/api/presence/stream/route.ts`: stream SSE con updates en vivo
- `app/api/presence/disconnect/route.ts`: desconexion via `sendBeacon`
- `components/PresenceClientBridge.tsx`: bridge cliente (auto connect + heartbeat)
- `app/layout.tsx`: integra `PresenceClientBridge` globalmente

## Flujo de conexion por usuario

1. Al abrir la app, el cliente genera:
- `userId` persistente (localStorage)
- `sessionId` por pestana
2. `POST /api/presence` marca la sesion como conectada.
3. Se abre `GET /api/presence/stream` para escuchar cambios en tiempo real.
4. Cada 10s se envia `PATCH /api/presence` (heartbeat).
5. Al cerrar/salir se envia `POST /api/presence/disconnect`.

## Endpoints disponibles

### `GET /api/presence`
Devuelve snapshot actual:

```json
{
  "onlineCount": 2,
  "sessions": [
    {
      "sessionId": "...",
      "userId": "...",
      "username": "Usuario-abc123",
      "lastSeenAt": 1714840000000
    }
  ]
}
```

### `POST /api/presence`
Conectar sesion:

```json
{
  "sessionId": "uuid",
  "userId": "uuid",
  "username": "Usuario-abc123"
}
```

### `PATCH /api/presence`
Heartbeat:

```json
{
  "sessionId": "uuid"
}
```

### `DELETE /api/presence`
Desconexion normal:

```json
{
  "sessionId": "uuid"
}
```

### `POST /api/presence/disconnect`
Desconexion de salida rapida (`sendBeacon`):

```json
{
  "sessionId": "uuid"
}
```

## Como probar en la misma red (LAN)

1. Instalar dependencias:

```bash
npm install
```

2. Levantar servidor:

```bash
npm run dev
```

3. En la maquina host, identificar IP local (ejemplo `192.168.1.25`).
4. Desde otras computadoras en la misma red, abrir:

```text
http://192.168.1.25:3000
```

5. Validar presencia:
- abrir varias pestanas/dispositivos
- consultar `http://192.168.1.25:3000/api/presence`
- debe subir/bajar `onlineCount` al entrar/salir usuarios

> Si no conecta desde otros equipos, revisar firewall y puerto 3000.

## Limites actuales (importante para el equipo)

- La presencia esta en **memoria** del proceso Node.
- Si reinicia el server, se pierde el estado online.
- En despliegue multi-instancia, cada instancia tendria su propio estado.

Esto es intencional para no tocar BD en esta etapa.

## Integracion con lo que sigue (BD + render)

Esta capa ya permite que varios usuarios esten conectados y activos al mismo tiempo.
El siguiente trabajo del equipo puede enfocarse en:

1. Persistir publicaciones en BD.
2. Renderizar publicaciones segun `SSG/ISR/SSR`.
3. (Opcional) Persistir presencia en Redis/BD si se necesita en produccion.

## Comandos utiles

```bash
npm run dev
npm run build
npm run start
```
