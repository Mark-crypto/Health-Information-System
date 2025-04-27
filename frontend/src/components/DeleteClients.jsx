import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";

const DeleteClients = ({ id, name }) => {
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      return await axiosInstance.delete(`/clients/${id}`);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      setShow(false);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  const handleDelete = () => {
    try {
      mutate();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (error) {
    return <h4>Something went wrong.</h4>;
  }
  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        <Trash2 />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure you want to delete client {name}?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DeleteClients;
