#!/bin/bash
# setup.sh - Configura MySQL y la BD automáticamente

echo "🌸 [1/5] Actualizando paquetes..."
sudo apt update -y

echo "🎀 [2/5] Instalando MySQL (puede tardar 2-5 min, ten paciencia)..."
sudo apt install mysql-server -y
sudo systemctl start mysql
sudo systemctl enable mysql

echo "⭐ [3/5] Creando base de datos y usuario..."
sudo mysql < schema.sql
sudo mysql -e "CREATE USER IF NOT EXISTS 'bloguito'@'localhost' IDENTIFIED BY 'password123';"
sudo mysql -e "GRANT ALL PRIVILEGES ON bloguito.* TO 'bloguito'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

echo "🍓 [4/5] Creando .env.local..."
cat > .env.local << EOF
MYSQL_HOST=192.168.1.159
MYSQL_PORT=3306
MYSQL_USER=bloguito
MYSQL_PASSWORD=password123
MYSQL_DATABASE=bloguito
EOF

echo "🌸 [5/5] Instalando dependencias npm..."
npm install

echo ""
echo "✅ ¡Todo listo! Ejecuta: npm run dev"