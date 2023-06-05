# Interview Management System


# How to use 

- Clone the repository with git clone

# Frontend

- Run **npm install**
- Run **npm run dev**

# Backend 

- Copy **.env.example** file to **.env** and edit database credentials there(**cp .env.example .env**)
- Run **composer install**
- Change **LOG_CHANNEL** from  stack to web_daily_error in **.env** file
- Change **DB_DATABASE** name in **.env** file as your database name where you wish to migrate tables 
- Run **php artisan key:generate**
- Run **php artisan config:clear**
- Run **php artisan cache:clear**
- Run **php artisan migrate:fresh --seed**
- Run **php artisan serve**

# Demo Credentials

**super_admin:** john@gmail.com
<br/>**Password:** password

**admin:** david@gmail.com
<br/>**Password:** password

**moderator:** mary@gmail.com
<br/>**Password:** password

- CV path  **https://docs.google.com/document/d/1E_GwNV_AaLKuLpwcXVS7BesdoOk5CIdyj-1knJcHQrY/edit**

