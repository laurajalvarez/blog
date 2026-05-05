#!/bin/bash
# setup.sh - Configura MySQL y la BD automáticamente

echo "🌸 Instalando MySQL..."
sudo apt update -y
sudo apt install mysql-server -y
sudo systemctl start mysql
sudo systemctl enable mysql

echo "🎀 Creando base de datos..."
sudo mysql < schema.sql

echo "⭐ Creando usuario bloguito..."
sudo mysql -e "CREATE USER IF NOT EXISTS 'bloguito'@'localhost' IDENTIFIED BY 'password123';"
sudo mysql -e "GRANT ALL PRIVILEGES ON bloguito.* TO 'bloguito'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

echo "🍓 Creando .env.local..."
cat > .env.local << EOF
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=bloguito
MYSQL_PASSWORD=password123
MYSQL_DATABASE=bloguito
EOF

echo "✅ Instalando dependencias npm..."
npm install

echo "🌸 ¡Todo listo! Ejecuta: npm run dev"