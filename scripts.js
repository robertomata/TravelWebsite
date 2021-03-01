const productListLink = "https://spreadsheets.google.com/feeds/list/16XPJ-a2Y0gumyMBfgGdBBTWdVJ8pdDv3O2-tfWKvk3Y/od6/public/values?alt=json";

const template = document.querySelector("template").content;
const main = document.querySelector("main");

const modalWrapper = document.querySelector(".card");
const closeModal = document.querySelector("#closeModal");

closeModal.addEventListener("click", () => {  

    modalWrapper.classList.add("hide");
    const modal = document.querySelector(".modal");
});


function loadJSON(link) {
    fetch(productListLink).then(e=>e.json()).then(data=>data.feed.entry.forEach(displayProducts));
}

function displayProducts(products){

    const clone = template.cloneNode("true");
    clone.querySelector("h3").textContent = products.gsx$name.$t;
    clone.querySelector(".img").setAttribute("src", `img/${products.gsx$img.$t}`);


        
    clone.querySelector("button").addEventListener("click", () => {
        console.log("Hello")
        modalWrapper.classList.remove("hide");
        const modal = document.querySelector(".modal");    
        console.log("hellooooo")   
        
        modal.querySelector("h3").textContent = products.gsx$name.$t;
        modal.querySelector(".longDesc").textContent = products.gsx$description.$t;
    });
   
    if (products.gsx$category.$t === "Hiking") {
        const HikingSection = document.querySelector("#Hiking");
        HikingSection.appendChild(clone);
    } else if (products.gsx$category.$t === "Sea") {
        const SeaSection = document.querySelector("#Sea");
        SeaSection.appendChild(clone);
    } else if (products.gsx$category.$t === "Experiences") {
        const Experiences = document.querySelector("#Experiences");
        Experiences.appendChild(clone);
    }

    main.appendChild(clone);
}


loadJSON(productListLink);