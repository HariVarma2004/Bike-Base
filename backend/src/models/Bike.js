import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema({
    brand : { type :String , required: true },
    name: { type :String , required: true },
    model : { type :String , required: true },
    year : { type :Number , required: true },
    price : { type :Number , required: true },
    image : { type :String , required: true },
    description : { type :String , required: true },
    milage : { type :Number , required: true },
    engineCapacity : { type :Number , required: true },
    topSpeed : { type :Number , required: true },
    power : { type :Number , required: true },
    torque : { type :Number , required: true},
    fuelType : { type :String , required: true },
    transmission : { type :String , required: true },
    brakes : { type :String , required: true },
    tires : { type :String , required: true },
    suspension : { type :String , required: true },
    weight : { type :Number , required: true },
    seatHeight : { type :Number , required: true },
    fuelCapacity : { type :Number , required: true },
    colorOptions : { type :[String], required: true},
    available : { type :Boolean , default: true },
},
{ timestamps: true }
)

const Bike = mongoose.models.Bike || mongoose.model("Bike", bikeSchema);
export default Bike;