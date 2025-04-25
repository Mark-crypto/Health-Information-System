import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Clients = () => {
  const {
    data: clientsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: () => {
      return axios.get("http://localhost:5000/api/clients");
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
      <button>Explore Programs</button>
      <button>Add a client</button>
      <h4>Search for clients</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email Address</th>
            <th>Gender</th>
            <th>National ID</th>
            <th>Phone</th>
            <th>Actions</th>
            <th>Links</th>
          </tr>
        </thead>
        <tbody>
          {clientsData?.data?.data?.map((client) => {
            return (
              <tr key={client.client_id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.gender}</td>
                <td>{client.national_id}</td>
                <td>{client.phone}</td>
                <td>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </td>
                <td>
                  <Link to={`/clients/${client.client_id}`}>Visit Profile</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
export default Clients;
