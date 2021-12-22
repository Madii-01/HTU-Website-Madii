
document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('input').addEventListener('keyup' , function(event){
    
    document.querySelector('p').innerHTML = 'your name is:' + event.target.value;


    });
});