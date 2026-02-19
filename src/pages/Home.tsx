import { ErrorBoundary } from "react-error-boundary";
import Cart from "../components/Cart";
import ProductList from "../components/ProductList";
import { CartProvider } from "../context/CartContext";
import { Container } from "@mui/material";

function Home() {
  console.log("Home is render");

  return (
    <Container maxWidth="md">
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
    </Container>
  );
}

export default Home;
