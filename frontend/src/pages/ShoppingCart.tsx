import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const ShoppingCart: React.FC = () => {
  const url = import.meta.env.VITE_API_URL;
  const { cart, removeFromCart, updateQuantity, clearCart, createOrder } =
    useCart();
  const { isAuthenticated, user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const userId = user?.id

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleOrder = async (userId: string) => {
    try {
      await createOrder(userId);
      alert("Commande effectuée avec succès !");
      clearCart();
    } catch (error) {
      console.error("Failed to create order:", error);
      setError("Impossible de passer la commande. Réessayez plus tard.");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/connexion");
    }
  }, [isAuthenticated]);

  return (
    <main className="main px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">Votre Panier</h1>

      {error && (
        <div className="text-red-600 text-center mb-4">{error}</div>
      )}

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Votre panier est vide.</p>
      ) : (
        <div className="w-full max-w-3xl mx-auto space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-300 pb-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Prix unitaire : {item.price} €
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  className="w-16 text-center border border-gray-300 rounded"
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value, 10))
                  }
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col items-end">
            <p className="text-xl font-bold">Total : {getTotalPrice().toFixed(2)} €</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Vider le panier
              </button>
              <button
                onClick={() => handleOrder(userId!)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Commander
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ShoppingCart;