export default function MetricCard({ label, value, unit, tone = "blue", icon }) {
  return (
    <div className={`metric-card ${tone}`}>
      <div className="metric-top">
        <span>{label}</span>
        <span className="metric-icon">{icon}</span>
      </div>
      <div className="metric-value">{value}<small>{unit}</small></div>
      <div className="metric-live">LIVE VALUE</div>
    </div>
  );
}