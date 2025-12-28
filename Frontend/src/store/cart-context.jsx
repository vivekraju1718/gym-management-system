import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const storedCart = localStorage.getItem("cartItems");

const initialState = {
  items: storedCart ? JSON.parse(storedCart) : []
};

function cartReducer(state, action) {
  switch (action.type) {

    case "ADD_TO_CART": {
      const { product, qty } = action.payload;
      const existing = state.items.find(i => i.id === product.id);

      let updated;
      if (existing) {
        updated = state.items.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      } else {
        updated = [...state.items, { ...product, qty }];
      }

      localStorage.setItem("cartItems", JSON.stringify(updated));
      return { items: updated };
    }

    case "DECREASE_QTY": {
      const updated = state.items.map(i =>
        i.id === action.payload
          ? { ...i, qty: Math.max(1, i.qty - 1) }
          : i
      );
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return { items: updated };
    }

    case "REMOVE_ITEM": {
      const updated = state.items.filter(i => i.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return { items: updated };
    }

    case "CLEAR_CART":
      localStorage.removeItem("cartItems");
      return { items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product, qty) =>
    dispatch({ type: "ADD_TO_CART", payload: { product, qty } });

  const decreaseQty = (id) =>
    dispatch({ type: "DECREASE_QTY", payload: id });

  const removeItem = (id) =>
    dispatch({ type: "REMOVE_ITEM", payload: id });

  const clearCart = () =>
    dispatch({ type: "CLEAR_CART" });   // 🔥 EXPORTED NOW

  const cartCount = state.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ 
      ...state, 
      addToCart, 
      decreaseQty, 
      removeItem, 
      clearCart,      // 🔥 available everywhere
      cartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
