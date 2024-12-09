const Expenses = require("../models/ExpensesModel");
const fs = require('fs');
const path = require('path');
const Society = require("../models/societyModel");
const Admin = require("../models/UserModel");

module.exports.createExpenses = async (req, res) => {
    try{
        // console.log("Request Body:", req.body);
        // console.log("Uploaded File:", req.file);
        const { Title, description, date, amount } = req.body;

        // const admin = await Admin.findById(adminId);
		// if (!admin) {
		//   	return res.status(404).json({ msg: "Admin not found" });
		// }

        // const society = await Society.findById(societyId);
		// if (!society) {
		//   	return res.status(404).json({ msg: "Society not found" });
		// }

        if(!Title || !description || !date || !amount) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if(!req.file){
            return res.status(400).json({ message: 'Please upload a bill image' });
        }
        const basePath = '/uploads/Bill_image/';
        const newExpense = new Expenses({
            Title,
            description,
            date,
            amount,
            Bill_image: basePath + req.file.filename,
            // adminId, 
            // societyId
        });
        await newExpense.save();
        res.status(201).json({ message: 'Expense created successfully',  data: newExpense });
    } 
    catch(error){
        console.error("Error details:", error);
        res.status(500).json({ message: 'Server error while creating expense', error: error.message });
    }
};

module.exports.ViewExpenses = async(req,res) =>{
    try{
        const ViewAllExpenses = await Expenses.find();
        res.json(ViewAllExpenses);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports.deleteExpenses = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expenses.findById(id);
        if(!expense){
            return res.status(404).json({ message: 'Expense not found' });
        }

        const filePath = path.join(__dirname, '..', expense.Bill_image);
        try {
            await fs.promises.unlink(filePath);
        } 
        catch(fileError){
            console.error("Error deleting image file:", fileError);
            return res.status(500).json({ message: 'Error deleting image file' });
        }
        await Expenses.findByIdAndDelete(id);
        res.status(200).json({ message: 'Expense and image deleted successfully' });
    } 
    catch(error){
        console.error("Error details:", error);
        res.status(500).json({ message: 'Server error while deleting expense', error: error.message });
    }
};

module.exports.updateExpenses = async (req, res) => {
    const { id } = req.params; 
    const { Title, description, date, amount } = req.body;  
    try {
        const expense = await Expenses.findById(id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        let updatedBillImage = expense.Bill_image;  
        if (req.file) {
            const oldFilePath = path.join(__dirname, '..', expense.Bill_image);
            await fs.promises.unlink(oldFilePath);  
            updatedBillImage = '/uploads/Bill_image/' + req.file.filename;
        }
        expense.Title = Title || expense.Title;
        expense.description = description || expense.description;
        expense.date = date || expense.date;
        expense.amount = amount || expense.amount;
        expense.Bill_image = updatedBillImage;

        await expense.save();
        res.status(200).json({ message: 'Expense updated successfully', data: expense });
    }
    catch(error){
        console.error("Error details:", error);
        res.status(500).json({ message: 'Server error while updating expense', error: error.message });
    }
};