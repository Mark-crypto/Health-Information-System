import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "../axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FilePenLine } from "lucide-react";
import Loading from "./Loading";

const schema = z.object({
  name: z.string().min(1, "Provide valid name"),
  email: z.string().email("Provide a valid email"),
  gender: z.string().min(1, "Provide a valid gender"),
  national_id: z.number().min(1, "Provide a valid ID number"),
  phone: z.string().min(8, "Provide a valid phone number"),
});

const UpdateClients = ({ id }) => {
  const [show, setShow] = useState(false);

  const queryClient = useQueryClient();
  const { data: clientData, isLoading } = useQuery({
    queryKey: ["updateClients", id],
    queryFn: async () => {
      return await axiosInstance.get(`/clients/${id}`);
    },
    enabled: !!id,
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      return axiosInstance.put(`/clients/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      reset();
      setShow(false);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (clientData?.data?.data) {
      reset(clientData.data.data);
    }
  }, [clientData, reset]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitForm = (data) => {
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
      <Button variant="primary" onClick={handleShow}>
        <FilePenLine />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form onSubmit={handleSubmit(submitForm)}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter fullname"
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
                placeholder="Enter national id"
                {...register("national_id")}
                disabled={true}
              />
              {errors.national_id && (
                <p style={{ color: "red" }}>{errors.national_id.message} </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter gender"
                {...register("gender")}
                disabled={true}
              />
              {errors.gender && (
                <p style={{ color: "red" }}>{errors.gender.message} </p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                {...register("phone")}
              />
              {errors.phone && (
                <p style={{ color: "red" }}>{errors.phone.message} </p>
              )}
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isPending}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default UpdateClients;
