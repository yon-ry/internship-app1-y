import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AttendanceSheet from "./AttendanceSheet.tsx";
import AttendanceInput from "./AttendanceInput.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/attendancesheet", element: <AttendanceSheet /> },
  { path: "/attendanceinput", element: <AttendanceInput /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
