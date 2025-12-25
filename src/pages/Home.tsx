import { useState } from "react";

import Cart from "../components/Cart";
import ProductList from "../components/ProductList";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

function Home() {
  const [cartItems, setCartItems] = useState<
    { product: Product; count: number }[]
  >([]);

  const handleAddToCart = (item: Product) => {
    const index = cartItems.findIndex(
      (cartItem) => cartItem.product.id === item.id
    );
    if (index === -1) {
      setCartItems([...cartItems, { product: item, count: 1 }]);
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.product.id === item.id
            ? { product: item, count: cartItem.count + 1 }
            : cartItem
        )
      );
    }
  };
  const handleDeleteProductFromCart = (item: Product) => {
    setCartItems(
      cartItems.filter((cartItem) => cartItem.product.id !== item.id)
    );
  };
  return (
    <div
      style={{
        width: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "25px",
        }}
      >
        <ProductList addToCart={handleAddToCart} />
        <Cart
          removeFromCart={handleDeleteProductFromCart}
          cartItems={cartItems}
          addToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}

export default Home;
