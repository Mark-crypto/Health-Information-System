import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance.js";
import ErrorPage from "../components/ErrorPage.jsx";

const schema = z.object({
  email: z.string().email("Provide a valid email"),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const { mutate, error, isPending } = useMutation({
    mutationFn: (data) => {
      return axiosInstance.post("/login", data);
    },
    onSuccess: () => {
      reset();
      navigate("/home");
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
    return <ErrorPage />;
  }
  return (
    <>
      <ToastContainer />
      <div className="login">
        <Form onSubmit={handleSubmit(submitForm)}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              {...register("email")}
              type="email"
              placeholder="Enter email"
            />
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message} </p>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
          </Form.Group>
          <button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </Form>
        <Link to="/reqAccess">
          <h1>Request System Access</h1>
        </Link>
      </div>
    </>
  );
};
export default Login;
