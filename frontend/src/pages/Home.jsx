import Navbar from "../components/Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-cards">
        <div className="home-card">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Link to="/programs">
                <Button variant="primary">Programs</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        <div className="home-card">
          {" "}
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Link to="/clients">
                <Button variant="primary">Clients</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
        <div className="home-card">
          {" "}
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Link to="/reports">
                <Button variant="primary">Reports</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};
export default Home;
