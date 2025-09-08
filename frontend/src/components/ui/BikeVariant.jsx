// Bike Variant Component
const BikeVariant = ({ color, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 rounded-full border-2 ${active ? 'border-white' : 'border-gray-500'} transition-all duration-300 flex items-center justify-center`}
      style={{ backgroundColor: color }}
      aria-label={`Select ${color} variant`}
    >
      {active && <span className="text-white">✓</span>}
    </button>
  );
};

export default BikeVariant;