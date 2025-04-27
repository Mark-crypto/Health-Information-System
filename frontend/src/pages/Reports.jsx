import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import BarGraph from "../components/BarGraph";
import axiosInstance from "../axiosInstance";

const Reports = () => {
  const {
    data: reports,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: () => {
      return axiosInstance.get("/reports");
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
      <div className="report-page">
        <div className="report-cards">
          <div className="report-card">
            <h4>Active Programs</h4>
            <p>{reports.data.data.programData[0].total}</p>
          </div>
          <div className="report-card">
            <h4>Total Clients</h4>
            <p>{reports.data.data.clientData[0].total}</p>
          </div>
        </div>

        <div className="bar-graph">
          <BarGraph barData={reports.data.data} />
        </div>
      </div>
    </>
  );
};
export default Reports;
