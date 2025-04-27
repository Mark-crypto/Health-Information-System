import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance";

const schema = z.object({
  name: z.string().min(1, "Provide a valid name"),
  email: z.string().email("Provide a valid email"),
  phone: z
    .string()
    .min(8, "Provide a valid phone number")
    .max(15, "Provide a valid phone number"),
  national_id: z.string().min(1, "Provide a valid ID number"),
  gender: z.string(),
});

const AddClients = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.post("/clients", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      setShow(false);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const submitForm = (data) => {
    try {
      mutate(data);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add New Client
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form onSubmit={handleSubmit(submitForm)}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                {...register("name")}
              />
              {errors.name && (
                <p style={{ color: "red" }}>{errors.name.message} </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email")}
              />
              {errors.email && (
                <p style={{ color: "red" }}>{errors.email.message} </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>National ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter National ID"
                {...register("national_id")}
              />
              {errors.national_id && (
                <p style={{ color: "red" }}>{errors.national_id.message} </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter number"
                {...register("phone")}
              />
              {errors.phone && (
                <p style={{ color: "red" }}>{errors.phone.message} </p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select {...register("gender")}>
                <option>Select client gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Select>
              {errors.gender && (
                <p style={{ color: "red" }}>{errors.gender.message} </p>
              )}
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isPending}>
              {isPending ? "Submitting" : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddClients;
