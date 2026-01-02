import Cart from "../components/Cart";
import ProductList from "../components/ProductList";
import { CartProvider } from "../context/cartContext";

function Home() {
  console.log("Home is render");

  return (
    <div className="container mx-auto max-w-2xl">
      <div className="flex justify-between gap-5">
        <CartProvider>
          <ProductList />
          <Cart />
        </CartProvider>
      </div>
    </div>
  );
}

export default Home;
