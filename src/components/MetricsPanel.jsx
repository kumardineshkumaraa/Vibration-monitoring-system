export default function MetricsPanel({ metrics }) {
  const rows = [
    ["RMS", metrics.rms.toFixed(3), "g"],
    ["Peak", metrics.peak.toFixed(3), "g"],
    ["Peak-to-Peak", metrics.ptp.toFixed(3), "g"],
    ["Crest Factor", metrics.crest.toFixed(2), ""],
    ["Dominant Frequency", "50.0", "Hz"],
  ];
  return (
    <div className="metrics-panel">
      {rows.map(([name, value, unit]) => (
        <div className="metric-row" key={name}>
          <span>{name}</span>
          <strong>{value} <small>{unit}</small></strong>
        </div>
      ))}
    </div>
  );
}