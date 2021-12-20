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
        tag: "americancoffee",
        price: 2,
        inCart: 0 
    },
    {
        name: "CARAMEL MACCHIATO",
        tag: "caramelmacchiato",
        price: 3,
        inCart: 0 
    },
    {
        name: "ICED SPANISH LATTE",
        tag: "icedspanishlatte",
        price: 3,
        inCart: 0 
    },
    {
        name: "SPANISH LATTE",
        tag: "spanishlatte",
        price: 3,
        inCart: 0 
    },
    {
        name: "TURKISH COFFEE",
        tag: "turkishcoffee",
        price: 3,
        inCart: 0 
    },
    {
        name: "WHITE MOCHA",
        tag: "whitemocha",
        price: 3,
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

function cartNumbers(menuItems, action) {
   
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers =  parseInt(productNumbers);

    let cartItems = localStorage.getItem('menuItemsInCart');
    cartItems = JSON.parse(cartItems);


    if( action == "decrease") {
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
    }
    else if( productNumbers ){
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

function totalCost(menuItems , action){

    let cartCost = localStorage.getItem('totalCost');
    
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost );
    if( action == "decrease") {
        cartCost = parseInt(cartCost);

        localStorage.setItem('totalCost',cartCost - menuItems.price);
    } else if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + menuItems.price);
    } else {
        localStorage.setItem("totalCost", menuItems.price);
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
            <div class="product" id= ><ion-icon name="close-circle-outline"></ion-icon><img src="./images/${item.tag}.jpg"  />
            <span>${item.name}</span>
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
                <h4 class = "basketTotalTitle">Basket Total:</h4>
                <h4 class="basketTotal">$${cartCost}</h4>
                <a href="/Coffee_House/check-out.html" target="blank" class="check-out-btn" > CHECK OUT</a>
            </div>`

            
    }
    deleteButtons();
    manageQuantity();
}
function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productName;
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartItems = localStorage.getItem('menuItemsInCart')
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, '');
            //console.log(productName);
            //console.log(cartItems[productName].name+" "+cartItems[productName].inCart)
            localStorage.setItem('cartNumbers' , productNumbers  - cartItems[productName].inCart );

            localStorage.setItem('totalCost' ,cartCost - (cartItems[productName].price * cartItems[productName].inCart ));

            delete cartItems[productName];
            localStorage.setItem('menuItemsInCart' , JSON.stringify(cartItems));

            
            displayCart();
            onCartItems();
        });
    }
}



function manageQuantity(){
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let cartItems = localStorage.getItem('menuItemsInCart');
    let currentQuantity = 0;
    let currentProduct = "";
    cartItems = JSON.parse(cartItems);


    for(let i=0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;   
            console.log(currentQuantity)
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct)

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease")
                totalCost( cartItems[currentProduct], "decrease" );
                localStorage.setItem('menuItemsInCart', JSON.stringify(cartItems));
                displayCart();
            }

        });


    }


    for(let i=0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener('click', () => {
            console.log("Increase button");
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);

            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            
                cartItems[currentProduct].inCart += 1;
                cartNumbers( cartItems[currentProduct]);
                totalCost( cartItems[currentProduct]);
                localStorage.setItem('menuItemsInCart', JSON.stringify(cartItems));
                displayCart();









        });


    }
}
onCartItems();
displayCart();

function ThankYou(){
    alert("Thank you for your purchase. Cash on deilvery :) ");
}
