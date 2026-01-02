import { useReducer } from "react";

import Cart from "../components/Cart";
import ProductList from "../components/ProductList";
import { CartActionType, cartReducer } from "./cartReducer";

function Home() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  console.log("render Home");

  return (
    <div className="container mx-auto max-w-2xl">
      <div className="flex justify-between gap-5">
        <ProductList dispatch={dispatch} />
        <Cart
          removeFromCart={(item) =>
            dispatch({
              type: CartActionType.REMOVE,
              payload: item,
            })
          }
          cartItems={cart}
          addToCart={(item) =>
            dispatch({ type: CartActionType.ADD, payload: item })
          }
        />
      </div>
    </div>
  );
}

export default Home;
