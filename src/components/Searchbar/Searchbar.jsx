import { useState } from 'react';
import PropTypes from 'prop-types';
import { Header, Form, Button, Input } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleChangeName = event => {
    setSearchName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchName.trim() === '') {
      return;
    }

    onSubmit(searchName);
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">&#128269;</Button>

        <Input
          type="text"
          name="searchName"
          value={searchName}
          onChange={handleChangeName}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
