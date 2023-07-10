import './Header.css';
import { Container, Navbar, Nav } from 'react-bootstrap';

const Header = ({ cartCount }) => {

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='Header'>
            <Container>
                <Navbar.Brand>MrBeef</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/products">Products</Nav.Link>
                        <Nav.Link href="/orderhistory">Order History</Nav.Link>
                    </Nav>

                    <Nav>
                        <Nav.Link href="/cart" className='justify-content-end'>Shopping Cart ({cartCount})</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;