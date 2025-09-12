import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const NUMBER_FIELDS = new Set([
  "year",
  "price",
  "milage",
  "engineCapacity",
  "topSpeed",
  "power",
  "torque",
  "weight",
  "seatHeight",
  "fuelCapacity",
]);

export default function EditBike() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch bike & normalize values (numbers -> strings for editing)
  useEffect(() => {
    let cancelled = false;
    async function fetchBike() {
      setLoading(true);
      try {
        // const res = await fetch(`http://localhost:5000/api/bikes/${id}`);
        const res = await fetch(`https://bike-base-backend-2rde.onrender.com/api/bikes/${id}`);
        if (!res.ok) throw new Error("Failed to fetch bike");
        const data = await res.json();

        // Normalize decimal fields to strings to allow safe editing (deletion/backspace)
        const norm = { ...data };
        NUMBER_FIELDS.forEach((f) => {
          norm[f] = (data && data[f] !== undefined && data[f] !== null) ? String(data[f]) : "";
        });

        // Ensure colorOptions is an array
        norm.colorOptions = Array.isArray(data.colorOptions) ? data.colorOptions : [];

        // Ensure available is boolean
        norm.available = !!data.available;

        if (!cancelled) setBike(norm);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError(err.message || "Error fetching bike");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchBike();
    return () => { cancelled = true; };
  }, [id]);

  // Generic change handler:
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setBike((p) => ({ ...p, [name]: checked }));
      return;
    }

    if (name === "colorOptions") {
      // store as array of trimmed non-empty strings
      const arr = value.split(",").map((c) => c.trim()).filter(Boolean);
      setBike((p) => ({ ...p, colorOptions: arr }));
      return;
    }

    if (NUMBER_FIELDS.has(name)) {
      // allow digits and single decimal point 
      if (/^\d*\.?\d*$/.test(value)) {
        setBike((p) => ({ ...p, [name]: value }));
      }
      return;
    }


    // default (text)
    setBike((p) => ({ ...p, [name]: value }));
  };

  // Submit: convert decimal strings to numbers before sending
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // Prepare payload
      const payload = { ...bike };

      // Convert number fields
      NUMBER_FIELDS.forEach((f) => {
        // If feild is empty string -> null 
        const raw = payload[f];
        payload[f] = raw === "" ? null : Number(raw);
      });

      // Ensure colorOptions is array
      payload.colorOptions = Array.isArray(payload.colorOptions) ? payload.colorOptions : [];

      // Send PUT
      const res = await fetch(`https://bike-base-backend-2rde.onrender.com/api/bikes/${id}`, {
      // const res = await fetch(`http://localhost:5000/api/bikes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || "Failed to update bike");
      }

      // success
      alert("✅ Bike updated successfully!");
      navigate("/admin/all-bikes");
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message || "Failed to update bike");
      alert("❌ Failed to update. See console.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-6">⏳ Loading...</div>;
  if (error) return <div className="text-center py-6 text-error">Error: {error}</div>;
  if (!bike) return <div className="text-center py-6">🚫 Bike not found</div>;

  return (
    <div data-theme="forest" className="max-w-5xl mx-auto p-4 sm:p-6 bg-base-100 rounded-xl shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-primary">✏️ Edit Bike</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic info */}
        <h3 className="col-span-1 md:col-span-2 text-lg font-semibold text-secondary">📌 Basic Info</h3>

        <label className="form-control">
          <span className="label-text">Brand</span>
          <input name="brand" value={bike.brand || ""} onChange={handleChange} className="input input-bordered w-full" required />
        </label>

        <label className="form-control">
          <span className="label-text">Name</span>
          <input name="name" value={bike.name || ""} onChange={handleChange} className="input input-bordered w-full" required />
        </label>

        <label className="form-control">
          <span className="label-text">Model</span>
          <input name="model" value={bike.model || ""} onChange={handleChange} className="input input-bordered w-full" required />
        </label>

        <label className="form-control">
          <span className="label-text">Year</span>
          <input
            name="year"
            value={bike.year ?? ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="e.g. 2024"
            inputMode="decimal"
            step="any"
            type="number"
            required
          />
        </label>

        {/* Pricing & Specs */}
        <h3 className="col-span-1 md:col-span-2 text-lg font-semibold text-secondary mt-2">💰 Pricing & Specs</h3>

        <label className="form-control">
          <span className="label-text">Price (₹)</span>
          <input
            name="price"
            value={bike.price ?? ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            inputMode="decimal"
            step="any"
            type="number"
            required
            placeholder="e.g. 180000"
          />
        </label>

        <label className="form-control">
          <span className="label-text">Image URL</span>
          <input name="image" value={bike.image || ""} onChange={handleChange} className="input input-bordered w-full" required />
        </label>

        <label className="form-control">
          <span className="label-text">Mileage (km/l)</span>
          <input
            name="milage"
            value={bike.milage ?? ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            inputMode="decimal"
            step="any"
            type="number"
            required
            placeholder="e.g. 45"
          />
        </label>

        <label className="form-control">
          <span className="label-text">Engine Capacity (cc)</span>
          <input
            name="engineCapacity"
            value={bike.engineCapacity ?? ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            inputMode="decimal"
            step="any"
            type="number"
            required
            placeholder="e.g. 155"
          />
        </label>

        <label className="form-control">
          <span className="label-text">Top Speed (km/h)</span>
          <input
            name="topSpeed"
            value={bike.topSpeed ?? ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            inputMode="decimal"
            step="any"
            type="number"
            placeholder="e.g. 150"
          />
        </label>

        <label className="form-control">
          <span className="label-text">Power (hp)</span>
          <input
            name="power"
            value={bike.power ?? ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            inputMode="decimal"
            step="any"
            type="number"
            placeholder="e.g. 18"
          />
        </label>

        <label className="form-control">
          <span className="label-text">Torque (Nm)</span>
          <input
            name="torque"
            value={bike.torque ?? ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            inputMode="decimal"
            step="any"
            type="number"
            placeholder="e.g. 14"
          />
        </label>

        {/* Features */}
        <h3 className="col-span-1 md:col-span-2 text-lg font-semibold text-secondary mt-2">⚙️ Features</h3>

        <label className="form-control">
          <span className="label-text">Fuel Type</span>
          <input name="fuelType" value={bike.fuelType || ""} onChange={handleChange} className="input input-bordered w-full" required />
        </label>

        <label className="form-control">
          <span className="label-text">Transmission</span>
          <input name="transmission" value={bike.transmission || ""} onChange={handleChange} className="input input-bordered w-full" required />
        </label>

        <label className="form-control">
          <span className="label-text">Brakes</span>
          <input name="brakes" value={bike.brakes || ""} onChange={handleChange} className="input input-bordered w-full" required />
        </label>

        <label className="form-control">
          <span className="label-text">Tires</span>
          <input name="tires" value={bike.tires || ""} onChange={handleChange} className="input input-bordered w-full" required />
        </label>

        <label className="form-control">
          <span className="label-text">Suspension</span>
          <input name="suspension" value={bike.suspension || ""} onChange={handleChange} className="input input-bordered w-full" required />
        </label>

        {/* Dimensions */}
        <h3 className="col-span-1 md:col-span-2 text-lg font-semibold text-secondary mt-2">📏 Dimensions</h3>

        <label className="form-control">
          <span className="label-text">Weight (kg)</span>
          <input
            name="weight"
            value={bike.weight ?? ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            inputMode="decimal"
            step="any"
            type="number"
            placeholder="e.g. 142"
          />
        </label>

        <label className="form-control">
          <span className="label-text">Seat Height (mm)</span>
          <input
            name="seatHeight"
            value={bike.seatHeight ?? ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            inputMode="decimal"
            step="any"
            type="number"
            placeholder="e.g. 815"
          />
        </label>

        <label className="form-control">
          <span className="label-text">Fuel Capacity (L)</span>
          <input
            name="fuelCapacity"
            value={bike.fuelCapacity ?? ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            inputMode="decimal"
            step="any"
            type="number"
            placeholder="e.g. 11"
          />
        </label>

        {/* Colors & Description */}
        <label className="form-control col-span-1 md:col-span-2">
          <span className="label-text">Color Options (comma separated)</span>
          <input
            name="colorOptions"
            value={(Array.isArray(bike.colorOptions) ? bike.colorOptions.join(", ") : "")}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="e.g. #FF6600, #000000, #FFFFFF"
          />
        </label>

        <label className="form-control col-span-1 md:col-span-2">
          <span className="label-text">Description</span>
          <textarea
            name="description"
            value={bike.description || ""}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows="4"
            required
          />
        </label>

        {/* Availability */}
        <label className="flex items-center gap-3 col-span-1 md:col-span-2">
          <input type="checkbox" name="available" checked={!!bike.available} onChange={handleChange} className="checkbox" />
          <span className="label-text">Available</span>
        </label>

        {/* Submit */}
        <div className="col-span-1 md:col-span-2">
          <button type="submit" className="btn btn-primary w-full" disabled={saving}>
            {saving ? "⏳ Saving..." : "💾 Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
