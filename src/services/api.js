import axios from 'axios';

const KEY = '34909269-13b0723947e6e83e8bc89bfad';
axios.defaults.baseURL = `https://pixabay.com/api/`;

export async function getPictures(pictureName, page) {
  const response = await axios.get(
    `?&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12&q=${pictureName}`
  );

  return response.data;
}
