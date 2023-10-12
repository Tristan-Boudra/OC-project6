import { thisPhotographerTemplate } from '../templates/thisPhotographer.js';
import { pictureTemplate } from '../templates/pictures.js';

// Récupere l'id de l'url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function getPhotographer(id) {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    const photographer = data.photographers.find((photographer) => photographer.id == id);

    return ( photographer );
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

    const photographerModel = thisPhotographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();

    container.appendChild(userCardDOM);

    return (userCardDOM);
}

function displayPictures(pictures) {
    const containerPictures = document.querySelector(".allPictures");
    const ul = document.createElement("ul");
    ul.setAttribute("class", "list_pictures");

    pictures.forEach((picture) => {
        const pictureModel = pictureTemplate(picture);
        const pictureDOM = pictureModel.getPictureDOM();
        ul.appendChild(pictureDOM);
        containerPictures.appendChild(ul);
        
        return (pictureDOM);
    })
}

function displayTarifJournalier(photographer) {
    const popupTarif = document.querySelector(".popup-tarif");
    const price = document.createElement("p");
    price.textContent = photographer.price + "€/jour";

    popupTarif.appendChild(price);
}

async function init() {
    // Récupère les datas du photographe
    const photographer = await getPhotographer(id);
    displayData(photographer);

    // Récupere les photos du photographe
    const pictures = await getPicturesByPhotographerId(id);
    displayPictures(pictures);

    // Affiche le nombre de like et le tarif journalier
    const pricePhotographer = await getPhotographer(id);
    displayTarifJournalier(pricePhotographer);
}

init();