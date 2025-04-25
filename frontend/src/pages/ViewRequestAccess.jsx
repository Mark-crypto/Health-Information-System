import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import Table from "react-bootstrap/Table";

const ViewRequestAccess = () => {
  const {
    data: access,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["requestAccess"],
    queryFn: () => {
      return axios.get("http://localhost:5000/api/request-access");
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
      <Table striped bordered hover>
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
