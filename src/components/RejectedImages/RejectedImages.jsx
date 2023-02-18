import { Error } from './RejectedImages.styled';
import PropTypes from 'prop-types';

export function RejectedImages({ word }) {
  return (
    <>
      <Error>No photos for search query: {word}</Error>
    </>
  );
}

RejectedImages.propTypes = {
  word: PropTypes.string.isRequired,
};
