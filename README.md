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

```
blog
├─ .next
│  ├─ BUILD_ID
│  ├─ _events_22868.json
│  ├─ app-path-routes-manifest.json
│  ├─ build
│  │  ├─ chunks
│  │  │  ├─ 05v0_0nbvox3._.js
│  │  │  ├─ 05v0_0nbvox3._.js.map
│  │  │  ├─ [root-of-the-server]__0dyy4.v._.js
│  │  │  ├─ [root-of-the-server]__0dyy4.v._.js.map
│  │  │  ├─ [root-of-the-server]__0kph2ah._.js
│  │  │  ├─ [root-of-the-server]__0kph2ah._.js.map
│  │  │  ├─ [turbopack-node]_transforms_postcss_ts_09gyw-n._.js
│  │  │  ├─ [turbopack-node]_transforms_postcss_ts_09gyw-n._.js.map
│  │  │  ├─ [turbopack]_runtime.js
│  │  │  └─ [turbopack]_runtime.js.map
│  │  ├─ package.json
│  │  ├─ postcss.js
│  │  └─ postcss.js.map
│  ├─ build-manifest.json
│  ├─ cache
│  │  ├─ .previewinfo
│  │  ├─ .rscinfo
│  │  └─ fetch-cache
│  │     ├─ 1475fd63ee2bed01c065f2c36d0fc2b064a175beb172525895463f8cd034fbf6
│  │     └─ 3b9c7bea75e0117f5a4069f0d3e9d6fbd8cde85fa155d8e8bee786d74578c76f
│  ├─ dev
│  │  ├─ build
│  │  │  ├─ chunks
│  │  │  │  ├─ 05v0_0nbvox3._.js
│  │  │  │  ├─ 05v0_0nbvox3._.js.map
│  │  │  │  ├─ [root-of-the-server]__0d-m0h0._.js
│  │  │  │  ├─ [root-of-the-server]__0d-m0h0._.js.map
│  │  │  │  ├─ [root-of-the-server]__0dyy4.v._.js
│  │  │  │  ├─ [root-of-the-server]__0dyy4.v._.js.map
│  │  │  │  ├─ [root-of-the-server]__0iz~thn._.js
│  │  │  │  ├─ [root-of-the-server]__0iz~thn._.js.map
│  │  │  │  ├─ [root-of-the-server]__0kph2ah._.js
│  │  │  │  ├─ [root-of-the-server]__0kph2ah._.js.map
│  │  │  │  ├─ [root-of-the-server]__0ubbtyl._.js
│  │  │  │  ├─ [root-of-the-server]__0ubbtyl._.js.map
│  │  │  │  ├─ [root-of-the-server]__0z6~21d._.js
│  │  │  │  ├─ [root-of-the-server]__0z6~21d._.js.map
│  │  │  │  ├─ [turbopack-node]_transforms_postcss_ts_06e.r3r._.js
│  │  │  │  ├─ [turbopack-node]_transforms_postcss_ts_06e.r3r._.js.map
│  │  │  │  ├─ [turbopack-node]_transforms_postcss_ts_09gyw-n._.js
│  │  │  │  ├─ [turbopack-node]_transforms_postcss_ts_09gyw-n._.js.map
│  │  │  │  ├─ [turbopack-node]_transforms_webpack-loaders_ts_0z77ki4._.js
│  │  │  │  ├─ [turbopack-node]_transforms_webpack-loaders_ts_0z77ki4._.js.map
│  │  │  │  ├─ [turbopack]_runtime.js
│  │  │  │  └─ [turbopack]_runtime.js.map
│  │  │  ├─ package.json
│  │  │  ├─ postcss.js
│  │  │  ├─ postcss.js.map
│  │  │  ├─ webpack-loaders.js
│  │  │  └─ webpack-loaders.js.map
│  │  ├─ build-manifest.json
│  │  ├─ cache
│  │  │  ├─ .rscinfo
│  │  │  ├─ fetch-cache
│  │  │  │  ├─ 1475fd63ee2bed01c065f2c36d0fc2b064a175beb172525895463f8cd034fbf6
│  │  │  │  └─ 3b9c7bea75e0117f5a4069f0d3e9d6fbd8cde85fa155d8e8bee786d74578c76f
│  │  │  ├─ next-devtools-config.json
│  │  │  └─ turbopack
│  │  │     ├─ 2275bd85
│  │  │     │  ├─ 00000005.sst
│  │  │     │  ├─ 00000006.sst
│  │  │     │  ├─ 00000007.sst
│  │  │     │  ├─ 00000008.meta
│  │  │     │  ├─ 00000009.meta
│  │  │     │  ├─ 00000011.meta
│  │  │     │  ├─ 00000012.sst
│  │  │     │  ├─ 00000014.sst
│  │  │     │  ├─ 00000015.meta
│  │  │     │  ├─ 00000016.meta
│  │  │     │  ├─ 00000018.sst
│  │  │     │  ├─ 00000020.sst
│  │  │     │  ├─ 00000021.meta
│  │  │     │  ├─ 00000022.meta
│  │  │     │  ├─ 00000025.sst
│  │  │     │  ├─ 00000026.sst
│  │  │     │  ├─ 00000027.meta
│  │  │     │  ├─ 00000028.meta
│  │  │     │  ├─ 00000031.sst
│  │  │     │  ├─ 00000032.sst
│  │  │     │  ├─ 00000033.meta
│  │  │     │  ├─ 00000034.meta
│  │  │     │  ├─ 00000037.sst
│  │  │     │  ├─ 00000038.sst
│  │  │     │  ├─ 00000039.meta
│  │  │     │  ├─ 00000040.meta
│  │  │     │  ├─ 00000042.sst
│  │  │     │  ├─ 00000044.sst
│  │  │     │  ├─ 00000045.meta
│  │  │     │  ├─ 00000046.meta
│  │  │     │  ├─ 00000049.sst
│  │  │     │  ├─ 00000050.sst
│  │  │     │  ├─ 00000051.meta
│  │  │     │  ├─ 00000052.meta
│  │  │     │  ├─ 00000054.sst
│  │  │     │  ├─ 00000056.sst
│  │  │     │  ├─ 00000057.meta
│  │  │     │  ├─ 00000058.meta
│  │  │     │  ├─ 00000060.sst
│  │  │     │  ├─ 00000062.sst
│  │  │     │  ├─ 00000063.meta
│  │  │     │  ├─ 00000064.meta
│  │  │     │  ├─ 00000066.sst
│  │  │     │  ├─ 00000068.sst
│  │  │     │  ├─ 00000069.meta
│  │  │     │  ├─ 00000070.meta
│  │  │     │  ├─ 00000073.sst
│  │  │     │  ├─ 00000074.sst
│  │  │     │  ├─ 00000075.meta
│  │  │     │  ├─ 00000076.meta
│  │  │     │  ├─ 00000078.sst
│  │  │     │  ├─ 00000080.sst
│  │  │     │  ├─ 00000081.meta
│  │  │     │  ├─ 00000083.meta
│  │  │     │  ├─ 00000085.sst
│  │  │     │  ├─ 00000086.sst
│  │  │     │  ├─ 00000087.sst
│  │  │     │  ├─ 00000088.meta
│  │  │     │  ├─ 00000090.meta
│  │  │     │  ├─ 00000091.meta
│  │  │     │  ├─ 00000092.sst
│  │  │     │  ├─ 00000094.sst
│  │  │     │  ├─ 00000095.meta
│  │  │     │  ├─ 00000096.meta
│  │  │     │  ├─ 00000102.sst
│  │  │     │  ├─ 00000103.sst
│  │  │     │  ├─ 00000104.sst
│  │  │     │  ├─ 00000105.meta
│  │  │     │  ├─ 00000106.meta
│  │  │     │  ├─ 00000108.meta
│  │  │     │  ├─ 00000109.sst
│  │  │     │  ├─ 00000111.sst
│  │  │     │  ├─ 00000112.meta
│  │  │     │  ├─ 00000113.meta
│  │  │     │  ├─ 00000116.sst
│  │  │     │  ├─ 00000117.sst
│  │  │     │  ├─ 00000118.meta
│  │  │     │  ├─ 00000120.meta
│  │  │     │  ├─ 00000121.sst
│  │  │     │  ├─ 00000123.sst
│  │  │     │  ├─ 00000124.meta
│  │  │     │  ├─ 00000126.meta
│  │  │     │  ├─ 00000128.sst
│  │  │     │  ├─ 00000129.sst
│  │  │     │  ├─ 00000130.meta
│  │  │     │  ├─ 00000131.meta
│  │  │     │  ├─ 00000137.sst
│  │  │     │  ├─ 00000138.sst
│  │  │     │  ├─ 00000139.sst
│  │  │     │  ├─ 00000140.meta
│  │  │     │  ├─ 00000141.meta
│  │  │     │  ├─ 00000143.meta
│  │  │     │  ├─ 00000144.sst
│  │  │     │  ├─ 00000145.sst
│  │  │     │  ├─ 00000146.meta
│  │  │     │  ├─ 00000148.sst
│  │  │     │  ├─ 00000149.sst
│  │  │     │  ├─ 00000150.sst
│  │  │     │  ├─ 00000151.sst
│  │  │     │  ├─ 00000152.sst
│  │  │     │  ├─ 00000153.sst
│  │  │     │  ├─ 00000154.sst
│  │  │     │  ├─ 00000155.meta
│  │  │     │  ├─ 00000156.meta
│  │  │     │  ├─ 00000157.meta
│  │  │     │  ├─ 00000158.meta
│  │  │     │  ├─ 00000159.sst
│  │  │     │  ├─ 00000160.sst
│  │  │     │  ├─ 00000161.sst
│  │  │     │  ├─ 00000162.meta
│  │  │     │  ├─ 00000163.meta
│  │  │     │  ├─ 00000164.meta
│  │  │     │  ├─ 00000165.sst
│  │  │     │  ├─ 00000166.sst
│  │  │     │  ├─ 00000167.sst
│  │  │     │  ├─ 00000168.meta
│  │  │     │  ├─ 00000169.meta
│  │  │     │  ├─ 00000170.meta
│  │  │     │  ├─ 00000171.sst
│  │  │     │  ├─ 00000172.sst
│  │  │     │  ├─ 00000173.sst
│  │  │     │  ├─ 00000174.meta
│  │  │     │  ├─ 00000175.meta
│  │  │     │  ├─ 00000176.meta
│  │  │     │  ├─ 00000177.sst
│  │  │     │  ├─ 00000178.sst
│  │  │     │  ├─ 00000179.sst
│  │  │     │  ├─ 00000180.meta
│  │  │     │  ├─ 00000181.meta
│  │  │     │  ├─ 00000182.meta
│  │  │     │  ├─ 00000183.sst
│  │  │     │  ├─ 00000184.sst
│  │  │     │  ├─ 00000185.sst
│  │  │     │  ├─ 00000186.meta
│  │  │     │  ├─ 00000187.meta
│  │  │     │  ├─ 00000188.meta
│  │  │     │  ├─ 00000189.sst
│  │  │     │  ├─ 00000190.sst
│  │  │     │  ├─ 00000191.sst
│  │  │     │  ├─ 00000192.meta
│  │  │     │  ├─ 00000193.meta
│  │  │     │  ├─ 00000194.meta
│  │  │     │  ├─ 00000195.sst
│  │  │     │  ├─ 00000196.sst
│  │  │     │  ├─ 00000197.sst
│  │  │     │  ├─ 00000198.meta
│  │  │     │  ├─ 00000199.meta
│  │  │     │  ├─ 00000200.meta
│  │  │     │  ├─ 00000201.sst
│  │  │     │  ├─ 00000202.sst
│  │  │     │  ├─ 00000203.sst
│  │  │     │  ├─ 00000204.meta
│  │  │     │  ├─ 00000205.meta
│  │  │     │  ├─ 00000206.meta
│  │  │     │  ├─ 00000207.sst
│  │  │     │  ├─ 00000208.sst
│  │  │     │  ├─ 00000209.sst
│  │  │     │  ├─ 00000210.sst
│  │  │     │  ├─ 00000211.meta
│  │  │     │  ├─ 00000212.meta
│  │  │     │  ├─ 00000213.meta
│  │  │     │  ├─ 00000214.meta
│  │  │     │  ├─ 00000215.sst
│  │  │     │  ├─ 00000216.sst
│  │  │     │  ├─ 00000217.sst
│  │  │     │  ├─ 00000218.meta
│  │  │     │  ├─ 00000219.meta
│  │  │     │  ├─ 00000220.meta
│  │  │     │  ├─ 00000221.sst
│  │  │     │  ├─ 00000222.sst
│  │  │     │  ├─ 00000223.sst
│  │  │     │  ├─ 00000224.sst
│  │  │     │  ├─ 00000225.meta
│  │  │     │  ├─ 00000226.meta
│  │  │     │  ├─ 00000227.meta
│  │  │     │  ├─ 00000228.meta
│  │  │     │  ├─ 00000229.sst
│  │  │     │  ├─ 00000230.sst
│  │  │     │  ├─ 00000231.sst
│  │  │     │  ├─ 00000232.meta
│  │  │     │  ├─ 00000233.meta
│  │  │     │  ├─ 00000234.meta
│  │  │     │  ├─ 00000235.sst
│  │  │     │  ├─ 00000236.sst
│  │  │     │  ├─ 00000237.sst
│  │  │     │  ├─ 00000238.meta
│  │  │     │  ├─ 00000239.meta
│  │  │     │  ├─ 00000240.meta
│  │  │     │  ├─ 00000241.sst
│  │  │     │  ├─ 00000242.sst
│  │  │     │  ├─ 00000243.sst
│  │  │     │  ├─ 00000244.meta
│  │  │     │  ├─ 00000245.meta
│  │  │     │  ├─ 00000246.meta
│  │  │     │  ├─ 00000247.sst
│  │  │     │  ├─ 00000248.sst
│  │  │     │  ├─ 00000249.sst
│  │  │     │  ├─ 00000250.meta
│  │  │     │  ├─ 00000251.meta
│  │  │     │  ├─ 00000252.meta
│  │  │     │  ├─ 00000253.sst
│  │  │     │  ├─ 00000254.sst
│  │  │     │  ├─ 00000255.sst
│  │  │     │  ├─ 00000256.meta
│  │  │     │  ├─ 00000257.meta
│  │  │     │  ├─ 00000258.meta
│  │  │     │  ├─ CURRENT
│  │  │     │  └─ LOG
│  │  │     └─ e0739832
│  │  │        ├─ 00000001.sst
│  │  │        ├─ 00000002.sst
│  │  │        ├─ 00000003.sst
│  │  │        ├─ 00000004.sst
│  │  │        ├─ 00000005.meta
│  │  │        ├─ 00000006.meta
│  │  │        ├─ 00000007.meta
│  │  │        ├─ 00000008.meta
│  │  │        ├─ 00000009.sst
│  │  │        ├─ 00000010.sst
│  │  │        ├─ 00000011.sst
│  │  │        ├─ 00000012.meta
│  │  │        ├─ 00000013.meta
│  │  │        ├─ 00000014.meta
│  │  │        ├─ 00000015.sst
│  │  │        ├─ 00000016.sst
│  │  │        ├─ 00000017.sst
│  │  │        ├─ 00000018.sst
│  │  │        ├─ 00000019.sst
│  │  │        ├─ 00000020.sst
│  │  │        ├─ 00000021.sst
│  │  │        ├─ 00000022.meta
│  │  │        ├─ 00000023.meta
│  │  │        ├─ 00000024.meta
│  │  │        ├─ 00000025.meta
│  │  │        ├─ 00000026.sst
│  │  │        ├─ 00000027.sst
│  │  │        ├─ 00000028.sst
│  │  │        ├─ 00000029.sst
│  │  │        ├─ 00000030.sst
│  │  │        ├─ 00000031.sst
│  │  │        ├─ 00000032.sst
│  │  │        ├─ 00000033.meta
│  │  │        ├─ 00000034.meta
│  │  │        ├─ 00000035.meta
│  │  │        ├─ 00000036.meta
│  │  │        ├─ CURRENT
│  │  │        └─ LOG
│  │  ├─ fallback-build-manifest.json
│  │  ├─ logs
│  │  │  └─ next-development.log
│  │  ├─ package.json
│  │  ├─ prerender-manifest.json
│  │  ├─ routes-manifest.json
│  │  ├─ server
│  │  │  ├─ app
│  │  │  │  ├─ api
│  │  │  │  │  └─ presence
│  │  │  │  │     ├─ disconnect
│  │  │  │  │     │  ├─ route
│  │  │  │  │     │  │  ├─ app-paths-manifest.json
│  │  │  │  │     │  │  ├─ build-manifest.json
│  │  │  │  │     │  │  └─ server-reference-manifest.json
│  │  │  │  │     │  ├─ route.js
│  │  │  │  │     │  ├─ route.js.map
│  │  │  │  │     │  └─ route_client-reference-manifest.js
│  │  │  │  │     ├─ route
│  │  │  │  │     │  ├─ app-paths-manifest.json
│  │  │  │  │     │  ├─ build-manifest.json
│  │  │  │  │     │  └─ server-reference-manifest.json
│  │  │  │  │     ├─ route.js
│  │  │  │  │     ├─ route.js.map
│  │  │  │  │     ├─ route_client-reference-manifest.js
│  │  │  │  │     └─ stream
│  │  │  │  │        ├─ route
│  │  │  │  │        │  ├─ app-paths-manifest.json
│  │  │  │  │        │  ├─ build-manifest.json
│  │  │  │  │        │  └─ server-reference-manifest.json
│  │  │  │  │        ├─ route.js
│  │  │  │  │        ├─ route.js.map
│  │  │  │  │        └─ route_client-reference-manifest.js
│  │  │  │  ├─ isr
│  │  │  │  │  ├─ page
│  │  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  │  ├─ page.js
│  │  │  │  │  ├─ page.js.map
│  │  │  │  │  └─ page_client-reference-manifest.js
│  │  │  │  ├─ page
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page.js.map
│  │  │  │  ├─ page_client-reference-manifest.js
│  │  │  │  ├─ ssg
│  │  │  │  │  ├─ page
│  │  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  │  ├─ page.js
│  │  │  │  │  ├─ page.js.map
│  │  │  │  │  └─ page_client-reference-manifest.js
│  │  │  │  └─ ssr
│  │  │  │     ├─ page
│  │  │  │     │  ├─ app-paths-manifest.json
│  │  │  │     │  ├─ build-manifest.json
│  │  │  │     │  ├─ next-font-manifest.json
│  │  │  │     │  ├─ react-loadable-manifest.json
│  │  │  │     │  └─ server-reference-manifest.json
│  │  │  │     ├─ page.js
│  │  │  │     ├─ page.js.map
│  │  │  │     └─ page_client-reference-manifest.js
│  │  │  ├─ app-paths-manifest.json
│  │  │  ├─ chunks
│  │  │  │  ├─ [root-of-the-server]__0.29yyr._.js
│  │  │  │  ├─ [root-of-the-server]__0.29yyr._.js.map
│  │  │  │  ├─ [root-of-the-server]__0t3bgyn._.js
│  │  │  │  ├─ [root-of-the-server]__0t3bgyn._.js.map
│  │  │  │  ├─ [root-of-the-server]__0z3gav9._.js
│  │  │  │  ├─ [root-of-the-server]__0z3gav9._.js.map
│  │  │  │  ├─ [turbopack]_runtime.js
│  │  │  │  ├─ [turbopack]_runtime.js.map
│  │  │  │  ├─ _next-internal_server_app_api_presence_disconnect_route_actions_0txz3mh.js
│  │  │  │  ├─ _next-internal_server_app_api_presence_disconnect_route_actions_0txz3mh.js.map
│  │  │  │  ├─ _next-internal_server_app_api_presence_route_actions_0w34zgv.js
│  │  │  │  ├─ _next-internal_server_app_api_presence_route_actions_0w34zgv.js.map
│  │  │  │  ├─ _next-internal_server_app_api_presence_stream_route_actions_0pi9.i4.js
│  │  │  │  ├─ _next-internal_server_app_api_presence_stream_route_actions_0pi9.i4.js.map
│  │  │  │  ├─ app_api_presence_disconnect_route_ts_0ebawfo._.js
│  │  │  │  ├─ app_api_presence_disconnect_route_ts_0ebawfo._.js.map
│  │  │  │  ├─ app_api_presence_route_ts_0tco6xl._.js
│  │  │  │  ├─ app_api_presence_route_ts_0tco6xl._.js.map
│  │  │  │  ├─ app_api_presence_stream_route_ts_0s0wxq3._.js
│  │  │  │  ├─ app_api_presence_stream_route_ts_0s0wxq3._.js.map
│  │  │  │  └─ ssr
│  │  │  │     ├─ 05v0_0gqezmf._.js
│  │  │  │     ├─ 05v0_0gqezmf._.js.map
│  │  │  │     ├─ 05v0_0l4jmnm._.js
│  │  │  │     ├─ 05v0_0l4jmnm._.js.map
│  │  │  │     ├─ 05v0_0x0dzbc._.js
│  │  │  │     ├─ 05v0_0x0dzbc._.js.map
│  │  │  │     ├─ 05v0_11vqhwr._.js
│  │  │  │     ├─ 05v0_11vqhwr._.js.map
│  │  │  │     ├─ 05v0_next_dist_0u.ojkb._.js
│  │  │  │     ├─ 05v0_next_dist_0u.ojkb._.js.map
│  │  │  │     ├─ 05v0_next_dist_client_components_0k4_ghf._.js
│  │  │  │     ├─ 05v0_next_dist_client_components_0k4_ghf._.js.map
│  │  │  │     ├─ 05v0_next_dist_client_components_builtin_forbidden_0rmqg28.js
│  │  │  │     ├─ 05v0_next_dist_client_components_builtin_forbidden_0rmqg28.js.map
│  │  │  │     ├─ 05v0_next_dist_client_components_builtin_global-error_0s0-1j1.js
│  │  │  │     ├─ 05v0_next_dist_client_components_builtin_global-error_0s0-1j1.js.map
│  │  │  │     ├─ 05v0_next_dist_client_components_builtin_unauthorized_0m3-uo~.js
│  │  │  │     ├─ 05v0_next_dist_client_components_builtin_unauthorized_0m3-uo~.js.map
│  │  │  │     ├─ 05v0_next_dist_compiled_0o6k7~b._.js
│  │  │  │     ├─ 05v0_next_dist_compiled_0o6k7~b._.js.map
│  │  │  │     ├─ 05v0_next_dist_esm_0paig5p._.js
│  │  │  │     ├─ 05v0_next_dist_esm_0paig5p._.js.map
│  │  │  │     ├─ 05v0_next_dist_server_route-modules_app-page_04tvust._.js
│  │  │  │     ├─ 05v0_next_dist_server_route-modules_app-page_04tvust._.js.map
│  │  │  │     ├─ Documentos_bloguito__next-internal_server_app_isr_page_actions_0gturdm.js
│  │  │  │     ├─ Documentos_bloguito__next-internal_server_app_isr_page_actions_0gturdm.js.map
│  │  │  │     ├─ Documentos_bloguito__next-internal_server_app_page_actions_0b89zr6.js
│  │  │  │     ├─ Documentos_bloguito__next-internal_server_app_page_actions_0b89zr6.js.map
│  │  │  │     ├─ [externals]__0n13xf4._.js
│  │  │  │     ├─ [externals]__0n13xf4._.js.map
│  │  │  │     ├─ [externals]_next_dist_0yew8f-._.js
│  │  │  │     ├─ [externals]_next_dist_0yew8f-._.js.map
│  │  │  │     ├─ [root-of-the-server]__0-chgqx._.js
│  │  │  │     ├─ [root-of-the-server]__0-chgqx._.js.map
│  │  │  │     ├─ [root-of-the-server]__01eqota._.js
│  │  │  │     ├─ [root-of-the-server]__01eqota._.js.map
│  │  │  │     ├─ [root-of-the-server]__08_sa2d._.js
│  │  │  │     ├─ [root-of-the-server]__08_sa2d._.js.map
│  │  │  │     ├─ [root-of-the-server]__08dq6uz._.js
│  │  │  │     ├─ [root-of-the-server]__08dq6uz._.js.map
│  │  │  │     ├─ [root-of-the-server]__0e.fwaa._.js
│  │  │  │     ├─ [root-of-the-server]__0e.fwaa._.js.map
│  │  │  │     ├─ [root-of-the-server]__0h2m16x._.js
│  │  │  │     ├─ [root-of-the-server]__0h2m16x._.js.map
│  │  │  │     ├─ [root-of-the-server]__0mu1c6a._.js
│  │  │  │     ├─ [root-of-the-server]__0mu1c6a._.js.map
│  │  │  │     ├─ [root-of-the-server]__0we65u6._.js
│  │  │  │     ├─ [root-of-the-server]__0we65u6._.js.map
│  │  │  │     ├─ [root-of-the-server]__0yf25jv._.js
│  │  │  │     ├─ [root-of-the-server]__0yf25jv._.js.map
│  │  │  │     ├─ [turbopack]_runtime.js
│  │  │  │     ├─ [turbopack]_runtime.js.map
│  │  │  │     ├─ _next-internal_server_app_isr_page_actions_0-d1j2o.js
│  │  │  │     ├─ _next-internal_server_app_isr_page_actions_0-d1j2o.js.map
│  │  │  │     ├─ _next-internal_server_app_page_actions_09-gtaw.js
│  │  │  │     ├─ _next-internal_server_app_page_actions_09-gtaw.js.map
│  │  │  │     ├─ _next-internal_server_app_ssg_page_actions_0lcgtvr.js
│  │  │  │     ├─ _next-internal_server_app_ssg_page_actions_0lcgtvr.js.map
│  │  │  │     ├─ _next-internal_server_app_ssr_page_actions_0a9inea.js
│  │  │  │     └─ _next-internal_server_app_ssr_page_actions_0a9inea.js.map
│  │  │  ├─ interception-route-rewrite-manifest.js
│  │  │  ├─ middleware-build-manifest.js
│  │  │  ├─ middleware-manifest.json
│  │  │  ├─ next-font-manifest.js
│  │  │  ├─ next-font-manifest.json
│  │  │  ├─ pages-manifest.json
│  │  │  ├─ server-reference-manifest.js
│  │  │  └─ server-reference-manifest.json
│  │  ├─ static
│  │  │  ├─ chunks
│  │  │  │  ├─ 05v0_@swc_helpers_cjs_0_rh_0v._.js
│  │  │  │  ├─ 05v0_@swc_helpers_cjs_0_rh_0v._.js.map
│  │  │  │  ├─ 05v0_next_dist_03wikrj._.js
│  │  │  │  ├─ 05v0_next_dist_03wikrj._.js.map
│  │  │  │  ├─ 05v0_next_dist_0m7vs1k._.js
│  │  │  │  ├─ 05v0_next_dist_0m7vs1k._.js.map
│  │  │  │  ├─ 05v0_next_dist_0wb5~1~._.js
│  │  │  │  ├─ 05v0_next_dist_0wb5~1~._.js.map
│  │  │  │  ├─ 05v0_next_dist_build_polyfills_polyfill-nomodule.js
│  │  │  │  ├─ 05v0_next_dist_build_polyfills_polyfill-nomodule.js.map
│  │  │  │  ├─ 05v0_next_dist_client_12-lng3._.js
│  │  │  │  ├─ 05v0_next_dist_client_12-lng3._.js.map
│  │  │  │  ├─ 05v0_next_dist_client_components_builtin_global-error_0yte1gi.js
│  │  │  │  ├─ 05v0_next_dist_compiled_0lh3p4x._.js
│  │  │  │  ├─ 05v0_next_dist_compiled_0lh3p4x._.js.map
│  │  │  │  ├─ 05v0_next_dist_compiled_next-devtools_index_0.b3-gk.js
│  │  │  │  ├─ 05v0_next_dist_compiled_next-devtools_index_0.b3-gk.js.map
│  │  │  │  ├─ 05v0_next_dist_compiled_react-dom_0s9z3ng._.js
│  │  │  │  ├─ 05v0_next_dist_compiled_react-dom_0s9z3ng._.js.map
│  │  │  │  ├─ 05v0_next_dist_compiled_react-server-dom-turbopack_0jq24w6._.js
│  │  │  │  ├─ 05v0_next_dist_compiled_react-server-dom-turbopack_0jq24w6._.js.map
│  │  │  │  ├─ Documentos_bloguito_02hiov_._.js.map
│  │  │  │  ├─ Documentos_bloguito_0rqeker._.js
│  │  │  │  ├─ Documentos_bloguito_app_globals_css_0w3-wzy._.single.css
│  │  │  │  ├─ Documentos_bloguito_app_globals_css_0w3-wzy._.single.css.map
│  │  │  │  ├─ Documentos_bloguito_app_isr_page_tsx_0yte1gi._.js
│  │  │  │  ├─ Documentos_bloguito_app_layout_tsx_0avx352._.js
│  │  │  │  ├─ Documentos_bloguito_app_page_tsx_0yte1gi._.js
│  │  │  │  ├─ [next]_internal_font_google_geist_a71539c9_module_css_0w3-wzy._.single.css
│  │  │  │  ├─ [next]_internal_font_google_geist_a71539c9_module_css_0w3-wzy._.single.css.map
│  │  │  │  ├─ [next]_internal_font_google_geist_mono_8d43a2aa_module_css_0w3-wzy._.single.css
│  │  │  │  ├─ [next]_internal_font_google_geist_mono_8d43a2aa_module_css_0w3-wzy._.single.css.map
│  │  │  │  ├─ [root-of-the-server]__06.-pfn._.css
│  │  │  │  ├─ [root-of-the-server]__06.-pfn._.css.map
│  │  │  │  ├─ [root-of-the-server]__0rrajln._.css
│  │  │  │  ├─ [root-of-the-server]__0rrajln._.css.map
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_0yjw1oe._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_0yjw1oe._.js.map
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_10mygs7._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_10z625~._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_10z625~._.js.map
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_11ih6.9._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_12j84yl._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_12j84yl._.js.map
│  │  │  │  ├─ _0p44nws._.js.map
│  │  │  │  ├─ _0rqeker._.js
│  │  │  │  ├─ app_globals_css_0w3-wzy._.single.css
│  │  │  │  ├─ app_globals_css_0w3-wzy._.single.css.map
│  │  │  │  ├─ app_isr_page_tsx_070j1q3._.js
│  │  │  │  ├─ app_layout_tsx_004glpo._.js
│  │  │  │  ├─ app_page_tsx_070j1q3._.js
│  │  │  │  ├─ app_ssg_page_tsx_070j1q3._.js
│  │  │  │  ├─ app_ssr_page_tsx_070j1q3._.js
│  │  │  │  ├─ components_PresenceClientBridge_tsx_0g4qtgi._.js
│  │  │  │  ├─ components_PresenceClientBridge_tsx_0g4qtgi._.js.map
│  │  │  │  ├─ turbopack-Documentos_bloguito_02hiov_._.js
│  │  │  │  └─ turbopack-_0p44nws._.js
│  │  │  ├─ development
│  │  │  │  ├─ _buildManifest.js
│  │  │  │  ├─ _clientMiddlewareManifest.js
│  │  │  │  └─ _ssgManifest.js
│  │  │  └─ media
│  │  │     ├─ 4fa387ec64143e14-s.0q3udbd2bu5yp.woff2
│  │  │     ├─ 7178b3e590c64307-s.11.cyxs5p-0z~.woff2
│  │  │     ├─ 797e433ab948586e-s.p.0.q-h669a_dqa.woff2
│  │  │     ├─ 8a480f0b521d4e75-s.06d3mdzz5bre_.woff2
│  │  │     ├─ bbc41e54d2fcbd21-s.0gw~uztddq1df.woff2
│  │  │     ├─ caa3a2e1cccd8315-s.p.16t1db8_9y2o~.woff2
│  │  │     └─ favicon.0x3dzn~oxb6tn.ico
│  │  ├─ trace
│  │  └─ types
│  │     ├─ cache-life.d.ts
│  │     ├─ routes.d.ts
│  │     └─ validator.ts
│  ├─ diagnostics
│  │  ├─ build-diagnostics.json
│  │  ├─ framework.json
│  │  └─ route-bundle-stats.json
│  ├─ export-marker.json
│  ├─ fallback-build-manifest.json
│  ├─ images-manifest.json
│  ├─ next-minimal-server.js.nft.json
│  ├─ next-server.js.nft.json
│  ├─ package.json
│  ├─ prerender-manifest.json
│  ├─ required-server-files.js
│  ├─ required-server-files.json
│  ├─ routes-manifest.json
│  ├─ server
│  │  ├─ app
│  │  │  ├─ _global-error
│  │  │  │  ├─ page
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page.js.map
│  │  │  │  ├─ page.js.nft.json
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ _global-error.html
│  │  │  ├─ _global-error.meta
│  │  │  ├─ _global-error.rsc
│  │  │  ├─ _global-error.segments
│  │  │  │  ├─ __PAGE__.segment.rsc
│  │  │  │  ├─ _full.segment.rsc
│  │  │  │  ├─ _head.segment.rsc
│  │  │  │  ├─ _index.segment.rsc
│  │  │  │  └─ _tree.segment.rsc
│  │  │  ├─ _not-found
│  │  │  │  ├─ page
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page.js.map
│  │  │  │  ├─ page.js.nft.json
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ _not-found.html
│  │  │  ├─ _not-found.meta
│  │  │  ├─ _not-found.rsc
│  │  │  ├─ _not-found.segments
│  │  │  │  ├─ _full.segment.rsc
│  │  │  │  ├─ _head.segment.rsc
│  │  │  │  ├─ _index.segment.rsc
│  │  │  │  ├─ _not-found
│  │  │  │  │  └─ __PAGE__.segment.rsc
│  │  │  │  ├─ _not-found.segment.rsc
│  │  │  │  └─ _tree.segment.rsc
│  │  │  ├─ favicon.ico
│  │  │  │  ├─ route
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  └─ build-manifest.json
│  │  │  │  ├─ route.js
│  │  │  │  ├─ route.js.map
│  │  │  │  └─ route.js.nft.json
│  │  │  ├─ favicon.ico.body
│  │  │  ├─ favicon.ico.meta
│  │  │  ├─ index.html
│  │  │  ├─ index.meta
│  │  │  ├─ index.rsc
│  │  │  ├─ index.segments
│  │  │  │  ├─ __PAGE__.segment.rsc
│  │  │  │  ├─ _full.segment.rsc
│  │  │  │  ├─ _head.segment.rsc
│  │  │  │  ├─ _index.segment.rsc
│  │  │  │  └─ _tree.segment.rsc
│  │  │  ├─ isr
│  │  │  │  ├─ page
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page.js.map
│  │  │  │  ├─ page.js.nft.json
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ isr.html
│  │  │  ├─ isr.meta
│  │  │  ├─ isr.rsc
│  │  │  ├─ isr.segments
│  │  │  │  ├─ _full.segment.rsc
│  │  │  │  ├─ _head.segment.rsc
│  │  │  │  ├─ _index.segment.rsc
│  │  │  │  ├─ _tree.segment.rsc
│  │  │  │  ├─ isr
│  │  │  │  │  └─ __PAGE__.segment.rsc
│  │  │  │  └─ isr.segment.rsc
│  │  │  ├─ page
│  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  ├─ build-manifest.json
│  │  │  │  ├─ next-font-manifest.json
│  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  └─ server-reference-manifest.json
│  │  │  ├─ page.js
│  │  │  ├─ page.js.map
│  │  │  ├─ page.js.nft.json
│  │  │  ├─ page_client-reference-manifest.js
│  │  │  ├─ post
│  │  │  │  └─ [id]
│  │  │  │     ├─ page
│  │  │  │     │  ├─ app-paths-manifest.json
│  │  │  │     │  ├─ build-manifest.json
│  │  │  │     │  ├─ next-font-manifest.json
│  │  │  │     │  ├─ react-loadable-manifest.json
│  │  │  │     │  └─ server-reference-manifest.json
│  │  │  │     ├─ page.js
│  │  │  │     ├─ page.js.map
│  │  │  │     ├─ page.js.nft.json
│  │  │  │     └─ page_client-reference-manifest.js
│  │  │  ├─ ssg
│  │  │  │  ├─ page
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page.js.map
│  │  │  │  ├─ page.js.nft.json
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ ssg.html
│  │  │  ├─ ssg.meta
│  │  │  ├─ ssg.rsc
│  │  │  ├─ ssg.segments
│  │  │  │  ├─ _full.segment.rsc
│  │  │  │  ├─ _head.segment.rsc
│  │  │  │  ├─ _index.segment.rsc
│  │  │  │  ├─ _tree.segment.rsc
│  │  │  │  ├─ ssg
│  │  │  │  │  └─ __PAGE__.segment.rsc
│  │  │  │  └─ ssg.segment.rsc
│  │  │  ├─ ssr
│  │  │  │  ├─ page
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page.js.map
│  │  │  │  ├─ page.js.nft.json
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ ssr.html
│  │  │  ├─ ssr.meta
│  │  │  ├─ ssr.rsc
│  │  │  └─ ssr.segments
│  │  │     ├─ _full.segment.rsc
│  │  │     ├─ _head.segment.rsc
│  │  │     ├─ _index.segment.rsc
│  │  │     ├─ _tree.segment.rsc
│  │  │     ├─ ssr
│  │  │     │  └─ __PAGE__.segment.rsc
│  │  │     └─ ssr.segment.rsc
│  │  ├─ app-paths-manifest.json
│  │  ├─ chunks
│  │  │  ├─ Documentos_bloguito__next-internal_server_app_favicon_ico_route_actions_0e52~qz.js
│  │  │  ├─ Documentos_bloguito__next-internal_server_app_favicon_ico_route_actions_0e52~qz.js.map
│  │  │  ├─ [externals]_next_dist_0arv.vj._.js
│  │  │  ├─ [externals]_next_dist_0arv.vj._.js.map
│  │  │  ├─ [root-of-the-server]__0kngy68._.js
│  │  │  ├─ [root-of-the-server]__0kngy68._.js.map
│  │  │  ├─ [turbopack]_runtime.js
│  │  │  ├─ [turbopack]_runtime.js.map
│  │  │  └─ ssr
│  │  │     ├─ 05v0_0l4jmnm._.js
│  │  │     ├─ 05v0_0l4jmnm._.js.map
│  │  │     ├─ 05v0_12uu0r_._.js
│  │  │     ├─ 05v0_12uu0r_._.js.map
│  │  │     ├─ 05v0_next_dist_0eo6058._.js
│  │  │     ├─ 05v0_next_dist_0eo6058._.js.map
│  │  │     ├─ 05v0_next_dist_0~zjcee._.js
│  │  │     ├─ 05v0_next_dist_0~zjcee._.js.map
│  │  │     ├─ 05v0_next_dist_client_components_0k4_ghf._.js
│  │  │     ├─ 05v0_next_dist_client_components_0k4_ghf._.js.map
│  │  │     ├─ 05v0_next_dist_client_components_builtin_forbidden_0rmqg28.js
│  │  │     ├─ 05v0_next_dist_client_components_builtin_forbidden_0rmqg28.js.map
│  │  │     ├─ 05v0_next_dist_client_components_builtin_global-error_0s0-1j1.js
│  │  │     ├─ 05v0_next_dist_client_components_builtin_global-error_0s0-1j1.js.map
│  │  │     ├─ 05v0_next_dist_client_components_builtin_unauthorized_0m3-uo~.js
│  │  │     ├─ 05v0_next_dist_client_components_builtin_unauthorized_0m3-uo~.js.map
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_06gf8a9.js
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_06gf8a9.js.map
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_0a8fnyn.js
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_0a8fnyn.js.map
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_0g2rap_.js
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_0g2rap_.js.map
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_0izqi2m.js
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_0izqi2m.js.map
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_0oi8fd8.js
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_0oi8fd8.js.map
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_0tjk3sr.js
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_0tjk3sr.js.map
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_13xabup.js
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_13xabup.js.map
│  │  │     ├─ Documentos_bloguito__next-internal_server_app__global-error_page_actions_0n-9lef.js
│  │  │     ├─ Documentos_bloguito__next-internal_server_app__global-error_page_actions_0n-9lef.js.map
│  │  │     ├─ Documentos_bloguito__next-internal_server_app__not-found_page_actions_0v3vler.js
│  │  │     ├─ Documentos_bloguito__next-internal_server_app__not-found_page_actions_0v3vler.js.map
│  │  │     ├─ Documentos_bloguito__next-internal_server_app_isr_page_actions_0gturdm.js
│  │  │     ├─ Documentos_bloguito__next-internal_server_app_isr_page_actions_0gturdm.js.map
│  │  │     ├─ Documentos_bloguito__next-internal_server_app_page_actions_0b89zr6.js
│  │  │     ├─ Documentos_bloguito__next-internal_server_app_page_actions_0b89zr6.js.map
│  │  │     ├─ Documentos_bloguito__next-internal_server_app_post_[id]_page_actions_0m-6nmn.js
│  │  │     ├─ Documentos_bloguito__next-internal_server_app_post_[id]_page_actions_0m-6nmn.js.map
│  │  │     ├─ Documentos_bloguito__next-internal_server_app_ssg_page_actions_0yr4y_9.js
│  │  │     ├─ Documentos_bloguito__next-internal_server_app_ssg_page_actions_0yr4y_9.js.map
│  │  │     ├─ Documentos_bloguito__next-internal_server_app_ssr_page_actions_06e05vn.js
│  │  │     ├─ Documentos_bloguito__next-internal_server_app_ssr_page_actions_06e05vn.js.map
│  │  │     ├─ [root-of-the-server]__08ilrmf._.js
│  │  │     ├─ [root-of-the-server]__08ilrmf._.js.map
│  │  │     ├─ [root-of-the-server]__09jtc-l._.js
│  │  │     ├─ [root-of-the-server]__09jtc-l._.js.map
│  │  │     ├─ [root-of-the-server]__0fdfiex._.js
│  │  │     ├─ [root-of-the-server]__0fdfiex._.js.map
│  │  │     ├─ [root-of-the-server]__0i5ahru._.js
│  │  │     ├─ [root-of-the-server]__0i5ahru._.js.map
│  │  │     ├─ [root-of-the-server]__0k_e4ma._.js
│  │  │     ├─ [root-of-the-server]__0k_e4ma._.js.map
│  │  │     ├─ [root-of-the-server]__0lqc5an._.js
│  │  │     ├─ [root-of-the-server]__0lqc5an._.js.map
│  │  │     ├─ [root-of-the-server]__0prctf8._.js
│  │  │     ├─ [root-of-the-server]__0prctf8._.js.map
│  │  │     ├─ [root-of-the-server]__0t8uww1._.js
│  │  │     ├─ [root-of-the-server]__0t8uww1._.js.map
│  │  │     ├─ [root-of-the-server]__0t~atlt._.js
│  │  │     ├─ [root-of-the-server]__0t~atlt._.js.map
│  │  │     ├─ [root-of-the-server]__0yy1cxz._.js
│  │  │     ├─ [root-of-the-server]__0yy1cxz._.js.map
│  │  │     ├─ [root-of-the-server]__10_tlyg._.js
│  │  │     ├─ [root-of-the-server]__10_tlyg._.js.map
│  │  │     ├─ [root-of-the-server]__113qg_s._.js
│  │  │     ├─ [root-of-the-server]__113qg_s._.js.map
│  │  │     ├─ [turbopack]_runtime.js
│  │  │     └─ [turbopack]_runtime.js.map
│  │  ├─ functions-config-manifest.json
│  │  ├─ interception-route-rewrite-manifest.js
│  │  ├─ middleware-build-manifest.js
│  │  ├─ middleware-manifest.json
│  │  ├─ next-font-manifest.js
│  │  ├─ next-font-manifest.json
│  │  ├─ pages
│  │  │  ├─ 404.html
│  │  │  └─ 500.html
│  │  ├─ pages-manifest.json
│  │  ├─ prefetch-hints.json
│  │  ├─ server-reference-manifest.js
│  │  └─ server-reference-manifest.json
│  ├─ static
│  │  ├─ 3RT65dypr_0fJ2yPNwseG
│  │  │  ├─ _buildManifest.js
│  │  │  ├─ _clientMiddlewareManifest.js
│  │  │  └─ _ssgManifest.js
│  │  ├─ chunks
│  │  │  ├─ 0-.fmnwkzpmut.js
│  │  │  ├─ 0.ujuzj~svg4v.js
│  │  │  ├─ 00n.d0qubxh9l.js
│  │  │  ├─ 03~yq9q893hmn.js
│  │  │  ├─ 09at5h_d95p43.js
│  │  │  ├─ 0amfblitodpd1.css
│  │  │  ├─ 0itpcpcq_183y.js
│  │  │  ├─ 0tgy7gwhfjkx3.js
│  │  │  ├─ 181d4l18hjc13.js
│  │  │  └─ turbopack-0tz.gc.r2z5vy.js
│  │  └─ media
│  │     ├─ 4fa387ec64143e14-s.0q3udbd2bu5yp.woff2
│  │     ├─ 7178b3e590c64307-s.11.cyxs5p-0z~.woff2
│  │     ├─ 797e433ab948586e-s.p.0.q-h669a_dqa.woff2
│  │     ├─ 8a480f0b521d4e75-s.06d3mdzz5bre_.woff2
│  │     ├─ bbc41e54d2fcbd21-s.0gw~uztddq1df.woff2
│  │     ├─ caa3a2e1cccd8315-s.p.16t1db8_9y2o~.woff2
│  │     └─ favicon.0x3dzn~oxb6tn.ico
│  ├─ trace
│  ├─ trace-build
│  ├─ turbopack
│  └─ types
│     ├─ cache-life.d.ts
│     ├─ routes.d.ts
│     └─ validator.ts
├─ AGENTS.md
├─ CLAUDE.md
├─ README.md
├─ app
│  ├─ admin
│  │  └─ page.tsx
│  ├─ api
│  │  ├─ posts
│  │  │  └─ route.ts
│  │  └─ presence
│  │     ├─ disconnect
│  │     │  └─ route.ts
│  │     ├─ route.ts
│  │     └─ stream
│  │        └─ route.ts
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ isr
│  │  └─ page.tsx
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ post
│  │  └─ [id]
│  │     └─ page.tsx
│  ├─ ssg
│  │  └─ page.tsx
│  └─ ssr
│     └─ page.tsx
├─ components
│  ├─ PostList.tsx
│  └─ PresenceClientBridge.tsx
├─ eslint.config.mjs
├─ lib
│  ├─ db.ts
│  ├─ getPosts.ts
│  └─ presenceStore.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ assets
│  │  ├─ img1.jpeg
│  │  ├─ img2.jpeg
│  │  └─ img3.jpeg
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ schema.sql
└─ tsconfig.json

```
```
blog
├─ .next
│  ├─ BUILD_ID
│  ├─ _events_22868.json
│  ├─ app-path-routes-manifest.json
│  ├─ build
│  │  ├─ chunks
│  │  │  ├─ 05v0_0nbvox3._.js
│  │  │  ├─ 05v0_0nbvox3._.js.map
│  │  │  ├─ [root-of-the-server]__0dyy4.v._.js
│  │  │  ├─ [root-of-the-server]__0dyy4.v._.js.map
│  │  │  ├─ [root-of-the-server]__0kph2ah._.js
│  │  │  ├─ [root-of-the-server]__0kph2ah._.js.map
│  │  │  ├─ [turbopack-node]_transforms_postcss_ts_09gyw-n._.js
│  │  │  ├─ [turbopack-node]_transforms_postcss_ts_09gyw-n._.js.map
│  │  │  ├─ [turbopack]_runtime.js
│  │  │  └─ [turbopack]_runtime.js.map
│  │  ├─ package.json
│  │  ├─ postcss.js
│  │  └─ postcss.js.map
│  ├─ build-manifest.json
│  ├─ cache
│  │  ├─ .previewinfo
│  │  ├─ .rscinfo
│  │  └─ fetch-cache
│  │     ├─ 1475fd63ee2bed01c065f2c36d0fc2b064a175beb172525895463f8cd034fbf6
│  │     └─ 3b9c7bea75e0117f5a4069f0d3e9d6fbd8cde85fa155d8e8bee786d74578c76f
│  ├─ dev
│  │  ├─ build
│  │  │  ├─ chunks
│  │  │  │  ├─ 05r5_01k3o1-._.js
│  │  │  │  ├─ 05r5_01k3o1-._.js.map
│  │  │  │  ├─ 05v0_0nbvox3._.js
│  │  │  │  ├─ 05v0_0nbvox3._.js.map
│  │  │  │  ├─ [root-of-the-server]__00b~5-~._.js
│  │  │  │  ├─ [root-of-the-server]__00b~5-~._.js.map
│  │  │  │  ├─ [root-of-the-server]__0cstypv._.js
│  │  │  │  ├─ [root-of-the-server]__0cstypv._.js.map
│  │  │  │  ├─ [root-of-the-server]__0d-m0h0._.js
│  │  │  │  ├─ [root-of-the-server]__0d-m0h0._.js.map
│  │  │  │  ├─ [root-of-the-server]__0dyy4.v._.js
│  │  │  │  ├─ [root-of-the-server]__0dyy4.v._.js.map
│  │  │  │  ├─ [root-of-the-server]__0iz~thn._.js
│  │  │  │  ├─ [root-of-the-server]__0iz~thn._.js.map
│  │  │  │  ├─ [root-of-the-server]__0kph2ah._.js
│  │  │  │  ├─ [root-of-the-server]__0kph2ah._.js.map
│  │  │  │  ├─ [root-of-the-server]__0ubbtyl._.js
│  │  │  │  ├─ [root-of-the-server]__0ubbtyl._.js.map
│  │  │  │  ├─ [root-of-the-server]__0z-_fxe._.js
│  │  │  │  ├─ [root-of-the-server]__0z-_fxe._.js.map
│  │  │  │  ├─ [root-of-the-server]__0z6~21d._.js
│  │  │  │  ├─ [root-of-the-server]__0z6~21d._.js.map
│  │  │  │  ├─ [turbopack-node]_transforms_postcss_ts_06e.r3r._.js
│  │  │  │  ├─ [turbopack-node]_transforms_postcss_ts_06e.r3r._.js.map
│  │  │  │  ├─ [turbopack-node]_transforms_postcss_ts_09gyw-n._.js
│  │  │  │  ├─ [turbopack-node]_transforms_postcss_ts_09gyw-n._.js.map
│  │  │  │  ├─ [turbopack-node]_transforms_postcss_ts_0l~nski._.js
│  │  │  │  ├─ [turbopack-node]_transforms_postcss_ts_0l~nski._.js.map
│  │  │  │  ├─ [turbopack-node]_transforms_webpack-loaders_ts_0z77ki4._.js
│  │  │  │  ├─ [turbopack-node]_transforms_webpack-loaders_ts_0z77ki4._.js.map
│  │  │  │  ├─ [turbopack]_runtime.js
│  │  │  │  └─ [turbopack]_runtime.js.map
│  │  │  ├─ package.json
│  │  │  ├─ postcss.js
│  │  │  ├─ postcss.js.map
│  │  │  ├─ webpack-loaders.js
│  │  │  └─ webpack-loaders.js.map
│  │  ├─ build-manifest.json
│  │  ├─ cache
│  │  │  ├─ .rscinfo
│  │  │  ├─ fetch-cache
│  │  │  │  ├─ 1475fd63ee2bed01c065f2c36d0fc2b064a175beb172525895463f8cd034fbf6
│  │  │  │  └─ 3b9c7bea75e0117f5a4069f0d3e9d6fbd8cde85fa155d8e8bee786d74578c76f
│  │  │  ├─ next-devtools-config.json
│  │  │  └─ turbopack
│  │  │     ├─ 2275bd85
│  │  │     │  ├─ 00000005.sst
│  │  │     │  ├─ 00000006.sst
│  │  │     │  ├─ 00000007.sst
│  │  │     │  ├─ 00000008.meta
│  │  │     │  ├─ 00000009.meta
│  │  │     │  ├─ 00000011.meta
│  │  │     │  ├─ 00000012.sst
│  │  │     │  ├─ 00000014.sst
│  │  │     │  ├─ 00000015.meta
│  │  │     │  ├─ 00000016.meta
│  │  │     │  ├─ 00000018.sst
│  │  │     │  ├─ 00000020.sst
│  │  │     │  ├─ 00000021.meta
│  │  │     │  ├─ 00000022.meta
│  │  │     │  ├─ 00000025.sst
│  │  │     │  ├─ 00000026.sst
│  │  │     │  ├─ 00000027.meta
│  │  │     │  ├─ 00000028.meta
│  │  │     │  ├─ 00000031.sst
│  │  │     │  ├─ 00000032.sst
│  │  │     │  ├─ 00000033.meta
│  │  │     │  ├─ 00000034.meta
│  │  │     │  ├─ 00000037.sst
│  │  │     │  ├─ 00000038.sst
│  │  │     │  ├─ 00000039.meta
│  │  │     │  ├─ 00000040.meta
│  │  │     │  ├─ 00000042.sst
│  │  │     │  ├─ 00000044.sst
│  │  │     │  ├─ 00000045.meta
│  │  │     │  ├─ 00000046.meta
│  │  │     │  ├─ 00000049.sst
│  │  │     │  ├─ 00000050.sst
│  │  │     │  ├─ 00000051.meta
│  │  │     │  ├─ 00000052.meta
│  │  │     │  ├─ 00000054.sst
│  │  │     │  ├─ 00000056.sst
│  │  │     │  ├─ 00000057.meta
│  │  │     │  ├─ 00000058.meta
│  │  │     │  ├─ 00000060.sst
│  │  │     │  ├─ 00000062.sst
│  │  │     │  ├─ 00000063.meta
│  │  │     │  ├─ 00000064.meta
│  │  │     │  ├─ 00000066.sst
│  │  │     │  ├─ 00000068.sst
│  │  │     │  ├─ 00000069.meta
│  │  │     │  ├─ 00000070.meta
│  │  │     │  ├─ 00000073.sst
│  │  │     │  ├─ 00000074.sst
│  │  │     │  ├─ 00000075.meta
│  │  │     │  ├─ 00000076.meta
│  │  │     │  ├─ 00000078.sst
│  │  │     │  ├─ 00000080.sst
│  │  │     │  ├─ 00000081.meta
│  │  │     │  ├─ 00000083.meta
│  │  │     │  ├─ 00000085.sst
│  │  │     │  ├─ 00000086.sst
│  │  │     │  ├─ 00000087.sst
│  │  │     │  ├─ 00000088.meta
│  │  │     │  ├─ 00000090.meta
│  │  │     │  ├─ 00000091.meta
│  │  │     │  ├─ 00000092.sst
│  │  │     │  ├─ 00000094.sst
│  │  │     │  ├─ 00000095.meta
│  │  │     │  ├─ 00000096.meta
│  │  │     │  ├─ 00000102.sst
│  │  │     │  ├─ 00000103.sst
│  │  │     │  ├─ 00000104.sst
│  │  │     │  ├─ 00000105.meta
│  │  │     │  ├─ 00000106.meta
│  │  │     │  ├─ 00000108.meta
│  │  │     │  ├─ 00000109.sst
│  │  │     │  ├─ 00000111.sst
│  │  │     │  ├─ 00000112.meta
│  │  │     │  ├─ 00000113.meta
│  │  │     │  ├─ 00000116.sst
│  │  │     │  ├─ 00000117.sst
│  │  │     │  ├─ 00000118.meta
│  │  │     │  ├─ 00000120.meta
│  │  │     │  ├─ 00000121.sst
│  │  │     │  ├─ 00000123.sst
│  │  │     │  ├─ 00000124.meta
│  │  │     │  ├─ 00000126.meta
│  │  │     │  ├─ 00000128.sst
│  │  │     │  ├─ 00000129.sst
│  │  │     │  ├─ 00000130.meta
│  │  │     │  ├─ 00000131.meta
│  │  │     │  ├─ 00000137.sst
│  │  │     │  ├─ 00000138.sst
│  │  │     │  ├─ 00000139.sst
│  │  │     │  ├─ 00000140.meta
│  │  │     │  ├─ 00000141.meta
│  │  │     │  ├─ 00000143.meta
│  │  │     │  ├─ 00000144.sst
│  │  │     │  ├─ 00000145.sst
│  │  │     │  ├─ 00000146.meta
│  │  │     │  ├─ 00000148.sst
│  │  │     │  ├─ 00000149.sst
│  │  │     │  ├─ 00000150.sst
│  │  │     │  ├─ 00000151.sst
│  │  │     │  ├─ 00000152.sst
│  │  │     │  ├─ 00000153.sst
│  │  │     │  ├─ 00000154.sst
│  │  │     │  ├─ 00000155.meta
│  │  │     │  ├─ 00000156.meta
│  │  │     │  ├─ 00000157.meta
│  │  │     │  ├─ 00000158.meta
│  │  │     │  ├─ 00000159.sst
│  │  │     │  ├─ 00000160.sst
│  │  │     │  ├─ 00000161.sst
│  │  │     │  ├─ 00000162.meta
│  │  │     │  ├─ 00000163.meta
│  │  │     │  ├─ 00000164.meta
│  │  │     │  ├─ 00000165.sst
│  │  │     │  ├─ 00000166.sst
│  │  │     │  ├─ 00000167.sst
│  │  │     │  ├─ 00000168.meta
│  │  │     │  ├─ 00000169.meta
│  │  │     │  ├─ 00000170.meta
│  │  │     │  ├─ 00000171.sst
│  │  │     │  ├─ 00000172.sst
│  │  │     │  ├─ 00000173.sst
│  │  │     │  ├─ 00000174.meta
│  │  │     │  ├─ 00000175.meta
│  │  │     │  ├─ 00000176.meta
│  │  │     │  ├─ 00000177.sst
│  │  │     │  ├─ 00000178.sst
│  │  │     │  ├─ 00000179.sst
│  │  │     │  ├─ 00000180.meta
│  │  │     │  ├─ 00000181.meta
│  │  │     │  ├─ 00000182.meta
│  │  │     │  ├─ 00000183.sst
│  │  │     │  ├─ 00000184.sst
│  │  │     │  ├─ 00000185.sst
│  │  │     │  ├─ 00000186.meta
│  │  │     │  ├─ 00000187.meta
│  │  │     │  ├─ 00000188.meta
│  │  │     │  ├─ 00000189.sst
│  │  │     │  ├─ 00000190.sst
│  │  │     │  ├─ 00000191.sst
│  │  │     │  ├─ 00000192.meta
│  │  │     │  ├─ 00000193.meta
│  │  │     │  ├─ 00000194.meta
│  │  │     │  ├─ 00000195.sst
│  │  │     │  ├─ 00000196.sst
│  │  │     │  ├─ 00000197.sst
│  │  │     │  ├─ 00000198.meta
│  │  │     │  ├─ 00000199.meta
│  │  │     │  ├─ 00000200.meta
│  │  │     │  ├─ 00000201.sst
│  │  │     │  ├─ 00000202.sst
│  │  │     │  ├─ 00000203.sst
│  │  │     │  ├─ 00000204.meta
│  │  │     │  ├─ 00000205.meta
│  │  │     │  ├─ 00000206.meta
│  │  │     │  ├─ 00000207.sst
│  │  │     │  ├─ 00000208.sst
│  │  │     │  ├─ 00000209.sst
│  │  │     │  ├─ 00000210.sst
│  │  │     │  ├─ 00000211.meta
│  │  │     │  ├─ 00000212.meta
│  │  │     │  ├─ 00000213.meta
│  │  │     │  ├─ 00000214.meta
│  │  │     │  ├─ 00000215.sst
│  │  │     │  ├─ 00000216.sst
│  │  │     │  ├─ 00000217.sst
│  │  │     │  ├─ 00000218.meta
│  │  │     │  ├─ 00000219.meta
│  │  │     │  ├─ 00000220.meta
│  │  │     │  ├─ 00000221.sst
│  │  │     │  ├─ 00000222.sst
│  │  │     │  ├─ 00000223.sst
│  │  │     │  ├─ 00000224.sst
│  │  │     │  ├─ 00000225.meta
│  │  │     │  ├─ 00000226.meta
│  │  │     │  ├─ 00000227.meta
│  │  │     │  ├─ 00000228.meta
│  │  │     │  ├─ 00000229.sst
│  │  │     │  ├─ 00000230.sst
│  │  │     │  ├─ 00000231.sst
│  │  │     │  ├─ 00000232.meta
│  │  │     │  ├─ 00000233.meta
│  │  │     │  ├─ 00000234.meta
│  │  │     │  ├─ 00000235.sst
│  │  │     │  ├─ 00000236.sst
│  │  │     │  ├─ 00000237.sst
│  │  │     │  ├─ 00000238.meta
│  │  │     │  ├─ 00000239.meta
│  │  │     │  ├─ 00000240.meta
│  │  │     │  ├─ 00000241.sst
│  │  │     │  ├─ 00000242.sst
│  │  │     │  ├─ 00000243.sst
│  │  │     │  ├─ 00000244.meta
│  │  │     │  ├─ 00000245.meta
│  │  │     │  ├─ 00000246.meta
│  │  │     │  ├─ 00000247.sst
│  │  │     │  ├─ 00000248.sst
│  │  │     │  ├─ 00000249.sst
│  │  │     │  ├─ 00000250.meta
│  │  │     │  ├─ 00000251.meta
│  │  │     │  ├─ 00000252.meta
│  │  │     │  ├─ 00000253.sst
│  │  │     │  ├─ 00000254.sst
│  │  │     │  ├─ 00000255.sst
│  │  │     │  ├─ 00000256.meta
│  │  │     │  ├─ 00000257.meta
│  │  │     │  ├─ 00000258.meta
│  │  │     │  ├─ CURRENT
│  │  │     │  └─ LOG
│  │  │     └─ e0739832
│  │  │        ├─ 00000001.sst
│  │  │        ├─ 00000003.sst
│  │  │        ├─ 00000004.sst
│  │  │        ├─ 00000005.meta
│  │  │        ├─ 00000006.meta
│  │  │        ├─ 00000008.meta
│  │  │        ├─ 00000009.sst
│  │  │        ├─ 00000011.sst
│  │  │        ├─ 00000012.meta
│  │  │        ├─ 00000013.meta
│  │  │        ├─ 00000019.sst
│  │  │        ├─ 00000020.sst
│  │  │        ├─ 00000021.sst
│  │  │        ├─ 00000022.meta
│  │  │        ├─ 00000023.meta
│  │  │        ├─ 00000025.meta
│  │  │        ├─ 00000030.sst
│  │  │        ├─ 00000031.sst
│  │  │        ├─ 00000032.sst
│  │  │        ├─ 00000033.meta
│  │  │        ├─ 00000034.meta
│  │  │        ├─ 00000036.meta
│  │  │        ├─ 00000037.sst
│  │  │        ├─ 00000039.sst
│  │  │        ├─ 00000040.sst
│  │  │        ├─ 00000041.meta
│  │  │        ├─ 00000042.meta
│  │  │        ├─ 00000044.meta
│  │  │        ├─ 00000049.sst
│  │  │        ├─ 00000050.sst
│  │  │        ├─ 00000051.sst
│  │  │        ├─ 00000052.meta
│  │  │        ├─ 00000053.meta
│  │  │        ├─ 00000055.meta
│  │  │        ├─ 00000056.sst
│  │  │        ├─ 00000057.sst
│  │  │        ├─ 00000058.meta
│  │  │        ├─ 00000059.del
│  │  │        ├─ 00000060.sst
│  │  │        ├─ 00000061.sst
│  │  │        ├─ 00000062.sst
│  │  │        ├─ 00000063.sst
│  │  │        ├─ 00000064.sst
│  │  │        ├─ 00000065.sst
│  │  │        ├─ 00000066.sst
│  │  │        ├─ 00000067.meta
│  │  │        ├─ 00000068.meta
│  │  │        ├─ 00000069.meta
│  │  │        ├─ 00000070.meta
│  │  │        ├─ 00000071.sst
│  │  │        ├─ 00000072.sst
│  │  │        ├─ 00000073.sst
│  │  │        ├─ 00000074.sst
│  │  │        ├─ 00000075.meta
│  │  │        ├─ 00000076.meta
│  │  │        ├─ 00000077.meta
│  │  │        ├─ 00000078.meta
│  │  │        ├─ CURRENT
│  │  │        └─ LOG
│  │  ├─ fallback-build-manifest.json
│  │  ├─ logs
│  │  │  └─ next-development.log
│  │  ├─ package.json
│  │  ├─ prerender-manifest.json
│  │  ├─ routes-manifest.json
│  │  ├─ server
│  │  │  ├─ app
│  │  │  │  ├─ api
│  │  │  │  │  └─ presence
│  │  │  │  │     ├─ disconnect
│  │  │  │  │     │  ├─ route
│  │  │  │  │     │  │  ├─ app-paths-manifest.json
│  │  │  │  │     │  │  ├─ build-manifest.json
│  │  │  │  │     │  │  └─ server-reference-manifest.json
│  │  │  │  │     │  ├─ route.js
│  │  │  │  │     │  ├─ route.js.map
│  │  │  │  │     │  └─ route_client-reference-manifest.js
│  │  │  │  │     ├─ route
│  │  │  │  │     │  ├─ app-paths-manifest.json
│  │  │  │  │     │  ├─ build-manifest.json
│  │  │  │  │     │  └─ server-reference-manifest.json
│  │  │  │  │     ├─ route.js
│  │  │  │  │     ├─ route.js.map
│  │  │  │  │     ├─ route_client-reference-manifest.js
│  │  │  │  │     └─ stream
│  │  │  │  │        ├─ route
│  │  │  │  │        │  ├─ app-paths-manifest.json
│  │  │  │  │        │  ├─ build-manifest.json
│  │  │  │  │        │  └─ server-reference-manifest.json
│  │  │  │  │        ├─ route.js
│  │  │  │  │        ├─ route.js.map
│  │  │  │  │        └─ route_client-reference-manifest.js
│  │  │  │  ├─ isr
│  │  │  │  │  ├─ page
│  │  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  │  ├─ page.js
│  │  │  │  │  ├─ page.js.map
│  │  │  │  │  └─ page_client-reference-manifest.js
│  │  │  │  ├─ page
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page.js.map
│  │  │  │  ├─ page_client-reference-manifest.js
│  │  │  │  ├─ ssg
│  │  │  │  │  ├─ page
│  │  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  │  ├─ page.js
│  │  │  │  │  ├─ page.js.map
│  │  │  │  │  └─ page_client-reference-manifest.js
│  │  │  │  └─ ssr
│  │  │  │     ├─ page
│  │  │  │     │  ├─ app-paths-manifest.json
│  │  │  │     │  ├─ build-manifest.json
│  │  │  │     │  ├─ next-font-manifest.json
│  │  │  │     │  ├─ react-loadable-manifest.json
│  │  │  │     │  └─ server-reference-manifest.json
│  │  │  │     ├─ page.js
│  │  │  │     ├─ page.js.map
│  │  │  │     └─ page_client-reference-manifest.js
│  │  │  ├─ app-paths-manifest.json
│  │  │  ├─ chunks
│  │  │  │  ├─ 05r5_next_dist_099f-ra._.js
│  │  │  │  ├─ 05r5_next_dist_099f-ra._.js.map
│  │  │  │  ├─ 05r5_next_dist_0ngw776._.js
│  │  │  │  ├─ 05r5_next_dist_0ngw776._.js.map
│  │  │  │  ├─ 05r5_next_dist_0s~3ck~._.js
│  │  │  │  ├─ 05r5_next_dist_0s~3ck~._.js.map
│  │  │  │  ├─ [root-of-the-server]__0.29yyr._.js
│  │  │  │  ├─ [root-of-the-server]__0.29yyr._.js.map
│  │  │  │  ├─ [root-of-the-server]__00s6oj1._.js
│  │  │  │  ├─ [root-of-the-server]__00s6oj1._.js.map
│  │  │  │  ├─ [root-of-the-server]__04_jb64._.js
│  │  │  │  ├─ [root-of-the-server]__04_jb64._.js.map
│  │  │  │  ├─ [root-of-the-server]__0t3bgyn._.js
│  │  │  │  ├─ [root-of-the-server]__0t3bgyn._.js.map
│  │  │  │  ├─ [root-of-the-server]__0vn8o5m._.js
│  │  │  │  ├─ [root-of-the-server]__0vn8o5m._.js.map
│  │  │  │  ├─ [root-of-the-server]__0z3gav9._.js
│  │  │  │  ├─ [root-of-the-server]__0z3gav9._.js.map
│  │  │  │  ├─ [turbopack]_runtime.js
│  │  │  │  ├─ [turbopack]_runtime.js.map
│  │  │  │  ├─ _next-internal_server_app_api_presence_disconnect_route_actions_0txz3mh.js
│  │  │  │  ├─ _next-internal_server_app_api_presence_disconnect_route_actions_0txz3mh.js.map
│  │  │  │  ├─ _next-internal_server_app_api_presence_route_actions_0w34zgv.js
│  │  │  │  ├─ _next-internal_server_app_api_presence_route_actions_0w34zgv.js.map
│  │  │  │  ├─ _next-internal_server_app_api_presence_stream_route_actions_0pi9.i4.js
│  │  │  │  ├─ _next-internal_server_app_api_presence_stream_route_actions_0pi9.i4.js.map
│  │  │  │  ├─ app_api_presence_disconnect_route_ts_0ebawfo._.js
│  │  │  │  ├─ app_api_presence_disconnect_route_ts_0ebawfo._.js.map
│  │  │  │  ├─ app_api_presence_route_ts_0tco6xl._.js
│  │  │  │  ├─ app_api_presence_route_ts_0tco6xl._.js.map
│  │  │  │  ├─ app_api_presence_stream_route_ts_0s0wxq3._.js
│  │  │  │  ├─ app_api_presence_stream_route_ts_0s0wxq3._.js.map
│  │  │  │  ├─ blog__next-internal_server_app_api_presence_disconnect_route_actions_0bpnq21.js
│  │  │  │  ├─ blog__next-internal_server_app_api_presence_disconnect_route_actions_0bpnq21.js.map
│  │  │  │  ├─ blog__next-internal_server_app_api_presence_route_actions_0ca02gs.js
│  │  │  │  ├─ blog__next-internal_server_app_api_presence_route_actions_0ca02gs.js.map
│  │  │  │  ├─ blog__next-internal_server_app_api_presence_stream_route_actions_0b.s8gf.js
│  │  │  │  ├─ blog__next-internal_server_app_api_presence_stream_route_actions_0b.s8gf.js.map
│  │  │  │  ├─ blog_app_api_presence_disconnect_route_ts_0oy5pp4._.js
│  │  │  │  ├─ blog_app_api_presence_disconnect_route_ts_0oy5pp4._.js.map
│  │  │  │  ├─ blog_app_api_presence_route_ts_09kn6j3._.js
│  │  │  │  ├─ blog_app_api_presence_route_ts_09kn6j3._.js.map
│  │  │  │  ├─ blog_app_api_presence_stream_route_ts_0cwcjsq._.js
│  │  │  │  ├─ blog_app_api_presence_stream_route_ts_0cwcjsq._.js.map
│  │  │  │  └─ ssr
│  │  │  │     ├─ 05r5_0cr~suh._.js
│  │  │  │     ├─ 05r5_0cr~suh._.js.map
│  │  │  │     ├─ 05r5_0f1_78~._.js
│  │  │  │     ├─ 05r5_0f1_78~._.js.map
│  │  │  │     ├─ 05r5_0sle0rf._.js
│  │  │  │     ├─ 05r5_0sle0rf._.js.map
│  │  │  │     ├─ 05r5_0vgcuq0._.js
│  │  │  │     ├─ 05r5_0vgcuq0._.js.map
│  │  │  │     ├─ 05r5_aws-ssl-profiles_lib_0enc.9e._.js
│  │  │  │     ├─ 05r5_aws-ssl-profiles_lib_0enc.9e._.js.map
│  │  │  │     ├─ 05r5_iconv-lite_0gxc1ey._.js
│  │  │  │     ├─ 05r5_iconv-lite_0gxc1ey._.js.map
│  │  │  │     ├─ 05r5_mysql2_01wlpny._.js
│  │  │  │     ├─ 05r5_mysql2_01wlpny._.js.map
│  │  │  │     ├─ 05r5_next_dist_0qbnv0u._.js
│  │  │  │     ├─ 05r5_next_dist_0qbnv0u._.js.map
│  │  │  │     ├─ 05r5_next_dist_11a5.b6._.js
│  │  │  │     ├─ 05r5_next_dist_11a5.b6._.js.map
│  │  │  │     ├─ 05r5_next_dist_client_components_0~lr4ix._.js
│  │  │  │     ├─ 05r5_next_dist_client_components_0~lr4ix._.js.map
│  │  │  │     ├─ 05r5_next_dist_client_components_builtin_forbidden_0~b-vpf.js
│  │  │  │     ├─ 05r5_next_dist_client_components_builtin_forbidden_0~b-vpf.js.map
│  │  │  │     ├─ 05r5_next_dist_client_components_builtin_global-error_0qf91s0.js
│  │  │  │     ├─ 05r5_next_dist_client_components_builtin_global-error_0qf91s0.js.map
│  │  │  │     ├─ 05r5_next_dist_client_components_builtin_unauthorized_0.lmkn5.js
│  │  │  │     ├─ 05r5_next_dist_client_components_builtin_unauthorized_0.lmkn5.js.map
│  │  │  │     ├─ 05r5_next_dist_compiled_0yrjw~8._.js
│  │  │  │     ├─ 05r5_next_dist_compiled_0yrjw~8._.js.map
│  │  │  │     ├─ 05r5_next_dist_esm_12vuo.s._.js
│  │  │  │     ├─ 05r5_next_dist_esm_12vuo.s._.js.map
│  │  │  │     ├─ 05r5_next_dist_server_route-modules_app-page_0~29zs2._.js
│  │  │  │     ├─ 05r5_next_dist_server_route-modules_app-page_0~29zs2._.js.map
│  │  │  │     ├─ 05v0_0gqezmf._.js
│  │  │  │     ├─ 05v0_0gqezmf._.js.map
│  │  │  │     ├─ 05v0_0l4jmnm._.js
│  │  │  │     ├─ 05v0_0l4jmnm._.js.map
│  │  │  │     ├─ 05v0_0x0dzbc._.js
│  │  │  │     ├─ 05v0_0x0dzbc._.js.map
│  │  │  │     ├─ 05v0_11vqhwr._.js
│  │  │  │     ├─ 05v0_11vqhwr._.js.map
│  │  │  │     ├─ 05v0_next_dist_0u.ojkb._.js
│  │  │  │     ├─ 05v0_next_dist_0u.ojkb._.js.map
│  │  │  │     ├─ 05v0_next_dist_client_components_0k4_ghf._.js
│  │  │  │     ├─ 05v0_next_dist_client_components_0k4_ghf._.js.map
│  │  │  │     ├─ 05v0_next_dist_client_components_builtin_forbidden_0rmqg28.js
│  │  │  │     ├─ 05v0_next_dist_client_components_builtin_forbidden_0rmqg28.js.map
│  │  │  │     ├─ 05v0_next_dist_client_components_builtin_global-error_0s0-1j1.js
│  │  │  │     ├─ 05v0_next_dist_client_components_builtin_global-error_0s0-1j1.js.map
│  │  │  │     ├─ 05v0_next_dist_client_components_builtin_unauthorized_0m3-uo~.js
│  │  │  │     ├─ 05v0_next_dist_client_components_builtin_unauthorized_0m3-uo~.js.map
│  │  │  │     ├─ 05v0_next_dist_compiled_0o6k7~b._.js
│  │  │  │     ├─ 05v0_next_dist_compiled_0o6k7~b._.js.map
│  │  │  │     ├─ 05v0_next_dist_esm_0paig5p._.js
│  │  │  │     ├─ 05v0_next_dist_esm_0paig5p._.js.map
│  │  │  │     ├─ 05v0_next_dist_server_route-modules_app-page_04tvust._.js
│  │  │  │     ├─ 05v0_next_dist_server_route-modules_app-page_04tvust._.js.map
│  │  │  │     ├─ Documentos_bloguito__next-internal_server_app_isr_page_actions_0gturdm.js
│  │  │  │     ├─ Documentos_bloguito__next-internal_server_app_isr_page_actions_0gturdm.js.map
│  │  │  │     ├─ Documentos_bloguito__next-internal_server_app_page_actions_0b89zr6.js
│  │  │  │     ├─ Documentos_bloguito__next-internal_server_app_page_actions_0b89zr6.js.map
│  │  │  │     ├─ [externals]__0n13xf4._.js
│  │  │  │     ├─ [externals]__0n13xf4._.js.map
│  │  │  │     ├─ [externals]_next_dist_0yew8f-._.js
│  │  │  │     ├─ [externals]_next_dist_0yew8f-._.js.map
│  │  │  │     ├─ [root-of-the-server]__0-chgqx._.js
│  │  │  │     ├─ [root-of-the-server]__0-chgqx._.js.map
│  │  │  │     ├─ [root-of-the-server]__01eqota._.js
│  │  │  │     ├─ [root-of-the-server]__01eqota._.js.map
│  │  │  │     ├─ [root-of-the-server]__08_sa2d._.js
│  │  │  │     ├─ [root-of-the-server]__08_sa2d._.js.map
│  │  │  │     ├─ [root-of-the-server]__08dq6uz._.js
│  │  │  │     ├─ [root-of-the-server]__08dq6uz._.js.map
│  │  │  │     ├─ [root-of-the-server]__0e.fwaa._.js
│  │  │  │     ├─ [root-of-the-server]__0e.fwaa._.js.map
│  │  │  │     ├─ [root-of-the-server]__0h2m16x._.js
│  │  │  │     ├─ [root-of-the-server]__0h2m16x._.js.map
│  │  │  │     ├─ [root-of-the-server]__0m-tfg-._.js
│  │  │  │     ├─ [root-of-the-server]__0m-tfg-._.js.map
│  │  │  │     ├─ [root-of-the-server]__0mu1c6a._.js
│  │  │  │     ├─ [root-of-the-server]__0mu1c6a._.js.map
│  │  │  │     ├─ [root-of-the-server]__0we65u6._.js
│  │  │  │     ├─ [root-of-the-server]__0we65u6._.js.map
│  │  │  │     ├─ [root-of-the-server]__0yf25jv._.js
│  │  │  │     ├─ [root-of-the-server]__0yf25jv._.js.map
│  │  │  │     ├─ [root-of-the-server]__0zozzhi._.js
│  │  │  │     ├─ [root-of-the-server]__0zozzhi._.js.map
│  │  │  │     ├─ [root-of-the-server]__10x.pqb._.js
│  │  │  │     ├─ [root-of-the-server]__10x.pqb._.js.map
│  │  │  │     ├─ [root-of-the-server]__11mz4ds._.js
│  │  │  │     ├─ [root-of-the-server]__11mz4ds._.js.map
│  │  │  │     ├─ [turbopack]_runtime.js
│  │  │  │     ├─ [turbopack]_runtime.js.map
│  │  │  │     ├─ _next-internal_server_app_isr_page_actions_0-d1j2o.js
│  │  │  │     ├─ _next-internal_server_app_isr_page_actions_0-d1j2o.js.map
│  │  │  │     ├─ _next-internal_server_app_page_actions_09-gtaw.js
│  │  │  │     ├─ _next-internal_server_app_page_actions_09-gtaw.js.map
│  │  │  │     ├─ _next-internal_server_app_ssg_page_actions_0lcgtvr.js
│  │  │  │     ├─ _next-internal_server_app_ssg_page_actions_0lcgtvr.js.map
│  │  │  │     ├─ _next-internal_server_app_ssr_page_actions_0a9inea.js
│  │  │  │     ├─ _next-internal_server_app_ssr_page_actions_0a9inea.js.map
│  │  │  │     ├─ blog__next-internal_server_app_page_actions_0e3wzkz.js
│  │  │  │     ├─ blog__next-internal_server_app_page_actions_0e3wzkz.js.map
│  │  │  │     ├─ blog__next-internal_server_app_ssg_page_actions_0h76w5z.js
│  │  │  │     └─ blog__next-internal_server_app_ssg_page_actions_0h76w5z.js.map
│  │  │  ├─ interception-route-rewrite-manifest.js
│  │  │  ├─ middleware-build-manifest.js
│  │  │  ├─ middleware-manifest.json
│  │  │  ├─ next-font-manifest.js
│  │  │  ├─ next-font-manifest.json
│  │  │  ├─ pages-manifest.json
│  │  │  ├─ server-reference-manifest.js
│  │  │  └─ server-reference-manifest.json
│  │  ├─ static
│  │  │  ├─ chunks
│  │  │  │  ├─ 05r5_@swc_helpers_cjs_0pvx0ep._.js
│  │  │  │  ├─ 05r5_@swc_helpers_cjs_0pvx0ep._.js.map
│  │  │  │  ├─ 05r5_next_dist_0fc86.t._.js
│  │  │  │  ├─ 05r5_next_dist_0fc86.t._.js.map
│  │  │  │  ├─ 05r5_next_dist_0za.fea._.js
│  │  │  │  ├─ 05r5_next_dist_0za.fea._.js.map
│  │  │  │  ├─ 05r5_next_dist_10ifv4e._.js
│  │  │  │  ├─ 05r5_next_dist_10ifv4e._.js.map
│  │  │  │  ├─ 05r5_next_dist_build_polyfills_polyfill-nomodule.js
│  │  │  │  ├─ 05r5_next_dist_build_polyfills_polyfill-nomodule.js.map
│  │  │  │  ├─ 05r5_next_dist_client_05s6_9q._.js
│  │  │  │  ├─ 05r5_next_dist_client_05s6_9q._.js.map
│  │  │  │  ├─ 05r5_next_dist_client_components_builtin_global-error_07boel5.js
│  │  │  │  ├─ 05r5_next_dist_compiled_0lv1-cz._.js
│  │  │  │  ├─ 05r5_next_dist_compiled_0lv1-cz._.js.map
│  │  │  │  ├─ 05r5_next_dist_compiled_next-devtools_index_11bmvtk.js
│  │  │  │  ├─ 05r5_next_dist_compiled_next-devtools_index_11bmvtk.js.map
│  │  │  │  ├─ 05r5_next_dist_compiled_react-dom_0t5.ooa._.js
│  │  │  │  ├─ 05r5_next_dist_compiled_react-dom_0t5.ooa._.js.map
│  │  │  │  ├─ 05r5_next_dist_compiled_react-server-dom-turbopack_0f_7cmi._.js
│  │  │  │  ├─ 05r5_next_dist_compiled_react-server-dom-turbopack_0f_7cmi._.js.map
│  │  │  │  ├─ 05v0_@swc_helpers_cjs_0_rh_0v._.js
│  │  │  │  ├─ 05v0_@swc_helpers_cjs_0_rh_0v._.js.map
│  │  │  │  ├─ 05v0_next_dist_03wikrj._.js
│  │  │  │  ├─ 05v0_next_dist_03wikrj._.js.map
│  │  │  │  ├─ 05v0_next_dist_0m7vs1k._.js
│  │  │  │  ├─ 05v0_next_dist_0m7vs1k._.js.map
│  │  │  │  ├─ 05v0_next_dist_0wb5~1~._.js
│  │  │  │  ├─ 05v0_next_dist_0wb5~1~._.js.map
│  │  │  │  ├─ 05v0_next_dist_build_polyfills_polyfill-nomodule.js
│  │  │  │  ├─ 05v0_next_dist_build_polyfills_polyfill-nomodule.js.map
│  │  │  │  ├─ 05v0_next_dist_client_12-lng3._.js
│  │  │  │  ├─ 05v0_next_dist_client_12-lng3._.js.map
│  │  │  │  ├─ 05v0_next_dist_client_components_builtin_global-error_0yte1gi.js
│  │  │  │  ├─ 05v0_next_dist_compiled_0lh3p4x._.js
│  │  │  │  ├─ 05v0_next_dist_compiled_0lh3p4x._.js.map
│  │  │  │  ├─ 05v0_next_dist_compiled_next-devtools_index_0.b3-gk.js
│  │  │  │  ├─ 05v0_next_dist_compiled_next-devtools_index_0.b3-gk.js.map
│  │  │  │  ├─ 05v0_next_dist_compiled_react-dom_0s9z3ng._.js
│  │  │  │  ├─ 05v0_next_dist_compiled_react-dom_0s9z3ng._.js.map
│  │  │  │  ├─ 05v0_next_dist_compiled_react-server-dom-turbopack_0jq24w6._.js
│  │  │  │  ├─ 05v0_next_dist_compiled_react-server-dom-turbopack_0jq24w6._.js.map
│  │  │  │  ├─ Documentos_bloguito_02hiov_._.js.map
│  │  │  │  ├─ Documentos_bloguito_0rqeker._.js
│  │  │  │  ├─ Documentos_bloguito_app_globals_css_0w3-wzy._.single.css
│  │  │  │  ├─ Documentos_bloguito_app_globals_css_0w3-wzy._.single.css.map
│  │  │  │  ├─ Documentos_bloguito_app_isr_page_tsx_0yte1gi._.js
│  │  │  │  ├─ Documentos_bloguito_app_layout_tsx_0avx352._.js
│  │  │  │  ├─ Documentos_bloguito_app_page_tsx_0yte1gi._.js
│  │  │  │  ├─ [next]_internal_font_google_geist_a71539c9_module_css_0w3-wzy._.single.css
│  │  │  │  ├─ [next]_internal_font_google_geist_a71539c9_module_css_0w3-wzy._.single.css.map
│  │  │  │  ├─ [next]_internal_font_google_geist_mono_8d43a2aa_module_css_0w3-wzy._.single.css
│  │  │  │  ├─ [next]_internal_font_google_geist_mono_8d43a2aa_module_css_0w3-wzy._.single.css.map
│  │  │  │  ├─ [root-of-the-server]__06.-pfn._.css
│  │  │  │  ├─ [root-of-the-server]__06.-pfn._.css.map
│  │  │  │  ├─ [root-of-the-server]__0rrajln._.css
│  │  │  │  ├─ [root-of-the-server]__0rrajln._.css.map
│  │  │  │  ├─ [root-of-the-server]__13n~009._.css
│  │  │  │  ├─ [root-of-the-server]__13n~009._.css.map
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_02tiu.r._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_0solxdb._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_0solxdb._.js.map
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_0yjw1oe._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_0yjw1oe._.js.map
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_10mygs7._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_10z625~._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_10z625~._.js.map
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_11ih6.9._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_12j84yl._.js
│  │  │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_12j84yl._.js.map
│  │  │  │  ├─ _0p44nws._.js.map
│  │  │  │  ├─ _0rqeker._.js
│  │  │  │  ├─ app_globals_css_0w3-wzy._.single.css
│  │  │  │  ├─ app_globals_css_0w3-wzy._.single.css.map
│  │  │  │  ├─ app_isr_page_tsx_070j1q3._.js
│  │  │  │  ├─ app_layout_tsx_004glpo._.js
│  │  │  │  ├─ app_page_tsx_070j1q3._.js
│  │  │  │  ├─ app_ssg_page_tsx_070j1q3._.js
│  │  │  │  ├─ app_ssr_page_tsx_070j1q3._.js
│  │  │  │  ├─ blog_0ak6rks._.js.map
│  │  │  │  ├─ blog_0rqeker._.js
│  │  │  │  ├─ blog_app_globals_css_0w3-wzy._.single.css
│  │  │  │  ├─ blog_app_globals_css_0w3-wzy._.single.css.map
│  │  │  │  ├─ blog_app_layout_tsx_13s~3x1._.js
│  │  │  │  ├─ blog_app_page_tsx_07boel5._.js
│  │  │  │  ├─ blog_app_ssg_page_tsx_07boel5._.js
│  │  │  │  ├─ blog_components_PresenceClientBridge_tsx_115t2td._.js
│  │  │  │  ├─ blog_components_PresenceClientBridge_tsx_115t2td._.js.map
│  │  │  │  ├─ components_PresenceClientBridge_tsx_0g4qtgi._.js
│  │  │  │  ├─ components_PresenceClientBridge_tsx_0g4qtgi._.js.map
│  │  │  │  ├─ turbopack-Documentos_bloguito_02hiov_._.js
│  │  │  │  ├─ turbopack-_0p44nws._.js
│  │  │  │  └─ turbopack-blog_0ak6rks._.js
│  │  │  ├─ development
│  │  │  │  ├─ _buildManifest.js
│  │  │  │  ├─ _clientMiddlewareManifest.js
│  │  │  │  └─ _ssgManifest.js
│  │  │  └─ media
│  │  │     ├─ 4fa387ec64143e14-s.0q3udbd2bu5yp.woff2
│  │  │     ├─ 7178b3e590c64307-s.11.cyxs5p-0z~.woff2
│  │  │     ├─ 797e433ab948586e-s.p.0.q-h669a_dqa.woff2
│  │  │     ├─ 8a480f0b521d4e75-s.06d3mdzz5bre_.woff2
│  │  │     ├─ bbc41e54d2fcbd21-s.0gw~uztddq1df.woff2
│  │  │     ├─ caa3a2e1cccd8315-s.p.16t1db8_9y2o~.woff2
│  │  │     └─ favicon.0x3dzn~oxb6tn.ico
│  │  ├─ trace
│  │  └─ types
│  │     ├─ cache-life.d.ts
│  │     ├─ routes.d.ts
│  │     └─ validator.ts
│  ├─ diagnostics
│  │  ├─ build-diagnostics.json
│  │  ├─ framework.json
│  │  └─ route-bundle-stats.json
│  ├─ export-marker.json
│  ├─ fallback-build-manifest.json
│  ├─ images-manifest.json
│  ├─ next-minimal-server.js.nft.json
│  ├─ next-server.js.nft.json
│  ├─ package.json
│  ├─ prerender-manifest.json
│  ├─ required-server-files.js
│  ├─ required-server-files.json
│  ├─ routes-manifest.json
│  ├─ server
│  │  ├─ app
│  │  │  ├─ _global-error
│  │  │  │  ├─ page
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page.js.map
│  │  │  │  ├─ page.js.nft.json
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ _global-error.html
│  │  │  ├─ _global-error.meta
│  │  │  ├─ _global-error.rsc
│  │  │  ├─ _global-error.segments
│  │  │  │  ├─ __PAGE__.segment.rsc
│  │  │  │  ├─ _full.segment.rsc
│  │  │  │  ├─ _head.segment.rsc
│  │  │  │  ├─ _index.segment.rsc
│  │  │  │  └─ _tree.segment.rsc
│  │  │  ├─ _not-found
│  │  │  │  ├─ page
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page.js.map
│  │  │  │  ├─ page.js.nft.json
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ _not-found.html
│  │  │  ├─ _not-found.meta
│  │  │  ├─ _not-found.rsc
│  │  │  ├─ _not-found.segments
│  │  │  │  ├─ _full.segment.rsc
│  │  │  │  ├─ _head.segment.rsc
│  │  │  │  ├─ _index.segment.rsc
│  │  │  │  ├─ _not-found
│  │  │  │  │  └─ __PAGE__.segment.rsc
│  │  │  │  ├─ _not-found.segment.rsc
│  │  │  │  └─ _tree.segment.rsc
│  │  │  ├─ favicon.ico
│  │  │  │  ├─ route
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  └─ build-manifest.json
│  │  │  │  ├─ route.js
│  │  │  │  ├─ route.js.map
│  │  │  │  └─ route.js.nft.json
│  │  │  ├─ favicon.ico.body
│  │  │  ├─ favicon.ico.meta
│  │  │  ├─ index.html
│  │  │  ├─ index.meta
│  │  │  ├─ index.rsc
│  │  │  ├─ index.segments
│  │  │  │  ├─ __PAGE__.segment.rsc
│  │  │  │  ├─ _full.segment.rsc
│  │  │  │  ├─ _head.segment.rsc
│  │  │  │  ├─ _index.segment.rsc
│  │  │  │  └─ _tree.segment.rsc
│  │  │  ├─ isr
│  │  │  │  ├─ page
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page.js.map
│  │  │  │  ├─ page.js.nft.json
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ isr.html
│  │  │  ├─ isr.meta
│  │  │  ├─ isr.rsc
│  │  │  ├─ isr.segments
│  │  │  │  ├─ _full.segment.rsc
│  │  │  │  ├─ _head.segment.rsc
│  │  │  │  ├─ _index.segment.rsc
│  │  │  │  ├─ _tree.segment.rsc
│  │  │  │  ├─ isr
│  │  │  │  │  └─ __PAGE__.segment.rsc
│  │  │  │  └─ isr.segment.rsc
│  │  │  ├─ page
│  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  ├─ build-manifest.json
│  │  │  │  ├─ next-font-manifest.json
│  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  └─ server-reference-manifest.json
│  │  │  ├─ page.js
│  │  │  ├─ page.js.map
│  │  │  ├─ page.js.nft.json
│  │  │  ├─ page_client-reference-manifest.js
│  │  │  ├─ post
│  │  │  │  └─ [id]
│  │  │  │     ├─ page
│  │  │  │     │  ├─ app-paths-manifest.json
│  │  │  │     │  ├─ build-manifest.json
│  │  │  │     │  ├─ next-font-manifest.json
│  │  │  │     │  ├─ react-loadable-manifest.json
│  │  │  │     │  └─ server-reference-manifest.json
│  │  │  │     ├─ page.js
│  │  │  │     ├─ page.js.map
│  │  │  │     ├─ page.js.nft.json
│  │  │  │     └─ page_client-reference-manifest.js
│  │  │  ├─ ssg
│  │  │  │  ├─ page
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page.js.map
│  │  │  │  ├─ page.js.nft.json
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ ssg.html
│  │  │  ├─ ssg.meta
│  │  │  ├─ ssg.rsc
│  │  │  ├─ ssg.segments
│  │  │  │  ├─ _full.segment.rsc
│  │  │  │  ├─ _head.segment.rsc
│  │  │  │  ├─ _index.segment.rsc
│  │  │  │  ├─ _tree.segment.rsc
│  │  │  │  ├─ ssg
│  │  │  │  │  └─ __PAGE__.segment.rsc
│  │  │  │  └─ ssg.segment.rsc
│  │  │  ├─ ssr
│  │  │  │  ├─ page
│  │  │  │  │  ├─ app-paths-manifest.json
│  │  │  │  │  ├─ build-manifest.json
│  │  │  │  │  ├─ next-font-manifest.json
│  │  │  │  │  ├─ react-loadable-manifest.json
│  │  │  │  │  └─ server-reference-manifest.json
│  │  │  │  ├─ page.js
│  │  │  │  ├─ page.js.map
│  │  │  │  ├─ page.js.nft.json
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ ssr.html
│  │  │  ├─ ssr.meta
│  │  │  ├─ ssr.rsc
│  │  │  └─ ssr.segments
│  │  │     ├─ _full.segment.rsc
│  │  │     ├─ _head.segment.rsc
│  │  │     ├─ _index.segment.rsc
│  │  │     ├─ _tree.segment.rsc
│  │  │     ├─ ssr
│  │  │     │  └─ __PAGE__.segment.rsc
│  │  │     └─ ssr.segment.rsc
│  │  ├─ app-paths-manifest.json
│  │  ├─ chunks
│  │  │  ├─ Documentos_bloguito__next-internal_server_app_favicon_ico_route_actions_0e52~qz.js
│  │  │  ├─ Documentos_bloguito__next-internal_server_app_favicon_ico_route_actions_0e52~qz.js.map
│  │  │  ├─ [externals]_next_dist_0arv.vj._.js
│  │  │  ├─ [externals]_next_dist_0arv.vj._.js.map
│  │  │  ├─ [root-of-the-server]__0kngy68._.js
│  │  │  ├─ [root-of-the-server]__0kngy68._.js.map
│  │  │  ├─ [turbopack]_runtime.js
│  │  │  ├─ [turbopack]_runtime.js.map
│  │  │  └─ ssr
│  │  │     ├─ 05v0_0l4jmnm._.js
│  │  │     ├─ 05v0_0l4jmnm._.js.map
│  │  │     ├─ 05v0_12uu0r_._.js
│  │  │     ├─ 05v0_12uu0r_._.js.map
│  │  │     ├─ 05v0_next_dist_0eo6058._.js
│  │  │     ├─ 05v0_next_dist_0eo6058._.js.map
│  │  │     ├─ 05v0_next_dist_0~zjcee._.js
│  │  │     ├─ 05v0_next_dist_0~zjcee._.js.map
│  │  │     ├─ 05v0_next_dist_client_components_0k4_ghf._.js
│  │  │     ├─ 05v0_next_dist_client_components_0k4_ghf._.js.map
│  │  │     ├─ 05v0_next_dist_client_components_builtin_forbidden_0rmqg28.js
│  │  │     ├─ 05v0_next_dist_client_components_builtin_forbidden_0rmqg28.js.map
│  │  │     ├─ 05v0_next_dist_client_components_builtin_global-error_0s0-1j1.js
│  │  │     ├─ 05v0_next_dist_client_components_builtin_global-error_0s0-1j1.js.map
│  │  │     ├─ 05v0_next_dist_client_components_builtin_unauthorized_0m3-uo~.js
│  │  │     ├─ 05v0_next_dist_client_components_builtin_unauthorized_0m3-uo~.js.map
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_06gf8a9.js
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_06gf8a9.js.map
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_0a8fnyn.js
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_0a8fnyn.js.map
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_0g2rap_.js
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_0g2rap_.js.map
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_0izqi2m.js
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_0izqi2m.js.map
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_0oi8fd8.js
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_0oi8fd8.js.map
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_0tjk3sr.js
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_0tjk3sr.js.map
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_13xabup.js
│  │  │     ├─ 05v0_next_dist_esm_build_templates_app-page_13xabup.js.map
│  │  │     ├─ Documentos_bloguito__next-internal_server_app__global-error_page_actions_0n-9lef.js
│  │  │     ├─ Documentos_bloguito__next-internal_server_app__global-error_page_actions_0n-9lef.js.map
│  │  │     ├─ Documentos_bloguito__next-internal_server_app__not-found_page_actions_0v3vler.js
│  │  │     ├─ Documentos_bloguito__next-internal_server_app__not-found_page_actions_0v3vler.js.map
│  │  │     ├─ Documentos_bloguito__next-internal_server_app_isr_page_actions_0gturdm.js
│  │  │     ├─ Documentos_bloguito__next-internal_server_app_isr_page_actions_0gturdm.js.map
│  │  │     ├─ Documentos_bloguito__next-internal_server_app_page_actions_0b89zr6.js
│  │  │     ├─ Documentos_bloguito__next-internal_server_app_page_actions_0b89zr6.js.map
│  │  │     ├─ Documentos_bloguito__next-internal_server_app_post_[id]_page_actions_0m-6nmn.js
│  │  │     ├─ Documentos_bloguito__next-internal_server_app_post_[id]_page_actions_0m-6nmn.js.map
│  │  │     ├─ Documentos_bloguito__next-internal_server_app_ssg_page_actions_0yr4y_9.js
│  │  │     ├─ Documentos_bloguito__next-internal_server_app_ssg_page_actions_0yr4y_9.js.map
│  │  │     ├─ Documentos_bloguito__next-internal_server_app_ssr_page_actions_06e05vn.js
│  │  │     ├─ Documentos_bloguito__next-internal_server_app_ssr_page_actions_06e05vn.js.map
│  │  │     ├─ [root-of-the-server]__08ilrmf._.js
│  │  │     ├─ [root-of-the-server]__08ilrmf._.js.map
│  │  │     ├─ [root-of-the-server]__09jtc-l._.js
│  │  │     ├─ [root-of-the-server]__09jtc-l._.js.map
│  │  │     ├─ [root-of-the-server]__0fdfiex._.js
│  │  │     ├─ [root-of-the-server]__0fdfiex._.js.map
│  │  │     ├─ [root-of-the-server]__0i5ahru._.js
│  │  │     ├─ [root-of-the-server]__0i5ahru._.js.map
│  │  │     ├─ [root-of-the-server]__0k_e4ma._.js
│  │  │     ├─ [root-of-the-server]__0k_e4ma._.js.map
│  │  │     ├─ [root-of-the-server]__0lqc5an._.js
│  │  │     ├─ [root-of-the-server]__0lqc5an._.js.map
│  │  │     ├─ [root-of-the-server]__0prctf8._.js
│  │  │     ├─ [root-of-the-server]__0prctf8._.js.map
│  │  │     ├─ [root-of-the-server]__0t8uww1._.js
│  │  │     ├─ [root-of-the-server]__0t8uww1._.js.map
│  │  │     ├─ [root-of-the-server]__0t~atlt._.js
│  │  │     ├─ [root-of-the-server]__0t~atlt._.js.map
│  │  │     ├─ [root-of-the-server]__0yy1cxz._.js
│  │  │     ├─ [root-of-the-server]__0yy1cxz._.js.map
│  │  │     ├─ [root-of-the-server]__10_tlyg._.js
│  │  │     ├─ [root-of-the-server]__10_tlyg._.js.map
│  │  │     ├─ [root-of-the-server]__113qg_s._.js
│  │  │     ├─ [root-of-the-server]__113qg_s._.js.map
│  │  │     ├─ [turbopack]_runtime.js
│  │  │     └─ [turbopack]_runtime.js.map
│  │  ├─ functions-config-manifest.json
│  │  ├─ interception-route-rewrite-manifest.js
│  │  ├─ middleware-build-manifest.js
│  │  ├─ middleware-manifest.json
│  │  ├─ next-font-manifest.js
│  │  ├─ next-font-manifest.json
│  │  ├─ pages
│  │  │  ├─ 404.html
│  │  │  └─ 500.html
│  │  ├─ pages-manifest.json
│  │  ├─ prefetch-hints.json
│  │  ├─ server-reference-manifest.js
│  │  └─ server-reference-manifest.json
│  ├─ static
│  │  ├─ 3RT65dypr_0fJ2yPNwseG
│  │  │  ├─ _buildManifest.js
│  │  │  ├─ _clientMiddlewareManifest.js
│  │  │  └─ _ssgManifest.js
│  │  ├─ chunks
│  │  │  ├─ 0-.fmnwkzpmut.js
│  │  │  ├─ 0.ujuzj~svg4v.js
│  │  │  ├─ 00n.d0qubxh9l.js
│  │  │  ├─ 03~yq9q893hmn.js
│  │  │  ├─ 09at5h_d95p43.js
│  │  │  ├─ 0amfblitodpd1.css
│  │  │  ├─ 0itpcpcq_183y.js
│  │  │  ├─ 0tgy7gwhfjkx3.js
│  │  │  ├─ 181d4l18hjc13.js
│  │  │  └─ turbopack-0tz.gc.r2z5vy.js
│  │  └─ media
│  │     ├─ 4fa387ec64143e14-s.0q3udbd2bu5yp.woff2
│  │     ├─ 7178b3e590c64307-s.11.cyxs5p-0z~.woff2
│  │     ├─ 797e433ab948586e-s.p.0.q-h669a_dqa.woff2
│  │     ├─ 8a480f0b521d4e75-s.06d3mdzz5bre_.woff2
│  │     ├─ bbc41e54d2fcbd21-s.0gw~uztddq1df.woff2
│  │     ├─ caa3a2e1cccd8315-s.p.16t1db8_9y2o~.woff2
│  │     └─ favicon.0x3dzn~oxb6tn.ico
│  ├─ trace
│  ├─ trace-build
│  ├─ turbopack
│  └─ types
│     ├─ cache-life.d.ts
│     ├─ routes.d.ts
│     └─ validator.ts
├─ AGENTS.md
├─ CLAUDE.md
├─ README.md
├─ app
│  ├─ admin
│  │  └─ page.tsx
│  ├─ api
│  │  ├─ posts
│  │  │  └─ route.ts
│  │  └─ presence
│  │     ├─ disconnect
│  │     │  └─ route.ts
│  │     ├─ route.ts
│  │     └─ stream
│  │        └─ route.ts
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ isr
│  │  └─ page.tsx
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ post
│  │  └─ [id]
│  │     └─ page.tsx
│  ├─ ssg
│  │  └─ page.tsx
│  └─ ssr
│     └─ page.tsx
├─ components
│  ├─ PostList.tsx
│  └─ PresenceClientBridge.tsx
├─ eslint.config.mjs
├─ lib
│  ├─ db.ts
│  ├─ getPosts.ts
│  └─ presenceStore.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ assets
│  │  ├─ img1.jpeg
│  │  ├─ img2.jpeg
│  │  └─ img3.jpeg
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ schema.sql
└─ tsconfig.json

```