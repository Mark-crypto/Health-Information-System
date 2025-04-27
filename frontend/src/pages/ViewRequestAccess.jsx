import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import Table from "react-bootstrap/Table";
import axiosInstance from "../axiosInstance";
import Loading from "../components/Loading";
import { toast, ToastContainer } from "react-toastify";

const ViewRequestAccess = () => {
  const {
    data: access,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["requestAccess"],
    queryFn: async () => {
      return await axiosInstance.get("/request-access");
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    toast.error("Something went wrong");
  }
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Table striped bordered hover style={{ marginTop: "60px" }}>
        <thead>
          <tr>
            <th>Fullname</th>
            <th>Email Address</th>
            <th>Phone</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {access?.data?.data?.map((request) => {
            return (
              <tr key={request.request_id}>
                <td>{request.name}</td>
                <td>{request.email}</td>
                <td>{request.phone}</td>
                <td>{request.reason}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
export default ViewRequestAccess;
