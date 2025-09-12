import User from "../models/user.js";

export async function getAllUsers(req, res) {
    try {
        const users = await User.find().sort({createdAt : -1});
        res.status(200).json(users);
        console.log("Fetched all users successfully: ", users);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
        console.log("Error in getAllUsers:", error);
    }
}



export async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            console.log("User not found with id: ", req.params.id);
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
        console.log("Fetched user successfully: ", user);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
        console.log("Error in getUserById:", error);
    }
}



export async function createUser(req, res) {
    try {
        const { username, email, password, role,
            firstName, lastName, phoneNumber,
            address, city, state, postalCode, country } = req.body;

        const newUser = new User({ 
            username, email, password, role,
            firstName, lastName, phoneNumber,
            address, city, state, postalCode, country });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        console.log("Created new user successfully: ", savedUser);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
        console.log("Error in createUser:", error);
    }
}



export async function updateUser(req, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id , req.body , { new: true });
        if(!updatedUser){
            res.status(404).json({ message: "User not found", id: req.params.id });
            console.log("User not found with id: ", req.params.id);
        }
        res.status(200).json(updatedUser);
        console.log("Updated user successfully: ", updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
        console.log("Error in updateUser:", error);
    }
}



export async function deleteUser(req, res) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser){
            res.status(404).json({ message: "User not found", id: req.params.id });
            console.log("User not found with id: ", req.params.id);
        }
        res.status(200).json({ message: "User deleted successfully" });
        console.log("Deleted user successfully: ", deletedUser);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
        console.log("Error in deleteUser:", error);
    }           
}