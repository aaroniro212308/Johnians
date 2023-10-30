import { Navigate, Route, Routes } from "react-router-dom";
import MainDashboard from "./admin/Pages/MainDashboard";
import Login from "./admin/Pages/Login";
import NotFound from "./admin/Pages/NotFound";
import Payments from "./admin/Pages/Payments";
import Johnians from "./admin/Pages/Johnians";

function App() {
  const ProtectedRoute = ({ children }) => {
    // Check if the user is authenticated (in your case, checking local storage)
    if (!localStorage.getItem("user")) {
      // If the user is not authenticated, redirect them to the login page
      return <Navigate to="/admin" replace />;
    }

    // If the user is authenticated, render the children components
    return children;
  };
  return (
    <div>
      <Routes>
        {/* Redirect from root to /admin if it's the landing page */}
        <Route path="/*" element={<Navigate to="/admin" replace />} />

        {/* Route for /admin */}
        <Route path="/admin" element={<Login />} />

        {/* Main layout/dashboard route */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              {/* ProtectedRoute checks authentication and renders MainDashboard */}
              <MainDashboard />
            </ProtectedRoute>
          }
        >
          {/* Sub routes which are also protected */}
          <Route
            path="payments"
            element={
              <ProtectedRoute>
                <Payments />
              </ProtectedRoute>
            }
          />
          <Route
            path="johnians"
            element={
              <ProtectedRoute>
                <Johnians />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 404 Not Found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
