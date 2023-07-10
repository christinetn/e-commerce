import axios from 'axios';
import React, { useState, useEffect } from 'react';

import "./Products.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

axios.defaults.withCredentials = true

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const response = await axios.get("http://localhost:8080/products");
            console.log(response.data.data)
            setProducts(response.data.data);
        }
        fetchProducts();
    }, []);

    return (
        <div className="Products">
            <div className="productTable">
                <Container fluid>
                    <Row xs={2} md={3} lg={4} xl={5}>
                        {products.map(item => (
                            <Col key={item._id}>
                                <a href={`/products/${item._id}`}>
                                    <Card className="productCard">
                                        <Card.Img className="productImage" variant="top" src={item.imageURL} />
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Subtitle>{item.subtitle}</Card.Subtitle>
                                            <Card.Text className="itemPrice">${item.price}</Card.Text>
                                            <Card.Text>{item.reviews} reviews</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </a>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Products;
