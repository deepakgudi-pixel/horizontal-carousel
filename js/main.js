import '../styles/app.scss';


const carouselItems = document.querySelector('.carousel-items');
const activeItem = document.querySelector(".active-item");
const imageWidth = 300; // Adjust this value based on the actual width of your images

carouselItems.style.width = `${30 * imageWidth}px`;


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
  
    lastScrollY += e.deltaY;
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

 
 function animate(){
    currentX = lerp(currentX, lastScrollY, 0.075);
    carouselItems.style.transform = `translateX(-${currentX}px)`;
    checkAndUpdateActiveItem();
    requestAnimationFrame(animate);
 }

 animate();






