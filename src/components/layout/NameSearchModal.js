import React, { useState } from 'react';
import axios from 'axios';
import './NameSearchModal.css';
import Name from '../Name';

const API_URL = process.env.REACT_APP_API_URL;

const NameSearchModal = ({ boardId, isVisible, toggleVisibility }) => {
  const savedToken = localStorage.getItem('authToken');
  const [searchResults, setSearchResults] = useState([]);
  const [formData, setFormData] = useState({
    q: '',
  });

  const handleSubmit = async (event) => {
    // do not navigate the browser on form submit
    event.preventDefault();
    console.log('FORM SUBMIT', formData);
    try {
      const { data } = await axios.get(`${API_URL}/names`, {
        params: formData,
        headers: { Authorization: `Bearer ${savedToken}` },
      });
      console.log(data);
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChanges = (event) => {
    const { value } = event.target;
    const newFormData = { q: value };
    setFormData(newFormData);
  };

  return (
    <>
      {isVisible && (
        <div className='modal-container'>
          <div className='modal-content'>
            <form onSubmit={handleSubmit}>
              <label htmlFor='q'>Name</label>
              <input
                id='q'
                type='text'
                value={formData.q}
                onChange={handleChanges}
              />
              <input type='submit' value='search' />
            </form>
            <button className='modalCloseButton' onClick={toggleVisibility}>
              CLOSE
            </button>
            <div className='searchResults'>
              {(searchResults.length &&
                searchResults
                  .sort((a, b) => a.name.value.length - b.name.value.length)
                  .map((item) => <Name key={item._id} data={item} />)) ||
                'No results...'}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NameSearchModal;
