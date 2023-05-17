import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "../modules/dashboard/pages";
import OperationsHomePage from "../modules/operations";
import LoginPage from "../modules/settings/pages/index";
import { selectAccessToken } from "../modules/settings/services/selectors";
import tbTheme from "../utils/theme";
import { NotFoundPage } from "./NotFound";

export const BASE_PATH = "";

function App() {
  const isLoggedIn: boolean = useSelector(selectAccessToken) !== undefined;

  return (
    <BrowserRouter basename={BASE_PATH}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={tbTheme}>
        <Notifications />
        {isLoggedIn ? (
          <Routes>
            <Route path='/' element={<DashboardPage />} />
            <Route path="/operations/*" element={<OperationsHomePage />} />
            <Route path="*" element={<NotFoundPage />} />
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
