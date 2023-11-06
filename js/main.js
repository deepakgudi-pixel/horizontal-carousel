import '../styles/app.scss';


const carouselItems = document.querySelector('.carousel-items');
const activeItem = document.querySelector(".active-item");
// const imageWidth = 100; 

// carouselItems.style.width = `${20 * imageWidth}px`;


const activeItemImage = document.createElement('img');

activeItem.appendChild(activeItemImage);


for (let i = 1; i <= 30; i++ ){
    const carouselItem = document.createElement('div');
    carouselItem.className = 'carousel-item';
    

    const img = document.createElement("img");
    img.src = `../images/img${i}.jpg`;

    carouselItem.appendChild(img);
    carouselItems.appendChild(carouselItem);
}

function lerp(start, end, t){
    return start * ( 1 - t ) + end * t;
}

let currentX = 0;
let lastScrollY = 0;

window.addEventListener("wheel", (e)  => {
  
    lastScrollY -= e.deltaY;
    const maxScroll = carouselItems.offsetWidth - window.innerWidth;

    lastScrollY = Math.min(Math.max(lastScrollY, 0), maxScroll)

});

let lastActive = null;
let currentLeftMostItem = null;

function checkAndUpdateActiveItem(){

    let allItems = document.querySelectorAll('.carousel-item');

    for(let item of allItems){
        const rect = item.getBoundingClientRect();

        if(rect.left >= 0 && rect.left < 10){
            if(currentLeftMostItem !== item){

                if(lastActive){
                    lastActive.classList.remove("active");
                }

                item.classList.add("active");
                const src = item.querySelector('img').src;
                activeItemImage.src = src;
                lastActive = item;
                currentLeftMostItem = item;

            }

            break;
        }
    }
}


const body = document.querySelector('body');
const footerItems = document.querySelectorAll(".footer-item p");

 function animate(){
    currentX = lerp(currentX, lastScrollY, 0.075);
    carouselItems.style.transform = `translateX(-${currentX}px)`;
    checkAndUpdateActiveItem();
    requestAnimationFrame(animate);
    body.style.backgroundColor = `hsl(${lastScrollY}, 50%, 50%)`;
    footerItems.forEach((p) => {
        p.style.color = `hsl(${lastScrollY + 100}, 50%, 50%)`;
      });
 
 }

 animate();




//  // Listen for the scroll event
//  window.addEventListener('scroll', () => {
//      // Calculate the scroll percentage based on how far you've scrolled
//      const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
     
//      // Use the scroll percentage to change the background color dynamically
//      body.style.backgroundColor = `hsl(${scrollPercentage}, 50%, 50%)`;
//  });
 



