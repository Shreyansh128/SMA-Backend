const OtherIncome = require('../models/OtherIncomeModel');
const Society = require("../models/societyModel");
const Admin = require("../models/UserModel");

module.exports.createOtherIncome = async (req, res) => {
    try{
        const { Title, Date, Due_Date, Description, Amount } = req.body;
        // const admin = await Admin.findById(adminId);
		// if (!admin) {
		//   	return res.status(404).json({ msg: "Admin not found" });
		// }

        // const society = await Society.findById(societyId);
		// if (!society) {
		//   	return res.status(404).json({ msg: "Society not found" });
		// }

        // if(!Title || !Date || !Due_Date || !Description || !Amount){
        //     return res.status(400).json({ message: 'All fields are required' });
        // }

        const incomeDate = new globalThis.Date(Date);
        const dueDate = new globalThis.Date(Due_Date);
        if(isNaN(incomeDate)){
            return res.status(400).json({ message: 'Invalid Date format' });
        }
        if(isNaN(dueDate)){
            return res.status(400).json({ message: 'Invalid Due Date format' });
        }

        const today = new globalThis.Date(); 
        if(incomeDate > today){
            return res.status(400).json({ message: 'Date cannot be a future date' });
        }
        if(dueDate < incomeDate){
            return res.status(400).json({ message: 'Due Date cannot be before the Date' });
        }

        const newIncome = new OtherIncome({
            Title,
            Date: incomeDate,
            Due_Date: dueDate,
            Description,
            Amount,
            // adminId, 
            // societyId
        });
        await newIncome.save();
        res.status(201).json({ message: 'Other income created successfully!', newIncome });
    } 
    catch(error){
        console.error('Error details:', error);
        res.status(500).json({ message: 'Server error while creating other income', error: error.message });
    }
};

module.exports.getOtherIncome = async(req, res) => {
    try{
        const ViewAllOtherIncome = await OtherIncome.find();
        res.json(ViewAllOtherIncome);
    } 
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports.deleteOtherIncome = async (req, res) => {
    try{
        const { id } = req.params;
        const deleteOtherIncome = await OtherIncome.findByIdAndDelete(id);
        if(!deleteOtherIncome){
            return res.status(404).json({ msg : "OtherIncome data Not Found" });
        }
        res.json({ msg: "OtherIncome deleted succsessfully", deleteOtherIncome });
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("data not deleted")
    }   
}

module.exports.updateOtherIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const { Title, Date, Due_Date, Description, Amount } = req.body;
        const existingIncome = await OtherIncome.findById(id);
        if(!existingIncome){
            return res.status(404).json({ message: 'Income record not found' });
        }

        let incomeDate, dueDate;
        if(Date){
            incomeDate = new globalThis.Date(Date);
            if(isNaN(incomeDate)){
                return res.status(400).json({ message: 'Invalid Date format' });
            }
            if(incomeDate > new globalThis.Date()){
                return res.status(400).json({ message: 'Date cannot be a future date' });
            }
        }
        if(Due_Date){
            dueDate = new globalThis.Date(Due_Date);
            if(isNaN(dueDate)){
                return res.status(400).json({ message: 'Invalid Due Date format' });
            }
            if(Date && dueDate < incomeDate){
                return res.status(400).json({ message: 'Due Date cannot be before the Date' });
            }
        }

        if (Title) existingIncome.Title = Title;
        if (Date) existingIncome.Date = incomeDate;
        if (Due_Date) existingIncome.Due_Date = dueDate;
        if (Description) existingIncome.Description = Description;
        if (Amount) existingIncome.Amount = Amount;

        await existingIncome.save();
        res.status(200).json({
            message: 'Income record updated successfully',
            data: existingIncome
        });

    } 
    catch(error){
        console.error("Error details:", error);
        res.status(500).json({
            message: 'Server error while updating income record',
            error: error.message
        });
    }
};