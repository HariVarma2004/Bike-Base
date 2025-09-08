import Bike from "../models/bike.js";

export async function getAllBikes(req, res) {
    try {
        const bikes = await Bike.find().sort({createdAt : -1});
        res.status(200).json(bikes);
        console.log("Fetched all bikes successfully : ", bikes);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
        console.log("Error in getAllBikes:", error);
    }
}

export async function getBikeById(req, res) {
    try {
        const bike = await Bike.findById(req.params.id);
        if (!bike) {
            console.log("Bike not found with id: ", req.params.id);
            return res.status(404).json({ message: "Bike not found" });
        }
        res.status(200).json(bike);
        console.log("Fetched bike successfully : ", bike);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
        console.log("Error in getBikeById:", error);
    }
}

export async function createBike(req, res) {
    try {
        const { brand, name, model, year, price, 
            image, description, milage, engineCapacity, 
            topSpeed, power, torque, fuelType, transmission,
             brakes, tires, suspension, weight, seatHeight,
              fuelCapacity, colorOptions  } = req.body;

        const newBike = new Bike({ 
            brand, name, model, year, price, 
            image, description, milage, engineCapacity, 
            topSpeed, power, torque, fuelType, transmission, 
            brakes ,tires, suspension, weight, seatHeight,
             fuelCapacity, colorOptions });

        const savedBike = await newBike.save();
        res.status(201).json(savedBike);
        console.log("Created new bike successfully : ", savedBike);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
        console.log("Error in createBike:", error);
    }
}

export async function updateBike(req, res) {
    try {
        const updateBike = await Bike.findByIdAndUpdate(req.params.id , req.body , { new: true });
        if(!updateBike){
            res.status(404).json({ message: "Bike not found" , id: req.params.id });
            console.log("Bike not found with id: ", req.params.id);
        }
        const updatedBike = await updateBike.save();
        res.status(200).json(updatedBike);
        console.log("Updated bike successfully : ", updatedBike);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
        console.log("Error in updateBike:", error);
    }
}

export async function deleteBike(req, res) {
    try {
        const deletedBike = await Bike.findByIdAndDelete(req.params.id);
        if(!deletedBike){
            res.status(404).json({ message: "Bike not found" , id: req.params.id });
            console.log("Bike not found with id: ", req.params.id);
        }
        res.status(200).json({ message: "Bike deleted successfully" });
        console.log("Deleted bike successfully : ", deletedBike);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
        console.log("Error in deleteBike:", error);
    }           
}
