import { ErrorBoundary } from "react-error-boundary";
import Cart from "../components/Cart";
import ProductList from "../components/ProductList";
import { CartProvider } from "../context/CartContext";

function Home() {
  console.log("Home is render");

  return (
    <div className="container mx-auto max-w-2xl">
      <div className="mt-5 flex justify-between gap-5">
        <ErrorBoundary
          fallback={<div>خطا در سبد خرید</div>}
          onError={(e, info) => {
            console.log(e);
            console.log(info);
          }}
        >
          <CartProvider>
            <ProductList />
            <Cart />
          </CartProvider>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default Home;
