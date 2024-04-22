export function addImageCard(image) {
  const galleryList = document.querySelector('ul.gallery');

  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery-item');

  const galleryLink = document.createElement('a');
  galleryLink.classList.add('gallery-link');
  galleryLink.href = image.largeImageURL;

  const galleryImage = document.createElement('img');
  galleryImage.src = image.webformatURL;
  galleryImage.alt = image.tags;

  const imageInfo = document.createElement('div');
  imageInfo.classList.add('image-info');
  imageInfo.innerHTML = `
      <p>Likes: ${image.likes}</p>
      <p>Views: ${image.views}</p>
      <p>Comments: ${image.comments}</p>
      <p>Downloads: ${image.downloads}</p>
  `;

  galleryLink.appendChild(galleryImage);
  galleryLink.appendChild(imageInfo);
  galleryItem.appendChild(galleryLink);
  galleryList.appendChild(galleryItem);
}
