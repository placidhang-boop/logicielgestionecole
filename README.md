# Logiciel Gestion École

## 1. C'est quoi ?

Ce projet est une application de gestion scolaire complète pour une école. Il aide à gérer :

- les élèves ;
- les inscriptions ;
- les paiements scolaires ;
- les dépenses ;
- les rapports ;
- les notifications ;
- les utilisateurs ;
- la licence ;
- la sécurité.

## 2. Ce que l'application fait

- connexion sécurisée pour admin et percepteur ;
- création d'années scolaires ;
- gestion des promotions ;
- gestion des élèves et des parents ;
- gestion des catégories et supporteurs ;
- gestion des frais ;
- validation des paiements ;
- reçu avec PDF ;
- dashboard financier ;
- notifications temps réel ;
- abstraction SMS ;
- système de licence ;
- WebAuthn / passkeys ;
- PWA pour mobile.

## 3. Technologies

- Frontend : React + Vite + TypeScript + Tailwind CSS
- Backend : Node.js + Express + TypeScript
- Base de données : PostgreSQL + Prisma ORM
- Auth : JWT + bcrypt + WebAuthn-ready structure
- PWA : manifest + service worker
- Déploiement : Vercel + Render

## 4. Architecture

Le projet est séparé en 2 parties :

- frontend : interface utilisateur
- backend : API REST + logique métier

La structure est :

```text
logicielgestionecole/
├── frontend/
├── backend/
├── .env.example
├── .gitignore
├── README.md
└── package.json
```

## 5. Installer sur son ordinateur

### Étape 1 — Installer Node.js

Allez sur : https://nodejs.org/

1. Téléchargez la version LTS.
2. Installez-la.
3. Ouvrez un terminal.
4. Tapez :

```bash
node -v
```

Si vous voyez un numéro comme `v20.x` ou `v22.x`, c'est bon.

### Étape 2 — Installer Git

1. Ouvrez : https://git-scm.com/
2. Installez Git.
3. Vérifiez :

```bash
git --version
```

### Étape 3 — Cloner le dépôt

Ouvrez votre terminal puis tapez :

```bash
git clone https://github.com/placidhang-boop/logicielgestionecole.git
cd logicielgestionecole
```

### Étape 4 — Installer les dépendances

```bash
npm install
```

Si vous voyez la fin de l'installation sans erreur, c'est bon.

## 6. Créer PostgreSQL

1. Installez PostgreSQL.
2. Créez une base de données nommée :

```text
logicielgestionecole
```

3. Créez un utilisateur `postgres` ou un autre utilisateur.
4. Notez votre URL :

```text
postgresql://postgres:postgres@localhost:5432/logicielgestionecole?schema=public
```

## 7. Créer .env

Copiez le fichier exemple :

```bash
cp .env.example .env
```

Puis modifiez les valeurs dans `.env`.

## 8. Lancer les migrations

```bash
npx prisma migrate dev --schema backend/prisma/schema.prisma
```

Si vous avez un message de succès, c'est bon.

## 9. Créer l'administrateur

Vous pouvez créer un compte admin dans l'API :

```bash
curl -X POST http://localhost:4000/api/auth/bootstrap-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ecole.local","password":"Admin123!","name":"Administrateur"}'
```

## 10. Lancer l'application

### Backend

```bash
npm run dev --workspace backend
```

### Frontend

```bash
npm run dev --workspace frontend
```

## 11. Tester

```bash
npm test
```

## 12. Construire

```bash
npm run build
```

## 13. Déployer backend sur Render

1. Connectez votre dépôt GitHub à Render.
2. Ajoutez un nouveau service Web.
3. Choisissez le dossier `backend` si le service se présente séparément.
4. Configurez la commande :

```bash
npm install
npm run build
npm run start
```

5. Ajoutez les variables d'environnement depuis `.env.example`.
6. Connectez PostgreSQL sur Render.
7. Lancez les migrations.
8. Vérifiez l'URL API.

## 14. Déployer frontend sur Vercel

1. Importez le dépôt sur Vercel.
2. Sélectionnez le dossier `frontend`.
3. Définissez la commande de build :

```bash
npm run build
```
4. Ajoutez `VITE_API_URL` avec l'URL du backend Render.
5. Déployez.

## 15. Configurer CORS

Le frontend et le backend ne doivent pas être ouverts à tout le monde. 
Le backend doit accepter seulement l'origine du frontend.

Dans `.env` :

```text
CORS_ORIGIN=http://localhost:5173
```

En production, mettez l'URL Vercel exacte, pas `*`.

## 16. Configurer SMS

L'application utilise une abstraction SMS. Cela veut dire :

- on n'écrit pas tout pour un seul fournisseur ;
- on choisit un fournisseur qui peut être remplacé plus tard ;
- on enregistre les messages envoyés dans la base.

Mettez vos clés dans `.env`.

## 17. Configurer licence

La licence protège l'utilisation du logiciel. 
Elle fonctionne avec :

- clé de licence ;
- identifiant d'installation ;
- statut ;
- activation ;
- expiration optionnelle.

Les clés du serveur ne doivent pas être mises dans le frontend.

## 18. Installer PWA

### Android

1. Ouvrez le site dans Chrome.
2. Cliquez sur le menu du navigateur.
3. Choisissez "Installer l'application".

### iPhone

1. Ouvrez le site dans Safari.
2. Appuyez sur le bouton Partager.
3. Choisissez "Ajouter à l'écran d'accueil".

## 19. Sauvegarder PostgreSQL

```bash
pg_dump -U postgres -d logicielgestionecole > backup.sql
```

## 20. Restaurer PostgreSQL

```bash
psql -U postgres -d logicielgestionecole < backup.sql
```

## 21. Dépannage

### Problème : le backend ne démarre pas

- Vérifiez que PostgreSQL tourne.
- Vérifiez `.env`.
- Vérifiez `DATABASE_URL`.

### Problème : le frontend ne charge pas

- Vérifiez que le backend est démarré.
- Vérifiez `VITE_API_URL`.

### Problème : mot de passe refusé

- Vérifiez l'email.
- Vérifiez le mot de passe.
- Vérifiez la base de données.

## 22. Sécurité

Le projet limite :

- accès non autorisé ;
- mots de passe hashés ;
- validation côté serveur ;
- CORS strict ;
- JWT sécurisé ;
- logs sans secrets ;
- audit des actions importantes.

## 23. Architecture technique

- Frontend : React + Vite + Tailwind
- Backend : Express + Prisma + PostgreSQL
- API : REST
- Auth : JWT + bcrypt + sessions sécurisées
- PWA : manifest + service worker
- Finance : paiements, dépenses, reçus, rapports

## 24. Notes importantes

Ce dépôt est un projet professionnel qui sert de base solide pour une gestion scolaire moderne. 
La structure est prête pour évoluer vers :

- plusieurs établissements ;
- plusieurs caisses ;
- plusieurs administrateurs ;
- modules plus avancés.

Ce projet ne remplace pas un système métier complet du monde réel, mais il fournit une base saine, sécurisée et extensible.

## 25. Vérification

Avant de dire que le projet est terminé, il faut tester :

- build ;
- auth ;
- paiements ;
- rapports ;
- migration ;
- sécurité ;
- PWA.

Si un élément n'a pas été vérifié, il ne faut pas le présenter comme réussi.

---

Ce README a été écrit pour être simple, même pour un débutant.
