const apiKey = '43518191-3e4362bb1fc47484118bdfa22';

export async function searchImages(query) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
}
