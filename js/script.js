"use strict"


document.addEventListener("DOMContentLoaded", initPage);
let initialJson;
let allItems = [];
let acfList = [];
let currentItems = []
let listCounter;
const listCountContainer = document.querySelector(".listcounter");

const skabelon = document.querySelector(".item-temp");
const liste = document.querySelector("#product-grid");

const url = "http://mostvalue.dk/Buddhabikes/wordpress/wp-json/wp/v2/posts";


const Product = {
    name: "",
    gear: "",
    madeBy: "",
    price: "",
    date: "",
    description: "",
    production_year: "",
    image: "",
    serienummer: "",
    category: "",
};

let textvariable;
const li = document.createElement("li")

//filter Buttons

function initPage() {
    eventListeners();


}

function eventListeners() {
    console.log("her")
    const myButtons = document.querySelectorAll("button.filter");
    myButtons.forEach((button) => {
        button.addEventListener("click", filterList)

        console.log(button.textContent)
    })

    getJSON();
}
async function getJSON() {
    const response = await fetch(url);
    initialJson = await response.json()
    console.log(initialJson)
    onlyAcf(initialJson);
}
let acfObject;
function onlyAcf() {
    console.log(initialJson, allItems)

    initialJson.forEach(object => {
        console.log(object.acf)
        acfList.push(object.acf)
    })

    makeProducts(acfList);
}


function createInfo(textvariable, text, klon) {

    const div = document.createElement("div");
    const p = document.createElement("p");
    const pInfo = document.createElement("p");

    let li_data = document.createElement("li");

    if (text.length < 70) {

        text = text.trim();

        /*   li_data.dataset.field = text; */
    }

    div.classList.add("i-info");

    klon.querySelector(".menu.vertical.specs").appendChild(li_data);

    if (textvariable != null) {
        p.textContent = textvariable;
        div.appendChild(p)
    }


    pInfo.textContent = text


    div.appendChild(pInfo)

    li_data.appendChild(div);

}

function createSpecsHeader(klon) {
    const specH = document.createElement("div")
    specH.textContent = "test";
    klon.appendChild(specH)

}


function createContainer(container) {
    container = document.createElement("div");
    return;
}


function makeProducts(acfList) {

    acfList.forEach(item => {
        const productObject = Object.create(Product);
        productObject.name = item.title;
        productObject.gear = item.number_of_gears;
        productObject.madeBy = item.made_by;
        productObject.price = item.price;
        productObject.date = item.date;
        productObject.description = item.bike_description;
        productObject.production_year = item.production_date;
        productObject.image = item.image.url;
        productObject.serienummer = item.serienummer;
        productObject.category = item.category_;
        allItems.push(productObject);

    })
    console.log(allItems, "so far so good")
    currentItems = allItems;
    displayList(currentItems)

}

function displayList(products) {
    liste.innerHTML = "";
    products.forEach(displaySingleProduct);
    listCounter = currentItems.length

     listCountContainer.textContent= "Viser " + listCounter +" cykler" ;
    //reloadAccordionFunctionality();

}

function createCategory(categories, klon, textvariable) {

    const div = document.createElement("div");
    const p = document.createElement("p");
    const pInfo = document.createElement("p");
    let li_data = document.createElement("li");

    if (categories.length > 1) {

        console.log(categories)
        let first = categories[0]
        let second = categories[1]
        let third = categories[2]

        li_data.dataset.first = `${first} ${second} ${third}`;
        li_data.dataset.second = `${second}`;
        li_data.dataset.third = `${third}`;
        pInfo.textContent = `${first} ${second} ${third}`;

    } else if (categories.length === 1) {
        li_data.dataset.field = categories;
        pInfo.textContent = categories;
    }
    klon.querySelector(".menu.vertical.specs").appendChild(li_data);
    p.textContent = textvariable;
    div.classList.add("i-info");
    li_data.appendChild(div);
    div.appendChild(p);
    div.appendChild(pInfo);

}

function displaySingleProduct(product) {
    console.log("done")
    const klon = skabelon.cloneNode(true).content;
    const test = document.createElement("div")
    console.log(product)

    klon.querySelector("img").src = product.image;
    klon.querySelector("p").textContent = product.title;
    /*       klon.querySelector(".container").style.background = 'url('+cykel.acf.image.url+')'; */
    /*    klon.querySelector("img").alt = cykel.title; */
    klon.querySelector("p.price").innerHTML = product.price + ",-";

    if (product.description) {
        textvariable = "";
        createInfo(textvariable, product.description, klon, product.description)
    }
    test.textContent = "Specs"
    test.classList.add("h3", "text-center");
    klon.querySelector(".menu.vertical.specs").appendChild(test);

    if (product.category) {

        console.log(product.category)
        textvariable = "Cykel type"
        let categories = product.category;
        console.log(categories)
        createCategory(product.category, klon, textvariable)
    }
    if (product.gear) {

        textvariable = "Antal gear";
        createInfo(textvariable, product.gear, klon)
    }
    if (product.date) {
        textvariable = "Dato:";
        createInfo(textvariable, product.date, klon)
    }
    if (product.madeBy) {
        textvariable = "Lavet af: ";
        createInfo(textvariable, product.madeBy, klon)
    }
    if (product.production_year) {
        textvariable = "Prod. år";
        createInfo(textvariable, product.production_year, klon)
    }
    if (product.serienummer) {
        textvariable = "Serienummer";
        createInfo(textvariable, product.serienummer, klon)
    }

    let button = document.createElement("button")
    button.textContent = "Kontakt & Reserver";
    button.classList.add("button");
    button.classList.add("reserve");

    klon.querySelector(".menu.vertical.specs").appendChild(button);


    liste.appendChild(klon);


}


function filterList() {
    const filter = this.dataset.filter;
    //clearAllSort();

    myFilter(filter);
}
/* 
function clearAllSort() {
    console.log("clearAllSort");
    myHeading.forEach((botton) => {
      botton.dataset.action = "sort";
    });
  }
 */
function reloadAccordionFunctionality() {

    $('.catalogue-item .accordion-menu').foundation();

}

function checkUp(item, filter) {
    console.log(item, "nu her", filter)

    if (item === filter) {
        console.log(" 1 item");
        return true;
    }
    else {
        console.log("den her skal ikke vises")
        return false;
    }



}
function myFilter(filter) {
    console.log("Selected filter", filter);

    if (filter === "*"){
    currentItems = allItems;

    }
    else {

        currentItems = [];
             allItems.filter((item) => {
                const testArray = item.category;
                console.log(testArray);
                const exists = testArray.find((x) => x === filter);
                if (exists) {
                    console.log("Den her cykel tak")
        
        currentItems.push(item);
        
                } else {
                    console.log("ikke den her")
                }
        
        
            }) 
    }


    displayList(currentItems)
    console.log(currentItems)
    liste.classList.remove("pointerNone");

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