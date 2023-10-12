export function photographerTemplate(data) {
    if(data){
        const { name, portrait, city, country, tagline, price } = data;
        const picture = `assets/photographers/${portrait}`;
    
        function getUserCardDOM() {
            const article = document.createElement( 'article' );
    
            const img = document.createElement( 'img' );
            img.setAttribute("id", "photographer_picture")
            img.setAttribute("src", picture)
            img.setAttribute("alt", name)
            img.setAttribute("class", "photographer_picture");
    
            const h2 = document.createElement( 'h2' );
            h2.textContent = name;
            h2.setAttribute("class", "photographer_name");
    
            const link_photographer = document.createElement( 'a' );
            link_photographer.setAttribute("href", "photographer.html?id=" + data.id);
            link_photographer.setAttribute("class", "photographer_link");
            link_photographer.appendChild(img)
            link_photographer.appendChild(h2)
    
            const cityText = document.createElement( 'p' );
            cityText.textContent = city + ", " + country;
            cityText.setAttribute("class", "photographer_city");
    
            const taglineText = document.createElement( 'p' );
            taglineText.textContent = tagline;
            taglineText.setAttribute("class", "photographer_tagline");
    
            const priceText = document.createElement( 'p' );
            priceText.textContent = price + "€/jour";
            priceText.setAttribute("class", "photographer_price");
    
            article.appendChild(link_photographer);
            article.appendChild(cityText);
            article.appendChild(taglineText);
            article.appendChild(priceText);
    
            return (article);
        }
        return { name, picture, city, country, tagline, price, getUserCardDOM }
    }
}