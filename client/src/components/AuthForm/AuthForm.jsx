import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaUser
} from "react-icons/fa";

import API from "../../services/api";
import "./AuthForm.css";


function AuthForm({ type }) {


  const [showPassword, setShowPassword] = useState(false);


  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:""
  });


  const [loading, setLoading] = useState(false);



  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };



  const handleSubmit = async(e)=>{

    e.preventDefault();

    setLoading(true);


    try{


      const url =
        type === "login"
        ? "/auth/login"
        : "/auth/register";



      const res = await API.post(url, formData);



      console.log("AUTH RESPONSE:", res.data);



      localStorage.setItem(
        "token",
        res.data.token
      );


      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );



      toast.success(
 type === "login"
 ? "Login Successful"
 : "Registration Successful"
);



      window.location.href="/dashboard";



    }
    catch(err){


      console.log("AUTH ERROR:",err);


      alert(
        err.response?.data?.message ||
        "Something went wrong"
      );


    }



    setLoading(false);


  };



  return (

    <div className="auth-container">


      <div className="auth-card">


        <h2>

          {
            type==="login"
            ? "Welcome Back 👋"
            : "Create Account"
          }

        </h2>



        <p>

          {
            type==="login"
            ? "Login to continue"
            : "Create your new account"
          }

        </p>




        <form onSubmit={handleSubmit}>



          {
            type==="register" && (

              <div className="input-group">

                <FaUser className="icon"/>


                <input

                  type="text"

                  name="name"

                  placeholder="Full Name"

                  value={formData.name}

                  onChange={handleChange}

                  required

                />

              </div>

            )
          }





          <div className="input-group">


            <FaEnvelope className="icon"/>


            <input

              type="email"

              name="email"

              placeholder="Email Address"

              value={formData.email}

              onChange={handleChange}

              required

            />


          </div>





          <div className="input-group">


            <FaLock className="icon"/>


            <input

              type={
                showPassword
                ? "text"
                : "password"
              }

              name="password"

              placeholder="Password"

              value={formData.password}

              onChange={handleChange}

              required

            />



            <span

              className="eye"

              onClick={()=>
                setShowPassword(!showPassword)
              }

            >

              {
                showPassword
                ?
                <FaEyeSlash/>
                :
                <FaEye/>
              }

            </span>


          </div>





          <button

            className="auth-btn"

            type="submit"

            disabled={loading}

          >

            {
              loading
              ?
              "Please Wait..."
              :
              type==="login"
              ?
              "Login"
              :
              "Sign Up"
            }


          </button>




        </form>





        <div className="bottom-text">


          {
            type==="login"

            ?

            <>
              Don't have an account?{" "}

              <Link to="/register">
                Sign Up
              </Link>
            </>


            :

            <>

              Already have an account?{" "}

              <Link to="/login">
                Login
              </Link>

            </>

          }


        </div>



      </div>


    </div>

  );

}


export default AuthForm;