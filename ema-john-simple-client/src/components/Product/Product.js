import React from "react";
import "./Product.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   solid,
//   regular,
//   brands,
//   icon,
// } from "@fortawesome/fontawesome-svg-core/import.macro";

const Product = (props) => {
  const { id, name, img, seller, price, ratings } = props.product;
  // const handleAddToCart = props.handleAddToCart;

  return (
    <div className="product">
      <img
        src={img}
        alt=""
        onError={(e) => {
          e.currentTarget.src =
            "https://images.pexels.com/photos/5981927/pexels-photo-5981927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
        }}
      />

      <div className="product-info">
        <p className="product-name">{name}</p>
        <p>Price: ${price}</p>
        <p>
          <small>Seller: {seller}</small>
        </p>
        <p>
          <small>Rating: {ratings} stars</small>
        </p>
      </div>
      <button
        onClick={() => props.handleAddToCart(props.product)}
        className="btn-cart"
      >
        <p>Add to cart</p>
        {/* <FontAwesomeIcon icon={icon({ name: "coffee", style: "solid" })} /> */}
      </button>
    </div>
  );
};

export default Product;
