import React, { useState } from 'react';
import './style.css';
const RatingForm = () => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <form className="form-check-inline" onChange={(e) => handleRatingChange(parseInt(e.target.value))}>
      <div className="rate">
        <input type="radio" id="5" value="5" name="rating" />
        <label htmlFor="5"></label>
        <input type="radio" id="4" value="4" name="rating" />
        <label htmlFor="4"></label>
        <input type="radio" id="3" value="3" name="rating" />
        <label htmlFor="3"></label>
        <input type="radio" id="2" value="2" name="rating" />
        <label htmlFor="2"></label>
        <input type="radio" id="1" value="1" name="rating" />
        <label htmlFor="1"></label>
      </div>
      {/* <output name="rate">{rating}</output> */}
    </form>
  );
};

export default RatingForm;
