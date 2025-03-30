import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import Login from "./pages/Auth/login"
import SignUp from "./pages/Auth/signUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from './context/UserContext';
import {Toaster} from 'react-hot-toast';

const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Root/>}/>
          <Route path='/login' exact element={< Login />}/>
          <Route path='/signUp' exact element={<SignUp/>}/>
          <Route path='/dashboard' exact element={<Home/>}/>
          <Route path='/income' exact element={<Income/>}/>
          <Route path='/Expense' exact element={<Expense/>}/>
        </Routes>
      </Router>
    </div>

    <Toaster 
      toastOptions = {{
        className:"",
        style:{
          fontSize:'13px'
        },
      }}
      />

    </UserProvider>
  );
};

export default App

const Root = () => {
  //check if token exists in local storage
  const isAuthenticated = !!localStorage.getItem("token");

  //redirect to dashboard if authenticated ,otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ): (
    <Navigate to='/login'/>
  );
} 

