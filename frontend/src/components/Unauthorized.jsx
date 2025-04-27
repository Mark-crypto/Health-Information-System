import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>401 - Unauthorized</h1>
      <p>You are not authorized to access this page.</p>
      <Link to="/">
        <button style={{ marginTop: "20px", padding: "10px 20px" }}>
          Go to Login
        </button>
      </Link>
    </div>
  );
};

export default Unauthorized;
