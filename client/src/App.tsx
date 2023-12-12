import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, Suspense, lazy } from "react";
import LoadingScreen from "./components/LoadingScreen";
import NewJourneyPage from "./pages/NewJourneyPage";
import JourneyPage from "./pages/JourneyPage";
import ErrorPage from "./pages/ErrorPage";

const WelcomePage = lazy(() => import("./pages/WelcomePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route
            path="/"
            element={
              token == undefined ? (
                <WelcomePage />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="/signup"
            element={
              token == undefined ? (
                <SignUpPage />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="/signin"
            element={
              token == undefined ? (
                <SignInPage />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          {token !== undefined && (
            <Route path="/dashboard">
              <Route index element={<DashboardPage />} />
              <Route path="new" element={<NewJourneyPage />} />
              <Route path=":id" element={<JourneyPage />} />
            </Route>
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
