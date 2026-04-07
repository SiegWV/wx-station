# DEPLOY GUIDE — débutant complet
## GitHub + Vercel en 10 minutes

---

## ÉTAPE 1 — Créer un compte GitHub (si pas encore fait)

1. Va sur **https://github.com**
2. Clique **Sign up**
3. Choisis un nom d'utilisateur, email, mot de passe
4. Confirme ton email

---

## ÉTAPE 2 — Créer un nouveau dépôt GitHub

1. Une fois connecté, clique le **+** en haut à droite → **New repository**
2. Donne un nom : `wx-station` (ou ce que tu veux)
3. Laisse tout le reste par défaut (Public, sans README)
4. Clique **Create repository**

GitHub affiche une page vide avec des instructions. Garde-la ouverte.

---

## ÉTAPE 3 — Installer Git sur ton ordinateur

### Sur Mac
Git est déjà installé. Ouvre **Terminal** (Cmd+Espace → "Terminal").

### Sur Windows
Télécharge **Git for Windows** : https://gitforwindows.org
Installe-le (options par défaut).
Ouvre **Git Bash** (cherche dans le menu Démarrer).

---

## ÉTAPE 4 — Mettre les fichiers sur GitHub

Dans ton Terminal / Git Bash, tape ces commandes **une par une** :

```bash
# Va dans le dossier où tu as dézippé les fichiers
cd chemin/vers/wx-station

# Initialise Git
git init

# Ajoute tous les fichiers
git add .

# Crée un "commit" (sauvegarde)
git commit -m "premier commit"

# Connecte ton dossier à GitHub
# (remplace TONNOM par ton nom d'utilisateur GitHub)
git remote add origin https://github.com/TONNOM/wx-station.git

# Envoie les fichiers sur GitHub
git push -u origin main
```

Si Git te demande ton nom d'utilisateur et mot de passe GitHub :
- Nom d'utilisateur : ton username GitHub
- Mot de passe : utilise un **Personal Access Token** (pas ton vrai mot de passe)
  → GitHub.com → Settings → Developer settings → Personal access tokens → Generate new token
  → Coche "repo" → Generate → Copie le token

Recharge la page GitHub : tu devrais voir tes 3 fichiers (index.html, api/weather.js, vercel.json).

---

## ÉTAPE 5 — Créer un compte Vercel

1. Va sur **https://vercel.com**
2. Clique **Sign Up**
3. Choisis **Continue with GitHub** (plus simple)
4. Autorise Vercel à accéder à GitHub

---

## ÉTAPE 6 — Déployer sur Vercel

1. Sur le tableau de bord Vercel, clique **Add New → Project**
2. Dans la liste, trouve **wx-station** et clique **Import**
3. Vercel détecte automatiquement la config grâce au fichier `vercel.json`
4. Clique **Deploy** (laisse tout par défaut)
5. Attends 30-60 secondes...

Vercel te donne une URL du type :
```
https://wx-station-TONNOM.vercel.app
```

**C'est en ligne !** Ouvre cette URL sur ton iPad.

---

## ÉTAPE 7 — Configurer ta ville

Sur le dashboard :
1. Appuie sur le bouton **CFG**
2. Entre ton nom de ville
3. Entre tes coordonnées GPS (latitude / longitude)
   → Sur Google Maps : clic droit sur ta ville → "Plus d'infos sur cet endroit" → les coordonnées apparaissent
4. Choisis °C ou °F
5. Appuie **SAVE & RELOAD**

---

## MISES À JOUR FUTURES

À chaque modification, dans ton Terminal :

```bash
git add .
git commit -m "mise à jour"
git push
```

Vercel redéploie automatiquement en 30 secondes. Pas besoin de rien faire d'autre.

---

## DÉPANNAGE

**"git n'est pas reconnu"** → Git n'est pas installé. Voir Étape 3.

**"remote origin already exists"** → Tape :
```bash
git remote set-url origin https://github.com/TONNOM/wx-station.git
```

**"error: src refspec main does not match"** → Tape :
```bash
git branch -M main
git push -u origin main
```

**La météo ne s'affiche pas** → Clique CFG, vérifie tes coordonnées. Latitude pour Paris = 48.8566, Longitude = 2.3522.

**Sur iPad, l'écran affiche OFFLINE** → La route `/api/weather` n'est accessible que via Vercel (pas en ouvrant le fichier HTML directement). Assure-toi d'utiliser l'URL Vercel.

---

## STRUCTURE DES FICHIERS

```
wx-station/
├── index.html       ← toute l'interface (ES5, compatible iPad 1 / iOS 5)
├── vercel.json      ← config de déploiement Vercel
└── api/
    └── weather.js   ← fonction serverless (proxy Open-Meteo)
```

---

## COÛTS

- GitHub : **gratuit** pour les dépôts publics
- Vercel : **gratuit** (plan Hobby, largement suffisant)
- Open-Meteo : **gratuit**, pas de clé API nécessaire
