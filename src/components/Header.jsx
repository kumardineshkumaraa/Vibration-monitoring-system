export default function Header({ running, onToggle }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">VM</div>
        <div>
          <h1>Vibration Monitoring System</h1>
          <p>Accelerometer-Based Vibration Characterization</p>
        </div>
      </div>
      <div className="header-actions">
        <span className="demo-badge"><span className="status-dot" /> DEMO MODE</span>
        <button className={running ? "btn danger" : "btn primary"} onClick={onToggle}>
          {running ? "Stop Monitoring" : "Start Monitoring"}
        </button>
      </div>
    </header>
  );
}