import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import StarRating from '../components/StarRating';
import axios from 'axios';

function OrderHistory() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            await axios.get('http://localhost:8080/orders')
                .then((response) => setOrders(response.data.data))
                .catch((error) => console.log(error));
        }
        fetchOrders()
    }, []);

    return (
        <Container>
            <h1>Order History</h1>
            <ListGroup className="">
                {orders.map(order => (
                    <ListGroup.Item key={order._id}>
                        <Row>
                            <Col>
                                {order.cartContents.map(product => (
                                    <ListGroup.Item key={product.product._id}>{product.quantity}x {product.product.name}</ListGroup.Item>
                                ))}
                            </Col>
                            <Col>
                                <h6>{order.firstName} {order.lastName}</h6>
                                <div>Email: {order.email}</div>
                                <div>Phone: {order.phone}</div>
                            </Col>
                            <Col>
                                <h6>Shipping Address:</h6>
                                <div>{order.address1} {order.address2}</div>
                                <div>{order.city}, {order.state} {order.zip}</div>
                            </Col>
                            <Col>
                                <h6>Subtotal:</h6>
                                <div>${order.subtotal.toFixed(2)}</div>
                                <br />
                                <h6>Shipping:</h6>
                                <div>{order.shipping}</div>
                            </Col>
                            <Col>
                                <StarRating />
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default OrderHistory;