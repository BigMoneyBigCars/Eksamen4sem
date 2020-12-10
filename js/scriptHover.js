
document.addEventListener("DOMContentLoaded", initPage);

let imgs = document.querySelectorAll(".hover-container img");

function initPage() {
    imgs.forEach(img => {
        console.log(img)
        img.classList = "";

  /*      
        img.classList.add("targeted")
         img.addEventListener("mouseover", () => {
           img.classList.add("targeted");


           updateBlur();
        })  */
        
    })

    



};
function updateBlur() {


    imgs.forEach(img => {

        if (img.classList.contains("targeted") == true)
        {
            console.log("has class")
        } else {
            img.style.filter ="blur(3px)";
        }

    });

}

