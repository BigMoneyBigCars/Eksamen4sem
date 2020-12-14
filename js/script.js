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
    dateFormatted: "",  
};

let textvariable;
const li = document.createElement("li")

//filter Buttons

function initPage() {
    eventListeners();


}
const myButtons = document.querySelectorAll(".button.filter");
const mySortButtons = document.querySelectorAll(".button.sort");
function eventListeners() {


    myButtons.forEach((button) => {
        button.addEventListener("click", filterList)
    })

    
    mySortButtons.forEach((button) => {
        button.addEventListener("click", sortList)

    })


/*     mySortButtons.addEventListener("click", sortList); */
  /*   mySortButtons.forEach((button) => {
        button.addEventListener("#sort-container", sortList);
    }); */

    getJSON();
}
async function getJSON() {
    const response = await fetch(url);
    initialJson = await response.json()

    onlyAcf(initialJson);
}
let acfObject;
function onlyAcf() {


    initialJson.forEach(object => {

        acfList.push(object.acf)
    })

    makeProducts(acfList);
}


function createInfo(textvariable, text, clone) {

    const div = document.createElement("div");
    const p = document.createElement("p");
    const pInfo = document.createElement("p");

    let li_data = document.createElement("li");

    if (text.length < 70) {

        text = text.trim();

        /*   li_data.dataset.field = text; */
    }

    div.classList.add("i-info");

    clone.querySelector(".menu.vertical.specs").appendChild(li_data);

    if (textvariable != null) {
        p.textContent = textvariable;
        div.appendChild(p)
    }


    pInfo.textContent = text


    div.appendChild(pInfo)

    li_data.appendChild(div);

}

function createSpecsHeader(clone) {
    const specH = document.createElement("div")
    specH.textContent = "test";
    clone.appendChild(specH)

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
        productObject.dateFormatted ="";
        allItems.push(productObject);

    })

    currentItems = allItems;
    displayList(currentItems)

}

function displayList(products) {
    liste.innerHTML = "";
    products.forEach(displaySingleProduct);
    listCounter = currentItems.length

    listCountContainer.textContent = "Viser " + listCounter + " cykler";
    //reloadAccordionFunctionality();

  

}


function createDate(  textvariable, product, clone) {
    let date = product.date;
  
    product.dateFormatted

    const div = document.createElement("div");
    const p = document.createElement("p");
    const pInfo = document.createElement("p");
    let li_data = document.createElement("li");

    clone.querySelector(".menu.vertical.specs").appendChild(li_data);

    const dateArray = date.split('/')

    const formattedDate = new Date(dateArray[2],(dateArray[1]-1),dateArray[0]);



    p.textContent= textvariable;
    pInfo.textContent = product.date;
    div.classList.add("i-info");
    li_data.appendChild(div);
    div.appendChild(p);
    div.appendChild(pInfo);
    product.dateFormatted =formattedDate;

  
}

function createCategory(categories, clone, textvariable) {

    const div = document.createElement("div");
    const p = document.createElement("p");
    const pInfo = document.createElement("p");
    let li_data = document.createElement("li");

    if (categories.length > 1) {
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
    clone.querySelector(".menu.vertical.specs").appendChild(li_data);
    p.textContent = textvariable;
    div.classList.add("i-info");
    li_data.appendChild(div);
    div.appendChild(p);
    div.appendChild(pInfo);

}

function displaySingleProduct(product) {

    const clone = skabelon.cloneNode(true).content;
    const test = document.createElement("div")


    clone.querySelector("img").src = product.image;
    clone.querySelector("p").textContent = product.name;
    /*       clone.querySelector(".container").style.background = 'url('+cykel.acf.image.url+')'; */
    /*    clone.querySelector("img").alt = cykel.title; */
    clone.querySelector("p.price").innerHTML = product.price + ",-";

    if (product.description) {
        textvariable = "Beskrivelse";
        createInfo(textvariable, product.description, clone, product.description)
    }


    if (product.category) {

    
        textvariable = "Cykel type"
        let categories = product.category;
    
        createCategory(product.category, clone, textvariable)
    }
    if (product.gear) {
        textvariable = "Antal gear";
        createInfo(textvariable, product.gear, clone)
    }
    if (product.date) {
        textvariable = "Dato:";
        createDate(textvariable, product, clone)
    }

    if (product.serienummer) {
        textvariable = "Serienummer";
        createInfo(textvariable, product.serienummer, clone)
    }

    let button = document.createElement("button")
    button.textContent = "Kontakt & Reserver";
    button.classList.add("button");
    button.classList.add("reserve");

    clone.querySelector(".menu.vertical.specs").appendChild(button);

    liste.appendChild(clone);
    console.log(product)

    reloadAccordionFunctionality();


}


function filterList() {
    const filter = this.dataset.filter;
    //clearAllSort();

    myFilter(filter);
}

function clearAllSort() {

    mySortButtons.forEach((botton) => {
        botton.dataset.action = "sort";
    });
}

function sortList() {
    console.log("er her")
    if (this.dataset.action === "sort") {
        clearAllSort();
        
        this.dataset.action = "sorted";
    } 
        if (this.dataset.sort === "new") {
            console.log("vis: Nye cykler først")

        } else if (this.dataset.sort === "old") {
            console.log("vis: gamle cykler først")

             console.log("sortdir asc", this.dataset.direction); 
        } else if (this.dataset.sort === "low") {
            console.log("vis: billigste cykler først")


        } else if (this.dataset.sort === "high") {
            console.log("vis: dyreste cykler først")

        }
    
    mySort(this.dataset.sort, this.dataset.direction);

}
function mySort(sortBy, direction) {
    console.log(`mySort-, ${sortBy} sortDirection-  ${direction}  `);

 
    



    let desc = 1;
    currentItems = currentItems.filter((allItems) => true);
    if (direction === "desc") {
        desc = -1;
    }


     

    currentItems.sort(function (a, b) {
        console.log(a,b)
        var x = a[sortBy];
        var y = b[sortBy];

        console.log(x,y);
        if (x < y) {

            return -1 * desc;
        }
        if (x > y) {
            return 1 * desc;
        }
        return 0;
    });
    displayList(currentItems);
  
}



function reloadAccordionFunctionality() {
    $('.catalogue-item .accordion-menu').foundation();

}

function myFilter(filter) {


    if (filter === "*") {

        console.log(currentItems, allItems)
        currentItems = allItems;
        console.log(currentItems, allItems)

    }
    else {

        currentItems = [];
        allItems.filter((item) => {
            const testArray = item.category;
          
            const exists = testArray.find((x) => x === filter);
            if (exists) {


                currentItems.push(item);

            } else {

            }


        })
    }


    
    displayList(currentItems)

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
    const clone = skabelonSpecs.cloneNode(true).content;
    console.log(clone);
    clone.querySelector(".price").textContent = ": " + data.pris + " ,-";
    clone.querySelector(".frameSize").innerHTML = data.framesize;
    clone.querySelector(".weight").innerHTML = data.weight;

    clone.querySelector(".colorCombinations").innerHTML = data.colorcombination;
    clone.querySelector(".benefits1").innerHTML = data.benefits1;
    clone.querySelector(".benefits2").innerHTML = data.benefits2;
    clone.querySelector(".benefits3").innerHTML = data.benefits3;








    listeSpecs.appendChild(clone);

} */