import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function MonthlyChart({ expenses }) {

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const data = months.map(month => ({
    month,
    amount:0
  }));

  expenses.forEach(item=>{

    const m = new Date(item.date).getMonth();

    data[m].amount += Number(item.amount);

  });

  return(

    <div className="chart-card">

      <h2>Monthly Expenses</h2>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis dataKey="month"/>

          <YAxis/>

          <Tooltip/>

          <Bar
            dataKey="amount"
            fill="#4f46e5"
            radius={[8,8,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default MonthlyChart;