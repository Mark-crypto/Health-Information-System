import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axiosInstance from "../axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

const AddRegisteredClients = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: clientsData, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      return await axiosInstance.get("/clients");
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.post(`/programs/${id}/users`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientInProgram"] });
      navigate(`/programs/${id}`);
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  const handleRegister = (data) => {
    try {
      mutate(data);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer />
      <Navbar />

      <Table striped bordered hover style={{ marginTop: "60px" }}>
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
