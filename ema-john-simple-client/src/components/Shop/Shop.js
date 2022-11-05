import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import {
  addToDb,
  deleteShoppingCart,
  getStoredCart,
} from "../../utilities/fakedb";
import "./Shop.css";
import { Link, useLoaderData } from "react-router-dom";

const Shop = () => {
  // const { products, count } = useLoaderData();
  // console.log(count);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState([]);
  const [cart, setCart] = useState([]);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const pages = Math.ceil(count / size);

  useEffect(() => {
    const url = `http://localhost:5000/products?page=${page}&size=${size}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCount(data.count);
        setProducts(data.products);
      });
  }, [page, size]);

  const clearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  useEffect(() => {
    const storedCart = getStoredCart();
    const savedCart = [];
    const ids = Object.keys(storedCart);
    // console.log(ids);
    // for (const id in storedCart) {
    //   const addedProduct = products.find((product) => product._id === id);
    //   if (addedProduct) {
    //     const quantity = storedCart[id];
    //     addedProduct.quantity = quantity;
    //     // console.log(addedProduct);
    //     savedCart.push(addedProduct);
    //   }
    // }
    // // console.log(savedCart);
    // setCart(savedCart);
    fetch(`http://localhost:5000/productsByIds`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((response) => response.json())
      .then((data) => {
        for (const id in storedCart) {
          const addedProduct = data.find((product) => product._id === id);
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            // console.log(addedProduct);
            savedCart.push(addedProduct);
          }
        }
        // console.log(savedCart);
        setCart(savedCart);
      });
  }, [products]);

  const handleAddToCart = (selectedProduct) => {
    // console.log("Product added to cart", product);
    let newCart = [];
    const exists = cart.find((product) => product._id === selectedProduct._id);
    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter(
        (product) => product._id !== selectedProduct._id
      );
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }
    // newCart = [...cart, selectedProduct];
    setCart(newCart);
    addToDb(selectedProduct._id);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {/* <h2>This is shop: {products.length}</h2> */}
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart} clearCart={clearCart}>
          <Link to="/orders">
            <button>Review Orders</button>
          </Link>
        </Cart>
      </div>
      <div className="pagination">
        <p>selected page : {page}</p>
        {[...Array(pages).keys()].map((number) => (
          <button
            key={number}
            onClick={() => setPage(number)}
            className={page === number ? "selected" : ""}
          >
            {number + 1}
          </button>
        ))}
        <select onChange={(e) => setSize(e.target.value)} name="" id="">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
          <option value="35">35</option>
          <option value="40">40</option>
        </select>
      </div>
    </div>
  );
};

export default Shop;
