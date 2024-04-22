import { searchImages } from './js/pixabay-api.js';
import { addImageCard } from './js/render-function.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loader = document.querySelector('.loader');
const form = document.getElementById('searchForm');
const galleryElement = document.querySelector('.gallery');

let lightbox;

function toggleLoader(display) {
  loader.style.display = display;
}

loader.style.display = 'none';

form.addEventListener('submit', async e => {
  e.preventDefault();

  const input = document.getElementById('searchInput').value.trim();

  if (input === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'Please enter a search query.',
    });
    return;
  }

  toggleLoader('block');

  try {
    const images = await searchImages(input);
    galleryElement.innerHTML = '';

    if (images.length === 0) {
      iziToast.warning({
        title: 'Caution',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      images.forEach(image => {
        addImageCard(image);
      });

      if (!lightbox) {
        const lightbox = new SimpleLightbox('.gallery-link', {
          captions: true,
          captionsData: 'alt',
          captionDelay: 250,
        });
      } else {
        lightbox.refresh();
      }
    }
  } catch (error) {
    console.error('Error', error);
  } finally {
    toggleLoader('none');
  }
});
//

//import './js/pixabay-api';

//// Описаний у документації
//import iziToast from 'izitoast';
//// Додатковий імпорт стилів
//import 'izitoast/dist/css/iziToast.min.css';

//import SimpleLightbox from 'simplelightbox';
//// Додатковий імпорт стилів
//import 'simplelightbox/dist/simple-lightbox.min.css';

//const loader = document.querySelector('.loader');
//loader.style.display = 'block';

//const form = document
//  .getElementById('searchForm')
//  .addEventListener('submit', e => {
//    e.preventDefault();

//    const input = document.getElementById('searchInput').value.trim();

//    if (input === '') {
//      iziToast.warning({
//        title: 'Caution',
//        message: 'Please enter a search query.',
//      });
//      return;
//    }

//    const apiKey = '43518191-3e4362bb1fc47484118bdfa22';
//    const url =
//      'https://pixabay.com/api/?key=' +
//      apiKey +
//      '&q=' +
//      encodeURIComponent(input) +
//      '&image_type=photo&orientation=horizontal&safesearch=true';

//    const loader = document.querySelector('.loader');
//    loader.style.display = 'block';

//    fetch(url)
//      .then(response => response.json())
//      .then(data => {
//        loader.style.display = 'none';

//        if (data.hits.length === 0) {
//          iziToast.warning({
//            title: 'Caution',
//            message:
//              'Sorry, there are no images matching your search query. Please try again!',
//          });
//        } else {
//          const galleryElement = document.querySelector('.gallery');
//          galleryElement.innerHTML = '';

//          data.hits.forEach(hit => {
//            addImageCard(hit);
//          });

//          lightbox.refresh();
//        }
//      })
//      .catch(error => {
//        console.error('Error', error);
//      });
//  });

//function addImageCard(image) {
//  const galleryList = document.querySelector('ul.gallery');

//  const galleryItem = document.createElement('li');
//  galleryItem.classList.add('gallery-item');

//  const galleryLink = document.createElement('a');
//  galleryLink.classList.add('gallery-link');
//  galleryLink.href = image.largeImageURL;

//  const galleryImage = document.createElement('img');
//  galleryImage.src = image.webformatURL;
//  galleryImage.alt = image.tags;

//  const imageInfo = document.createElement('div');
//  imageInfo.classList.add('image-info');
//  imageInfo.innerHTML = `
//      <p>Likes: ${image.likes}</p>
//      <p>Views: ${image.views}</p>
//      <p>Comments: ${image.comments}</p>
//      <p>Downloads: ${image.downloads}</p>
//  `;

//  galleryLink.appendChild(galleryImage);
//  galleryLink.appendChild(imageInfo);
//  galleryItem.appendChild(galleryLink);
//  galleryList.appendChild(galleryItem);
//}

//const lightbox = new SimpleLightbox('.gallery-link', {
//  captions: true,
//  captionsData: 'alt',
//  captionDelay: 250,
//});
