import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";

const RequestAccess = () => {
  const submitForm = (data) => {
    console.log(data);
  };
  return (
    <>
      <Form onSubmit={submitForm}>
        <InputGroup className="mb-3">
          <InputGroup.Text>First and last name</InputGroup.Text>
          <Form.Control aria-label="First name" />
          <Form.Control aria-label="Last name" />
        </InputGroup>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="phone" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Reason</Form.Label>
          <textarea name="" id=""></textarea>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
export default RequestAccess;
