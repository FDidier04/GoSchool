# GoSchool Platform

Une plateforme de mise en relation entre professeurs, Ã©tudiants et professionnels en Afrique de l'Ouest (RÃ©publique du Congo, Cameroun, SÃ©nÃ©gal).

## ðŸŽ¯ Objectif

CrÃ©er une plateforme numÃ©rique complÃ¨te qui facilite la recherche et la rÃ©servation de cours particuliers, formations acadÃ©miques et professionnelles avec gÃ©olocalisation intÃ©grÃ©e.

## ðŸ“‹ Structure du Projet

```
GoSchool/
â”œâ”€â”€ frontend/          # Application Next.js
â”œâ”€â”€ backend/           # API Express.js
â”œâ”€â”€ docs/             # Documentation
â”œâ”€â”€ docker-compose.yml # Configuration Docker
â””â”€â”€ README.md
```

## ðŸš€ DÃ©marrage Rapide

### PrÃ©requis

- Node.js 18+
- Docker et Docker Compose
- PostgreSQL 15+
- Git

### Installation Locale

#### 1. Clone et installation du frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
# Ã‰diter .env.local et ajouter vos tokens
npm run dev
```

L'application sera accessible Ã  `http://localhost:3000`

#### 2. Clone et installation du backend

```bash
cd backend
npm install
cp .env.example .env
# Ã‰diter .env avec vos variables
npm run dev
```

Le serveur API sera accessible Ã  `http://localhost:5000`

### Avec Docker

```bash
docker-compose up -d
```

Cela lancera:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

## ðŸ—ï¸ Stack Technologique

### Frontend
- **Framework**: Next.js 14 + React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Maps**: Mapbox GL JS
- **i18n**: next-intl (FR/EN)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL + PostGIS
- **Cache**: Redis
- **Auth**: JWT
- **Payment**: Flutterwave

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Deployment**: AWS (RecommandÃ©)

## ðŸ—ºï¸ FonctionnalitÃ©s Principales

### 1. Authentification
- Inscription (Ã©lÃ¨ve/prof/professionnel/admin)
- Connexion sÃ©curisÃ©e (JWT)
- Profils utilisateur

### 2. Recherche et DÃ©couverte
- **GÃ©olocalisation**: Trouver les Ã©coles Ã  proximitÃ©
- **Filtres avancÃ©s**: Distance, prix, sÃ©rie, type
- **Carte interactive**: Visualiser les Ã©tablissements
- **Comparateur**: Comparer plusieurs Ã©coles

### 3. RÃ©servations
- SystÃ¨me de booking de cours
- Gestion du calendrier
- Confirmations automatiques

### 4. Paiements
- Paiements mobiles (M-Pesa, Airtel Money)
- Cartes bancaires
- IntÃ©gration Flutterwave

### 5. Avis et Notation
- SystÃ¨me de notation (1-5)
- CritÃ¨res: rÃ©sultats acadÃ©miques, expÃ©rience
- Transparence et confiance

### 6. Analytics
- Dashboard Power BI
- Statistiques par zone
- Performance des Ã©coles

## ðŸ“Š ModÃ¨le de DonnÃ©es

### Utilisateurs
```typescript
interface User {
  id: UUID
  email: string
  fullName: string
  role: 'student' | 'teacher' | 'professional' | 'school_admin'
  avatar: string
  phoneNumber: string
  createdAt: Date
}
```

### Ã‰coles
```typescript
interface School {
  id: UUID
  name: string
  type: 'primary' | 'secondary' | 'university' | 'training_center'
  series: SchoolSeries[]
  location: { latitude, longitude }
  averageRating: number
  successRate: number
  admissionFee: number
  monthlyFee: number
}
```

### RÃ©servations
```typescript
interface Booking {
  id: UUID
  studentId: UUID
  courseId: UUID
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  paymentStatus: 'pending' | 'completed' | 'failed'
  amount: number
  startDate: Date
}
```

## ðŸ” SÃ©curitÃ©

- **CORS**: ConfigurÃ© pour localhost:3000
- **HTTPS**: SSL/TLS en production
- **Authentication**: JWT avec expiration
- **Rate Limiting**: 100 requÃªtes/15 minutes
- **Validation**: Helmet.js + input validation
- **Database**: RequÃªtes prÃ©parÃ©es (SQL injection prevention)

## ðŸ“± SÃ©ries Scolaires SupportÃ©es

### Enseignement GÃ©nÃ©ral (Congo)
- SÃ©rie A
- SÃ©rie D
- SÃ©rie C

### Enseignement Technique
- SÃ©rie G2
- SÃ©rie G3
- SÃ©rie BG
- SÃ©rie E
- SÃ©rie F1, F2, F3, F4

## ðŸŒ GÃ©olocalisation

### Pays SupportÃ©s
- ðŸ‡¨ðŸ‡© RÃ©publique du Congo
- ðŸ‡¨ðŸ‡² Cameroun
- ðŸ‡¸ðŸ‡³ SÃ©nÃ©gal

### FonctionnalitÃ©s GÃ©ospatiales
- Recherche par proximitÃ© (rayon configurable)
- Calcul de distance en temps rÃ©el
- ItinÃ©raires avec Google Maps
- Heatmap de la demande

## ðŸ’³ Paiements

### MÃ©thodes SupportÃ©es
- ðŸ“± M-Pesa
- ðŸ“± Airtel Money
- ðŸ¦ Cartes bancaires
- ðŸ’° Wave
- ðŸ“ž MTN Money

IntÃ©gration via **Flutterwave** pour tous les paiements.

## ðŸ“§ Multilingue

- ðŸ‡¬ðŸ‡§ English
- ðŸ‡«ðŸ‡· FranÃ§ais

Interface bilingue complÃ¨te avec support de basculement rapide.

## ðŸš¦ Ã‰tapes de DÃ©veloppement

### Phase 1: MVP (3-4 mois)
- âœ… Authentification
- âœ… Profils utilisateur
- âœ… Recherche + gÃ©olocalisation
- âœ… RÃ©servations simples
- âœ… Paiements de base

### Phase 2: Beta (2-3 mois)
- Messagerie en temps rÃ©el
- SystÃ¨me d'avis complet
- Analytics avancÃ©es
- Notifications push

### Phase 3: Production (1-2 mois)
- Optimisations performance
- Tests utilisateurs
- Marketing launch
- Support client

## ðŸ“š Documentation API

### Authentification
```
POST /api/auth/signup
POST /api/auth/login
```

### Ã‰coles
```
GET /api/schools                    # Toutes les Ã©coles
GET /api/schools/:id                # DÃ©tail d'une Ã©cole
GET /api/schools/nearby             # Ã‰coles Ã  proximitÃ©
```

### RÃ©servations
```
POST /api/bookings                  # CrÃ©er une rÃ©servation
GET /api/bookings                   # Mes rÃ©servations
```

### Avis
```
POST /api/reviews                   # Poster un avis
GET /api/reviews                    # Lister les avis
```

## ðŸ”§ Variables d'Environnement

Voir `.env.local.example` (frontend) et `.env.example` (backend)

## ðŸ“ž Support

Pour des questions ou problÃ¨mes:
- Email: support@GoSchool.com
- Issues: GitHub Issues
- Documentation: /docs

## ðŸ“„ Licence

MIT

## ðŸ‘¥ Contributeurs

Ã€ complÃ©ter...

---

**GoSchool - Connecter l'Ã©ducation en Afrique** ðŸš€
