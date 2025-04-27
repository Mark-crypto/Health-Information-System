import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";

const schema = z.object({
  name: z.string().min(1, "Enter a valid name"),
  email: z.string().email("Provide a valid email"),
  phone: z
    .string()
    .min(10, "Provide a valid phone number")
    .max(15, "Number cannot exceed 15 digits"),
  reason: z.string().min(1, "Provide a valid reason"),
});

const RequestAccess = () => {
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data) => {
      return axiosInstance.post("/request-access", data);
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      reset();
      setTimeout(() => {
        navigate("/");
      }, 3000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
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
    return <ErrorPage />;
  }
  return (
    <>
      <ToastContainer />
      <div className="req-access">
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
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="phone"
              {...register("phone")}
            />
            {errors.phone && (
              <p style={{ color: "red" }}>{errors.phone.message} </p>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Reason</Form.Label>
            <textarea name="" id="" {...register("reason")}></textarea>
            {errors.reason && (
              <p style={{ color: "red" }}>{errors.reason.message} </p>
            )}
          </Form.Group>
          <button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </Form>
      </div>
    </>
  );
};
export default RequestAccess;
