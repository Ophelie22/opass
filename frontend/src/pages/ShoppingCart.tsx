import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const ShoppingCart: React.FC = () => {
	const url = import.meta.env.VITE_API_URL;
	const { cart, removeFromCart, updateQuantity, clearCart, createOrder } =
		useCart();
	const { isAuthenticated } = useAuth();
	const [userId, setUserId] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const getTotalPrice = () =>
		cart.reduce((total, item) => total + item.price * item.quantity, 0);

	const handleOrder = async (userId: string) => {
		try {
			await createOrder(userId);
		} catch (error) {
			console.error("Failed to create order:", error);
		}
	};

	const getConnectedUserInfos = () => {
		fetch(`${url}/auth/me`, {
			method: "GET",
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => {
				setUserId(data.user.id.toString());        
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	useEffect(() => {
		if (isAuthenticated === false) {
			navigate("/connexion");
		} else {
			getConnectedUserInfos();
      console.log(cart)
		}
	}, [isAuthenticated]);

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
					<p>Total: {getTotalPrice()} €</p>
					<button onClick={clearCart}>Clear Cart</button>
					<button onClick={() => handleOrder(userId)}>Commander</button>
				</>
			)}
		</main>
	);
};

export default ShoppingCart;
