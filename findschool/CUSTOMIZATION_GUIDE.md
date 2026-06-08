# ðŸŽ¨ Guide de Personnalisation GoSchool

## Customisation Rapide (Sans Code)

### 1. Changer les Couleurs

Ã‰ditez `frontend/tailwind.config.js`:

```javascript
colors: {
  primary: '#2563eb',      // Changez en votre couleur principale
  secondary: '#1e40af',    // Couleur secondaire
  accent: '#f59e0b',       // Couleur d'accentuation
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
}
```

**Exemples de palettes:**
- Congo Drapeau: Primary: #4CAF50, Secondary: #FFED00
- Ghana Drapeau: Primary: #CE1126, Secondary: #FCB81E
- Cameroon Drapeau: Primary: #007A5E, Secondary: #FFB81C

### 2. Changer le Logo et Images

```bash
# Remplacer le logo
cp votre_logo.png frontend/public/logo.png

# Images par dÃ©faut
cp image.jpg frontend/public/default-school.jpg
cp image.jpg frontend/public/default-user.jpg
```

### 3. Changer les Messages et Textes

Ã‰ditez les fichiers de traduction:

```
frontend/messages/en.json      # Textes anglais
frontend/messages/fr.json      # Textes franÃ§ais
```

Exemple:
```json
{
  "home": {
    "title": "Votre nouveau titre",
    "description": "Votre nouvelle description"
  }
}
```

### 4. Changer les Informations de Contact

Dans `frontend/app/components/NavigationUpdated.tsx`:

```javascript
contact: {
  email: 'contact@GoSchool.cd',
  phone: '+243 1 234 5678',
  website: 'https://GoSchool.cd'
}
```

---

## Personnalisation IntermÃ©diaire (Peu de Code)

### 1. Ajouter une Nouvelle Page

```bash
# CrÃ©er le dossier
mkdir -p frontend/app/new-page

# CrÃ©er le fichier
cat > frontend/app/new-page/page.tsx << 'EOF'
'use client';
import React from 'react';

export default function NewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold">Ma Nouvelle Page</h1>
      </div>
    </div>
  );
}
EOF

# Ajouter le lien dans la navigation
# Ã‰diter: frontend/app/components/NavigationUpdated.tsx
```

### 2. Ajouter des Filtres de Recherche PersonnalisÃ©s

```javascript
// Dans frontend/app/schools/page.tsx
const [customFilters, setCustomFilters] = useState({
  hasLibrary: false,
  hasLab: false,
  hasInternet: false,
  hasParking: false,
  affiliatedUniversities: [],
});

// Ajouter des checkboxes dans le UI
```

### 3. Customiser la Palette de Couleurs du Dashboard

```javascript
// Dans frontend/app/dashboard/page.tsx
const statCardColors = {
  bookings: 'bg-blue-100 text-blue-700',
  reviews: 'bg-green-100 text-green-700',
  saved: 'bg-yellow-100 text-yellow-700',
  messages: 'bg-purple-100 text-purple-700',
};
```

---

## Personnalisation AvancÃ©e (DÃ©veloppeur)

### 1. Ajouter une Nouvelle Route API Backend

```typescript
// backend/src/routes/newroute.ts
import { Router, Request, Response } from 'express';
import { db } from '../db/connection';
import { authenticate } from '../middleware/auth';

export const newRoutes = Router();

newRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const data = await db.manyOrNone('SELECT * FROM your_table');
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default newRoutes;
```

Puis ajouter dans `backend/src/index.ts`:
```typescript
import { newRoutes } from './routes/newroute';
app.use('/api/new', newRoutes);
```

### 2. CrÃ©er une Nouvelle Table dans la Base de DonnÃ©es

```sql
-- backend/src/db/schema.ts
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  message TEXT,
  type VARCHAR(50),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
```

### 3. Ajouter une IntÃ©gration API Externe

```typescript
// backend/src/services/smsService.ts
import axios from 'axios';

export async function sendSMS(phoneNumber: string, message: string) {
  try {
    const response = await axios.post(
      'https://api.africaistalkingapis.com/version1/messaging',
      {
        username: process.env.AFRICA_IS_TALKING_USERNAME,
        APIkey: process.env.AFRICA_IS_TALKING_KEY,
        recipients: [phoneNumber],
        message: message,
      }
    );
    return response.data;
  } catch (error) {
    console.error('SMS sending failed:', error);
    throw error;
  }
}
```

### 4. CrÃ©er un Composant RÃ©utilisable AvancÃ©

```typescript
// frontend/app/components/SchoolFilter.tsx
'use client';

import React, { useState } from 'react';

interface SchoolFilterProps {
  onFilter: (filters: any) => void;
  availableFilters: string[];
}

export const SchoolFilter: React.FC<SchoolFilterProps> = ({
  onFilter,
  availableFilters,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});

  const handleFilterChange = (filterName: string, value: any) => {
    const newFilters = { ...selectedFilters, [filterName]: value };
    setSelectedFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      {availableFilters.map((filter) => (
        <div key={filter} className="mb-4">
          <label className="block font-semibold mb-2">{filter}</label>
          <input
            type="text"
            onChange={(e) => handleFilterChange(filter, e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      ))}
    </div>
  );
};
```

---

## IntÃ©grations Externes PrÃªtes

### 1. Flutterwave (Paiements) - DÃ©jÃ  ConfigurÃ©

```typescript
// Ã€ complÃ©ter dans: backend/src/services/paymentService.ts
import axios from 'axios';

export async function initializePayment(amount: number, email: string) {
  const response = await axios.post(
    'https://api.flutterwave.com/v3/payments',
    {
      tx_ref: `reference-${Date.now()}`,
      amount,
      currency: 'XOF', // Franc CFA
      customer: { email },
      redirect_url: 'http://localhost:3000/payment/callback',
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      },
    }
  );
  return response.data;
}
```

### 2. Google Analytics

```html
<!-- Ajouter dans frontend/app/layout.tsx -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 3. SendGrid (Emails)

```typescript
// backend/src/services/emailService.ts
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function sendEmail(to: string, subject: string, html: string) {
  await sgMail.send({ from: 'no-reply@GoSchool.cd', to, subject, html });
}
```

### 4. Twilio (SMS)

```typescript
// backend/src/services/smsService.ts
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendSMS(to: string, message: string) {
  const result = await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
  });
  return result.sid;
}
```

---

## SEO et Performance

### 1. Ajouter des Meta Tags

```typescript
// frontend/app/schools/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find & Book Schools | GoSchool Africa',
  description: 'Discover and book courses at top schools in Congo, Cameroon & Senegal',
  keywords: 'schools, courses, education, Africa, Congo, booking',
};
```

### 2. Image Optimization

```typescript
import Image from 'next/image';

export default function SchoolCard({ school }) {
  return (
    <div>
      <Image
        src={school.imageUrl}
        alt={school.name}
        width={400}
        height={300}
        quality={80}
        priority={false}
      />
    </div>
  );
}
```

### 3. Code Splitting avec Next.js

```typescript
import dynamic from 'next/dynamic';

const SchoolMap = dynamic(() => import('./SchoolMap'), {
  loading: () => <p>Chargement de la carte...</p>,
  ssr: false,
});
```

---

## DÃ©ploiement et Environnements

### Production Configuration

```bash
# .env.production
NODE_ENV=production
DB_HOST=prod-db.example.com
DB_PASSWORD=strong_password_here
JWT_SECRET=very_long_random_secret_key_for_production
API_URL=https://api.GoSchool.cd
```

### SÃ©curitÃ©

```typescript
// backend/src/middleware/security.ts
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

export function setupSecurity(app: Express) {
  // CORS stricte en production
  app.use(helmet());
  
  // Rate limiting strict
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 50, // RÃ©duire pour la production
    })
  );
}
```

---

## Scripts Utiles

### Build pour Production

```bash
# Frontend
npm run build

# Backend
npm run build

# Docker
docker build -t GoSchool-frontend .
docker build -t GoSchool-backend .
```

### Test en Environnement Production

```bash
# VÃ©rifier la build
npm run build
npm run start

# Tester les endpoints
curl https://api.GoSchool.cd/health

# Voir les logs
docker logs GoSchool-backend
```

---

## ðŸŽ¯ Checklist de Personnalisation

- [ ] Changer les couleurs (tailwind.config.js)
- [ ] Ajouter votre logo
- [ ] Customiser les messages (i18n)
- [ ] Ajouter vos informations de contact
- [ ] Ajouter des Ã©coles rÃ©elles
- [ ] Configurer Mapbox token
- [ ] Configurer Flutterwave
- [ ] Ajouter Google Analytics
- [ ] Tester tous les endpoints
- [ ] VÃ©rifier le responsive design
- [ ] Tester la gÃ©olocalisation
- [ ] VÃ©rifier les traductions (FR/EN)

---

**âœ¨ Votre GoSchool est maintenant personnalisÃ©e pour votre marque!**
