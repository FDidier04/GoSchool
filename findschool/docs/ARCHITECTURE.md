# Architecture GoSchool

## Vue d'ensemble

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                        UTILISATEURS                             â”‚
â”‚  Ã‰lÃ¨ves | Professeurs | Professionnels | Administrateurs        â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                         â”‚
     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
     â”‚                                       â”‚
â”Œâ”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”      â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚   FRONTEND (Next.js)      â”‚      â”‚  MOBILE (React Native)  â”‚
â”‚                           â”‚      â”‚  (Future)               â”‚
â”‚ - UI Responsive           â”‚      â”‚                         â”‚
â”‚ - Mapbox Integration      â”‚      â”‚                         â”‚
â”‚ - i18n FR/EN              â”‚      â”‚                         â”‚
â”‚ - State Management        â”‚      â”‚                         â”‚
â””â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜      â””â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
     â”‚                                      â”‚
     â”‚         REST API + WebSocket         â”‚
     â”‚                                      â”‚
     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                        â”‚
                â”Œâ”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”
                â”‚   BACKEND      â”‚
                â”‚  (Express.js)  â”‚
                â”‚                â”‚
                â”‚ Routes:        â”‚
                â”‚ - /auth        â”‚
                â”‚ - /schools     â”‚
                â”‚ - /bookings    â”‚
                â”‚ - /reviews     â”‚
                â””â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
     â”‚              â”‚              â”‚                â”‚
â”Œâ”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â–¼â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”
â”‚PostgreSQLâ”‚  â”‚  Redis   â”‚  â”‚Mapbox   â”‚    â”‚Flutterwave â”‚
â”‚+PostGIS  â”‚  â”‚  Cache   â”‚  â”‚ (Maps)  â”‚    â”‚(Payments)  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Flux d'Authentification

```
1. Utilisateur
   â”‚
   â”œâ”€ Signup â†’ Email + Password + Role
   â”‚   â”œâ”€ Validation
   â”‚   â”œâ”€ Hash Password (bcrypt)
   â”‚   â”œâ”€ Insert DB
   â”‚   â””â”€ Retourner JWT Token
   â”‚
   â””â”€ Login â†’ Email + Password
       â”œâ”€ VÃ©rifier utilisateur existe
       â”œâ”€ Comparer password
       â”œâ”€ GÃ©nÃ©rer JWT Token
       â””â”€ Retourner Token
```

## Flux de Recherche GÃ©ospatiale

```
Utilisateur (Frontend)
â”‚
â”œâ”€ Cliquer "Localiser moi"
â”‚   â””â”€ HTML5 Geolocation API
â”‚
â”œâ”€ RequÃªte API: GET /api/schools/nearby?lat=X&lng=Y&radius=5
â”‚   â””â”€ Backend
â”‚       â”œâ”€ Query PostGIS ST_DWithin()
â”‚       â”œâ”€ Filtrer Ã©coles dans rayon
â”‚       â”œâ”€ Calculer distances
â”‚       â””â”€ Retourner Ã©coles triÃ©es
â”‚
â”œâ”€ Frontend affiche:
â”‚   â”œâ”€ Carte Mapbox avec markers
â”‚   â”œâ”€ Liste des Ã©coles
â”‚   â””â”€ Distance en km
â”‚
â””â”€ Utilisateur clique sur Ã©cole
   â””â”€ Affiche dÃ©tails + Reviews
```

## Flux de RÃ©servation et Paiement

```
Ã‰tudiant
â”‚
â”œâ”€ SÃ©lectionner cours
â”‚
â”œâ”€ CrÃ©er rÃ©servation: POST /api/bookings
â”‚   â””â”€ Booking crÃ©Ã©e (status: 'pending')
â”‚
â”œâ”€ Effectuer paiement
â”‚   â”œâ”€ Frontend: Appel Flutterwave
â”‚   â”œâ”€ Flutterwave: Traite paiement
â”‚   â”œâ”€ Webhook: Backend reÃ§oit confirmation
â”‚   â””â”€ Mettre Ã  jour: Booking (status: 'confirmed')
â”‚
â”œâ”€ Confirmation email
â”‚
â””â”€ AccÃ¨s au cours
```

## ModÃ¨le de DonnÃ©es - Diagramme Relations

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚    USERS     â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ id (PK)      â”‚
â”‚ email (UQ)   â”‚â—„â”€â”€â”€â”€â”€â”
â”‚ password     â”‚      â”‚
â”‚ full_name    â”‚      â”‚
â”‚ role         â”‚      â”‚
â”‚ created_at   â”‚      â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜      â”‚
                       â”‚
                    1:Mâ”‚
                       â”‚
        â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
        â”‚                            â”‚
   â”Œâ”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”
   â”‚    BOOKINGS       â”‚   â”‚  REVIEWS      â”‚
   â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤   â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
   â”‚ id (PK)           â”‚   â”‚ id (PK)       â”‚
   â”‚ student_id (FK)   â”‚   â”‚ user_id (FK)  â”‚
   â”‚ course_id (FK)    â”‚   â”‚ school_id(FK) â”‚
   â”‚ amount            â”‚   â”‚ rating        â”‚
   â”‚ status            â”‚   â”‚ comment       â”‚
   â”‚ payment_status    â”‚   â”‚ created_at    â”‚
   â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
        â”‚                           â–²
        â”‚                           â”‚
        â”‚ 1:M                    1:Mâ”‚
        â”‚                           â”‚
   â”Œâ”€â”€â”€â”€â–¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”
   â”‚    COURSES        â”‚   â”‚    SCHOOLS    â”‚
   â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤   â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
   â”‚ id (PK)           â”‚   â”‚ id (PK)       â”‚
   â”‚ school_id (FK)    â”‚   â”‚ name          â”‚
   â”‚ title             â”‚   â”‚ location(GEO) â”‚
   â”‚ description       â”‚   â”‚ rating        â”‚
   â”‚ price             â”‚   â”‚ success_rate  â”‚
   â”‚ series            â”‚   â”‚ type          â”‚
   â”‚ start_date        â”‚   â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
   â”‚ max_students      â”‚
   â”‚ enrolled_students â”‚
   â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
        â–²
        â”‚
    1:M â”‚
        â”‚
   â”Œâ”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
   â”‚  SCHOOL_SERIES    â”‚
   â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
   â”‚ id (PK)           â”‚
   â”‚ school_id (FK)    â”‚
   â”‚ series            â”‚
   â”‚ UNIQUE(school,    â”‚
   â”‚        series)    â”‚
   â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## Stack Technologique DÃ©taillÃ©

### Frontend Layer
```
Next.js 14
â”œâ”€ Pages (App Router)
â”œâ”€ API Routes
â”œâ”€ Image Optimization
â”œâ”€ Server Components
â””â”€ Static Generation

React 18
â”œâ”€ Hooks
â”œâ”€ Context API
â””â”€ Functional Components

Tailwind CSS
â”œâ”€ Utility-first
â”œâ”€ Mobile-first
â””â”€ Responsive Design

Mapbox GL JS
â”œâ”€ Markers
â”œâ”€ Layers
â”œâ”€ Controls
â””â”€ Geolocation

State Management (Zustand)
â”œâ”€ User State
â”œâ”€ Location State
â””â”€ UI State

Internationalization
â”œâ”€ French (FR)
â””â”€ English (EN)
```

### Backend Layer
```
Express.js
â”œâ”€ Routes (REST)
â”œâ”€ Middleware
â”œâ”€ Error Handling
â””â”€ Request Logging

Authentication
â”œâ”€ JWT Tokens
â”œâ”€ Password Hashing (bcrypt)
â”œâ”€ Role-based Access
â””â”€ Session Management

Database Abstraction
â”œâ”€ pg-promise
â”œâ”€ Query Building
â”œâ”€ Connection Pooling
â””â”€ Migrations

PostGIS (Geospatial)
â”œâ”€ ST_Distance
â”œâ”€ ST_DWithin
â”œâ”€ Location Queries
â””â”€ Proximity Search

Caching
â”œâ”€ Redis
â”œâ”€ Session Cache
â”œâ”€ Query Cache
â””â”€ Rate Limiting
```

### Data Layer
```
PostgreSQL 15
â”œâ”€ ACID Transactions
â”œâ”€ JSON Support
â”œâ”€ Full-text Search
â””â”€ Custom Types

PostGIS Extension
â”œâ”€ Geometry Types
â”œâ”€ Spatial Queries
â”œâ”€ Distance Calculations
â””â”€ Indexing (GIST)

Redis
â”œâ”€ Session Store
â”œâ”€ Query Cache
â”œâ”€ Rate Limiting
â””â”€ Real-time Data
```

## SÃ©curitÃ©

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚    Application Security         â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ âœ“ CORS (Cross-Origin)          â”‚
â”‚ âœ“ CSRF Protection              â”‚
â”‚ âœ“ Rate Limiting                â”‚
â”‚ âœ“ Input Validation (Joi)       â”‚
â”‚ âœ“ SQL Injection Prevention      â”‚
â”‚ âœ“ Password Hashing (bcrypt)    â”‚
â”‚ âœ“ JWT Expiration               â”‚
â”‚ âœ“ HTTPS/TLS (Production)       â”‚
â”‚ âœ“ Helmet.js Headers            â”‚
â”‚ âœ“ Error Handling (No Leaks)    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## ScalabilitÃ©

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚      Horizontal Scaling              â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ â€¢ Load Balancer (AWS ELB)            â”‚
â”‚ â€¢ Multiple Backend Instances         â”‚
â”‚ â€¢ Database Connection Pooling        â”‚
â”‚ â€¢ Redis Cluster                      â”‚
â”‚ â€¢ CDN (CloudFront)                   â”‚
â”‚ â€¢ S3 for Static Assets               â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

**GoSchool - Architecture moderne et scalable** ðŸ—ï¸
