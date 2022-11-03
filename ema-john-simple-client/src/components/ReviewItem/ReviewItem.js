import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./ReviewItem.css";

const ReviewItem = ({ product, handleRemoveItem }) => {
  const { id, name, img, price, shipping, quantity } = product;
  // const {handleRemoveItem} = props.handleRemoveItem;
  return (
    <div className="review-item">
      <div>
        <img src={img} alt={name} />
      </div>
      <div className="review-details-container">
        <div className="review-details">
          <p>{name}</p>
          <p>Price : ${price}</p>
          <p>Shipping : ${shipping}</p>
          <p>Quantity : {quantity}</p>
        </div>
        <div className="delete-container">
          <button onClick={() => handleRemoveItem(id)} className="btn-delete">
            <FontAwesomeIcon
              className="delete-icon"
              icon={faTrashAlt}
            ></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
