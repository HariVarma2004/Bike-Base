import React, { useState } from "react";

export default function AddBikes() {
  const [bike, setBike] = useState({
    brand: "",
    name: "",
    model: "",
    year: "",
    price: "",
    image: "",
    description: "",
    milage: "",
    engineCapacity: "",
    topSpeed: "",
    power: "",
    torque: "",
    fuelType: "",
    transmission: "",
    brakes: "",
    tires: "",
    suspension: "",
    weight: "",
    seatHeight: "",
    fuelCapacity: "",
    colorOptions: [],
    available: false,
  });

  const [colorInput, setColorInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // handle text / checkbox
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBike({ ...bike, [name]: type === "checkbox" ? checked : value });
  };

  // only allow digits
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setBike({ ...bike, [name]: value });
    }
  };

  // upload image to ImgBB
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=151058151545ec55350da9d98b6bcedb`, // 🔑 replace with your key
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.success) {
        setBike({ ...bike, image: data.data.url }); // store link in your state
        alert("✅ Image uploaded successfully!");
      } else {
        alert("❌ Upload failed: " + data.error?.message);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleAddColor = () => {
    if (colorInput.trim() && !bike.colorOptions.includes(colorInput)) {
      setBike({ ...bike, colorOptions: [...bike.colorOptions, colorInput] });
      setColorInput("");
    }
  };

  const handleRemoveColor = (color) => {
    setBike({
      ...bike,
      colorOptions: bike.colorOptions.filter((c) => c !== color),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // convert numbers
    const payload = {
      ...bike,
      year: Number(bike.year),
      price: Number(bike.price),
      milage: Number(bike.milage),
      engineCapacity: Number(bike.engineCapacity),
      topSpeed: Number(bike.topSpeed),
      power: Number(bike.power),
      torque: Number(bike.torque),
      weight: Number(bike.weight),
      seatHeight: Number(bike.seatHeight),
      fuelCapacity: Number(bike.fuelCapacity),
    };

    try {
      const res = await fetch("https://bike-base-backend-2rde.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add bike");

      alert("✅ Bike added successfully!");
      setBike({
        brand: "",
        name: "",
        model: "",
        year: "",
        price: "",
        image: "",
        description: "",
        milage: "",
        engineCapacity: "",
        topSpeed: "",
        power: "",
        torque: "",
        fuelType: "",
        transmission: "",
        brakes: "",
        tires: "",
        suspension: "",
        weight: "",
        seatHeight: "",
        fuelCapacity: "",
        colorOptions: [],
        available: false,
      });
    } catch (error) {
      console.error("Error adding bike:", error);
      alert("❌ Failed to add bike. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-theme="forest" className="min-h-screen p-6">
      {/* Header */}
      <div className="hero rounded-xl shadow-xl mb-6 bg-base-200">
        <div className="hero-content text-center">
          <div>
            <h2 className="text-3xl font-bold text-primary">➕ Add New Bike</h2>
            <p className="opacity-80">Fill out the details below</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="card bg-base-100 shadow-xl p-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Dynamic Fields */}
          {[
            { label: "Brand", name: "brand", type: "text" },
            { label: "Name", name: "name", type: "text" },
            { label: "Model", name: "model", type: "text" },
            { label: "Year", name: "year", type: "number" },
            { label: "Price", name: "price", type: "number" },
            { label: "Mileage", name: "milage", type: "number" },
            { label: "Engine Capacity", name: "engineCapacity", type: "number" },
            { label: "Top Speed", name: "topSpeed", type: "number" },
            { label: "Power", name: "power", type: "number" },
            { label: "Torque", name: "torque", type: "number" },
            { label: "Fuel Type", name: "fuelType", type: "text" },
            { label: "Transmission", name: "transmission", type: "text" },
            { label: "Brakes", name: "brakes", type: "text" },
            { label: "Tires", name: "tires", type: "text" },
            { label: "Suspension", name: "suspension", type: "text" },
            { label: "Weight", name: "weight", type: "number" },
            { label: "Seat Height", name: "seatHeight", type: "number" },
            { label: "Fuel Capacity", name: "fuelCapacity", type: "number" },
          ].map((field) => (
            <label key={field.name} className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">{field.label}</span>
              </div>
              <input
                type="text"
                name={field.name}
                value={bike[field.name]}
                onChange={
                  field.type === "number" ? handleNumberChange : handleChange
                }
                className="input input-bordered w-full"
                placeholder={`Enter ${field.label}`}
                required
              />
            </label>
          ))}

          {/* Image Upload */}
          <label className="form-control w-full md:col-span-2">
            <div className="label">
              <span className="label-text font-semibold">Bike Image</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full"
            />
            {uploading && <p className="text-sm text-warning">Uploading...</p>}
            {bike.image && (
              <img
                src={bike.image}
                alt="Preview"
                className="mt-2 w-40 h-28 object-cover rounded-lg border"
              />
            )}
          </label>

          {/* Color Options */}
          <div className="md:col-span-2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">Color Options</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Enter color"
                />
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="btn btn-secondary"
                >
                  ➕ Add
                </button>
              </div>
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {bike.colorOptions.map((color, i) => (
                <div
                  key={i}
                  className="badge badge-primary gap-2 p-3 cursor-pointer"
                  onClick={() => handleRemoveColor(color)}
                >
                  {color} ✖
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <label className="form-control md:col-span-2">
            <div className="label">
              <span className="label-text font-semibold">Description</span>
            </div>
            <textarea
              name="description"
              value={bike.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              placeholder="Write a short description..."
              required
            />
          </label>

          {/* Available Toggle */}
          <label className="form-control md:col-span-2 flex items-center gap-4">
            <span className="label-text font-semibold">Available</span>
            <input
              type="checkbox"
              name="available"
              checked={bike.available}
              onChange={handleChange}
              className="toggle toggle-primary"
            />
          </label>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "⏳ Saving..." : "💾 Save Bike"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
