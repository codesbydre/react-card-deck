import React from "react";

function Card({ image }) {
  return <div>{image && <img src={image} alt="Card" />}</div>;
}

export default Card;
