import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './Searchbar.module.css';

export default function Searchbar({ onSubmitForm }) {
  const [pictureName, setPictureName] = useState('');

  const handleInput = e => {
    setPictureName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (pictureName.trim() === '') {
      alert('Please enter a search keyword');
      return;
    }

    onSubmitForm(pictureName);
    setPictureName('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>
        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="pictureName"
          value={pictureName}
          onChange={handleInput}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
