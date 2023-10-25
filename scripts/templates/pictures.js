export class PictureFactory {
	alreadyLiked = [];

	// Récupère les infos des medias
	createPicture(data) {
		if (data) {
			const { id, title, image, video, likes } = data;
			const picture = `assets/images/${image}`;
			const playerVideo = `assets/images/${video}`;
			const heart = "assets/images/heart.svg";

			if (video) {
				return this.createVideoPicture(
					picture,
					playerVideo,
					title,
					likes,
					id,
					heart
				);
			} else {
				return this.createImagePicture(picture, title, likes, id, heart);
			}
		}
	}

	// Création des images avec les attributs
	createImagePicture(picture, title, likes, id, heart) {
		const li = document.createElement("li");
		const img = document.createElement("img");

		img.setAttribute("id", id);
		img.setAttribute("src", picture);
		img.setAttribute("alt", title);
		img.setAttribute("class", "picture");
		img.setAttribute("tabindex", "0");

		li.appendChild(img);
		li.appendChild(this.createInformationPicture(title, likes, heart, id));

		return li;
	}

	// Création des videos avec les attributs
	createVideoPicture(picture, playerVideo, title, likes, id, heart) {
		const li = document.createElement("li");

		const video = document.createElement("video");
		video.setAttribute("id", "player");
		video.setAttribute("class", "picture");
		video.setAttribute("controls", "");
		video.setAttribute("playsinline", "");
		video.setAttribute("tabindex", "0");

		const source = document.createElement("source");
		source.setAttribute("src", playerVideo);
		source.setAttribute("type", "video/mp4");
		video.appendChild(source);

		li.appendChild(video);
		li.appendChild(this.createInformationPicture(title, likes, heart, id));

		return li;
	}

	// Mise à jour des likes
	updateLikesDisplay(id, addLike) {
		const numberLikes = document.querySelector(".all-likes");
		const currentLikes = parseInt(numberLikes.textContent);

		if (addLike) {
			if (!this.alreadyLiked.includes(id)) {
				numberLikes.textContent = currentLikes + 1;
				this.alreadyLiked.push(id);
			}
		} else {
			if (this.alreadyLiked.includes(id)) {
				numberLikes.textContent = currentLikes - 1;
				const index = this.alreadyLiked.indexOf(id);

				if (index !== -1) this.alreadyLiked.splice(index, 1);
			}
		}
	}

	// Création des informations d'un media
	createInformationPicture(title, likes, heart, id) {
		const pictureInfo = document.createElement("div");
		pictureInfo.setAttribute("class", "picture_info");

		const name = document.createElement("h3");
		name.textContent = title;
		name.setAttribute("class", "picture_title");
		pictureInfo.appendChild(name);

		const containerLikes = document.createElement("div");
		containerLikes.setAttribute("class", "picture_likes_container");
		const iconHeart = document.createElement("i");
		const like = document.createElement("p");
		like.textContent = likes;
		like.setAttribute("class", "picture_likes");
		iconHeart.setAttribute("class", "fa-regular fa-heart");
		iconHeart.setAttribute("tabindex", "0");
		iconHeart.addEventListener("click", () => {
			if (iconHeart.classList.contains("far")) {
				iconHeart.classList.remove("far");
				iconHeart.classList.add("fas");
				iconHeart.style.color = "#901C1C";
				like.classList.remove("disLiked");
				like.classList.add("liked");

				const newLikes = likes + 1;
				like.textContent = newLikes;
				const addLike = true;
				this.updateLikesDisplay(id, addLike);
			} else {
				iconHeart.classList.remove("fas");
				iconHeart.classList.add("far");
				like.textContent = likes;
				like.classList.remove("liked");
				like.classList.add("disLiked");
				this.updateLikesDisplay(id);
			}
		});
		iconHeart.addEventListener("keypress", (e) => {
			if (e.key === "Enter") iconHeart.click();
		});
		containerLikes.appendChild(like);
		containerLikes.appendChild(iconHeart);
		pictureInfo.appendChild(containerLikes);

		return pictureInfo;
	}
}
