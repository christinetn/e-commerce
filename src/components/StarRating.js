import React from "react";
import "./StarRating.css";
import { useState } from "react";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHoverVal] = useState(0);
  const stars = Array(5).fill(0)


  const handleClick = value => {
    setRating(value)
  }

  const handleMouseOver = hoverVal => {
    setHoverVal(hoverVal)
  }


  return (
    <div className="rating">
      {stars.map((_, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseOver(index)}
            onMouseLeave={() => setHoverVal(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      }
      )
      }
    </div>
  )
}

export default StarRating;