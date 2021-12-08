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
        price: 2,
        incart: 0 
    },
    {
        name: "CARAMEL MACCHIATO",
        tag: "CARAMEL-MACCHIATO",
        price: 3,
        incart: 0 
    },
    {
        name: "ICED SPANISH LATTE",
        tag: "ICED-SPANISH-LATTE",
        price: 3,
        incart: 0 
    },
    {
        name: "SPANISH LATTE",
        tag: "SPANISH-LATTE",
        price: 3,
        incart: 0 
    },
    {
        name: "TURKISH COFFEE",
        tag: "TURKISH-COFFEE",
        price: 3,
        incart: 0 
    },
    {
        name: "WHITE MOCHA",
        tag: "WHITE-MOCHA",
        price: 3,
        incart: 0 
    }
];

for(let i=0; i<carts.length; i++){
    carts[i].addEventListener('click' , () => {
        cartNumbers();
    })
}

function onCart(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers() {
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
}
onCart();
