import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import OrderHistory from "./pages/OrderHistory";

axios.defaults.withCredentials = true

function App() {
	const [products, setProducts] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		async function fetchCartCount() {
			await axios.get('http://localhost:8080/cart/count')
				.then((response) => setCartCount(parseInt(response.data)))
				.catch((error) => console.log(error));
		}
		fetchCartCount();
	}, [cartCount]);

	useEffect(() => {
		async function fetchProducts() {
			const response = await axios.get("http://localhost:8080/products");
			setProducts(response.data.data);
		}
		fetchProducts();
	}, []);

	return (
		<div className="App">
			<Header cartCount={cartCount} />
			<Router>
				<Routes>
					<Route path="/" element={<Home />} exact />
					<Route path="/products" element={<Products />} />
					<Route path="/orderhistory" element={<OrderHistory />} />
					<Route path="/cart" element={<Cart />} />
					{products.map(item => (
						<Route key={item._id} path={`/products/${item._id}`} element={<ProductPage item={item} setCartCount={setCartCount} />} />
					))}
				</Routes>
			</Router>
		</div>
	);
}

export default App;
