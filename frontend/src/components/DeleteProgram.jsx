import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Trash2 } from "lucide-react";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DeleteProgram = ({ name, id }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/programs/${id}`);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      setShow(false);
      toast.success(data.data.message);
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  const handleDelete = async () => {
    try {
      mutate();
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  if (error) {
    return <h4>Something went wrong</h4>;
  }
  return (
    <>
      <Button variant="success" onClick={handleShow}>
        <Trash2 />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Are you sure you want to delete program {name} ?</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isPending}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DeleteProgram;
