/* const { getJSON } = require("jquery"); */
console.log("se mor");
document.addEventListener("DOMContentLoaded", initPage);

let side;
const url = "http://mostvalue.dk/Buddhabikes/wordpress/wp-json/wp/v2/posts";

function initPage() {
    getJSON();console.log("se mor");
}

async function getJSON() {
    const response = await fetch(url);
    side = await response.json()
    
show();
}

function show(){
    console.log(side)
    console.log(side)
    const skabelon = document.querySelector(".item-temp");
    const liste = document.querySelector("#product-grid");


    side.forEach(cykel => {
        console.log(cykel.acf)
        const klon = skabelon.cloneNode(true).content;
        klon.querySelector("img").src = cykel.acf.image.url; 
        klon.querySelector("h1").textContent = cykel.acf.title;
     /*    klon.querySelector("img").alt = cykel.title; */
        klon.querySelector("span").innerHTML = cykel.acf.price +",-";
        liste.appendChild(klon);
    });

  
}


/* 
function showBike(data) {
    console.log(data);
    const skabelonSpecs = document.querySelector(".bike-specifications");
    const listeSpecs = document.querySelector("#bike-specifications");
    const nyP = document.createElement("p");
    const nyH4 = document.createElement("h4");

    $(listeSpecs).empty();
    const klon = skabelonSpecs.cloneNode(true).content;
    console.log(klon);
    klon.querySelector(".price").textContent = ": " + data.pris + " ,-";
    klon.querySelector(".frameSize").innerHTML = data.framesize;
    klon.querySelector(".weight").innerHTML = data.weight;

    klon.querySelector(".colorCombinations").innerHTML = data.colorcombination;
    klon.querySelector(".benefits1").innerHTML = data.benefits1;
    klon.querySelector(".benefits2").innerHTML = data.benefits2;
    klon.querySelector(".benefits3").innerHTML = data.benefits3;




 



    listeSpecs.appendChild(klon);

} */