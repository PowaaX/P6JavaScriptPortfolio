// Récupération des œuvres depuis l'API
fetch("http://localhost:5678/api/works")
  .then((response) => (response.ok ? response.json() : null)) // Conversion de la réponse en JSON
  .then((works) => {
    if (works) {
      // Vérification si les œuvres sont présentes
      works.forEach((work) => {
        // Traitement de chaque œuvre
        // Création d'une figure pour l'œuvre
        let figureElement = document.createElement("figure");
        figureElement.classList.add(
          "work-item",
          `category-id-${work.categoryId}`
        ); // Ajout de la classe de catégorie

        // Ajout d'une image à la figure
        let imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;
        figureElement.appendChild(imageElement);

        // Ajout d'une légende à la figure
        let captionElement = document.createElement("figcaption");
        captionElement.textContent = work.title;
        figureElement.appendChild(captionElement);

        // Insertion de la figure dans la galerie
        document.querySelector("div.gallery").appendChild(figureElement);
      });
    }
  })
  .catch((error) => console.log(error)); // Gestion des erreurs

// Ajout de filtres de catégories pour filtrer les œuvres dans la galerie
fetch("http://localhost:5678/api/categories")
  .then((response) => (response.ok ? response.json() : null)) // Conversion de la réponse en JSON
  .then((categoriesData) => {
    if (categoriesData) {
      categoriesData.unshift({ id: 0, name: "Tous" }); // Ajout de l'option "Tous" au début

      // Création des boutons de filtrage pour chaque catégorie
      categoriesData.forEach((category) => {
        let filterButton = document.createElement("button");
        filterButton.className = "work-filter filters-design";
        filterButton.textContent = category.name;
        filterButton.dataset.filter = category.id; // Utilisation de dataset pour stocker l'ID de catégorie
        console.log(category.id);

        if (category.id === 0)
          filterButton.classList.add("filter-active", "filter-all");
        document.querySelector("div.filters").appendChild(filterButton);

        // Ajout d'un événement de clic pour le filtrage
        filterButton.addEventListener("click", () =>
          handleFilterClick(category.id, filterButton)
        );
      });
    }
  });

// Fonction pour gérer le clic sur les boutons de filtrage
function handleFilterClick(categoryId, filterButton) {
  // Désactivation des autres filtres
  document
    .querySelectorAll(".work-filter")
    .forEach((button) => button.classList.remove("filter-active"));

  // Activation du filtre sélectionné
  filterButton.classList.add("filter-active");

  // Affichage des œuvres correspondant à la catégorie sélectionnée
  let works = document.querySelectorAll(".work-item");
  works.forEach((workItem) => {
    workItem.style.display =
      workItem.classList.contains(`category-id-${categoryId}`) ||
      categoryId === 0
        ? "block"
        : "none";
  });
}
