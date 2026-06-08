# âœ… Checklist de DÃ©ploiement GoSchool

## Phase 1: PrÃ©paration (1-2 heures)

### Configuration Locale
- [ ] Cloner le repository
- [ ] Installer Docker et Docker Compose
- [ ] Copier `.env.example` â†’ `.env` (backend et frontend)
- [ ] Configurer les variables d'environnement
- [ ] VÃ©rifier que `docker ps` fonctionne

### ClÃ©s API et Services
- [ ] CrÃ©er un compte Mapbox
  - [ ] GÃ©nÃ©rer un token (public)
  - [ ] Ajouter dans `frontend/.env.local`
  - [ ] Tester la map sur http://localhost:3000/schools

- [ ] CrÃ©er un compte Flutterwave
  - [ ] RÃ©cupÃ©rer les clÃ©s de test
  - [ ] Ajouter dans `backend/.env`
  - [ ] Tester une transaction de test

- [ ] (Optionnel) Google Maps API
  - [ ] CrÃ©er un projet Google Cloud
  - [ ] Activer Directions API
  - [ ] Ajouter la clÃ© dans `.env.local`

### Base de DonnÃ©es
- [ ] PostgreSQL installÃ©/running (via Docker)
- [ ] PostGIS extension activÃ©e
- [ ] Database crÃ©Ã©e: `GoSchool`
- [ ] Tables crÃ©Ã©es (schema.ts exÃ©cutÃ©)
- [ ] DonnÃ©es de seed ajoutÃ©es (3 Ã©coles)

### Test Local
- [ ] `npm install` dans backend et frontend
- [ ] `npm run dev` fonctionne pour les deux
- [ ] Frontend accessible Ã  http://localhost:3000
- [ ] Backend API accessible Ã  http://localhost:5000/api
- [ ] Ã‰coles visibles sur la carte

---

## Phase 2: Validation Fonctionnelle (2-3 heures)

### Frontend Tests
- [ ] Page d'accueil charge correctement
- [ ] Recherche d'Ã©coles affiche la carte
- [ ] GÃ©olocalisation demande permission et fonctionne
- [ ] Filtres (distance, prix, rating) fonctionnent
- [ ] DÃ©tail d'une Ã©cole affiche toutes les infos
- [ ] Formulaire de rÃ©servation valide les donnÃ©es
- [ ] Avis et ratings s'affichent correctement
- [ ] Login/Signup fonctionnent
- [ ] Dashboard utilisateur affiche les infos
- [ ] Navigation responsive (mobile/tablet/desktop)

### Backend API Tests
```bash
# Tester chaque endpoint
curl http://localhost:5000/api/schools
curl http://localhost:5000/api/schools/nearby -X POST -d '{"lat":4.33,"lon":-15.31,"radius":10}'
curl http://localhost:5000/api/auth/signup -X POST -d '{...}'
curl http://localhost:5000/api/users/me -H "Authorization: Bearer TOKEN"
```

### Performance Tests
- [ ] Page d'accueil charge en < 2 secondes
- [ ] Recherche d'Ã©coles rÃ©pond en < 1 seconde
- [ ] Aucune erreur 404 ou 500 en navigation normale
- [ ] Pas de memory leaks (vÃ©rifier avec DevTools)

### SÃ©curitÃ© Tests
- [ ] SQL injection impossible (parameterized queries)
- [ ] JWT token expire correctement
- [ ] Password hash avec bcrypt
- [ ] CORS headers corrects
- [ ] Rate limiting fonctionne

---

## Phase 3: PrÃ©paration Serveur (2-4 heures)

### SÃ©lectionner un HÃ©bergeur
- [ ] AWS EC2 / Lightsail
- [ ] DigitalOcean
- [ ] Heroku
- [ ] Google Cloud
- [ ] Azure
- [ ] Ou VPS local

### Configurer le Serveur
**Pour AWS EC2:**
```bash
# Instance minimum: t3.small (2GB RAM)
# OS: Ubuntu 22.04
sudo apt update && apt upgrade -y
sudo apt install docker.io docker-compose
sudo usermod -aG docker $USER
```

**Pour DigitalOcean:**
```bash
# CrÃ©er un Droplet (2GB minimum)
# Choisir Ubuntu 22.04
# Ajouter SSH key
# Se connecter et suivre l'installation
```

### Configuration RÃ©seau
- [ ] Domaine enregistrÃ© (GoSchool.cd recommandÃ©)
- [ ] DNS pointant vers le serveur
- [ ] SSL/TLS configurÃ© (Let's Encrypt)
- [ ] Firewall autorisant ports 80, 443
- [ ] Port 5000 fermÃ© publiquement (internal only)
- [ ] Port PostgreSQL fermÃ© (internal only)

### Architecture Production
```
                           Internet
                              |
                         â”Œâ”€â”€â”€â”€â–¼â”€â”€â”€â”€â”
                         â”‚  Nginx   â”‚ (Reverse Proxy)
                         â”‚ Port 80  â”‚
                         â”‚ Port 443 â”‚
                         â””â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”˜
                              |
                     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”
                     |                 |
                  â”Œâ”€â”€â–¼â”€â”€â”         â”Œâ”€â”€â”€â”€â–¼â”€â”€â”€â”€â”
                  â”‚ App â”‚         â”‚Database â”‚
                  â”‚ Server        â”‚PostgreSQL
                  â”‚ Express       â”‚
                  â”‚ Port 5000     â”‚
                  â””â”€â”€â”€â”€â”€â”€â”˜        â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Base de DonnÃ©es Production
- [ ] PostgreSQL dedicated server ou managed service
- [ ] Backups quotidiens activÃ©s
- [ ] SSL connection pour la DB
- [ ] Monitoring mis en place
- [ ] PostGIS installÃ© et configurÃ©

### Cache et File Queue
- [ ] Redis instance pour sessions
- [ ] Redis pour caching des requÃªtes
- [ ] (Optionnel) Bull queues pour jobs async

---

## Phase 4: DÃ©ploiement (1-2 heures)

### Build et Push Docker
```bash
# Build images
docker build -t yourusername/GoSchool-frontend:latest ./frontend
docker build -t yourusername/GoSchool-backend:latest ./backend

# Push vers Docker Hub
docker push yourusername/GoSchool-frontend:latest
docker push yourusername/GoSchool-backend:latest
```

### Configuration CI/CD
- [ ] GitHub Actions workflow crÃ©Ã©
- [ ] Auto-build Ã  chaque push
- [ ] Auto-deploy Ã  production
- [ ] Email notifications en cas d'erreur

### DÃ©ploiement Serveur
```bash
# Sur le serveur de production
cd /app/GoSchool

# Pull les images
docker pull yourusername/GoSchool-frontend:latest
docker pull yourusername/GoSchool-backend:latest

# Lancer docker-compose (production)
docker-compose -f docker-compose.prod.yml up -d

# VÃ©rifier les logs
docker-compose logs -f
```

### SSL/TLS Setup
```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx

# GÃ©nÃ©rer certificat
sudo certbot certonly --standalone -d GoSchool.cd

# Configurer Nginx pour utiliser SSL
```

### Monitoring et Logs
- [ ] CloudWatch / Datadog setup
- [ ] Uptime monitoring
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (New Relic)
- [ ] Log aggregation (ELK stack)

---

## Phase 5: Post-DÃ©ploiement (Ongoing)

### VÃ©rifications
- [ ] Frontend accessible via domaine
- [ ] Backend API accessible et responsive
- [ ] GÃ©olocalisation fonctionne
- [ ] Paiements Flutterwave traitÃ©s correctement
- [ ] Emails envoyÃ©s correctement (si intÃ©gration)
- [ ] SMS envoyÃ©s correctement (si intÃ©gration)

### Tests Production
```bash
# VÃ©rifier la santÃ©
curl https://GoSchool.cd/api/health

# Tester un appel API
curl https://GoSchool.cd/api/schools | json_pp

# VÃ©rifier les certificats SSL
openssl s_client -connect GoSchool.cd:443
```

### Maintenance RÃ©guliÃ¨re
- [ ] Backups database quotidiens
- [ ] Logs archivÃ©s
- [ ] Metrics surveillÃ©s
- [ ] Alertes configurÃ©es
- [ ] Security patches appliquÃ©s

### Optimisations Post-Launch
- [ ] Cache optimization
- [ ] Database query optimization
- [ ] CDN setup (Cloudflare)
- [ ] Image optimization
- [ ] Compression GZIP activÃ©e

---

## Phase 6: Scaling et Croissance (Months 2+)

### Si Trafic Ã‰levÃ©
- [ ] Load balancer configurÃ© (Nginx/HAProxy)
- [ ] Multiple backend instances
- [ ] Database replication
- [ ] Read replicas pour queries
- [ ] Auto-scaling groups configurÃ©s

### AmÃ©liorations Produit
- [ ] Analytics dashboard complet
- [ ] A/B testing setup
- [ ] Payment system optimisÃ©
- [ ] Messaging temps rÃ©el
- [ ] Admin dashboard avancÃ©

### Expansion GÃ©ographique
- [ ] Support pour plus de pays
- [ ] Multi-devise support
- [ ] Support linguistique additionnel
- [ ] Compliance lÃ©gale par pays

---

## Checklist de SÃ©curitÃ©

### Avant le Lancement
- [ ] JWT_SECRET change et complexe
- [ ] DB_PASSWORD securisÃ©
- [ ] API keys encryptÃ©es
- [ ] CORS restrictif
- [ ] Rate limiting strict
- [ ] HTTPS obligatoire
- [ ] Security headers (HSTS, CSP, etc)
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF tokens

### Post-Lancement
- [ ] Scans de sÃ©curitÃ© rÃ©guliers
- [ ] Pen testing quarterly
- [ ] Dependency scanning (Snyk)
- [ ] WAF configured
- [ ] DDoS protection
- [ ] Regular security audits

---

## KPIs Ã  Monitorer

```
Performance:
â””â”€ Page load time: < 2s (target)
â””â”€ API response time: < 500ms (target)
â””â”€ Database query time: < 100ms (target)

Availability:
â””â”€ Uptime: > 99.5%
â””â”€ Error rate: < 0.1%

Usage:
â””â”€ Daily active users
â””â”€ Monthly recurring revenue (if paid)
â””â”€ Booking success rate
â””â”€ User retention rate

Business:
â””â”€ Conversion rate (signup â†’ booking)
â””â”€ Average booking value
â””â”€ Customer acquisition cost
â””â”€ Customer lifetime value
```

---

## Rollback Plan

Si problÃ¨mes en production:

1. **Immediate:**
   ```bash
   # Rollback Ã  version prÃ©cÃ©dente
   docker-compose down
   git checkout previous-tag
   docker-compose up -d
   ```

2. **Database:**
   ```bash
   # Restore derniers backups
   pg_restore -d GoSchool backup-file.sql
   ```

3. **Communication:**
   - Email tous les utilisateurs
   - Mettre Ã  jour status page
   - Log incident dans monitoring

---

## Support et Documentation

### Documentation pour Users
- [ ] FAQ page
- [ ] Tutorial videos
- [ ] Blog posts
- [ ] Community forum

### Documentation pour Developers
- [ ] API documentation (Swagger)
- [ ] Architecture docs
- [ ] Deployment guide
- [ ] Troubleshooting guide

### Support Channels
- [ ] Email support
- [ ] Chat widget
- [ ] Community Slack
- [ ] GitHub issues

---

## Go/No-Go Decision

**Can Launch if:**
- [ ] Tous les items Phase 1-3 cochÃ©s âœ“
- [ ] Tous les tests Phase 2 passÃ©s âœ“
- [ ] Performance benchmarks atteints âœ“
- [ ] Security checklist complet âœ“
- [ ] Team ready for support âœ“

**Hold Launch if:**
- [ ] Critical bugs restants
- [ ] Performance < targets
- [ ] Security issues
- [ ] Database migration issues
- [ ] Team not ready

---

**ðŸš€ Ready for Launch? Let's go!**

**Timeline Estimation:** 1-2 weeks total (working full-time)
