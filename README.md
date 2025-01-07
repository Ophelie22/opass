# Projet OPASS - README

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

#### 5.4 Test de connexion

Connectez-vous avec l'utilisateur ayant l'ID 5 (administrateur) pour tester les fonctionnalités de connexion.

Récapitulatif des ports

<strong>Frontend (local) : http://localhost:5173

Backend (API) : http://localhost:8080

Backoffice (local) : http://localhost:3002</strong>

### Notes

Assurez-vous de bien suivre les étapes de nettoyage pour éviter les conflits entre les branches et les bases de données.