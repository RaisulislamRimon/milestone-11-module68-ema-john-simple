import { getStoredCart } from "../utilities/fakedb";

const productsAndCartLoader = async () => {
  // get products data
  const productsData = await fetch("http://localhost:5000/products");
  const products = await productsData.json();

  // get cart
  const savedCart = getStoredCart();
  const initialCart = [];

  for (const id in savedCart) {
    const addedProduct = products.find((product) => product._id === id);
    // console.log(id, addedProduct);
    if (addedProduct) {
      const quantity = savedCart[id];
      //   console.log(id, quantity);
      addedProduct.quantity = quantity;
      initialCart.push(addedProduct);
    }
  }
  return { products, initialCart };

  //   return <div></div>;
};

export default productsAndCartLoader;
