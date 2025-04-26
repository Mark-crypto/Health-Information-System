import Navbar from "../components/Navbar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Programs = () => {
  const {
    data: programData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["programs"],
    queryFn: () => {
      return axios.get("http://localhost:5000/api/programs");
    },
  });
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>An error occurred</h1>;
  }

  return (
    <>
      <Navbar />
      <h3>Search for programs</h3>
      <button>Add Programs</button>
      <div>
        {programData?.data?.data?.map((program) => {
          return (
            <div key={program.program_id}>
              <Link to={`/programs/${program.program_id}`}>
                <h4>{program.name}</h4>
              </Link>

              <p>Managed by: {program.case_manager}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Programs;
