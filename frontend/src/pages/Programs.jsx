import Navbar from "../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Loading from "../components/Loading";
import AddProgram from "../components/AddProgram";
import DeleteProgram from "../components/DeleteProgram";
import { ToastContainer } from "react-toastify";

const Programs = () => {
  const {
    data: programData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["programs"],
    queryFn: async () => {
      return await axiosInstance.get("/programs");
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    toast.error("Something went wrong.");
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="add-btn">
        <AddProgram />
      </div>
      <div className="programs">
        {programData?.data?.data?.map((program) => {
          return (
            <div key={program.program_id}>
              <Link to={`/programs/${program.program_id}`}>
                <h4
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {program.name}
                </h4>
              </Link>

              <p>Managed by: {program.case_manager}</p>
              <DeleteProgram name={program.name} id={program.program_id} />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Programs;
