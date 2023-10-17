import { PhotographerFactory } from "../templates/thisPhotographer.js";
import { PictureFactory } from "../templates/pictures.js";

// Récupere l'id de l'url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Instanciation des Factories
const photographerFactory = new PhotographerFactory();
const pictureFactory = new PictureFactory();

async function getPhotographer(id) {
  const response = await fetch("data/photographers.json");
  const data = await response.json();
  const photographer = data.photographers.find(
    (photographer) => photographer.id == id
  );

  return photographer;
}

async function getPicturesByPhotographerId(id) {
  const response = await fetch("data/photographers.json");
  const data = await response.json();

  const photographerPictures = [];

  for (const media of data.media) {
    if (media.photographerId == id) {
      photographerPictures.push(media);
    }
  }
  return photographerPictures;
}

function displayData(photographer) {
  const container = document.querySelector(".photograph-header");

  if (photographer) {
    const photographerModel =
      photographerFactory.createPhotographer(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();

    container.appendChild(userCardDOM);

    return userCardDOM;
  }
}

function displayPictures(pictures) {
  const selectElement = document.getElementById("tier-by");

  // Tri par défaut au chargement de la page
  pictures.sort((a, b) => b.likes - a.likes);
  displayPictureBySort(pictures);

  selectElement.addEventListener("change", function() {
    const selectedOptions = this.value;
    switch (selectedOptions) {
      case "Populaire":
        pictures.sort((a, b) => b.likes - a.likes);
        displayPictureBySort(pictures);
        break;
      case "Date":
        pictures.forEach(picture => {
          picture.date = new Date(picture.date);
        });
        pictures.sort((a, b) => b.date.getTime() - a.date.getTime());
        displayPictureBySort(pictures);
        console.log(pictures);
        break;
      case "Titre":
        pictures.sort((a, b) => a.title.localeCompare(b.title));
        displayPictureBySort(pictures);
        break;
      default:
        console.log("Option non disponible");
    }
  });
}

function displayPictureBySort(pictures) {
  const containerPictures = document.querySelector(".allPictures");
  containerPictures.innerHTML = "";
  const ul = document.createElement("ul");
  ul.setAttribute("class", "list_pictures");

  pictures.forEach((pictures) => {
    const pictureDOM = pictureFactory.createPicture(pictures);
    ul.appendChild(pictureDOM);
  });
  containerPictures.appendChild(ul);
}

function displayTarifJournalier(photographer, pictures) {
  if (photographer && pictures) {
    const popupTarif = document.querySelector(".popup-tarif");
    const price = document.createElement("p");
    price.textContent = photographer.price + "€/jour";

    let allLikes = [];
    for (const picture of pictures) {
      allLikes.push(picture.likes);
    }
    let likes = allLikes.reduce((a, b) => a + b, 0);

    const containerLikes = document.createElement('div');
    containerLikes.setAttribute("class", "container-likes");
    let numberLikes = document.createElement("p");
    numberLikes.setAttribute("class", "all-likes");
    numberLikes.textContent = likes;
    const iconHeart = document.createElement("i");
    iconHeart.setAttribute("class", "fa-regular fa-heart fas");

    containerLikes.appendChild(numberLikes);
    containerLikes.appendChild(iconHeart)

    popupTarif.appendChild(price);
    popupTarif.appendChild(containerLikes);
  }
}

// async function picturesCarousel() {
//   const carousel = document.querySelector(".pictures-modal");
//   const ul = document.createElement("ul");
//   ul.setAttribute("class", "list_pictures_modal");
//   const li = document.createElement("li");
//   li.setAttribute("class", "picture_modal");

//   const allPictures = await getPicturesByPhotographerId(id);
//   allPictures.forEach((picture) => {
//     const pictureDOM = pictureFactory.createPicture(picture);
//     li.appendChild(pictureDOM);
//     ul.appendChild(li);
//     carousel.appendChild(ul);
//   });
// }


async function init() {
  // Récupère les datas du photographe
  const photographer = await getPhotographer(id);
  displayData(photographer);

  // Récupere les photos du photographe
  const pictures = await getPicturesByPhotographerId(id);
  displayPictures(pictures);

  // Affiche le nombre de like et le tarif journalier
  const pricePhotographer = await getPhotographer(id);
  const likes = await getPicturesByPhotographerId(id);
  displayTarifJournalier(pricePhotographer, likes);

  // Affiche le modal des photos
  //   const openPictureModal = document.querySelector(".pictures-modal");
  //   openPictureModal.addEventListener("click", function (event) {
  //     event.preventDefault();
  //     openPicturesModal();
  //   });

  //   // Affiche le carousel de photos
  //   await picturesCarousel();
}

init();
