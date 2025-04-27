import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { User } from "lucide-react";
import axiosInstance from "../axiosInstance";

const ClientProfile = () => {
  const { id } = useParams();
  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return await axiosInstance.get(`/clients/${id}`);
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
      <div className="profile-card">
        <div className="profile-icon">
          <User size={80} color="#4caf50" strokeWidth={1.5} />
        </div>
        <div className="profile-details">
          <h2>Welcome, {profileData.data.data.name}</h2>
          <p>
            <strong>Email:</strong> {profileData.data.data.email}
          </p>
          <p>
            <strong>Gender:</strong> {profileData.data.data.gender}
          </p>
          <p>
            <strong>Phone:</strong> {profileData.data.data.phone}
          </p>
          <p>
            <strong>Status:</strong> {profileData.data.data.status}
          </p>
        </div>
      </div>
    </>
  );
};
export default ClientProfile;
