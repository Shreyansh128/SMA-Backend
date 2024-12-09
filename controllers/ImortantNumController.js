const ImportantNumber = require("../models/ImportantNumModel"); 
const Society = require("../models/societyModel");
const Admin = require("../models/UserModel");

module.exports.createImportantNum = async (req, res) => {
    try {
        const { Full_name, Phone_number, Work, adminId, societyId } = req.body;

        // Check if Admin exists
        // const admin = await Admin.findById(adminId);
        // if (!admin) {
        //     return res.status(404).json({ msg: "Admin not found" });
        // }

        // // Check if Society exists
        // const society = await Society.findById(societyId);
        // if (!society) {
        //     return res.status(404).json({ msg: "Society not found" });
        // }

        // Create the ImportantNumber
        const newImportantNumber = new ImportantNumber({
            Full_name,
            Phone_number,
            Work,
            // adminId,
            // societyId
        });

        // Save the ImportantNumber document
        await newImportantNumber.save();

        // Populate adminId and societyId with the actual documents
        const populatedImportantNumber = await ImportantNumber.findById(newImportantNumber._id)
            .populate('adminId')   // Populate the adminId reference
            .populate('societyId'); // Populate the societyId reference

        // Send the populated document in the response
        res.json(populatedImportantNumber);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ err: err.message });
    }
};


module.exports.getImportantNum = async(req,res) =>{
    try{
        const ViewImportantNumber = await ImportantNumber.find();
        res.json(ViewImportantNumber);
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({ err: err.message });
    }
}

module.exports.deleteImportantNum = async(req,res)=>{
    try{
        const { id } = req.params;
        const deleteImportantNum = await ImportantNumber.findByIdAndDelete(id);
        if(!deleteImportantNum){
            return res.status(404).json({ msg : "ImportantNumber Data Not Found" });
        }
        res.json({ msg: "ImportantNumber deleted succsessfully", deleteImportantNum });
    }
    catch(err){
        console.log(err.message);
        res.status(500).json("data not deleted", err.message);
    }
}

module.exports.updateImportantNum = async(req,res)=>{
    try{
        const { id } = req.params;
        const { Full_name, Phone_number, Work } = req.body;
        
        const updateImportantNum = await ImportantNumber.findByIdAndUpdate(id, { Full_name, Phone_number, Work}, { new : true });
        if(!updateImportantNum){
            res.status(404).json({ msg : "ImportantNumber Data Not Found" });
        }
        res.json({ msg: "ImportantNumber updated Succsessfully", updateImportantNum});
    }
    catch(err){
        console.log(err.message);
        res.status(500).json("data not updated" , err.message);
    }
}