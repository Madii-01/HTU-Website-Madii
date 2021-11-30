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


for(let i=0; i<carts.length; i++){
    carts[i].addEventListener('click' , () => {
        cartNumbers();
    })
}

let menuItems = [
    {
        name: 'AMERICAN COFFEE',
        tag: 'AMERICAN COFFEE',
        price: 2.99,
        incart: 0 
    },
    {
        name: 'CARAMEL MACCHIATO',
        tag: 'CARAMEL MACCHIATO',
        price: 3.99,
        incart: 0 
    },
    {
        name: 'ICED SPANISH LATTE',
        tag: 'ICED SPANISH LATTE',
        price: 3.99,
        incart: 0 
    },
    {
        name: 'SPANISH LATTE',
        tag: 'SPANISH LATTE',
        price: 3.99,
        incart: 0 
    },
    {
        name: 'TURKISH COFFEE',
        tag: 'TURKISH COFFEE',
        price: 3.99,
        incart: 0 
    },
    {
        name: 'WHITE MOCHA',
        tag: 'WHITE MOCHA',
        price: 3.99,
        incart: 0 
    },
]
    



function cartNumbers() {
    let menuPorducts = localStorage.getItem('cartNumbers');
    
    menuPorducts =  parseFloat(menuPorducts);

    if(menuPorducts){
        localStorage.setItem('cartNumbers' , menuPorducts + 1);
        
    }
    else{
        localStorage.setItem('cartNumbers', 1);
     

    }
    

}
