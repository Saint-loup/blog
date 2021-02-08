---
# This is a full listing of available Frontmatter options, available for any content (.md) file.
title: Tout ce qui bouge
layout: layouts/home.njk
excerpt: # used for page excerpts and META (will be overwritten if SEO used below)
eleventyNavigation: # Required if want to display in Main Nav Bar
  key: main # "main" is required
  title: Accueil # as it will appear in the nav
  order: 1 # order to display in the nav (index = 1)
seo: # SEO values are used for OG and will overwrite 'title' and 'excerpt' above
  title:
  description:
  image: # used for OG:image and Twitter:image. Overrides default set in _data/meta.siteImage

---


<div class="project-list grid gap-8 mx-auto mt-12 md:grid-cols-2 xl:grid-cols-3 lg:max-w-none" >

  {% project "Méta Axure", "", "assets/images/home/axure.png", "Une expérimentation pour créer un outil de maquettage utilisable... dans une maquette Axure" %}
  {% project "Data from clipboard", "", "assets/images/home/data-from-clipboard.png", "test" %}
  {% project "Plugin de typographie pour Sketch", "", "assets/images/home/typo.png", "test" %}
</div>