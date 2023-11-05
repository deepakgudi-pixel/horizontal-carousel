import '../styles/app.scss';


const carouselItems = document.querySelector('.carousel-items');
const activeItem = document.querySelector(".active-item");


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

