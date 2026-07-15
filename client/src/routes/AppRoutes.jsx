import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Analytics from "../pages/Analytics/Analytics";
import Transactions from "../pages/Transactions/Transactions";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";


function AppRoutes() {

  const token = localStorage.getItem("token");


  return (

    <Routes>


      {/* Default Route */}

      <Route
        path="/"
        element={
          token 
          ? <Navigate to="/dashboard" />
          : <Navigate to="/login" />
        }
      />



      {/* Auth Routes */}

      <Route
        path="/login"
        element={
          token 
          ? <Navigate to="/dashboard" />
          : <Login />
        }
      />


      <Route
        path="/register"
        element={<Register />}
      />



      {/* Dashboard Route */}

      <Route
        path="/dashboard"
        element={
          token 
          ? <Dashboard />
          : <Navigate to="/login" />
        }
      />

        <Route
  path="/transactions"
  element={

    token
      ? <Transactions />
      : <Navigate to="/login" />
  }
/>

<Route
path="/profile"
element={
 token
 ? <Profile/>
 : <Navigate to="/login"/>
}
/>

<Route
 path="/settings"
 element={
   token
   ? <Settings/>
   : <Navigate to="/login"/>
 }
/>

      <Route
    path="/analytics"
    element={
        token
        ? <Analytics />
        : <Navigate to="/login"/>
    }
/>



    </Routes>

    

  );

}


export default AppRoutes;