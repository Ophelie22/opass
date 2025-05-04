# Projet OPASS - README
O'Pass est une plateforme innovante qui regroupe tous vos pass touristiques en un seul endroit. 🎟️ 
Elle vous permet de découvrir et d'acheter facilement des billets pour des attractions locales, qu'il s'agisse de musées, parcs ou monuments. 🏛️ Que vous exploriez une nouvelle région ou revisitez une ville, O'Pass vous offre une expérience fluide, intuitive et pratique pour profiter pleinement de vos découvertes. 
## Prérequis
Assurez-vous d'avoir les éléments suivants installés sur votre machine :
- Docker
- Docker Compose
## Languages & Tools
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Branches de developpement

Actuellement le projet étant en cours de construction
il existe plusieurs branches de développement.
La parties back fonctionne sur la branche SitesBackoffice
pour la lancer il suffit de faire un  docker compose up --build db api adminer
 
 puis il faut creer des comptes clients "regions" il faudra utiliser celui qui a l'identifiant 5 car pour le dev nous avons mis un id par defaut 
 il esxiste 2 facons de le creer soit via adminder 'soit en ligne de commande via une commande CURL 
 Attention tte fois cette commande varie si vous etes sur Windows ou Linux (voir le README.md et la doc dans le dossier api)
 Pour lancer le back office il faudra faire npm start

 Pour le frontEnd  il faudra se poser sur la branch frontend context
 et lancer les commande docker indiquer ci dessous
 
## Prérequis
Assurez-vous d'avoir les éléments suivants installés sur votre machine :
- Docker
- Docker Compose

## Procédure de mise en place

### 1. Clônage du projet
Clônez le dépôt du projet sur votre machine locale.
```bash
git clone <url-du-depot>
cd <nom-du-projet>
```
### 2. Configuration des fichiers .env

#### 2.1 Fichier principal .env
- Copiez le fichier .env.example en .env :
```bash
cp .env.example .env
```
- Remplissez les variables nécessaires dans le fichier .env.

#### 2.2 Configuration pour le Frontend
- Créez un fichier .env dans le dossier frontend avec le contenu suivant :
```bash
VITE_API_URL=http://localhost:3000/api
```

#### 2.3 Configuration pour l'API (Backend)
- Dans le dossier api, créez un fichier .env avec le contenu suivant :

```bash
DATABASE_URL="postgresql://postgres:postgres@db:5432/mydatabase"
SECRET_KEY=f80984c2-5132-4a8a-afd0-d3c9abc27d0f
JWT_SECRET=VotreCléSecrèteTrèsSûre

#PORT=3000
#DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
CORS_ALLOWED_ORIGINS=http://localhost:3002,http://backoffice:3002

```

#### 2.4 Configuration pour le backoffice
- Dans le dossier backoffice, créez un fichier .env avec le contenu suivant :
```bash
# Si utilisation en local :
REACT_APP_API_URL=http://localhost:3000/api/authregion

# En production : il faudra utiliser :
# REACT_APP_API_URL=http://api:3000/api/authregion
```

### 3. Nettoyage avant le lancement

<strong>Supprimez les bases de données existantes</strong>

Pour éviter tout conflit entre les branches ou les bases de données précédemment créées, effectuez les commandes suivantes :

```bash
# Nettoyer les containers, volumes et images Docker inutilisés
docker system prune -a

# Lister les volumes Docker existants
docker volume ls

# Supprimer les volumes liés à la base de données
docker volume rm <projet-o-pass-...>
```

### 4. Lancement du projet
- Lancez le projet avec la commande suivante :

```bash
docker compose up --build api db adminer frontend
```

Une fois le projet lancé, vérifiez les ports suivants :

<strong>Frontend : http://localhost:5173

Backend : http://localhost:8080</strong>

### 5. Tests pour le Backoffice

Pour tester le Backoffice avec la branche ```SiteBackOffice``` :

#### 5.1 Passage à la branche Backoffice
```
git checkout SiteBackOffice
```

#### 5.2 Nettoyage de la base de données
Refaites le nettoyage de la base de données comme précédemment expliqué (étape 3).

#### 5.3 Lancement avec le Backoffice
Lancez le projet avec le Backoffice inclus :
```
docker compose up --build api db adminer backoffice
```

Vérifiez les ports :

<strong>Backoffice : http://localhost:3002

Backend : http://localhost:8080</strong>

+ Ajouter "cross-env" dans le package.json pour la version windows.

```
"scripts": {
    "start": "cross-env PORT=3002 react-scripts start",
```
ker
#### 5.4 Test de connexion

Connectez-vous avec l'utilisateur ayant l'ID 5 (administrateur) pour tester les fonctionnalités de connexion.

Récapitulatif des ports

<strong>Frontend (local) : http://localhost:5173

Backend (API) : http://localhost:8080

Backoffice (local) : http://localhost:3002</strong>

### Notes

Assurez-vous de bien suivre les étapes de nettoyage pour éviter les conflits entre les branches et les bases de données.

Pour crée une région admin sur l'id 5 :
```
PS C:\Users\ydzbi\Documents\projet-08-o-pass> curl.exe -X POST "http://localhost:3000/api/authregion/register" `
>> -H "Content-Type: application/json" `
>> -d '{\"name\": \"Region Test\", \"email\": \"region@test.com\", \"password\": \"testpassword\", \"media\": \"http://example.com/image.jpg\", \"description\": \"Une région touristique\"}'
{"message":"Erreur lors de la création de la région"}
PS C:\Users\ydzbi\Documents\projet-08-o-pass> curl.exe -X POST "http://localhost:3000/api/authregion/register" `
>> -H "Content-Type: application/json" `
>> -d '{\"name\": \"Region Test\", \"email\": \"region@test.com\", \"password\": \"testpassword\", \"media\": \"http://example.com/image.jpg\", \"description\": \"Une région touristique\"}'
{"id":5,"email":"region@test.com","password":"$2a$10$mZL58t1FO9oUTLMl4kO9nOJdLpMEvn7vwe3mtJ/rgk8r7I2GNDMZi","media":"Une région touristique","description":"http://example.com/image.jpg","name":"Region Test","createAt":"2025-02-12T17:57:20.115Z","updatedAt":"2025-02-12T17:57:20.115Z"}
```

Faire cette commande :

```
curl.exe -X POST "http://localhost:3000/api/authregion/register" `
-H "Content-Type: application/json" `
-d '{\"name\": \"Region Test\", \"email\": \"region@test.com\", \"password\": \"testpassword\", \"media\": \"http://example.com/image.jpg\", \"description\": \"Une région touristique\"}'
```

Puis cette commande
```
curl.exe -X POST "http://localhost:3000/api/authregion/register" `
-H "Content-Type: application/json" `
-d '{\"name\": \"Région Démo\", \"email\": \"demo.region@test.com\", \"password\": \"demomotdepasse\", \"media\": \"http://example.com/demoimage.jpg\", \"description\": \"Une région de démonstration touristique\"}'
```

Pour se connecter
```
Email: demo.region@test.com
Mot de passe: demomotdepasse
```