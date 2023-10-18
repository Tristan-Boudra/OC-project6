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
		const photographerModel = photographerFactory.createPhotographer(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();

		container.appendChild(userCardDOM);

		return userCardDOM;
	}
}

function displayPictures(pictures) {
	const selectElement = document.getElementById("tier-by");
	selectElement.setAttribute("aria-live", "polite");
	selectElement.setAttribute("aria-atomic", "true");
	selectElement.setAttribute("aria-relevant", "text");

	// Tri par défaut au chargement de la page
	pictures.sort((a, b) => b.likes - a.likes);
	displayPictureBySort(pictures);

	selectElement.addEventListener("change", function () {
		const selectedOptions = this.value;
		switch (selectedOptions) {
		case "Populaire":
			pictures.sort((a, b) => b.likes - a.likes);
			displayPictureBySort(pictures);
			break;
		case "Date":
			pictures.forEach((picture) => {
				picture.date = new Date(picture.date);
			});
			pictures.sort((a, b) => b.date.getTime() - a.date.getTime());
			displayPictureBySort(pictures);
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
	ul.setAttribute("role", "list");
	ul.setAttribute("aria-label", "Liste d'images");

	ul.addEventListener("keydown", (event) => {
		if (event.key === "ArrowDown") {
			const nextItem = event.target.nextElementSibling;
			if (nextItem) nextItem.focus();
		} else if (event.key === "ArrowUp") {
			const previousItem = event.target.previousElementSibling;
			if (previousItem) previousItem.focus();
		}
	});

	const firstItem = ul.querySelector("li:first-child .picture");
	if (firstItem) firstItem.setAttribute("tabindex", "0");

	const mediaItems = [];
	pictures.forEach((picture) => {
		if (picture.video) mediaItems.push({ type: "video", src: picture.video, title: picture.title });
		else if (picture.image) mediaItems.push({ type: "photo", src: picture.image, title: picture.title });

		const pictureDOM = pictureFactory.createPicture(picture);
		const img = pictureDOM.querySelector(".picture");
		const isVideo = picture.video !== undefined;
		img.setAttribute("role", isVideo ? "link" : "link");
		img.setAttribute("aria-label", `Voir ${isVideo ? "la vidéo" : "l'image"} "${picture.title}"`);
		img.addEventListener("click", () => {
			mediaLightbox(picture, mediaItems);
		});
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

		const containerLikes = document.createElement("div");
		containerLikes.setAttribute("class", "container-likes");
		let numberLikes = document.createElement("p");
		numberLikes.setAttribute("class", "all-likes");
		numberLikes.textContent = likes;
		const iconHeart = document.createElement("i");
		iconHeart.setAttribute("class", "fa-regular fa-heart fas");

		containerLikes.appendChild(numberLikes);
		containerLikes.appendChild(iconHeart);

		popupTarif.appendChild(price);
		popupTarif.appendChild(containerLikes);
	}
}

function mediaLightbox(picture, mediaItems) {
	const modal = document.createElement("div");
	modal.setAttribute("class", "lightbox");

	const close = document.createElement("img");
	close.setAttribute("src", "assets/icons/close-red.png");
	close.setAttribute("class", "close");
	close.setAttribute("tabindex", "0");
	close.addEventListener("click", () => {
		modal.remove();
		document.removeEventListener("keydown", handleKeyPress);
	});

	const containerMedia = document.createElement("div");
	containerMedia.setAttribute("class", "container-media");

	const containerPicture = document.createElement("div");
	containerPicture.setAttribute("class", "container-picture");

	const labelMedia = document.createElement("p");
	labelMedia.textContent = picture.title;
	labelMedia.setAttribute("class", "label-media");

	const img = document.createElement("img");
	img.setAttribute("id", picture.id);
	img.setAttribute("class", "picture-lightbox");
	img.setAttribute("src", `assets/images/${picture.image}`);
	img.setAttribute("alt", picture.title);

	const videoPlayer = document.createElement("video");
	videoPlayer.setAttribute("controls", "");
	videoPlayer.setAttribute("playsinline", "");
	videoPlayer.setAttribute("class", "picture-lightbox");
	videoPlayer.style.display = "none";

	let currentIndex = mediaItems.findIndex((item) => item.src === picture.image);

	const chevronLeft = document.createElement("img");
	chevronLeft.setAttribute("src", "assets/icons/chevron-left.png");
	chevronLeft.setAttribute("class", "chevron-left");
	chevronLeft.addEventListener("click", () => {
		let prevIndex = currentIndex - 1;
		if (prevIndex < 0) prevIndex = mediaItems.length - 1;

		currentIndex = prevIndex;
		displayMedia(currentIndex);
	});

	const chevronRight = document.createElement("img");
	chevronRight.setAttribute("src", "assets/icons/chevron-right.png");
	chevronRight.setAttribute("class", "chevron-right");
	chevronRight.addEventListener("click", () => {
		let nextIndex = currentIndex + 1;
		if (nextIndex >= mediaItems.length) nextIndex = 0;
		currentIndex = nextIndex;
		displayMedia(currentIndex);
	});

	function displayMedia(index) {
		const currentItem = mediaItems[index];
		labelMedia.textContent = currentItem.title;

		if (currentItem.type === "photo") {
			img.style.display = "block";
			videoPlayer.style.display = "none";
			img.setAttribute("src", `assets/images/${currentItem.src}`);
		} else if (currentItem.type === "video") {
			img.style.display = "none";
			videoPlayer.style.display = "block";
			videoPlayer.src = `assets/images/${currentItem.src}`;
			videoPlayer.play();
		}
	}

	containerPicture.appendChild(labelMedia);
	containerPicture.appendChild(img);
	containerPicture.appendChild(videoPlayer);

	containerMedia.appendChild(chevronLeft);
	containerMedia.appendChild(containerPicture);
	containerMedia.appendChild(chevronRight);

	modal.appendChild(containerMedia);
	modal.appendChild(close);
	document.body.appendChild(modal);

	displayMedia(currentIndex);

	const handleKeyPress = (event) => {
		if (event.key === "Escape") {
			modal.remove();
			document.removeEventListener("keydown", handleKeyPress);
		} else if (event.key === "ArrowLeft") {
			let prevIndex = currentIndex - 1;
			if (prevIndex < 0) prevIndex = mediaItems.length - 1;
			currentIndex = prevIndex;
			displayMedia(currentIndex);
		} else if (event.key === "ArrowRight") {
			let nextIndex = currentIndex + 1;
			if (nextIndex >= mediaItems.length) nextIndex = 0;
			currentIndex = nextIndex;
			displayMedia(currentIndex);
		}
	};

	close.addEventListener("focus", () => {
		close.addEventListener("keydown", (event) => {
			if (event.key === "Enter") {
				modal.remove();
			}
		});
	});

	document.addEventListener("keydown", handleKeyPress);
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
	const likes = await getPicturesByPhotographerId(id);
	displayTarifJournalier(pricePhotographer, likes);
}

init();
