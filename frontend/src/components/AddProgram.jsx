import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../axiosInstance";

const schema = z.object({
  name: z.string().min(1, "Enter a valid name"),
  referral: z.string().min(1, "Enter a valid referral"),
  case_manager: z.string().min(1, "Enter a valid case manager"),
});
const AddProgram = () => {
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const queryClient = useQueryClient();

  const { mutate, error, isPending } = useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.post("/programs", data);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      reset();
      setShowAdd(false);
      queryClient.invalidateQueries({ queryKey: ["programs"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema), mode: "onBlur" });

  const submitForm = (data) => {
    try {
      mutate(data);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  if (error) {
    return <h3>Something went wrong</h3>;
  }
  return (
    <>
      <ToastContainer />
      <Button variant="primary" onClick={handleShowAdd}>
        Create New Program
      </Button>

      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Program</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Form.Group className="mb-3">
              <Form.Label>Program Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Full name"
                {...register("name")}
              />
              {errors.name && (
                <p style={{ color: "red" }}>{errors.name.message} </p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Referral</Form.Label>
              <Form.Control
                type="text"
                placeholder="Referral"
                {...register("referral")}
              />
              {errors.referral && (
                <p style={{ color: "red" }}>{errors.referral.message} </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Case Manager</Form.Label>
              <Form.Control
                type="text"
                placeholder="Case manager"
                {...register("case_manager")}
              />
              {errors.case_manager && (
                <p style={{ color: "red" }}>{errors.case_manager.message} </p>
              )}
            </Form.Group>

            <Button variant="success" type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddProgram;
