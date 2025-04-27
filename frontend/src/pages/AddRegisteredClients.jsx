import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axiosInstance from "../axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const AddRegisteredClients = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    data: clientsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      return await axiosInstance.get("/clients");
    },
  });

  const {
    mutate,
    isPending,
    error: mutateError,
  } = useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.post(`/programs/${id}/users`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientInProgram"] });
      navigate(`/programs/${id}`);
    },
  });

  const handleRegister = (data) => {
    try {
      mutate(data);
    } catch (error) {}
  };
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error || mutateError) {
    return <h1>An error occurred</h1>;
  }
  return (
    <>
      <ToastContainer />
      <Navbar />
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
                  <Button
                    variant="success"
                    onClick={() =>
                      handleRegister({ clientId: client.client_id })
                    }
                    disabled={isPending}
                  >
                    Register to Program
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
export default AddRegisteredClients;
