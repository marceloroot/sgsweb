import React from 'react';
import Header from "../../components/header"
import Sidebar from "../../components/sidebar";

const Login = () =>{
    return (
        <>
        <div className="container-fluid h-100">
            <div className="row h-100">
              <Header />
              <Sidebar />
              <h1>Login</h1>
            </div>
        </div>
      
        </>
    )
}

export default Login;