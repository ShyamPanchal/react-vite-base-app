import { Outlet, Route, Routes } from "react-router-dom";
import { NotFoundPage } from "../../pages/NotFound";
import CreatePPMPage from "./PPM/pages/create";

function OperationsHomePage() {
  return (
    <>
      <Routes>
        <Route path="/ppms" element={<CreatePPMPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Outlet />
    </>
  );
}

export default OperationsHomePage;
