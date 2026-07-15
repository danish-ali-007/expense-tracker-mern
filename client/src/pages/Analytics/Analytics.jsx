import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import ExpenseChart from "../../components/ExpenseChart/ExpenseChart";
import API from "../../services/api";
import MonthlyChart from "../../components/MonthlyChart/MonthlyChart";

function Analytics() {

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

  return (
    <MainLayout>

      <div className="dashboard">

        <h1>Analytics</h1>

        <ExpenseChart expenses={expenses} />
        <MonthlyChart expenses={expenses} />

      </div>

    </MainLayout>
  );
}

export default Analytics;