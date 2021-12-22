# Instagram-Concours-Like-Scrapper
Scrap Instagram pour récupérer le nombre de likes de différents posts

### Chrome
Le fichier ``chromedriver.exe`` doit correspondre à la version de Chrome installé sur la machine qui fait tourner le code.
La version postée ici correspond pour Chrome  ``V89.x``

### Posts Instagram scrappés
La liste des posts Instagram qui sont parcouru pour en récupérer le nombre de like se trouve au début du fichier :
```js
const jeunesses_urls = {
    saint_aubin: "CXGEyg3j6TG",
    forel: "CXtGfjyruk-",
    domdidier: "CXLhStqKtPq",
    delley_portalban: "CXGEl1mjoBl",
    cheyres_chables: "CXn2CVNKJZZ",
    vallon: "CXlRPZ0o5Pp",
    lechelles: "CXisdIlqZ2M",
    mannens_gransivaz: "CXgHp8sqa_H",
    font_chables_chatillon: "CXdi2xjKpfX",
    cheiry: "CW8EhlfKJMj",
    montet_frasses: "CW-pVJGqTv7",
    cugy: "CXGXtNoIYZ7",
    dompierre_russy: "CXI8gCmqSTT",
    boillon_seiry_lully: "CXOGFr_lwRj",
    vesin: "CXQq4gqKGpG",
    fetigny: "CXTPrc2K35S",
    surpierre: "CXUiE2YqPL7",
    murist: "CXYZRIpKBqS",
    gletterens: "CXa-EBxqqJo",
};
```
Les valeurs correspondent à l'identifier des posts, récupérés via l'URL : 
`https://www.instagram.com/p/CXa-EBxqqJo/` 🠖 `CXa-EBxqqJo`

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
