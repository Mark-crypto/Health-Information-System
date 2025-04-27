import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => {
      return axiosInstance.post("/logout", {});
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  const handleLogout = () => {
    try {
      mutate();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  if (error) {
    return <h4>An error occurred</h4>;
  }
  return (
    <>
      <ToastContainer />
      <div className="navbar">
        <h4>
          <Link to="/home">HUDUMA BORA CENTER</Link>
        </h4>
        <h4>
          <Link to="/register">REGISTER USERS</Link>
        </h4>
        <h4>
          <Link to="/viewReq">VIEW ACCESS REQUESTS</Link>
        </h4>
        <Link>
          <button onClick={handleLogout} disabled={isPending}>
            Logout
          </button>
        </Link>
      </div>
    </>
  );
};
export default Navbar;
