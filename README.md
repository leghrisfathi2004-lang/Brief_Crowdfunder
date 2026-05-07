# Brief Crowdfunder

API REST pour une plateforme de crowdfunding permettant aux propriétaires de créer des projets, aux investisseurs de financer ces projets, et aux admins de superviser l'ensemble.

## Technologies utilisées

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
## UML Diagramm

<img width="1213" height="442" alt="Image" src="https://github.com/user-attachments/assets/ac8c4eab-9ff9-42e3-8407-d02a01b9e510" />

## Installation

```bash
git clone <repo-url>
cd Brief_Crowdfunder
npm install
```

## Variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
PORT=1001
mongoURL=mongodb://localhost:27017/crowdfunder
jwt_code=votre_secret_jwt
```

| Variable   | Description                        |
|------------|------------------------------------|
| `PORT`     | Port du serveur (défaut : 3000)    |
| `mongoURL` | URI de connexion MongoDB           |
| `jwt_code` | Clé secrète pour signer les tokens JWT |

## Lancement

```bash
npm start
```

## Endpoints principaux

| Méthode | Route                              | Rôle     | Description                     |
|---------|-------------------------------------|----------|---------------------------------|
| POST    | `/api/user/new`                     | Public   | Inscription                     |
| POST    | `/api/user/login`                   | Public   | Connexion                       |
| POST    | `/api/owner/project`                | Owner    | Créer un projet                 |
| PATCH   | `/api/owner/project/:id`            | Owner    | Modifier un projet              |
| POST    | `/api/owner/project/close/:id`      | Owner    | Clôturer un projet              |
| DELETE  | `/api/owner/project/:id`            | Owner    | Supprimer un projet             |
| GET     | `/api/owner/project`                | Owner    | Voir ses projets                |
| GET     | `/api/owner/project/:id/invistors`  | Owner    | Voir les investisseurs          |
| POST    | `/api/investor/investing`           | Investor | Investir dans un projet         |
| PATCH   | `/api/investor/balance`             | Investor | Recharger le solde              |
| GET     | `/api/investor/projects/open`       | Investor | Voir les projets ouverts        |
| GET     | `/api/investor/portfolio`           | Investor | Voir son portefeuille           |
| GET     | `/api/admin/investors`              | Admin    | Voir tous les investisseurs     |
| GET     | `/api/admin/owner`                  | Admin    | Voir tous les propriétaires     |
