import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Layout from "./Components/Layout";
import { AppProvider } from "./context/AppContext";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Components/Dashboard";
import UserDetail from "./Components/UserDetail";
import CreateUser from "./Components/CreateUser";

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Toaster />
        <Routes>
          <Route index element={<Login />} />
          <Route element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users/create" element={<CreateUser />} />
            <Route path="users/:userid" element={<UserDetail />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
