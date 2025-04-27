import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import axiosInstance from "../axiosInstance";

const schema = z
  .object({
    name: z.string().min(1, "Provide a valid name"),
    email: z.string().email("Provide a valid email address"),
    password: z
      .string()
      .min(8, "Password should be at least 8 characters long."),
    confirmPassword: z
      .string()
      .min(8, "Password should be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const RegisterUsers = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.post("/register", data);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      reset();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const submitForm = (data) => {
    try {
      mutate(data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  if (error) {
    console.log(error);
    return <h4>Something went wrong</h4>;
  }
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Form onSubmit={handleSubmit(submitForm)} className="register-form">
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message} </p>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword.message} </p>
          )}
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </>
  );
};
export default RegisterUsers;
