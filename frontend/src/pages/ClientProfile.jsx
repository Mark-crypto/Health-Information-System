import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

const ClientProfile = () => {
  const { id } = useParams();
  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      return axios.get(`http://localhost:5000/api/clients/${id}`);
    },
  });
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>An error occurred</h1>;
  }

  return (
    <>
      <Navbar />
      <div>
        <h4>Welcome, {profileData.data.data.name}</h4>
        <h4>Email:{profileData.data.data.email}</h4>
        <h4>Gender:{profileData.data.data.gender}</h4>
        <h4>Number:{profileData.data.data.phone}</h4>
        <h4>Status:{profileData.data.data.status}</h4>
      </div>
    </>
  );
};
export default ClientProfile;
