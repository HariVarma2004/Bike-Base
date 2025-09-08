// Stat Card Component
const StatCard = ({ value, unit, label, icon }) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-cyan-400 font-semibold">{unit}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
};

export default StatCard;