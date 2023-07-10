import "./ProductPage.css";
import { useState } from 'react';
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import axios from 'axios';

const ProductPage = ({ item, setCartCount }) => {
    const [addItem, setAddItem] = useState();

    async function addToCart(productId) {
        await axios.get(`http://localhost:8080/cart/add/${productId}`)
            .then((response) => setAddItem(response.data))
            .then(() => setCartCount())
            .then(() => console.log(`Added ${item.name} to cart.`))
            .catch((error) => console.log(error));
    }

    return (
        <div className="ProductPage">
            <Image className="image" src={item.imageURL} />
            <div className="description">
                <h1>{item.name}</h1>
                <h5>{item.subtitle}</h5>
                <br />
                <h2>${item.price}</h2>
                <h6>{item.reviews} reviews</h6>
                <br />
                <div className="details">
                    {item.description.map((line, key) => (
                        <div key={key + Math.random()}>{line}</div>
                    ))}
                </div>
                <br />
                <Button variant="primary" onClick={() => addToCart(item._id)}>Add to Cart</Button>
                <div>{addItem}</div>
            </div>
        </div >
    )
}

export default ProductPage;