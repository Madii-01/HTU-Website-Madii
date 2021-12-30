const buy = document.querySelectorAll(".btn")[0];
const madii = document.querySelectorAll(".btn") [1];
const biggerContainer = document.querySelector(".bigger-contaier")
buy.addEventListener("click" , (eo) => {

    biggerContainer.classList.add("active")

});

madii.addEventListener("click" , (eo) =>{

    biggerContainer.classList.remove("active")
});
const you = document.getElementById("you")
you.addEventListener("click", (eo) => {
eo.preventDefault();
  
});