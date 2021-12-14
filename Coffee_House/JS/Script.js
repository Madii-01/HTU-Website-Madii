let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}


let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

let carts = document.querySelectorAll('.add-btn');

let menuItems = [
    {
        name: "AMERICAN COFFEE",
        tag: "AMERICAN-COFFEE",
        price: 2.10,
        inCart: 0 
    },
    {
        name: "CARAMEL MACCHIATO",
        tag: "CARAMEL-MACCHIATO",
        price: 3.99,
        inCart: 0 
    },
    {
        name: "ICED SPANISH LATTE",
        tag: "ICED-SPANISH-LATTE",
        price: 3.99,
        inCart: 0 
    },
    {
        name: "SPANISH LATTE",
        tag: "SPANISH-LATTE",
        price: 3.70,
        inCart: 0 
    },
    {
        name: "TURKISH COFFEE",
        tag: "TURKISH-COFFEE",
        price: 3.89,
        inCart: 0 
    },
    {
        name: "WHITE MOCHA",
        tag: "WHITE-MOCHA-3",
        price: 3.99,
        inCart: 0 
    }
];

for(let i=0; i<carts.length; i++){
    carts[i].addEventListener('click' , () => {
        cartNumbers(menuItems[i]);
        totalCost(menuItems[i]);
    })
}

function onCartItems(){
    
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(menuItems) {
   
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers =  parseInt(productNumbers);

    if( productNumbers ){
        localStorage.setItem('cartNumbers' , productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }
    else{
        localStorage.setItem('cartNumbers' , 1); 
        document.querySelector('.cart span').textContent = 1;
    }   
    setItems(menuItems);
}
function setItems(menuItems) {
    let cartItems = localStorage.getItem('menuItemsInCart');
    cartItems =JSON.parse(cartItems) 
    
    if(cartItems != null) {
        if(cartItems[menuItems.tag]== undefined){
            cartItems = {
                ...cartItems,
                [menuItems.tag]: menuItems
            }

        }
     
        cartItems[menuItems.tag].inCart += 1;
    }
    else{
        menuItems.inCart = 1;
        cartItems = {
         [menuItems.tag]: menuItems
    }
    }
    
    
    localStorage.setItem("menuItemsInCart" , JSON.stringify(cartItems));
}

function totalCost(menuItems){

let cartCost = localStorage.getItem('totalCost');

console.log("the price is" ,cartCost);
console.log(typeof cartCost);

if(cartCost != null){
    cartCost = parseFloat(cartCost);
    localStorage.setItem("totalCost" , cartCost + menuItems.price );
}
else{
localStorage.setItem("totalCost" , menuItems.price);
    }
}

function displayCart(){
    let cartItems = localStorage.getItem("menuItemsInCart");
    cartItems = JSON.parse(cartItems);
    let producContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems)
    if(cartItems && producContainer) {
      producContainer.innerHTML = '';
        Object.values(cartItems).map(item => { 
            producContainer.innerHTML += `
            <div class="product" id= ><ion-icon name="close-circle"></ion-icon><img src="./images/${item.tag}.jpg" />
            <span class="sm-hide">${item.name}</span>
        </div>
        <div class="price sm-hide">$${item.price}</div>
        <div class="quantity">
             <ion-icon class="decrease"  name="chevron-back-outline"></ion-icon>
                <span>${item.inCart}</span>
            <ion-icon class="increase" name="chevron-forward-outline"></ion-icon>  
        </div>
        <div class="total">$${item.inCart * item.price}</div>
        </div>
        `;
               
        });
       
        producContainer.innerHTML += ` 
            <div class = " basketTotalContainer">
            <h4 class = "basketTotalTitle">Basket Total</h4>
            <h4 class="basketTotal">$${cartCost}</h4>
        `;


    }
    
}

onCartItems();
displayCart();
