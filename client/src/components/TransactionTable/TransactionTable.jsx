import "./TransactionTable.css";

function TransactionTable({ expenses, onDelete, onEdit }) {
  return (
    <div className="table-container">
      <table>

        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {expenses.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No Expenses Found
              </td>
            </tr>
          ) : (
            expenses.map((item) => (
              <tr key={item._id}>

   <td data-label="Title">{item.title}</td>

<td data-label="Category">{item.category}</td>

<td data-label="Amount">₹ {item.amount}</td>

<td data-label="Date">
  {item.date
    ? new Date(item.date).toLocaleDateString()
    : "-"}
</td>

<td data-label="Actions">
  <button
    className="edit-btn"
    onClick={() => onEdit(item)}
  >
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() => onDelete(item._id)}
  >
    Delete
  </button>
</td>

              </tr>
            ))
          )}

        </tbody>

      </table>
    </div>
  );
}

export default TransactionTable;