import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import ErrorPage from "./pages/ErrorPage";

const WelcomePage = lazy(() => import("./pages/WelcomePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const NewJourneyPage = lazy(() => import("./pages/NewJourneyPage"));
const JourneyPage = lazy(() => import("./pages/JourneyPage"));

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route
            path="/"
            element={
              token === undefined || token === null ? (
                <WelcomePage />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="/signup"
            element={
              token === undefined || token === null ? (
                <SignUpPage />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          <Route
            path="/signin"
            element={
              token === undefined || token === null ? (
                <SignInPage />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          {token !== undefined && token !== null ? (
            <Route path="/dashboard">
              <Route index element={<DashboardPage />} />
              <Route path="new" element={<NewJourneyPage />} />
              <Route path=":id" element={<JourneyPage />} />
            </Route>
          ) : (
            <></>
          )}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
