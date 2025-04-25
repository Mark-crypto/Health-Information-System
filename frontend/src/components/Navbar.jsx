import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <h4>
          <Link to="/home">HUDUMA BORA CENTER</Link>
        </h4>
        <Link to="/register">
          <h4>Register Users</h4>
        </Link>
        <Link to="/viewReq">
          <h4>View Access Requests</h4>
        </Link>
      </div>
    </>
  );
};
export default Navbar;
