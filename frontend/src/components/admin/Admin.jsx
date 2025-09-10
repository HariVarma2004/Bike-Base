import React, { useState } from "react";

export default function AdminPage() {
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
    colorOption: [], // now array
    available: false,
  });

  const [colorInput, setColorInput] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBike({
      ...bike,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // prevent non-numeric characters
  const handleNumberChange = (e) => {
    if (/[eE+\-]/.test(e.key)) e.preventDefault();
  };

  // handle color array
  const handleAddColor = () => {
    if (colorInput.trim() && !bike.colorOption.includes(colorInput)) {
      setBike({ ...bike, colorOption: [...bike.colorOption, colorInput] });
      setColorInput("");
    }
  };

  const handleRemoveColor = (color) => {
    setBike({
      ...bike,
      colorOption: bike.colorOption.filter((c) => c !== color),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Bike Data:", bike);
    // call backend API here
  };

  return (
    <div data-theme = "forest" className="min-h-screen bg-base-200 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-base-100 shadow-lg p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-6">🏍 Admin Panel</h1>
        <ul className="menu bg-base-100 rounded-box space-y-2">
          <li><a className="active">Add Bike</a></li>
          <li><a>All Bikes</a></li>
          <li><a>Users</a></li>
          <li><a>Settings</a></li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="hero  rounded-xl shadow-xl mb-6">
          <div className="hero-content text-center text-white">
            <div>
              <h2 className="text-3xl font-bold">Add New Bike</h2>
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
            {[
              { label: "Brand", name: "brand", type: "text" },
              { label: "Name", name: "name", type: "text" },
              { label: "Model", name: "model", type: "text" },
              { label: "Year", name: "year", type: "number" },
              { label: "Price", name: "price", type: "number" },
              { label: "Image URL", name: "image", type: "text" },
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
                  <span className="label-text">{field.label}</span>
                </div>
                <input
                  type={field.type}
                  name={field.name}
                  value={bike[field.name]}
                  onChange={handleChange}
                  onKeyDown={field.type === "number" ? handleNumberChange : null}
                  className="input input-bordered w-full"
                  required
                />
              </label>
            ))}

            {/* Color Options (array) */}
            <div className="md:col-span-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Color Options</span>
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
                {bike.colorOption.map((color, i) => (
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
                <span className="label-text">Description</span>
              </div>
              <textarea
                name="description"
                value={bike.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
              />
            </label>

            {/* Available toggle */}
            <label className="form-control md:col-span-2 flex items-center gap-4">
              <span className="label-text">Available</span>
              <input
                type="checkbox"
                name="available"
                checked={bike.available}
                onChange={handleChange}
                className="toggle toggle-primary"
              />
            </label>

            {/* Submit button */}
            <div className="md:col-span-2 flex justify-end mt-4">
              <button type="submit" className="btn btn-primary">
                💾 Save Bike
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
