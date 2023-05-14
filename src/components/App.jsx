import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import css from './App.module.css';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { getPictures } from 'services/api';

export default function App() {
  const [pictureName, setPictureName] = useState('');
  const [pictures, setPictures] = useState([]);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = async pictureName => {
    setIsLoading(true);

    const pictures = await getPictures(pictureName, 1);

    setPictures(pictures.hits);
    setPictureName(pictureName);
    setPage(1);
    setIsLoading(false);
  };

  const handleLoadMore = async () => {
    setIsLoading(true);

    const nextPage = page + 1;
    const newPictures = await getPictures(pictureName, nextPage);

    setPictures([...pictures, ...newPictures.hits]);
    setPage(nextPage);
    setShowLoadMoreButton(
      newPictures.total > pictures.length + newPictures.hits.length
    );
    setIsLoading(false);
  };

  const handleOpenModal = picture => {
    setSelectedPicture(picture);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPicture(null);
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmitForm={handleFormSubmit} />
      <ImageGallery pictures={pictures} onClick={handleOpenModal} />
      {isModalOpen && (
        <Modal onClick={handleCloseModal} selectedPicture={selectedPicture} />
      )}
      {isLoading && <Loader />}
      <Button
        showLoadMoreButton={showLoadMoreButton}
        pictures={pictures}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
}
