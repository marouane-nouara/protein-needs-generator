#  Générateur dynamique de besoins en protéines

Application React permettant de générer dynamiquement un tableau de besoins journaliers en protéines en fonction des paramètres choisis par l'utilisateur.

---

##  Outils nécessaires pour lancer le projet

| Outil     | Version utilisée |
|-----------|-----------------|
| Node.js   | v24.13.1        |
| npm       | v11.8.0         |

Vérifiez vos versions installées :

```bash
node -v
npm -v
```

---

##  Installation

Clonez le dépôt puis installez les dépendances :

```bash
git clone https://github.com/votre-username/protein-needs-generator.git
cd protein-needs-generator
npm install
```

---

##  Lancer le projet en développement

```bash
npm run dev
```

Puis ouvrez votre navigateur à l'adresse :

```
http://localhost:5173
```

---

##  Build pour la production

```bash
npm run build
```

##  Prévisualiser le build de production

```bash
npm run preview
```

---

##  Fonctionnalités

- **Sélection multi-objectifs** : Sédentaire, Endurance, Conservation ou Prise de masse
- **Paramétrage dynamique** : poids minimum, poids maximum, nombre de lignes
- **Tableau généré dynamiquement** avec les plages de protéines en g/jour
- **Validation des champs** : messages d'erreur si les valeurs sont invalides
- **Export CSV** : téléchargement du tableau au format `.csv`
- **Interface responsive** : adaptée aux mobiles et tablettes

---

##  Structure du projet

```
protein-needs-generator/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx              # Point d'entrée React
    ├── App.jsx               # Composant racine
    ├── index.css             # Styles globaux (responsive)
    ├── components/
    │   ├── Form.jsx          # Formulaire de paramétrage
    │   └── ProteinTable.jsx  # Tableau des résultats + export CSV
    └── utils/
        └── proteinUtils.js   # Logique métier (ratios, calculs, génération)
```

---

##  Important

Ne pas inclure le dossier `node_modules` dans le rendu !
