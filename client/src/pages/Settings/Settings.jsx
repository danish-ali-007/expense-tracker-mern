import MainLayout from "../../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import "./Settings.css";
import { useState } from "react";
import toast from "react-hot-toast";


function Settings(){

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

const [password, setPassword] = useState({
  newPassword: "",
  confirmPassword: "",
});


  const logout = ()=>{

    localStorage.clear();

    navigate("/login");

  };

  const changePassword = () => {

  if (password.newPassword === "" || password.confirmPassword === "") {
    toast.error("Fill all fields");
    return;
  }

  if (password.newPassword !== password.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  toast.success("Password Changed Successfully");

  setPassword({
    newPassword: "",
    confirmPassword: "",
  });

  setShowPassword(false);

};



  return(

    <MainLayout>


      <div className="settings-page">


        <h1>Settings</h1>



        <div className="settings-card">


          <h2>
            Account Settings
          </h2>



          <div className="setting-item">

            <div>
              <h3>Profile</h3>
              <p>
                Manage your account information
              </p>
            </div>

            <button
              onClick={()=>navigate("/profile")}
            >
              View Profile
            </button>

          </div>





          <div className="setting-item">


            <div>

              <h3>
                Password
              </h3>

              <p>
                Change your password
              </p>

            </div>


            <button
  onClick={() => setShowPassword(!showPassword)}
>
  Change
</button>


          </div>

          {showPassword && (

<div className="password-box">

<input
type="password"
placeholder="New Password"
value={password.newPassword}
onChange={(e)=>
setPassword({
...password,
newPassword:e.target.value
})
}
/>

<input
type="password"
placeholder="Confirm Password"
value={password.confirmPassword}
onChange={(e)=>
setPassword({
...password,
confirmPassword:e.target.value
})
}
/>

<button
className="save-password-btn"
onClick={changePassword}
>
Update Password
</button>

</div>

)}





          <div className="setting-item logout">


            <div>

              <h3>
                Logout
              </h3>

              <p>
                Sign out from your account
              </p>

            </div>



            <button
              onClick={logout}
            >
              Logout
            </button>


          </div>




        </div>


      </div>


    </MainLayout>

  );

}


export default Settings;