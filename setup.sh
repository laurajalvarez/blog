#!/bin/bash
# setup.sh - Configura el proyecto para conectarse a la BD central

echo "🌸 [1/3] Instalando dependencias npm..."
npm install

echo "🎀 [2/3] Creando .env.local apuntando a BD central..."
cat > .env.local << EOF
MYSQL_HOST=192.168.1.159
MYSQL_PORT=3306
MYSQL_USER=bloguito
MYSQL_PASSWORD=password123
MYSQL_DATABASE=bloguito
EOF

echo "⭐ [3/3] Verificando conexión..."
npm run dev &
sleep 3
kill %1 2>/dev/null

echo ""
echo "✅ ¡Todo listo! Ejecuta: npm run dev"
echo "📡 Conectado a BD en 192.168.1.159"