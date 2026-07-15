import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import API from "../../services/api";
import "./Profile.css";
import toast from "react-hot-toast";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [editMode, setEditMode] = useState(false);

const [userData, setUserData] = useState({
  name: user?.name || "",
  email: user?.email || "",
});

  const [expenses, setExpenses] = useState([]);

  const token = localStorage.getItem("token");

  const getExpenses = async () => {
    try {
      const res = await API.get("/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const saveProfile = () => {

  localStorage.setItem(
    "user",
    JSON.stringify(userData)
  );

  setEditMode(false);

  toast.success("Profile Updated");

};

  return (
    <MainLayout>

      <div className="profile-page">

        <div className="profile-card">

          <div className="profile-cover"></div>

          <div className="profile-header">

            <img
              src={`https://ui-avatars.com/api/?name=${user?.name}&background=4f46e5&color=fff&size=200`}
              alt="profile"
            />

            {editMode ? (

<>
<input
className="profile-input"
value={userData.name}
onChange={(e)=>
setUserData({
...userData,
name:e.target.value
})
}
/>

<input
className="profile-input"
value={userData.email}
onChange={(e)=>
setUserData({
...userData,
email:e.target.value
})
}
/>
</>

) : (

<>
<h2>{userData.name}</h2>

<p>{userData.email}</p>
</>

)}

          </div>

          <div className="stats-container">

            <div className="stat-card">

              <h3>₹ {totalExpense}</h3>

              <span>Total Expense</span>

            </div>

            <div className="stat-card">

              <h3>{expenses.length}</h3>

              <span>Total Transactions</span>

            </div>

          </div>

          <div className="details-card">

            <div className="detail-row">

              <span>Name</span>

              <strong>{userData.name}</strong>

            </div>

            <div className="detail-row">

              <span>Email</span>

              <strong>{user?.email}</strong>

            </div>

            <div className="detail-row">

              <span>Role</span>

              <strong>User</strong>

            </div>

            <div className="detail-row">

              <span>Status</span>

              <strong className="active">Active</strong>

            </div>

          </div>
          <div className="profile-btns">

{editMode ? (

<>
<button
className="save-btn"
onClick={saveProfile}
>
Save
</button>

<button
className="cancel-btn"
onClick={()=>setEditMode(false)}
>
Cancel
</button>
</>

) : (

<button
className="edit-profile-btn"
onClick={()=>setEditMode(true)}
>
Edit Profile
</button>

)}

</div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Profile;