import Navbar from "../components/Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Briefcase, Users, FileText } from "lucide-react";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-cards">
        <div className="home-card">
          <Card>
            <div className="card-icon">
              <Briefcase size={48} color="#2e7d32" />
            </div>
            <Card.Body>
              <Card.Title>Programs</Card.Title>
              <Card.Text>Create and Manage all programs here.</Card.Text>
              <Link to="/programs">
                <Button variant="primary">Programs</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>

        <div className="home-card">
          <Card>
            <div className="card-icon">
              <Users size={48} color="#2e7d32" />
            </div>
            <Card.Body>
              <Card.Title>Clients</Card.Title>
              <Card.Text>View and register client in the system .</Card.Text>
              <Link to="/clients">
                <Button variant="primary">Clients</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>

        <div className="home-card">
          <Card>
            <div className="card-icon">
              <FileText size={48} color="#2e7d32" />
            </div>
            <Card.Body>
              <Card.Title>Reports</Card.Title>
              <Card.Text>Access detailed reports and summaries.</Card.Text>
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
