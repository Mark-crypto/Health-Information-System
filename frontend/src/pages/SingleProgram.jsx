import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../components/Loading";

const SingleProgram = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: clientData, isLoading } = useQuery({
    queryKey: ["clientInProgram"],
    queryFn: async () => {
      return await axiosInstance.get(`/programs/${id}/users`);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const userId = data.clientId;
      return await axiosInstance.delete(`/programs/${id}/users/${userId}`);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["clientInProgram"] });
      toast.success(data.data.message);
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });
  const handleDelete = (data) => {
    try {
      mutate(data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="add-client-btn">
        <Link to={`/programs/${id}/register`}>
          <button>Add Clients</button>
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email Address</th>
            <th>Gender</th>
            <th>National ID</th>
            <th>Phone</th>
            <th>Action</th>
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
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete({ clientId: client.client_id })}
                    disabled={isPending}
                  >
                    <Trash2 />
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
export default SingleProgram;
