# ðŸš¨ FIRST STEPS - DÃ©marrage ImmÃ©diat

## âš ï¸ VOTRE SITUATION ACTUELLE

```
âŒ Docker n'est pas installÃ©
âŒ Node.js n'est pas installÃ©
âŒ GoSchool ne peut pas dÃ©marrer
```

**C'est normal! Suivez ce guide pour tout installer.**

---

## ðŸŽ¯ 3 Ã‰TAPES POUR DÃ‰MARRER

### Ã‰TAPE 1ï¸âƒ£ : Installer Node.js (Obligatoire)

**DurÃ©e: 5 minutes**

1. Allez sur: **https://nodejs.org/**
2. Cliquez **"Download LTS"** (version 20.x)
3. Double-cliquez le fichier tÃ©lÃ©chargÃ© (.msi)
4. Suivez l'installation (acceptez tout)
5. **RedÃ©marrez votre terminal** (fermer et rouvrir)

**VÃ©rification:**
```bash
node -v      # Doit afficher v20.x.x
npm -v       # Doit afficher 10.x.x
```

---

### Ã‰TAPE 2ï¸âƒ£ (Optionnel): Installer Docker

**DurÃ©e: 10 minutes + redÃ©marrage**

Si vous voulez utiliser Docker (plus facile):

1. Allez sur: **https://www.docker.com/products/docker-desktop**
2. TÃ©lÃ©chargez pour Windows
3. Installez en doublecliquant
4. **RedÃ©marrez votre ordinateur**
5. Lancez Docker Desktop (cherchez dans DÃ©marrer)

---

### Ã‰TAPE 3ï¸âƒ£ : Lancer GoSchool

**DurÃ©e: 2 minutes**

#### âœ… Avec Docker (RecommandÃ©)

```bash
cd "c:\Users\DidierFIRSTIKANGALAT\OneDrive - Fluxym\Documents\GoSchool\GoSchool"
docker-compose up -d
# Attendez 30 secondes...
# Ouvrez: http://localhost:3000 ðŸŽ‰
```

#### âœ… Sans Docker (Avec Node.js seulement)

**Terminal 1 - Frontend:**
```bash
cd "c:\Users\DidierFIRSTIKANGALAT\OneDrive - Fluxym\Documents\GoSchool\GoSchool\frontend"
npm install
npm run dev
# Frontend Ã  http://localhost:3000
```

**Terminal 2 - Backend** (NÃ©cessite PostgreSQL):
```bash
cd "..\backend"
npm install
npm run dev
# Backend Ã  http://localhost:5000
```

---

## ðŸŽ¯ Cas 1: Vous Avez Peu de Temps

ðŸ‘‰ **Installez juste Node.js**, puis lancez le frontend:

```bash
cd frontend
npm install
npm run dev
# Ouvrez http://localhost:3000
```

Vous verrez le design, mais pas les Ã©coles (besoin du backend).

---

## ðŸŽ¯ Cas 2: Vous Avez 30 Minutes

ðŸ‘‰ **Installez Node.js + Docker**:

1. Node.js: https://nodejs.org/ (5 min)
2. Docker: https://www.docker.com/products/docker-desktop (15 min)
3. RedÃ©marrage (10 min)
4. Lancez: `docker-compose up -d`
5. Ouvrez http://localhost:3000 âœ…

**Vous aurez une app COMPLÃˆTE et FONCTIONNELLE!**

---

## âœ… AprÃ¨s Installation: Que Faire?

1. **Ouvrez** http://localhost:3000
2. **CrÃ©ez un compte** (email/password)
3. **Explorez les Ã©coles** sur la carte
4. **Faites une rÃ©servation**
5. **Consultez le dashboard**

---

## ðŸ“š Besoin d'Aide?

1. **Installation ne fonctionne pas?**
   - Lisez: `INSTALLATION_GUIDE.md` (complet)

2. **Vous avez des erreurs?**
   - Consultez: `TROUBLESHOOTING.md` (quand crÃ©Ã©)

3. **Docker questions?**
   - Google: "Docker Windows installation"

4. **Node.js questions?**
   - Google: "Node.js installation Windows"

---

**ðŸš€ C'est parti! Installez Node.js et vous Ãªtes de retour en business! ðŸŽ‰**
