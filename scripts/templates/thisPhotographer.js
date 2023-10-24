export class PhotographerFactory {
	// Récupère les infos du photographe pour le header
	createPhotographer(data) {
		if (data) {
			const { name, portrait, city, country, tagline, price } = data;
			const picture = `assets/photographers/${portrait}`;

			return {
				name,
				picture,
				city,
				country,
				tagline,
				price,
				getUserCardDOM: function () {
					const header = document.createElement("div");
					header.setAttribute("class", "this_photographer_container");

					// Div contains infos
					const divInfo = document.createElement("div");
					divInfo.setAttribute("class", "this_photographer_infos");

					const h2 = document.createElement("h2");
					h2.textContent = name;
					h2.setAttribute("class", "this_photographer_name");
					divInfo.appendChild(h2);

					const cityText = document.createElement("p");
					cityText.textContent = city + ", " + country;
					cityText.setAttribute("class", "this_photographer_city");
					divInfo.appendChild(cityText);

					const taglineText = document.createElement("p");
					taglineText.textContent = tagline;
					taglineText.setAttribute("class", "this_photographer_tagline");
					divInfo.appendChild(taglineText);

					// Div contains contact button
					const divContact = document.createElement("div");
					const button = document.createElement("button");
					button.textContent = "Contactez-moi";
					button.setAttribute("class", "contact_button");
					button.addEventListener("click", function () {
						const modal = document.getElementById("contact_modal");
						modal.style.display = "block";
						var modalOverlay = document.getElementById("modal-overlay");
						modalOverlay.style.display = "block";
					});
					divContact.appendChild(button);

					// Div contains picture
					const divPicture = document.createElement("div");

					const img = document.createElement("img");
					img.setAttribute("id", "photographer_picture");
					img.setAttribute("src", picture);
					img.setAttribute("alt", name);
					img.setAttribute("class", "this_photographer_picture");
					divPicture.appendChild(img);

					// Add div into header
					header.appendChild(divInfo);
					header.appendChild(divContact);
					header.appendChild(divPicture);

					return header;
				},
			};
		}
	}
}