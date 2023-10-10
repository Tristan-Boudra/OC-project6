    async function getPhotographers() {
        // Récupère les datas des photographes à partir du fichier json
        const response = await fetch("data/photographers.json");
        const data = await response.json();
        const photographers = data.photographers;
        
        // Retourne les donnéess des photographes
        return ({
            photographers: [...photographers]})
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
