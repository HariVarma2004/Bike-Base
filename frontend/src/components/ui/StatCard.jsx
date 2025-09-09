// StatCard Component
const StatCard = ({ value, unit, label, icon }) => {
  return (
    <div className="card bg-base-200/70 backdrop-blur-sm border border-base-300 rounded-xl shadow-md hover:shadow-lg hover:border-primary/40 transition-all duration-300 text-center">
      <div className="card-body items-center p-4">
        <div className="text-2xl mb-1 text-primary">{icon}</div>
        <div className="text-2xl font-bold text-base-content">{value}</div>
        {unit && (
          <div className="text-sm text-secondary font-semibold">{unit}</div>
        )}
        <div className="text-xs text-base-content/60 mt-1">{label}</div>
      </div>
    </div>
  );
};

export default StatCard;
