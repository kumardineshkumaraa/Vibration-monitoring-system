import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import MetricCard from "./components/MetricCard";
import AccelerationChart from "./components/AccelerationChart";
import FFTChart from "./components/FFTChart";
import MetricsPanel from "./components/MetricsPanel";
import ControlPanel from "./components/ControlPanel";
import StatusPanel from "./components/StatusPanel";
import { initialSamples, generateSample } from "./data/dummyData";
import "./App.css";

function calculateMetrics(data) {
  const values = data.flatMap(p => [p.x, p.y, p.z]);
  const rms = Math.sqrt(values.reduce((s, v) => s + v*v, 0) / values.length);
  const peak = Math.max(...values.map(Math.abs));
  const min = Math.min(...values);
  const max = Math.max(...values);
  return { rms, peak, ptp: max - min, crest: peak / Math.max(rms, 0.001) };
}

function downloadCSV(data) {
  const rows = [["time_s", "x_g", "y_g", "z_g"], ...data.map(p => [
    p.t.toFixed(3), p.x.toFixed(5), p.y.toFixed(5), p.z.toFixed(5)
  ])];
  const blob = new Blob([rows.map(r => r.join(",")).join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "vibration-data.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function App() {
  const [data, setData] = useState(initialSamples);
  const [running, setRunning] = useState(true);
  const [recording, setRecording] = useState(false);
  const metrics = useMemo(() => calculateMetrics(data.slice(-60)), [data]);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setData(prev => [...prev.slice(-179), generateSample(prev.length)]);
    }, 100);
    return () => clearInterval(timer);
  }, [running]);

  const reset = () => {
    setData(initialSamples);
    setRunning(false);
    setRecording(false);
  };

  return (
    <div className="app">
      <Header running={running} onToggle={() => setRunning(v => !v)} />

      <main className="dashboard">
        <section className="hero-row">
          <div>
            <div className="eyebrow">REAL-TIME CHARACTERIZATION</div>
            <h2>Vibration Overview</h2>
            <p>Monitor three-axis accelerometer data and frequency-domain characteristics.</p>
          </div>
          <div className="live-chip"><span className={running ? "live-dot" : "live-dot off"} />{running ? "LIVE STREAM" : "PAUSED"}</div>
        </section>

        <section className="card-grid">
          <MetricCard label="X Acceleration" value={data.at(-1).x.toFixed(3)} unit=" g" tone="blue" icon="X" />
          <MetricCard label="Y Acceleration" value={data.at(-1).y.toFixed(3)} unit=" g" tone="violet" icon="Y" />
          <MetricCard label="Z Acceleration" value={data.at(-1).z.toFixed(3)} unit=" g" tone="orange" icon="Z" />
          <MetricCard label="Vibration Magnitude" value={Math.sqrt(data.at(-1).x**2 + data.at(-1).y**2 + data.at(-1).z**2).toFixed(3)} unit=" g" tone="green" icon="Σ" />
        </section>

        <section className="panel">
          <div className="panel-head">
            <div><h3>Time-Domain Waveform</h3><span>Acceleration vs. time</span></div>
            <span className="unit-tag">Unit: g</span>
          </div>
          <AccelerationChart data={data} />
        </section>

        <section className="two-col">
          <div className="panel">
            <div className="panel-head">
              <div><h3>Frequency Spectrum</h3><span>FFT amplitude overview</span></div>
              <span className="unit-tag">Unit: Hz</span>
            </div>
            <FFTChart running={running} />
          </div>
          <div className="panel">
            <div className="panel-head">
              <div><h3>Vibration Metrics</h3><span>Calculated from recent samples</span></div>
            </div>
            <MetricsPanel metrics={metrics} />
          </div>
        </section>

        <section className="two-col bottom">
          <ControlPanel
            running={running}
            recording={recording}
            onStart={() => setRunning(true)}
            onStop={() => setRunning(false)}
            onReset={reset}
            onRecord={() => setRecording(v => !v)}
            onExport={() => downloadCSV(data)}
          />
          <StatusPanel running={running} recording={recording} samples={data.length} />
        </section>

        <footer>Demo dashboard • Dummy data only • Ready for future STM32/host integration</footer>
      </main>
    </div>
  );
}