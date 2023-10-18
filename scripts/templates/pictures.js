export class PictureFactory {
	alreadyLiked = [];

	createPicture(data) {
		if (data) {
			const { id, title, image, video, likes } =
        data;
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

	createImagePicture(picture, title, likes, id, heart) {
		const li = document.createElement("li");
		const img = document.createElement("img");

		img.setAttribute("id", id);
		img.setAttribute("src", picture);
		img.setAttribute("alt", title);
		img.setAttribute("class", "picture");

		li.appendChild(img);
		li.appendChild(this.createInformationPicture(title, likes, heart, id));

		return li;
	}

	createVideoPicture(picture, playerVideo, title, likes, id, heart) {
		const li = document.createElement("li");

		const video = document.createElement("video");
		video.setAttribute("id", "player");
		video.setAttribute("class", "picture");
		video.setAttribute("controls", "");
		video.setAttribute("playsinline", "");

		const source = document.createElement("source");
		source.setAttribute("src", playerVideo);
		source.setAttribute("type", "video/mp4");
		video.appendChild(source);

		li.appendChild(video);
		li.appendChild(this.createInformationPicture(title, likes, heart, id));

		return li;
	}

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

				if (index !== -1) {
					this.alreadyLiked.splice(index, 1);
				}
			}
		}
	}

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
		containerLikes.appendChild(like);
		containerLikes.appendChild(iconHeart);
		pictureInfo.appendChild(containerLikes);

		return pictureInfo;
	}
}
