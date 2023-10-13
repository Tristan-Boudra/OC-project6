export class PictureFactory {
  createPicture(data) {
    if (data) {
      const { id, photographerId, title, image, video, likes, date, price } =
        data;
      const picture = `assets/images/${image}`;
      const playerVideo = `assets/images/${video}`;
      const heart = `assets/images/heart.svg`;

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
    li.appendChild(this.createInformationPicture(title, likes, heart));

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
    li.appendChild(this.createInformationPicture(title, likes, heart));

    return li;
  }

  createInformationPicture(title, likes, heart) {
    const pictureInfo = document.createElement("div");
    pictureInfo.setAttribute("class", "picture_info");

    const name = document.createElement("h3");
    name.textContent = title;
    name.setAttribute("class", "picture_title");
    pictureInfo.appendChild(name);

    const containerLikes = document.createElement("div");
    containerLikes.setAttribute("class", "picture_likes_container");
    const imgHeart = document.createElement("img");
    imgHeart.setAttribute("src", heart);
    const like = document.createElement("p");
    like.textContent = likes;
    like.setAttribute("class", "picture_likes");
    containerLikes.appendChild(like);
    containerLikes.appendChild(imgHeart);
    pictureInfo.appendChild(containerLikes);

    return pictureInfo;
  }
}
