export default function StatusPanel({ running, recording, samples }) {
  return (
    <div className="status-panel">
      <div className="panel-title">System Status</div>
      <div className="status-grid">
        <div><span>Mode</span><strong><i className="green-dot"/>Demo Mode</strong></div>
        <div><span>Data Source</span><strong>Simulated</strong></div>
        <div><span>Sampling Rate</span><strong>50 Hz</strong></div>
        <div><span>Samples Received</span><strong>{samples.toLocaleString()}</strong></div>
        <div><span>Monitoring</span><strong>{running ? "Running" : "Stopped"}</strong></div>
        <div><span>Recording</span><strong>{recording ? "Active" : "Inactive"}</strong></div>
      </div>
    </div>
  );
}