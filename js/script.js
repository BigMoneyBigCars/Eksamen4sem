/* const { ready } = require("jquery"); */

/* const { create } = require("browser-sync"); */

/* const { type } = require("jquery"); */

/*  const { reload } = require("browser-sync");

 const { getJSON } = require("jquery"); 
console.log("se mor");  */
document.addEventListener("DOMContentLoaded", initPage);
let initialJson;
let allItems = [];
const url = "http://mostvalue.dk/Buddhabikes/wordpress/wp-json/wp/v2/posts";

function initPage() {
    getJSON()
        ;
}

async function getJSON() {
    const response = await fetch(url);
    initialJson = await response.json()
    onlyAcf();
}

function onlyAcf() {
    initialJson.forEach(object => {
        console.log(object.acf)
        allItems.push(object.acf)
    })
    console.log(allItems)
    show(allItems);
}


function createInfo(textvariable, text, klon) {

    const li = document.createElement("li");
    const div = document.createElement("div");
    const p = document.createElement("p");
    const pInfo = document.createElement("p");

    div.classList.add("i-info");
    
    klon.querySelector(".menu.vertical.specs").appendChild(li);
    console.log(klon.querySelector(".menu.vertical.specs"));

    console.log("create info f", text, klon)


    if (textvariable != null) {
        p.textContent = textvariable;
        div.appendChild(p)
    }
    p.textContent = textvariable;
    pInfo.textContent = text

    div.appendChild(p)
    div.appendChild(pInfo)
   li.appendChild(div);


  
}

function createSpecsHeader(klon){
    const specH = document.createElement("div")
    specH.textContent = "test";
    klon.appendChild(specH)

}


function createContainer(container){
    container = document.createElement("div");
    console.log(container);
    return;

    

}

let textvariable;
const li = document.createElement("li")
function show(allItems) {


    const skabelon = document.querySelector(".item-temp");
    const liste = document.querySelector("#product-grid");

    allItems.forEach(item => {
    

        const klon = skabelon.cloneNode(true).content;
        
        const test = document.createElement("div")
        klon.querySelector("img").src = item.image.url;
        klon.querySelector("p").textContent = item.title;
        /*       klon.querySelector(".container").style.background = 'url('+cykel.acf.image.url+')'; */
        /*    klon.querySelector("img").alt = cykel.title; */
        klon.querySelector("p.price").innerHTML = item.price + ",-";
 


        if (item.bike_description) {
            console.log("bike desco", item.bike_description)
            textvariable = "";
            createInfo(textvariable, item.bike_description, klon )
        }


        test.textContent = "Specs"
        test.classList.add("h3", "text-center");

        
   

        klon.querySelector(".menu.vertical.specs").appendChild(test);

        if (item.bike_type) {
            console.log("bike type", item.bike_type)
            textvariable = "Cykel Type";
            createInfo(textvariable, item.bike_type, klon )
        }
        if (item.number_of_gears) {

            console.log("gears", item.number_of_gears)
            textvariable = "Antal gear";
            createInfo(textvariable, item.number_of_gears, klon )
        }
        if (item.date) {
            console.log("date", item.date)
            textvariable = "Dato:";
            createInfo(textvariable, item.date, klon )
        }
        if (item.made_by) {
            console.log("made by", item.made_by)
            textvariable = "Lavet af: ";
            createInfo(textvariable, item.made_by, klon )
        }
        if (item.production_date) {
            console.log("prod date", item.production_date)
            textvariable = "Prod. år";
            createInfo(textvariable, item.production_date, klon )
        }
        if (item.serienummer) {
            textvariable = "Serienummer";

            createInfo(textvariable, item.serienummer, klon )
        }
        
/*         let button = document.createElement("li")
        button.classList.add ="button";
        klon.querySelector(".menu.vertical.specs").appendChild(button);
 */
        liste.appendChild(klon);
    });
    reloadAccordionFunctionality();

}

function reloadAccordionFunctionality() {

    $('.catalogue-item .accordion-menu').foundation();

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