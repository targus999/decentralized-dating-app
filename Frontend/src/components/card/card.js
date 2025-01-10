// src/Card.js
import React from "react";
import "./card.css";

const Card = ({ image, name }) => {
  return (
    <div className="card">
      <img src={image} alt={name} draggable="false"/>
      <h2>{name}</h2>
    </div>
  );
};

export default Card;
