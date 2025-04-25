import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";

const SingleProgram = () => {
  const { id } = useParams();
  const {
    data: clientData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["clientInProgram"],
    queryFn: () => {
      return axios.get(`http://localhost:5000/api/programs/${id}/users`);
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
      <button>Add Clients</button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email Address</th>
            <th>Gender</th>
            <th>National ID</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {clientData?.data?.data?.map((client) => {
            return (
              <tr key={client.client_id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.gender}</td>
                <td>{client.national_id}</td>
                <td>{client.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
export default SingleProgram;
