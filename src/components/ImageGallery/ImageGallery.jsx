import { fetchImages } from '../../service/fetchImages';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Loader } from '../Loader/Loader';
import { IdleImages } from '../IdleImages/IdleImages';
import { RejectedImages } from '../RejectedImages/RejectedImages';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { LoadMore } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { GalleryList } from '../ImageGalleryItem/ImageGalleryItem.styled';

export const ImageGallery = ({ searchName }) => {
  const [image, setImage] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [largeImg, setLargeImage] = useState(null);
  const [alt, setAlt] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    resetStates();
    setSearch(searchName);
  }, [searchName]);

  useEffect(() => {
    if (!search) {
      return;
    }
    setLoader(true);

    fetchImages(search, page)
      .then(data => {
        if (data.totalHits === 0) {
          return setStatus('rejected');
        }

        setImage(prev => [...prev, ...data.hits]);
        setTotalPage(data.totalHits);
        setStatus('resolved');
      })
      .catch(error => {
        error(error.message);
        setStatus('rejected');
      })
      .finally(() => setLoader(false));
  }, [search, page]);

  function resetStates() {
    setImage([]);
    setTotalPage(0);
    setPage(1);
    setStatus('idle');
    setLoader(false);
  }

  const handleNextPage = () => {
    setPage(prev => prev + 1);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleClickImg = evt => {
    const { target } = evt;

    if (target.nodeName === 'IMG') {
      setOpenModal(true);
      setLargeImage(target.getAttribute('data'));
      setAlt(target.alt);
    }
  };

  if (status === 'idle') {
    return <IdleImages />;
  }

  if (status === 'resolved') {
    return (
      <>
        {openModal && (
          <Modal onClose={handleClose}>
            <img src={largeImg} alt={alt} width="800" height="500" />
          </Modal>
        )}
        <GalleryList onClick={handleClickImg}>
          {image.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              id={id}
              tags={tags}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
            />
          ))}
        </GalleryList>

        {loader && <Loader />}

        {page <= Math.round(totalPage / 12) && (
          <LoadMore onClick={() => handleNextPage()} />
        )}
      </>
    );
  }

  if (status === 'rejected') {
    return <RejectedImages word={searchName} />;
  }
};

ImageGallery.propTypes = {
  searchName: PropTypes.string.isRequired,
};
