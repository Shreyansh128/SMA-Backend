const Security_protocol = require("../models/security_protocol_Model");
const Society = require("../models/societyModel");
const Admin = require("../models/UserModel");

module.exports.create_security_protocol = async (req, res) => {
    try{
        const { title, description, date, time} = req.body;

        // const admin = await Admin.findById(adminId);
		// if (!admin) {
		//   	return res.status(404).json({ msg: "Admin not found" });
		// }

        // const society = await Society.findById(societyId);
		// if (!society) {
		//   	return res.status(404).json({ msg: "Society not found" });
		// }

        if (!title || !description) {
            return res.status(400).json({ msg: "All fields are required." });
        }
        
        const newProtocol = new Security_protocol({ title, description, date: new Date(date),  time  });
        await newProtocol.save();
        res.status(201).json({ msg: "Security protocol created successfully", protocol: newProtocol });
    } 
    catch(err){
        console.error("Error creating security protocol:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports.get_security_protocol = async (req, res) => {
    try{
        const ViewAll_Security_protocol = await Security_protocol.find();
        res.json(ViewAll_Security_protocol);
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({ err: err.message });
    }
}

module.exports.delete_security_protocol = async(req,res)=>{
    try{
        const { id } = req.params;
        const delete_Security_protocol = await Security_protocol.findByIdAndDelete(id);
        if(!delete_Security_protocol){
            return res.status(404).json({ msg : "Security_protocol Data Not Found" });
        }
        res.json({ msg: "Protocol deleted succsessfully", delete_Security_protocol });
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("data not deleted");
    }
}

module.exports.update_security_protocol = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, time } = req.body;

        const updated_Security_protocol = await Security_protocol.findByIdAndUpdate(id, { title, description, date: new Date(date),  time }, { new: true });
        if (!updated_Security_protocol) {
            return res.status(404).json({ msg: "Security_protocol data not found" });
        }

        res.json({ msg: "Protocol updated successfully", updated_Security_protocol });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}