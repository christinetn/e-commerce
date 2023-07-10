import './Cart.css';
import { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import CheckOut from '../components/CheckOut';

import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [removeItem, setRemoveItem] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        async function fetchCart() {
            await axios.get("http://localhost:8080/cart")
                .then((response) => setCartItems(response.data))
                .catch((error) => console.log(error))
        }

        async function fetchSubtotal() {
            await axios.get("http://localhost:8080/cart/subtotal")
                .then((response) => setSubtotal(response.data))
                .catch((error) => console.log(error))
        }

        fetchCart();
        fetchSubtotal();
    }, []);

    async function removeFromCart(productId) {
        await axios.get(`http://localhost:8080/cart/remove/${productId}`)
            .then((response) => setRemoveItem(response.data))
            .then(() => window.location.reload())
            .catch((error) => console.log(error));
    }

    //console.log(cartItems);

    return (
        <div className='shoppingCart'>
            <h1 className='cartTitle'>My Cart</h1>
            <br></br>
            <div className="cartPage">
                <ListGroup className="cartItems">
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.product._id}>
                            <Row>
                                <Col>
                                    <Image fluid rounded src={item.product.imageURL} />
                                </Col>
                                <Col>
                                    <h5>{item.product.name}</h5>
                                </Col>
                                <Col>
                                    <div>Count: {item.quantity}</div>
                                </Col>
                                <Col>
                                    <h5>${item.price.toFixed(2)}</h5>
                                </Col>
                                <Col>
                                    <Button variant="danger" onClick={() => removeFromCart(item.product._id)}>Remove</Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <div className="orderTotal">
                    <h4>ORDER SUMMARY</h4>
                    <br></br>
                    <Container>
                        <Row>
                            <Col xs><h5>Shipping: </h5></Col>
                            <Col xs><h5>$0.00</h5></Col>
                        </Row>
                        <Row>
                            <Col xs><h5>Total: </h5></Col>
                            <Col xs><h5>${subtotal.toFixed(2)} </h5></Col>
                        </Row>
                        <Row>
                            <div>{removeItem}</div>
                        </Row>
                        <br></br>
                        <Button variant="primary" onClick={handleShow}>CHECKOUT</Button>
                    </Container>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Checkout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CheckOut cartContents={cartItems} subtotal={subtotal}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Cart;