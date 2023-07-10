import "./Home.css";
import Button from "react-bootstrap/Button";

const Home = () => {
    return (
        <div className="Home">
            <div className="bg" />
            <div className="title">
                <h1>Bootleg MrBeast!</h1>
                <h3>Welcome to our totally legit store.</h3>
                <p>
                    Not an official retailer of MrBeast's Feastables.
                    <br />
                    This is 99.98% not a scam. Source: trust me bro.
                    <br />
                    We hope you'll enjoy our (not fake!) products.
                </p>
                <h5>MISSION</h5>
                <h6>We are on a mission to resell to change how you snack!  </h6>
                <h6>Our tasty snacks have organic ingredients, contain no artificial ingredients, and are approved by experts! </h6>
            </div>
            <div className="shopButton">
                <Button variant="dark" size="lg" href="/products">¡¡¡SHOP OUR PRODUCTS NOW!!! OR ELSE.</Button>
            </div>
        </div>
    );
}

export default Home;