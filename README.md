# Sajid Mohamed Taha — Portfolio

Portfolio personnel de **Sajid Mohamed Taha**, Élève Ingénieur en Informatique, spécialiste Cybersécurité & Développeur.

## 🚀 Déploiement sur GitHub Pages

### Étape 1 — Initialiser le dépôt Git
```bash
cd sajid-portfolio
git init
git add .
git commit -m "Initial portfolio commit"
```

### Étape 2 — Créer un dépôt GitHub
1. Allez sur [github.com](https://github.com) → **New repository**
2. Nommez-le : `medtahasajid-del.github.io` (pour avoir `https://medtahasajid-del.github.io`)
   - OU n'importe quel nom, ex: `portfolio` → url sera `https://medtahasajid-del.github.io/portfolio`
3. Laissez-le **Public**
4. Ne cochez pas "Initialize with README"

### Étape 3 — Pousser le code
```bash
git remote add origin https://github.com/medtahasajid-del/medtahasajid-del.github.io.git
git branch -M main
git push -u origin main
```

### Étape 4 — Activer GitHub Pages
1. Dans votre dépôt → **Settings** → **Pages**
2. Source : **Deploy from a branch**
3. Branch : `main` / `/ (root)`
4. Cliquez **Save**

Votre site sera disponible en quelques minutes ! ✅

## 📁 Structure du projet
```
sajid-portfolio/
├── index.html      # Page principale
├── style.css       # Styles (dark theme)
├── script.js       # Animations & interactivité
├── profile.jpg     # Photo de profil
└── README.md       # Ce fichier
```

## ✨ Fonctionnalités
- 🌙 Dark theme cybersécurité
- 📱 100% Responsive (mobile-first)
- ⚡ Animations au scroll
- ✍️ Effet machine à écrire (typing)
- 🔗 Liens GitHub / LinkedIn / Email
- 🏷️ Sections : Hero · Compétences · Projets · Parcours
