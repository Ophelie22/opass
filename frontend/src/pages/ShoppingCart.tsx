import { useEffect } from "react";
import { useCart } from "../context/cartContext";

const ShoppingCart: React.FC = () => {

  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  useEffect(() => {
    console.log(cart)
  }, [cart])

  // const getTotalPrice = () =>
  //   cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <main className="main">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - {item.price} € x {item.quantity}
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value, 10))
                  }
                />
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          {/* <p>Total: {getTotalPrice()} €</p> */}
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </main>
  )
}

export default ShoppingCart;