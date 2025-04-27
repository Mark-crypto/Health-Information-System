import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const redirectLogin = () => {
    navigate("/");
  };

  return (
    <div className="error-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Something went wrong. Come back later to try again.</p>
      <button onClick={redirectLogin}>Back to Login</button>
    </div>
  );
};

export default ErrorPage;
