const Expense = require("../models/Expense");

// =========================
// Add Expense
// =========================
exports.addExpense = async (req, res) => {
  try {

    const expense = await Expense.create({
      user: req.user._id,
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      date: req.body.date,
    });

    res.status(201).json(expense);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};


// =========================
// Get Expenses
// =========================
exports.getExpenses = async (req, res) => {

  try {

    const expenses = await Expense.find({
      user: req.user._id,
    }).sort({ date: -1 });

    res.status(200).json(expenses);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};


// =========================
// Update Expense
// =========================
exports.updateExpense = async (req, res) => {

  try {

    const expense = await Expense.findOneAndUpdate(

      {
        _id: req.params.id,
        user: req.user._id,
      },

      {
        title: req.body.title,
        amount: req.body.amount,
        category: req.body.category,
      },

      {
        returnDocument: "after",
      }

    );

    if (!expense) {

      return res.status(404).json({
        message: "Expense not found",
      });

    }

    res.status(200).json(expense);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};


// =========================
// Delete Expense
// =========================
exports.deleteExpense = async (req, res) => {

  try {

    const expense = await Expense.findOneAndDelete({

      _id: req.params.id,
      user: req.user._id,

    });

    if (!expense) {

      return res.status(404).json({
        message: "Expense not found",
      });

    }

    res.status(200).json({

      success: true,
      message: "Expense Deleted Successfully",

    });

  } catch (err) {

    res.status(500).json({

      success: false,
      message: err.message,

    });

  }

};