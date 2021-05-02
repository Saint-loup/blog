Tout les fonctionnalités du blog, même les plus basiques (à compléter)


La page d'accueil charge en ~250ms. Environnement : Firefox 89, pas de cache, réseau émulant une "bonne 3G".


## Divers
- HTTPS
- Cache busting du JS et du CSS
- RSS
- Plan de site

## Pages

- Page 404 (wow !)
- Page d'accueil avec une méthode facile pour ajouter de nouveaux projets
- Page d'archive avec une recherche instantanée dans tout le contenu.
- Post


## Texte

- Insertion auto de guillemets bas et d'espaces fines non-sécables.
- Insertion facile de n	otes de bas de pages
- Dans un article, survoler un inter-titre fait apparaitre un lien. Ce lien fournit une URL d'ancre permettant d'ouvrir la page directement à ce titre.



## images

- Gallerie d'images s'ouvrant en popin
- Toutes les images sont charges paresseusement.
- Compression et conversion auto d'images en .webp. Fallback en jpg si le navigateur ne supporte pas le format, géré coté serveur, avec une technique adaptée [de ceci](https://github.com/cdowdy/Nginx-Content-Negotiation/blob/master/nginx.conf)
- Génération auto du balisage pour images responsive et des images correspondantes, au bonnes dimensions.
- Génération auto de la légende d'imge (<figcaption> à partir de l'attribut `title`)
- Génération de ` ...<figcaption>légende de l'image<figcaption>` avec le markdown suivant : `![](url "légende de l'image")`

