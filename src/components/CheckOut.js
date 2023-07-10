import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import "./CheckOut.css";

const CheckOut = ({cartContents, subtotal}) => {
    const [validated, setValidated] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [card, setCard] = useState('');
    const [cvc, setCvc] = useState('');
    const [shipping, setShipping] = useState('');

    function handleSubmit(event) {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        const orderDetails = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            zip: zip,
            card: card,
            cvc: cvc,
            shipping: shipping,
            cartContents: cartContents,
            subtotal: subtotal,
            id: Math.floor(Math.random())
        }

        axios.post('http://localhost:8080/cart/submit', orderDetails)
            .then((response) => console.log(response.data))
            .then((error) => console.log(error));
        axios.get('http://localhost:8080/cart/clear');

        setValidated(true);

        window.location.href(`http://localhost:8080/order/${orderDetails.id}`)
    };

    return (
        <div className="formContainer">
            <Form validated={validated} onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control required type="name" placeholder="First" onChange={(event) => setFirstName(event.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control required type="name" placeholder="Last" onChange={(event) => setLastName(event.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control required type="email" placeholder="email@example.com" onChange={(event) => setEmail(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control required type="tel" pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}" placeholder="XXX-XXX-XXXX" onChange={(event) => setPhone(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Shipping Address</Form.Label>
                    <Form.Control required type="address" placeholder="Address Line 1" onChange={(event) => setAddress1(event.target.value)} />
                    <Form.Control type="address" placeholder="Address Line 2" onChange={(event) => setAddress2(event.target.value)} />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control required type="text" placeholder="City" onChange={(event) => setCity(event.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control required type="text" placeholder="State" onChange={(event) => setState(event.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control required type="text" pattern="[0-9]{5}" placeholder="Zip code" onChange={(event) => setZip(event.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group>
                    <Form.Label>Card number</Form.Label>
                    <Form.Control required type="text" pattern="[0-9]{15,16}" placeholder="Card number" onChange={(event) => setCard(event.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Security code</Form.Label>
                    <Form.Control required type="text" pattern="[0-9]{3,4}" placeholder="CVC" onChange={(event) => setCvc(event.target.value)} />
                </Form.Group>
                <br />
                <Form.Select required onChange={(event) => setShipping(event.target.value)}>
                    <option>---Select shipping method---</option>
                    <option>Overnight</option>
                    <option>2-days expedited</option>
                    <option>6-days ground</option>
                </Form.Select>

                <br />
                <Button type="submit" variant="dark" sz="lg">Submit</Button>
            </Form>
        </div>
    )
}

export default CheckOut;
