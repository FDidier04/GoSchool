# Setup Guide - GoSchool

## PrÃ©requis

- Node.js 18+ (https://nodejs.org)
- PostgreSQL 15+ (https://www.postgresql.org)
- PostgreSQL PostGIS extension
- Docker (optionnel pour dÃ©veloppement avec containers)

## Installation Pas Ã  Pas

### 1. Cloner le Repository

```bash
git clone <repository-url>
cd GoSchool
```

### 2. Configuration de la Base de DonnÃ©es

#### Avec PostgreSQL local

```bash
# CrÃ©er la base de donnÃ©es
createdb GoSchool

# Installer PostGIS
psql -d GoSchool -c "CREATE EXTENSION IF NOT EXISTS postgis"

# VÃ©rifier l'installation
psql -d GoSchool -c "SELECT PostGIS_Version()"
```

#### Avec Docker Compose

```bash
docker-compose up -d postgres
```

### 3. Setup du Backend

```bash
cd backend

# Installer les dÃ©pendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Ã‰diter .env avec vos paramÃ¨tres
# Important: Assurer que DATABASE_URL pointe vers votre base de donnÃ©es

# Initialiser la base de donnÃ©es
npm run migrate

# DÃ©marrer en dÃ©veloppement
npm run dev
```

VÃ©rifier que le serveur est dÃ©marrÃ©: http://localhost:5000/health

### 4. Setup du Frontend

```bash
cd ../frontend

# Installer les dÃ©pendances
npm install

# Copier le fichier d'environnement
cp .env.local.example .env.local

# Ã‰diter .env.local
# Important: 
# - NEXT_PUBLIC_MAPBOX_TOKEN: Obtenir depuis https://www.mapbox.com
# - NEXT_PUBLIC_API_URL: Doit pointer vers http://localhost:5000

# DÃ©marrer en dÃ©veloppement
npm run dev
```

L'application sera accessible Ã  http://localhost:3000

## Configuration des Variables d'Environnement

### Backend (.env)

```env
# API Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=GoSchool

# JWT
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRY=7d

# Mapbox (optionnel)
MAPBOX_TOKEN=your_mapbox_token

# Flutterwave (pour paiements)
FLUTTERWAVE_SECRET_KEY=your_secret
FLUTTERWAVE_PUBLIC_KEY=your_public_key

# Email (optionnel)
SENDGRID_API_KEY=your_sendgrid_api_key
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_key
```

## Obtenir les ClÃ©s API

### Mapbox
1. Aller sur https://www.mapbox.com
2. CrÃ©er un compte gratuit
3. GÃ©nÃ©rer un token d'accÃ¨s public
4. Copier le token dans .env.local

### Flutterwave (Paiements)
1. S'inscrire sur https://www.flutterwave.com
2. AccÃ©der au dashboard
3. Copier les clÃ©s API (test et production)

### Google Maps (Optionnel)
1. Aller sur https://console.cloud.google.com
2. CrÃ©er un nouveau projet
3. Activer l'API Directions API
4. CrÃ©er une clÃ© API

## DÃ©marrage Complet avec Docker

```bash
# Ã€ la racine du projet
docker-compose up -d

# VÃ©rifier les services
docker-compose ps

# Voir les logs
docker-compose logs -f backend
docker-compose logs -f frontend

# ArrÃªter les services
docker-compose down
```

Services:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

## Commandes Utiles

### Backend

```bash
cd backend

# DÃ©marrer le serveur de dÃ©veloppement
npm run dev

# Compiler TypeScript
npm run build

# ExÃ©cuter en production
npm start

# VÃ©rifier les types
npm run type-check

# Lint
npm run lint
```

### Frontend

```bash
cd frontend

# DÃ©marrer le serveur de dÃ©veloppement
npm run dev

# Compiler pour production
npm run build

# DÃ©marrer le serveur de production
npm start

# VÃ©rifier les types
npm run type-check

# Lint
npm run lint
```

## Troubleshooting

### Erreur de Connexion Ã  la Base de DonnÃ©es

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution**:
1. VÃ©rifier que PostgreSQL est en cours d'exÃ©cution
2. VÃ©rifier les paramÃ¨tres de connexion dans .env
3. S'assurer que l'utilisateur PostgreSQL existe

```bash
# VÃ©rifier l'utilisateur
sudo -u postgres psql
\du

# CrÃ©er un utilisateur s'il n'existe pas
CREATE USER GoSchool_user WITH PASSWORD 'password';
ALTER USER GoSchool_user CREATEDB;
```

### PostGIS non installÃ©

```
ERROR: extension "postgis" does not exist
```

**Solution**:
```bash
# Installer PostGIS
sudo apt-get install postgresql-15-postgis-3

# Ou avec Docker
docker exec GoSchool_db psql -U postgres -c "CREATE EXTENSION postgis"
```

### Port dÃ©jÃ  utilisÃ©

```
Error: Port 3000 is already in use
```

**Solution**:
```bash
# Changer le port dans le dÃ©veloppement
npm run dev -- -p 3001

# Ou tuer le processus
lsof -ti:3000 | xargs kill -9
```

## Tests

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## DÃ©ploiement

Voir [DEPLOYMENT.md](./DEPLOYMENT.md) pour les instructions de dÃ©ploiement sur AWS.

## Support

En cas de problÃ¨me:
1. VÃ©rifier les logs: `docker-compose logs`
2. Lire la documentation API: http://localhost:5000/api/docs
3. CrÃ©er une issue sur GitHub

---

**Happy coding! ðŸš€**
