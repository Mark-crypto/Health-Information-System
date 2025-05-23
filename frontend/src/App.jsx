import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AddRegisteredClients from "./pages/AddRegisteredClients";
import ClientProfile from "./pages/ClientProfile";
import Clients from "./pages/Clients";
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import RegisterUsers from "./pages/RegisterUsers";
import Reports from "./pages/Reports";
import RequestAccess from "./pages/RequestAccess";
import SingleProgram from "./pages/SingleProgram";
import ViewRequestAccess from "./pages/ViewRequestAccess";
import ErrorPage from "./components/ErrorPage";
import Unauthorized from "./components/Unauthorized";
import SilentRefresh from "./AuthProvider";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/programs/:id/register"
          element={<AddRegisteredClients />}
        />
        <Route path="/clients/:id" element={<ClientProfile />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/home" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/register" element={<RegisterUsers />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reqAccess" element={<RequestAccess />} />
        <Route path="/programs/:id" element={<SingleProgram />} />
        <Route path="/viewReq" element={<ViewRequestAccess />} />
        <Route path="/401" element={<Unauthorized />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <SilentRefresh />
    </>
  );
}

export default App;
