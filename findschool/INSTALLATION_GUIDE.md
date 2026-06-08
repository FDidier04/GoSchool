# ðŸš€ GoSchool - Guide d'Installation Complet

## âš ï¸ ProblÃ¨me DÃ©tectÃ©

âŒ Docker n'est pas installÃ©
âŒ Node.js n'est pas installÃ©

C'est pour cela que le projet ne dÃ©marre pas!

---

## âœ… Solution: Installer les PrÃ©requis

### Option 1: Installation Rapide avec Installer (RecommandÃ©)

#### Ã‰tape 1ï¸âƒ£ : Installer Node.js

1. **TÃ©lÃ©chargez Node.js LTS**
   - Allez sur: https://nodejs.org/
   - TÃ©lÃ©chargez la version **LTS (20.x ou 18.x)**
   - C'est un fichier .msi

2. **Installez-le**
   - Double-cliquez le fichier .msi
   - Suivez les instructions
   - Acceptez les conditions
   - Choisissez "Install for all users" (recommandÃ©)
   - Attendez la fin de l'installation

3. **RedÃ©marrez votre terminal** (fermer et ouvrir un nouveau)

4. **VÃ©rifiez l'installation**
   ```bash
   node --version    # Doit afficher: v20.x.x
   npm --version     # Doit afficher: 10.x.x
   ```

#### Ã‰tape 2ï¸âƒ£ : Installer Docker Desktop (Optionnel mais RecommandÃ©)

1. **TÃ©lÃ©chargez Docker Desktop pour Windows**
   - Allez sur: https://www.docker.com/products/docker-desktop
   - Cliquez "Download for Windows"
   - Attendez le tÃ©lÃ©chargement (~1GB)

2. **Installez-le**
   - Double-cliquez le fichier .exe
   - Acceptez les conditions
   - Acceptez les paramÃ¨tres par dÃ©faut
   - Attendez la fin de l'installation
   - **RedÃ©marrage requis** - Cliquez "Close and restart"

3. **AprÃ¨s redÃ©marrage, lancez Docker Desktop**
   - Cherchez "Docker Desktop" dans le menu DÃ©marrer
   - Lancez-le
   - Attendez que l'icÃ´ne Docker soit prÃªte dans la barre d'Ã©tat

4. **VÃ©rifiez l'installation**
   ```bash
   docker --version           # Doit afficher: Docker version x.x.x
   docker-compose --version   # Doit afficher: Docker Compose version x.x.x
   ```

---

## ðŸš€ AprÃ¨s Installation: Lancer GoSchool

### âœ… Avec Docker (Facile - Si Docker est InstallÃ©)

```bash
# 1. Allez au dossier du projet
cd "c:\Users\DidierFIRSTIKANGALAT\OneDrive - Fluxym\Documents\GoSchool\GoSchool"

# 2. Lancez tous les services
docker-compose up -d

# 3. Attendez 30 secondes (le temps que tout dÃ©marre)

# 4. Ouvrez dans le navigateur
http://localhost:3000

# 5. ðŸŽ‰ GoSchool est LIVE!
```

**Pour arrÃªter:**
```bash
docker-compose down
```

---

### âœ… Sans Docker (Manuelle - Si Seulement Node.js)

#### Frontend (Next.js)

```bash
# 1. Allez au dossier frontend
cd "c:\Users\DidierFIRSTIKANGALAT\OneDrive - Fluxym\Documents\GoSchool\GoSchool\frontend"

# 2. Installez les dÃ©pendances
npm install

# 3. Copiez le fichier .env (il devrait exister)
# Si .env.local n'existe pas:
# - CrÃ©ez le fichier .env.local
# - Ajoutez: NEXT_PUBLIC_API_URL=http://localhost:5000/api
# - Ajoutez: NEXT_PUBLIC_MAPBOX_TOKEN=votre_token

# 4. Lancez le frontend
npm run dev

# 5. Frontend accessible Ã : http://localhost:3000
```

**Laissez ce terminal ouvert!** Ouvrez un **NOUVEAU terminal** pour le backend.

#### Backend (Express.js)

```bash
# 1. Allez au dossier backend (NOUVEAU TERMINAL)
cd "c:\Users\DidierFIRSTIKANGALAT\OneDrive - Fluxym\Documents\GoSchool\GoSchool\backend"

# 2. Installez les dÃ©pendances
npm install

# 3. CrÃ©ez le fichier .env (s'il n'existe pas)
# CrÃ©ez le fichier: backend/.env
# Avec ce contenu:
# PORT=5000
# NODE_ENV=development
# DB_HOST=localhost
# DB_USER=GoSchool_user
# DB_PASSWORD=your_password
# DB_NAME=GoSchool
# JWT_SECRET=your_jwt_secret_here

# 4. Lancez le backend
npm run dev

# 5. Backend accessible Ã : http://localhost:5000/api
```

**âš ï¸ ATTENTION**: Pour le backend sans Docker, vous aurez besoin de PostgreSQL installÃ© localement!

---

## ðŸ˜ Installer PostgreSQL (Si vous lancez sans Docker)

### Windows

1. **TÃ©lÃ©chargez PostgreSQL**
   - Allez sur: https://www.postgresql.org/download/windows/
   - TÃ©lÃ©chargez la version 15 ou plus rÃ©cente

2. **Installez-le**
   - Double-cliquez le fichier .exe
   - Suivez les instructions
   - Port par dÃ©faut: 5432
   - Password pour l'utilisateur "postgres": **N'oubliez pas ce password!**

3. **VÃ©rifiez l'installation**
   ```bash
   # Lancez pgAdmin ou SQL Shell pour vÃ©rifier
   ```

---

## ðŸŽ¯ VÃ©rification que Tout Fonctionne

### AprÃ¨s avoir lancÃ© les services:

```bash
# 1. Testez le frontend
curl http://localhost:3000
# Devrait retourner du HTML

# 2. Testez le backend
curl http://localhost:5000/health
# Devrait afficher: {"status":"ok","timestamp":"..."}

# 3. Listez les Ã©coles
curl http://localhost:5000/api/schools
# Devrait retourner les 3 Ã©coles de test
```

---

## âŒ ProblÃ¨mes Courants et Solutions

### âŒ "npm command not found"
**Solution:** Node.js n'est pas installÃ©
- Allez sur https://nodejs.org/
- Installez la version LTS
- **RedÃ©marrez le terminal**

### âŒ "docker-compose not found"
**Solution:** Docker n'est pas installÃ©
- Allez sur https://www.docker.com/products/docker-desktop
- Installez Docker Desktop
- **RedÃ©marrez l'ordinateur**

### âŒ "Port 3000 already in use"
**Solution:** Un autre processus utilise ce port
```bash
# Tuez le processus
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Ou changez le port dans .env
```

### âŒ "Cannot connect to PostgreSQL"
**Solution:** PostgreSQL n'est pas en cours d'exÃ©cution
- Installez PostgreSQL (voir section ci-dessus)
- Lancez pgAdmin ou PostgreSQL
- VÃ©rifiez les crÃ©dentials dans .env

### âŒ "Mapbox token not found"
**Solution:** Vous devez obtenir un token Mapbox
1. Allez sur https://www.mapbox.com/
2. CrÃ©ez un compte gratuit
3. Allez sur "Tokens" dans le dashboard
4. CrÃ©ez un nouveau token
5. Copiez-le dans `frontend/.env.local`:
   ```
   NEXT_PUBLIC_MAPBOX_TOKEN=pk_eyJ...
   ```

---

## ðŸ“Š Checklist d'Installation

### Avant de Commencer
- [ ] Vous avez un accÃ¨s internet
- [ ] Vous pouvez tÃ©lÃ©charger des fichiers
- [ ] Vous pouvez installer des applications

### Installation des PrÃ©requis
- [ ] Node.js 18+ ou 20+ installÃ©
- [ ] npm installÃ© (vient avec Node.js)
- [ ] Docker Desktop installÃ© (optionnel mais recommandÃ©)
- [ ] PostgreSQL installÃ© (obligatoire si pas Docker)
- [ ] Terminal redÃ©marrÃ© aprÃ¨s installations

### Configuration du Projet
- [ ] `.env.local` crÃ©Ã© dans frontend/
- [ ] `.env` crÃ©Ã© dans backend/
- [ ] Mapbox token obtenu et configurÃ©
- [ ] Variables d'environnement vÃ©rifiÃ©es

### Lancement
- [ ] `npm install` exÃ©cutÃ© dans frontend/
- [ ] `npm install` exÃ©cutÃ© dans backend/
- [ ] `npm run dev` lancÃ© dans frontend
- [ ] `npm run dev` lancÃ© dans backend
- [ ] http://localhost:3000 s'ouvre sans erreur

---

## ðŸŽ¯ RÃ©sumÃ© Rapide

**Si vous voulez juste Ã§a en 5 minutes:**

1. **Installez Node.js**: https://nodejs.org/ (version LTS)
2. **RedÃ©marrez le terminal**
3. **Allez dans le dossier frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. **Ouvrez**: http://localhost:3000 dans le navigateur

**âš ï¸ Note:** Sans Docker et PostgreSQL, le backend ne dÃ©marrera pas et vous ne pourrez pas chercher d'Ã©coles. Mais au moins le frontend s'affichera !

---

## ðŸš€ Prochaines Ã‰tapes

AprÃ¨s installation rÃ©ussie:

1. âœ… Ouvrez http://localhost:3000
2. âœ… Explorez les pages
3. âœ… Essayez la recherche d'Ã©coles
4. âœ… CrÃ©ez un compte
5. âœ… Faites une rÃ©servation
6. âœ… Consultez la documentation dans `GETTING_STARTED.md`

---

**Besoin d'aide?** Relancez l'installation en suivant les Ã©tapes exactement! ðŸš€
