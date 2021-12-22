# Instagram-Concours-Like-Scrapper
Scrap Instagram pour récupérer le nombre de likes de différents posts

### Chrome
Le fichier ``chromedriver.exe`` doit correspondre à la version de Chrome installé sur la machine qui fait tourner le code.
La version postée ici correspond pour Chrome  ``V89.x``

### Données exportées
Les données sont exportées dans le dossier d'un niveau plus haut sous ``../data.json``. Elles peuvent être traitées et visualisées en utilisant le ``Instagram-Concours-Like-Visualizer``.
```json 
{
  "CXGEyg3j6TG": {
    "instagram_account": ["@jeunesse_de_staubin"],
    "checks": [
      { "timestamp": 1640093588607, "likes": "607" },
      { "timestamp": 1640094787073, "likes": "609" },
      { "timestamp": 1640095048882, "likes": "609" },
      { "timestamp": 1640095940312, "likes": "611" },
    ]
  },
  "CXtGfjyruk-": {
    "instagram_account": ["@jeunessefam", "@gironfam2023"],
    "checks": [
      { "timestamp": 1640095057367, "likes": "488" },
      { "timestamp": 1640095941471, "likes": "488" },
      { "timestamp": 1640096060504, "likes": "488" },
      { "timestamp": 1640098223234, "likes": "490" },
    ]
  },
```


### Dépendences
Les dépendences NodeJS sont ``fs`` et ``selenium-webdriver`` :

Installation : ``npm i fs selenium-webdriver`` ou ``npm install`` pour prendre les dépendences directement depuis le fichier ``package.json``
