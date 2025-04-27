import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import AddClients from "../components/AddClients";
import { Search } from "lucide-react";
import { ToastContainer } from "react-toastify";
import UpdateClients from "../components/UpdateClients";
import DeleteClients from "../components/DeleteClients";
import { useState, useMemo, useEffect } from "react";
import debounce from "lodash/debounce";
import Loading from "../components/Loading";

const Clients = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const {
    data: clientsData,
    isLoading,
    error,
    refetch: refetchAll,
  } = useQuery({
    queryKey: ["clients", page],
    queryFn: async () => {
      return await axiosInstance.get(`/clients?_limit=10&_page=${page}`);
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
      return await axiosInstance.get(`/search?q=${query}`);
    },
    enabled: false,
  });

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        if (value.trim() === "") {
          refetchAll();
        } else {
          refetchSearch();
        }
      }, 300),
    [refetchAll, refetchSearch]
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

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

  if (isLoading || searchLoading) {
    return <Loading />;
  }
  if (error || searchError) {
    toast.error("Something went wrong.");
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
                  <UpdateClients id={client.client_id} />{" "}
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
      <div className="navigation-pages">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page <= 0}
        >
          Previous Page
        </button>
        <div className="current-page">
          Page {page} of {clientsData.data.meta.totalPages}
        </div>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= clientsData.data.meta.totalPages}
        >
          Next Page
        </button>
      </div>
    </>
  );
};
export default Clients;
