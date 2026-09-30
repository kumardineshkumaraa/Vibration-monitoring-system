export default function ControlPanel({ running, recording, onStart, onStop, onReset, onRecord, onExport }) {
  return (
    <div className="control-panel">
      <div className="panel-title">Controls</div>
      <div className="control-grid">
        <button className="control-btn primary" onClick={onStart} disabled={running}>▶ Start</button>
        <button className="control-btn" onClick={onStop} disabled={!running}>■ Stop</button>
        <button className={`control-btn ${recording ? "recording" : ""}`} onClick={onRecord}>
          {recording ? "● Recording" : "● Record"}
        </button>
        <button className="control-btn" onClick={onReset}>↻ Reset</button>
        <button className="control-btn export" onClick={onExport}>↓ Export CSV</button>
      </div>
    </div>
  );
}