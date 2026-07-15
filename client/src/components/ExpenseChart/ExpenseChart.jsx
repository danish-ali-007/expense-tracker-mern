import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#4F46E5",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
  "#8B5CF6",
  "#EC4899",
];

function ExpenseChart({ expenses }) {
  const data = [];

  expenses.forEach((item) => {
    const index = data.findIndex(
      (d) => d.name === item.category
    );

    if (index === -1) {
      data.push({
        name: item.category,
        value: Number(item.amount),
      });
    } else {
      data[index].value += Number(item.amount);
    }
  });

  return (
    <div className="chart-card">

      <h2>Category Wise Expenses</h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ExpenseChart;