DATABASE_URL="mysql://daulin:12345678@172.16.90.170:3306/skillsculptor?serverVersion=8.0.32&charset=utf8mb4"

sudo echo "127.0.0.1 skillsculptoradmin.com" >> /etc/hosts

CREATE USER 'daulin'@'%.%.%.%' IDENTIFIED BY '12345678';
GRANT ALL PRIVILEGES ON *.* TO 'daulin'@'%.%.%.%' WITH GRANT OPTION;
FLUSH PRIVILEGES;