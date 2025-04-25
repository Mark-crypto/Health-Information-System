import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";

const Reports = () => {
  const {
    data: reports,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: () => {
      return axios.get("http://localhost:5000/api/reports");
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
      <div>
        <div>
          <h4>Programs:{reports.data.data.programData[0].total}</h4>
        </div>
        <div>
          <h4>HIV programs:{reports.data.data.programData[0].hiv_count}</h4>
        </div>
        <div>
          <h4>
            Malaria programs:{reports.data.data.programData[0].malaria_count}
          </h4>
        </div>
        <div>
          <h4>
            Tuberculosis programs:{reports.data.data.programData[0].tb_count}
          </h4>
        </div>
        <div>
          <h4>Total clients:{reports.data.data.clientData[0].total}</h4>
        </div>
      </div>
    </>
  );
};
export default Reports;
