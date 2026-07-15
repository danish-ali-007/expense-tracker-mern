import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import TransactionTable from "../../components/TransactionTable/TransactionTable";
import Button from "../../components/Button/Button";
import API from "../../services/api";
import "./Dashboard.css";
import ExpenseChart from "../../components/ExpenseChart/ExpenseChart";
import toast from "react-hot-toast";

function Dashboard() {

    const [editingId, setEditingId] = useState(null);

    const [search, setSearch] = useState("");


  const [expenses, setExpenses] = useState([]);



  const [formData, setFormData] = useState({

    title: "",
    amount: "",
    category: ""

  });



  const token = localStorage.getItem("token");



  // Fetch Expenses

  const getExpenses = async()=>{

    console.log("getExpenses called");


    try{


      const res = await API.get("/expenses",{

        headers:{

          Authorization:`Bearer ${token}`

        }

      });



      console.log("API RESPONSE:",res.data);



      setExpenses(res.data);



    }
    catch(err){


      console.log("API ERROR:",err);


    }


  };





  useEffect(()=>{


    getExpenses();


  },[]);





  // Input Change

  const handleChange=(e)=>{


    setFormData({

      ...formData,

      [e.target.name]:e.target.value


    });


  };







  // Add Expense
const addExpense = async (e) => {

  e.preventDefault();

  try {

    if (editingId) {

      await API.put(
        `/expenses/${editingId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Expense Added Successfully");

    } else {

      await API.post(
        "/expenses/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Expense Updated Successfully");

    }

    setFormData({
      title: "",
      amount: "",
      category: "",
    });

    setEditingId(null);

    getExpenses();

  } catch (err) {

    console.log(err);

  }

};
const deleteExpense = async (id) => {

  try {

    await API.delete(`/expenses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setExpenses((prev) =>
      prev.filter((item) => item._id !== id)
    );

    toast.success("Expense Deleted");

  } catch (err) {

    console.log(err);

  }

};
const handleEdit = (expense) => {

  setEditingId(expense._id);

  setFormData({
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
  });

};

  const filteredExpenses = expenses.filter((item) =>
  item.title.toLowerCase().includes(search.toLowerCase()) ||
  item.category.toLowerCase().includes(search.toLowerCase())
);




  const totalExpense = filteredExpenses.reduce(

    (sum,item)=> sum + Number(item.amount),

    0

  );



  const totalCategories = new Set(

    expenses.map(item=>item.category)

  ).size;






  return (


    <MainLayout
  search={search}
  setSearch={setSearch}
>


      <div className="dashboard">


        <h1>Expense Dashboard</h1>




        <div className="cards">


          <DashboardCard

            title="Total Expenses"

            value={`₹ ${totalExpense}`}

          />



          <DashboardCard

  title="Transactions"

  value={filteredExpenses.length}

/>



          <DashboardCard

            title="Categories"

            value={totalCategories}

          />


        </div>






        <form

          className="expense-form"

          onSubmit={addExpense}

        >



          <input

            type="text"

            name="title"

            placeholder="Expense Title"

            value={formData.title}

            onChange={handleChange}

            required

          />





          <input

            type="number"

            name="amount"

            placeholder="Amount"

            value={formData.amount}

            onChange={handleChange}

            required

          />





          <select
  name="category"
  value={formData.category}
  onChange={handleChange}
  required
>
  <option value="">Select Category</option>
  <option value="Food">Food</option>
  <option value="Travel">Travel</option>
  <option value="Shopping">Shopping</option>
  <option value="Bills">Bills</option>
  <option value="Health">Health</option>
  <option value="Entertainment">Entertainment</option>
  <option value="Other">Other</option>
</select>





          <Button
  text={editingId ? "Update Expense" : "Add Expense"}
  type="submit"
/>



        </form>


      




<TransactionTable
  expenses={expenses}
  onDelete={deleteExpense}
/>



      </div>



    </MainLayout>


  );


}


export default Dashboard;