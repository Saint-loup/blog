---
title: "toucher la donnée, de -3000 à nos jours"
date: 2016-02-14
tags:
  - "histoire"
  - "objets"
  - "données"
draft: true
richPicture: true
hero: split  # options: carousel, graphic, video, split (text & image)
heroSettings:
  height:
    mobile:
    desktop:
  bg:
    color: bg-dark # default bg-black
    image:
    imagePosition: # options = bg-center (default), bg-left, bg-right
  headingTextColor:
  subheadingTextColor:
---

Quelques exemples et remarques sur ce que l'on appelle parfois la [physicalisation](https://hal.archives-ouvertes.fr/hal-02113248v1) de données, dans un sens large.

<!-- excerpt -->



## La dataviz en 3000 avant JC

On n'a pas attendu l'informatique pour représenter des données. Les [premières traces](https://en.wikipedia.org/wiki/History_of_writing#Recorded_history) de l'écriture c'est ça : un jeton pour une vache. Les systèmes graphiques plus aboutis avaient des utilisations similaires, puisqu'on retrouve beaucoup d'inscription parlant de taille de troupeaux, d'aire de parcelles ou de volumes de récoltes. Parfois en utilisant à plein la spatialité de la surface, comme en témoignent ces deux tablettes babyloniennes :  un problème de géométrie et un plan de temple.

{% richpicture %}

![tablette2](/Users/baptiste/blog/src/posts/physical dataviz/tablette2.png "[source](https://fr.wikipedia.org/wiki/YBC_7289)")

![tablette1](/Users/baptiste/blog/src/posts/physical dataviz/tablette1.png)

![Building_plans_Louvre_AO338](/Users/baptiste/blog/src/posts/physical dataviz/Building_plans_Louvre_AO338.jpg "Plan d'un bâtiment de six pièces, un sanctuaire ou une maison privée. Fin du IIIe millénaire. [Source](https://fr.wikipedia.org/wiki/Fichier:Building_plans_Louvre_AO338.jpg)")

{% endrichpicture %}


Il y a plein de manières compréhensibles et mémorables d'encoder des informations dans des objets. Voici un exemple qui ne repose sur aucun système d'écriture, contrairement aux tablettes plus haut : les cartes utilisées par les marins des îles Marshall, dans l'océan Pacifique.

![stick_maps](/Users/baptiste/blog/src/posts/physical dataviz/stick_maps.jpg)

Voici [une longue compilation](http://dataphys.org/list/) de ces "visualisations physiques de données", avec aussi pas mal d'expérimentations récentes.

## 3D

Si on saute aux XIX et XXe siècles, la création de modèles en relief est un cas d'utilisation relativement fréquent.  En 1874, Maxwell illustra avec un modèle en platre les liens entre l'évolution de trois variable : volume, entropie et énergie.

![maxwell](maxwell.png "[Source](https://peabodyhsi.wordpress.com/2020/07/15/3d-scanning-the-famous-maxwell-gibbs-thermodynamic-model/). Voir [Wikipedia](https://en.wikipedia.org/wiki/Maxwell's_thermodynamic_surface) pour des photos du modèle en platre et d'autres infos")

Datant de 1913, cette carte montre le nombre de passagers transportés par métro de Frankfort. La quantité était représenté par le nombre de lamelles de bois collées et empilées.

![streetcar](/Users/baptiste/blog/src/posts/physical dataviz/streetcar.jpg "[source](http://dataphys.org/list/frankfurt-streetcar-load/)")

Datant des années 50, cette courbe montre l'évolution de la consommation d'électricité en Grande-Bretagne, suivant les heures de la journée, entre 1951 et 1954. Chaque jour est représenté par une feuille de carton et des poignées permettaient d'élargir le dispositif pour ajouter des feuilles.

![Graphique en 3D de l'évolution de la consommation électrique](/Users/baptiste/blog/src/posts/physical dataviz/medium_cd0673_039_111216_INH_090_Electricity_3D_graph.jpg "http://dataphys.org/list/electricity-generated-or-demanded/")

## Interactivité

Un angle intéressant, c'est comment permettre de visualiser et manipuler facilement des données, quand leur volume explose, qu'on commence à pouvoir imprimer à grande échelle mais qu'on n'a pas d'écran d'ordinateur ?

Comment présenter un enchainement de graphiques à un auditoire, quand on n'a même pas de rétroprojecteur ? C'est simple : créer une véritable bibliothèque sous la forme de grands panneaux de bois imprimés et montés sur rail. J'en ai [déjà parlé ici](https://toutcequibouge.net/blog/2016/02/les-ancetres-d-excel-et-de-powerpoint/#powerpoint).

{% richpicture %}

![](/assets/images/1974298\_001.jpg "1919 : première version")

![](/assets/images/2005273\_0001-e145540648863.jpg "1950 : ver­sion plus évo­luée")

{% endrichpicture %}



Ou encore, https://100yrsofbrinton.tumblr.com/post/122103818380/interactive-dashboards-in-1914-yes





{% richpicture %}

![indexcards2](/Users/baptiste/blog/src/posts/physical dataviz/indexcards2.png)

![indexcards](/Users/baptiste/blog/src/posts/physical dataviz/indexcards.png)

{% endrichpicture %}

Vous allez dire que j'exagère en parlant d'interactivité, mais c'est une notion assez relative : avoir des masses de données bien organisées, prêtes à l'emploi et lisibles était un grand progrès et facilitait grandement l'analyse et la discussion.



https://twitter.com/JulesGrandin/status/1164093612172427264



https://hal.archives-ouvertes.fr/hal-02113248v1

Featuring : un lien signalé par @temptoetiam il y a une éternité (grâce soit rendue à ses cc), une photo Wikimedia prise par une certaine Jastrow (poke @Jastrow75) et les photoviz de @JulesGrandin.