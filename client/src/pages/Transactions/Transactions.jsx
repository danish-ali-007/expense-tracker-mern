import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import TransactionTable from "../../components/TransactionTable/TransactionTable";
import API from "../../services/api";
import "./Transactions.css";
import toast from "react-hot-toast";

function Transactions() {

  const [expenses, setExpenses] = useState([]);

  const [category, setCategory] = useState("All");

  const [formData, setFormData] = useState({
  title: "",
  amount: "",
  category: "",
});

const [editingId, setEditingId] = useState(null);

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

const deleteExpense = async (id) => {

  try {

    const res = await API.delete(`/expenses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);

    await getExpenses();

    toast.success("Expense Deleted");

  } catch (err) {

    console.log(err.response || err);

  }

};

  const filteredExpenses = expenses.filter((item)=>{

  if(category === "All") return true;

  return item.category === category;

});

  const handleEdit = (expense) => {

  setEditingId(expense._id);

  setFormData({
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
  });

};

const updateExpense = async(e)=>{

 e.preventDefault();


 try{

  await API.put(
    `/expenses/${editingId}`,
    formData,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );


  alert("Updated");


  setEditingId(null);


  setFormData({
    title:"",
    amount:"",
    category:""
  });


  getExpenses();


 }catch(err){

  console.log(err);

 }

};
  return (

    <MainLayout>

      <div className="dashboard">

        <h1>All Transactions</h1>
 <select
  className="filter-select"
  value={category}
  onChange={(e)=>setCategory(e.target.value)}
>

<option value="All">All</option>
<option value="Food">Food</option>
<option value="Travel">Travel</option>
<option value="Shopping">Shopping</option>
<option value="Bills">Bills</option>
<option value="Health">Health</option>
<option value="Entertainment">Entertainment</option>
<option value="Other">Other</option>

</select>

        <form onSubmit={updateExpense} className="expense-form">

<input
type="text"
placeholder="Title"
value={formData.title}
onChange={(e)=>setFormData({
...formData,
title:e.target.value
})}
/>


<input
type="number"
placeholder="Amount"
value={formData.amount}
onChange={(e)=>setFormData({
...formData,
amount:e.target.value
})}
/>


<input
type="text"
placeholder="Category"
value={formData.category}
onChange={(e)=>setFormData({
...formData,
category:e.target.value
})}
/>


<button type="submit">
Update Expense
</button>


</form>
<TransactionTable
expenses={filteredExpenses}
 onDelete={deleteExpense}
 onEdit={handleEdit}
/>
      </div>

    </MainLayout>

  );

}

export default Transactions;