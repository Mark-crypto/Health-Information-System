import { useMutation, useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import AddClients from "../components/AddClients";
import { Search } from "lucide-react";
import { ToastContainer } from "react-toastify";
import UpdateClients from "../components/UpdateClients";
import DeleteClients from "../components/DeleteClients";
import { useState } from "react";

const Clients = () => {
  const [query, setQuery] = useState("");

  const {
    data: clientsData,
    isLoading,
    error,
    refetch: refetchAll,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      return await axiosInstance.get("/clients");
    },
  });

  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
    refetch: refetchSearch,
  } = useQuery({
    queryKey: ["searchClient", query],
    queryFn: async () => {
      return await axiosInstance.get(`clients/search?q=${query}`);
    },
    enabled: false,
  });

  const handleSearch = () => {
    try {
      if (query.trim === "") {
        refetchAll();
      } else {
        refetchSearch();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const displayData = query.trim() === "" ? clientsData : searchData;
  console.log(displayData);
  if (isLoading || searchLoading) {
    return <h1>Loading...</h1>;
  }
  if (error || searchError) {
    return <h1>An error occurred</h1>;
  }
  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="search-clients">
        <input
          type="text"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>
          <Search />
        </button>
      </div>
      <div className="actions-row">
        <div className="explore-programs">
          <Link to="/programs">
            <button>Explore Programs</button>
          </Link>
        </div>
        <div className="add-client">
          <AddClients />
        </div>
      </div>
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
          {displayData?.data?.data?.map((client) => {
            return (
              <tr key={client.client_id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.gender}</td>
                <td>{client.national_id}</td>
                <td>{client.phone}</td>
                <td>
                  <UpdateClients />{" "}
                  <span style={{ marginRight: "10px" }}></span>
                  <DeleteClients id={client.client_id} name={client.name} />
                </td>
                <td>
                  <Link
                    to={`/clients/${client.client_id}`}
                    style={{ textDecoration: "none", fontWeight: "bold" }}
                  >
                    <h5>Visit Profile</h5>
                  </Link>
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
