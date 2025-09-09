// Bike Variant Component (DaisyUI Luxury Theme)
const BikeVariant = ({ color, name, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-circle btn-sm relative transition-all duration-300 ${
        active
          ? "ring-2 ring-primary ring-offset-2 ring-offset-base-100"
          : "hover:ring-1 hover:ring-neutral"
      }`}
      style={{ backgroundColor: color }}
      aria-label={`Select ${name} variant`}
    >
      {active && (
        <span className="absolute text-primary-content text-xs font-bold">
          ✓
        </span>
      )}
    </button>
  );
};

export default BikeVariant;
